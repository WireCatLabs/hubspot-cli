import { CliError, isCliError } from "@wirecat/cli-base"
import type { CrmField, CrmKind, CrmPipeline, CrmRecords, CrmUser, DealKind } from "@wirecat/cli-core"
import {
  type CrmCallContext,
  type CrmChanges,
  type CrmCondition,
  type CrmIdPage,
  type CrmLiveKind,
  type CrmSource,
  crmValues,
  crmWindowOf,
  walk,
} from "@wirecat/cli-core/crm"
import { accountDetails } from "../hubspot/account.js"
import { type HubSpotTransport, type Query, SERVICE, segment } from "../hubspot/transport.js"
import { readActivities } from "./activities.js"
import { associationsOf, withAssociations } from "./associations.js"
import {
  nextOf,
  OBJECTS,
  type ObjectType,
  OVERLAP_MS,
  propertiesOf,
  type Raw,
  resultsOf,
  toDeal,
  toField,
  toLead,
  toOrganization,
  toPerson,
  toPipeline,
  toUser,
} from "./records.js"
import { type Filter, modifiedSince, nextSpot, SEARCH_PAGE, type Spot, search } from "./search.js"

const { id, text } = crmValues

/** The largest page of a list (contacts guide) and of owners (owners guide). */
const LIST_PAGE = 100

/** The pipelines API's object type for each kind with pipelines (pipelines guide). */
const PIPELINES: Record<DealKind, string> = { deal: "deals", lead: "leads" }

/** A refusal for a missing scope names the scope core's gap shows, the one HubSpot named or the one the API needs. */
const scoped = (error: unknown, scope: string) =>
  isCliError(error) && error.code === "permission_error" && typeof error.details.scope !== "string"
    ? new CliError(error.code, error.message, { ...error.details, scope })
    : error

const refused = (error: unknown) => isCliError(error) && error.code === "permission_error"

/** A record this token may not open, or one HubSpot does not have: `get` answers null. */
const unseen = (error: unknown) => isCliError(error) && (error.code === "not_found" || refused(error))

/**
 * `l<after>@<started>` lists in full; `s<from>.<offset>@<started>` reads changes from `from`. HubSpot's `after` is an
 * opaque token, so the round's start is read after the last `@`, whatever the token holds.
 */
const pageOf = (page: string | undefined, now: number) => {
  const cut = (page ?? "").lastIndexOf("@")
  const head = page?.slice(0, cut) ?? ""
  const started = Number(page?.slice(cut + 1))
  if (cut < 0 || !Number.isSafeInteger(started)) return { after: undefined, spot: undefined, started: now }
  if (head.startsWith("l")) return { after: head.slice(1) || undefined, spot: undefined, started }
  const found = /^s(-?\d+)\.(\d+)$/.exec(head)
  if (!found) return { after: undefined, spot: undefined, started: now }
  return { after: undefined, spot: { from: Number(found[1]), offset: Number(found[2]) }, started }
}

/**
 * A list or a read by id leaves out an association type the record has none of; asked for, none is an empty list, so a
 * link removed in HubSpot leaves the copy too.
 */
const asked = (raw: Raw, types: readonly string[]): Raw => {
  const held = typeof raw.associations === "object" && raw.associations !== null ? raw.associations : {}
  return {
    ...raw,
    associations: { ...Object.fromEntries(types.map((type) => [type, { results: [] }])), ...held },
  }
}

/** The shared names a live list filters by, as HubSpot's properties. */
const liveField = (kind: CrmLiveKind, field: string): string | undefined =>
  ({
    assigned_to: "hubspot_owner_id",
    created_at: OBJECTS[kind].created,
    updated_at: OBJECTS[kind].modified,
    // A company's own `type` property (Prospect, Partner…), as b24 maps `type` to its company type.
    ...(kind === "organization" ? { type: "type" } : {}),
  })[field]

/**
 * The longest `properties=` a GET sends. Servers commonly refuse request lines past 8 KB; HubSpot names no limit, so
 * an account with hundreds of custom properties reads the ones that fit, and the call says which it left out.
 */
export const MAX_PROPERTIES_CHARS = 6_000

/** HubSpot's own properties first, always; then the account's own while they fit. */
export const fitted = (own: readonly string[], custom: readonly string[]) => {
  const kept = [...own]
  let length = kept.join(",").length
  const dropped: string[] = []
  for (const name of custom) {
    if (kept.includes(name)) continue
    if (length + name.length + 1 > MAX_PROPERTIES_CHARS) dropped.push(name)
    else {
      kept.push(name)
      length += name.length + 1
    }
  }
  return { properties: kept.join(","), dropped }
}

