import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { CrmActivity, CrmItem, CrmOrganization, CrmPerson } from "@wirecat/cli-core"
import { type CrmCallContext, type CrmPage, crmGapsOf, syncCrm } from "@wirecat/cli-core/crm"
import { type MessageStore, openStore } from "@wirecat/cli-core/store"
import { afterEach, expect, it } from "vitest"
import { hubspotTransport } from "../hubspot/transport.js"
import { FAKE_TOKEN, type FakeHubspot, fakeHubspot, seededHubspot } from "../testing/fake-hubspot.js"
import { OVERLAP_MS } from "./records.js"
import { fitted, hubspotCrmSource, MAX_PROPERTIES_CHARS } from "./source.js"

const over = (
  hub: FakeHubspot,
  now: () => number = Date.now,
  page?: number,
  searchPage?: number,
  fetch: typeof globalThis.fetch = hub.fetch,
) => {
  const transport = hubspotTransport({ token: FAKE_TOKEN, fetch, sleep: async () => {}, now })
  return hubspotCrmSource(() => transport, {
    now,
    ...(page ? { page } : {}),
    ...(searchPage ? { searchPage } : {}),
  })
}

/** Every page of a round; a paging bug that never ends fails here instead of hanging the suite. */
const full = async <T>(read: (page?: string) => Promise<CrmPage<T> | { reset: true }>, cap = 500) => {
  const items: T[] = []
  let page: string | undefined
  for (let read_ = 0; ; read_ += 1) {
    if (read_ >= cap) throw new Error(`more than ${cap} pages`)
    const answer = await read(page)
    if ("reset" in answer) throw new Error("reset")
    items.push(...answer.items)
    if (!answer.hasMore) return { items, cursor: answer.cursor ?? null }
    page = answer.nextCursor
  }
}

const gaps: { kind: string; message: string; scope?: string }[] = []
const context: CrmCallContext = { spend: () => {}, gap: (gap) => gaps.push(gap) }
const searches = (hub: FakeHubspot) => hub.calls.filter((call) => call.url.pathname.endsWith("/search"))

const stores: MessageStore[] = []
afterEach(async () => {
  gaps.length = 0
  for (const store of stores.splice(0)) await store.close()
})

it("maps a deal into core's shape: decimal money, a day, its contacts and company, the account's own fields", async () => {
  const { hub, ids } = seededHubspot()
  const { items } = await full<CrmItem>((page) => over(hub).changes("deal", null, page))
  expect(items.find((one) => one.externalId === ids.kitchen)).toMatchObject({
    title: "Example kitchen",
    pipeline: "default",
    stage: "appointmentscheduled",
    amount: "15000.5",
    currency: "EUR",
    closeDate: "2026-12-01",
    assignee: "501",
    organization: ids.acme,
    people: [{ externalId: ids.ana, role: "contact" }],
    metadata: { example_source: { label: "Source", value: "Website", option_id: "web" } },
  })
  // Asked for and none: a link removed in HubSpot leaves the copy on a full list too.
  expect(items.find((one) => one.title === "Example lost")).toMatchObject({ people: [], organization: null })
  // A one-currency account leaves deal_currency_code empty: the account's currency stands in.
  expect(items.find((one) => one.externalId === ids.won)).toMatchObject({ amount: "900", currency: "EUR" })
  const list = hub.calls.find((call) => call.url.pathname === "/crm/objects/2026-03/0-3")
  expect(list?.url.searchParams.get("associations")).toBe("contacts")
  expect(hub.calls.some((call) => call.url.pathname === "/crm/associations/2026-03/deals/companies/batch/read")).toBe(
    true,
  )
  expect(hub.refusals).toEqual([])
})

