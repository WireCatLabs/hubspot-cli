import { existsSync, mkdtempSync, readdirSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { memoryKeyring, resolvePaths } from "@wirecat/cli-base"
import { describe, expect, it } from "vitest"
import { IDENTITY } from "../identity.js"
import { openHubspotStore } from "../store.js"
import { FAKE_TOKEN, seededHubspot } from "../testing/fake-hubspot.js"
import { FAKE_ACCOUNT, hubspot } from "../testing/harness.js"

const freshStore = () => ({ MESSAGING_STORE: join(mkdtempSync(join(tmpdir(), "store-")), "wirecat.db") })

const titles = (items: unknown) => (items as { title: string }[]).map((one) => one.title).sort()

describe("the shared CRM commands over a HubSpot account", () => {
  it("sync copies the whole account, so a key with no user reads every deal offline", async () => {
    const env = freshStore()
    const { hub: account } = seededHubspot()
    const synced = await hubspot(["work", "sync", "--json"], { account, env })
    expect([synced.code, synced.err]).toEqual([0, ""])
    const listed = await hubspot(["work", "deals", "list", "--offline", "--json"], { account, env })
    expect(titles(listed.json().items)).toEqual(["Example kitchen", "Example lost", "Example won"])
    const leads = await hubspot(["work", "leads", "list", "--offline", "--json"], { account, env })
    expect(titles(leads.json().items)).toEqual(["Example lead", "Example qualified"])
  })

  it("files the copy under the account's portal id", async () => {
    const env = freshStore()
    await hubspot(["work", "sync"], { env })
    const store = await openHubspotStore({ ...process.env, ...env })
    try {
      expect((await store.accounts.accounts()).map((one) => `${one.provider}:${one.account}`)).toContain(
        `hubspot:${FAKE_ACCOUNT}`,
      )
    } finally {
      await store.close()
    }
  })

  it("reads with WCHUBSPOT_TOKEN only beside WCHUBSPOT_ACCOUNT, paced with api by that account", async () => {
    const keyring = memoryKeyring()
    const alone = await hubspot(["work", "deals", "list", "--json"], {
      keyring,
      env: { ...freshStore(), WCHUBSPOT_TOKEN: FAKE_TOKEN },
    })
    expect(alone.json()).toMatchObject({ error: { code: "configuration_error", reason: "account.id-missing" } })
    const env = { ...freshStore(), WCHUBSPOT_TOKEN: FAKE_TOKEN, WCHUBSPOT_ACCOUNT: FAKE_ACCOUNT }
    const { hub: account } = seededHubspot()
    const synced = await hubspot(["work", "sync", "--json"], { keyring, env, account })
    expect([synced.code, synced.err]).toEqual([0, ""])
    const reading = seededHubspot().hub
    const listed = await hubspot(["work", "deals", "list", "--json"], { keyring, env, account: reading })
    expect(titles(listed.json().items)).toHaveLength(3)
    expect(reading.calls).toEqual([])
    const api = await hubspot(["work", "api", "deals-list", "--json"], { keyring, env, account })
    expect(api.code).toBe(0)
    const paces = readdirSync(
      join(resolvePaths({ appName: IDENTITY.appName, prefix: IDENTITY.envPrefix }).state, "pace"),
    )
    expect(paces).toContain(`account-${FAKE_ACCOUNT}.json`)
    expect(paces).not.toContain("work.json")
  })

  it("refuses a WCHUBSPOT_ACCOUNT that is not the token's account before the store is written", async () => {
    const store = freshStore()
    const { hub: account } = seededHubspot()
    const env = { ...store, WCHUBSPOT_TOKEN: FAKE_TOKEN, WCHUBSPOT_ACCOUNT: "999" }
    const ran = await hubspot(["work", "sync", "--json"], { keyring: memoryKeyring(), env, account })
    expect(ran.json()).toMatchObject({ error: { code: "configuration_error", reason: "account.mismatch" } })
    expect(ran.err).not.toContain(FAKE_TOKEN)
    expect(existsSync(store.MESSAGING_STORE)).toBe(false)
    expect(account.calls.map((one) => one.url.pathname)).toEqual(["/account-info/2026-03/details"])
  })

  it("a WCHUBSPOT_TOKEN profile reads no copy before a sync checked its account", async () => {
    const env = { ...freshStore(), WCHUBSPOT_TOKEN: FAKE_TOKEN, WCHUBSPOT_ACCOUNT: FAKE_ACCOUNT }
    const reading = seededHubspot().hub
    const ran = await hubspot(["work", "deals", "list", "--json"], { keyring: memoryKeyring(), env, account: reading })
    expect(ran.json()).toMatchObject({ error: { code: "configuration_error", reason: "account.unchecked" } })
    expect(reading.calls).toEqual([])
  })

  it("a live read with WCHUBSPOT_TOKEN on a fresh store checks the key once, then reads", async () => {
    const env = { ...freshStore(), WCHUBSPOT_TOKEN: FAKE_TOKEN, WCHUBSPOT_ACCOUNT: FAKE_ACCOUNT }
    const { hub: account } = seededHubspot()
    const ran = await hubspot(["work", "people", "list", "--json"], { keyring: memoryKeyring(), env, account })
    expect([ran.code, ran.err]).toEqual([0, ""])
    expect(account.calls[0]?.url.pathname).toBe("/account-info/2026-03/details")
    expect(account.calls.filter((one) => one.url.pathname.includes("account-info"))).toHaveLength(1)
    expect(account.calls.length).toBeGreaterThan(1)
  })

  it("a local write with WCHUBSPOT_TOKEN asks nothing, and takes only the account a checked run saved", async () => {
    const env = { ...freshStore(), WCHUBSPOT_TOKEN: FAKE_TOKEN, WCHUBSPOT_ACCOUNT: FAKE_ACCOUNT }
    const keyring = memoryKeyring()
    const apply = ["work", "store", "apply", "--offline", "--yes", "--json"]
    const before = await hubspot(apply, { keyring, env })
    expect(before.json()).toMatchObject({ error: { reason: "account.unchecked" } })
    expect((await hubspot(["work", "sync"], { keyring, env })).code).toBe(0)
    const { hub: account } = seededHubspot()
    const after = await hubspot(apply, { keyring, env, account })
    expect([after.code, after.err]).toEqual([0, ""])
    expect(account.calls).toEqual([])
  })

  it("a WCHUBSPOT_TOKEN run keeps the account's time zone from its check for the daily limit", async () => {
    const env = { ...freshStore(), WCHUBSPOT_TOKEN: FAKE_TOKEN, WCHUBSPOT_ACCOUNT: FAKE_ACCOUNT }
    const { hub } = seededHubspot()
    const daily = () =>
      new Response(JSON.stringify({ status: "error", message: "x", errorType: "RATE_LIMIT", policyName: "DAILY" }), {
        status: 429,
        headers: { "content-type": "application/json" },
      })
    const account = {
      fetch: (async (input, init) =>
        String(input instanceof Request ? input.url : input).includes("/account-info/")
          ? hub.fetch(input, init)
          : daily()) as typeof fetch,
    }
    const ran = await hubspot(["work", "people", "list", "--json"], { keyring: memoryKeyring(), env, account })
    expect(ran.json()).toMatchObject({ error: { reason: "hubspot.daily-limit" } })
    expect(ran.err).toContain("midnight in the account's time zone, in")
  })

  it("a profile that ended its session names the command that signs it in", async () => {
    const keyring = memoryKeyring()
    await hubspot(["home", "session", "start"], { keyring, stdin: FAKE_TOKEN })
    await hubspot(["home", "session", "end"], { keyring })
    const ran = await hubspot(["home", "sync", "--json"], { keyring, env: freshStore() })
    expect(ran.json()).toMatchObject({ error: { code: "authentication_error", reason: "session.missing" } })
  })
})
