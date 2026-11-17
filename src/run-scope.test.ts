import { Readable } from "node:stream"
import { neverAnswers, runScopeCases } from "@wirecat/cli-core/testing"
import { describe, it } from "vitest"
import { API } from "./config.js"
import { definition } from "./program.js"
import { FAKE_TOKEN, seededHubspot } from "./testing/fake-hubspot.js"
import { signedIn } from "./testing/harness.js"

const options = (fetch: typeof globalThis.fetch) => ({
  keyring: signedIn(),
  fetch,
  sleep: async () => {},
  stdin: Object.assign(Readable.from([FAKE_TOKEN]), { isTTY: false }),
})

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
