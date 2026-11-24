import { expect, it } from "vitest"
import { seededHubspot } from "../testing/fake-hubspot.js"
import { hubspot } from "../testing/harness.js"

it("a won deal's closed day is HubSpot's closedate, not the day the copy first saw it won", async () => {
  const { hub, ids } = seededHubspot()
  hub.touch("deals", ids.won, { closedate: "2025-03-14T09:30:00Z" })
  const synced = await hubspot(["work", "sync", "--json"], { account: hub })
  expect(synced.code, synced.err).toBe(0)
  const listed = (await hubspot(["work", "deals", "list", "--json"], { account: hub })).json() as {
    items: { ref: string; external_id: string }[]
  }
  const ref = listed.items.find((one) => one.external_id === ids.won)?.ref ?? ""
  const shown = (await hubspot(["work", "deals", "show", ref, "--json"], { account: hub })).json() as {
    item: { status: string; close_date: string; closed_date: string }
  }
  expect(shown.item).toMatchObject({ status: "won", close_date: "2025-03-14", closed_date: "2025-03-14" })
})
