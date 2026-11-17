import type { Pacer } from "@wirecat/cli-core/sends"
import { afterEach, expect, it, vi } from "vitest"
import { DESKTOP } from "../identity.js"
import { FAKE_PORTAL, FAKE_TOKEN, fakeHubspot, seededHubspot } from "../testing/fake-hubspot.js"
import { accountDetails } from "./account.js"
import {
  failureOf,
  HUBSPOT_API,
  hubspotTransport,
  LONGEST_PACE_WAIT_MS,
  TIMEOUT_MS,
  untilNextDay,
} from "./transport.js"

afterEach(() => {
  vi.useRealTimers()
})

const silent = async (_url: unknown, init?: RequestInit) =>
  new Promise<Response>((_, reject) => init?.signal?.addEventListener("abort", () => reject(init.signal?.reason)))

const transportOver = (
  hub: ReturnType<typeof fakeHubspot>,
  extra: Partial<Parameters<typeof hubspotTransport>[0]> = {},
) => hubspotTransport({ token: FAKE_TOKEN, fetch: hub.fetch, sleep: async () => {}, ...extra })

const COMPANIES = "/crm/objects/2026-03/companies"

it("sends the token in the Authorization header only, and refuses a redirect", async () => {
  const hub = fakeHubspot()
  const sent: RequestInit[] = []
  await hubspotTransport({
    token: FAKE_TOKEN,
    fetch: (input, init = {}) => {
      sent.push(init)
      return hub.fetch(input, init)
    },
  }).get(COMPANIES, { limit: 1 })
  expect(hub.calls[0]?.url.href).not.toContain(FAKE_TOKEN)
  expect(hub.calls[0]?.headers.get("authorization")).toBe(`Bearer ${FAKE_TOKEN}`)
  expect(sent[0]?.redirect).toBe("error")
  expect(hub.refusals).toEqual([])
})

it("refuses a path that leaves the API before any request", async () => {
  const hub = fakeHubspot()
  for (const path of ["//evil.example/x", "/crm/../oauth", "/crm?x=1", "crm/objects"])
    await expect(transportOver(hub).get(path)).rejects.toMatchObject({ code: "validation_error" })
  expect(hub.calls).toEqual([])
})

it("reads the account the token belongs to, with its time zone and currency", async () => {
  expect(await accountDetails(transportOver(fakeHubspot()))).toEqual({
    portalId: FAKE_PORTAL,
    uiDomain: "app-eu1.hubspot.com",
    timeZone: "Europe/Madrid",
    accountType: "STANDARD",
    companyCurrency: "EUR",
  })
})

it("a missing scope is permission_error naming the scope, never HubSpot's own text", async () => {
  const hub = fakeHubspot({ refuse: ["leads"] })
  const error = (await transportOver(hub)
    .get("/crm/objects/2026-03/leads")
    .catch((caught: unknown) => caught)) as Error & { details?: unknown }
  expect(error).toMatchObject({
    code: "permission_error",
    details: { reason: "hubspot.scope-missing", scope: "crm.objects.leads.read", provider_error: "MISSING_SCOPES" },
  })
  expect(JSON.stringify({ message: error.message, details: error.details })).not.toContain(FAKE_TOKEN)
  expect(error.message).not.toContain("echo")
})

it("the daily limit is not retried: it waits till midnight in the account's zone and holds every process", async () => {
  const hub = fakeHubspot()
  hub.throttle("DAILY")
  const now = Date.parse("2026-11-17T20:00:00Z")
  const held: number[] = []
  const pacer = { reserve: async () => now, holdFor: async (ms: number) => void held.push(ms) } as unknown as Pacer
  await expect(
    transportOver(hub, { now: () => now, timeZone: "Europe/Madrid", pacer }).get(COMPANIES),
  ).rejects.toMatchObject({
    code: "rate_limited",
    details: { reason: "hubspot.daily-limit", retry_after_ms: 3 * 3_600_000, retryable: true },
  })
  expect(held).toEqual([3 * 3_600_000])
  expect(hub.calls).toHaveLength(1)
})