it("hands core every phone and address of a contact, its primary company first, and a company's bare website", async () => {
  const { hub, ids } = seededHubspot()
  const people = await full<CrmPerson>((page) => over(hub).changes("person", null, page))
  expect(people.items.find((one) => one.externalId === ids.ana)).toMatchObject({
    name: "Ana Example",
    email: "ana@example.com",
    emails: ["ana@example.com", "ana.private@example.net"],
    phone: "+34 600 000 002",
    position: "Buyer",
    organizations: [{ externalId: ids.acme, primary: true }],
  })
  expect(people.items.find((one) => one.externalId === ids.cy)?.organizations).toEqual([])
  const companies = await full<CrmOrganization>((page) => over(hub).changes("organization", null, page))
  expect(companies.items.find((one) => one.externalId === ids.beta)?.url).toBe("https://two.example.org")
  expect(companies.items.find((one) => one.externalId === ids.acme)?.url).toBe("https://example.com")
})

it("reads changes by search from the last cursor less ten minutes, oldest first, with associations read apart", async () => {
  const { hub, ids } = seededHubspot()
  const source = over(hub)
  const { cursor } = await full<CrmItem>((page) => source.changes("deal", null, page))
  expect(cursor).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  hub.touch("deals", ids.kitchen, { dealstage: "closedwon" })
  const { items } = await full<CrmItem>((page) => source.changes("deal", cursor, page))
  expect(items.find((one) => one.externalId === ids.kitchen)).toMatchObject({
    stage: "closedwon",
    people: [{ externalId: ids.ana, role: "contact" }],
    organization: ids.acme,
  })
  const [sent] = searches(hub).map((call) => call.body as Record<string, unknown>)
  expect(sent).toMatchObject({
    filterGroups: [{ filters: [{ propertyName: "hs_lastmodifieddate", operator: "GTE" }] }],
    sorts: [{ propertyName: "hs_lastmodifieddate", direction: "ASCENDING" }],
    limit: 200,
  })
  expect(sent).not.toHaveProperty("after")
  const from = Number((sent?.filterGroups as { filters: { value: string }[] }[] | undefined)?.[0]?.filters[0]?.value)
  expect(Date.parse(String(cursor)) - from).toBe(OVERLAP_MS)
  expect(hub.calls.some((call) => call.url.pathname === "/crm/associations/2026-03/deals/contacts/batch/read")).toBe(
    true,
  )
  expect(hub.refusals).toEqual([])
})

it("reads contacts' changes by lastmodifieddate, the one object that names it so", async () => {
  const { hub } = seededHubspot()
  await over(hub).changes("person", new Date().toISOString())
  expect(searches(hub)[0]?.body).toMatchObject({ sorts: [{ propertyName: "lastmodifieddate" }] })
})

it("a row the search index has not shown yet comes in the next round, through the overlap", async () => {
  let clock = Date.parse("2026-11-17T10:00:00Z")
  const now = () => clock
  const { hub, ids } = seededHubspot({ now, searchLagMs: 30_000 })
  const source = over(hub, now)
  const first = await full<CrmItem>((page) => source.changes("deal", null, page))
  clock += 60_000
  hub.touch("deals", ids.kitchen, { dealname: "Example kitchen, lagging" })
  clock += 1_000
  const second = await full<CrmItem>((page) => source.changes("deal", first.cursor, page))
  expect(second.items.map((one) => one.externalId)).not.toContain(ids.kitchen)
  clock += 60_000
  const third = await full<CrmItem>((page) => source.changes("deal", second.cursor, page))
  expect(third.items.find((one) => one.externalId === ids.kitchen)?.title).toBe("Example kitchen, lagging")
})

it("pages past a moment that holds more than a page by offset, and a moment past the search cap lists in full", async () => {
  const clock = Date.parse("2026-11-17T10:00:00Z")
  const hub = fakeHubspot({ now: () => clock })
  for (let at = 0; at < 10_001; at += 1) hub.put("companies", { name: `Example ${at}` })
  const source = over(hub, () => clock + 60_000)
  const answer = await full<CrmOrganization>((page) =>
    source.changes("organization", new Date(clock).toISOString(), page),
  ).catch((error: Error) => error.message)
  expect(answer).toBe("reset")
  const offsets = searches(hub).map((call) => Number((call.body as { after?: string }).after ?? 0))
  expect(offsets.slice(0, 4)).toEqual([0, 0, 200, 400])
  expect(Math.max(...offsets)).toBeLessThanOrEqual(9_800)
  expect(hub.refusals).toEqual([])
})

