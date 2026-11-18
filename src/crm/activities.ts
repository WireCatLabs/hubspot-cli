import { isCliError } from "@wirecat/cli-base"
import type { CrmActivity, CrmActivityKind, CrmKind } from "@wirecat/cli-core"
import { type CrmCallContext, type CrmPage, crmValues } from "@wirecat/cli-core/crm"
import { htmlToText } from "@wirecat/cli-core/mail"
import type { HubSpotTransport } from "../hubspot/transport.js"
import { associationsOf } from "./associations.js"
import { msOf, nextOf, OVERLAP_MS, propertiesOf, type Raw, resultsOf } from "./records.js"
import { modifiedSince, nextSpot, SEARCH_PAGE, search } from "./search.js"

const { id, text } = crmValues

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

/**
 * A call not over yet, of the `hs_call_status` values BUSY, CALLING_CRM_USER, CANCELED, COMPLETED, CONNECTING, FAILED,
 * IN_PROGRESS, NO_ANSWER, QUEUED and RINGING (https://developers.hubspot.com/docs/api-reference/latest/crm/activities/calls/guide).
 */
export const CALL_OPEN = ["CALLING_CRM_USER", "CONNECTING", "IN_PROGRESS", "QUEUED", "RINGING"]
/**
 * An e-mail not sent yet, of BOUNCED, FAILED, SCHEDULED, SENDING and SENT
 * (https://developers.hubspot.com/docs/api-reference/latest/crm/activities/emails/guide).
 */
const EMAIL_OPEN = ["SCHEDULED", "SENDING"]

const COMMON = ["hubspot_owner_id", "hs_timestamp", "hs_createdate", "hs_lastmodifieddate"]

/** HTML as plain text: notes, meetings and tasks keep rich text. */
const plain = (value: unknown): string | null => {
  const html = text(value)
  return html === null ? null : text(htmlToText(html))
}

// HubSpot has no notes, calls, meetings or tasks scope; a key with the contacts scope reads them (account 149800303,
// 2026-11-17). Emails ask for sales-email-read.
const CONTACTS_SCOPE = "crm.objects.contacts.read"

