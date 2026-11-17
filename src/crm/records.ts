import { CliError } from "@wirecat/cli-base"
import type {
  CrmField,
  CrmItem,
  CrmKind,
  CrmOrganization,
  CrmPerson,
  CrmPipeline,
  CrmUser,
  StageOutcome,
} from "@wirecat/cli-core"
import { crmValues } from "@wirecat/cli-core/crm"
import { SERVICE } from "../hubspot/transport.js"

const { amountOf, crmValuesOf, epoch, fieldOf, fullName, id, isRaw, rawsOf, text } = crmValues

export type Raw = Record<string, unknown>

/** One kind as HubSpot's object APIs name it (https://developers.hubspot.com/docs/api-reference/latest/crm/using-object-apis). */
export interface ObjectType {
  /** The path segment after `/crm/objects/2026-03/`: deals are `0-3`, the object type id. */
  path: string
  /** The name the associations and pipelines APIs take. */
  name: string
  /** The property the search guide names for the last change: `lastmodifieddate` on contacts only. */
  modified: string
  created: string
  /** Asked for every row; what the mapping below reads. */
  properties: readonly string[]
  /** What a list returns the ids of, `?associations=` (contacts guide); search returns none. */
  associations: readonly string[]
  /** The read scope its object API needs (legacy-apps/authentication/scopes). */
  scope: string
}

export const OBJECTS: Record<CrmKind, ObjectType> = {
  organization: {
    path: "companies",
    name: "companies",
    modified: "hs_lastmodifieddate",
    created: "createdate",
    properties: ["name", "domain", "website", "phone", "hubspot_owner_id", "createdate", "hs_lastmodifieddate"],
    associations: [],
    scope: "crm.objects.companies.read",
  },
  person: {
    path: "contacts",
    name: "contacts",
    modified: "lastmodifieddate",
    created: "createdate",
    properties: [
      "firstname",
      "lastname",
      "email",
      "hs_additional_emails",
      "phone",
      "mobilephone",
      "jobtitle",
      "associatedcompanyid",
      "hubspot_owner_id",
      "createdate",
      "lastmodifieddate",
    ],
    associations: ["companies"],
    scope: "crm.objects.contacts.read",
  },
  deal: {
    path: "0-3",
    name: "deals",
    modified: "hs_lastmodifieddate",
    created: "createdate",
    properties: [
      "dealname",
      "pipeline",
      "dealstage",
      "amount",
      "deal_currency_code",
      "closedate",
      "closed_lost_reason",
      "closed_won_reason",
      "hubspot_owner_id",
      "createdate",
      "hs_lastmodifieddate",
    ],
    associations: ["contacts", "companies"],
    scope: "crm.objects.deals.read",
  },
  lead: {
    path: "leads",
    name: "leads",
    modified: "hs_lastmodifieddate",
    created: "hs_createdate",
    properties: [
      "hs_lead_name",
      "hs_pipeline",
      "hs_pipeline_stage",
      "hubspot_owner_id",
      "hs_createdate",
      "hs_lastmodifieddate",
    ],
    associations: ["contacts", "companies"],
    scope: "crm.objects.leads.read",
  },
}

/** A list or search answer without `results` is refused: read as an empty page, it would end the round. */
export const resultsOf = (body: unknown): Raw[] => {
  const results = fieldOf(body, "results")
  if (!Array.isArray(results)) throw new CliError("invalid_response", `${SERVICE} answered a list without its results`)
  return results.filter(isRaw)
}

/** `paging.next.after`, absent on the last page (contacts guide). */
export const nextOf = (body: unknown): string | null => text(fieldOf(fieldOf(fieldOf(body, "paging"), "next"), "after"))

export const propertiesOf = (raw: Raw): Raw => (isRaw(raw.properties) ? raw.properties : {})

/** HubSpot sends a time as ISO or as epoch ms in a string, depending on the property (search guide, filtering). */
export const msOf = (value: unknown): number | null => {
  if (typeof value === "string" && /^\d{10,16}$/.test(value)) return Number(value)
  return epoch(value)
}

