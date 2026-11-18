# Settings

Set up `hubspot` the way you want it for each HubSpot account: what your AI agent may do, whether the notes, calls and
tasks on your deals are copied too, and what a run keeps for later.

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
key. [Permissions](permissions.md) lists each key, its built-in level and what holds over MCP.

```sh
hubspot work config set permissions.api readonly
```

## Activities

`crm.hubspot:12345678.activities` is off by default. Put your account's id in place of the example `12345678`:
`hubspot work session status` shows it as `account`. Turned on, the next `sync` copies the notes, calls, e-mails,
meetings and tasks on the deals and their contacts and companies.
[Activities and what changed](usage.md#activities-and-what-changed) shows the command. Only you set it, at a terminal.

## Run records

A command that fails is kept as a run, for `hubspot runs list` and `runs show`. A command that reaches HubSpot, such
as `session status --check`, is kept when it succeeds too, unless `record` is `false` (then only failures) or it ran
with `--no-record`.
`record_input` decides whether a run keeps the words you typed. It is `true` unless you set it to `false`. Secrets are
masked either way, as [security](security.md) shows.
