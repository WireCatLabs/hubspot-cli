import { CliError, type KeyringStore } from "@wirecat/cli-base"
import { annotate } from "@wirecat/cli-base/commands"
import { readSecret } from "@wirecat/cli-core"
import {
  commandWords,
  environmentOf,
  FETCH,
  itemOf,
  LOCAL_READ,
  LOCAL_WRITE,
  listOf,
  logsInOrOut,
  outputFor,
  ProfileTokenStore,
  profileFree,
  profilesHere,
  REMOTE_READ,
  refuseCommandName,
  refuseOffline,
  refuseUnderReadOnly,
  rememberAccount,
  renderAnswer,
  rootOf,
  secretInputOf,
  type TokenStorage,
} from "@wirecat/cli-core/cli"
import { Command } from "commander"
import { configuration } from "../config.js"
import {
  contextOf,
  decodeSignIn,
  encodeSignIn,
  type HubspotEnvironment,
  hubFor,
  storedSignIn,
  withHub,
} from "../context.js"
import { SERVICE } from "../hubspot/transport.js"
import { IDENTITY } from "../identity.js"
import { accountAnswer } from "../whoami.js"

const HUBSPOT = IDENTITY.command

const answer = (command: Command, item: unknown) => renderAnswer(command, outputFor(command), itemOf(item))

const storageOf = (raw: string): TokenStorage => {
  if (raw === "keyring" || raw === "file") return raw
  throw new CliError("validation_error", `--credential-storage takes keyring or file; got ${raw}`)
}

const tokensHere = (env: NodeJS.ProcessEnv, keyring: KeyringStore | undefined) =>
  new ProfileTokenStore({ app: IDENTITY, env, ...(keyring ? { keyring } : {}) })

/** The account a profile's saved sign-in reaches; one from `WCHUBSPOT_TOKEN` is no profile's. */
export const signedInTo = (env: NodeJS.ProcessEnv, keyring: KeyringStore | undefined, profile: string) => {
  const saved = tokensHere(env, keyring).read(profile)
  if (!saved || saved.source === "environment") return undefined
  return decodeSignIn(saved.secret).portalId
}

/**
 * A second profile on the same account would sync the same copy twice and split its permissions. A key names no user,
 * so the account alone decides.
 */
const refuseDuplicate = (env: NodeJS.ProcessEnv, keyring: KeyringStore | undefined, profile: string, at: string) => {
  // biome-ignore lint/plugin/no-own-settings: this check reads every profile, and baseContext names one
  const { configuredProfiles } = configuration.resolveSettings({}, { env, needsProfile: false })
  const other = profilesHere(IDENTITY, configuredProfiles, env).find((one) => {
    if (one === profile) return false
    try {
      return signedInTo(env, keyring, one) === at
    } catch {
      return false
    }
  })
  if (!other) return
  throw new CliError(
    "conflict",
    `profile ${other} already signs in to HubSpot account ${at}. Use \`${HUBSPOT} ${other}\`, or end it with ` +
      `\`${HUBSPOT} ${other} session end\` first`,
    { reason: "session.duplicate", profile: other, account: at },
  )
}

/**
 * A token proven against its account, and what a profile keeps for it: the token with the account beside it.
 * `setup apply` runs the same check.
 */
export const checkedToken = async (command: Command, token: string) => {
  const { env, profile, keyring, run } = contextOf(command)
  const who = await run((events) => accountAnswer(hubFor(command, { token }, events)))
  refuseDuplicate(env, keyring, profile, who.account)
  const { ui_domain: uiDomain, time_zone: timeZone } = who.account_info
  return { who, signIn: encodeSignIn({ token, portalId: who.account, uiDomain, timeZone }) }
}