it("the ten-second limit waits the window HubSpot names, a search a second, and then tries again", async () => {
  const hub = fakeHubspot()
  const slept: number[] = []
  const sleep = async (ms: number) => void slept.push(ms)
  hub.throttle("TEN_SECONDLY_ROLLING")
  await expect(transportOver(hub, { sleep }).get(COMPANIES)).resolves.toMatchObject({ results: [] })
  hub.throttle("TEN_SECONDLY_ROLLING")
  await expect(
    transportOver(hub, { sleep }).post(`${COMPANIES}/search`, {
      filterGroups: [],
      sorts: [],
      properties: [],
      limit: 1,
    }),
  ).resolves.toMatchObject({ total: 0 })
  expect(slept).toEqual([10_000, 1_000])
  expect(hub.calls).toHaveLength(4)
  expect(failureOf({ status: 429, writes: false, body: { policyName: "TEN_SECONDLY_ROLLING" } })).toMatchObject({
    details: { reason: "hubspot.rate-limit", retry_after_ms: 10_000 },
  })
})

it("HubSpot's search refuses a page past 10,000 results and more filters than its groups take", async () => {
  const hub = fakeHubspot()
  const search = (body: Record<string, unknown>) =>
    transportOver(hub).post(`${COMPANIES}/search`, { filterGroups: [], sorts: [], properties: [], limit: 200, ...body })
  await expect(search({ after: "9900" })).rejects.toMatchObject({ code: "validation_error" })
  const filter = { propertyName: "name", operator: "EQ", value: "x" }
  await expect(search({ filterGroups: [{ filters: Array(7).fill(filter) }] })).rejects.toMatchObject({
    code: "validation_error",
  })
  await expect(search({ filterGroups: Array(6).fill({ filters: [filter] }) })).rejects.toMatchObject({
    code: "validation_error",
  })
  await expect(search({ after: "9800" })).resolves.toMatchObject({ total: 0 })
})

it("a search and a batch read are reads, tried again on a failure on HubSpot's side; a write is never", async () => {
  let sent = 0
  const failing = async () => {
    sent += 1
    return new Response("{}", { status: 503 })
  }
  const hub = hubspotTransport({ token: FAKE_TOKEN, fetch: failing, sleep: async () => {} })
  for (const path of [`${COMPANIES}/search`, "/crm/associations/2026-03/deals/companies/batch/read"]) {
    sent = 0
    await expect(hub.post(path, {})).rejects.toMatchObject({
      code: "provider_unavailable",
      details: { retryable: true },
    })
    expect(sent).toBe(4)
  }
  sent = 0
  await expect(hub.post(COMPANIES, {})).rejects.toMatchObject({ code: "outcome_unknown" })
  expect(sent).toBe(1)
})

it("a 400 says HubSpot refused it and keeps HubSpot's category, never its message", async () => {
  const hub = fakeHubspot()
  const error = (await transportOver(hub)
    .post(`${COMPANIES}/search`, { filterGroups: [], sorts: [], properties: [], limit: 200, after: "9900" })
    .catch((caught: unknown) => caught)) as Error & { details?: unknown }
  expect(error).toMatchObject({ code: "validation_error", details: { provider_error: "VALIDATION_ERROR" } })
  expect(JSON.stringify({ message: error.message, details: error.details })).not.toMatch(/echo|pat-na1/)
})

it("puts HubSpot's error category in the run record", async () => {
  const hub = fakeHubspot({ refuse: ["leads"] })
  const events: Record<string, unknown>[] = []
  await transportOver(hub, { events: (event) => void events.push(event as unknown as Record<string, unknown>) })
    .get("/crm/objects/2026-03/leads")
    .catch(() => undefined)
  expect(JSON.stringify(events)).toContain("MISSING_SCOPES")
})

