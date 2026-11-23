import { CliError } from "@wirecat/cli-base"
import { metaOf } from "@wirecat/cli-base/commands"
import { outputFor } from "@wirecat/cli-core/cli"
import type { CrmRun } from "@wirecat/cli-core/crm/cli"
import { addCrmCommands, openCrmStore } from "@wirecat/cli-core/crm/cli"
import type { AccountKey } from "@wirecat/cli-core/store"
import { Command } from "commander"
import { crmApiKeys, permissions } from "../config.js"
import {
  ACCOUNT_VARIABLE,
  contextOf,
  fromEnvironment,
  hubFor,
  refuseAccountMismatch,
  signInOf,
  storedSignIn,
} from "../context.js"
import { HUBSPOT_WRITES } from "../crm/writer.js"
import type { HubSpotWriteTransport } from "../hubspot/transport.js"
import { IDENTITY } from "../identity.js"
import { accountAnswer } from "../whoami.js"
import { HUBSPOT_ACCOUNT } from "./account.js"

/** The account the store saved for this profile after a checked run, read without writing; none when it has none. */
const savedAccount = async (env: NodeJS.ProcessEnv, profile: string): Promise<string | undefined> => {
  const { openHubspotStore } = await import("../store.js")
  const store = await openHubspotStore(env, { readOnly: true }).catch(() => undefined)
  if (!store) return undefined
  try {
    return (await store.accounts.profiles())[IDENTITY.command]?.[profile]?.account
  } catch {
    return undefined
  } finally {
    await store.close()
  }
}

/** The selected profile's account for one command; cli-core closes the store before the answer prints. */
const openProfile = async (command: Command, { readOnly }: { readOnly: boolean }): Promise<CrmRun> => {
  const { env, profile, environment } = contextOf(command)
  const [{ openHubspotStore, PROVIDER }, { hubspotCrmSource }, { hubspotCrmWriter }] = await Promise.all([
    import("../store.js"),
    import("../crm/source.js"),
    import("../crm/writer.js"),
  ])
  // A command that reaches HubSpot with `WCHUBSPOT_TOKEN` first asks whose token it is, once, on a transport of its
  // own; the answer's time zone then counts the daily limit to the account's midnight. A command that stays on this
  // computer asks nothing: it takes the account the store saved for the profile after a checked run.
  const fromToken = fromEnvironment(command)
  // cli-core annotates every CRM command, and refuses --offline before a remote one opens the profile.
  const online = metaOf(command).effects?.remote !== "none"
  let timeZone: string | undefined
  if (fromToken && online) {
    const { token, portalId } = signInOf(command)
    const who = await accountAnswer(hubFor(command, { token, portalId }))
    refuseAccountMismatch(portalId, who.account)
    timeZone = who.account_info.time_zone
  }
  const saved = fromToken && !online && !readOnly ? await savedAccount(env, profile) : undefined
  let transport: HubSpotWriteTransport | undefined
  const hub = () => (transport ??= hubFor(command, { ...signInOf(command), ...(timeZone ? { timeZone } : {}) }))
  const accountOf = (): AccountKey => {
    const signIn = storedSignIn(command) ?? signInOf(command)
    if (fromToken && !online && saved !== signIn.portalId)
      throw new CliError(
        "configuration_error",
        `run \`${IDENTITY.command} ${profile} sync\` once with ${IDENTITY.envPrefix}_TOKEN first: it checks ` +
          `${ACCOUNT_VARIABLE} against the token before this profile reads a copy`,
        { reason: "account.unchecked" },
      )
    return { provider: PROVIDER.name, account: signIn.portalId }
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
  const crm = () => (source ??= hubspotCrmSource(hub, environment.now ? { now: environment.now } : {}))
  return {
    profile,
    account,
    // A service key or a private app token belongs to the account, not a user: the source has no `self`, so the copy
    // is the whole account and every profile reads all of it.
    user: null,
    store,
    env,
    locked: Boolean(env[`${IDENTITY.envPrefix}_PROFILE_LOCK`]),
    source: crm,
    // No `self`: the key is the account's, so every `--owner` gives the record to someone else (crm.assign-others).
    writes: () => ({
      writer: hubspotCrmWriter(hub, crm),
      app: IDENTITY,
      env,
      warn: outputFor(command).renderer.warn,
      alsoChecks: crmApiKeys,
      // contextOf, not resolveSettings: it carries the levels `mcp serve --permission` tightened.
      settings: () => ({ ...contextOf(command).settings, permissionDefaults: permissions.defaults }),
    }),
    close: () => store.close(),
  }
}

/**
 * cli-core's shared CRM commands over the account: `sync`, `store status`, `deals`, `leads`, `pipelines`, `stages`,
 * `fields`, `activities`, `changes`, `search all`, `people`, `organizations` and `users` read live, and the writes of
 * deals, contacts and companies.
 */
export const crmSharedCommands = (): Command[] => {
  const holder = new Command(IDENTITY.command)
  addCrmCommands(holder, {
    app: IDENTITY,
    open: openProfile,
    leads: true,
    writes: HUBSPOT_WRITES,
    live: ["person", "organization", "user"],
    activities: true,
    account: HUBSPOT_ACCOUNT,
  })
  return [...holder.commands]
}
