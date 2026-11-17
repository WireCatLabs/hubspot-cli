import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { type KeyringStore, memoryKeyring } from "@wirecat/cli-base"
import { ProfileTokenStore, setupProblems } from "@wirecat/cli-core/cli"
import { setupFileProblems } from "@wirecat/cli-core/testing"
import { describe, expect, it } from "vitest"
import { configuration } from "../config.js"
import { decodeSignIn } from "../context.js"
import { IDENTITY } from "../identity.js"
import { FAKE_TOKEN } from "../testing/fake-hubspot.js"
import { FAKE_ACCOUNT, FAKE_SIGN_IN, hubspot } from "../testing/harness.js"
import { hubspotSetup } from "./flow.js"
import en from "./texts.en.json" with { type: "json" }
import es from "./texts.es.json" with { type: "json" }
import ru from "./texts.ru.json" with { type: "json" }

const apply = async (
  answers: Record<string, unknown>,
  keyring: KeyringStore = memoryKeyring(),
  env = { WCHUBSPOT_CONFIG_DIR: mkdtempSync(join(tmpdir(), "hubspot-setup-")) },
) => {
  const ran = await hubspot(["work", "setup", "run", "apply", "--json", "--answer-stdin"], {
    keyring,
    env,
    stdin: `${JSON.stringify(answers)}\n`,
  })
  // The harness joins stderr's writes with nothing between them, and the sign-in events come first.
  const error = () =>
    ran.err.includes('{"error"') ? JSON.parse(ran.err.slice(ran.err.lastIndexOf('{"error"'))).error : undefined
  return { ...ran, error, keyring, env }
}

describe("the setup flow", () => {
  it("is a valid v1 document over hubspot's own settings, with no image files yet", () => {
    expect(setupProblems(hubspotSetup.document, { settings: configuration.allSettings, v1: true })).toEqual([])
    expect(setupFileProblems(hubspotSetup, new URL("../../", import.meta.url))).toEqual([])
  })

  it("has every text in Russian and Spanish too", () => {
    expect(Object.keys(ru).sort()).toEqual(Object.keys(en).sort())
    expect(Object.keys(es).sort()).toEqual(Object.keys(en).sort())
  })

  it("a key HubSpot refuses keeps nothing", async () => {
    const keyring = memoryKeyring()
    const { code, error, out } = await apply({ token: "pat-na1-not-the-key" }, keyring)
    expect(code).not.toBe(0)
    expect(error()).toMatchObject({ code: "authentication_error" })
    expect(out).toBe("")
    expect(new ProfileTokenStore({ app: IDENTITY, env: {}, keyring }).signedIn("work")).toBe(false)
  })

  it("saves the sign-in session start keeps: the key with the account beside it", async () => {
    const saved = await apply({ token: FAKE_TOKEN })
    expect([saved.code, saved.error()]).toEqual([0, undefined])
    expect(saved.json()).toMatchObject({ item: { outcome: "ok", secrets: ["token"] } })
    expect(saved.out).not.toContain(FAKE_TOKEN)
    expect(saved.out).not.toContain("keep")
    const kept = saved.keyring.get("hubspot-cli", "token:work")
    expect(kept && decodeSignIn(kept)).toMatchObject({ token: FAKE_TOKEN, portalId: FAKE_ACCOUNT })
    const status = await hubspot(["work", "session", "status", "--check", "--json"], {
      keyring: saved.keyring,
      env: saved.env,
    })
    expect(status.json()).toMatchObject({ item: { state: "saved", account: FAKE_ACCOUNT, verified: true } })
  })

  it("editing a profile without a new key checks the kept one, and a profile with none is asked for one", async () => {
    const kept = await apply({}, memoryKeyring({ "hubspot-cli:token:work": FAKE_SIGN_IN }))
    expect([kept.code, kept.error()]).toEqual([0, undefined])
    const none = await apply({})
    expect(none.code).not.toBe(0)
    expect(none.error()).toMatchObject({ code: "validation_error" })
  })
})