it("a read that got no answer is a retryable timeout, tried again; a 401 asks to sign in again", async () => {
  let sent = 0
  const counted = (url: unknown, init?: RequestInit) => {
    sent += 1
    return silent(url, init)
  }
  await expect(
    hubspotTransport({ token: FAKE_TOKEN, fetch: counted, timeoutMs: 5, sleep: async () => {} }).get(COMPANIES),
  ).rejects.toMatchObject({ code: "timeout", details: { retryable: true } })
  expect(sent).toBe(4)
  expect(failureOf({ status: 401, writes: false })).toMatchObject({
    code: "authentication_error",
    details: { reason: "session.expired" },
  })
})

it("keeps the path's ids out of the run record", async () => {
  const { hub, ids } = seededHubspot()
  const events: unknown[] = []
  await transportOver(hub, { events: (event) => void events.push(event) }).get(
    `/crm/objects/2026-03/contacts/${ids.ana}`,
  )
  expect(JSON.stringify(events)).toContain("/crm/objects/2026-03/contacts/{id}")
  expect(JSON.stringify(events)).not.toContain(`/contacts/${ids.ana}`)
})

it("counts the next midnight in the account's own zone, across a change of summer time", () => {
  const at = Date.parse("2026-11-17T23:30:00Z")
  expect(untilNextDay(at)).toBe(30 * 60_000)
  expect(untilNextDay(at, "Europe/Madrid")).toBe(23 * 3_600_000 + 30 * 60_000)
  expect(untilNextDay(at, "America/New_York")).toBe(5 * 3_600_000 + 30 * 60_000)
  expect(untilNextDay(at, "Not/A_Zone")).toBe(30 * 60_000)
  // 2026-03-29 02:00 Madrid goes to 03:00: from 23:00 local on the 28th, midnight is an hour away all the same.
  expect(untilNextDay(Date.parse("2026-03-28T22:00:00Z"), "Europe/Madrid")).toBe(3_600_000)
  // 2026-10-25 has 25 hours in Madrid: from 00:30 that day, the next midnight is 24.5 hours away.
  expect(untilNextDay(Date.parse("2026-10-24T22:30:00Z"), "Europe/Madrid")).toBe(24.5 * 3_600_000)
})

it("a pace wait longer than 20 s ends rate_limited without sending anything", async () => {
  const hub = fakeHubspot()
  const now = Date.parse("2026-11-17T10:00:00Z")
  const pacer = { reserve: async () => now + LONGEST_PACE_WAIT_MS + 1 } as unknown as Pacer
  await expect(transportOver(hub, { now: () => now, pacer }).get(COMPANIES)).rejects.toMatchObject({
    code: "rate_limited",
  })
  expect(LONGEST_PACE_WAIT_MS).toBe(20_000)
  expect(hub.calls).toEqual([])
})

it("a request that never answers ends as a timeout after 10 s, each try of it", async () => {
  vi.useFakeTimers()
  let sent = 0
  const counted = (url: unknown, init?: RequestInit) => {
    sent += 1
    return silent(url, init)
  }
  const ended = hubspotTransport({ token: FAKE_TOKEN, fetch: counted, sleep: async () => {} })
    .get(COMPANIES)
    .catch((error: unknown) => error)
  await vi.advanceTimersByTimeAsync(TIMEOUT_MS - 1)
  expect(sent).toBe(1)
  await vi.advanceTimersByTimeAsync(1)
  for (let tries = 1; tries < 4; tries += 1) await vi.advanceTimersByTimeAsync(TIMEOUT_MS)
  expect(await ended).toMatchObject({ code: "timeout" })
  expect(sent).toBe(4)
  expect(TIMEOUT_MS).toBe(10_000)
})

it("reaches only HubSpot's API host: the list wcat shows is that one host", async () => {
  expect(DESKTOP.hosts).toEqual([new URL(HUBSPOT_API).hostname])
  const hosts: string[] = []
  const hub = fakeHubspot()
  await hubspotTransport({
    token: FAKE_TOKEN,
    fetch: (input, init) => {
      hosts.push(new URL(String(input instanceof Request ? input.url : input)).hostname)
      return hub.fetch(input, init)
    },
  }).get(COMPANIES)
  expect(hosts).toEqual(["api.hubapi.com"])
})