const startCommand = () =>
  logsInOrOut(
    annotate(new Command("start"), {
      effects: FETCH,
      lifetime: "interactive",
      mcp: false,
      examples: [
        `${HUBSPOT} work session start`,
        `${HUBSPOT} work session start --json`,
        `${HUBSPOT} work session start --credential-storage file`,
      ],
    }),
  )
    .summary(`sign in to ${SERVICE} with a service key or a private app token`)
    .description(
      "sign this profile in: a service key (Development → Keys → Service keys) or a legacy private app's access " +
        "token is asked hidden or read from stdin, never taken as an argument, checked against the account, and " +
        "only then kept in the keyring with the account's id, or in a private file. The key reads what its scopes " +
        "allow; hubspot changes nothing in this release",
    )
    .option(
      "--credential-storage <storage>",
      "where the key is kept: keyring, which falls back to a private file by itself, or file",
      storageOf,
      "keyring" as TokenStorage,
    )
    .action(async function (this: Command, args: { credentialStorage: TokenStorage }) {
      const { env, profile, tokens } = contextOf(this)
      refuseCommandName(profile, commandWords(rootOf(this)), HUBSPOT)
      refuseOffline(this, SERVICE)
      // A secret is never an argument: it would land in shell history and in the run record (WC-SECR-5).
      const token = (await readSecret(`${SERVICE} service key or private app token: `, secretInputOf(this))).trim()
      if (!token) throw new CliError("validation_error", "no token was given")
      const { who, signIn } = await checkedToken(this, token)
      const storedIn = tokens.write(profile, signIn, args.credentialStorage)
      rememberAccount(IDENTITY, profile, who.account, env)
      answer(this, { profile, state: "saved", kind: "token", stored_in: storedIn, verified: true, ...who })
    })

const statusCommand = () =>
  annotate(new Command("status"), {
    effects: REMOTE_READ,
    examples: [`${HUBSPOT} work session status`, `${HUBSPOT} work session status --check --json`],
  })
    .summary("show where this profile's key comes from; --check names the account it reads")
    .description(
      "show which account this profile signs in to and where its key comes from: " +
        `${IDENTITY.envPrefix}_TOKEN, the keyring or a file; never the key`,
    )
    .option("--check", `ask ${SERVICE} whether the key still works and which account it reads`)
    .action(async function (this: Command, args: { check?: boolean }) {
      const { profile, tokens } = contextOf(this)
      const saved = tokens.read(profile)
      const signIn = storedSignIn(this)
      const status = {
        profile,
        state: signIn ? "saved" : "missing",
        kind: signIn ? "token" : null,
        token_from: saved?.source ?? null,
        account: signIn?.portalId ?? null,
      }
      if (!args.check || !signIn) return answer(this, { ...status, verified: false })
      answer(this, { ...status, verified: true, ...(await withHub(this, accountAnswer)) })
    })

const endCommand = () =>
  logsInOrOut(
    annotate(new Command("end"), {
      effects: LOCAL_WRITE,
      mcp: false,
      examples: [`${HUBSPOT} work session end`],
    }),
  )
    .summary("forget this profile's key on this computer")
    .description(
      `forget this profile's key and account id on this computer; the key itself stays valid in ${SERVICE}: delete ` +
        "or rotate it where it was made",
    )
    .action(function (this: Command) {
      refuseUnderReadOnly(this, "session end")
      const { profile, tokens } = contextOf(this)
      answer(this, { profile, ended: tokens.remove(profile) })
    })

const listCommand = () =>
  profileFree(
    annotate(new Command("list"), {
      effects: LOCAL_READ,
      examples: [`${HUBSPOT} session list`, `${HUBSPOT} session list --json`],
    }),
  )
    .summary("list the profiles here and whether each is signed in")
    .description("list the profiles on this computer, whether each has a key and for which account; picks none")
    .action(function (this: Command) {
      const environment = environmentOf<HubspotEnvironment>(this)
      const env = environment.env ?? process.env
      // biome-ignore lint/plugin/no-own-settings: baseContext needs a profile, and this local read names none
      const { configuredProfiles } = configuration.resolveSettings({}, { env, needsProfile: false })
      const tokens = tokensHere(env, environment.keyring)
      const items = profilesHere(IDENTITY, configuredProfiles, env).map((profile) => {
        try {
          const saved = tokens.read(profile)
          const account = saved && saved.source !== "environment" ? decodeSignIn(saved.secret).portalId : null
          return { profile, signed_in: saved !== undefined, token_from: saved?.source ?? null, account }
        } catch (error) {
          if (!(error instanceof CliError)) throw error
          return { profile, signed_in: null, token_from: null, account: null, error: error.message }
        }
      })
      renderAnswer(
        this,
        outputFor(this),
        listOf("session list", { items, limit: Math.max(1, items.length), has_more: false }),
      )
    })

export const sessionCommand = (): Command =>
  annotate(new Command("session"), { effects: LOCAL_READ })
    .description(`keep this profile's ${SERVICE} key and account id in the OS keyring`)
    .addCommand(startCommand())
    .addCommand(statusCommand())
    .addCommand(endCommand())
    .addCommand(listCommand())
