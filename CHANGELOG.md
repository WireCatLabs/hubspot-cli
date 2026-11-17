# Changelog

Notable changes to `@wirecat/hubspot-cli`. One section per version, newest first.

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
