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

const argsOf = (operation: Operation) => [
  ...operation.parameters
    .filter((parameter) => parameter.required)
    .flatMap((parameter) => [`--${apiFlagOf(parameter.name)}`, String(sampleOf(parameter.schema, definitions))]),
  ...(operation.request?.schema
    ? ["--body", JSON.stringify(sampleOf({ type: "ref", ref: operation.request.schema }, definitions))]
    : []),
]

it("sends every read the spec offers as the spec describes it, with the profile's token", async () => {
  withPermissions({ api: "allow" })
  const service = fake()
  expect(API.manifest.operations.length).toBeGreaterThan(0)
  for (const operation of API.manifest.operations) {
    const ran = await hubspot(["work", "api", operation.command, ...argsOf(operation), "--json"], { account: service })
    expect(ran.code, `${operation.command}: ${ran.err}`).toBe(0)
  }
  expect(service.refusals).toEqual([])
  expect(service.calls).toHaveLength(API.manifest.operations.length)
})

it("takes every option the spec offers, a body from a file, and --all on a paged list", async () => {
  withPermissions({ api: "allow" })
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

it("offers no write: api show names why one is missing, and the command does not exist", async () => {
  expect(API.manifest.operations.every((operation) => operation.effect === "read")).toBe(true)
  const write = operations.find((operation) => operation.effect !== "read")
  expect(write).toBeDefined()
  const shown = await hubspot(["work", "api", "show", write?.command ?? "", "--json"])
  expect(shown.json()).toMatchObject({ error: { code: "not_found" } })
  expect(shown.err).toContain("this release only reads")
  const service = fake()
  const sent = await hubspot(["work", "api", "deals-create", "--body", "{}", "--json"], { account: service })
  expect(sent.code).not.toBe(0)
  expect(service.calls).toEqual([])
  const listed = await hubspot(["work", "api", "list", "--json"])
  expect(listed.code, listed.err).toBe(0)
  expect(listed.out).toContain('"deals-list"')
  expect(listed.out).not.toContain('"deals-create"')
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
