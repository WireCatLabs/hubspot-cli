# Security

What WireCat CLIs share, such as the keyring, permissions, MCP and what never reaches a log, is on the
[shared security page](https://wirecat.dev/en/docs/security). This page keeps only what is particular to `hubspot`.

<!-- cspell:words hubapi -->

## The key

`session start` reads the service key or private app token hidden or from stdin, never as an argument. It asks
HubSpot which account the key belongs to (`GET /account-info/2026-03/details`), and only then keeps the key with the
account's id in the OS keyring, or in a file only you can read where no keyring works. The key goes only into the
`Authorization` header of a request to `api.hubapi.com`, never into an address, an answer, a run record or the send
journal. `hubspot` never sends it to HubSpot's token-information endpoint, which takes the token in its address.

The key reads what its scopes allow, for the whole account: give it read scopes only. `hubspot` cannot revoke it.
`session end` and `account remove` forget it on this computer, and after a leak you delete or rotate it in HubSpot.

## The copy

`sync` keeps the account's deals, contacts and companies, and the activities when you turn them on, in WireCat's local
store on your computer. [HubSpot's developer terms](https://legal.hubspot.com/developer-terms) ask that data be kept no longer than needed:
`hubspot work account remove --delete-data` deletes the account's copy and forgets the key.

## Text from the account

Names, property values, notes, e-mail addresses, phone numbers and links in an answer were written by other people.
Over MCP they reach the agent marked as untrusted, so it reads them as data, never as instructions.

## MCP over HTTP

`hubspot work mcp serve --http` listens on `127.0.0.1` only, for browser apps that reach it through your own tunnel.
Each app logs in with a one-time code, and the server keeps a hash of each login it gives, in the state folder,
readable by you only. `hubspot work mcp revoke` forgets every one of them.

## Run records and files

A run record keeps the command line as you typed it, with every secret stored as `[redacted]`. To keep none of the
words you type, run `hubspot work config set record_input false`.

`config.json` is saved readable by you only (`0600`), and its folder is created for you only (`0700`). `hubspot
doctor` lists a file or folder open to other users under `files.problems` and prints the `chmod` that fixes it.
Report a vulnerability as [SECURITY.md](https://github.com/WireCatLabs/hubspot-cli/blob/main/SECURITY.md) says.
