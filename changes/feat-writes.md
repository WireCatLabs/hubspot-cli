### Added

- **`deals create`, `update`, `move`, `close` and `delete` change deals in HubSpot, and the copy takes each answer.**
  `close` moves a deal to its pipeline's closed won or lost stage and keeps `--reason` as HubSpot's closed reason.
  `delete` archives the deal and asks first. See [usage](../docs/usage.md).
- **`people create|update` and `organizations create|update` change contacts and companies.** A contact keeps one
  e-mail and two numbers, a company one number and no e-mail; a longer list is refused before anything is sent.
- **`api` offers HubSpot's writes and deletes too: 66 writes and 33 deletes of the CRM API, version 2026-03.** Each
  write checks `api.<command>` and its group's `<group>.write`, each delete its `<group>.delete`, and both ask by
  default. A write that does what a command does checks that command's key too (`deals.update`), a body that sets a
  deal's stage checks `deals.move` and `deals.close`, and one that sets an owner checks `crm.assign-others`, `deny` by
  default. `api contacts-gdpr-delete` also checks `people.erase`, to deny erasing alone. `--dry-run` names every key.
  See [settings](../docs/configuration.md#permissions).
- **Write scopes are optional.** The setup and [installation](../docs/installation.md#make-a-key) list
  `crm.objects.{deals,contacts,companies}.write`; without them the key only reads.

### Fixed

- **`api` sends the key with every operation.** HubSpot's object specs mark 115 operations as needing no sign-in, so
  in 0.1.0 `api deals-get`, `api contacts-list` and the other record operations went out without the key and HubSpot
  answered 401. The pipelines, properties, owners and account operations were not affected.
