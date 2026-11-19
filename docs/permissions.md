# Permissions

Let an AI agent work in your HubSpot CRM through `hubspot` and keep the say over what it changes. The key carries the
scopes you gave it in HubSpot for the whole account, so without your own limits an agent could change any deal,
contact or company those scopes reach.

For each profile, the name you gave one account's sign-in, you decide what an agent may only read, what asks you first
and what goes ahead. You can stop an agent from deleting deals or from using HubSpot's API directly, and you know which
checks hold whatever the settings say.

Each command has a permission key, its name such as `deals.move`, or a group such as `deals`, where the longer key
wins. Each operation of HubSpot's API has one too, `api.` and its command, such as `api.deals-search`, and `api`
covers them all. Each key has a level: `deny`, `readonly`, `ask` or `allow`. `hubspot work config set` sets them, and
`--dry-run` shows which keys a command checks.

**On this page:**

1. [The levels](#the-levels)
2. [What is set before you change anything](#what-is-set-before-you-change-anything)
3. [One command can check several keys](#one-command-can-check-several-keys)
4. [Agents and MCP](#agents-and-mcp)
5. [Checks that hold whatever the permissions say](#checks-that-hold-whatever-the-permissions-say)

## The levels

| Level | What happens |
|---|---|
| `deny` | The command is refused, a read too. |
| `readonly` | Reads work. A write is refused. |
| `ask` | A write asks first at a terminal. **Over MCP it runs.** |
| `allow` | The command runs without a question. |

```sh
hubspot work config set permissions.people deny        # this profile reads no contacts
hubspot work config set permissions.api readonly       # the API reads, never writes
hubspot work config set permissions.notes.write allow  # let an agent add notes without a question
hubspot work config show                               # each key with its level and where it came from
```

A refusal is `permission_error` (exit code 5) and names the key. It does not mean the sign-in is broken.

An agent cannot loosen a permission: a `config set` or `config unset` that would lift a limit is refused unless you
run it yourself in a terminal.

## What is set before you change anything

| What | Keys | Built-in level |
| --- | --- | --- |
| `deals create`, `update`, `move` and `close`, `people` and `organizations` `create` and `update` | its own, such as `deals.update`. A stage change also checks `deals.move`, and a won or lost stage `deals.close` | `allow` |
| `deals delete` | `deals.delete` | `ask` |
| An `api` write on deals, contacts or companies, such as `api deals-update` | `api.deals-update` and the key of the command that does the same (`deals.update`), as in amoCRM and b24. A write with no command, such as a merge, checks `<group>.update`. A deal stage also checks `deals.move` and `deals.close` | `ask` |
| Another `api` write, such as `api notes-create` | `api.notes-create` and its group's `.write` key (`notes.write`) | `ask` |
| An `api` read, such as `api contacts-list` | `api.contacts-list` and the key of the command that reads the same records (`people.list`), so `people: deny` stops it too | `allow` |
| An `api` delete, archive or merge | its own `api.` key and its group's `.delete` key | `ask` |
| An owner set on a record, on any path | `crm.assign-others` | `deny` |
| `api contacts-gdpr-delete`, which erases a contact for good | also `people.erase`, so it stays off until you allow it | `deny` |
| Every other command | its own | `allow` |

A HubSpot key belongs to the account, not to a person. `hubspot` cannot tell your own records from a colleague's, so
any owner counts as someone else, and `crm.assign-others` stays `deny` until you allow it.

## One command can check several keys

The same change can come by two paths: a command such as `deals update`, or the API operation `api deals-update`. Each
path checks the keys of the other too, so one setting holds on both:

```sh
hubspot work config set permissions.deals.update deny   # no deal updates, by deals update or api deals-update
```

`--dry-run` shows every key a write checks and sends nothing:

```sh
hubspot work deals move deal:12 "Contract sent" --dry-run
hubspot work api notes-create --body-file note.json --dry-run
```

## Agents and MCP

Over MCP there is no one to answer a question, so `ask` lets the command run. Set a key to `readonly` or `deny` to stop
an agent:

```sh
hubspot work config set permissions.deals.delete deny
hubspot work config set permissions.api readonly
```

`hubspot work mcp serve --permission people.list=deny` makes a key stricter for one server only, and never looser.
[MCP](mcp.md#keep-writes-yours) shows the rest.

## Checks that hold whatever the permissions say

- **The key's scopes.** A key without the write scopes cannot change anything in HubSpot, whatever level you set
  ([install](installation.md#make-a-key)).
- **Read only for everything.** `WCHUBSPOT_READ_ONLY=1` refuses every write, whatever the permissions say.
- **A write is sent once.** A write that got no answer is not sent again. It ends as `outcome_unknown`, and you check
  the record in HubSpot before you send it again.
- **Sign-in stays yours.** `session start` and `session end` are not offered over MCP, and the key is read hidden or
  from stdin, never as an argument.
