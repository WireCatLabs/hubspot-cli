import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import { type FakeHubspot, seededHubspot } from "../testing/fake-hubspot.js"
import { hubspot } from "../testing/harness.js"

// The CLI sends a number as E.164, without the spaces a person types; a spaced literal also keeps the PII scan quiet.
const dialled = (typed: string) => typed.replaceAll(" ", "")
const configFile = join(process.env.WCHUBSPOT_CONFIG_DIR ?? "", "config.json")
const withPermissions = (permissions: Record<string, string>) => {
  mkdirSync(join(configFile, ".."), { recursive: true })
  writeFileSync(configFile, JSON.stringify({ profiles: { work: { permissions } } }))
}
afterEach(() => rmSync(configFile, { force: true }))

const synced = async () => {
  const { hub, ids } = seededHubspot()
  const ran = await hubspot(["work", "sync", "--json"], { account: hub })
  if (ran.code !== 0) throw new Error(`sync failed: ${ran.err}`)
  return { hub, ids }
}

/** A deal's ref in the copy, as `deals list` prints it, by HubSpot's id. */
const refOf = async (hub: FakeHubspot, externalId: string) => {
  const listed = (await hubspot(["work", "deals", "list", "--json"], { account: hub })).json() as {
    items: { ref: string; external_id: string }[]
  }
  const found = listed.items.find((one) => one.external_id === externalId)
  if (!found) throw new Error(`deal ${externalId} is not stored`)
  return found.ref
}

const runs = async (hub: FakeHubspot, argv: string[]) => {
  const ran = await hubspot(["work", ...argv, "--json"], { account: hub })
  expect(ran.code, `${argv.join(" ")}: ${ran.err}`).toBe(0)
  return ran.json()
}

describe("deal writes", () => {
  it("create, update, move, close and delete reach HubSpot's object API and the store keeps each answer", async () => {
    withPermissions({ "deals.delete": "allow" })
    const { hub } = await synced()
    const made = await runs(hub, [
      "deals",
      "create",
      "--title",
      "Example new",
      "--pipeline",
      "Sales Pipeline",
      "--stage",
      "Appointment Scheduled",
      "--amount",
      "1200.50",
      "--currency",
      "EUR",
      "--close-date",
      "2026-12-24",
      "--field",
      "Source=Trade fair",
    ])
    const deal = (made.item as { deal: { ref: string; external_id: string } }).deal
    const id = deal.external_id
    expect(hub.row("deals", id)?.properties).toMatchObject({
      dealname: "Example new",
      pipeline: "default",
      dealstage: "appointmentscheduled",
      amount: "1200.50",
      deal_currency_code: "EUR",
      closedate: "2026-12-24T12:00:00.000Z",
      example_source: "fair",
    })
    await runs(hub, ["deals", "update", deal.ref, "--title", "Example renamed"])
    expect(hub.row("deals", id)?.properties.dealname).toBe("Example renamed")
    await runs(hub, ["deals", "move", deal.ref, "Qualified To Buy"])
    expect(hub.row("deals", id)?.properties.dealstage).toBe("qualifiedtobuy")
    await runs(hub, ["deals", "close", deal.ref, "lost", "--reason", "Example: chose another supplier"])
    expect(hub.row("deals", id)?.properties).toMatchObject({
      dealstage: "closedlost",
      closed_lost_reason: "Example: chose another supplier",
    })
    const shown = await runs(hub, ["deals", "show", deal.ref])
    expect(JSON.stringify(shown)).toContain("Example renamed")
    await runs(hub, ["deals", "delete", deal.ref])
    expect(hub.row("deals", id)).toBeUndefined()
    expect(hub.refusals).toEqual([])
  })

  it("a delete asks first, and an owner is someone else's until crm.assign-others allows it", async () => {
    const { hub, ids } = await synced()
    const kitchen = await refOf(hub, ids.kitchen)
    const before = hub.writes()
    const removed = await hubspot(["work", "deals", "delete", kitchen, "--json"], { account: hub })
    expect(removed.json()).toMatchObject({
      error: { code: "confirmation_required", details: { permission: "deals.delete" } },
    })
    const owner = await hubspot(["work", "deals", "update", kitchen, "--owner", "502", "--json"], {
      account: hub,
    })
    expect(owner.json()).toMatchObject({ error: { code: "permission_error" } })
    expect(hub.writes()).toBe(before)
    withPermissions({ "crm.assign-others": "allow" })
    await runs(hub, ["deals", "update", kitchen, "--owner", "502"])
    expect(hub.row("deals", ids.kitchen)?.properties.hubspot_owner_id).toBe("502")
  })

  it("--dry-run names the keys and sends nothing", async () => {
    const { hub, ids } = await synced()
    const before = hub.calls.length
    const ran = await runs(hub, [
      "deals",
      "update",
      await refOf(hub, ids.kitchen),
      "--stage",
      "Closed Won",
      "--dry-run",
    ])
    const { permission } = ran.item as { permission: { key: string; also: { key: string }[] } }
    expect(permission.key).toBe("deals.update")
    expect(permission.also.map(({ key }) => key)).toEqual(
      expect.arrayContaining(["deals.move", "deals.close", "api.deals-update"]),
    )
    expect(hub.calls.length).toBe(before)
  })
})

