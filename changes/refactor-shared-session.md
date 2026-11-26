### Changed — may break callers

- **hubspot is built on cli-core 2.0.0.** After its first run the store is at version 78, and only tools on cli-core
  2.0 open it: upgrade every WireCat CLI and WireCat Desktop on this computer together, and stop `serve`, `mcp` and
  syncs while it migrates. The migration keeps a rollback copy first. In `--json`, an agent that wrote a record is
  `type: "agent"` where it was `"bot"`, and a sender bot ref is `bot:<id>` where it was `sender-bot:<id>`.
- **`session` is cli-core's shared token session** (`@wirecat/cli-core` 2.0.0). The saved sign-ins stay as they are,
  so nobody signs in again. What a caller of `--json` sees:
  - `session start` and `session status` no longer answer `kind` (it was always `token`).
  - `session list` rows have `state` (`saved`, `missing` or `unknown`). A profile whose entry cannot be read is
    `state: "unknown"` with `signed_in: null`, and the cause goes to stderr as a warning, in place of an `error`
    field in the row.
  - `session status` without `--check` shows `account: null` for a malformed `WCHUBSPOT_ACCOUNT`; `--check` and every
    other command still refuse it with `account.id-malformed`.

### Fixed

- **A store another process holds is `store.busy`, not a crash** (cli-core 1.3.0): `conflict` (exit 15) in place of
  SQLite's raw `database is locked`.
- The first help screen names `hubspot session list`.
