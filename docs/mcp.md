# MCP

Give your HubSpot CRM to an AI agent that cannot run commands, such as Claude Desktop or Cursor, or ChatGPT and Claude
in the browser. MCP (Model Context Protocol) is the way such an agent asks a program what it can do and then calls
it, and `hubspot` serves its commands that way.

The agent then reads your deals, contacts and companies, and changes them as far as the profile's permissions and the
key's scopes allow.

`hubspot work mcp add` adds the server to Claude Code or Codex, and `hubspot work mcp config` prints the entry for any
other client. An agent with a terminal, such as Claude Code or Codex, does better with the commands and the skill
(`hubspot skill install`). You need a signed-in profile, and a look at [Permissions](permissions.md) first: over MCP a
write at `ask` goes ahead.

**On this page:**

1. [Agents with a terminal](#agents-with-a-terminal)
2. [Add hubspot to an MCP client](#add-hubspot-to-an-mcp-client)
3. [What the agent sees](#what-the-agent-sees)
4. [Keep writes yours](#keep-writes-yours)
5. [ChatGPT and Claude in the browser](#chatgpt-and-claude-in-the-browser)

## Agents with a terminal

`hubspot skill install` puts the tool's skill where Claude Code, Codex, Gemini CLI and OpenClaw look for it. A skill
is a file of instructions that teaches an agent the commands. `hubspot skill install --for hermes` also adds that
folder to Hermes Agent's own settings, so a bare `skill install` leaves Hermes out.

## Add hubspot to an MCP client

```sh
hubspot work mcp add claude-code --allow-writes   # or codex
hubspot work mcp check                            # the handshake and the tool list, as the client sees them
```

`--allow-writes` says you know the profile offers tools that write: `sync` and schedules on this computer, and the
writes to HubSpot, which only a key with write scopes can make. For any other client, `hubspot work mcp config` prints
the entry to paste into its settings. By hand, for Claude Code:

```sh
claude mcp add hubspot -- hubspot work mcp serve
```

One server can serve several profiles: `hubspot mcp serve --profiles work,sales`, or `--profiles all`. Each call then
names its profile, and the agent asks you if you did not say which.

## What the agent sees

The server has three tools:

- `hubspot_tools_search` finds a command by words, with its arguments and the shape of its answer.
- `hubspot_read` runs a command that only reads, such as `deals list` or `changes list`.
- `hubspot_write` runs a command that changes something, such as `deals move` or `api notes-create`.

A command is named as on the command line, without the profile, and checks the same permission key. Every operation
of HubSpot's API is offered too, each behind its own key. Signing in and out is never offered over MCP: the agent asks
you to run `hubspot work session start` in a terminal.

Text from the account comes marked as untrusted: deal names, property values, notes, names, e-mail addresses, phone
numbers and links, and what `search all` finds. The agent is told it is data, never instructions.

## Keep writes yours

Over MCP nobody is at a terminal to answer `ask`, so the write goes ahead, built-in levels included:

- `deals.delete` is `ask` by default, so an agent can delete a deal. HubSpot keeps a deleted deal for 90 days, and you
  can restore it there.
- Every write and delete through `api` is `ask` by default, so an agent can add notes and tasks, merge records or
  change pipelines, as far as the key's scopes allow.

Choose one before you add the server:

- Set `readonly` or `deny` for each write the agent must not make:
  `hubspot work config set permissions.deals.delete deny`. The full list is in
  [Permissions](permissions.md#what-is-set-before-you-change-anything).
- Or turn on approval for the `hubspot_write` tool in your agent's client, so the client asks you before each write.

To make one server stricter than the profile, give it its own levels. They never loosen the profile:

```sh
hubspot work mcp add claude-code --allow-writes --permission deals.delete=deny --permission api=readonly
hubspot work mcp serve --permission people.list=deny
```

## ChatGPT and Claude in the browser

A browser app reaches the server over HTTP through your own tunnel, such as Tailscale Funnel. Put your tunnel's
address in place of the example `https://laptop.example.ts.net`:

```sh
hubspot work mcp serve --http --public-url https://laptop.example.ts.net
```

The server listens on `127.0.0.1` only, port 8765 (`--port` changes it). A browser app logs in with a one-time code
that the command prints. `hubspot work mcp revoke` ends every login.

`hubspot work mcp server start` runs the same server in the background. `mcp server status` shows its port, the login
code and the apps logged in, and `mcp server stop` ends it.

More: [permissions](permissions.md), [security](security.md), [the command reference](commands.md#hubspot-mcp).
