# Settings

Decide what your AI agent may do with your HubSpot account before you hand it over. This release only reads, and each
profile can still narrow what an agent reads.

Settings live in one file, `config.json`, in the folder `hubspot doctor` shows. Each profile has its own part, and
`defaults` apply to every profile. `hubspot work config show` lists each setting and where it came from: the file, a
variable or the default.

**On this page:**

1. [See and change a setting](#see-and-change-a-setting)
2. [Permissions](#permissions)
3. [Activities](#activities)
4. [Run records](#run-records)

## See and change a setting

```sh
hubspot work config show
hubspot work config set limit 50
hubspot work config unset limit
```

## Permissions

`permissions` decides what a command may do for this profile: `allow`, `ask`, `readonly` or `deny`, per permission
key. Each command has a key, such as `deals.list`, and so does each operation of HubSpot's API: `api.<command>`, such
as `api.deals-search`. `api` covers every operation.

```sh
hubspot work config set permissions.people deny
hubspot work config set permissions.api readonly
```

This release only reads, `api` included: no command creates, changes or deletes anything in HubSpot. The
permissions decide what an agent may read.

Over MCP there is no one to ask, so `ask` lets the command run. Set a key to `readonly` or `deny` to stop an agent.
`hubspot work mcp serve --permission people.list=deny` makes a key stricter for one server only, and never looser.
`WCHUBSPOT_READ_ONLY=1` refuses every write, whatever the permissions say.

## Activities

`crm.hubspot:<account id>.activities` is off by default. Turned on, the next `sync` copies the notes, calls, e-mails,
meetings and tasks on the deals and their contacts and companies. [Activities and what changed](usage.md#activities-and-what-changed)
shows the command. Only you set it, at a terminal.

## Run records

A command that fails is kept as a run, for `hubspot runs list` and `runs show`. A command that reaches HubSpot, such
as `session status --check`, is kept when it succeeds too, unless `record` is `false` (then only failures) or it ran
with `--no-record`.
`record_input` decides whether a run keeps the words you typed. It is `true` unless you set it to `false`. Secrets are
masked either way, as [security](security.md) shows.
