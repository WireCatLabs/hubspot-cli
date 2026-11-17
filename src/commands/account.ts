import { readFileSync } from "node:fs"
import { join } from "node:path"
import { CliError, type KeyringStore, resolvePaths } from "@wirecat/cli-base"
import { annotate } from "@wirecat/cli-base/commands"
import {
  type AccountRemoval,
  accountFileFor,
  accountRemoveCommand,
  LOCAL_READ,
  LOCAL_WRITE,
  profilesHere,
} from "@wirecat/cli-core/cli"
import type { AccountKey } from "@wirecat/cli-core/store"
import { Command } from "commander"
import { configuration } from "../config.js"
import { contextOf } from "../context.js"
import { IDENTITY } from "../identity.js"
import { PROVIDER } from "../store.js"
import { signedInTo } from "./session.js"

/** The portal id `session start` remembered: it outlives `session end`, so a copy can still be found. */
const rememberedOf = (env: NodeJS.ProcessEnv, profile: string) => {
  try {
    const { account } = JSON.parse(readFileSync(accountFileFor(IDENTITY, profile, env), "utf8"))
    return typeof account === "string" && /^\d+$/.test(account) ? account : undefined
  } catch {
    return undefined
  }
}

const portalOf = (env: NodeJS.ProcessEnv, keyring: KeyringStore | undefined, profile: string) => {
  try {
    return signedInTo(env, keyring, profile) ?? rememberedOf(env, profile)
  } catch {
    return rememberedOf(env, profile)
  }
}

const removal: AccountRemoval = {
  // HubSpot has no call that revokes a service key or a private app token; the account's settings do.
  signOut: async (profile) => ({
    revoked: null,
    removed: [`the sign-in of ${profile} (the key stays valid in HubSpot until you delete or rotate it there)`],
  }),
  account: (profile, { env, keyring }): AccountKey | undefined => {
    const portal = portalOf(env, keyring, profile)
    return portal ? { provider: PROVIDER.name, account: portal } : undefined
  },
  secrets: (profile, { env, keyring }) => [
    {
      credentials: {
        configDir: resolvePaths({ appName: IDENTITY.appName, prefix: IDENTITY.envPrefix, env }).config,
        service: IDENTITY.appName,
        envVar: `${IDENTITY.envPrefix}_TOKEN`,
        env,
        ...(keyring ? { keyring } : {}),
      },
      accounts: [`token:${profile}`],
    },
  ],
  stateFiles: (profile, { env }) => [
    join(resolvePaths({ appName: IDENTITY.appName, prefix: IDENTITY.envPrefix, env }).state, "crm", profile),
  ],
}

/**
 * The store keeps one copy per account, so deleting one profile's data deletes every profile's on that account. A
 * second sign-in to it is refused, but a profile that ended its session still remembers its account.
 */
const refuseSharedDelete = (command: Command) => {
  if (command.opts().deleteData !== true) return
  const { env, keyring, profile, renderer } = contextOf(command)
  const own = portalOf(env, keyring, profile)
  if (!own) return
  // biome-ignore lint/plugin/no-own-settings: this check reads every profile, and baseContext names one
  const { configuredProfiles } = configuration.resolveSettings({}, { env, needsProfile: false })
  const sharing = profilesHere(IDENTITY, configuredProfiles, env).filter(
    (one) => one !== profile && portalOf(env, keyring, one) === own,
  )
  if (sharing.length === 0) return
  const names = sharing.join(", ")
  // A dry run lists what --delete-data would delete, and says the real run refuses.
  if (command.opts().dryRun === true) {
    renderer.warn(`without --dry-run this refuses: ${names} also read${sharing.length === 1 ? "s" : ""} ${own}`)
    return
  }
  throw new CliError(
    "conflict",
    `${names} also read${sharing.length === 1 ? "s" : ""} account ${own}, and the store keeps one copy of an ` +
      `account: --delete-data would delete their deals, contacts and companies too. Use --keep-data, or remove ` +
      `${names} first`,
    { reason: "account-remove.account-shared", profiles: sharing, account: own },
  )
}

export const accountCommand = (): Command =>
  annotate(new Command("account"), { effects: LOCAL_READ })
    .description("this profile on this computer")
    .addCommand(
      annotate(accountRemoveCommand(IDENTITY, removal, { resolveSettings: configuration.resolveSettings }), {
        effects: LOCAL_WRITE,
      }).hook("preAction", (_, action) => refuseSharedDelete(action)),
    )