const OPERATORS: Record<CrmCondition["op"], string> = {
  "=": "EQ",
  "!=": "NEQ",
  ">": "GT",
  ">=": "GTE",
  "<": "LT",
  "<=": "LTE",
  in: "IN",
}

/** core's conditions as one filter group: they are AND-ed, which a group is (search guide, filtering). */
const filtersOf = (kind: CrmLiveKind, conditions: readonly CrmCondition[], defined: readonly CrmField[]): Filter[] =>
  conditions.map(({ field, op, value }) => {
    const propertyName = liveField(kind, field) ?? defined.find((one) => one.code === field)?.code
    if (!propertyName)
      throw new CliError("validation_error", `${SERVICE} cannot filter ${OBJECTS[kind].name} by ${field}`, {
        reason: "query.unsupported-field",
      })
    if (Array.isArray(value))
      return { propertyName, operator: op === "!=" ? "NOT_IN" : "IN", values: value.map(String) }
    return { propertyName, operator: OPERATORS[op], value: String(value) }
  })

export interface HubSpotSourceOptions {
  now?: () => number
  /** Rows a full list asks per page; a test pages over a small account with a smaller one. */
  page?: number
  /** Rows a search asks per page. */
  searchPage?: number
}

/**
 * The account's CRM for core's sync: lists in full by `after`, changes by search on the modified time, deletions by a
 * pass over every id, since HubSpot gives a private app no change feed (webhooks need a public app). A service key has
 * no user, so there is no `self()` and the copy is the whole account.
 */
export type HubSpotCrmSource = CrmSource & {
  /** One record of any kind by its id, with its associations; null when HubSpot has none or this key cannot see it. */
  record<K extends CrmKind>(kind: K, externalId: string, context?: CrmCallContext): Promise<CrmRecords[K] | null>
}

