import { CliError } from "@wirecat/cli-base"
import { defineSetup, type SetupCheck } from "@wirecat/cli-core/cli"
import { refuseTakenCrmAccount } from "@wirecat/cli-core/crm/cli"
import type { Command } from "commander"
import { HUBSPOT_ACCOUNT } from "../commands/account.js"
import { signInFor } from "../commands/session.js"
import { configuration } from "../config.js"
import { contextOf, hubFor, storedSignIn, withHub } from "../context.js"
import { IDENTITY } from "../identity.js"
import { accountAnswer } from "../whoami.js"
import en from "./texts.en.json" with { type: "json" }
import es from "./texts.es.json" with { type: "json" }
import ru from "./texts.ru.json" with { type: "json" }

const checkedToken = async (command: Command, token: string) => {
  const { env, profile, keyring, settings, run } = contextOf(command)
  const who = await run((events) => accountAnswer(hubFor(command, { token }, events)))
  refuseTakenCrmAccount(
    IDENTITY,
    HUBSPOT_ACCOUNT,
    { env, profile, profiles: settings.configuredProfiles, ...(keyring ? { keyring } : {}) },
    { account: who.account },
  )
  return { who, signIn: signInFor(token, who) }
}

/** The same proof `session start` runs, and the same sign-in it keeps: the token with the account beside it. */
const check: SetupCheck = async ({ command, secrets }) => {
  const typed = secrets.token?.trim()
  if (typed) {
    const { who, signIn } = await checkedToken(command, typed)
    return { ...who, keep: { secrets: { token: signIn }, account: who.account } }
  }
  if (!storedSignIn(command))
    throw new CliError("validation_error", "this profile has no key yet: paste one", { param: "token" })
  const who = await withHub(command, accountAnswer)
  return { ...who, keep: { account: who.account } }
}

/** Read scopes only (HubSpot's "Scopes" page); a scope left out fails the commands that need it, nothing else. */
const SCOPES = [
  "crm.objects.contacts.read",
  "crm.objects.companies.read",
  "crm.objects.deals.read",
  "crm.objects.owners.read",
  "crm.schemas.contacts.read",
  "crm.schemas.companies.read",
  "crm.schemas.deals.read",
  "sales-email-read",
].join("\n")

export const hubspotSetup = defineSetup({
  app: IDENTITY,
  configuration,
  check,
  start: "key",
  steps: {
    key: {
      title: "key.title",
      blocks: [
        { type: "text", text: "key.intro" },
        { type: "text", text: "key.service" },
        { type: "code", code: SCOPES, copy: true },
        { type: "note", role: "tip", text: "key.leads" },
        {
          type: "group",
          role: "details",
          title: "key.private.title",
          blocks: [{ type: "text", text: "key.private" }],
        },
      ],
      next: "token",
    },
    token: {
      title: "token.title",
      blocks: [
        { type: "text", text: "token.where" },
        { type: "input", id: "token", secret: "token", input: "password", label: "token.label", hint: "token.hint" },
        { type: "note", role: "tip", text: "token.rights" },
      ],
      next: "check",
    },
    check: {
      kind: "run",
      title: "check.title",
      action: "apply",
      blocks: [{ type: "text", text: "check.body" }],
      next: [
        { when: { result: "check", is: "ok" }, to: "done" },
        { when: { result: "check", error: "authentication_error" }, to: "token" },
        { when: { result: "check", error: "permission_error" }, to: "key" },
        { when: { result: "check", error: "validation_error" }, to: "token" },
        { when: { result: "check", error: "conflict" }, to: "token" },
        { to: "failed" },
      ],
      back: false,
    },
    failed: {
      kind: "done",
      title: "failed.title",
      blocks: [{ type: "note", role: "danger", text: "failed.body" }],
      back: true,
    },
    done: {
      kind: "done",
      title: "done.title",
      blocks: [
        { type: "text", text: "done.body" },
        { type: "code", code: "hubspot <profile> sync\nhubspot <profile> deals list status:open", copy: true },
      ],
    },
  },
  texts: { en, ru, es },
})
