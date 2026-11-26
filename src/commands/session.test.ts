import { mkdtempSync, readdirSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { memoryKeyring, resolvePaths } from "@wirecat/cli-base"
import { describe, expect, it } from "vitest"
import { decodeSignIn } from "../context.js"
import { IDENTITY } from "../identity.js"
import { FAKE_TOKEN, fakeHubspot } from "../testing/fake-hubspot.js"
import { FAKE_ACCOUNT, hubspot } from "../testing/harness.js"

const ACCOUNT_INFO = {
  id: FAKE_ACCOUNT,
  ui_domain: "app-eu1.hubspot.com",
  time_zone: "Europe/Madrid",
  type: "STANDARD",
}

describe("session start", () => {
  it("reads the key from stdin, checks it, and keeps it in the keyring with the account", async () => {
    const keyring = memoryKeyring()
    const account = fakeHubspot()
    const ran = await hubspot(["work", "session", "start", "--json"], { keyring, account, stdin: FAKE_TOKEN })
    expect(ran.code).toBe(0)
    expect(ran.json().item).toEqual({
      profile: "work",
      state: "saved",
      stored_in: "keyring",
      verified: true,
      account: FAKE_ACCOUNT,
      account_info: ACCOUNT_INFO,
      user: null,
    })
    expect(ran.out + ran.err).not.toContain(FAKE_TOKEN)
    expect(account.calls.map((one) => one.url.pathname)).toEqual(["/account-info/2026-03/details"])
    const saved = keyring.get("hubspot-cli", "token:work")
    expect(saved && decodeSignIn(saved)).toEqual({
      token: FAKE_TOKEN,
      portalId: FAKE_ACCOUNT,
      uiDomain: "app-eu1.hubspot.com",
      timeZone: "Europe/Madrid",
    })
  })

  it("keeps nothing when HubSpot refuses the key, and never shows it", async () => {
    const keyring = memoryKeyring()
    const ran = await hubspot(["work", "session", "start", "--json"], { keyring, stdin: "pat-na1-wrong-key" })
    expect(ran.code).toBe(4)
    expect(ran.json()).toMatchObject({ error: { code: "authentication_error", reason: "session.expired" } })
    expect(ran.err).not.toContain("pat-na1-wrong-key")
    expect(keyring.get("hubspot-cli", "token:work")).toBeNull()
  })

  it("refuses an empty key, --offline and a bad --credential-storage before any request", async () => {
    const account = fakeHubspot()
    const empty = await hubspot(["work", "session", "start", "--json"], { account, stdin: " " })
    expect(empty.json()).toMatchObject({ error: { code: "validation_error" } })
    const offline = await hubspot(["work", "session", "start", "--offline", "--json"], { account, stdin: FAKE_TOKEN })
    expect(offline.json()).toMatchObject({ error: { reason: "offline.refused" } })
    const storage = await hubspot(["work", "session", "start", "--credential-storage", "x"], {
      account,
      stdin: FAKE_TOKEN,
    })
    expect(storage.code).toBe(2)
    expect(account.calls).toEqual([])
  })

  it("refuses a second profile on the same account", async () => {
    const keyring = memoryKeyring()
    expect((await hubspot(["work", "session", "start"], { keyring, stdin: FAKE_TOKEN })).code).toBe(0)
    const ran = await hubspot(["other", "session", "start", "--json"], { keyring, stdin: FAKE_TOKEN })
    expect(ran.json()).toMatchObject({
      error: { code: "conflict", reason: "session.duplicate", details: { profile: "work", account: FAKE_ACCOUNT } },
    })
    expect(keyring.get("hubspot-cli", "token:other")).toBeNull()
  })

  it("keeps the key in a private file when asked", async () => {
    const env = { WCHUBSPOT_CONFIG_DIR: mkdtempSync(join(tmpdir(), "config-")) }
    const keyring = memoryKeyring()
    const ran = await hubspot(["filed", "session", "start", "--credential-storage", "file", "--json"], {
      keyring,
      env,
      stdin: FAKE_TOKEN,
    })
    expect(ran.json().item).toMatchObject({ stored_in: "file" })
    expect((await hubspot(["filed", "session", "end", "--json"], { keyring, env })).json().item).toMatchObject({
      ended: ["file"],
    })
  })
})

describe("session status, end and list", () => {
  it("shows where the key comes from and, with --check, which account it reads", async () => {
    const plain = await hubspot(["work", "session", "status", "--json"])
    expect(plain.json().item).toEqual({
      profile: "work",
      state: "saved",
      token_from: "keyring",
      account: FAKE_ACCOUNT,
      verified: false,
    })
    const checked = await hubspot(["work", "session", "status", "--check", "--json"])
    expect(checked.json().item).toMatchObject({
      verified: true,
      account: FAKE_ACCOUNT,
      account_info: ACCOUNT_INFO,
      user: null,
    })
    expect(checked.out).not.toContain(FAKE_TOKEN)
  })

  it("takes WCHUBSPOT_TOKEN with WCHUBSPOT_ACCOUNT, and --check finds the id with the token alone", async () => {
    const env = { WCHUBSPOT_TOKEN: FAKE_TOKEN, WCHUBSPOT_ACCOUNT: FAKE_ACCOUNT }
    const plain = await hubspot(["work", "session", "status", "--json"], { keyring: memoryKeyring(), env })
    expect(plain.json().item).toMatchObject({ token_from: "environment", account: FAKE_ACCOUNT, verified: false })
    const checked = await hubspot(["work", "session", "status", "--check", "--json"], { keyring: memoryKeyring(), env })
    expect(checked.json().item).toMatchObject({ token_from: "environment", verified: true, account: FAKE_ACCOUNT })
    const alone = { WCHUBSPOT_TOKEN: FAKE_TOKEN }
    const unchecked = await hubspot(["work", "session", "status", "--json"], { keyring: memoryKeyring(), env: alone })
    expect(unchecked.json().item).toMatchObject({ token_from: "environment", account: null, verified: false })
    const found = await hubspot(["work", "session", "status", "--check", "--json"], {
      keyring: memoryKeyring(),
      env: alone,
    })
    expect(found.json().item).toMatchObject({ verified: true, account: FAKE_ACCOUNT })
    expect(found.out).not.toContain(FAKE_TOKEN)
  })

  it("--check refuses a WCHUBSPOT_ACCOUNT that is not the token's account, and one that is not an id", async () => {
    const wrong = await hubspot(["work", "session", "status", "--check", "--json"], {
      keyring: memoryKeyring(),
      env: { WCHUBSPOT_TOKEN: FAKE_TOKEN, WCHUBSPOT_ACCOUNT: "999" },
    })
    expect(wrong.json()).toMatchObject({
      error: { code: "configuration_error", reason: "account.mismatch", details: { account: FAKE_ACCOUNT } },
    })
    expect(wrong.err).toContain("999")
    expect(wrong.err).not.toContain(FAKE_TOKEN)
    const malformed = await hubspot(["work", "session", "status", "--check", "--json"], {
      keyring: memoryKeyring(),
      env: { WCHUBSPOT_TOKEN: FAKE_TOKEN, WCHUBSPOT_ACCOUNT: "portal-1" },
    })
    expect(malformed.json()).toMatchObject({ error: { reason: "account.id-malformed" } })
    expect(malformed.err).toContain("digits only")
  })

  it("says missing for a profile that never signed in", async () => {
    const ran = await hubspot(["work", "session", "status", "--check", "--json"], { keyring: memoryKeyring() })
    expect(ran.json().item).toMatchObject({ state: "missing", account: null, verified: false })
  })

  it("reads an entry written before the time zone was kept, and paces by the account", async () => {
    const old = JSON.stringify({ token: FAKE_TOKEN, portalId: FAKE_ACCOUNT, uiDomain: null, utcOffsetMs: 3_600_000 })
    const ran = await hubspot(["work", "session", "status", "--check", "--json"], {
      keyring: memoryKeyring({ "hubspot-cli:token:work": old }),
    })
    expect(ran.json().item).toMatchObject({ verified: true, account: FAKE_ACCOUNT })
    const paces = join(resolvePaths({ appName: IDENTITY.appName, prefix: IDENTITY.envPrefix }).state, "pace")
    expect(readdirSync(paces)).toContain(`account-${FAKE_ACCOUNT}.json`)
  })

  it("refuses a saved entry hubspot did not write", async () => {
    const ran = await hubspot(["work", "session", "status", "--json"], {
      keyring: memoryKeyring({ "hubspot-cli:token:work": "pat-na1-bare" }),
    })
    expect(ran.json()).toMatchObject({ error: { code: "configuration_error", reason: "session.unreadable" } })
    expect(ran.err).not.toContain("pat-na1-bare")
  })

  it("ends a sign-in on this computer, and lists the profiles with their accounts", async () => {
    const keyring = memoryKeyring()
    await hubspot(["work", "session", "start"], { keyring, stdin: FAKE_TOKEN })
    const listed = await hubspot(["session", "list", "--json"], { keyring })
    expect(listed.json().items).toContainEqual({
      profile: "work",
      signed_in: true,
      state: "saved",
      token_from: "keyring",
      account: FAKE_ACCOUNT,
    })
    const ended = await hubspot(["work", "session", "end", "--json"], { keyring })
    expect(ended.json().item).toMatchObject({ profile: "work", ended: ["keyring"] })
    expect(keyring.get("hubspot-cli", "token:work")).toBeNull()
  })
})