export const hubspotCrmSource = (hub: () => HubSpotTransport, options: HubSpotSourceOptions = {}): HubSpotCrmSource => {
  const now = options.now ?? Date.now
  const listPage = options.page ?? LIST_PAGE
  const searchPage = options.searchPage ?? SEARCH_PAGE

  /** core paid for a call's first request; each further one is spent from the run's budget. */
  const metered = (context?: CrmCallContext): HubSpotTransport => {
    let paid = false
    const pay = () => {
      if (paid) context?.spend()
      paid = true
    }
    return {
      get: <T>(path: string, query?: Query) => {
        pay()
        return hub().get<T>(path, query)
      },
      post: <T>(path: string, body: Record<string, unknown>) => {
        pay()
        return hub().post<T>(path, body)
      },
    }
  }

  const loaded = new Map<CrmKind, Promise<CrmField[]>>()
  /** Reading properties needs `crm.schemas.<type>.read`; without it records sync with no custom values. */
  const fields = (kind: CrmKind, caller: HubSpotTransport) => {
    let found = loaded.get(kind)
    if (!found) {
      found = caller
        .get(`/crm/properties/2026-03/${OBJECTS[kind].name}`)
        .then((body) => resultsOf(body).flatMap((raw) => toField(raw) ?? []))
        .catch((error: unknown) => {
          if (refused(error)) return []
          loaded.delete(kind)
          throw error
        })
      loaded.set(kind, found)
    }
    return found
  }

  let currency: Promise<string | null> | undefined
  /** Asked only when a deal has an amount and no currency of its own. */
  const currencyOf = (caller: HubSpotTransport) => {
    currency ??= accountDetails(caller).then(
      (details) => details.companyCurrency ?? null,
      (error: unknown) => {
        currency = undefined
        throw error
      },
    )
    return currency
  }

  const mapped = async <K extends CrmKind>(
    kind: K,
    rows: Raw[],
    defined: readonly CrmField[],
    caller: HubSpotTransport,
  ): Promise<CrmRecords[K][]> => {
    if (kind === "deal") {
      const bare = rows.some((raw) => {
        const properties = propertiesOf(raw)
        return text(properties.amount) !== null && text(properties.deal_currency_code) === null
      })
      const fallback = bare ? await currencyOf(caller) : null
      return rows.map((raw) => toDeal(raw, defined, fallback)) as CrmRecords[K][]
    }
    const map = { lead: toLead, person: toPerson, organization: toOrganization }[kind as Exclude<CrmKind, "deal">]
    return rows.map((raw) => map(raw, defined)) as CrmRecords[K][]
  }

  /** The copy keeps no contact's custom values, as b24's does; a live read gives them. */
  const synced = (kind: CrmKind, caller: HubSpotTransport) =>
    kind === "person" ? Promise.resolve([]) : fields(kind, caller)

  const propertiesFor = (type: ObjectType, defined: readonly CrmField[]) => [
    ...new Set([...type.properties, ...defined.map(({ code }) => code)]),
  ]

  /**
   * One batch read per associated type (associations v4): a search answers no associations, and a list none of the
   * type ids that mark the primary company.
   */
  const associate = async (type: ObjectType, rows: Raw[], caller: HubSpotTransport, types: readonly string[]) => {
    let linked = rows
    const ids = rows.flatMap((raw) => id(raw.id) ?? [])
    for (const to of types) linked = withAssociations(linked, to, await associationsOf(caller.post, type.name, to, ids))
    return linked
  }
  const everyLink = (type: ObjectType) => [...type.associations, ...type.linked]

  /**
   * The GET query's properties, the ones that do not fit named as a gap. Only a GET is capped: a change round's search
   * sends them in a POST body and asks every one, so a property a full round left out still arrives with a change.
   */
  const getProperties = (kind: CrmKind, defined: readonly CrmField[], context?: CrmCallContext) => {
    const { properties, dropped } = fitted(
      OBJECTS[kind].properties,
      defined.map(({ code }) => code),
    )
    if (dropped.length)
      context?.gap({
        kind,
        message: `${dropped.length} of the account's own ${OBJECTS[kind].name} properties do not fit one request and were not read`,
      })
    return properties
  }

  const readChanges = async <K extends CrmKind>(
    kind: K,
    cursor: string | null,
    page: string | undefined,
    caller: HubSpotTransport,
    context?: CrmCallContext,
  ): Promise<CrmChanges<CrmRecords[K]>> => {
    const type = OBJECTS[kind]
    const since = cursor === null ? null : Date.parse(cursor)
    if (since !== null && Number.isNaN(since)) return { reset: true }
    const { after, spot: saved, started } = pageOf(page, now())
    const defined = await synced(kind, caller)
    const properties = propertiesFor(type, defined)
    const ended = { hasMore: false as const, cursor: new Date(started).toISOString() }
    if (since === null) {
      const query: Query = {
        limit: listPage,
        properties: getProperties(kind, defined, context),
        archived: false,
        ...(type.associations.length ? { associations: type.associations.join(",") } : {}),
        ...(after ? { after } : {}),
      }
      const body = await caller.get(`/crm/objects/2026-03/${type.path}`, query)
      const rows = await associate(
        type,
        resultsOf(body).map((raw) => asked(raw, type.associations)),
        caller,
        type.linked,
      )
      const items = await mapped(kind, rows, defined, caller)
      const next = nextOf(body)
      return next ? { items, hasMore: true, nextCursor: `l${next}@${started}` } : { items, ...ended }
    }
    const spot: Spot = saved ?? { from: since - OVERLAP_MS, offset: 0 }
    const { rows, more } = await search(
      caller.post,
      type.path,
      modifiedSince(type.modified, spot, searchPage, properties),
    )
    const items = await mapped(kind, await associate(type, rows, caller, everyLink(type)), defined, caller)
    if (!more) return { items, ...ended }
    const next = nextSpot(spot, rows, type.modified, searchPage)
    // More than the search cap changed at one moment (a mass import): only a full list reads them all.
    if (next === null) return { reset: true }
    return { items, hasMore: true, nextCursor: `s${next.from}.${next.offset}@${started}` }
  }

  const known = async (kind: CrmLiveKind, caller: HubSpotTransport) => fields(kind, caller)

  return {
    provider: "hubspot",
    traits: { kinds: ["organization", "person", "deal", "lead"], removedInChanges: false },
    async pipelines(kind, context) {
      try {
        const body = await metered(context).get(`/crm/pipelines/2026-03/${PIPELINES[kind]}`)
        return resultsOf(body).flatMap((raw): CrmPipeline[] => {
          const pipeline = toPipeline(raw, kind, (stage) =>
            context?.gap({
              kind,
              message: `closed lead stage ${stage}: HubSpot gives no outcome; counted as lost`,
            }),
          )
          return pipeline ? [pipeline] : []
        })
      } catch (error) {
        if (kind === "lead" && refused(error)) {
          context?.gap({ kind: "lead", scope: OBJECTS.lead.scope, message: leadsRefused })
          return []
        }
        throw scoped(error, OBJECTS[kind].scope)
      }
    },
    async changes<K extends CrmKind>(
      kind: K,
      cursor: string | null,
      page?: string,
      context?: CrmCallContext,
    ): Promise<CrmChanges<CrmRecords[K]>> {
      try {
        return await readChanges(kind, cursor, page, metered(context), context)
      } catch (error) {
        // Leads need Sales Hub Professional or Enterprise: an account without them still syncs everything else.
        if (kind === "lead" && refused(error)) {
          context?.gap({ kind: "lead", scope: OBJECTS.lead.scope, message: leadsRefused })
          return { items: [], hasMore: false, cursor: null }
        }
        throw scoped(error, OBJECTS[kind].scope)
      }
    },
    // Any other refusal fails the pass rather than answer no ids, which would mark every stored row deleted
    // (WC-DATA-7). Leads are the exception: an account without Sales Hub Pro never has any, and core holds back a pass
    // that would delete most of a kind until the owner runs sync --allow-deletions.
    async ids(kind, page, context): Promise<CrmIdPage> {
      const type = OBJECTS[kind]
      try {
        const body = await metered(context).get(`/crm/objects/2026-03/${type.path}`, {
          limit: listPage,
          properties: "hs_object_id",
          archived: false,
          ...(page ? { after: page } : {}),
        })
        const items = resultsOf(body).flatMap((raw) => id(raw.id) ?? [])
        const next = nextOf(body)
        return next ? { items, hasMore: true, nextCursor: next } : { items, hasMore: false }
      } catch (error) {
        if (kind === "lead" && refused(error)) {
          context?.gap({ kind: "lead", scope: type.scope, message: leadsRefused })
          return { items: [], hasMore: false }
        }
        throw scoped(error, type.scope)
      }
    },
    async fields(kind, context) {
      return fields(kind, metered(context))
    },
    // Active owners, then the deactivated ones, which `archived=true` lists alone (owners guide).
    async users(context) {
      const caller = metered(context)
      const users: CrmUser[] = []
      for (const archived of [false, true]) {
        let after: string | null = null
        do {
          const body: unknown = await caller
            .get("/crm/owners/2026-03", { limit: LIST_PAGE, archived, ...(after ? { after } : {}) })
            .catch((error: unknown) => {
              throw scoped(error, "crm.objects.owners.read")
            })
          for (const raw of resultsOf(body)) {
            const user = toUser(raw)
            if (user) users.push(user)
          }
          after = nextOf(body)
        } while (after)
      }
      return [...new Map(users.map((user) => [user.externalId, user])).values()]
    },
    async list(kind, query, context) {
      const caller = metered(context)
      const type = OBJECTS[kind]
      const defined = await known(kind, caller)
      const filters = filtersOf(kind, query.conditions, defined)
      const properties = propertiesFor(type, defined)
      const page = await walk(crmWindowOf(query), SEARCH_PAGE, async (offset, limit) => {
        const { rows, more } = await search(caller.post, type.path, {
          filters,
          sort: { propertyName: type.created, direction: "DESCENDING" },
          properties,
          limit,
          offset,
          ...(query.text ? { query: query.text } : {}),
        })
        return { rows: await associate(type, rows, caller, everyLink(type)), more }
      })
      return { items: await mapped(kind, page.items, defined, caller), hasMore: page.hasMore }
    },
    get: (kind, externalId, context) => record(kind, externalId, context),
    record,
    activities: (since, page, context) =>
      readActivities(metered(context), since, page, context, now, { search: searchPage, list: listPage }),
  }

  async function record<K extends CrmKind>(
    kind: K,
    externalId: string,
    context?: CrmCallContext,
  ): Promise<CrmRecords[K] | null> {
    if (!/^\d{1,20}$/.test(externalId)) return null
    const caller = metered(context)
    const type = OBJECTS[kind]
    const defined = await fields(kind, caller)
    let body: unknown
    try {
      body = await caller.get(`/crm/objects/2026-03/${type.path}/${segment(externalId)}`, {
        properties: getProperties(kind, defined, context),
        ...(type.associations.length ? { associations: type.associations.join(",") } : {}),
      })
    } catch (error) {
      if (unseen(error)) return null
      throw error
    }
    if (typeof body !== "object" || body === null) return null
    const rows = await associate(type, [asked(body as Raw, type.associations)], caller, type.linked)
    const [found] = await mapped(kind, rows, defined, caller)
    return found ?? null
  }
}

const leadsRefused =
  "HubSpot refused the leads: they need Sales Hub Professional or Enterprise and the crm.objects.leads.read scope; " +
  "deals, contacts and companies are copied without them"
