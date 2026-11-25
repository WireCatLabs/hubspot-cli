# Changelog

Notable changes to `@wirecat/hubspot-cli`. One section per version, newest first.

## 0.8.0 — 25.11.2026

### Changed — may break callers

- **hubspot is built on cli-core 1.0.0 and cli-base 1.0.0.** After its first run the store is at version 73, and only
  tools on cli-core 1.0 open it: upgrade every WireCat CLI on this computer together. The migration keeps a rollback
  copy, and refuses to run when it cannot write one (`store migrate --no-backup` migrates anyway).
- **`sync --rescan` no longer lets a sync mark most of a kind deleted.** It only lists everything again. When the
  guard holds a pass, `sync --allow-deletions <count>` lets it mark at most that many records deleted. The flag is
  for the owner in a terminal; the MCP server does not offer it.
- **A sync no longer marks records deleted when HubSpot could not list a whole kind.** The id pass is held until a
  full list comes back.
- **An MCP call that names a refused folder answers `permission_error`**, not `validation_error`.

## 0.7.0 — 24.11.2026

### Added

- `sync --embed` indexes the copied notes, calls, meetings and tasks with a model already downloaded, and
  `search all` then finds deals and leads by what their activities mean, not only by their words (cli-core 0.743.0).
  The skill tells an agent to ask by meaning before it reads every note.

### Changed — may break callers

- **`activities create --subject person:<n>` and `organization:<n>` name the record by its ref, as `deals show` gives
  it.** A contact or company by HubSpot's id, as `people list` prints it, is now `person:crm:<id>`. Before, the same
  form meant HubSpot's id, so a ref copied from `deals show` put the note on someone else's contact.

### Fixed

- `search all` lists a name one letter off the one that matched after it (Ferrara, then Ferraro), and finds a Latin
  name typed in Cyrillic (`феррара`), each marked `match: corrected`.
- A won or lost deal's closed day is HubSpot's close date (`closedate`), not the day the copy last saw the deal
  change. A deal won months ago no longer counts as won in the month of the first sync, and `deals show` gives the
  same day as `close_date` and `closed_date`.

## 0.6.0 — 23.11.2026

### Added

- `activities create comment|task` adds a note or a task to a deal, a contact or a company, and `activities close`
  marks a task done, through cli-core's CRM activity writes. A note's and a task's text keeps its lines.

### Changed — may break callers

- **`account remove` and the check against a second sign-in are cli-core's shared CRM ones** (`@wirecat/cli-core`
  0.722.0). The reasons stay `account-remove.account-shared` and `session.duplicate`, with the same details, and a
  dry run still warns. The refusal now says `HubSpot account <id>`. `account remove` also forgets an
  `oauth:hubspot:<profile>` keyring entry, which hubspot never writes today.
- **`account remove --delete-data` refuses when hubspot cannot tell which account another profile holds**
  (`account-remove.account-unknown`, detail `profile`): a profile whose saved sign-in is unreadable and that
  `session start` never remembered. `--keep-data` still removes.
- **`session start` refuses a profile named `files` or `foreign-contacts`** (`profile.reserved`): every account
  shares those folders in the state folder.

### Fixed

- **`account remove` and `account rename` of a profile that does not exist fail the same way, with
  `profile.unknown`.** They answered with two different reasons for one failure (cli-core 0.721.0).
- `api notes-create`, `api tasks-create` and their batch creates also check `activities.create`, so denying it stops a
  note or a task on every path.
- The skill named a group `api-<object>` that does not exist; it names the four real groups and the ids a note on a
  deal takes.

## 0.5.0 — 21.11.2026

### Changed — may break callers

- **A GDPR erase of a contact is off until you allow it.** `api contacts-gdpr-delete` erases a contact and everything
  on it for good, and blocks its address from coming back. Its key `people.erase` was `ask`, and over MCP `ask` goes
  ahead without asking. Now it is `deny` by default: the call answers `permission_error` and sends nothing. Ordinary
  deletes still ask. Watch for: to erase contacts, run `hubspot <profile> config set permissions.people.erase allow`.
  See [permissions](docs/permissions.md).

### Fixed

- **A denied `api` call is refused before its body is read.** A call whose key is `deny` answered `validation_error`
  when it had no body or a wrong one, and now answers `permission_error`, on the command line and over MCP
  (cli-core 0.715.0).

## 0.4.0 — 19.11.2026

### Changed — may break callers

- **`deals.write`, `people.write` and `organizations.write` are gone.** They stopped only the `api` path, so
  `deals.write: deny` still let `deals update` through. An `api` write on deals, contacts or companies now checks the
  key of the command that does the same (`deals.update`, `people.create`), as amoCRM and b24 do, and a merge
  checks `<group>.update`. So a raw deal, contact or company write goes ahead as its command does, and deletes still
  ask. Watch for: a setting that names one of the three old keys no longer matches anything: set
  `deals.update`, `deals.create` or the group key `deals` instead.

### Fixed

- **A read denied on a CRM command is denied through `api` too.** `config set permissions.people deny` stopped
  `people list` but not `api contacts-list`, which read the same contacts. Each raw read now checks the key of the
  command that reads the same records: `people`, `organizations`, `deals`, `leads`, `activities`, `users`, `pipelines`,
  `stages` and `fields`. See [permissions](docs/permissions.md).

