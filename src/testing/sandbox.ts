import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { afterAll, beforeEach } from "vitest"
import { ARGV_LOG } from "./argv-log.js"

const saved = { ...process.env }

// cli-base's setup already gave this file a fresh TMPDIR and HOME, a keyring that throws and no network, and points
// every folder and store variable at them (WC-TEST-1, WC-STORE-14). The config folder is set only because tests
// write into it by name.
process.env.WCHUBSPOT_CONFIG_DIR = join(tmpdir(), "config")
process.env.WCHUBSPOT_NO_UPDATE_CHECK = "1"
process.env.WCHUBSPOT_TEST_ARGV_LOG = ARGV_LOG
delete process.env.WCHUBSPOT_PROFILE
delete process.env.WCHUBSPOT_TOKEN
delete process.env.WCHUBSPOT_ACCOUNT
delete process.env.WCHUBSPOT_READ_ONLY
delete process.env.AI_AGENT
delete process.env.CLAUDECODE

// The account's pace is kept in the state folder on the real clock: one test's 429 hold would otherwise slow the next.
beforeEach(() => {
  const own = mkdtempSync(join(tmpdir(), "test-"))
  process.env.WCHUBSPOT_STATE_DIR = join(own, "state")
  process.env.MESSAGING_STORE = join(own, "store.db")
})

afterAll(() => {
  for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key]
  Object.assign(process.env, saved)
})
