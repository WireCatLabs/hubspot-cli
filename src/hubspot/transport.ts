import { CliError, type CliErrorDetails, isCliError, realSleep, type SleepLike } from "@wirecat/cli-base"
import { hostFetch, providerWaitMs, readJsonResponse, statusToCode } from "@wirecat/cli-base/http"
import { type EventSink, providerRequest } from "@wirecat/cli-core/cli"
import type { Pacer } from "@wirecat/cli-core/sends"

export const HUBSPOT_API = "https://api.hubapi.com"
export const SERVICE = "HubSpot"

/**
 * Four requests a second, one at a time. Under both of HubSpot's limits on a Free or Starter account: 100 requests in
 * 10 s per app, and 5 a second per account on the search endpoints, which every round of changes uses
 * (https://developers.hubspot.com/docs/developer-tooling/platform/usage-guidelines,
 * https://developers.hubspot.com/docs/api-reference/search/guide). A burst above 1 would let six searches go in one
 * second.
 */
export const PACE = { perMinute: 240, burst: 1 }

const TIMEOUT_MS = 30_000
const LARGEST_ANSWER = 16 * 1024 * 1024
/** A pace wait longer than this ends the run with `rate_limited` instead of sitting in it. */
const LONGEST_PACE_WAIT_MS = 60_000
/** The rolling window of the per-app limit, when HubSpot sends no header to say (usage-guidelines). */
const WINDOW_MS = 10_000
/** Search answers carry no rate-limit header (usage-guidelines); its limit is per second. */
const SEARCH_WAIT_MS = 1_000
const DAY_MS = 86_400_000

export interface TransportOptions {
  token: string
  fetch?: typeof fetch
  signal?: AbortSignal | undefined
  /** The run's sink from `baseContext(...).run(events => …)`, so each request lands in the run record (WC-LIFE-15). */
  events?: EventSink
  /** cli-core's per-profile pace, shared by every process of the profile through a file. */
  pacer?: Pacer
  sleep?: SleepLike
  now?: () => number
  timeoutMs?: number
  /**
   * The account's offset from UTC (`accountDetails().utcOffsetMs`): the daily limit resets at midnight in the
   * account's time zone (usage-guidelines). Absent, midnight UTC is assumed.
   */
  utcOffsetMs?: number
}

export type Query = Record<string, string | number | boolean | undefined>

export interface HubSpotTransport {
  get<T = unknown>(path: string, query?: Query): Promise<T>
  post<T = unknown>(path: string, body: Record<string, unknown>): Promise<T>
}

/** An id put into a path: `new URL` folds a `.` or `..` segment into its parent, reaching another endpoint. */
export const segment = (value: string): string => {
  if (value === "" || value === "." || value === "..")
    throw new CliError("validation_error", `an empty, "." or ".." id is refused: it names no single HubSpot record`)
  return encodeURIComponent(value)
}

/** The run record keeps the path with its ids taken out (WC-LIFE-15). */
const templateOf = (path: string) => path.replace(/\/\d+(?=\/|$)/g, "/{id}")

/** A search or batch read is a POST that changes nothing (search guide, object APIs guide). */
const READING_POST = /\/(search|batch\/read)$/

const SCOPE = /^[a-z][a-z0-9._-]{0,79}$/
const CATEGORY = /^[A-Z][A-Z0-9_]{0,63}$/

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

/**
 * The scopes a 403 names, if it names any: only scope-shaped words are taken, never HubSpot's text. Where HubSpot puts
 * them in the body is not in its docs (error-handling shows no 403 body); `errors[].context` is where the standard
 * error's `context` sits (`StandardError` in the spec), under any key with "scope" in its name.
 */
const scopesOf = (body: unknown): string[] => {
  const errors = isRecord(body) && Array.isArray(body.errors) ? body.errors : []
  const named = errors.flatMap((error) =>
    isRecord(error) && isRecord(error.context)
      ? Object.entries(error.context).flatMap(([key, value]) =>
          /scope/i.test(key) && Array.isArray(value) ? value : [],
        )
      : [],
  )
  return [...new Set(named.filter((one): one is string => typeof one === "string" && SCOPE.test(one)))]
}

const categoryOf = (body: unknown) => {
  const category = isRecord(body) ? body.category : undefined
  return typeof category === "string" && CATEGORY.test(category) ? category : undefined
}