/** Ids a list's `associations` holds of one type, each once: a pair with two labels is listed twice. */
export const associatedOf = (raw: Raw, type: string): string[] | undefined => {
  const group = fieldOf(raw.associations, type)
  if (group === undefined) return undefined
  return [...new Set(rawsOf(fieldOf(group, "results")).flatMap((one) => id(one.id) ?? []))]
}

/** The link HubSpot keeps as the company's website, as its bare origin: never a path or query a token could sit in. */
const siteOf = (properties: Raw): string | null => {
  for (const value of [properties.website, properties.domain]) {
    const raw = text(value)
    if (!raw) continue
    try {
      const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`)
      if ((url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password)
        return `${url.protocol}//${url.host}`
    } catch {}
  }
  return null
}

const DAY = /^(\d{4}-\d{2}-\d{2})/

/** `closedate` is a time; the port keeps the day (deals guide: "the date the deal was closed"). */
const dayOf = (value: unknown): string | null => {
  const ms = msOf(value)
  if (ms !== null) return new Date(ms).toISOString().slice(0, 10)
  return DAY.exec(text(value) ?? "")?.[1] ?? null
}

const uniq = (values: (string | null)[]) => [...new Set(values.filter((one): one is string => !!one))]

/** The custom values of a row: only properties the account defined, which `fields()` lists. */
const valuesOf = (properties: Raw, defined: readonly CrmField[]) => {
  const values: Raw = {}
  for (const field of defined) {
    const value = properties[field.code]
    if (value === null || value === undefined || value === "") continue
    values[field.code] = field.multiple && typeof value === "string" ? value.split(";") : value
  }
  return Object.keys(values).length ? crmValuesOf(values, defined) : undefined
}

const timesOf = (raw: Raw, type: ObjectType) => {
  const properties = propertiesOf(raw)
  return {
    createdAt: msOf(properties[type.created]) ?? msOf(raw.createdAt),
    updatedAt: msOf(properties[type.modified]) ?? msOf(raw.updatedAt),
  }
}

export const toPerson = (raw: Raw, defined: readonly CrmField[] = []): CrmPerson => {
  const properties = propertiesOf(raw)
  const phones = uniq([text(properties.phone), text(properties.mobilephone)])
  const emails = uniq([
    text(properties.email),
    ...(text(properties.hs_additional_emails) ?? "").split(";").map((one) => text(one)),
  ])
  const companies = associatedOf(raw, "companies")
  const primary = id(properties.associatedcompanyid)
  const metadata = valuesOf(properties, defined)
  return {
    externalId: id(raw.id) ?? "",
    name: fullName(properties.firstname, properties.lastname),
    firstName: text(properties.firstname),
    lastName: text(properties.lastname),
    email: emails[0] ?? null,
    phone: phones[0] ?? null,
    phones,
    emails,
    position: text(properties.jobtitle),
    assignee: id(properties.hubspot_owner_id),
    ...timesOf(raw, OBJECTS.person),
    ...(companies
      ? {
          organizations: uniq([primary && companies.includes(primary) ? primary : null, ...companies]).map(
            (externalId) => ({ externalId, primary: externalId === primary }),
          ),
        }
      : {}),
    ...(metadata ? { metadata } : {}),
  }
}

export const toOrganization = (raw: Raw, defined: readonly CrmField[] = []): CrmOrganization => {
  const properties = propertiesOf(raw)
  const metadata = valuesOf(properties, defined)
  const phones = uniq([text(properties.phone)])
  return {
    externalId: id(raw.id) ?? "",
    name: text(properties.name) ?? text(properties.domain) ?? "",
    url: siteOf(properties),
    phones,
    assignee: id(properties.hubspot_owner_id),
    ...timesOf(raw, OBJECTS.organization),
    ...(metadata ? { metadata } : {}),
  }
}

/** A deal's or lead's contacts and company from its list associations; left out when it was read without them. */
const linksOf = (raw: Raw): Pick<CrmItem, "people" | "organization"> => {
  const contacts = associatedOf(raw, "contacts")
  const companies = associatedOf(raw, "companies")
  return {
    ...(contacts ? { people: contacts.map((externalId) => ({ externalId, role: "contact" as const })) } : {}),
    ...(companies ? { organization: companies[0] ?? null } : {}),
  }
}

