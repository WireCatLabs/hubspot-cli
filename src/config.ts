import type { CrmKind } from "@wirecat/cli-core"
import {
  type BodyPermission,
  type Configuration,
  commandPathKey,
  commandPermissions,
  serviceApiPermissions,
  settingsFor,
} from "@wirecat/cli-core/cli"
import {
  CRM_ASSIGN_OTHERS_KEY,
  CRM_WRITE_DEFAULTS,
  CRM_WRITE_KEYS,
  type CrmVerb,
  crmAlsoChecks,
} from "@wirecat/cli-core/crm"
import type { Level } from "@wirecat/cli-core/sends"
import * as manifest from "./generated/manifest.js"
import { SERVICE } from "./hubspot/transport.js"
import { IDENTITY } from "./identity.js"

type Operation = (typeof manifest.operations)[number]

const firstWord = (command: string) => command.split("-")[0] ?? command

/**
 * The group of an operation's keys, as the generator named its delete key (`contacts-delete` → `people.delete`), so
 * `people.write` sits beside `people.delete` and both under `people`.
 */
const GROUPS: ReadonlyMap<string, string> = new Map(
  manifest.operations.flatMap((operation) =>
    (operation.permissions ?? []).flatMap(({ key }) =>
      key.endsWith(".delete") ? [[firstWord(operation.command), key.slice(0, -".delete".length)] as const] : [],
    ),
  ),
)

/**
 * The CRM command each raw operation does the same as, so `deals.update: deny` also stops `api deals-update` and its
 * `--dry-run` names the key (WC-PERM-22). Deletes need no entry: the generator gave them `deals.delete` already.
 */
const COMMAND_KEYS: Readonly<Record<string, readonly string[]>> = Object.fromEntries(
  (
    [
      ["deals", "deals"],
      ["contacts", "people"],
      ["companies", "organizations"],
    ] as const
  ).flatMap(([type, noun]) => [
    [`${type}-create`, [`${noun}.create`]],
    [`${type}-batch-create`, [`${noun}.create`]],
    [`${type}-update`, [`${noun}.update`]],
    [`${type}-batch-update`, [`${noun}.update`]],
    [`${type}-batch-upsert`, [`${noun}.create`, `${noun}.update`]],
  ]),
)

/** Every operation the spec has but one that answers with a credential: the CLI signs in through `session`. */
const offered = (operation: Operation) => !operation.response?.sensitive

/**
 * Erases a contact and everything on it for good, and blocks its e-mail address from coming back: a key of its own,
 * so the owner can deny it and still allow ordinary deletes. `ask`, not `deny`: cli-core's `--dry-run` refuses a
 * command whose key is denied, and the deny contract needs each write's preview.
 */
const ERASE_KEY = "people.erase"
const ERASES = "contacts-gdpr-delete"

