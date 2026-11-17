import { CliError } from "@wirecat/cli-base"
import * as v from "valibot"
import { type HubSpotTransport, SERVICE } from "./transport.js"

/** The account, not a user: a service key has no user of its own (account-information/get-account-details). */
const DETAILS = v.object({
  portalId: v.pipe(v.number(), v.integer(), v.minValue(1)),
  uiDomain: v.pipe(v.string(), v.regex(/^[a-z0-9.-]{1,253}$/i)),
  timeZone: v.pipe(v.string(), v.maxLength(64)),
  accountType: v.pipe(v.string(), v.maxLength(64)),
  utcOffsetMilliseconds: v.optional(v.number()),
  companyCurrency: v.optional(v.string()),
})

export interface AccountDetails {
  portalId: number
  uiDomain: string
  timeZone: string
  accountType: string
  /** What the daily API limit's midnight is counted in (`TransportOptions.utcOffsetMs`). */
  utcOffsetMs?: number
  /** A deal's currency when it names none: `deal_currency_code` is empty on a one-currency account. */
  companyCurrency?: string
}

/** `GET /account-info/2026-03/details`: what `session start` checks a token with and keeps as the account. */
export const accountDetails = async (hub: HubSpotTransport): Promise<AccountDetails> => {
  const parsed = v.safeParse(DETAILS, await hub.get("/account-info/2026-03/details"))
  if (!parsed.success)
    throw new CliError("invalid_response", `${SERVICE}'s account details do not have the documented shape`)
  const { utcOffsetMilliseconds, companyCurrency, ...details } = parsed.output
  return {
    ...details,
    ...(utcOffsetMilliseconds === undefined ? {} : { utcOffsetMs: utcOffsetMilliseconds }),
    ...(companyCurrency && /^[A-Z]{3}$/.test(companyCurrency) ? { companyCurrency } : {}),
  }
}