export const toDeal = (raw: Raw, defined: readonly CrmField[] = [], currency: string | null = null): CrmItem => {
  const properties = propertiesOf(raw)
  const money = amountOf(properties.amount, text(properties.deal_currency_code) ?? currency)
  const metadata = valuesOf(properties, defined)
  return {
    externalId: id(raw.id) ?? "",
    title: text(properties.dealname) ?? "",
    pipeline: text(properties.pipeline) ?? "",
    stage: text(properties.dealstage) ?? "",
    ...money,
    closeDate: dayOf(properties.closedate),
    closedReason: text(properties.closed_won_reason) ?? text(properties.closed_lost_reason),
    assignee: id(properties.hubspot_owner_id),
    ...timesOf(raw, OBJECTS.deal),
    ...linksOf(raw),
    ...(metadata ? { metadata } : {}),
  }
}

export const toLead = (raw: Raw, defined: readonly CrmField[] = []): CrmItem => {
  const properties = propertiesOf(raw)
  const metadata = valuesOf(properties, defined)
  return {
    externalId: id(raw.id) ?? "",
    title: text(properties.hs_lead_name) ?? "",
    pipeline: text(properties.hs_pipeline) ?? "",
    stage: text(properties.hs_pipeline_stage) ?? "",
    assignee: id(properties.hubspot_owner_id),
    ...timesOf(raw, OBJECTS.lead),
    ...linksOf(raw),
    ...(metadata ? { metadata } : {}),
  }
}

/**
 * A stage's outcome from its `metadata` (pipelines guide): a deal stage is closed won at probability 1 and closed
 * lost at 0. A lead stage's `leadState` is not in the docs read; a closed one without a probability counts as lost
 * unless it says it qualified.
 */
export const outcomeOf = (metadata: unknown): StageOutcome => {
  if (text(fieldOf(metadata, "isClosed")) !== "true") return "open"
  const state = text(fieldOf(metadata, "leadState"))?.toUpperCase()
  if (state === "QUALIFIED") return "won"
  const probability = Number(text(fieldOf(metadata, "probability")))
  return probability === 1 ? "won" : "lost"
}

export const toPipeline = (raw: Raw): CrmPipeline | null => {
  const externalId = id(raw.id)
  if (!externalId) return null
  return {
    externalId,
    name: text(raw.label) ?? externalId,
    stages: rawsOf(raw.stages).flatMap((stage, at) => {
      const stageId = id(stage.id)
      if (!stageId) return []
      const order = Number(stage.displayOrder)
      return [
        {
          externalId: stageId,
          name: text(stage.label) ?? stageId,
          position: Number.isFinite(order) ? order : at,
          outcome: outcomeOf(stage.metadata),
        },
      ]
    }),
  }
}

/** An owner is who a record is assigned to: `hubspot_owner_id` is the owner's `id`, not its `userId` (owners guide). */
export const toUser = (raw: Raw): CrmUser | null => {
  const externalId = id(raw.id)
  if (!externalId) return null
  return {
    externalId,
    name: fullName(raw.firstName, raw.lastName) ?? text(raw.email),
    email: text(raw.email),
    active: raw.archived !== true,
  }
}

/**
 * The account's own properties of a kind (`hubspotDefined` false), what a row's `metadata` is keyed by. HubSpot's
 * own properties are read by name in the mapping above and are not repeated there.
 */
export const toField = (raw: Raw): CrmField | null => {
  const code = text(raw.name)
  if (!code || raw.hubspotDefined === true || raw.archived === true) return null
  const type = text(raw.type) ?? "string"
  const fieldType = text(raw.fieldType)
  const options =
    type === "enumeration" && fieldType !== "booleancheckbox"
      ? [
          ...new Map(
            rawsOf(raw.options)
              .filter((one) => one.hidden !== true)
              .flatMap((one) => {
                const value = text(one.value)
                return value ? [[value, { id: value, label: text(one.label) ?? value }] as const] : []
              }),
          ).values(),
        ]
      : undefined
  return {
    code,
    label: text(raw.label),
    type,
    multiple: type === "enumeration" && fieldType === "checkbox",
    filterable: true,
    ...(options ? { options } : {}),
    ...(fieldType === "phonenumber" ? { holds: "phone" as const } : {}),
  }
}
