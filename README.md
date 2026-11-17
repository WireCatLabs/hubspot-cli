# hubspot: HubSpot CRM CLI for AI agents

<p align="center">
  Know where every deal stands and what changed overnight, without opening HubSpot. Ask your AI agent, and it answers
  from a copy of your deals, contacts and companies on your computer, even offline.
</p>

<p align="center">
  <a href="https://wirecat.dev/en/docs/hubspot">Docs</a> ·
  <a href="https://discord.gg/DebENqbRrJ">Discord</a>
</p>

- **Ask instead of clicking.** "Which deals are stuck in Contract sent?" gets an answer in a second, in Claude Code,
  Codex or any app that speaks MCP.
- **The morning starts with what changed.** `changes list` shows what each sync saw change, and a schedule sends it to
  you.
- **Read only.** This release changes nothing in HubSpot. The key it signs in with needs read scopes only.

```text
You:    What changed in the CRM since yesterday?
Agent:  (runs hubspot work changes list "at>=1d")
        · New deal "Example kitchen", 15 000 EUR, in Appointment scheduled
        · "Example office" moved to Closed won, 8 200 EUR
You:    Who is the contact on Example kitchen?
Agent:  (runs hubspot work deals show deal:12)
        Anna Example, anna@example.com, at Example LLC.
```

*Invented deals, illustrative output.*

## Why hubspot

- **A copy of your CRM on your computer.** `sync` copies your deals with their contacts and companies, and the next
  sync takes only the changes. Lists, the pipeline and search then answer with no request to HubSpot, also offline.
- **The key stays in the system keyring.** It never appears in output, errors or run records, and no command takes it
  as an argument.
- **A permission on every command.** Each command and each operation of HubSpot's API has its own level: allow, ask,
  read only or deny. `WCHUBSPOT_READ_ONLY=1` stops every write.
- **Your CRM beside your other context.** Deals sit in the same local store as your messages, notes and meetings from
  the other WireCat tools, and `search all` finds them together.
- **As many accounts as you need.** Each HubSpot account is a profile you name in the command, and none is ever picked
  for you.
- **Free and open source.** Apache 2.0.

## Quick start

A super admin of the HubSpot account makes one key first: a **service key** (Development → Keys → Service keys) or
the access token of a legacy **private app**. Give it these read scopes:

```text
crm.objects.contacts.read     crm.objects.companies.read    crm.objects.deals.read
crm.objects.owners.read       crm.schemas.contacts.read     crm.schemas.companies.read
crm.schemas.deals.read        crm.objects.notes.read        crm.objects.calls.read
crm.objects.emails.read       crm.objects.meetings.read     crm.objects.tasks.read
```

Add `crm.objects.leads.read` on Sales Hub Professional or Enterprise to read leads, and `tickets` to read tickets
through `api`. A scope you leave out fails only the commands that need it.

```sh
npm install -g @wirecat/hubspot-cli
hubspot skill install                  # the agent skill, for Claude Code, Codex and Gemini CLI
hubspot work session start             # paste the key when asked, it goes to the keyring
hubspot work sync                      # copy your deals, contacts and companies
hubspot work deals list status:open
```

`work` is a profile, a name you choose for this account. It is the first word of every command that uses the
account. You need Node.js 22.16 or a later 22.x, or Node.js 24 or later. `hubspot doctor` shows what is set up and
needs no network.

More: [install and connect](docs/installation.md)

## Use it with your agent

Ask in plain words. The agent picks the commands.

> *"Use hubspot. Which deals are waiting in Contract sent, and for how much?"*
> *"Use hubspot. What changed in the CRM since yesterday?"*

- **Claude Code, Codex, Gemini CLI, OpenClaw** and other agents with a terminal run `hubspot` themselves.
  `hubspot skill install` teaches them how.
- **Claude Desktop, Cursor** and other MCP apps connect to `hubspot work mcp serve`.

```sh
hubspot work mcp add claude-code      # or: codex
hubspot work mcp config               # the entry for Claude Desktop, Cursor and others
```

Text from the account reaches the agent marked as untrusted, so the agent reads it as data, never as instructions.
The sign-in commands are not offered over MCP.

More: [agents and MCP](docs/usage.md#agents)

## What it can do

```sh
hubspot work deals list stage:"Contract sent"          # from the copy, offline too
hubspot work pipelines list                            # the deal pipelines and their stages
hubspot work people list "Anna"                        # any contact in the account, read live
hubspot work organizations list "Example LLC"          # any company, read live
hubspot work users list                                # the account's owners
hubspot work activities list                           # notes, calls, e-mails, meetings and tasks
hubspot work changes list "at>=1d"                     # what changed in the last day
hubspot work search all "Example LLC"                  # the deal beside your other WireCat data
hubspot work api deals-list --limit 5                  # any operation of HubSpot's CRM API
```

Activities are copied once you turn on the activities setting. `activities list` names the setting.
`api list` shows every operation of HubSpot's CRM API version 2026-03, each with its own permission.

More: [use it](docs/usage.md) · [command reference](docs/commands.md)

## How it works

- **A key, not a user.** A service key or a private app token belongs to the account, not to a person. `hubspot`
  copies the whole account, and `owner:me` names nobody: filter by `owner:<owner id>` from `users list`.
- **One profile per account.** A second profile signing in to the same HubSpot account is refused, so one copy is
  never synced twice.
- **Polite to HubSpot.** `hubspot` sends at most 4 requests a second for each profile, under HubSpot's limits on
  every plan. When the account has spent its daily allowance, it says when the allowance comes back.
- **Made for scripts.** `--json` prints one JSON value, and every error has a code to branch on.

## Limits

- `hubspot` is tested against a fake account built from HubSpot's API reference, not yet against a live account.
- Read only: no command changes deals, contacts or companies in this release.
- Tickets are read only through `api`, not copied.
- Leads need Sales Hub Professional or Enterprise.
- Before 1.0, a minor version may change commands, `--json` fields and MCP tools. The changelog marks each such
  change.

## Security

The key works like a password: anyone who has it can read what its scopes allow. `hubspot` keeps it in the system
keyring and never prints it. `hubspot` cannot revoke a key, so after a leak delete or rotate it in HubSpot.

More: [security](docs/security.md) · Report a vulnerability: [SECURITY.md](SECURITY.md)

## When something goes wrong

```sh
hubspot doctor                        # what is set up, without connecting
hubspot work session status --check   # whether the key works, and for which account
```

More: [troubleshooting](docs/troubleshooting.md) · Bugs go to this repository's
[issues](https://github.com/WireCatLabs/hubspot-cli/issues).

## Development

```sh
pnpm install && pnpm test
```

Tests run against a fake account built from HubSpot's API reference, with invented records and an injected keyring.
Nothing reaches a real account. `pnpm release:check` runs every check a release needs.

More: [testing](docs/dev/TESTING.md) · [design](docs/dev/DESIGN.md)

## Part of WireCat

`hubspot` is one of the [WireCat](https://wirecat.dev) tools: open-source, local-first command-line tools that give AI
agents your context from messengers, mail, calendars, documents and CRMs. Each one works on its own.

## License

[Apache 2.0](LICENSE)
