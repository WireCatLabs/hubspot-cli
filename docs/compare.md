# Compared with other tools

<!-- cspell:words Composio PKCE baryhuang -->

`hubspot` is a command line and an MCP server for the sales data of a HubSpot account: deals, contacts, companies,
pipelines, leads, activities and owners. This page puts it next to the other tools that let an AI agent read and
change HubSpot's CRM, so you can see which one fits your job. The marks for `hubspot` come from its current release, its
commands and its source, checked on 18 November 2026, and they are checked again at each release. The marks for the
other tools come from their own documentation and source, linked in the table, checked on 18 November 2026. Nothing
was signed in to or tested live, and a tool may do more than its pages say.

The tools:

- **hubspot**: this tool. Keeps a copy of your deals with their contacts and companies on your computer, and decides
  for each action what an agent may do. It signs in with a service key or a legacy private app token of the account.
- **[HubSpot MCP](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server)**:
  HubSpot's own hosted MCP server, generally available since 13 April 2026, with 36 tools for the CRM, marketing and
  content.
- **[HubSpot Agent CLI](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide)**:
  HubSpot's own command line for agents, in beta. Its command is also named `hubspot`, so the two tools cannot share
  one `PATH` under the same name.
- **[mcp-hubspot](https://github.com/baryhuang/mcp-hubspot)**: the most starred open-source MCP server for HubSpot
  (129 stars, last changed on 11 November 2025), with 16 tools for contacts, companies, tickets and conversations. It
  has no tool for deals or pipelines.
- **[Composio](https://composio.dev/toolkits/hubspot)**: Composio's hosted MCP server, with 354 tools for HubSpot.

HubSpot's own MCP server
[reads and writes](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#supported-data-and-permissions)
contacts, companies, deals, tickets, leads and activities. It acts as the HubSpot user who signs in, with OAuth 2.1
and PKCE, through an MCP auth app that someone creates in the account first. None of its tools deletes a CRM record.
On an account with Sensitive Data turned on, the current page says it blocks conversation data, and the
[announcement](https://developers.hubspot.com/changelog/remote-hubspot-mcp-server-is-now-generally-available) of
April 2026 said it blocks calls, e-mails, meetings, notes and tasks. A service key, which `hubspot` uses, acts for the
whole account and not for one person
([HubSpot](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/account-service-keys)).

✅ yes · 🟡 partly · ❌ no · ➖ not in its documentation · n/a cannot apply

## Features

| Task | hubspot | [HubSpot MCP](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server) | [HubSpot Agent CLI](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide) | [mcp-hubspot](https://github.com/baryhuang/mcp-hubspot) | [Composio](https://composio.dev/toolkits/hubspot) |
|---|:-:|:-:|:-:|:-:|:-:|
| **Find and read** | | | | | |
| List the open deals of a stage or a pipeline | ✅ | [✅](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#available-tools) | [✅](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#filter-and-search) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | [🟡](https://composio.dev/toolkits/hubspot) |
| Find a contact by name, phone or e-mail | ✅ | [✅](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#available-tools) | [✅](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#filter-and-search) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L218-L238) | [🟡](https://composio.dev/toolkits/hubspot) |
| List open and overdue tasks | ✅ | [🟡](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#read-access) | [🟡](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#core-commands) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | [🟡](https://composio.dev/toolkits/hubspot) |
| Read deals without the internet | ✅ | [❌](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#implementation-overview) | ➖ | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | [❌](https://composio.dev/toolkits/hubspot) |
| One search over deals and the messages and notes of your other tools | ✅ | ➖ | ➖ | ➖ | ➖ |
| Read and change tickets | 🟡 | [✅](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#write-access) | [✅](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#core-commands) | [🟡](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L247-L258) | [✅](https://composio.dev/toolkits/hubspot) |
| **Change the CRM** | | | | | |
| Create and update contacts and companies | ✅ | [✅](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#write-access) | [✅](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#core-commands) | [✅](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L191-L238) | [✅](https://composio.dev/toolkits/hubspot) |
| Move a deal to a stage by the stage's name | ✅ | [🟡](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#write-access) | [🟡](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#properties) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | [🟡](https://composio.dev/toolkits/hubspot) |
| Close a deal as lost, with its reason, in one step | ✅ | [🟡](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#write-access) | [🟡](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#properties) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | [🟡](https://composio.dev/toolkits/hubspot) |
| Set a task or add a note on a deal | ✅ | [✅](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#write-access) | [✅](https://developers.hubspot.com/docs/build-with-ai/agent-cli#when-to-use-the-agent-cli) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | [✅](https://composio.dev/toolkits/hubspot) |
| Call any other operation of HubSpot's CRM API | ✅ | [🟡](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#available-tools) | [🟡](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#core-commands) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | [🟡](https://composio.dev/toolkits/hubspot) |
| **Summaries and changes** | | | | | |
| Funnel: how many deals reached each stage | ✅ | ➖ | ➖ | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | ➖ |
| Share of deals won in a period | ✅ | [🟡](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#available-tools) | [🟡](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#core-commands) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | ➖ |
| Open deals unchanged for more than N days | ✅ | [🟡](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#available-tools) | [🟡](https://developers.hubspot.com/docs/build-with-ai/agent-cli#when-to-use-the-agent-cli) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | ➖ |
| What changed in a day: new deals, stage moves, wins and losses | ✅ | ➖ | ➖ | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | [🟡](https://composio.dev/toolkits/hubspot) |
| A scheduled morning CRM summary to Telegram or e-mail | ✅ | ➖ | ➖ | ➖ | ➖ |
| **Agents and safety** | | | | | |
| Let an agent read only | ✅ | ➖ | ➖ | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | ➖ |
| Choose for each action: allow, ask or refuse | ✅ | ➖ | ➖ | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | ➖ |
| A write waits for your confirmation | 🟡 | [✅](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#available-tools) | [🟡](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#auth-sensitive-commands) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L186-L281) | ➖ |
| Giving a record to another owner is refused until you allow it | ✅ | ➖ | ➖ | ➖ | ➖ |
| See what a write would do without making it | 🟡 | ➖ | [✅](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#using-the-dry-run-flag) | ➖ | ➖ |
| A write is not sent twice when its answer is lost | ✅ | ➖ | ➖ | [🟡](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/handlers/contact_handler.py#L110-L146) | ➖ |
| The key is kept in the system keyring | ✅ | n/a | ➖ | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/hubspot_client.py#L62-L65) | n/a |
| An agent at a terminal works through commands, without MCP | ✅ | n/a | [✅](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#run-commands) | n/a | n/a |
| **Setup** | | | | | |
| Sign in as yourself, with your own HubSpot user's rights | ❌ | [✅](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#supported-data-and-permissions) | [✅](https://developers.hubspot.com/docs/developer-tooling/local-development/agent-cli/guide#standard-mode-via-oauth-login) | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/hubspot_client.py#L62-L65) | [✅](https://composio.dev/toolkits/hubspot) |
| Several accounts, each named in the command | ✅ | ➖ | ➖ | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/hubspot_client.py#L62-L65) | [✅](https://composio.dev/toolkits/hubspot) |
| Works from ChatGPT or Claude in the browser | 🟡 | [✅](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server#available-tools) | ➖ | [❌](https://github.com/baryhuang/mcp-hubspot/blob/4a8345f2507b4159fc84eb500c74669329076f53/src/mcp_server_hubspot/server.py#L62-L63) | [✅](https://composio.dev/toolkits/hubspot) |

| | hubspot | HubSpot MCP | HubSpot Agent CLI | mcp-hubspot | Composio |
|---|---|---|---|---|---|
| Install | npm, Node 22.16+ or 24+ | none: hosted, after an MCP auth app is made in the account | HubSpot's install script, which upgrades itself | Docker or Smithery | none: hosted |
| Licence | Apache-2.0 | closed service | [HubSpot's Developer Beta Terms](https://legal.hubspot.com/developerbetaterms) | MIT | closed service |
| Price | free | ➖, available to every HubSpot account | ➖ | free | 100,000 calls a month free, 20,000 of them through apps such as HubSpot, paid above that |

Notes on the `hubspot` column:

- **Sign-in.** A service key or a legacy private app token belongs to the account, not to a person, and reads and
  changes what its scopes allow. `hubspot` checks which account the key belongs to, and keeps it in the system keyring,
  or in a private file on a computer without one. It has no sign-in through the browser yet, so this row is no. See
  [sign in](./installation.md#sign-in).
- **Read-only.** `WCHUBSPOT_READ_ONLY=1` refuses every write, whatever the settings say. The `readonly` level does the
  same for one key. Without either, a new profile lets an agent create, update, move and close deals, and create and
  update contacts and companies, as far as the key's scopes allow.
- **Allow, ask or refuse.** Each command and each API operation has its key, such as `deals.update` or
  `api.deals-search`, set to `allow`, `ask`, `readonly` or `deny` in [the settings](./permissions.md).
  `mcp serve --permission` makes a key stricter for one server only. An agent over MCP can make them stricter, never looser.
- **Confirmation.** `ask` asks at a terminal. Over MCP nobody is there to answer, so `ask` lets the agent go ahead,
  and this row is partly. To stop an agent from writing, set the key to `deny` or `readonly`.
- **Another owner.** The key names no person, so `hubspot` cannot tell your records from a colleague's. Setting an
  owner on any record, by a command or through `api`, is refused until you set `crm.assign-others` to `allow`.
- **Tasks, notes and tickets.** `activities create` adds a note or a task to a deal, a contact or a company, and
  `activities close` marks a task done. Tickets have no command of their own: they are written through `api`, such
  as `api tickets-create`, with a JSON body, so that row is partly. An API write asks first at a terminal, and over
  MCP `ask` lets it run. The notes, calls, e-mails, meetings and tasks on your deals are read with `activities list`,
  once you turn on the activities setting.
- **The whole API.** `api list` shows every operation of HubSpot's CRM API, 157 in all, each a
  command with its own permission key. They reach an agent over MCP too.
- **Without the internet.** `sync` copies the pipelines, the deals with their contacts and companies, and the leads,
  and later asks only for what changed. `deals`, `pipelines`, `stages`, `activities` and `changes` read this copy,
  with `--offline` too. `people`, `organizations` and `users` always ask HubSpot.
- **One search.** `search all` finds deals beside the messages, notes and meetings that other WireCat tools on the
  same computer stored, without the internet.
- **Funnel.** `pipelines show` gives one pipeline as a board and a funnel: how many deals stand in each stage, how many
  reached it and went on, and the win rate in a period.
- **What changed and the summary.** `changes list` shows new deals, stage moves, wins, losses, new owners, activities
  added and done, and new contacts. `schedule command … changes list --format report --deliver-to` sends a morning
  summary to Telegram or e-mail through the WireCat tools `tg` or `mail`.
- **A preview.** `--dry-run` shows how a command read its words and which permission keys it checks, and sends
  nothing. It does not show the values a write would change, so this row is partly.
- **A write is sent once.** A write that got no answer is not sent again. It ends as `outcome_unknown` with its
  `operation_id`. Check HubSpot before you write it again, since HubSpot has no key that would drop a repeat.
- **Pace.** `hubspot` sends at most 4 requests a second for each account, under HubSpot's own limits.
- **ChatGPT or Claude in the browser.** `mcp serve --http` serves the tool behind a tunnel that you set up and keep
  running yourself, so this row is partly. See [MCP](./mcp.md).
- **Speed and cost against a browser agent.** `hubspot` calls HubSpot's API, reads its own copy and opens no browser.
  No measurement of it against a browser agent is published, so this page makes no claim.

## When another tool fits better

- **HubSpot MCP**: you want HubSpot in ChatGPT or Claude in the browser, signed in as yourself with your own rights,
  and every write shown to you for a yes first. It also reaches marketing, content and social posts.
- **HubSpot Agent CLI**: an agent at a terminal should work as you, with a preview of the records and values a bulk
  change would touch, or on objects beyond the CRM such as workflows, reports and saved views.
- **Composio**: you already use Composio for other apps and want HubSpot beside them, with nothing to run on your
  computer.

If `hubspot` fits, start with [installation](./installation.md). To use it with an agent, see [usage](./usage.md).
