import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fakeApi, sampleOf } from "@wirecat/cli-base/codegen"
import { apiFlagOf, manifestBaseUrl } from "@wirecat/cli-core/cli"
import { afterEach, expect, it } from "vitest"
import { API } from "./config.js"
import { definitions } from "./generated/definitions.js"
import { operations } from "./generated/manifest.js"
import { FAKE_TOKEN, seededHubspot } from "./testing/fake-hubspot.js"
import { hubspot } from "./testing/harness.js"

const configFile = join(process.env.WCHUBSPOT_CONFIG_DIR ?? "", "config.json")
const withPermissions = (permissions: Record<string, string>) => {
  mkdirSync(join(configFile, ".."), { recursive: true })
  writeFileSync(configFile, JSON.stringify({ profiles: { work: { permissions } } }))
}
afterEach(() => rmSync(configFile, { force: true }))

const fake = () =>
  fakeApi({
    operations: API.manifest.operations,
    definitions,
    baseUrl: manifestBaseUrl(API.manifest),
    auth: { header: "authorization", value: `Bearer ${FAKE_TOKEN}` },
  })

type Operation = (typeof API.manifest.operations)[number]

/** `api` and every key an operation also checks, so each runs without a question. */
const EVERY_KEY = Object.fromEntries(
  [
    "api",
    ...API.manifest.operations.flatMap((operation) => [
      `api.${operation.command}`,
      ...(operation.permissions ?? []).map(({ key }) => key),
    ]),
  ].map((key) => [key, "allow"]),
)

const argsOf = (operation: Operation) => [
  ...operation.parameters
    .filter((parameter) => parameter.required)
    .flatMap((parameter) => [`--${apiFlagOf(parameter.name)}`, String(sampleOf(parameter.schema, definitions))]),
  ...(operation.request?.schema
    ? ["--body", JSON.stringify(sampleOf({ type: "ref", ref: operation.request.schema }, definitions))]
    : []),
]

it("sends every operation the spec offers as the spec describes it, with the profile's token", async () => {
  withPermissions(EVERY_KEY)
  const service = fake()
  expect(API.manifest.operations.length).toBeGreaterThan(0)
  for (const operation of API.manifest.operations) {
    // A pace file of its own, as below: one shared by all of them would wait past the run's budget.
    const ran = await hubspot(["work", "api", operation.command, ...argsOf(operation), "--json"], {
      account: service,
      env: ownState(),
    })
    expect(ran.code, `${operation.command}: ${ran.err}`).toBe(0)
  }
  expect(service.refusals).toEqual([])
  expect(service.calls).toHaveLength(API.manifest.operations.length)
})

it("takes every option the spec offers, a body from a file, and --all on a paged list", async () => {
  withPermissions(EVERY_KEY)
  const service = fake()
  const folder = mkdtempSync(join(tmpdir(), "hubspot-api-body-"))
  for (const operation of API.manifest.operations) {
    const options = operation.parameters.flatMap((parameter) => [
      `--${apiFlagOf(parameter.name)}`,
      String(sampleOf(parameter.schema, definitions)),
    ])
    const body = operation.request?.schema
      ? sampleOf({ type: "ref", ref: operation.request.schema }, definitions)
      : undefined
    const bodyFile = join(folder, `${operation.command}.json`)
    if (body !== undefined) writeFileSync(bodyFile, JSON.stringify(body))
    const argv = [...options, ...(body === undefined ? [] : ["--body-file", bodyFile])]
    // A pace file of its own: each run starts its clock afresh, so a shared one would add up the waits of all.
    const env = { WCHUBSPOT_STATE_DIR: mkdtempSync(join(folder, "state-")) }
    const ran = await hubspot(["work", "api", operation.command, ...argv, "--json"], { account: service, env })
    expect(ran.code, `${operation.command}: ${ran.err}`).toBe(0)
    if (!operation.pagination) continue
    // The fake answers every page with the same next cursor: --all must stop there, not loop.
    const all = await hubspot(["work", "api", operation.command, ...argv, "--all", "--json"], { account: service })
    expect(all.err, operation.command).toContain("provider.invalid-response")
  }
  expect(service.refusals).toEqual([])
})