it("an account without Sales Hub Pro syncs its deals, contacts and companies, and names the leads it lacks", async () => {
  const { hub } = seededHubspot({ refuse: ["leads"] })
  const store = await openStore({ path: join(mkdtempSync(join(tmpdir(), "hubspot-leads-")), "store.db") })
  stores.push(store)
  const account = { provider: "hubspot", account: "4000001" }
  const report = await syncCrm(over(hub), store, account)
  expect(report.state).toBe("complete")
  expect(report.synced.find((one) => one.kind === "deal")?.error).toBeUndefined()
  expect(report.synced.find((one) => one.kind === "lead")?.error).toBeUndefined()
  expect((await store.deals.list({ account, kind: "deal" })).items).toHaveLength(3)
  expect(await crmGapsOf(store, account)).toContainEqual(
    expect.objectContaining({ kind: "lead", scope: "crm.objects.leads.read" }),
  )
})

it("leads the token can no longer read stay in the copy: the empty id pass is held, not applied", async () => {
  let now = Date.now()
  const { hub } = seededHubspot()
  const store = await openStore({ path: join(mkdtempSync(join(tmpdir(), "hubspot-leads-")), "store.db") })
  stores.push(store)
  const account = { provider: "hubspot", account: "4000001" }
  const leads = async () => (await store.deals.list({ account, kind: "lead" })).items.length
  await syncCrm(over(hub), store, account, { now })
  expect(await leads()).toBe(2)
  hub.refuse("leads")
  now += 86_400_000
  const report = await syncCrm(over(hub), store, account, { now })
  expect(await leads()).toBe(2)
  expect(report.issues).toContainEqual(expect.objectContaining({ kind: "lead", reason: "crm.unlisted-held" }))
})

it("refuses an id pass of a kind it may not read, so no stored row is marked deleted", async () => {
  const { hub } = seededHubspot({ refuse: ["deals"] })
  await expect(over(hub).ids?.("deal")).rejects.toMatchObject({
    code: "permission_error",
    details: { scope: "crm.objects.deals.read" },
  })
})

it("lists the pipelines' stages with their outcome from isClosed and probability, the only fields HubSpot documents", async () => {
  const { hub } = seededHubspot()
  const [sales] = await over(hub).pipelines("deal")
  expect(sales?.stages.map((stage) => [stage.externalId, stage.outcome])).toEqual([
    ["appointmentscheduled", "open"],
    ["qualifiedtobuy", "open"],
    ["closedwon", "won"],
    ["closedlost", "lost"],
  ])
  const [leads] = await over(hub).pipelines("lead")
  // HubSpot documents no won or lost for a lead stage: only its Disqualified one is lost.
  expect(leads?.stages.map((stage) => stage.outcome)).toEqual(["open", "won", "lost"])
})

it("lists the owners, the deactivated ones as inactive, and the account's own fields with their options", async () => {
  const { hub } = seededHubspot()
  const users = await over(hub).users?.()
  expect(users?.map(({ externalId, active }) => [externalId, active])).toEqual([
    ["501", true],
    ["502", true],
    ["503", false],
  ])
  const fields = await over(hub).fields?.("deal")
  expect(fields?.map(({ code }) => code)).toEqual(["example_source", "example_note"])
  expect(fields?.[0]?.options).toEqual([
    { id: "web", label: "Website" },
    { id: "fair", label: "Trade fair" },
  ])
})

