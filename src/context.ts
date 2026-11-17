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
import { type HubSpotTransport, hubspotTransport, PACE, SERVICE } from "./hubspot/transport.js"
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
  /** The account's offset from UTC when it signed in: HubSpot's daily allowance comes back at its midnight. */
  utcOffsetMs?: number
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
      reason: "session.malformed",
    })
  return {
    token: found.token,
    portalId: found.portalId,
    uiDomain: typeof found.uiDomain === "string" ? found.uiDomain : null,
    ...(typeof found.utcOffsetMs === "number" ? { utcOffsetMs: found.utcOffsetMs } : {}),
  }
}

/** `WCHUBSPOT_TOKEN` first, which names no account, then the saved sign-in; read with no network. */
export const storedSignIn = (
  command: Command,
): (Omit<SignIn, "portalId"> & { portalId: string | null }) | undefined => {
  const { profile, tokens } = contextOf(command)
  const stored = tokens.read(profile)
  if (!stored) return undefined
  if (stored.source === "environment") return { token: stored.secret, portalId: null, uiDomain: null }
  return decodeSignIn(stored.secret)
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
 * The transport for one run. Its pace is the profile's, shared with the api group: a second profile on the same
 * account is refused at `session start`, so per profile is per account.
 */
export const hubFor = (
  command: Command,
  { token, utcOffsetMs }: Pick<SignIn, "token" | "utcOffsetMs">,
  events?: EventSink,
): HubSpotTransport => {
  const { environment, env, profile } = contextOf(command)
  return hubspotTransport({
    token,
    ...(utcOffsetMs === undefined ? {} : { utcOffsetMs }),
    ...(events ? { events } : {}),
    signal: environment.signal,
    ...(environment.fetch ? { fetch: environment.fetch } : {}),
    ...(environment.sleep ? { sleep: environment.sleep } : {}),
    ...(environment.now ? { now: environment.now } : {}),
    pacer: new Pacer(pacePathFor(IDENTITY, profile, env), PACE, environment.now),
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
