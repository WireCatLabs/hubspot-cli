import type { KeyringStore } from "@wirecat/cli-base"
import { ProfileTokenStore, recalledAccount } from "@wirecat/cli-core/cli"
import type { CrmAccountOptions } from "@wirecat/cli-core/crm/cli"
import { configuration } from "../config.js"
import { decodeSignIn } from "../context.js"
import { IDENTITY } from "../identity.js"
import { PROVIDER } from "../store.js"

/** The portal id `session start` remembered: it outlives `session end`, so a copy can still be found. */
const rememberedOf = (profile: string, env: NodeJS.ProcessEnv) => {
  const account = recalledAccount(IDENTITY, PROVIDER.name, profile, env)?.account
  return account !== undefined && /^\d+$/.test(account) ? account : undefined
}

/** The account a profile's saved sign-in reaches; one from `WCHUBSPOT_TOKEN` is no profile's. */
const signedInTo = (profile: string, env: NodeJS.ProcessEnv, keyring: KeyringStore | undefined) => {
  const saved = new ProfileTokenStore({ app: IDENTITY, env, ...(keyring ? { keyring } : {}), warn: () => {} }).read(
    profile,
  )
  if (!saved || saved.source === "environment") return undefined
  return decodeSignIn(saved.secret).portalId
}

/** The store names a HubSpot account by its portal id; a key names no user, so the account alone decides. */
export const HUBSPOT_ACCOUNT: CrmAccountOptions = {
  provider: PROVIDER.name,
  service: "HubSpot",
  held: (profile, { env, keyring }) => {
    const remembered = rememberedOf(profile, env)
    try {
      const saved = signedInTo(profile, env, keyring)
      if (saved) return { account: saved, signedIn: true }
    } catch (error) {
      // Nothing else tells which account's copy --delete-data would delete.
      if (!remembered) throw error
    }
    return remembered === undefined ? undefined : { account: remembered, signedIn: false }
  },
  // HubSpot has no call that revokes a service key or a private app token; the account's settings do.
  signedOut: (profile) =>
    `the sign-in of ${profile} (the key stays valid in HubSpot until you delete or rotate it there)`,
  resolveSettings: configuration.resolveSettings,
}
