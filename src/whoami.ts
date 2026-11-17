import { accountDetails } from "./hubspot/account.js"
import type { HubSpotTransport } from "./hubspot/transport.js"

export interface AccountAnswer {
  /** The portal id, as every session answer names it: cli-core's word for the place a sign-in belongs to. */
  account: string
  account_info: { id: string; ui_domain: string; time_zone: string; type: string }
}

/**
 * Whose key it is. A service key or a private app token belongs to an account, not a user, so the answer names the
 * account only (HubSpot's "Get account details").
 */
export const accountAnswer = async (hub: HubSpotTransport): Promise<AccountAnswer> => {
  const details = await accountDetails(hub)
  const id = String(details.portalId)
  return {
    account: id,
    account_info: { id, ui_domain: details.uiDomain, time_zone: details.timeZone, type: details.accountType },
  }
}
