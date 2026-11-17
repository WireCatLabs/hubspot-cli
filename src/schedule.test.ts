import { mkdtempSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { delimiter, isAbsolute, join } from "node:path"
import { describe, expect, it } from "vitest"
import { run } from "./program.js"
import { signedIn } from "./testing/harness.js"

/** A machine whose `systemctl` only records what it was asked, so no test installs a real timer. */
const harness = () => {
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
    entry: ["/opt/node", "/opt/hubspot/dist/bin/hubspot.js"],
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
  return { hubspot, env, ran, root }
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
})
