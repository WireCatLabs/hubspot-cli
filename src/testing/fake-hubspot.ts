import type { SchemaNode } from "@wirecat/cli-base/codegen"
import { type FakeAnswer, type FakeCall, fakeApi } from "@wirecat/cli-base/codegen"
import { definitions } from "../generated/definitions.js"
import { operations } from "../generated/manifest.js"
import { HUBSPOT_API } from "../hubspot/transport.js"

export const FAKE_TOKEN = "pat-na1-00000000-fake-token"
export const FAKE_PORTAL = 4_000_001

/** `Paging_1` is a reference the generator left without its definition (`Paging1`): a cli-base gap. */
const DEFINITIONS: Record<string, SchemaNode> = {
  ...(definitions as Record<string, SchemaNode>),
  Paging_1: (definitions as Record<string, SchemaNode>).Paging1 as SchemaNode,
}

/** The object API's path segment for each associations-API name (deals are `0-3`). */
const PATHS: Record<string, string> = {
  companies: "companies",
  contacts: "contacts",
  deals: "0-3",
  leads: "leads",
  notes: "notes",
  calls: "calls",
  emails: "emails",
  meetings: "meetings",
  tasks: "tasks",
}
export type FakeType = keyof typeof PATHS

/** The last-change property per type (search guide). */
const MODIFIED = (type: FakeType) => (type === "contacts" ? "lastmodifieddate" : "hs_lastmodifieddate")
const CREATED = (type: FakeType) => (["companies", "contacts", "deals"].includes(type) ? "createdate" : "hs_createdate")

/** What the search's `query` reads by default (search guide). */
const SEARCHED = ["firstname", "lastname", "email", "phone", "company", "name", "domain", "website"]

export interface FakeRow {
  id: string
  properties: Record<string, string>
  createdAt: number
  updatedAt: number
}

export type RatePolicy = "DAILY" | "TEN_SECONDLY_ROLLING"

export interface FakeHubspotOptions {
  now?: () => number
  /** Types whose every call answers 403 for a missing scope, as for an account without Sales Hub Pro's leads. */
  refuse?: FakeType[]
  /** A row changed less than this ago is not in search yet ("a few moments", search guide). Off by default. */
  searchLagMs?: number
}

const iso = (ms: number) => new Date(ms).toISOString()

const comparable = (value: string): number | string => {
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)
  const ms = Date.parse(value)
  return /^\d{4}-\d{2}-\d{2}/.test(value) && !Number.isNaN(ms) ? ms : value.toLowerCase()
}

interface Filter {
  propertyName: string
  operator: string
  value?: string
  values?: string[]
}

const matches = (row: FakeRow, filter: Filter): boolean => {
  const raw = row.properties[filter.propertyName]
  if (filter.operator === "HAS_PROPERTY") return raw !== undefined
  if (filter.operator === "NOT_HAS_PROPERTY") return raw === undefined
  const values = (filter.values ?? [filter.value ?? ""]).map(comparable)
  if (filter.operator === "NOT_IN" || filter.operator === "NEQ")
    return raw === undefined || !values.includes(comparable(raw))
  if (raw === undefined) return false
  const have = comparable(raw)
  const [want] = values
  if (want === undefined) return false
  switch (filter.operator) {
    case "EQ":
    case "IN":
      return values.includes(have)
    case "GT":
      return have > want
    case "GTE":
      return have >= want
    case "LT":
      return have < want
    case "LTE":
      return have <= want
    case "CONTAINS_TOKEN":
      return String(have).includes(String(want))
    default:
      return false
  }
}

const error = (status: number, category: string, extra: Record<string, unknown> = {}): FakeAnswer => ({
  status,
  body: {
    status: "error",
    // HubSpot's text may quote the request; the CLI must never repeat it.
    message: `echo of the request: ${FAKE_TOKEN} must not leak`,
    correlationId: "00000000-0000-0000-0000-000000000000",
    category,
    ...extra,
  },
})

const asText = (value: unknown) => (Array.isArray(value) ? value.join(",") : typeof value === "string" ? value : "")

/**
 * HubSpot as its spec says, through cli-base's strict `fakeApi`, plus what the spec does not say: lists paged by
 * `after`, search capped at 10,000 results with at most 5 filter groups, 6 filters a group and 18 in all, a search
 * index that lags behind a change (opt-in), 429 for the daily and the ten-second limits, and 403 for a missing scope.
 */
