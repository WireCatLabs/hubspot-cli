# Use it

Know where each deal stands and what changed overnight, without opening HubSpot. `hubspot` brings the account's CRM to
your terminal and your AI agent: which deals stand in a stage, which tasks are overdue, and a morning digest of what
changed.

Every command starts with a profile, the name you gave the account. `sync` copies the deals with their contacts and
companies into the WireCat local store on your computer, and most reads answer from there, also offline. This page
assumes the profile is signed in, as [install and connect](installation.md) shows.

**On this page:**

1. [The profile comes first](#the-profile-comes-first)
2. [The first sync](#the-first-sync)
3. [Read your deals](#read-your-deals)
4. [Change deals, contacts and companies](#change-deals-contacts-and-companies)
5. [Activities and what changed](#activities-and-what-changed)
6. [Call the API](#call-the-api)
7. [Output for scripts](#output-for-scripts)
8. [Agents](#agents)

## The profile comes first

A profile is a name you choose for one account. It is the first word of every command that uses an account:

```sh
hubspot work config show
```

`WCHUBSPOT_PROFILE=work` does the same for one shell session. No profile is ever assumed, not even the only one. A
command without one stops with exit code 2 and lists the profiles on this computer.

`hubspot work session status --check` shows the account a profile reads.

## The first sync

`sync` copies the pipelines, the deals, and the contacts and companies on them into the local store. A HubSpot key
belongs to the account, not to a person, so the copy is the whole account's. Commands such as `deals list` then read
that copy offline:

```sh
hubspot work sync
hubspot work deals list status:open
```

Run `sync` again to bring the copy up to date: it asks HubSpot only for what changed since. This keeps it fresh with a
timer:

```sh
hubspot work schedule command crm --every 1h -- sync
```

## Read your deals

```sh
hubspot work deals list stage:"Contract sent"
hubspot work deals show deal:12
hubspot work pipelines list
```

`deals list` takes field:value terms, such as `status:open` or `stage:"Contract sent"`, and `--format csv` for a
spreadsheet. The key names no user, so `owner:me` names nobody. Take the owner's id from `hubspot work users list`
and filter by it, such as `owner:51234567`. `deals show` gives one deal with its stage, amount and the people on it.

Leads are read the same way with `leads list` on Sales Hub Professional or Enterprise.

Contacts, companies and owners are read live from the account:

```sh
hubspot work people list "Anna"
hubspot work organizations show 9
hubspot work users list
```

## Change deals, contacts and companies

These need the key's write scopes ([install](installation.md#make-a-key)). Run `sync` first: a stage or a pipeline is
named as the copy knows it.

```sh
hubspot work deals create --title "Example kitchen" --amount 15000 --currency EUR --stage "Appointment scheduled"
hubspot work deals update deal:12 --close-date 2026-12-24 --field "Lead source=Trade fair"
hubspot work deals move deal:12 "Contract sent"
hubspot work deals close deal:12 lost --reason "Example: chose another supplier"
hubspot work deals delete deal:12
hubspot work people create --first-name Anna --last-name Example --email anna@example.com
hubspot work organizations update 9 --name "Example LLC"
```

Each change goes to HubSpot first, and the copy keeps HubSpot's answer. `close` moves the deal to its pipeline's closed
won or lost stage. `delete` archives the deal in HubSpot, where it can be restored for 90 days, and asks first at a
terminal. Over MCP nobody is there to answer, so only `readonly` or `deny` stops an agent
([permissions](permissions.md)).
`--dry-run` shows the permission keys a change checks and sends nothing.

A contact keeps one e-mail and two numbers, phone and mobile. A company keeps one number and no e-mail. `--phone` and
`--email` replace the whole list, so one `--phone` on a contact clears its mobile number, and `--name` sets the first
and the last name both. Leads, tickets and a deal's contacts and company are written through
[the API](#call-the-api).

The key belongs to the account, not to you, so setting an owner with `--owner` checks `crm.assign-others`, which is
`deny` until you allow it ([permissions](permissions.md)). HubSpot takes no idempotency key: a change
that ended in `outcome_unknown` may have been made, so look at the record before you send it again.

## Activities and what changed

Notes, calls, e-mails, meetings and tasks are off by default. To copy them, turn on the activities setting with your
account's id in place of the example `12345678`. `session status` shows the id as `account`.

```sh
hubspot work config set crm.hubspot:12345678.activities on
hubspot work sync
hubspot work activities list overdue:true
```

A note or a task goes on a deal, a contact or a company by its ref, as `deals show` gives it, with `--subject` once for
each. A contact or a company by HubSpot's id, as `people list` prints it, is `person:crm:<id>`. It is written whether the activities setting is on or not, and stored only when it is on. Closing a task needs
its id from `activities list`:

```sh
hubspot work activities create comment --subject deal:12 --text "Agreed on the price"
hubspot work activities create task --subject deal:12 --subject person:crm:4021 --title "Send the contract" --due 2026-12-01
hubspot work activities close tasks:5501
```

`changes list` shows what the syncs saw change: deals made, moved, won and lost, and contacts added. This schedule
makes a morning digest of the last day:

```sh
hubspot work changes list "at>=1d"
hubspot work schedule command crm-digest --at 08:30 -- changes list --format report
```

## Call the API

`hubspot work api list` lists every operation of HubSpot's CRM API, version 2026-03, with its effect and permission key.
Each operation is a command of its own:

```sh
hubspot work api list
hubspot work api show deals-search
hubspot work api deals-search --body '{"after":"0","filterGroups":[],"limit":5,"properties":["dealname","amount"],"sorts":[]}'
hubspot work api deals-list --all
```

Each operation checks its own key, `api.<command>`, so `permissions.api deny` keeps an agent out of the raw API. A
write on deals, contacts or companies also checks its command's key (`deals.update`), another write its group's
`.write` key (`notes.write`), and a delete its `.delete` key. They ask first at a terminal. Over MCP
only `readonly` or `deny` stops an agent.
`--dry-run` shows the keys without sending anything:

```sh
hubspot work api tickets-create --body-file ticket.json --dry-run
```

```sh
hubspot work config set permissions.api deny
```

## Output for scripts

Every command except `mcp serve` on stdin and stdout takes `--json`, and prints one JSON value on stdout. Errors are
JSON on stderr, with a code to branch on. The [command reference](commands.md) lists the codes.

## Agents

`hubspot skill install` teaches Claude Code, Codex, Gemini CLI and OpenClaw the commands.
`hubspot work mcp add claude-code --allow-writes` connects the profile to an app that uses MCP. [MCP](mcp.md) shows
the rest, and ChatGPT and Claude in the browser.
