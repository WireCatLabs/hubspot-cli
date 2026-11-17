import { CliError } from "@wirecat/cli-base"
import type { FetchLike } from "@wirecat/cli-base/http"
import { hostFetch, retrying } from "@wirecat/cli-base/http"
import { serviceApiCommand } from "@wirecat/cli-core/cli"
import type { Pacer } from "@wirecat/cli-core/sends"
import type { Command } from "commander"
import { API, configuration } from "../config.js"
import { contextOf, pacerFor, storedSignIn, tokenOf } from "../context.js"
import { failureOf, isRecord, LONGEST_PACE_WAIT_MS } from "../hubspot/transport.js"
import { DESKTOP, IDENTITY } from "../identity.js"

/** What the error mapping needs of the command that sent the request; one command runs per process. */
interface Sent {
  now: () => number
  timeZone?: string | undefined
}

/**
 * A 429 for the account's daily allowance ends the request at once: `retrying` would send it again within seconds,
 * and it only comes back at the account's midnight. Every process on the account then holds off until then.
 */
const stopAtDailyLimit =
  (send: FetchLike, sent: Sent, pacer: Pacer): FetchLike =>
  async (input, init) => {
    const response = await send(input, init)
    if (response.status !== 429) return response
    const body: unknown = await response
      .clone()
      .json()
      .catch(() => undefined)
    if (!isRecord(body) || body.policyName !== "DAILY") return response
    await response.body?.cancel().catch(() => {})
    const failure = failureOf({ status: 429, writes: false, body, now: sent.now(), timeZone: sent.timeZone })
    const wait = failure.details.retry_after_ms
    if (typeof wait === "number") await pacer.holdFor(wait).catch(() => undefined)
    throw new CliError(failure.code, failure.message, { ...failure.details, retryable: false })
  }

/**
 * HubSpot's CRM API from its spec: `api list`, `api show` and one command per operation, through cli-core's shared
 * group, each write and delete behind its keys. The requests keep the account's pace beside the CRM commands, the token
 * is the profile's own, and a refusal reads as the CRM commands' do: the scope a 403 names, the daily limit and its
 * midnight, and a write HubSpot failed during as `outcome_unknown`.
 */
export const apiCommand = (): Command => {
  const sent: Sent = { now: Date.now }
  return serviceApiCommand({
    ...API,
    app: IDENTITY,
    configuration,
    fetch: (command) => {
      const { environment } = contextOf(command)
      const { now } = environment
      const signIn = storedSignIn(command)
      sent.now = now ?? Date.now
      sent.timeZone = signIn?.timeZone
      const pacer = pacerFor(command, signIn?.portalId)
      const send = hostFetch({ hosts: DESKTOP.hosts ?? [], ...(environment.fetch ? { fetch: environment.fetch } : {}) })
      // A hold longer than this, such as the daily limit's until midnight, ends the command at once, as the CRM
      // commands do, instead of sleeping in it.
      return retrying(stopAtDailyLimit(send, sent, pacer), {
        pacer,
        budget: LONGEST_PACE_WAIT_MS,
        ...(environment.sleep ? { sleep: environment.sleep } : {}),
        ...(now ? { now: () => new Date(now()) } : {}),
      })
    },
    failure: (status, answer, operation) =>
      failureOf({
        status,
        writes: operation.effect !== "read",
        body: answer,
        now: sent.now(),
        timeZone: sent.timeZone,
      }),
    token: tokenOf,
    schemas: () => import("../generated/schemas.js").then((module) => module.schemas),
    definitions: () => import("../generated/definitions.js").then((module) => module.definitions),
  })
}