it("signs every operation with the profile's token, the ones whose spec says no sign-in included", async () => {
  expect(operations.some((operation) => operation.security?.length === 0)).toBe(true)
  withPermissions(EVERY_KEY)
  const unsigned: string[] = []
  const recording = {
    fetch: (async (input: string | URL | Request, init?: RequestInit) => {
      const headers = new Headers(input instanceof Request ? input.headers : init?.headers)
      if (headers.get("authorization") !== `Bearer ${FAKE_TOKEN}`) unsigned.push(String(input))
      return Response.json({})
    }) as typeof fetch,
  }
  for (const command of ["deals-get", "deals-update", "contacts-list", "notes-create"]) {
    const operation = API.manifest.operations.find((one) => one.command === command)
    if (!operation) throw new Error(`no ${command}`)
    await hubspot(["work", "api", command, ...argsOf(operation), "--json"], { account: recording, env: ownState() })
  }
  expect(unsigned).toEqual([])
})

it("offers every write and delete, and api show names the keys each checks", async () => {
  const writes = API.manifest.operations.filter((operation) => operation.effect !== "read")
  expect(writes.length).toBe(operations.filter((operation) => operation.effect !== "read").length)
  const listed = await hubspot(["work", "api", "list", "effect:destructive", "--json"])
  expect(listed.code, listed.err).toBe(0)
  expect(listed.out).toContain('"deals-delete"')
  const shown = await hubspot(["work", "api", "show", "deals-update", "--json"])
  expect(shown.code, shown.err).toBe(0)
  expect(shown.out).toContain("deals.write")
})

it("--dry-run of every write and delete names its keys and sends nothing", async () => {
  const service = fake()
  for (const operation of API.manifest.operations.filter((one) => one.effect !== "read")) {
    const ran = await hubspot(["work", "api", operation.command, ...argsOf(operation), "--dry-run", "--json"], {
      account: service,
    })
    expect(ran.code, `${operation.command}: ${ran.err}`).toBe(0)
    const { permission } = ran.json().item as { permission: { key: string; also: { key: string }[] } }
    expect(permission.key).toBe(`api.${operation.command}`)
    const group = operation.effect === "write" ? /\.write$/ : /\.delete$/
    expect(
      permission.also.some(({ key }) => group.test(key)),
      operation.command,
    ).toBe(true)
  }
  expect(service.calls).toEqual([])
})

const deal = (properties: Record<string, string>) => [
  "work",
  "api",
  "deals-update",
  "--deal-id",
  "1",
  "--body",
  JSON.stringify({ properties }),
  "--json",
]

it("a write asks by default: without a terminal it is refused before any request", async () => {
  const service = fake()
  const ran = await hubspot(deal({ dealname: "Example" }), { account: service })
  expect(ran.json()).toMatchObject({ error: { code: "confirmation_required", details: { permission: "deals.write" } } })
  expect(service.calls).toEqual([])
  const yes = await hubspot(deal({ dealname: "Example" }).slice(0, -1), { account: service, answer: () => "y" })
  expect(yes.code, yes.err).toBe(0)
  expect(service.calls).toHaveLength(1)
})

it("a write allowed by its group goes ahead; an owner in the body checks crm.assign-others, denied by default", async () => {
  withPermissions({ "deals.write": "allow" })
  const service = fake()
  const ran = await hubspot(deal({ dealname: "Example" }), { account: service })
  expect(ran.code, ran.err).toBe(0)
  const owner = await hubspot(deal({ hubspot_owner_id: "502" }), { account: service })
  expect(owner.json()).toMatchObject({
    error: { code: "permission_error", details: { permission: "crm.assign-others" } },
  })
  const batch = await hubspot(
    [
      "work",
      "api",
      "deals-batch-update",
      "--body",
      JSON.stringify({ inputs: [{ id: "1", properties: { hubspot_owner_id: "502" } }] }),
      "--json",
    ],
    { account: service },
  )
  expect(batch.json()).toMatchObject({ error: { details: { permission: "crm.assign-others" } } })
  expect(service.calls).toHaveLength(1)
})

