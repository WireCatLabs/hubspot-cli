import { CliError, isCliError } from "@wirecat/cli-base"
import type { CrmKind, CrmRecords } from "@wirecat/cli-core"
import {
  type CrmFields,
  type CrmOrganizationFields,
  type CrmPersonFields,
  type CrmWriteCapabilities,
  type CrmWriteOptions,
  type CrmWriter,
  crmValues,
  foldFieldName,
} from "@wirecat/cli-core/crm"
import { type HubSpotWriteTransport, SERVICE, segment } from "../hubspot/transport.js"
import { OBJECTS } from "./records.js"
import type { HubSpotCrmSource } from "./source.js"

/**
 * Deals, contacts and companies; leads need Sales Hub Professional, which no account this was checked on has. HubSpot
 * takes no idempotency key on a create (objects guide), so a repeated write makes a second record.
 */
export const HUBSPOT_WRITES: CrmWriteCapabilities = {
  kinds: ["deal", "person", "organization"],
  verbs: ["create", "update", "move", "close", "remove"],
  idempotent: false,
}

type WriteKind = "deal" | "person" | "organization"
type Properties = Record<string, string>

/** HubSpot's own properties each named option sets: never through `--field`, which would skip the option's keys. */
const OWN: Record<WriteKind, ReadonlySet<string>> = {
  deal: new Set(
    ["dealname", "pipeline", "dealstage", "amount", "deal_currency_code", "closedate", "hubspot_owner_id"].map(
      foldFieldName,
    ),
  ),
  person: new Set(
    ["firstname", "lastname", "email", "phone", "mobilephone", "jobtitle", "hubspot_owner_id"].map(foldFieldName),
  ),
  organization: new Set(["name", "phone", "hubspot_owner_id"].map(foldFieldName)),
}

const refused = (message: string, param?: string) =>
  new CliError("validation_error", message, { reason: "crm.record-field", sent: false, ...(param ? { param } : {}) })

const ID = /^\d{1,20}$/

const idOf = (value: string, param: string) => {
  if (!ID.test(value)) throw refused(`${param} takes ${SERVICE}'s numeric id`, param)
  return value
}

/** HubSpot clears a property set to the empty string (objects guide, "Update records"). */
const cleared = (value: string | null | undefined) => value ?? ""

/** A multiple checkbox's values are one string, `;` between them (properties guide). */
const customOf = (kind: WriteKind, custom: CrmFields["custom"]): Properties => {
  const properties: Properties = {}
  for (const [code, value] of Object.entries(custom ?? {})) {
    if (OWN[kind].has(foldFieldName(code)))
      throw refused(`${code} is one of ${SERVICE}'s own properties; set it with its own option, not --field`, "--field")
    properties[code] = Array.isArray(value) ? value.join(";") : cleared(value)
  }
  return properties
}

/** One empty value clears the list. */
const listOf = (values: readonly string[] | undefined) => values?.map((one) => one.trim()).filter(Boolean)

const dealOf = (given: CrmFields): Properties => {
  if (given.people !== undefined || given.organization !== undefined)
    throw refused(`set a deal's contacts and company with ${SERVICE}'s associations, through api`)
  const properties = customOf("deal", given.custom)
  if (given.title !== undefined) properties.dealname = given.title
  if (given.pipeline !== undefined) properties.pipeline = given.pipeline
  if (given.stage !== undefined) properties.dealstage = given.stage
  if (given.amount !== undefined) properties.amount = cleared(given.amount)
  if (given.currency !== undefined) properties.deal_currency_code = cleared(given.currency)
  // A date-time property, shown in each user's time zone: noon UTC stays the same day from UTC-11 to UTC+11, and the
  // copy reads the UTC day back.
  if (given.closeDate !== undefined) properties.closedate = given.closeDate ? `${given.closeDate}T12:00:00.000Z` : ""
  if (given.owner !== undefined) properties.hubspot_owner_id = given.owner === null ? "" : idOf(given.owner, "--owner")
  return properties
}

/**
 * A contact keeps one e-mail in `email` (more go to secondary addresses, which another API sets) and two numbers,
 * `phone` and `mobilephone`; a longer list is refused, never cut.
 */
const personOf = (given: CrmPersonFields): Properties => {
  const properties = customOf("person", given.custom)
  if (given.name !== undefined && given.firstName === undefined && given.lastName === undefined) {
    const [first, ...rest] = given.name.trim().split(/\s+/)
    properties.firstname = first ?? ""
    properties.lastname = rest.join(" ")
  }
  if (given.firstName !== undefined) properties.firstname = cleared(given.firstName)
  if (given.lastName !== undefined) properties.lastname = cleared(given.lastName)
  if (given.position !== undefined) properties.jobtitle = cleared(given.position)
  const emails = listOf(given.emails)
  if (emails) {
    if (emails.length > 1) throw refused(`${SERVICE} keeps one e-mail per contact here; give one --email`, "--email")
    properties.email = emails[0] ?? ""
  }
  const phones = listOf(given.phones)
  if (phones) {
    if (phones.length > 2)
      throw refused(`${SERVICE} keeps two numbers per contact, phone and mobile; give at most two --phone`, "--phone")
    properties.phone = phones[0] ?? ""
    properties.mobilephone = phones[1] ?? ""
  }
  if (given.owner !== undefined) properties.hubspot_owner_id = given.owner === null ? "" : idOf(given.owner, "--owner")
  return properties
}