export const fakeHubspot = (options: FakeHubspotOptions = {}) => {
  const now = options.now ?? Date.now
  let lagMs = options.searchLagMs ?? 0
  const refuse = new Set<FakeType>(options.refuse ?? [])
  const rows = new Map<FakeType, Map<string, FakeRow>>(Object.keys(PATHS).map((type) => [type as FakeType, new Map()]))
  const links = new Map<string, Set<string>>()
  const denied = new Map<string, number>()
  const throttled: RatePolicy[] = []
  let nextId = 1001

  const linkKey = (from: FakeType, id: string, to: FakeType) => `${from}:${id}>${to}`
  const linked = (from: FakeType, id: string, to: FakeType) => [...(links.get(linkKey(from, id, to)) ?? [])]

  const put = (type: FakeType, properties: Record<string, string>, id = String(nextId++)): string => {
    const at = now()
    const kept = rows.get(type)?.get(id)
    const createdAt = kept?.createdAt ?? at
    rows.get(type)?.set(id, {
      id,
      createdAt,
      updatedAt: at,
      properties: {
        ...kept?.properties,
        ...properties,
        hs_object_id: id,
        [CREATED(type)]: iso(createdAt),
        [MODIFIED(type)]: iso(at),
      },
    })
    return id
  }

  const link = (from: FakeType, fromId: string, to: FakeType, toId: string) => {
    for (const [a, aId, b, bId] of [
      [from, fromId, to, toId],
      [to, toId, from, fromId],
    ] as const) {
      const key = linkKey(a, aId, b)
      links.set(key, new Set([...(links.get(key) ?? []), bId]))
    }
  }

  const sorted = (type: FakeType) => [...(rows.get(type)?.values() ?? [])].sort((a, b) => Number(a.id) - Number(b.id))

  const shown = (row: FakeRow, call: FakeCall, type: FakeType, associations: boolean) => {
    const wanted = asText(call.query.properties ?? "")
      .split(",")
      .filter(Boolean)
    const properties = Object.fromEntries(
      Object.entries(row.properties).filter(([key]) => !wanted.length || wanted.includes(key)),
    )
    const asked = asText(call.query.associations ?? "")
      .split(",")
      .filter((one): one is FakeType => one in PATHS)
    return {
      id: row.id,
      properties,
      createdAt: iso(row.createdAt),
      updatedAt: iso(row.updatedAt),
      archived: false,
      ...(associations && asked.length
        ? {
            associations: Object.fromEntries(
              asked.flatMap((to) => {
                const ids = linked(type, row.id, to)
                return ids.length ? [[to, { results: ids.map((id) => ({ id, type: `${type}_to_${to}` })) }]] : []
              }),
            ),
          }
        : {}),
    }
  }

  const gate =
    (types: FakeType[], answer: (call: FakeCall) => FakeAnswer) =>
    (call: FakeCall): FakeAnswer => {
      const policy = throttled.shift()
      if (policy)
        return {
          status: 429,
          body: {
            status: "error",
            message: "You have reached your limit.",
            errorType: "RATE_LIMIT",
            correlationId: "00000000-0000-0000-0000-000000000000",
            policyName: policy,
          },
          headers:
            policy === "TEN_SECONDLY_ROLLING"
              ? {
                  "x-hubspot-ratelimit-interval-milliseconds": "10000",
                  "x-hubspot-ratelimit-max": "100",
                  "x-hubspot-ratelimit-remaining": "0",
                }
              : {},
        }
      const missing = types.find((type) => refuse.has(type))
      if (missing)
        return error(403, "MISSING_SCOPES", {
          errors: [{ message: "scope missing", context: { requiredGranularScopes: [`crm.objects.${missing}.read`] } }],
        })
      return answer(call)
    }

  const list = (type: FakeType) => (call: FakeCall) => {
    const limit = Math.min(Number(call.query.limit ?? 10), 100)
    // HubSpot's `after` is an opaque token: one that is not a bare id keeps a source from reading it as one.
    const after = Number(Buffer.from(String(call.query.after ?? ""), "base64").toString() || 0)
    const page = sorted(type).filter((row) => Number(row.id) > after)
    const items = page.slice(0, limit)
    const last = items.at(-1)
    return {
      body: {
        results: items.map((row) => shown(row, call, type, true)),
        ...(page.length > limit && last
          ? { paging: { next: { after: Buffer.from(last.id).toString("base64") } } }
          : {}),
      },
    }
  }

  const get = (type: FakeType) => (call: FakeCall) => {
    const id = Object.values(call.path)[0] ?? ""
    const status = denied.get(`${type}:${id}`)
    if (status) return error(status, status === 404 ? "OBJECT_NOT_FOUND" : "MISSING_SCOPES")
    const row = rows.get(type)?.get(id)
    return row ? { body: shown(row, call, type, true) } : error(404, "OBJECT_NOT_FOUND")
  }

  const search = (type: FakeType) => (call: FakeCall) => {
    const body = call.body as {
      filterGroups: { filters: Filter[] }[]
      sorts: { propertyName: string; direction?: string }[]
      properties: string[]
      limit: number
      after?: string
      query?: string
    }
    const filters = body.filterGroups.flatMap((group) => group.filters)
    if (
      body.filterGroups.length > 5 ||
      body.filterGroups.some((group) => group.filters.length > 6) ||
      filters.length > 18
    )
      return error(400, "VALIDATION_ERROR")
    if (body.sorts.length > 1) return error(400, "VALIDATION_ERROR")
    const offset = Number(body.after ?? 0)
    const limit = Math.min(body.limit, 200)
    if (!Number.isInteger(offset) || offset + limit > 10_000) return error(400, "VALIDATION_ERROR")
    const words = body.query?.toLowerCase()
    const found = sorted(type).filter(
      (row) =>
        now() - row.updatedAt >= lagMs &&
        (!body.filterGroups.length ||
          body.filterGroups.some((group) => group.filters.every((one) => matches(row, one)))) &&
        (!words || SEARCHED.some((key) => row.properties[key]?.toLowerCase().includes(words))),
    )
    const [sort] = body.sorts
    const ordered = sort
      ? found
          .map((row) => ({ row, key: comparable(row.properties[sort.propertyName] ?? "") }))
          .sort((a, b) => {
            const sign = sort.direction === "DESCENDING" ? -1 : 1
            return (a.key < b.key ? -1 : a.key > b.key ? 1 : Number(a.row.id) - Number(b.row.id)) * sign
          })
          .map(({ row }) => row)
      : found
    const page = ordered.slice(offset, offset + limit)
    const asked = { ...call, query: { properties: body.properties.join(",") } }
    return {
      body: {
        total: found.length,
        results: page.map((row) => shown(row, asked, type, false)),
        ...(offset + limit < found.length ? { paging: { next: { after: String(offset + limit) } } } : {}),
      },
    }
  }

  const associations = (call: FakeCall) => {
    const from = call.path.fromObjectType as FakeType
    const to = call.path.toObjectType as FakeType
    if (!(from in PATHS) || !(to in PATHS)) return error(400, "VALIDATION_ERROR")
    const inputs = (call.body as { inputs: { id: string }[] }).inputs
    if (inputs.length > 1000) return error(400, "VALIDATION_ERROR")
    const at = iso(now())
    return {
      body: {
        status: "COMPLETE",
        startedAt: at,
        completedAt: at,
        results: inputs.flatMap(({ id }) => {
          const ids = linked(from, id, to)
          return ids.length
            ? [
                {
                  from: { id },
                  to: ids.map((toObjectId) => ({
                    toObjectId,
                    associationTypes: [{ category: "HUBSPOT_DEFINED", typeId: 1 }],
                  })),
                },
              ]
            : []
        }),
      },
    }
  }

  const stage = (id: string, label: string, order: number, metadata: Record<string, string>) => ({
    id,
    label,
    displayOrder: order,
    metadata,
    archived: false,
    createdAt: iso(0),
    updatedAt: iso(0),
    writePermissions: "CRM_PERMISSIONS_ENFORCEMENT",
  })
  const pipeline = (id: string, label: string, stages: ReturnType<typeof stage>[]) => ({
    id,
    label,
    displayOrder: 0,
    stages,
    archived: false,
    createdAt: iso(0),
    updatedAt: iso(0),
  })
  const PIPELINES: Record<string, unknown[]> = {
    deals: [
      pipeline("default", "Sales Pipeline", [
        stage("appointmentscheduled", "Appointment Scheduled", 0, { isClosed: "false", probability: "0.2" }),
        stage("closedwon", "Closed Won", 1, { isClosed: "true", probability: "1.0" }),
        stage("closedlost", "Closed Lost", 2, { isClosed: "true", probability: "0.0" }),
      ]),
    ],
    leads: [
      pipeline("lead-pipeline-id", "Lead pipeline", [
        stage("new-stage-id", "New", 0, { isClosed: "false" }),
        stage("qualified-stage-id", "Qualified", 1, { isClosed: "true", leadState: "QUALIFIED" }),
        stage("unqualified-stage-id", "Disqualified", 2, { isClosed: "true", leadState: "UNQUALIFIED" }),
      ]),
    ],
  }

  const owner = (id: string, first: string, archived: boolean) => ({
    id,
    userId: Number(id) + 1,
    email: `${first.toLowerCase()}@example.com`,
    firstName: first,
    lastName: "Example",
    type: "PERSON",
    archived,
    createdAt: iso(0),
    updatedAt: iso(0),
  })
  const OWNERS = [owner("501", "Alice", false), owner("502", "Boris", false), owner("503", "Clara", true)]

  const property = (name: string, label: string, extra: Record<string, unknown> = {}) => ({
    name,
    label,
    description: "",
    groupName: "info",
    type: "string",
    fieldType: "text",
    options: [],
    hubspotDefined: false,
    ...extra,
  })
  const PROPERTIES = [
    property("dealname", "Deal name", { hubspotDefined: true }),
    property("example_source", "Source", {
      type: "enumeration",
      fieldType: "select",
      options: [
        { value: "web", label: "Website", hidden: false, displayOrder: 0 },
        { value: "fair", label: "Trade fair", hidden: false, displayOrder: 1 },
      ],
    }),
    property("example_note", "Note"),
  ]

  const answers: Record<string, (call: FakeCall) => FakeAnswer> = {}
  const idOf = (command: string) => {
    const found = operations.find((one) => one.command === command)
    if (!found) throw new Error(`the manifest has no ${command}`)
    return found.id
  }
  for (const type of Object.keys(PATHS) as FakeType[]) {
    answers[idOf(`${type}-list`)] = gate([type], list(type))
    answers[idOf(`${type}-get`)] = gate([type], get(type))
    answers[idOf(`${type}-search`)] = gate([type], search(type))
  }
  answers[idOf("associations-batch-read")] = (call) =>
    gate([call.path.fromObjectType as FakeType, call.path.toObjectType as FakeType], associations)(call)
  answers[idOf("pipelines-list")] = (call) =>
    gate([call.path.objectType as FakeType], () =>
      PIPELINES[call.path.objectType ?? ""]
        ? { body: { results: PIPELINES[call.path.objectType ?? ""] } }
        : error(400, "VALIDATION_ERROR"),
    )(call)
  answers[idOf("owners-list")] = gate([], (call) => {
    const archived = call.query.archived === "true"
    const limit = Math.min(Number(call.query.limit ?? 100), 100)
    const after = Number(call.query.after ?? 0)
    const all = OWNERS.filter((one) => one.archived === archived)
    const page = all.slice(after, after + limit)
    return {
      body: {
        results: page,
        ...(after + limit < all.length ? { paging: { next: { after: String(after + limit) } } } : {}),
      },
    }
  })
  answers[idOf("properties-list")] = (call) =>
    gate([call.path.objectType as FakeType], () => ({ body: { results: PROPERTIES } }))(call)
  answers[idOf("account-info-details-list")] = gate([], () => ({
    body: {
      portalId: FAKE_PORTAL,
      uiDomain: "app-eu1.hubspot.com",
      timeZone: "Europe/Madrid",
      accountType: "STANDARD",
      additionalCurrencies: [],
      companyCurrency: "EUR",
      dataHostingLocation: "eu1",
      utcOffset: "+01:00",
      utcOffsetMilliseconds: 3_600_000,
    },
  }))

  const api = fakeApi({
    operations,
    definitions: DEFINITIONS,
    baseUrl: HUBSPOT_API,
    auth: { header: "authorization", value: `Bearer ${FAKE_TOKEN}` },
    answers,
  })

  return {
    fetch: api.fetch as typeof fetch,
    calls: api.calls,
    refusals: api.refusals,
    put,
    link,
    row: (type: FakeType, id: string) => rows.get(type)?.get(id),
    /** Changes a row now: the next round of changes lists it, once the search index catches up. */
    touch: (type: FakeType, id: string, properties: Record<string, string> = {}) => put(type, properties, id),
    remove: (type: FakeType, id: string) => rows.get(type)?.delete(id),
    /** One record answers this status to a read by id from now on. */
    deny: (type: FakeType, id: string, status: 403 | 404) => denied.set(`${type}:${id}`, status),
    /** The next calls answer 429 with these policies, in order. */
    throttle: (...policies: RatePolicy[]) => throttled.push(...policies),
    refuse: (type: FakeType, refused = true) => (refused ? refuse.add(type) : refuse.delete(type)),
    setSearchLag: (ms: number) => {
      lagMs = ms
    },
    seededIds: () => Object.fromEntries([...rows].map(([type, held]) => [type, [...held.keys()]])),
  }
}

