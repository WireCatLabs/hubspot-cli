import { copyFileSync, mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { Readable } from "node:stream"
import { neverAnswers, runScopeCases } from "@wirecat/cli-core/testing"
import { beforeAll, describe, expect, it } from "vitest"
import { API } from "./config.js"
import { definition } from "./program.js"
import { FAKE_TOKEN, seededHubspot } from "./testing/fake-hubspot.js"
import { hubspot, signedIn } from "./testing/harness.js"

// The writes name a stored deal, so each case gets its own copy of one synced store.
let seeded = ""
// The cases are built before the store is synced, so they name the ref the seeded sync gives; beforeAll checks it.
const DEAL = "deal:1"
beforeAll(async () => {
  seeded = join(mkdtempSync(join(tmpdir(), "run-scope-seed-")), "store.db")
  const { hub, ids } = seededHubspot()
  const env = { MESSAGING_STORE: seeded }
  expect((await hubspot(["work", "sync", "--json"], { account: hub, env })).code).toBe(0)
  const listed = (await hubspot(["work", "deals", "list", "--json"], { account: hub, env })).json() as {
    items: { ref: string; external_id: string }[]
  }
  expect(listed.items.find((one) => one.external_id === ids.kitchen)?.ref).toBe(DEAL)
})

const options = (fetch: typeof globalThis.fetch) => {
  const store = join(mkdtempSync(join(tmpdir(), "run-scope-")), "store.db")
  if (seeded) copyFileSync(seeded, store)
  return {
    keyring: signedIn(),
    fetch,
    sleep: async () => {},
    env: { ...process.env, MESSAGING_STORE: store },
    stdin: Object.assign(Readable.from([FAKE_TOKEN]), { isTTY: false }),
  }
}

describe("each remote command runs inside cli-core's run", () => {
  const { ids } = seededHubspot()
  const cases = runScopeCases({
    definition: definition(),
    commands: {
      "session start": ["fresh", "session", "start"],
      "session status": ["work", "session", "status", "--check"],
      sync: ["work", "sync"],
      "people list": ["work", "people", "list"],
      "people show": ["work", "people", "show", ids.ana],
      "organizations list": ["work", "organizations", "list"],
      "organizations show": ["work", "organizations", "show", ids.acme],
      "users list": ["work", "users", "list"],
      "users show": ["work", "users", "show", "501"],
      "deals create": ["work", "deals", "create", "--title", "WireCat test", "--stage", "Appointment Scheduled"],
      "deals update": ["work", "deals", "update", DEAL, "--title", "Example renamed"],
      "deals move": ["work", "deals", "move", DEAL, "Qualified To Buy"],
      "deals close": ["work", "deals", "close", DEAL, "lost"],
      "deals delete": ["work", "deals", "delete", DEAL, "--yes"],
      "people create": ["work", "people", "create", "--first-name", "Anna"],
      "people update": ["work", "people", "update", ids.ana, "--last-name", "Example"],
      "organizations create": ["work", "organizations", "create", "--name", "Example"],
      "organizations update": ["work", "organizations", "update", ids.acme, "--name", "Example Ltd"],
    },
    skip: {
      ...Object.fromEntries(
        API.manifest.operations.map((operation) => [
          `api ${operation.command}`,
          "cli-core's serviceApiCommand runs it in its run; src/api.test.ts sends each one",
        ]),
      ),
      "mcp serve": "listens until stopped",
      "schedule run": "starts the schedule's entry as its own process",
      "schedule exec": "the timer's entry, which starts a process",
      setup: "asks its questions in a terminal; its check is the same checkedToken that session start runs here",
      "setup apply": "takes its answers as JSON on stdin; src/setup/flow.test.ts drives it against the fake",
      "setup run": "takes its answers as JSON on stdin; src/setup/flow.test.ts drives it against the fake",
      doctor:
        "cli-core's appDoctorCommand answers --online outside a run of its own; drop this once core runs it inside",
    },
    answering: () => options(seededHubspot().hub.fetch),
    silent: () => options(neverAnswers),
  })
  for (const one of cases) it(one.name, () => one.run())
})
