import type { MessageStore } from "@wirecat/cli-core/store"
import { IDENTITY } from "./identity.js"

/** No `hs` alias: it is HubSpot's own CLI. */
export const PROVIDER = {
  name: "hubspot",
  kind: "crm",
  aliases: [],
  command: IDENTITY.command,
} as const

/**
 * The shared store, with hubspot's provider entry written, so every other CLI's search knows it (WC-ARCH-21). A
 * read-only open writes nothing, the entry included, and fails when the file is missing or needs a migration.
 */
export const openHubspotStore = async (env: NodeJS.ProcessEnv, { readOnly = false } = {}): Promise<MessageStore> => {
  const { openAppStore } = await import("@wirecat/cli-core/cli")
  return openAppStore(env, { app: IDENTITY, provider: PROVIDER, readOnly })
}
