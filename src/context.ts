import { CliError, type SleepLike } from "@wirecat/cli-base"
import {
  type BaseEnvironment,
  baseContext,
  type EventSink,
  environmentOf,
  type GlobalFlags,
  ProfileTokenStore,
  refuseOffline,
} from "@wirecat/cli-core/cli"
import { Pacer, pacePathFor } from "@wirecat/cli-core/sends"
import type { Command } from "commander"
import { configuration } from "./config.js"
import {
  type HubSpotTransport,
  type HubSpotWriteTransport,
  hubspotTransport,
  PACE,
  SERVICE,
} from "./hubspot/transport.js"
import { IDENTITY } from "./identity.js"

export { PACE }

/** What a test hands `run()` in place of the account and real waiting (WC-ARCH-10). */
export interface HubspotEnvironment extends BaseEnvironment {
  fetch?: typeof fetch
  sleep?: SleepLike
  /** The clock the pace waits on; a test moves it with its `sleep`, so no wait is real. */
  now?: () => number
}

/**
 * Settings, keyring and the run come from cli-core's `baseContext` and nowhere else: a command that resolves settings
 * on its own skips `--timeout`, the run record and the profile's permissions (WC-LIFE-5, WC-LIFE-15).
 */
export const contextOf = (command: Command) => {
  const base = baseContext(command, configuration.resolveSettings)
  return {
    ...base,
    environment: environmentOf<HubspotEnvironment>(command),
    flags: command.optsWithGlobals<GlobalFlags>(),
    profile: base.settings.profile,
    tokens: new ProfileTokenStore({
      app: IDENTITY,
      env: base.env,
      ...(base.keyring ? { keyring: base.keyring } : {}),
      warn: base.renderer.warn,
    }),
  }
}

/**
 * What a profile keeps: the token and the account `session start` proved it against. The account is the CRM's key in
 * the shared store, so a read offline knows it without asking HubSpot.
 */
export interface SignIn {
  token: string
  portalId: string
  uiDomain: string | null
  /** The account's IANA time zone: HubSpot's daily allowance comes back at its midnight. */
  timeZone?: string
}

export const encodeSignIn = (signIn: SignIn): string => JSON.stringify(signIn)

export const decodeSignIn = (secret: string): SignIn => {
  let parsed: unknown
  try {
    parsed = JSON.parse(secret)
  } catch {
    parsed = undefined
  }
  const found = typeof parsed === "object" && parsed !== null ? (parsed as Record<string, unknown>) : {}
  if (typeof found.token !== "string" || !found.token || typeof found.portalId !== "string" || !found.portalId)
    throw new CliError("configuration_error", "the saved sign-in is not one hubspot wrote; run session start again", {
      reason: "session.unreadable",
    })
  return {
    token: found.token,
    portalId: found.portalId,
    uiDomain: typeof found.uiDomain === "string" ? found.uiDomain : null,
    // An entry written before the time zone was kept holds `utcOffsetMs`, which is ignored.
    ...(typeof found.timeZone === "string" && found.timeZone ? { timeZone: found.timeZone } : {}),
  }
}

export const ACCOUNT_VARIABLE = `${IDENTITY.envPrefix}_ACCOUNT`

/** The account `WCHUBSPOT_ACCOUNT` names, checked for its shape only; `undefined` when it is not set. */
export const environmentAccount = (env: NodeJS.ProcessEnv): string | undefined => {
  const portalId = env[ACCOUNT_VARIABLE]?.trim()
  if (!portalId) return undefined
  if (!/^\d+$/.test(portalId))
    throw new CliError("configuration_error", `${ACCOUNT_VARIABLE} must be the account's id, digits only`, {
      reason: "account.id-malformed",
    })
  return portalId
}

/**
 * `WCHUBSPOT_TOKEN` first, as for every token CLI, with `WCHUBSPOT_ACCOUNT` naming its account (the portal id), as
 * amo's token needs `AMO_HOST`; then the saved sign-in. Read with no network: whether the two belong together is
 * `refuseAccountMismatch`'s question. A token from the environment has no time zone, so its daily limit names the
 * earliest UTC time it can be back.
 */
