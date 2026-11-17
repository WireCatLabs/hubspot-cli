import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { memoryKeyring } from "@wirecat/cli-base"
import { describe, expect, it } from "vitest"
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

  it("asks HubSpot which account WCHUBSPOT_TOKEN reads, and refuses --offline before it knows", async () => {
    const env = { ...freshStore(), WCHUBSPOT_TOKEN: FAKE_TOKEN }
    const keyring = memoryKeyring()
    const offline = await hubspot(["work", "deals", "list", "--offline", "--json"], { keyring, env })
    expect(offline.json()).toMatchObject({ error: { reason: "offline.refused" } })
    const synced = await hubspot(["work", "sync", "--json"], { keyring, env })
    expect([synced.code, synced.err]).toEqual([0, ""])
    const listed = await hubspot(["work", "deals", "list", "--offline", "--json"], { keyring, env })
    expect(titles(listed.json().items)).toHaveLength(3)
  })

  it("a profile that ended its session names the command that signs it in", async () => {
    const keyring = memoryKeyring()
    await hubspot(["home", "session", "start"], { keyring, stdin: FAKE_TOKEN })
    await hubspot(["home", "session", "end"], { keyring })
    const ran = await hubspot(["home", "sync", "--json"], { keyring, env: freshStore() })
    expect(ran.json()).toMatchObject({ error: { code: "authentication_error", reason: "session.missing" } })
  })
})
