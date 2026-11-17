import { defineReasons } from "@wirecat/cli-base/standards"
import { CORE_REASONS } from "@wirecat/cli-core"

/** cli-core's registry refuses a reason listed twice, and core adds reasons of its own over time; its entry wins. */
const CORE = new Set(CORE_REASONS.map((one) => one.reason))

/** hubspot's own reasons; the shared ones (`offline.refused`, `session.missing`) are cli-core's. */
const OWN: [reason: string, code: string, message: string][] = [
  ["session.duplicate", "conflict", "another profile here already signs in to this HubSpot account"],
  ["session.malformed", "configuration_error", "the profile's saved sign-in is not one hubspot wrote; sign in again"],
  ["account-remove.account-shared", "conflict", "another profile reads the same account, whose copy the store shares"],
  ["session.expired", "authentication_error", "HubSpot refused the key: it was revoked, expired or mistyped"],
  ["hubspot.scope-missing", "permission_error", "the HubSpot key lacks a scope this command needs"],
  ["hubspot.access-denied", "permission_error", "the HubSpot key may not read this"],
  ["hubspot.daily-limit", "rate_limited", "the HubSpot account spent its daily API allowance, shared by all its apps"],
  ["hubspot.rate-limit", "rate_limited", "HubSpot asked to slow down for a few seconds"],
  ["hubspot.too-many-filters", "validation_error", "a HubSpot search takes at most 6 conditions together"],
  ["hubspot.search-cap", "validation_error", "a HubSpot search reaches only its first 10,000 results"],
]

export const REASONS = defineReasons(
  OWN.filter(([reason]) => !CORE.has(reason)).map(([reason, code, message]) => ({
    reason,
    code,
    message,
    details: [],
  })),
)

/** Detail keys hubspot's errors carry beyond cli-core's own. */
export const DETAILS = ["account", "profile", "profiles", "status", "scope"]
