import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { memoryKeyring, resolvePaths } from "@wirecat/cli-base"
import { rememberAccount } from "@wirecat/cli-core/cli"
import { describe, expect, it } from "vitest"
import { encodeSignIn } from "../context.js"
import { IDENTITY } from "../identity.js"
import { openHubspotStore } from "../store.js"
import { FAKE_TOKEN, seededHubspot } from "../testing/fake-hubspot.js"
import { FAKE_ACCOUNT, FAKE_SIGN_IN, hubspot } from "../testing/harness.js"

const storedAccounts = async () => {
  const store = await openHubspotStore(process.env)
  try {
    return (await store.accounts.accounts()).map((one) => `${one.provider}:${one.account}`)
  } finally {
    await store.close()
  }
}

const syncedWork = async () => {
  const keyring = memoryKeyring()
  const { hub: account } = seededHubspot()
  const started = await hubspot(["work", "session", "start"], { account, keyring, stdin: FAKE_TOKEN })
  expect(started.code).toBe(0)
  const synced = await hubspot(["work", "sync", "--json"], { account, keyring })
  expect([synced.code, synced.err]).toEqual([0, ""])
  const crm = join(resolvePaths({ appName: IDENTITY.appName, prefix: IDENTITY.envPrefix }).state, "crm", "work")
  mkdirSync(crm, { recursive: true })
  writeFileSync(join(crm, "marker.json"), "[]")
  return { keyring, crm, account }
}

describe("account remove", () => {
  it("--dry-run lists the sign-in, the profile's files and the account's copy, and changes nothing", async () => {
    const { keyring, crm } = await syncedWork()
    const ran = await hubspot(["work", "account", "remove", "--delete-data", "--dry-run", "--json"], { keyring })
    expect(ran.code).toBe(0)
    const item = ran.json().item as { removed: { kind: string; target: string }[] }
    expect(item).toMatchObject({ profile: "work", data: "deleted", dry_run: true, revoked: null })
    expect(item).toMatchObject({ account: { provider: "hubspot", account: FAKE_ACCOUNT } })
    expect(item.removed).toEqual(
      expect.arrayContaining([
        { kind: "keyring", target: "token:work" },
        { kind: "file", target: crm },
        { kind: "store", target: `hubspot:${FAKE_ACCOUNT}` },
      ]),
    )
    expect(keyring.get("hubspot-cli", "token:work")).not.toBeNull()
    expect(existsSync(crm)).toBe(true)
    expect(await storedAccounts()).toContain(`hubspot:${FAKE_ACCOUNT}`)
    expect(ran.out + ran.err).not.toContain(FAKE_TOKEN)
  })

  it("--delete-data forgets the key and deletes the account's deals, contacts and companies", async () => {
    const { keyring, crm } = await syncedWork()
    const ran = await hubspot(["work", "account", "remove", "--delete-data", "--yes", "--json"], { keyring })
    expect([ran.code, ran.err]).toEqual([0, ""])
    expect(keyring.get("hubspot-cli", "token:work")).toBeNull()
    expect(existsSync(crm)).toBe(false)
    expect(await storedAccounts()).not.toContain(`hubspot:${FAKE_ACCOUNT}`)
  })

  it("--keep-data forgets the key and leaves the copy searchable", async () => {
    const { keyring } = await syncedWork()
    const ran = await hubspot(["work", "account", "remove", "--keep-data", "--yes", "--json"], { keyring })
    expect(ran.json().item).toMatchObject({ data: "kept", dry_run: false })
    expect(keyring.get("hubspot-cli", "token:work")).toBeNull()
    expect(await storedAccounts()).toContain(`hubspot:${FAKE_ACCOUNT}`)
  })

  it("--delete-data refuses while a profile that ended its session remembers the same account", async () => {
    const { keyring, account } = await syncedWork()
    rememberAccount(IDENTITY, "home", FAKE_ACCOUNT, process.env)
    const listed = await hubspot(["work", "account", "remove", "--delete-data", "--dry-run", "--json"], { keyring })
    expect(listed.code).toBe(0)
    expect(listed.err).toContain("home also reads")
    const refused = await hubspot(["work", "account", "remove", "--delete-data", "--yes", "--json"], {
      keyring,
      account,
    })
    expect(refused.json().error).toMatchObject({ code: "conflict", reason: "account-remove.account-shared" })
    expect(keyring.get("hubspot-cli", "token:work")).not.toBeNull()
    expect((await hubspot(["work", "account", "remove", "--keep-data", "--yes", "--json"], { keyring })).code).toBe(0)
  })

  it("a profile signed in to another account is that account's, whatever it remembered before", async () => {
    rememberAccount(IDENTITY, "work", FAKE_ACCOUNT, process.env)
    rememberAccount(IDENTITY, "home", FAKE_ACCOUNT, process.env)
    const keyring = memoryKeyring({
      "hubspot-cli:token:work": FAKE_SIGN_IN,
      "hubspot-cli:token:home": encodeSignIn({ token: FAKE_TOKEN, portalId: "999", uiDomain: null }),
    })
    const ran = await hubspot(["work", "account", "remove", "--delete-data", "--dry-run", "--json"], { keyring })
    expect([ran.code, ran.err]).toEqual([0, ""])
  })

  it("--delete-data still refuses when the other profile's sign-in is unreadable, from what session start kept", async () => {
    const { keyring } = await syncedWork()
    keyring.set("hubspot-cli", "token:home", "not a sign-in")
    rememberAccount(IDENTITY, "home", FAKE_ACCOUNT, process.env)
    const refused = await hubspot(["work", "account", "remove", "--delete-data", "--yes", "--json"], { keyring })
    expect(refused.json().error).toMatchObject({
      code: "conflict",
      reason: "account-remove.account-shared",
      details: { profiles: ["home"], account: FAKE_ACCOUNT },
    })
    expect(await storedAccounts()).toContain(`hubspot:${FAKE_ACCOUNT}`)
  })

  it("--delete-data refuses when nothing tells which account another profile holds", async () => {
    const { keyring } = await syncedWork()
    keyring.set("hubspot-cli", "token:home", "not a sign-in")
    rememberAccount(IDENTITY, "home", "unknown", process.env)
    const refused = await hubspot(["work", "account", "remove", "--delete-data", "--yes", "--json"], { keyring })
    expect(refused.json().error).toMatchObject({
      code: "conflict",
      reason: "account-remove.account-unknown",
      details: { profile: "home" },
    })
    expect(keyring.get("hubspot-cli", "token:work")).not.toBeNull()
    expect(await storedAccounts()).toContain(`hubspot:${FAKE_ACCOUNT}`)
    expect((await hubspot(["work", "account", "remove", "--keep-data", "--yes", "--json"], { keyring })).code).toBe(0)
  })
})