it("a live list filters by owner and words in one filter group, newest first, and refuses a seventh condition", async () => {
  const { hub, ids } = seededHubspot()
  const page = await over(hub).list?.("person", {
    conditions: [{ field: "assigned_to", op: "=", value: "501" }],
    text: "ana",
    limit: 10,
  })
  expect(page?.items.map((one) => one.externalId)).toEqual([ids.ana])
  expect(searches(hub)[0]?.body).toMatchObject({
    filterGroups: [{ filters: [{ propertyName: "hubspot_owner_id", operator: "EQ", value: "501" }] }],
    sorts: [{ propertyName: "createdate", direction: "DESCENDING" }],
    query: "ana",
  })
  const before = hub.calls.length
  await expect(
    over(hub).list?.("person", {
      conditions: Array.from({ length: 7 }, () => ({ field: "assigned_to", op: "=" as const, value: "501" })),
      limit: 10,
    }),
  ).rejects.toMatchObject({ code: "validation_error", details: { reason: "hubspot.too-many-filters" } })
  await expect(
    over(hub).list?.("organization", { conditions: [{ field: "nonexistent", op: "=", value: "x" }], limit: 10 }),
  ).rejects.toMatchObject({ details: { reason: "query.unsupported-field" } })
  expect(hub.calls.length - before).toBe(2)
})

it("reads activities of every type with ids unique across types, never a call's number or an e-mail's address", async () => {
  const { hub, ids } = seededHubspot()
  const read = await full<CrmActivity>((page) => over(hub).activities?.(0, page, context) ?? Promise.reject())
  expect(read.cursor).toMatch(/^\d+$/)
  expect(read.items.map(({ externalId, kind }) => [externalId.split(":")[0], kind])).toEqual([
    ["notes", "comment"],
    ["calls", "call"],
    ["emails", "email"],
    ["meetings", "meeting"],
    ["tasks", "task"],
  ])
  expect(read.items[0]).toMatchObject({ body: "Called & agreed", assignee: "501", done: true })
  expect(read.items[0]?.on).toEqual(
    expect.arrayContaining([
      { kind: "deal", externalId: ids.kitchen },
      { kind: "person", externalId: ids.ana },
    ]),
  )
  const text = JSON.stringify(read.items)
  expect(text).not.toContain("+34 600 000 002")
  expect(text).not.toContain("ana@example.com")
  for (const call of searches(hub))
    expect((call.body as { properties: string[] }).properties.join()).not.toMatch(/to_number|to_email|headers/)
})

it("an activity type the token may not read is a gap naming its scope, and the others are still read", async () => {
  const { hub } = seededHubspot({ refuse: ["calls"] })
  const read = await full<CrmActivity>((page) => over(hub).activities?.(0, page, context) ?? Promise.reject())
  expect(read.items.map(({ kind }) => kind)).toEqual(["comment", "email", "meeting", "task"])
  expect(gaps).toEqual([expect.objectContaining({ kind: "activities", scope: "crm.objects.contacts.read" })])
})

it("get answers null for an id that is not a HubSpot id, without a request", async () => {
  const { hub } = seededHubspot()
  expect(await over(hub).get?.("person", "../owners")).toBeNull()
  expect(hub.calls).toEqual([])
})

const DAY = 86_400_000

it("an id pass pages by the source's page size, and a row removed on its second page is the only one deleted", async () => {
  let now = Date.now()
  const { hub } = seededHubspot()
  const store = await openStore({ path: join(mkdtempSync(join(tmpdir(), "hubspot-ids-")), "store.db") })
  stores.push(store)
  const account = { provider: "hubspot", account: "4000001" }
  const deals = async () => (await store.deals.list({ account, kind: "deal" })).items.map((one) => one.title).sort()
  await syncCrm(
    over(hub, () => now, 2),
    store,
    account,
    { now },
  )
  expect(await deals()).toEqual(["Example kitchen", "Example lost", "Example won"])
  const lost = Object.entries(hub.seededIds().deals ?? []).at(-1)?.[1]
  hub.remove("deals", String(lost))
  now += DAY
  await syncCrm(
    over(hub, () => now, 2),
    store,
    account,
    { now },
  )
  expect(await deals()).toEqual(["Example kitchen", "Example won"])
  const passes = hub.calls.filter(
    (call) => call.query.properties === "hs_object_id" && call.url.pathname.endsWith("0-3"),
  )
  expect(passes.length).toBeGreaterThan(1)
  expect(passes.every((call) => call.query.limit === "2")).toBe(true)
})