it("the CRM command's key holds on the api path, and the api key on the command", async () => {
  withPermissions({ "deals.write": "allow", "deals.move": "deny" })
  const service = fake()
  const moved = await hubspot(deal({ dealstage: "closedwon" }), { account: service })
  expect(moved.json()).toMatchObject({ error: { details: { permission: "deals.move" } } })
  withPermissions({ "deals.write": "allow", "deals.close": "deny" })
  const closed = await hubspot(deal({ dealstage: "closedwon" }), { account: service })
  expect(closed.json()).toMatchObject({ error: { details: { permission: "deals.close" } } })
  withPermissions({ "deals.write": "allow", "deals.update": "deny" })
  const updated = await hubspot(deal({ dealname: "Example" }), { account: service })
  expect(updated.json()).toMatchObject({ error: { details: { permission: "deals.update" } } })
  expect(service.calls).toEqual([])
  const { hub } = seededHubspot()
  expect((await hubspot(["work", "sync", "--json"], { account: hub })).code).toBe(0)
  const listed = (await hubspot(["work", "deals", "list", "--json"], { account: hub })).json() as {
    items: { ref: string }[]
  }
  withPermissions({ "api.deals-update": "deny" })
  const before = hub.writes()
  const command = await hubspot(
    ["work", "deals", "update", listed.items[0]?.ref ?? "", "--title", "Example", "--json"],
    {
      account: hub,
    },
  )
  expect(command.json()).toMatchObject({
    error: { code: "permission_error", details: { permission: "api.deals-update" } },
  })
  expect(hub.writes()).toBe(before)
})

it("a GDPR delete checks a key of its own, so the owner can deny it and still allow other deletes", async () => {
  withPermissions({ api: "allow", "people.delete": "allow", "people.erase": "deny" })
  const service = fake()
  const body = JSON.stringify({ objectId: "1" })
  const ran = await hubspot(["work", "api", "contacts-gdpr-delete", "--body", body, "--json"], { account: service })
  expect(ran.json()).toMatchObject({ error: { details: { permission: "people.erase" } } })
  expect(service.calls).toEqual([])
})

it("a write whose answer is lost is outcome_unknown after one request, and a 5xx on a write too", async () => {
  withPermissions({ "deals.write": "allow" })
  const { hub } = seededHubspot()
  hub.loseNextAnswer()
  const lost = await hubspot(deal({ dealname: "Example" }), { account: hub, env: ownState() })
  expect(lost.json()).toMatchObject({ error: { code: "outcome_unknown" } })
  expect(hub.writes()).toBe(1)
  const failing = {
    fetch: (async () => new Response('{"status":"error","category":"INTERNAL"}', { status: 502 })) as typeof fetch,
  }
  const failed = await hubspot(deal({ dealname: "Example" }), { account: failing, env: ownState() })
  expect(failed.json()).toMatchObject({ error: { code: "outcome_unknown" } })
})

/** Its own state folder, so the account's pace file and any hold in it start empty. */
const ownState = () => ({ WCHUBSPOT_STATE_DIR: mkdtempSync(join(tmpdir(), "api-state-")) })

it("a daily limit ends the request at once, and the next command on the account refuses before it sends", async () => {
  const env = ownState()
  const { hub } = seededHubspot()
  hub.throttle("DAILY")
  const daily = await hubspot(["work", "api", "deals-list", "--json"], { account: hub, env })
  expect(daily.json()).toMatchObject({ error: { code: "rate_limited", reason: "hubspot.daily-limit" } })
  expect(hub.calls).toHaveLength(1)
  expect(daily.err).not.toContain(FAKE_TOKEN)
  const next = await hubspot(["work", "api", "deals-list", "--json"], { account: hub, env })
  expect(next.json()).toMatchObject({ error: { code: "rate_limited" } })
  expect(hub.calls).toHaveLength(1)
})

it("a scope refusal names the scope", async () => {
  const { hub } = seededHubspot()
  hub.refuse("deals")
  const scope = await hubspot(["work", "api", "deals-list", "--json"], { account: hub, env: ownState() })
  expect(scope.json()).toMatchObject({
    error: { code: "permission_error", reason: "hubspot.scope-missing", details: { scope: "crm.objects.deals.read" } },
  })
})

it("a ten-second limit is waited out and sent again", async () => {
  const { hub } = seededHubspot()
  hub.throttle("TEN_SECONDLY_ROLLING")
  const ran = await hubspot(["work", "api", "deals-list", "--json"], { account: hub, env: ownState() })
  expect([ran.code, ran.err]).toEqual([0, ""])
  expect(hub.calls).toHaveLength(2)
})