/** Milliseconds to the account's next midnight, when HubSpot's daily allowance comes back (usage-guidelines). */
export const untilNextDay = (now: number, utcOffsetMs = 0): number => {
  const local = now + utcOffsetMs
  return DAY_MS - (((local % DAY_MS) + DAY_MS) % DAY_MS)
}

export interface Refused {
  status: number
  /** The request may have changed something: a failure on HubSpot's side is then `outcome_unknown`. */
  writes: boolean
  body?: unknown
  headers?: Headers
  now?: number
  utcOffsetMs?: number
  search?: boolean
}

/**
 * A refusal as a CliError with a stable code and reason. HubSpot's own `message` is never repeated: it can quote what
 * was sent (WC-SECR-6). The error body is `{status, message, correlationId, category, errors[]}`
 * (https://developers.hubspot.com/docs/api-reference/error-handling); only a code-shaped `category` and scope names
 * are kept.
 */
export const failureOf = ({
  status,
  writes,
  body,
  headers = new Headers(),
  now = Date.now(),
  utcOffsetMs,
  search = false,
}: Refused): CliError => {
  const category = categoryOf(body)
  const details: CliErrorDetails = { status, ...(category ? { provider_error: category } : {}) }
  if (status === 401)
    return new CliError(
      "authentication_error",
      `${SERVICE} refused the token: it was revoked, expired or mistyped. Sign in again with session start`,
      { ...details, reason: "session.expired" },
    )
  if (status === 403) {
    const [scope] = scopesOf(body)
    return scope
      ? new CliError("permission_error", `the ${SERVICE} token lacks the ${scope} scope`, {
          ...details,
          reason: "hubspot.scope-missing",
          scope,
        })
      : new CliError("permission_error", `the ${SERVICE} token may not read this`, {
          ...details,
          reason: "hubspot.access-denied",
        })
  }
  if (status === 429) {
    const policy = isRecord(body) ? body.policyName : undefined
    if (policy === "DAILY") {
      const wait = untilNextDay(now, utcOffsetMs)
      return new CliError(
        "rate_limited",
        `the ${SERVICE} account spent its daily API allowance, shared by every app on it; it comes back at midnight ` +
          `in the account's time zone, in ${Math.ceil(wait / 3_600_000)} h`,
        { ...details, reason: "hubspot.daily-limit", retryable: true, retry_after_ms: wait },
      )
    }
    const interval = Number(headers.get("x-hubspot-ratelimit-interval-milliseconds"))
    const wait =
      providerWaitMs(headers, () => new Date(now)) ??
      (search ? SEARCH_WAIT_MS : Number.isFinite(interval) && interval > 0 ? interval : WINDOW_MS)
    return new CliError("rate_limited", `${SERVICE} asked to slow down; retry in a few seconds`, {
      ...details,
      reason: "hubspot.rate-limit",
      retryable: true,
      retry_after_ms: wait,
    })
  }
  if (status >= 500 && writes)
    return new CliError("outcome_unknown", `${SERVICE} failed during a write; check it before repeating the write`, {
      ...details,
      retryable: false,
    })
  if (status === 404)
    return new CliError("not_found", `${SERVICE} has no such record, or this token cannot see it`, details)
  if (status === 400)
    return new CliError("validation_error", `${SERVICE} refused the request as malformed (HTTP 400)`, details)
  if (status >= 500)
    return new CliError("provider_unavailable", `${SERVICE} failed (HTTP ${status}); try again later`, {
      ...details,
      retryable: true,
    })
  return new CliError(statusToCode(status), `${SERVICE} refused the request (HTTP ${status})`, details)
}

const queryOf = (url: URL, query: Query = {}) => {
  for (const [key, value] of Object.entries(query)) if (value !== undefined) url.searchParams.set(key, String(value))
  return url
}

/**
 * The only code that holds the token: it goes in the Authorization header, never in an address, an error or a run
 * record (WC-SECR-7). Nothing here retries. A read the caller may run again; a write is never sent twice, since the
 * first may have landed (WC-OUT-20).
 */
