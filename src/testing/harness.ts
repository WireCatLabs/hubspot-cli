import { Readable } from "node:stream"
import { type KeyringStore, memoryKeyring } from "@wirecat/cli-base"
import type { RunOptions } from "@wirecat/cli-core/cli"
import { encodeSignIn, type HubspotEnvironment } from "../context.js"
import { run } from "../program.js"
import { FAKE_PORTAL, FAKE_TOKEN, seededHubspot } from "./fake-hubspot.js"

export const FAKE_ACCOUNT = String(FAKE_PORTAL)
export const FAKE_SIGN_IN = encodeSignIn({ token: FAKE_TOKEN, portalId: FAKE_ACCOUNT, uiDomain: "app-eu1.hubspot.com" })

/** A keyring where profile `work` is already signed in to the fake account; never the real one (WC-TEST-2). */
export const signedIn = (): KeyringStore => memoryKeyring({ "hubspot-cli:token:work": FAKE_SIGN_IN })

export interface Ran {
  code: number
  out: string
  err: string
  /** stdout parsed, or the error object from stderr. */
  json: () => Record<string, unknown>
}

/** `hubspot` through its own `run()`, as a person or an agent types it, against the fake account, with no real waits. */
export const hubspot = async (
  argv: string[],
  {
    account = seededHubspot().hub,
    keyring = signedIn(),
    stdin,
    env,
    answer,
  }: {
    account?: { fetch: typeof fetch }
    keyring?: KeyringStore
    stdin?: string
    env?: NodeJS.ProcessEnv
    /** The owner's answer to a question; cli-core never asks under --json, so a test of `ask` leaves it out. */
    answer?: (question: string) => Promise<string | null> | string | null
  } = {},
): Promise<Ran> => {
  const out: string[] = []
  const err: string[] = []
  let clock = Date.now()
  const options: RunOptions & HubspotEnvironment = {
    streams: { data: (text) => out.push(text), diagnostic: (text) => err.push(text) },
    tty: false,
    keyring,
    fetch: account.fetch,
    sleep: async (ms) => {
      clock += ms
    },
    now: () => clock,
    ...(env ? { env: { ...process.env, ...env } } : {}),
    ...(answer ? { answer } : {}),
    ...(stdin === undefined ? {} : { stdin: Object.assign(Readable.from([stdin]), { isTTY: false }) }),
  }
  const code = await run(argv, options)
  const text = { out: out.join(""), err: err.join("") }
  return { code, ...text, json: () => JSON.parse(text.out.trim() || text.err.trim()) as Record<string, unknown> }
}