export type FakeHubspot = ReturnType<typeof fakeHubspot>

/**
 * A small account: two companies, three contacts, three deals, two leads, and one of each engagement on the first
 * deal, each linked as HubSpot links them.
 */
export const seededHubspot = (options: FakeHubspotOptions = {}) => {
  const hub = fakeHubspot(options)
  const acme = hub.put("companies", {
    name: "Example Ltd",
    domain: "example.com",
    phone: "+34 600 000 001",
    hubspot_owner_id: "501",
  })
  const beta = hub.put("companies", { name: "Example Two", website: "https://two.example.org/path?token=x" })
  const ana = hub.put("contacts", {
    firstname: "Ana",
    lastname: "Example",
    email: "ana@example.com",
    hs_additional_emails: "ana.private@example.net",
    phone: "+34 600 000 002",
    jobtitle: "Buyer",
    associatedcompanyid: acme,
    hubspot_owner_id: "501",
  })
  const ben = hub.put("contacts", { firstname: "Ben", email: "ben@example.com", example_source: "web" })
  const cy = hub.put("contacts", { lastname: "Cy" })
  hub.link("contacts", ana, "companies", acme)
  hub.link("contacts", ben, "companies", beta)
  const kitchen = hub.put("deals", {
    dealname: "Example kitchen",
    pipeline: "default",
    dealstage: "appointmentscheduled",
    amount: "15000.5",
    deal_currency_code: "EUR",
    closedate: "2026-12-01T00:00:00Z",
    hubspot_owner_id: "501",
    example_source: "web",
  })
  const won = hub.put("deals", { dealname: "Example won", pipeline: "default", dealstage: "closedwon", amount: "900" })
  hub.put("deals", { dealname: "Example lost", pipeline: "default", dealstage: "closedlost", hubspot_owner_id: "502" })
  hub.link("deals", kitchen, "contacts", ana)
  hub.link("deals", kitchen, "companies", acme)
  hub.link("deals", won, "contacts", ben)
  const lead = hub.put("leads", {
    hs_lead_name: "Example lead",
    hs_pipeline: "lead-pipeline-id",
    hs_pipeline_stage: "new-stage-id",
  })
  hub.put("leads", {
    hs_lead_name: "Example qualified",
    hs_pipeline: "lead-pipeline-id",
    hs_pipeline_stage: "qualified-stage-id",
  })
  hub.link("leads", lead, "contacts", cy)
  const note = hub.put("notes", { hs_note_body: "<p>Called &amp; agreed</p>", hubspot_owner_id: "501" })
  const call = hub.put("calls", {
    hs_call_title: "Intro call",
    hs_call_direction: "OUTBOUND",
    hs_call_status: "COMPLETED",
    hs_call_to_number: "+34 600 000 002",
  })
  const email = hub.put("emails", {
    hs_email_subject: "Offer",
    hs_email_text: "Here is the offer",
    hs_email_to_email: "ana@example.com",
    hs_email_status: "SENT",
  })
  const meeting = hub.put("meetings", { hs_meeting_title: "Visit", hs_meeting_outcome: "SCHEDULED" })
  const task = hub.put("tasks", { hs_task_subject: "Send contract", hs_task_status: "NOT_STARTED" })
  for (const [type, id] of [
    ["notes", note],
    ["calls", call],
    ["emails", email],
    ["meetings", meeting],
    ["tasks", task],
  ] as const) {
    hub.link(type, id, "deals", kitchen)
    hub.link(type, id, "contacts", ana)
  }
  return { hub, ids: { acme, beta, ana, ben, cy, kitchen, won, lead, note, call, email } }
}