## 0.3.2 — 19.11.2026

## 0.3.1 — 19.11.2026

### Fixed

- **Notes, meetings and tasks read as clean text.** HTML codes such as `&#8217;` and `&mdash;` become the characters
  they stand for, and style blocks are left out, so search finds the words. Before, only six codes were decoded.
- **HubSpot's daily limit says "do not retry" on every path.** The CRM commands called it retryable while `api` did
  not, so an agent could retry for hours.
- **`session start --help` no longer says hubspot changes nothing.** Writes shipped in 0.2.0.

## 0.3.0 — 18.11.2026

### Changed — may break callers

- **The MCP Registry entry asks which profiles to serve.** It started `mcp serve --profiles all`, so a client that
  installed the server from the registry reached every account on the computer without the owner choosing. Now
  `--profiles` is a required argument with the example `personal`: the client asks for one profile, a
  comma-separated list or `all`. Why: a CLI never picks an account for the owner
  ([WC-MCP-9](https://github.com/WireCatLabs/cli-base/blob/main/docs/standards/mcp.md#wc-mcp-9--a-server-serves-the-profiles-it-is-told-with-one-connection-for-each)). Watch for: a client set up from the old entry keeps `--profiles all` until it is set up again; a
  server added by hand or with `mcp config` does not change.

### Fixed

- **`mcp serve` starts on a computer with no profile yet.** It lists its tools, and each call answers with the command
  that sets up a profile. Before, the server stopped at start, so a directory that checks servers could not list
  them. From cli-core 0.699.0.

## 0.2.0 — 17.11.2026

### Added

- **`deals create`, `update`, `move`, `close` and `delete` change deals in HubSpot, and the copy takes each answer.**
  `close` moves a deal to its pipeline's closed won or lost stage and keeps `--reason` as HubSpot's closed reason.
  `delete` archives the deal and asks first. See [usage](docs/usage.md).
- **`people create|update` and `organizations create|update` change contacts and companies.** A contact keeps one
  e-mail and two numbers, a company one number and no e-mail; a longer list is refused before anything is sent.
- **`api` offers HubSpot's writes and deletes too: 66 writes and 33 deletes of the CRM API, version 2026-03.** Each
  write checks `api.<command>` and its group's `<group>.write`, each delete its `<group>.delete`, and both ask by
  default. A write that does what a command does checks that command's key too (`deals.update`), a body that sets a
  deal's stage checks `deals.move` and `deals.close`, and one that sets an owner checks `crm.assign-others`, `deny` by
  default. `api contacts-gdpr-delete` also checks `people.erase`, to deny erasing alone. `--dry-run` names every key.
  See [settings](docs/configuration.md#permissions).
- **Write scopes are optional.** The setup and [installation](docs/installation.md#make-a-key) list
  `crm.objects.{deals,contacts,companies}.write`; without them the key only reads.

### Fixed

- **`api` sends the key with every operation.** HubSpot's object specs mark 115 operations as needing no sign-in, so
  in 0.1.0 `api deals-get`, `api contacts-list` and the other record operations went out without the key and HubSpot
  answered 401. The pipelines, properties, owners and account operations were not affected.

## 0.1.0 — 17.11.2026

### Added

- Started from `@wirecat/cli-template` 0.25.0.
- **`session start` signs a profile in with a HubSpot service key or a private app token.** The key is read hidden or
  from stdin, never as an argument, checked against the account, and kept in the keyring with the account's id. A
  second profile on the same account is refused. `WCHUBSPOT_TOKEN` works in CI beside `WCHUBSPOT_ACCOUNT`, the
  account's id. See [installation](docs/installation.md).
- **`sync` copies the account's CRM into WireCat's shared store.** Deals, contacts, companies, leads (Sales Hub
  Professional or Enterprise), owners, pipelines and properties, and the notes, calls, e-mails, meetings and tasks
  once the activities setting is on. `deals list`, `pipelines`, `changes list` and `search all` then answer offline. A
  key names no user, so every profile reads the whole copy: filter by `owner:<owner id>`, not `owner:me`.
- **`people`, `organizations` and `users` read contacts, companies and owners live from the account.**
- **`api` offers every read operation of HubSpot's CRM API, version 2026-03, from its 15 specs.** One command per
  operation, each with its own permission key. This release only reads: the API's writes are not offered, and
  `api show` on one says so.
- **A spent daily allowance ends the request at once and says when it comes back.** HubSpot shares one daily
  allowance among every app on the account. `hubspot` reports `hubspot.daily-limit` with the wait to the account's
  midnight, and stops every process on the account from asking again before then. The ten-second limit is waited
  out.
- **`WCHUBSPOT_ACCOUNT` is checked against `WCHUBSPOT_TOKEN` before anything is written.** A `sync` with an id of
  another account stops with `account.mismatch`, naming both ids, so one account's CRM is never filed under another's.
  `session status --check` with the token alone prints the id to set. See
  [troubleshooting](docs/troubleshooting.md).
