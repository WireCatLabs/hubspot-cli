import type { Pacer } from "@wirecat/cli-core/sends"
import { expect, it } from "vitest"
import { FAKE_PORTAL, FAKE_TOKEN, fakeHubspot, seededHubspot } from "../testing/fake-hubspot.js"
import { accountDetails } from "./account.js"
import { failureOf, hubspotTransport, untilNextDay } from "./transport.js"

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

it("reads the account the token belongs to, with its time zone offset and currency", async () => {
  expect(await accountDetails(transportOver(fakeHubspot()))).toEqual({
    portalId: FAKE_PORTAL,
    uiDomain: "app-eu1.hubspot.com",
    timeZone: "Europe/Madrid",
    accountType: "STANDARD",
    utcOffsetMs: 3_600_000,
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

it("the daily limit waits until midnight in the account's time zone and holds every process of the profile", async () => {
  const hub = fakeHubspot()
  hub.throttle("DAILY")
  const now = Date.parse("2026-11-17T20:00:00Z")
  const held: number[] = []
  const pacer = { reserve: async () => now, holdFor: async (ms: number) => void held.push(ms) } as unknown as Pacer
  await expect(
    transportOver(hub, { now: () => now, utcOffsetMs: 3_600_000, pacer }).get(COMPANIES),
  ).rejects.toMatchObject({
    code: "rate_limited",
    details: { reason: "hubspot.daily-limit", retry_after_ms: 3 * 3_600_000, retryable: true },
  })
  expect(held).toEqual([3 * 3_600_000])
})

it("the ten-second limit waits the window HubSpot names, a search a second, and nothing is retried", async () => {
  const hub = fakeHubspot()
  hub.throttle("TEN_SECONDLY_ROLLING", "TEN_SECONDLY_ROLLING")
  await expect(transportOver(hub).get(COMPANIES)).rejects.toMatchObject({
    code: "rate_limited",
    details: { reason: "hubspot.rate-limit", retry_after_ms: 10_000 },
  })
  await expect(
    transportOver(hub).post(`${COMPANIES}/search`, { filterGroups: [], sorts: [], properties: [], limit: 1 }),
  ).rejects.toMatchObject({ details: { retry_after_ms: 1_000 } })
  expect(hub.calls).toHaveLength(2)
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

it("a search is a read: a failure on HubSpot's side is retryable, never outcome_unknown", async () => {
  const failing = async () => new Response("{}", { status: 503 })
  const hub = hubspotTransport({ token: FAKE_TOKEN, fetch: failing })
  await expect(hub.post(`${COMPANIES}/search`, {})).rejects.toMatchObject({
    code: "provider_unavailable",
    details: { retryable: true },
  })
  await expect(hub.post(COMPANIES, {})).rejects.toMatchObject({ code: "outcome_unknown" })
})

it("a read that got no answer is a retryable timeout; a 401 asks to sign in again", async () => {
  await expect(
    hubspotTransport({ token: FAKE_TOKEN, fetch: silent, timeoutMs: 5 }).get(COMPANIES),
  ).rejects.toMatchObject({ code: "timeout", details: { retryable: true } })
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

it("counts the next midnight in the account's own day", () => {
  const at = Date.parse("2026-11-17T23:30:00Z")
  expect(untilNextDay(at)).toBe(30 * 60_000)
  expect(untilNextDay(at, 3_600_000)).toBe(23 * 3_600_000 + 30 * 60_000)
  expect(untilNextDay(at, -5 * 3_600_000)).toBe(5 * 3_600_000 + 30 * 60_000)
})
