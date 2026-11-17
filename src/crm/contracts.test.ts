import { mkdtempSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { crmSourceContract, crmSyncContract, crmWriteContract } from "@wirecat/cli-core/crm/testing"
import { type MessageStore, openStore } from "@wirecat/cli-core/store"
import { afterEach, describe, expect, it } from "vitest"
import { hubspotTransport } from "../hubspot/transport.js"
import { FAKE_TOKEN, type FakeHubspot, seededHubspot } from "../testing/fake-hubspot.js"
import { hubspotCrmSource } from "./source.js"
import { HUBSPOT_WRITES, hubspotCrmWriter } from "./writer.js"

const over = (hub: FakeHubspot, now: () => number = Date.now) => {
  const transport = hubspotTransport({ token: FAKE_TOKEN, fetch: hub.fetch, sleep: async () => {} })
  return hubspotCrmSource(() => transport, { now, page: 2 })
}

const fixture = () => {
  const { hub, ids } = seededHubspot()
  return {
    source: over(hub),
    deadCursor: { kind: "deal" as const, cursor: "not a time" },
    live: { person: [ids.ana, ids.ben, ids.cy], organization: [ids.acme, ids.beta] },
    faults: {
      deny: (status: 403 | 404) => {
        hub.deny("contacts", ids.ana, status)
        return { kind: "person" as const, id: ids.ana }
      },
      skewed: (ms: number) => over(hub, () => Date.now() + ms),
      change: () => {
        hub.touch("deals", ids.kitchen, { dealname: "Example kitchen, changed" })
        return { kind: "deal" as const, id: ids.kitchen }
      },
      sameToken: () => over(hub),
    },
    hub,
  }
}

describe("crmSourceContract over the fake HubSpot", () => {
  const fakes: FakeHubspot[] = []
  afterEach(() => {
    for (const hub of fakes.splice(0)) expect(hub.refusals).toEqual([])
  })
  for (const { name, run } of crmSourceContract(() => {
    const made = fixture()
    fakes.push(made.hub)
    return made
  }))
    it(name, run)
})

const stores: MessageStore[] = []
afterEach(async () => {
  for (const store of stores.splice(0)) await store.close()
})

describe("crmSyncContract over cli-core's store", () => {
  for (const { name, run } of crmSyncContract(async () => {
    const store = await openStore({ path: join(mkdtempSync(join(tmpdir(), "hubspot-sync-")), "store.db") })
    stores.push(store)
    return { store, account: { provider: "hubspot", account: "4000001" } }
  }))
    it(name, run)
})

/**
 * The contract's company case expects the company to keep an e-mail, which a HubSpot company has no property for: it
 * runs over deals and contacts, and src/crm/writer.test.ts drives the company writes.
 */
describe("crmWriteContract over the fake HubSpot", () => {
  const fakes: FakeHubspot[] = []
  afterEach(() => {
    for (const hub of fakes.splice(0)) expect(hub.refusals).toEqual([])
  })
  for (const { name, run } of crmWriteContract(async () => {
    const { hub } = seededHubspot()
    fakes.push(hub)
    const transport = hubspotTransport({ token: FAKE_TOKEN, fetch: hub.fetch, sleep: async () => {} })
    const source = hubspotCrmSource(() => transport)
    const writer = hubspotCrmWriter(
      () => transport,
      () => source,
    )
    const [pipeline] = await source.pipelines("deal")
    if (!pipeline) throw new Error("the fake account has no deal pipeline")
    return {
      writer: { ...writer, capabilities: { ...HUBSPOT_WRITES, kinds: ["deal", "person"] } },
      pipeline,
      aliases: ["dealstage", "pipeline", "hubspot_owner_id"],
      loseNextAnswer: hub.loseNextAnswer,
      requests: hub.writes,
    }
  }))
    it(name, run)
})
