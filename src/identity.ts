import type { ManifestIdentity } from "@wirecat/cli-base/wcat/manifest"
import type { AppIdentity } from "@wirecat/cli-core/cli"
import { DETAILS, REASONS } from "./reasons.js"
import { VERSION } from "./version.js"

export const PACKAGE = "@wirecat/hubspot-cli"

export const IDENTITY: AppIdentity = {
  command: "hubspot",
  appName: "hubspot-cli",
  envPrefix: "WCHUBSPOT",
  description: "read a HubSpot account's CRM",
  version: VERSION,
  issues: "https://github.com/WireCatLabs/hubspot-cli/issues/new",
  messenger: false,
  contentLanguages: ["en", "es", "ru"],
  // hubspot paces itself to 4 requests a second (PACE in src/hubspot/transport.ts); a run's budget counts on half that.
  requestMs: 500,
  errors: { reasons: REASONS, details: DETAILS },
}

// The bin hands this to wcatStart before the program loads, so it must not import the command tree; src/wcat.ts adds
// the permission keys for the manifest.
export const DESKTOP: ManifestIdentity = {
  ...IDENTITY,
  docs: "https://github.com/WireCatLabs/hubspot-cli#readme",
  // Every request goes to HubSpot's one API host; `api` refuses any other (src/commands/api.ts).
  hosts: ["api.hubapi.com"],
  tagline: "HubSpot CRM: deals, contacts and companies",
  syncs: "your deals, contacts and companies",
  signIn: {
    gives: "Lets your agent read the account's CRM with the scopes you give the key; this release changes nothing.",
    asks: "A service key or a legacy private app's access token from your HubSpot account, with read scopes.",
  },
}

export const SKILL = new URL("../skills/hubspot-cli/SKILL.md", import.meta.url)
