import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { delimiter, isAbsolute, join } from "node:path"
import { describe, expect, it } from "vitest"
import { run } from "./program.js"
import { FAKE_TOKEN } from "./testing/fake-hubspot.js"
import { FAKE_ACCOUNT, signedIn } from "./testing/harness.js"

/** A machine whose `systemctl` only records what it was asked, so no test installs a real timer. */
const harness = (entry = ["/opt/node", "/opt/hubspot/dist/bin/hubspot.js"]) => {
  const root = mkdtempSync(join(tmpdir(), "schedule-"))
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    // pnpm puts ./node_modules/.bin on PATH, and a schedule refuses a relative entry.
    PATH: (process.env.PATH ?? "")
      .split(delimiter)
      .filter((dir) => isAbsolute(dir))
      .join(delimiter),
    HOME: join(root, "home"),
    XDG_CONFIG_HOME: join(root, "home", ".config"),
    WCHUBSPOT_STATE_DIR: join(root, "state"),
  }
  const ran: string[][] = []
  const system = {
    platform: "linux" as const,
    uid: 501,
    entry,
    run: async (argv: string[]) => {
      ran.push(argv)
      return { code: 0, stdout: "", stderr: "" }
    },
    spawn: () => 0,
    pause: async () => {},
  }
  const hubspot = async (...argv: string[]) => {
    const out: string[] = []
    const err: string[] = []
    const code = await run(argv, {
      streams: { data: (text) => out.push(text), diagnostic: (text) => err.push(text) },
      tty: false,
      env,
      keyring: signedIn(),
      system,
    } as Parameters<typeof run>[1])
    return { code, out: out.join(""), err: err.join("\n") }
  }
  const file = join(root, "state", "schedules", "crm", "schedule.json")
  return { hubspot, env, ran, root, file }
}