it("a deal's company is the one HubSpot marks primary, on a full list and on a change round alike", async () => {
  const { hub, ids } = seededHubspot()
  const source = over(hub)
  const whole = await full<CrmItem>((page) => source.changes("deal", null, page))
  expect(whole.items.find((one) => one.externalId === ids.kitchen)?.organization).toBe(ids.acme)
  hub.touch("deals", ids.kitchen)
  const changed = await full<CrmItem>((page) => source.changes("deal", whole.cursor, page))
  expect(changed.items.find((one) => one.externalId === ids.kitchen)?.organization).toBe(ids.acme)
})

it("a change round says a deal with no contacts or company has none, so a removed link leaves the copy", async () => {
  const { hub } = seededHubspot()
  const source = over(hub)
  const { cursor } = await full<CrmItem>((page) => source.changes("deal", null, page))
  const changed = await full<CrmItem>((page) => source.changes("deal", cursor, page))
  expect(changed.items.find((one) => one.title === "Example lost")).toMatchObject({ people: [], organization: null })
})

it("a lead's created time comes from createdate when hs_createdate is not there", async () => {
  const hub = fakeHubspot()
  const lead = hub.put("leads", {
    hs_lead_name: "Example",
    hs_pipeline: "lead-pipeline-id",
    hs_pipeline_stage: "new-stage-id",
  })
  const row = hub.row("leads", lead)
  if (!row) throw new Error("no lead")
  row.properties.createdate = "2026-01-02T03:04:05Z"
  delete row.properties.hs_createdate
  const { items } = await full<CrmItem>((page) => over(hub).changes("lead", null, page))
  expect(items[0]?.createdAt).toBe(Date.parse("2026-01-02T03:04:05Z"))
})

it("a live list of companies filters by their type", async () => {
  const { hub } = seededHubspot()
  await over(hub).list?.("organization", { conditions: [{ field: "type", op: "=", value: "PARTNER" }], limit: 5 })
  expect(searches(hub)[0]?.body).toMatchObject({
    filterGroups: [{ filters: [{ propertyName: "type", operator: "EQ", value: "PARTNER" }] }],
  })
})

it("asks for the account's own properties only while the address stays short, and names the ones left out", async () => {
  const { hub, ids } = seededHubspot()
  for (let at = 0; at < 400; at += 1) hub.defineProperty(`example_custom_property_${at}`)
  const person = await over(hub).get?.("person", ids.ana, context)
  expect(person?.externalId).toBe(ids.ana)
  const asked = hub.calls.find((call) => call.url.pathname.endsWith(`/contacts/${ids.ana}`))
  expect(String(asked?.query.properties).length).toBeLessThanOrEqual(MAX_PROPERTIES_CHARS)
  expect(String(asked?.query.properties)).toContain("email")
  expect(gaps).toEqual([expect.objectContaining({ kind: "person" })])
  expect(fitted(["a"], ["b", "a", "c".repeat(MAX_PROPERTIES_CHARS)])).toEqual({
    properties: "a,b",
    dropped: ["c".repeat(MAX_PROPERTIES_CHARS)],
  })
})

