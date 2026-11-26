import type { StoredCredential } from "@wirecat/cli-base"
import { type TokenEntry, type TokenSessionOptions, tokenSessionCommand } from "@wirecat/cli-core/cli"
import { crmAccountClaim } from "@wirecat/cli-core/crm/cli"
import type { Command } from "commander"
import { configuration } from "../config.js"
import { contextOf, decodeSignIn, encodeSignIn, environmentAccount, hubFor, refuseAccountMismatch } from "../context.js"
import { SERVICE } from "../hubspot/transport.js"
import { IDENTITY } from "../identity.js"
import { type AccountAnswer, accountAnswer } from "../whoami.js"
import { HUBSPOT_ACCOUNT } from "./account.js"

/** What a profile keeps for a checked token: the token with the account beside it. `setup apply` keeps the same. */
export const signInFor = (token: string, who: AccountAnswer): string => {
  const { ui_domain: uiDomain, time_zone: timeZone } = who.account_info
  return encodeSignIn({ token, portalId: who.account, uiDomain, timeZone })
}

/**
 * The account a profile's entry names, read with no network. `WCHUBSPOT_TOKEN` names its account in
 * `WCHUBSPOT_ACCOUNT`; a malformed one is refused by the command that needs it, not by `session list`.
 */
const accountFromEnvironment = (env: NodeJS.ProcessEnv): string | undefined => {
  try {
    return environmentAccount(env)
  } catch {
    return undefined
  }
}

const ENTRY: TokenEntry = {
  write: (token, { account }) => signInFor(token, account as unknown as AccountAnswer),
  read: (saved: StoredCredential, env) => {
    if (saved.source === "environment") {
      const account = accountFromEnvironment(env)
      return { token: saved.secret, ...(account ? { account } : {}) }
    }
    const { token, portalId } = decodeSignIn(saved.secret)
    return { token, account: portalId }
  },
}

/** HubSpot counts its limits per account, so `status --check` waits in the queue of the account the entry names. */
const keptAccount = (saved: StoredCredential, token: string): string | undefined => {
  try {
    const kept = decodeSignIn(saved.secret)
    return kept.token === token ? kept.portalId : undefined
  } catch {
    // A new sign-in replaces an entry it cannot read.
    return undefined
  }
}

/** Whose key it is. `WCHUBSPOT_TOKEN` alone is enough: `status --check` is how its owner finds the id to name. */
const verify: TokenSessionOptions["verify"] = async (command: Command, token, events) => {
  const { env, profile, tokens } = contextOf(command)
  const saved = tokens.read(profile)
  const fromToken = saved?.source === "environment" && saved.secret === token
  const named = fromToken ? environmentAccount(env) : undefined
  const portalId = named ?? (saved && !fromToken ? keptAccount(saved, token) : undefined)
  const who = await accountAnswer(hubFor(command, { token, ...(portalId ? { portalId } : {}) }, events))
  if (named) refuseAccountMismatch(named, who.account)
  return { id: who.account, account: { ...who } }
}

export const sessionCommand = (): Command =>
  tokenSessionCommand({
    app: IDENTITY,
    service: SERVICE,
    resolveSettings: configuration.resolveSettings,
    token: "service key or private app token",
    about:
      "It is a service key (Development → Keys → Service keys) or a legacy private app's access token, and reads and " +
      "writes what its scopes allow. The profile keeps the account's id beside it",
    endNote: "Delete or rotate the key where it was made",
    verify,
    claim: crmAccountClaim(IDENTITY, HUBSPOT_ACCOUNT),
    entry: ENTRY,
  })