/** A write's own `<group>.write`, `ask` by default like each key of the api group, and its command's keys. */
const keysOf = (operation: Operation) => {
  const group = GROUPS.get(firstWord(operation.command))
  const own = operation.effect === "write" && group ? [{ key: `${group}.write` }] : []
  const erases = operation.command === ERASES ? [{ key: ERASE_KEY }] : []
  return [...own, ...erases, ...(COMMAND_KEYS[operation.command] ?? []).map((key) => ({ key }))]
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

/** The properties of each record a body writes: one under `properties`, a batch's under `inputs[].properties`. */
const propertiesOf = (body: unknown): Record<string, unknown>[] => {
  if (!isRecord(body)) return []
  const records = Array.isArray(body.inputs) ? body.inputs.filter(isRecord) : [body]
  return records.flatMap((record) => (isRecord(record.properties) ? [record.properties] : []))
}

/** A value the body sets, not one it clears: an empty value takes the owner away, it gives the record to nobody. */
const sets = (body: unknown, name: string) =>
  propertiesOf(body).some((properties) => {
    const value = properties[name]
    return value !== undefined && value !== null && String(value).trim() !== ""
  })

/**
 * A key the body implies through a nested property, which a manifest flag cannot name: a flag is a top-level body
 * field. A service key belongs to the account, not a user, so any owner a body names is someone else (as
 * `deals create --owner` checks `crm.assign-others`), and a deal's stage or pipeline is a move.
 */
const implied = (key: string, names: readonly string[]) => {
  const paths = names.map((name) => `properties.${name}`)
  return {
    /** For `--dry-run` and discovery: a flag the manifest names is a top-level field, so this one never applies. */
    named: { key, body: paths },
    checked: {
      key,
      when: `with ${paths.join(" or ")} set`,
      applies: (body: unknown) => names.some((name) => sets(body, name)),
    } satisfies BodyPermission,
  }
}
const ASSIGNS = implied(CRM_ASSIGN_OTHERS_KEY, ["hubspot_owner_id"])
const MOVES = implied("deals.move", ["dealstage", "pipeline"])
/** A won or lost stage is a close; which stage is closed needs the pipelines, so any stage checks it, as stricter. */
const CLOSES = implied("deals.close", ["dealstage"])
const OWNED = new Set([
  "contacts",
  "companies",
  "deals",
  "tickets",
  "leads",
  "notes",
  "calls",
  "emails",
  "meetings",
  "tasks",
])
const RECORD_WRITES = ["create", "update", "batch-create", "batch-update", "batch-upsert"]
const bodyKeysOf = (operation: Operation) => {
  const type = firstWord(operation.command)
  if (!OWNED.has(type) || !RECORD_WRITES.includes(operation.command.slice(type.length + 1))) return []
  return [ASSIGNS, ...(type === "deals" ? [MOVES, CLOSES] : [])]
}

const bodyPermissions = Object.fromEntries(
  manifest.operations.filter(offered).flatMap((operation) => {
    const keys = bodyKeysOf(operation).map(({ checked }) => checked)
    return keys.length ? [[operation.command, keys]] : []
  }),
)

/**
 * Every operation of HubSpot's CRM specs: reads, writes and deletes. A write checks `api.<command>`, its group's
 * `.write` and the CRM command it does the same as; a delete its group's `.delete`.
 */
export const API = {
  manifest: {
    ...manifest,
    operations: manifest.operations.filter(offered).map(({ security, ...operation }) => ({
      ...operation,
      // The object specs mark 115 operations `security: []`, which reads as "no sign-in", and the generator's `auth`
      // keeps it: such an operation went out without the token and HubSpot answered 401. Left out, the manifest's
      // bearer token applies, as on every other operation.
      ...(security?.length ? { security } : {}),
      permissions: [
        ...(operation.permissions ?? []),
        ...keysOf(operation),
        // cli-core takes a body key only when the manifest names it; the run checks it through `bodyPermissions`.
        ...bodyKeysOf(operation).map(({ named }) => named),
      ],
    })),
  },
  service: SERVICE,
  bodyPermissions,
}

/** The api key each CRM write command also checks, so `api.deals-update: deny` stops `deals update` too. */
const CRM_TYPES: Partial<Record<CrmKind, string>> = { deal: "deals", person: "contacts", organization: "companies" }
export const crmApiKeys = (kind: CrmKind, verb: CrmVerb): string[] => {
  const type = CRM_TYPES[kind]
  // A delete shares `deals.delete` with `api deals-delete` already; `api.deals-delete` would ask a second time.
  if (!type || verb === "remove") return []
  return [`api.${type}-${verb === "create" ? "create" : "update"}`]
}

// Without `bodyPermissions`: the manifest names each of their keys already, with the same condition.
const api = serviceApiPermissions({ manifest: API.manifest })

/** `api list` and `api show` never reach the account. */
const keyOf = (path: readonly string[]) =>
  path[0] === "api" && ["list", "show"].includes(path[1] ?? "") ? null : commandPathKey(path)

/** The CRM commands' keys keep the commands' levels on the api path too: an ordinary change goes ahead. */
const COMMAND_DEFAULTS: Record<string, Level> = Object.fromEntries(
  [...new Set([...Object.values(COMMAND_KEYS).flat(), MOVES.named.key, CLOSES.named.key])].map((key) => [
    key,
    "allow" as Level,
  ]),
)

export const permissions = commandPermissions({
  keyOf,
  extra: [...new Set([...api.extra, ...CRM_WRITE_KEYS])],
  alsoChecks: (path) => [...api.alsoChecks(path), ...crmAlsoChecks(crmApiKeys)(path)],
  defaults: {
    ...api.defaults,
    ...COMMAND_DEFAULTS,
    ...CRM_WRITE_DEFAULTS,
  },
})

export const configuration: Configuration = settingsFor(IDENTITY, { permissions })
