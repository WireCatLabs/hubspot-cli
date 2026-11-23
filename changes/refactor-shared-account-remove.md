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