it("reads activities page after page, and from ten minutes before since, in the first type and the next", async () => {
  let clock = Date.parse("2026-11-17T10:00:00Z")
  const hub = fakeHubspot({ now: () => clock })
  for (let at = 0; at < 5; at += 1) hub.put("notes", { hs_note_body: `Note ${at}` })
  hub.put("calls", { hs_call_title: "Call" })
  const since = clock + 5 * 60_000
  clock += 60 * 60_000
  const source = over(hub, () => clock, undefined, 2)
  const read = await full<CrmActivity>((page) => source.activities?.(since, page, context) ?? Promise.reject())
  // Rows at the boundary moment are read twice; the store saves them twice, nothing more.
  expect([...new Set(read.items.map((one) => one.subject || one.body))]).toEqual([
    "Note 0",
    "Note 1",
    "Note 2",
    "Note 3",
    "Note 4",
    "Call",
  ])
  expect(searches(hub).filter((call) => call.url.pathname.includes("/notes/")).length).toBeGreaterThan(1)
})

it("more activities than the search reaches at one moment are listed in full, none lost", async () => {
  const clock = Date.parse("2026-11-17T10:00:00Z")
  const hub = fakeHubspot({ now: () => clock })
  for (let at = 0; at < 10_001; at += 1) hub.put("tasks", { hs_task_subject: `Task ${at}` })
  const source = over(hub, () => clock + 60_000)
  const read = await full<CrmActivity>((page) => source.activities?.(clock, page, context) ?? Promise.reject())
  expect(new Set(read.items.map((one) => one.externalId)).size).toBe(10_001)
  expect(hub.calls.some((call) => call.url.pathname === "/crm/objects/2026-03/tasks")).toBe(true)
  expect(hub.refusals).toEqual([])
}, 60_000)

it("a refused round of deal or contact changes fails, never reads as a finished empty round", async () => {
  const { hub } = seededHubspot({ refuse: ["deals", "contacts"] })
  const source = over(hub)
  for (const kind of ["deal", "person"] as const) {
    for (const cursor of [null, new Date().toISOString()])
      await expect(source.changes(kind, cursor)).rejects.toMatchObject({ code: "permission_error" })
    await expect(source.ids?.(kind)).rejects.toMatchObject({ code: "permission_error" })
  }
})

it("an id pass answered without its results fails the sync, and the copy keeps its rows", async () => {
  let now = Date.now()
  const { hub } = seededHubspot()
  const store = await openStore({ path: join(mkdtempSync(join(tmpdir(), "hubspot-empty-")), "store.db") })
  stores.push(store)
  const account = { provider: "hubspot", account: "4000001" }
  const deals = async () => (await store.deals.list({ account, kind: "deal" })).items.length
  await syncCrm(
    over(hub, () => now),
    store,
    account,
    { now },
  )
  expect(await deals()).toBe(3)
  const bare: typeof fetch = async (input, init) => {
    const url = new URL(String(input instanceof Request ? input.url : input))
    if (url.pathname.endsWith("/0-3") && url.searchParams.get("properties") === "hs_object_id")
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } })
    return hub.fetch(input, init)
  }
  now += DAY
  const report = await syncCrm(
    over(hub, () => now, undefined, undefined, bare),
    store,
    account,
    { now },
  )
  expect(report.synced.find((one) => one.kind === "deal")?.error).toBeDefined()
  expect(report.state).toBe("partial")
  expect(await deals()).toBe(3)
})

it("a round ends at its start: a row changed while a long round ran comes in the next round", async () => {
  let clock = Date.parse("2026-11-17T10:00:00Z")
  const { hub, ids } = seededHubspot({ now: () => clock })
  const source = over(hub, () => clock, 1)
  let page: string | undefined
  let cursor: string | null = null
  for (let read = 0; read < 10; read += 1) {
    const answer = await source.changes("deal", null, page)
    if ("reset" in answer) throw new Error("reset")
    // Each page an eleven minutes' wait: the round outlasts the ten-minute overlap.
    clock += 11 * 60_000
    if (read === 0) hub.touch("deals", ids.kitchen, { dealname: "Example kitchen, changed mid-round" })
    if (!answer.hasMore) {
      cursor = answer.cursor ?? null
      break
    }
    page = answer.nextCursor
  }
  expect(clock - Date.parse(String(cursor))).toBeGreaterThan(OVERLAP_MS * 2)
  const next = await full<CrmItem>((at) => source.changes("deal", cursor, at))
  expect(next.items.find((one) => one.externalId === ids.kitchen)?.title).toBe("Example kitchen, changed mid-round")
})