export const hubspotTransport = (options: TransportOptions): HubSpotTransport => {
  const fetchOf = hostFetch({
    hosts: [new URL(HUBSPOT_API).hostname],
    ...(options.fetch ? { fetch: options.fetch } : {}),
  })
  const sleep = options.sleep ?? realSleep
  const now = options.now ?? Date.now

  const turn = async () => {
    if (!options.pacer) return
    const wait = (await options.pacer.reserve()) - now()
    if (wait <= 0) return
    if (wait > LONGEST_PACE_WAIT_MS)
      throw new CliError("rate_limited", `this profile must wait ${Math.ceil(wait / 1000)} s before its next request`, {
        retry_after_ms: wait,
      })
    await sleep(wait, options.signal, "retry")
  }

  const unanswered = (writes: boolean, error: unknown): CliError => {
    // Before the stop check: a write stopped in flight may still have landed (WC-LIFE-9).
    if (writes)
      return new CliError("outcome_unknown", `${SERVICE} did not answer a write; check it before repeating the write`, {
        retryable: false,
      })
    if (options.signal?.aborted) return new CliError("cancelled", `the ${SERVICE} request was stopped`)
    const timedOut = (error as { name?: string } | undefined)?.name === "TimeoutError"
    return timedOut
      ? new CliError("timeout", `${SERVICE} did not answer in time`, { retryable: true })
      : new CliError("network_error", `${SERVICE} could not be reached`, { retryable: true })
  }

  const send = async <T>(method: "GET" | "POST", path: string, query?: Query, body?: Record<string, unknown>) => {
    if (!path.startsWith("/") || path.startsWith("//") || /[?#]|\/\.\.?(\/|$)/.test(path))
      throw new CliError("validation_error", `${path} is not a ${SERVICE} API path`)
    const writes = method === "POST" && !READING_POST.test(path)
    const url = queryOf(new URL(path, HUBSPOT_API), query)
    await turn()
    // Not AbortSignal.timeout: its timer keeps the run's async context alive until it fires.
    const deadline = new AbortController()
    const timer = setTimeout(
      () => deadline.abort(new DOMException("timed out", "TimeoutError")),
      options.timeoutMs ?? TIMEOUT_MS,
    )
    timer.unref()
    const signal = options.signal ? AbortSignal.any([options.signal, deadline.signal]) : deadline.signal
    const end = providerRequest(`${method} ${templateOf(path)}`, options.events, { method, transport: "http" })
    try {
      let response: Response
      try {
        response = await fetchOf(url, {
          method,
          headers: {
            authorization: `Bearer ${options.token}`,
            accept: "application/json",
            ...(body ? { "content-type": "application/json" } : {}),
          },
          ...(body ? { body: JSON.stringify(body) } : {}),
          // A redirect would carry the Authorization header to an address we did not choose.
          redirect: "error",
          signal,
        })
      } catch (error) {
        const failure = unanswered(writes, deadline.signal.reason ?? error)
        end({ errorCode: failure.code })
        throw failure
      }
      if (!response.ok) {
        const answer = await readJsonResponse(response, { maxBytes: LARGEST_ANSWER, signal }).catch(() => undefined)
        const failure = failureOf({
          status: response.status,
          writes,
          body: answer,
          headers: response.headers,
          now: now(),
          ...(options.utcOffsetMs === undefined ? {} : { utcOffsetMs: options.utcOffsetMs }),
          search: path.endsWith("/search"),
        })
        end({ status: response.status, errorCode: failure.code })
        // Every process of the profile holds off, not only this one: a daily limit is the whole account's.
        if (failure.code === "rate_limited" && typeof failure.details.retry_after_ms === "number")
          await options.pacer?.holdFor(failure.details.retry_after_ms).catch(() => undefined)
        throw failure
      }
      if (response.status === 204) {
        end({ status: 204 })
        return undefined as T
      }
      let answer: unknown
      try {
        answer = await readJsonResponse(response, { maxBytes: LARGEST_ANSWER, signal })
      } catch (error) {
        const failure =
          isCliError(error) && error.code !== "invalid_response"
            ? error
            : new CliError("invalid_response", `${SERVICE} answered with something other than bounded JSON`)
        end({ status: response.status, errorCode: failure.code })
        throw failure
      }
      end({ status: response.status })
      return answer as T
    } finally {
      clearTimeout(timer)
    }
  }

  return {
    get: <T>(path: string, query?: Query) => send<T>("GET", path, query),
    post: <T>(path: string, body: Record<string, unknown>) => send<T>("POST", path, undefined, body),
  }
}