const ENGAGEMENTS: readonly Engagement[] = [
  {
    type: "notes",
    kind: "comment",
    scope: CONTACTS_SCOPE,
    properties: ["hs_note_body", ...COMMON],
    subject: () => "",
    body: (properties) => plain(properties.hs_note_body),
    dueAt: () => null,
    done: () => true,
  },
  {
    type: "calls",
    kind: "call",
    scope: CONTACTS_SCOPE,
    properties: ["hs_call_title", "hs_call_direction", "hs_call_status", ...COMMON],
    subject: (properties) =>
      text(properties.hs_call_title) ??
      (text(properties.hs_call_direction) === "INBOUND" ? "incoming call" : "outgoing call"),
    body: () => null,
    dueAt: () => null,
    done: (properties) => !CALL_OPEN.includes(text(properties.hs_call_status) ?? ""),
  },
  {
    type: "emails",
    kind: "email",
    scope: "sales-email-read",
    properties: ["hs_email_subject", "hs_email_text", "hs_email_direction", "hs_email_status", ...COMMON],
    subject: (properties) => text(properties.hs_email_subject),
    body: (properties) => text(properties.hs_email_text),
    dueAt: () => null,
    done: (properties) => !EMAIL_OPEN.includes(text(properties.hs_email_status) ?? ""),
  },
  {
    type: "meetings",
    kind: "meeting",
    scope: CONTACTS_SCOPE,
    properties: ["hs_meeting_title", "hs_meeting_body", "hs_meeting_start_time", "hs_meeting_outcome", ...COMMON],
    subject: (properties) => text(properties.hs_meeting_title),
    body: (properties) => plain(properties.hs_meeting_body),
    dueAt: (properties) => msOf(properties.hs_meeting_start_time),
    // "scheduled, completed, rescheduled, no show, and canceled", in prose and lower case
    // (https://developers.hubspot.com/docs/api-reference/latest/crm/activities/meetings/guide).
    done: (properties) => text(properties.hs_meeting_outcome)?.toUpperCase() === "COMPLETED",
  },
  {
    type: "tasks",
    kind: "task",
    scope: CONTACTS_SCOPE,
    properties: ["hs_task_subject", "hs_task_body", "hs_task_status", ...COMMON],
    subject: (properties) => text(properties.hs_task_subject),
    body: (properties) => plain(properties.hs_task_body),
    dueAt: (properties) => msOf(properties.hs_timestamp),
    // COMPLETED or NOT_STARTED (https://developers.hubspot.com/docs/api-reference/latest/crm/activities/tasks/guide).
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

/**
 * `<engagement index>.<from>.<offset>@<round start>` reads by search, keyset by modified time as the record changes
 * are; `<engagement index>.<from>.L<after>@<round start>` lists the type in full, for a moment past the search cap.
 * HubSpot's `after` is opaque, so the round's start is read after the last `@`.
 */
const pageOf = (page: string | undefined, since: number, now: number) => {
  const fresh = { at: 0, spot: { from: since - OVERLAP_MS, offset: 0 }, after: undefined, started: now }
  const cut = (page ?? "").lastIndexOf("@")
  const started = Number(page?.slice(cut + 1))
  const found = /^(\d+)\.(-?\d+)\.(?:(\d+)|L(.*))$/s.exec(page?.slice(0, cut) ?? "")
  if (cut < 0 || !found || !Number.isSafeInteger(started)) return fresh
  return {
    at: Number(found[1]),
    spot: { from: Number(found[2]), offset: Number(found[3] ?? 0) },
    after: found[4] === undefined ? undefined : found[4] || "",
    started,
  }
}

export interface ActivityPages {
  /** Rows a search asks per page (search guide: 200 at most). */
  search: number
  /** Rows a list asks per page (100 at most). */
  list: number
}

/**
 * One page of one engagement type changed since `since`, the types one after another: notes, calls, e-mails,
 * meetings, tasks. A type the token's scopes refuse is a gap naming the scope, and the next type is read.
 *
 * More than the search cap changed at one moment (an import): the type is then listed in full, newest change or not,
 * and only rows changed since the window's start are kept. Not a stop: cli-core resumes a failed activity round
 * from the page it saved, which would hit the same cap on every run.
 */
export const readActivities = async (
  caller: HubSpotTransport,
  since: number,
  page: string | undefined,
  context: CrmCallContext | undefined,
  now: () => number,
  sizes: ActivityPages = { search: SEARCH_PAGE, list: 100 },
): Promise<CrmPage<CrmActivity>> => {
  const { at, spot, after, started } = pageOf(page, since, now())
  const engagement = ENGAGEMENTS[at]
  const last = { hasMore: false as const, cursor: String(started) }
  if (!engagement) return { items: [], ...last }
  const following = (items: CrmActivity[], next?: string): CrmPage<CrmActivity> => {
    if (next) return { items, hasMore: true, nextCursor: `${at}.${next}@${started}` }
    if (at + 1 >= ENGAGEMENTS.length) return { items, ...last }
    return { items, hasMore: true, nextCursor: `${at + 1}.${since - OVERLAP_MS}.0@${started}` }
  }
  let rows: Raw[]
  let more: boolean
  let listedNext: string | null = null
  try {
    if (after === undefined)
      ({ rows, more } = await search(
        caller.post,
        engagement.type,
        modifiedSince("hs_lastmodifieddate", spot, sizes.search, engagement.properties),
      ))
    else {
      const body = await caller.get(`/crm/objects/2026-03/${engagement.type}`, {
        limit: sizes.list,
        properties: engagement.properties.join(","),
        archived: false,
        ...(after ? { after } : {}),
      })
      listedNext = nextOf(body)
      more = listedNext !== null
      rows = resultsOf(body).filter((raw) => {
        const changed = msOf(propertiesOf(raw).hs_lastmodifieddate) ?? msOf(raw.updatedAt)
        return changed === null || changed >= spot.from
      })
    }
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
    let found: Awaited<ReturnType<typeof associationsOf>>
    try {
      found = await associationsOf(caller.post, engagement.type, to, ids)
    } catch (error) {
      if (isCliError(error) && error.code === "permission_error") continue
      throw error
    }
    for (const [owner, linked] of found)
      on.set(owner, [...(on.get(owner) ?? []), ...linked.map((one) => ({ kind, externalId: one.id }))])
  }
  const items = rows.flatMap((raw) => toActivity(engagement, raw, on.get(String(raw.id)) ?? []) ?? [])
  if (!more) return following(items)
  if (after !== undefined) return following(items, `${spot.from}.L${listedNext}`)
  const next = nextSpot(spot, rows, "hs_lastmodifieddate", sizes.search)
  return following(items, next ? `${next.from}.${next.offset}` : `${spot.from}.L`)
}
