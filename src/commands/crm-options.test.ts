import { describe, expect, it } from "vitest"
import { seededHubspot } from "../testing/fake-hubspot.js"
import { hubspot } from "../testing/harness.js"

const synced = async () => {
  const { hub: account } = seededHubspot()
  const ran = await hubspot(["work", "sync", "--json"], { account })
  if (ran.code !== 0) throw new Error(`sync failed: ${ran.err}`)
  const firstRef = async (kind: string) => {
    const listed = (await hubspot(["work", kind, "list", "--json"], { account })).json() as { items: { ref: string }[] }
    const ref = listed.items[0]?.ref
    if (!ref) throw new Error(`no stored ${kind}`)
    return ref
  }
  return { account, deal: await firstRef("deals"), lead: await firstRef("leads") }
}

// --format csv is an output of its own, so it runs without --json.
const expectRuns = async (account: Awaited<ReturnType<typeof synced>>["account"], argv: string[]) => {
  const ran = await hubspot(["work", ...argv, ...(argv.includes("--format") ? [] : ["--json"])], { account })
  expect(ran.code, `${argv.join(" ")}: ${ran.err}`).toBe(0)
}

describe("every option of the CRM commands runs against the fake account", () => {
  it("sync, lists, shows, pipelines, stages, fields and search", async () => {
    const { account, deal, lead } = await synced()
    for (const argv of [
      ["sync", "--rescan", "--max-pages", "50"],
      ["sync", "--allow-deletions", "5"],
      ["deals", "list", "--limit", "1", "--page", "2"],
      ["deals", "list", "--format", "csv"],
      ["deals", "show", deal],
      ["leads", "list", "--limit", "1", "--page", "2"],
      ["leads", "list", "--format", "csv"],
      ["leads", "show", lead],
      ["pipelines", "list"],
      ["pipelines", "show", "Sales Pipeline"],
      ["pipelines", "show", "Sales Pipeline", "--since-time", "2026-01-01", "--until-time", "2026-12-31"],
      ["stages", "list", "kind:deal"],
      ["activities", "list"],
      ["activities", "list", "--limit", "1", "--page", "2"],
      ["people", "list", "--limit", "1", "--page", "2"],
      ["people", "list", "--format", "csv"],
      ["organizations", "list", "--limit", "1", "--page", "1"],
      ["organizations", "list", "--format", "csv"],
      ["users", "list", "--limit", "1", "--page", "2"],
      ["fields", "list", "people"],
      ["fields", "list", "deals", "--limit", "5", "--page", "1"],
      ["fields", "list", "organizations", "--all"],
      ["search", "all", "Example", "--only", "crm", "--limit", "5", "--page", "1", "--exact", "--timezone", "UTC"],
      ["search", "all", "Example", "--source", "hubspot"],
    ])
      await expectRuns(account, argv)
  })

  it("changes list pages with --limit and --cursor, and prints a page as csv", async () => {
    const { account } = await synced()
    const first = await hubspot(["work", "changes", "list", "at>=3650d", "--limit", "1", "--json"], { account })
    expect(first.code, first.err).toBe(0)
    const next = (first.json().page as { next_cursor?: string } | undefined)?.next_cursor
    expect(next).toEqual(expect.any(String))
    const second = ["changes", "list", "at>=3650d", "--limit", "1", "--cursor", String(next)]
    await expectRuns(account, second)
    await expectRuns(account, ["changes", "list", "--format", "csv"])
  })
})