const organizationOf = (given: CrmOrganizationFields): Properties => {
  const properties = customOf("organization", given.custom)
  if (given.name !== undefined) properties.name = given.name
  if (listOf(given.emails)?.length)
    throw refused(`a ${SERVICE} company has no e-mail property; set the contacts' e-mails instead`, "--email")
  const phones = listOf(given.phones)
  if (phones) {
    if (phones.length > 1) throw refused(`a ${SERVICE} company keeps one number; give one --phone`, "--phone")
    properties.phone = phones[0] ?? ""
  }
  if (given.owner !== undefined) properties.hubspot_owner_id = given.owner === null ? "" : idOf(given.owner, "--owner")
  return properties
}

const propertiesFor = (kind: CrmKind, given: unknown): Properties => {
  if (kind === "deal") return dealOf(given as CrmFields)
  if (kind === "person") return personOf(given as CrmPersonFields)
  if (kind === "organization") return organizationOf(given as CrmOrganizationFields)
  throw new CliError("validation_error", `${SERVICE} leads are written through api leads-create and leads-update`, {
    reason: "crm.write-unsupported",
    sent: false,
  })
}

const pathOf = (kind: CrmKind, externalId?: string) =>
  `/crm/objects/2026-03/${OBJECTS[kind].path}${externalId === undefined ? "" : `/${segment(idOf(externalId, `<${kind}>`))}`}`

/**
 * Core's write port over HubSpot's object APIs (https://developers.hubspot.com/docs/api-reference/latest/crm/using-object-apis):
 * a POST to create, a PATCH of the properties given, a DELETE that archives. Each is sent once, then the record is read
 * back whole with its associations, as core's store wants it.
 */
export const hubspotCrmWriter = (hub: () => HubSpotWriteTransport, source: () => HubSpotCrmSource): CrmWriter => {
  /** The write went through: a failed read-back must never read as a failed write, or the owner repeats it. */
  const readBack = async <K extends CrmKind>(kind: K, externalId: string, options: CrmWriteOptions) => {
    try {
      const found = await source().record(kind, externalId)
      if (!found) throw new CliError("not_found", `${SERVICE} has no ${kind} ${externalId}`)
      return found as CrmRecords[K]
    } catch (error) {
      throw new CliError(
        "invalid_response",
        `${SERVICE} made the change to ${kind} ${externalId}, but reading it back failed` +
          `${isCliError(error) ? ` (${error.code})` : ""}; run sync to store it — do not write it again`,
        { operation_id: options.operationId, external_id: externalId, sent: true },
      )
    }
  }

  const update = async <K extends CrmKind>(
    kind: K,
    externalId: string,
    properties: Properties,
    options: CrmWriteOptions,
  ) => {
    if (Object.keys(properties).length === 0) throw refused("nothing to change: name a field")
    await hub().patch(pathOf(kind, externalId), { properties })
    return readBack(kind, externalId, options)
  }

  /** The deal's own pipeline's first stage with that outcome: HubSpot closes a deal by its stage (pipelines guide). */
  const closingStage = async (externalId: string, outcome: "won" | "lost") => {
    const deal = await source().record("deal", externalId)
    if (!deal) throw new CliError("not_found", `${SERVICE} has no deal ${externalId}`, { sent: false })
    const pipeline = (await source().pipelines("deal")).find((one) => one.externalId === deal.pipeline)
    const stage = pipeline?.stages.find((one) => one.outcome === outcome)
    if (!stage)
      throw refused(`the deal's pipeline ${deal.pipeline} has no closed ${outcome} stage in ${SERVICE}`, "<outcome>")
    return stage.externalId
  }

  return {
    provider: "hubspot",
    capabilities: HUBSPOT_WRITES,
    async create(kind, draft, options) {
      const properties = propertiesFor(kind, draft)
      // The 2026-03 spec makes `associations` required on a create, an empty list included.
      const answer = await hub().post(pathOf(kind), { properties, associations: [] })
      const externalId = crmValues.id(crmValues.fieldOf(answer, "id"))
      if (externalId === null)
        throw new CliError("invalid_response", `${SERVICE} answered the new ${kind} without its id; run sync first`, {
          operation_id: options.operationId,
          sent: true,
        })
      return readBack(kind, externalId, options)
    },
    async update(kind, externalId, patch, options) {
      return update(kind, externalId, propertiesFor(kind, patch), options)
    },
    async move(kind, externalId, stage, options) {
      return update(kind, externalId, propertiesFor(kind, { stage }), options)
    },
    async close(kind, externalId, outcome, options) {
      const properties = propertiesFor(kind, { stage: await closingStage(externalId, outcome) })
      if (options.reason !== undefined) properties[`closed_${outcome}_reason`] = options.reason
      return update(kind, externalId, properties, options)
    },
    async remove(kind, externalId) {
      if (kind !== "deal")
        throw new CliError("validation_error", `${SERVICE} ${kind}s are deleted through api`, {
          reason: "crm.write-unsupported",
          sent: false,
        })
      await hub().delete(pathOf(kind, externalId))
    },
  }
}