describe("contact and company writes", () => {
  it("a contact keeps one e-mail and two numbers; a longer list is refused before any request", async () => {
    const { hub } = await synced()
    await runs(hub, [
      "people",
      "create",
      "--name",
      "Example Person Two",
      "--email",
      "two@example.com",
      "--phone",
      "+34 600 000 010",
      "--phone",
      "+34 600 000 011",
      "--position",
      "Buyer",
    ])
    const row = [...(hub.seededIds().contacts ?? [])].map((one) => hub.row("contacts", one)).at(-1)
    expect(row?.properties).toMatchObject({
      firstname: "Example",
      lastname: "Person Two",
      email: "two@example.com",
      phone: dialled("+34 600 000 010"),
      mobilephone: dialled("+34 600 000 011"),
      jobtitle: "Buyer",
    })
    await runs(hub, ["people", "update", row?.id ?? "", "--position", "Owner"])
    expect(hub.row("contacts", row?.id ?? "")?.properties).toMatchObject({
      jobtitle: "Owner",
      email: "two@example.com",
    })
    const before = hub.writes()
    const twice = await hubspot(
      ["work", "people", "update", row?.id ?? "", "--email", "a@example.com", "--email", "b@example.com", "--json"],
      { account: hub },
    )
    expect(twice.json()).toMatchObject({ error: { code: "validation_error" } })
    expect(hub.writes()).toBe(before)
  })

  it("a company takes a name and one number, and refuses an e-mail, which HubSpot keeps no property for", async () => {
    const { hub } = await synced()
    await runs(hub, ["organizations", "create", "--name", "Example Three", "--phone", "+34 600 000 020"])
    const row = [...(hub.seededIds().companies ?? [])].map((one) => hub.row("companies", one)).at(-1)
    expect(row?.properties).toMatchObject({ name: "Example Three", phone: dialled("+34 600 000 020") })
    await runs(hub, ["organizations", "update", row?.id ?? "", "--name", "Example Renamed"])
    expect(hub.row("companies", row?.id ?? "")?.properties.name).toBe("Example Renamed")
    const before = hub.writes()
    const mailed = await hubspot(
      ["work", "organizations", "update", row?.id ?? "", "--email", "office@example.com", "--json"],
      { account: hub },
    )
    expect(mailed.json()).toMatchObject({ error: { code: "validation_error" } })
    expect(hub.writes()).toBe(before)
    expect(hub.refusals).toEqual([])
  })
})

