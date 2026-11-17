import { join } from "node:path"
import { resolvePaths } from "@wirecat/cli-base"
import {
  appDoctorCommand,
  appMcpCommand,
  commandsCommand,
  configCommand,
  createProgram as createSharedProgram,
  outputFor,
  ProfileTokenStore,
  type ProgramDefinition,
  type ProgramOptions,
  type RunOptions,
  run as runShared,
  runsCommand,
  setupCommand,
  skillCommand,
  upgradeCommand,
} from "@wirecat/cli-core/cli"
import { appUpdate } from "@wirecat/cli-core/update"
import type { Command } from "commander"
import { accountCommand } from "./commands/account.js"
import { apiCommand } from "./commands/api.js"
import { crmSharedCommands } from "./commands/crm-shared.js"
import { scheduleCommand } from "./commands/schedule.js"
import { sessionCommand } from "./commands/session.js"
import { configuration } from "./config.js"
import { SERVICE } from "./hubspot/transport.js"
import { IDENTITY, PACKAGE, SKILL } from "./identity.js"
import { hubspotSetup } from "./setup/flow.js"

const update = appUpdate({
  packageName: PACKAGE,
  command: IDENTITY.command,
  version: IDENTITY.version,
  entry: import.meta.url,
  statePath: (env) =>
    join(resolvePaths({ appName: IDENTITY.appName, prefix: IDENTITY.envPrefix, env }).state, "update-check.json"),
  // biome-ignore lint/plugin/no-own-settings: the update check runs before any command exists to give baseContext
  enabled: (env) => configuration.resolveSettings({}, { env, needsProfile: false }).updateCheck,
  offVariables: [`${IDENTITY.envPrefix}_NO_UPDATE_CHECK`],
})

const mcpCommand = () =>
  appMcpCommand(IDENTITY, configuration, {
    name: SERVICE,
    untrusted: [
      "contact, company and deal names",
      "pipeline and stage names",
      "owner names",
      "property values, notes and activity text",
      "e-mail addresses, phone numbers and links",
      "whatever api returns",
    ],
    permissionExample: "people.list=deny",
    skill: SKILL,
    signedIn: (profile, env, keyring) =>
      new ProfileTokenStore({ app: IDENTITY, env, ...(keyring ? { keyring } : {}) }).signedIn(profile),
  })

export const definition = (): ProgramDefinition => ({
  app: IDENTITY,
  // The whole object: cli-core refuses a command by its key only when it gets the permission table too.
  configuration,
  firstScreen: {
    pitch: "a HubSpot account's CRM for scripts and agents, read into one local store.",
    can: [
      { command: "sync", does: "copy your deals, contacts and companies; the next sync takes the changes" },
      { command: "deals list status:open", does: "open deals with stage, amount and owner, from the store, offline" },
      { command: 'search all "kitchen"', does: "stored deals beside your other WireCat tools' data" },
      { command: 'people list "Anna"', does: "any contact, read live from the account" },
      { command: "activities list", does: "notes, calls, e-mails, meetings and tasks on your deals" },
      { command: "deals close deal:12 won", does: "close a deal won or lost in HubSpot, with the key's write scopes" },
      { command: "api deals-list --limit 5", does: "any operation of HubSpot's CRM API, one command per operation" },
    ],
    start: `${IDENTITY.command} work session start`,
  },
  commands: () => [
    commandsCommand(IDENTITY),
    sessionCommand(),
    accountCommand(),
    ...crmSharedCommands(),
    apiCommand(),
    scheduleCommand(),
    appDoctorCommand(IDENTITY, configuration, { packageName: PACKAGE }),
    skillCommand(IDENTITY, SKILL),
    mcpCommand(),
    upgradeCommand(IDENTITY, PACKAGE, (command) => ({
      ...outputFor(command),
      installer: () => update.installer({}),
      latest: () => update.latest({}),
      install: (argv) => update.runUpdate(argv, {}),
    })),
    configCommand(IDENTITY, configuration),
    setupCommand(hubspotSetup),
    runsCommand(IDENTITY),
  ],
})

export const createProgram = (options?: ProgramOptions): Command => createSharedProgram(definition(), options)

export const run = (argv: string[], options?: RunOptions): Promise<number> => runShared(argv, definition(), options)
