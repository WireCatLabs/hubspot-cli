import {
  type Configuration,
  commandPathKey,
  commandPermissions,
  serviceApiPermissions,
  settingsFor,
} from "@wirecat/cli-core/cli"
import { CRM_WRITE_DEFAULTS, CRM_WRITE_KEYS, crmAlsoChecks } from "@wirecat/cli-core/crm"
import * as manifest from "./generated/manifest.js"
import { SERVICE } from "./hubspot/transport.js"
import { IDENTITY } from "./identity.js"

/**
 * The api group's manifest. An operation that answers with a credential is left out: the CLI signs in through
 * `session`, and the api group would drop it anyway. The keys a delete checks (`deals.delete` for `batch/archive`,
 * `merge` and `gdpr-delete`) come from `permissions` in scripts/generate.ts.
 */
export const API = {
  manifest: { ...manifest, operations: manifest.operations.filter((operation) => !operation.response?.sensitive) },
  service: SERVICE,
}

/** `api list` and `api show` never reach the account. */
const keyOf = (path: readonly string[]) =>
  path[0] === "api" && ["list", "show"].includes(path[1] ?? "") ? null : commandPathKey(path)

const api = serviceApiPermissions(API)
const crm = crmAlsoChecks()

// Merged field by field, as serviceApiPermissions asks: a spread of one over the other would drop the api's keys.
export const permissions = commandPermissions({
  keyOf,
  alsoChecks: (path) => [...crm(path), ...api.alsoChecks(path)],
  extra: [...new Set([...CRM_WRITE_KEYS, ...api.extra])],
  defaults: { ...CRM_WRITE_DEFAULTS, ...api.defaults },
})

export const configuration: Configuration = settingsFor(IDENTITY, { permissions })