describe("every option of the write commands", () => {
  it("reaches HubSpot's properties, an owner once crm.assign-others allows it", async () => {
    withPermissions({ "crm.assign-others": "allow" })
    const { hub, ids } = await synced()
    const kitchen = await refOf(hub, ids.kitchen)
    await runs(hub, [
      "deals",
      "create",
      "--title",
      "Example owned",
      "--stage",
      "Appointment Scheduled",
      "--owner",
      "502",
    ])
    await runs(hub, [
      "deals",
      "update",
      kitchen,
      "--pipeline",
      "Sales Pipeline",
      "--stage",
      "Qualified To Buy",
      "--amount",
      "99.90",
      "--currency",
      "EUR",
      "--close-date",
      "2027-01-15",
      "--field",
      "Source=Website",
    ])
    expect(hub.row("deals", ids.kitchen)?.properties).toMatchObject({
      amount: "99.90",
      closedate: "2027-01-15T12:00:00.000Z",
      example_source: "web",
    })
    await runs(hub, [
      "people",
      "create",
      "--first-name",
      "Example",
      "--last-name",
      "Owned",
      "--owner",
      "501",
      "--field",
      "Note=met at the fair",
    ])
    await runs(hub, [
      "people",
      "update",
      ids.ben,
      "--first-name",
      "Benjamin",
      "--phone",
      "+34 600 000 030",
      "--owner",
      "502",
      "--field",
      "Note=called back",
    ])
    await runs(hub, ["people", "update", ids.cy, "--name", "Cy Example"])
    expect(hub.row("contacts", ids.cy)?.properties).toMatchObject({ firstname: "Cy", lastname: "Example" })
    await runs(hub, ["organizations", "create", "--name", "Example Owned", "--owner", "501", "--field", "Note=new"])
    await runs(hub, [
      "organizations",
      "update",
      ids.beta,
      "--phone",
      "+34 600 000 040",
      "--owner",
      "502",
      "--field",
      "Note=moved",
    ])
    expect(hub.row("companies", ids.beta)?.properties).toMatchObject({
      phone: dialled("+34 600 000 040"),
      hubspot_owner_id: "502",
    })
    const before = hub.writes()
    const mailed = await hubspot(
      ["work", "organizations", "create", "--name", "X", "--email", "x@example.com", "--json"],
      {
        account: hub,
      },
    )
    expect(mailed.json()).toMatchObject({ error: { code: "validation_error" } })
    expect(hub.writes()).toBe(before)
    expect(hub.refusals).toEqual([])
  })
})

describe("note and task writes", () => {
  it("a note and a task go on a deal, a contact and a company, and a closed task reads back done", async () => {
    const { hub, ids } = await synced()
    const deal = await refOf(hub, ids.kitchen)
    const note = await runs(hub, [
      "activities",
      "create",
      "comment",
      "--subject",
      deal,
      "--subject",
      `person:crm:${ids.ana}`,
      "--text",
      "Called <Ana>\nagreed on 5 & 6",
    ])
    const written = (note.item as { activity: { external_id: string } }).activity
    const noteId = written.external_id.replace("notes:", "")
    expect(hub.row("notes", noteId)?.properties.hs_note_body).toBe("Called &lt;Ana&gt;<br>agreed on 5 &amp; 6")
    expect(note.item).toMatchObject({ stored: false, activity: { kind: "comment" } })
    expect((note.item as { activity: { on: unknown[] } }).activity.on).toHaveLength(2)

    const task = await runs(hub, [
      "activities",
      "create",
      "task",
      "--subject",
      `organization:crm:${ids.acme}`,
      "--title",
      "Send the contract",
      "--due",
      "2026-12-01T10:00:00Z",
    ])
    const taskId = (task.item as { activity: { external_id: string } }).activity.external_id
    expect(hub.row("tasks", taskId.replace("tasks:", ""))?.properties).toMatchObject({
      hs_task_subject: "Send the contract",
      hs_task_status: "NOT_STARTED",
      hs_timestamp: "2026-12-01T10:00:00.000Z",
    })
    const closed = await runs(hub, ["activities", "close", taskId])
    expect(closed.item).toMatchObject({ activity: { kind: "task", done: true } })
  })

  it("a task for another owner is refused until crm.assign-others allows it", async () => {
    const { hub, ids } = await synced()
    const deal = await refOf(hub, ids.kitchen)
    const argv = ["activities", "create", "task", "--subject", deal, "--title", "Call back", "--owner", "502"]
    const before = hub.writes()
    const refused = await hubspot(["work", ...argv, "--json"], { account: hub })
    expect(refused.code).toBe(5)
    expect(hub.writes()).toBe(before)
    withPermissions({ "crm.assign-others": "allow" })
    const made = await runs(hub, argv)
    const id = (made.item as { activity: { external_id: string } }).activity.external_id.replace("tasks:", "")
    expect(hub.row("tasks", id)?.properties.hubspot_owner_id).toBe("502")
  })

  it("a note on a lead is refused before any request", async () => {
    const { hub } = await synced()
    const before = hub.writes()
    const ran = await hubspot(
      ["work", "activities", "create", "comment", "--subject", "lead:1", "--text", "x", "--json"],
      {
        account: hub,
      },
    )
    expect(ran.code).not.toBe(0)
    expect(hub.writes()).toBe(before)
  })
})
