import { isCliError } from "@wirecat/cli-base"
import type { CrmActivity, CrmActivityKind, CrmKind } from "@wirecat/cli-core"
import { type CrmCallContext, type CrmPage, crmValues } from "@wirecat/cli-core/crm"
import type { HubSpotTransport } from "../hubspot/transport.js"
import { associationsOf } from "./associations.js"
import { msOf, propertiesOf, type Raw } from "./records.js"
import { modifiedSince, nextSpot, SEARCH_PAGE, type Spot, search } from "./search.js"

const { id, text } = crmValues

const OVERLAP_MS = 10 * 60_000

interface Engagement {
  /** The object API's path and the associations API's name (engagements guides). */
  type: string
  kind: CrmActivityKind
  scope: string
  /**
   * Asked by name, so a call's numbers and an e-mail's addresses and headers never come back: they would bypass the
   * limits on reading clients' contacts (CrmActivity).
   */
  properties: readonly string[]
  subject: (properties: Raw) => string | null
  body: (properties: Raw) => string | null
  dueAt: (properties: Raw) => number | null
  done: (properties: Raw) => boolean
}

const COMMON = ["hubspot_owner_id", "hs_timestamp", "hs_createdate", "hs_lastmodifieddate"]

/** HTML as plain text: notes, meetings and tasks keep rich text. */
const plain = (value: unknown): string | null => {
  const html = text(value)
  if (html === null) return null
  return text(
    html
      .replace(/<br\s*\/?>|<\/p>|<\/div>|<\/li>/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&"),
  )
}

const ENGAGEMENTS: readonly Engagement[] = [
  {
    type: "notes",
    kind: "comment",
    scope: "crm.objects.notes.read",
    properties: ["hs_note_body", ...COMMON],
    subject: () => "",
    body: (properties) => plain(properties.hs_note_body),
    dueAt: () => null,
    done: () => true,
  },
  {
    type: "calls",
    kind: "call",
    scope: "crm.objects.calls.read",
    properties: ["hs_call_title", "hs_call_direction", "hs_call_status", ...COMMON],
    subject: (properties) =>
      text(properties.hs_call_title) ??
      (text(properties.hs_call_direction) === "INBOUND" ? "incoming call" : "outgoing call"),
    body: () => null,
    dueAt: () => null,
    done: (properties) =>
      !["SCHEDULED", "QUEUED", "RINGING", "IN_PROGRESS"].includes(text(properties.hs_call_status) ?? ""),
  },
  {
    type: "emails",
    kind: "email",
    scope: "crm.objects.emails.read",
    properties: ["hs_email_subject", "hs_email_text", "hs_email_direction", "hs_email_status", ...COMMON],
    subject: (properties) => text(properties.hs_email_subject),
    body: (properties) => text(properties.hs_email_text),
    dueAt: () => null,
    done: (properties) => !["SCHEDULED", "SENDING"].includes(text(properties.hs_email_status) ?? ""),
  },
  {
    type: "meetings",
    kind: "meeting",
    scope: "crm.objects.meetings.read",
    properties: ["hs_meeting_title", "hs_meeting_body", "hs_meeting_start_time", "hs_meeting_outcome", ...COMMON],
    subject: (properties) => text(properties.hs_meeting_title),
    body: (properties) => plain(properties.hs_meeting_body),
    dueAt: (properties) => msOf(properties.hs_meeting_start_time),
    done: (properties) => text(properties.hs_meeting_outcome) === "COMPLETED",
  },
  {
    type: "tasks",
    kind: "task",
    scope: "crm.objects.tasks.read",
    properties: ["hs_task_subject", "hs_task_body", "hs_task_status", ...COMMON],
    subject: (properties) => text(properties.hs_task_subject),
    body: (properties) => plain(properties.hs_task_body),
    dueAt: (properties) => msOf(properties.hs_timestamp),
    done: (properties) => text(properties.hs_task_status) === "COMPLETED",
  },
]

/** What an engagement is on, by the associations API's names; a list the token may not read leaves its kind out. */
const ON: readonly [string, CrmKind][] = [
  ["deals", "deal"],
  ["leads", "lead"],
  ["contacts", "person"],
  ["companies", "organization"],
]

const toActivity = (engagement: Engagement, raw: Raw, on: CrmActivity["on"]): CrmActivity | null => {
  const externalId = id(raw.id)
  const properties = propertiesOf(raw)
  const updatedAt = msOf(properties.hs_lastmodifieddate) ?? msOf(raw.updatedAt)
  if (!externalId || updatedAt === null) return null
  return {
    // One id space for every kind: a note and a call may share a number.
    externalId: `${engagement.type}:${externalId}`,
    kind: engagement.kind,
    subject: engagement.subject(properties) ?? "",
    body: engagement.body(properties),
    dueAt: engagement.dueAt(properties),
    done: engagement.done(properties),
    assignee: id(properties.hubspot_owner_id),
    createdAt: msOf(properties.hs_createdate) ?? msOf(raw.createdAt) ?? updatedAt,
    updatedAt,
    on,
  }
}

/** `<engagement index>.<from>.<offset>@<round start>`, keyset by modified time as the record changes are. */
const pageOf = (page: string | undefined, since: number, now: number) => {
  const found = /^(\d+)\.(-?\d+)\.(\d+)@(\d+)$/.exec(page ?? "")
  if (!found) return { at: 0, spot: { from: since - OVERLAP_MS, offset: 0 }, started: now }
  return {
    at: Number(found[1]),
    spot: { from: Number(found[2]), offset: Number(found[3]) },
    started: Number(found[4]),
  }
}

/**
 * One page of one engagement type changed since `since`, the types one after another: notes, calls, e-mails,
 * meetings, tasks. A type the token's scopes refuse is a gap naming the scope, and the next type is read.
 */
export const readActivities = async (
  caller: HubSpotTransport,
  since: number,
  page: string | undefined,
  context: CrmCallContext | undefined,
  now: () => number,
): Promise<CrmPage<CrmActivity>> => {
  const { at, spot, started } = pageOf(page, since, now())
  const engagement = ENGAGEMENTS[at]
  const last = { hasMore: false as const, cursor: String(started) }
  if (!engagement) return { items: [], ...last }
  const following = (items: CrmActivity[], next?: Spot): CrmPage<CrmActivity> => {
    if (next) return { items, hasMore: true, nextCursor: `${at}.${next.from}.${next.offset}@${started}` }
    if (at + 1 >= ENGAGEMENTS.length) return { items, ...last }
    return { items, hasMore: true, nextCursor: `${at + 1}.${since - OVERLAP_MS}.0@${started}` }
  }
  let rows: Raw[]
  let more: boolean
  try {
    ;({ rows, more } = await search(
      caller.post,
      engagement.type,
      modifiedSince("hs_lastmodifieddate", spot, SEARCH_PAGE, engagement.properties),
    ))
  } catch (error) {
    if (!isCliError(error) || error.code !== "permission_error") throw error
    context?.gap({
      kind: "activities",
      scope: engagement.scope,
      message: `HubSpot refused the ${engagement.type} (${engagement.scope} scope missing); the other activities are read`,
    })
    return following([])
  }
  const ids = rows.flatMap((raw) => id(raw.id) ?? [])
  const on = new Map<string, CrmActivity["on"]>()
  for (const [to, kind] of ON) {
    let found: Map<string, string[]>
    try {
      found = await associationsOf(caller.post, engagement.type, to, ids)
    } catch (error) {
      if (isCliError(error) && error.code === "permission_error") continue
      throw error
    }
    for (const [owner, linked] of found)
      on.set(owner, [...(on.get(owner) ?? []), ...linked.map((externalId) => ({ kind, externalId }))])
  }
  const items = rows.flatMap((raw) => toActivity(engagement, raw, on.get(String(raw.id)) ?? []) ?? [])
  if (!more) return following(items)
  const next = nextSpot(spot, rows, "hs_lastmodifieddate", SEARCH_PAGE)
  if (next === null) {
    context?.gap({
      kind: "activities",
      message: `more than 10000 ${engagement.type} changed at one moment; HubSpot's search reads no further`,
    })
    return following(items)
  }
  return following(items, next)
}