describe("hubspot schedule", () => {
  it("installs an hourly sync of the profile as a systemd user timer", async () => {
    const { hubspot, env, ran, root } = harness()
    const added = await hubspot("work", "schedule", "command", "crm", "--every", "1h", "--", "sync")
    expect(added.code, added.err).toBe(0)
    expect(JSON.parse(readFileSync(join(root, "state", "schedules", "crm", "schedule.json"), "utf8"))).toMatchObject({
      kind: "command",
      argv: ["sync"],
      when: { every: 60 },
      environment: { WCHUBSPOT_PROFILE: "work" },
    })
    const units = join(env.XDG_CONFIG_HOME ?? "", "systemd", "user")
    expect(readFileSync(join(units, "hubspot-schedule-crm.timer"), "utf8")).toContain("OnUnitInactiveSec=60min")
    expect(ran.map((argv) => argv.join(" "))).toEqual([
      "systemctl --user daemon-reload",
      "systemctl --user enable --now hubspot-schedule-crm.timer",
    ])
  })

  it("installs the CRM morning digest as a daily command schedule of changes list --format report", async () => {
    const { hubspot, root } = harness()
    const argv = ["changes", "list", "--format", "report"]
    const added = await hubspot("work", "schedule", "command", "crm-digest", "--at", "08:00", "--", ...argv)
    expect(added.code, added.err).toBe(0)
    const file = join(root, "state", "schedules", "crm-digest", "schedule.json")
    expect(JSON.parse(readFileSync(file, "utf8"))).toMatchObject({
      kind: "command",
      argv,
      environment: { WCHUBSPOT_PROFILE: "work" },
    })
  })

  it("lists the sync schedule, then removes it and its timer", async () => {
    const { hubspot, ran } = harness()
    await hubspot("work", "schedule", "command", "crm", "--every", "1h", "--", "sync")
    const listed = await hubspot("work", "schedule", "list", "--json")
    expect(listed.code, listed.err).toBe(0)
    expect(listed.out).toContain('"crm"')
    expect((await hubspot("work", "schedule", "remove", "crm")).code).toBe(0)
    expect(ran.map((argv) => argv.join(" "))).toContain("systemctl --user disable --now hubspot-schedule-crm.timer")
    expect((await hubspot("work", "schedule", "list", "--json")).out).not.toContain('"crm"')
  })

  it("keeps the token out of the schedule file and the timer, even from WCHUBSPOT_TOKEN", async () => {
    const { hubspot, env, root } = harness()
    env.WCHUBSPOT_TOKEN = FAKE_TOKEN
    env.WCHUBSPOT_ACCOUNT = FAKE_ACCOUNT
    expect((await hubspot("work", "schedule", "command", "crm", "--every", "1h", "--", "sync")).code).toBe(0)
    expect(readFileSync(join(root, "state", "schedules", "crm", "schedule.json"), "utf8")).not.toContain(FAKE_TOKEN)
    const units = join(env.XDG_CONFIG_HOME ?? "", "systemd", "user")
    for (const unit of ["hubspot-schedule-crm.timer", "hubspot-schedule-crm.service"])
      expect(readFileSync(join(units, unit), "utf8")).not.toContain(FAKE_TOKEN)
  })

  it("refuses to install, remove, run or exec a schedule under WCHUBSPOT_READ_ONLY", async () => {
    const { hubspot, env, ran, file } = harness()
    env.WCHUBSPOT_READ_ONLY = "1"
    expect((await hubspot("work", "schedule", "command", "crm", "--every", "1h", "--", "sync")).code).not.toBe(0)
    expect(ran).toEqual([])
    delete env.WCHUBSPOT_READ_ONLY
    await hubspot("work", "schedule", "command", "crm", "--every", "1h", "--", "sync")
    env.WCHUBSPOT_READ_ONLY = "1"
    for (const words of [
      ["remove", "crm"],
      ["run", "crm"],
    ]) {
      const refused = await hubspot("work", "schedule", ...words, "--json")
      expect(JSON.parse(refused.err).error.code, words.join(" ")).toBe("permission_error")
    }
    expect(JSON.parse((await hubspot("schedule", "exec", file, "--json")).err).error.code).toBe("permission_error")
    expect(existsSync(join(file, "..", "last.json"))).toBe(false)
  })

  it.skipIf(process.platform === "win32")(
    "the timer's schedule exec and schedule run start sync for the profile, with no terminal and no --yes",
    async () => {
      const root = mkdtempSync(join(tmpdir(), "entry-"))
      const seen = join(root, "seen.json")
      const script = join(root, "fake-hubspot.js")
      writeFileSync(
        script,
        `require("fs").writeFileSync(${JSON.stringify(seen)}, JSON.stringify({ argv: process.argv.slice(2), profile: process.env.WCHUBSPOT_PROFILE }))\n`,
      )
      const { hubspot, file } = harness([process.execPath, script])
      await hubspot("work", "schedule", "command", "crm", "--every", "1h", "--", "sync")
      const exec = await hubspot("schedule", "exec", file)
      expect(exec.code, exec.err).toBe(0)
      expect(JSON.parse(readFileSync(seen, "utf8"))).toEqual({ argv: ["sync"], profile: "work" })
      expect(JSON.parse(readFileSync(join(file, "..", "last.json"), "utf8")).exitCode).toBe(0)
      const ran = await hubspot("work", "schedule", "run", "crm")
      expect(ran.code, ran.err).toBe(0)
    },
  )

  it("keeps only the words, the profile and folder paths in the schedule file", async () => {
    const { hubspot, file } = harness()
    await hubspot("work", "schedule", "command", "crm", "--every", "1h", "--", "sync")
    const written = JSON.parse(readFileSync(file, "utf8")) as { environment: Record<string, string> }
    expect(Object.keys(written.environment).sort()).toEqual([
      "MESSAGING_STORE",
      "PATH",
      "WCHUBSPOT_CONFIG_DIR",
      "WCHUBSPOT_PROFILE",
      "WCHUBSPOT_STATE_DIR",
    ])
  })
})