export const storedSignIn = (command: Command): SignIn | undefined => {
  const { env, profile, tokens } = contextOf(command)
  const stored = tokens.read(profile)
  if (!stored) return undefined
  if (stored.source !== "environment") return decodeSignIn(stored.secret)
  const portalId = environmentAccount(env)
  if (!portalId)
    throw new CliError(
      "configuration_error",
      `${tokens.variable} needs ${ACCOUNT_VARIABLE}, the HubSpot account's id: ` +
        `\`${IDENTITY.command} ${profile} session status --check\` with the token alone prints it`,
      { reason: "account.id-missing" },
    )
  return { token: stored.secret, portalId, uiDomain: null }
}

/** Whether this run's key comes from `WCHUBSPOT_TOKEN`, whose account nobody has checked yet. */
export const fromEnvironment = (command: Command): boolean => {
  const { profile, tokens } = contextOf(command)
  return tokens.read(profile)?.source === "environment"
}

/**
 * A token's own account against the one `WCHUBSPOT_ACCOUNT` names. A wrong id would file this account's CRM under
 * another's in the shared store, so a mismatch is refused before anything is written. Names both ids, never the token.
 */
export const refuseAccountMismatch = (named: string, actual: string) => {
  if (named === actual) return
  throw new CliError(
    "configuration_error",
    `${ACCOUNT_VARIABLE} names account ${named}, but the token belongs to account ${actual}: ` +
      `set ${ACCOUNT_VARIABLE}=${actual}`,
    { reason: "account.mismatch", account: actual },
  )
}

/** The sign-in a request uses, or cli-core's `session.missing` refusal that names the command to sign in. */
export const signInOf = (command: Command) => {
  refuseOffline(command, SERVICE)
  const found = storedSignIn(command)
  if (found) return found
  const { profile, tokens } = contextOf(command)
  tokens.need(profile)
  throw new CliError("authentication_error", `profile ${profile} is not signed in`)
}

/** The bare token, read before any request; the api group sends it as `Authorization: Bearer`. */
export const tokenOf = (command: Command): string => signInOf(command).token

/**
 * HubSpot counts its limits per account, so every process on one account waits in one queue, whichever profile or
 * `WCHUBSPOT_TOKEN` it reads with. Only a first sign-in, whose account is not known yet, paces by the profile.
 */
export const pacerFor = (command: Command, portalId: string | undefined) => {
  const { environment, env, profile } = contextOf(command)
  return new Pacer(pacePathFor(IDENTITY, portalId ? `account-${portalId}` : profile, env), PACE, environment.now)
}

/** The transport for one run, paced with the api group by the account. */
export const hubFor = (
  command: Command,
  { token, portalId, timeZone }: { token: string; portalId?: string; timeZone?: string | undefined },
  events?: EventSink,
): HubSpotWriteTransport => {
  const { environment } = contextOf(command)
  return hubspotTransport({
    token,
    ...(timeZone ? { timeZone } : {}),
    ...(events ? { events } : {}),
    signal: environment.signal,
    ...(environment.fetch ? { fetch: environment.fetch } : {}),
    ...(environment.sleep ? { sleep: environment.sleep } : {}),
    ...(environment.now ? { now: environment.now } : {}),
    pacer: pacerFor(command, portalId),
  })
}

/**
 * Every remote call goes through here: inside cli-core's run, so `--timeout` bounds it, a failure or `--record` keeps
 * a run named after the command, and the transport's requests land in that run (WC-LIFE-5, WC-LIFE-15).
 */
export const withHub = <T>(command: Command, body: (hub: HubSpotTransport) => Promise<T>): Promise<T> => {
  const signIn = signInOf(command)
  return contextOf(command).run((events) => body(hubFor(command, signIn, events)))
}