it("a full round with more of the account's own properties than fit one address names the ones left out", async () => {
  const { hub } = seededHubspot()
  for (let at = 0; at < 400; at += 1) hub.defineProperty(`example_custom_property_${at}`)
  await full<CrmItem>((page) => over(hub).changes("deal", null, page, context))
  expect(gaps).toContainEqual(expect.objectContaining({ kind: "deal" }))
  const listed = hub.calls.filter((call) => call.url.pathname === "/crm/objects/2026-03/0-3")
  expect(listed.every((call) => String(call.query.properties).length <= MAX_PROPERTIES_CHARS)).toBe(true)
})

it("a call still connecting or ringing the owner's phone is not done; a completed one is", async () => {
  const hub = fakeHubspot()
  for (const status of ["CONNECTING", "CALLING_CRM_USER", "QUEUED", "RINGING", "IN_PROGRESS", "COMPLETED", "NO_ANSWER"])
    hub.put("calls", { hs_call_title: status, hs_call_status: status })
  const read = await full<CrmActivity>((page) => over(hub).activities?.(0, page, context) ?? Promise.reject())
  expect(Object.fromEntries(read.items.map((one) => [one.subject, one.done]))).toEqual({
    CONNECTING: false,
    CALLING_CRM_USER: false,
    QUEUED: false,
    RINGING: false,
    IN_PROGRESS: false,
    COMPLETED: true,
    NO_ANSWER: true,
  })
})

it("a closed lead stage goes by its probability, then the default stage ids, and is counted lost with a gap otherwise", async () => {
  const { hub } = seededHubspot()
  hub.setLeadStages([
    ["new-stage-id", "Nuevo", { isClosed: "false" }],
    ["unqualified-stage-id", "Descalificado", { isClosed: "true" }],
    ["qualified-stage-id", "Calificado", { isClosed: "true" }],
    ["custom-won", "Converted", { isClosed: "true", probability: "1.0" }],
    ["custom-closed", "Parked", { isClosed: "true" }],
    ["custom-disqualified", "Disqualified", { isClosed: "true" }],
    // The id goes before the label: a stage renamed "Qualified" that is HubSpot's unqualified one stays lost.
    ["unqualified-stage-id", "Qualified", { isClosed: "true" }],
  ])
  const [leads] = await over(hub).pipelines("lead", context)
  expect(leads?.stages.map((stage) => [stage.name, stage.outcome])).toEqual([
    ["Nuevo", "open"],
    ["Descalificado", "lost"],
    ["Calificado", "won"],
    ["Converted", "won"],
    ["Parked", "lost"],
    ["Disqualified", "lost"],
    ["Qualified", "lost"],
  ])
  expect(gaps).toEqual([
    expect.objectContaining({
      kind: "lead",
      message: "closed lead stage Parked: HubSpot gives no outcome; counted as lost",
    }),
  ])
})

it("a meeting HubSpot marks completed in lower case is done", async () => {
  const hub = fakeHubspot()
  hub.put("meetings", { hs_meeting_title: "Lower", hs_meeting_outcome: "completed" })
  hub.put("meetings", { hs_meeting_title: "Upper", hs_meeting_outcome: "COMPLETED" })
  hub.put("meetings", { hs_meeting_title: "Planned", hs_meeting_outcome: "scheduled" })
  const read = await full<CrmActivity>((page) => over(hub).activities?.(0, page, context) ?? Promise.reject())
  expect(Object.fromEntries(read.items.map((one) => [one.subject, one.done]))).toEqual({
    Lower: true,
    Upper: true,
    Planned: false,
  })
})
