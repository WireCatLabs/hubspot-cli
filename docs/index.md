# HubSpot

You see where every deal stands and what changed in your CRM overnight, without opening HubSpot. The AI agent you
already use, such as Claude Code or Codex, answers from a copy of your HubSpot deals, contacts and companies on your
computer, even offline. It creates, moves and closes deals for you too, as far as you allow.

Ask which deals wait in "Contract sent" and for how much, what moved since yesterday, or how many deals in the Sales
pipeline went on to the next stage this month. The agent answers with the deal, its amount and its owner. You need one
key for the account, which a super admin makes once in HubSpot's settings.

**On this page:**

1. [What you get](#what-you-get)
2. [Things a newcomer would not guess](#things-a-newcomer-would-not-guess)
3. [How it looks](#how-it-looks)
4. [Why hubspot](#why-hubspot)
5. [What it can do](#what-it-can-do)
6. [How it works](#how-it-works)
7. [Start in a few minutes](#start-in-a-few-minutes)
8. [Limits](#limits)
9. [Find a guide for your task](#find-a-guide-for-your-task)

## What you get

- **The answer, not the search.** Ask about a deal or a client in your own words. The agent finds the deal with its
  stage, amount and the people on it, read from your computer, with no clicking through HubSpot.
- **The pipeline at a glance.** How many deals stand in each stage and for how much, how many went on to the next one,
  and the share won.
- **Mornings that start with what changed.** Yesterday's new deals, stage moves, wins and losses arrive as a short
  digest at the time you choose, as a notice on your desktop, or in your Telegram or mail through WireCat's `tg` or
  `mail`.
- **The work on a deal in one place.** Its notes, calls, e-mails, meetings and tasks, and the tasks that are overdue.
- **Changes by asking.** "Move Example kitchen to Contract sent" is enough. The agent finds the stage by its name, and
  you can check which permissions a change needs before it is made.
- **Your CRM beside your chats.** One search finds a deal next to the messages, mail and meetings about it that the
  other WireCat tools keep on your computer.

## Things a newcomer would not guess

- **The key belongs to the account, not to you.** HubSpot's service key, the key `hubspot` signs in with, names no
  user. So `hubspot` copies the deals of the whole account, and `owner:me` finds nobody: the agent filters by the
  owner's id from `hubspot work users list` instead.
- **Make a service key, not a private app.** HubSpot stopped new private apps on 26 October 2026. The token of a
  private app you already have still works. [Install](installation.md#make-a-key) shows where to click.
- **The key's scopes decide what can change.** Without the write scopes the key only reads, whatever the settings in
  `hubspot` say. A scope you left out fails only the commands that need it, and the error names it.
- **`work` is a name you choose.** It names one HubSpot account, and it is the first word of every command. No command
  picks an account for you.
- **Over MCP, "ask" goes ahead.** MCP is the way apps such as Claude Desktop call a tool, and nobody sits at a terminal
  there to answer a question. Set the writes an agent must not make to read only or refuse before you connect it.
- **Every app on the account shares one daily allowance of API calls.** `hubspot` answers most questions from its copy
  and keeps a slow pace, so it spends little of it. When the allowance is spent, the error says when it comes back.

## How it looks

```text
You:    What changed in the CRM since yesterday?
Agent:  (runs hubspot work changes list "at>=1d")
        · New deal "Example kitchen", 15 000 EUR, in Appointment scheduled
        · "Example office" moved to Closed won, 8 200 EUR
You:    Move Example kitchen to Contract sent.
Agent:  (runs hubspot work deals move deal:12 "Contract sent")
        Done. "Example kitchen" (deal 12) is in Contract sent now.
```

## Why hubspot

- **A copy of your deals on your computer.** Of the five tools on the [comparison](compare.md), HubSpot's own MCP
  server among them, no other documents reading deals without the internet. The next sync takes only the changes.
- **A permission on every action.** Allow, ask, read only or refuse, for each command and for each operation of
  HubSpot's API. Giving a record to another owner is refused until you allow it.
- **Writes you can check first.** `--dry-run` sends nothing and shows which permissions the write needs. A write that
  lost its answer is never sent again on its own, so a dropped connection makes no second deal.
- **Polite to HubSpot.** At most 4 requests a second for each account, and most answers need no request at all.
- **The key stays in your system keyring.** It never shows in output, errors or logs.
- **Free and open source.** Apache 2.0.

Another tool fits better when you want HubSpot in ChatGPT or Claude in the browser with nothing to run on your
computer, signed in as yourself with your own HubSpot rights (HubSpot's own MCP server).

## What it can do

- **Deals and leads:** list them by stage, pipeline, owner or date, show one with the people on it, create, update,
  move and close deals as won or lost, and export a list to a CSV file for a spreadsheet. Leads need Sales Hub Professional or
  Enterprise. [Use it](usage.md)
- **The pipeline:** each stage with its count and sum, how many reached it and went on, and the win rate in a period
  you choose. [Use it](usage.md#read-your-deals)
- **Contacts, companies and owners:** find any of them in the account, create and update contacts and companies.
  [Use it](usage.md#read-your-deals)
- **What changed:** deals made, moved, won and lost, given another owner, and activities added and done, in a window
  you choose, and a digest on a schedule. [Use it](usage.md#activities-and-what-changed)
- **Activities:** notes, calls, e-mails, meetings and tasks on your deals, once you turn them on.
  [Use it](usage.md#activities-and-what-changed)
- **Any operation of HubSpot's CRM API:** notes, tasks, tickets, associations and merges, each with its own
  permission. [Use it](usage.md#call-the-api)

## How it works

- **A copy on your computer.** `sync` puts the pipelines, deals and leads, with their contacts and companies, into the
  WireCat local store, the one file on your computer that every WireCat tool shares. Lists, the pipeline and search
  read it, also offline.
- **Sign-in with a key.** A service key, or the token of a private app. It is kept in the system keyring, or in a
  private file on a computer without one. [Install](installation.md)
- **Made for agents and scripts.** The agent skill teaches Claude Code, Codex and Gemini CLI the commands, and MCP
  serves them to apps such as Claude Desktop. `--json` gives a JSON answer, and an error comes with a code to branch
  on. [MCP](mcp.md)
- **What is stored and what goes over the network.** [Security](security.md)

## Start in a few minutes

In WireCat Desktop, install HubSpot on the **Tools** page and sign in under **Manage**, as
[install](./installation.md#in-wirecat-desktop) shows. Or paste this into your agent:

```text prompt
Install hubspot with npm install -g @wirecat/hubspot-cli. Help me make a HubSpot service key and run hubspot work session start, then sync and show my open deals.
```

Or in a terminal:

```sh
npm install -g @wirecat/hubspot-cli
hubspot skill install                 # teaches Claude Code, Codex and Gemini CLI to use hubspot
hubspot work session start            # paste the service key when asked
hubspot work sync                     # copy your deals with their contacts and companies
hubspot work deals list status:open   # your open deals, read from the copy
```

You need Node.js 22.16 or a later 22.x, or Node.js 24 or later. [Install](installation.md)

## Limits

- Contacts, companies and owners are read from HubSpot each time, so they need the internet. The copy holds the
  contacts and companies on your deals.
- Leads need Sales Hub Professional or Enterprise.
- Tickets have no command of their own: write them through `api`, such as `api tickets-create`. Tickets are not copied.
- HubSpot does not mark a repeated write as a repeat. A write whose answer was lost may have been made, so check the
  record before you send it again.

## Find a guide for your task

| Task | Guide |
|---|---|
| Install and connect an account | [Install](installation.md) |
| Read and change deals, the digest, the API | [Use it](usage.md) |
| Connect an app that uses MCP | [MCP](mcp.md) |
| Decide what an agent may change | [Permissions](permissions.md) |
| An exact command or option | [Commands](commands.md) |
| Something does not work | [When something goes wrong](troubleshooting.md) |
| How hubspot differs from other HubSpot tools | [Comparison](compare.md) |
