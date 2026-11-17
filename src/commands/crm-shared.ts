import { CliError } from "@wirecat/cli-base"
import type { CrmRun } from "@wirecat/cli-core/crm/cli"
import { addCrmCommands, openCrmStore } from "@wirecat/cli-core/crm/cli"
import type { AccountKey } from "@wirecat/cli-core/store"
import { Command } from "commander"
import { contextOf, hubFor, signInOf, storedSignIn } from "../context.js"
import type { HubSpotTransport } from "../hubspot/transport.js"
import { IDENTITY } from "../identity.js"
import { accountAnswer } from "../whoami.js"

/**
 * `WCHUBSPOT_TOKEN` names no account, so the account says which, once per command, as `session start` asks; kept
 * nowhere. Offline it stays unknown, and only a command that needs it refuses.
 */
const environmentPortal = async (command: Command, hub: () => HubSpotTransport) => {
  const { flags, profile, tokens } = contextOf(command)
  if (flags.offline || tokens.read(profile)?.source !== "environment") return { portal: undefined }
  try {
    return { portal: (await accountAnswer(hub())).account }
  } catch (error) {
    return { portal: undefined, error }
  }
}

/** The selected profile's account for one command; cli-core closes the store before the answer prints. */
const openProfile = async (command: Command, { readOnly }: { readOnly: boolean }): Promise<CrmRun> => {
  const { env, profile, environment } = contextOf(command)
  const [{ openHubspotStore, PROVIDER }, { hubspotCrmSource }] = await Promise.all([
    import("../store.js"),
    import("../crm/source.js"),
  ])
  let transport: HubSpotTransport | undefined
  const hub = () => (transport ??= hubFor(command, signInOf(command)))
  const fromEnvironment = await environmentPortal(command, hub)
  const accountOf = (): AccountKey => {
    const portal = storedSignIn(command)?.portalId ?? fromEnvironment.portal
    if (portal) return { provider: PROVIDER.name, account: portal }
    if (fromEnvironment.error) throw fromEnvironment.error
    // Refuses --offline, or names the command that signs in.
    signInOf(command)
    throw new CliError("authentication_error", `profile ${profile} names no HubSpot account; run session start`)
  }
  const { store, account } = await openCrmStore({
    app: IDENTITY,
    env,
    profile,
    readOnly,
    provider: PROVIDER.name,
    open: openHubspotStore,
    account: accountOf,
  })
  let source: ReturnType<typeof hubspotCrmSource> | undefined
  return {
    profile,
    account,
    // A service key or a private app token belongs to the account, not a user: the source has no `self`, so the copy
    // is the whole account and every profile reads all of it.
    user: null,
    store,
    env,
    locked: Boolean(env[`${IDENTITY.envPrefix}_PROFILE_LOCK`]),
    source: () => (source ??= hubspotCrmSource(hub, environment.now ? { now: environment.now } : {})),
    close: () => store.close(),
  }
}

/**
 * cli-core's shared CRM commands over the account: `sync`, `store status`, `deals`, `leads`, `pipelines`, `stages`,
 * `fields`, `activities`, `changes`, `search all`, and `people`, `organizations` and `users` read live. Read only in
 * this release: no `writes`.
 */
export const crmSharedCommands = (): Command[] => {
  const holder = new Command(IDENTITY.command)
  addCrmCommands(holder, {
    app: IDENTITY,
    open: openProfile,
    leads: true,
    live: ["person", "organization", "user"],
    activities: true,
  })
  return [...holder.commands]
}
