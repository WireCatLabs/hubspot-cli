import {
  type Configuration,
  commandPathKey,
  commandPermissions,
  serviceApiPermissions,
  settingsFor,
} from "@wirecat/cli-core/cli"
import * as manifest from "./generated/manifest.js"
import { SERVICE } from "./hubspot/transport.js"
import { IDENTITY } from "./identity.js"

/**
 * This release only reads (NEED-1): the api group offers only the operations whose effect is `read`. An operation that
 * answers with a credential is left out too: the CLI signs in through `session`.
 */
export const API = {
  manifest: {
    ...manifest,
    operations: manifest.operations.filter(
      (operation) => operation.effect === "read" && !operation.response?.sensitive,
    ),
  },
  service: SERVICE,
}

const LATER = "it changes the HubSpot account, and this release only reads; writes come in a later release"

/** `api show` names why a write is missing, by its command or its spec id. */
export const API_EXCLUDED = manifest.operations
  .filter((operation) => operation.effect !== "read")
  .flatMap((operation) => [
    { id: operation.command, reason: LATER },
    { id: operation.id, reason: LATER },
  ])

/** `api list` and `api show` never reach the account. */
const keyOf = (path: readonly string[]) =>
  path[0] === "api" && ["list", "show"].includes(path[1] ?? "") ? null : commandPathKey(path)

export const permissions = commandPermissions({ keyOf, ...serviceApiPermissions(API) })

export const configuration: Configuration = settingsFor(IDENTITY, { permissions })
