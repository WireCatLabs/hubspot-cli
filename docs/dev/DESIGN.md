# hubspot — design

Written by `npx @wirecat/cli-template new`. The agent reads it first, asks the further questions the reference CLI
does not answer, and starts building only after the owner has read it.

## Answers

- **Category:** CRM (sales: deals, contacts, companies)
- **Content languages:** en, es, ru
- **Sign-in:** an API token or key
- **The API:** official API documentation only
- **API description:** OpenAPI 3.0 or 3.1
- **How people filter:** by time, by person, by status or label, by words in the text
- **Never in the store, a log or the output:** tokens and passwords
- **Untrusted input:** deals, contacts and comments others entered, names and titles set by others, links

## Reference CLI

Learn from [bitrix24-cli](https://github.com/WireCatLabs/bitrix24-cli).

## Content languages

Languages: en, es, ru.

## Further answers

Decided 2026-11-17 with the plan in cli-private `plans/2026-11-16-cli-factory/hubspot-plan.md`.

- **Same shape as amo-cli and bitrix24-cli.** `session`, `account`, the shared CRM commands from cli-core's
  `addCrmCommands` only, `api` from the spec, `schedule`, `setup`. No command of hubspot's own repeats one of them.
- **Read only in the first release, `api` included (NEED-1 → A, 2026-11-17).** `addCrmCommands` gets no `writes`,
  and the api group offers only the operations whose effect is `read`; `api show` names a write as left for a later
  release. Search and `batch/read` POSTs are reads.
- **Sign-in:** a service key or a legacy private app token, hidden or on stdin, checked with
  `GET /account-info/2026-03/details` (never `/oauth/v1/access-tokens/{token}`, which puts the token in the address).
  The keyring entry keeps the token with `portalId` and `uiDomain`. OAuth is a later slice.
- **The account is the portal id.** The store's account key is `{ provider: "hubspot", account: "<portalId>" }`. A
  second profile signing in to the same portal is refused (`session.duplicate`), so one copy is never synced twice.
- **No user.** A key belongs to the account: the source has no `self`, the copy is the whole account, and every
  profile reads all of it offline (`user: null`). `owner:me` names nobody; the docs say to use `owner:<owner id>`.
- **`WCHUBSPOT_TOKEN`** needs `WCHUBSPOT_ACCOUNT`, the portal id, as amo's `AMO_TOKEN` needs `AMO_HOST`
  (`account.id-missing` without it). A CRM command that reaches HubSpot (its effects say `remote`) asks once whose
  token it is, on a transport of its own, refuses a mismatch (`account.mismatch`) before the store opens, and keeps
  the answer's time zone for the daily limit. A command that stays on this computer asks nothing and takes the
  account the store saved for the profile after a checked run (`account.unchecked` when none or another).
  `session status --check` works with the token alone, to find the id. `api` and the CRM commands share the
  account's pace file; `api` has no time zone with the token, so its spent daily limit names the earliest UTC time it
  can be back.
- **No `hs` alias** in the store's provider registry: `hs` is HubSpot's own CLI.
- **Leads** are mounted; an account without Sales Hub Professional answers 403 for them, which the source reports.
- **Tickets** only through `api` (owner's decision 4 in the research).

## Open questions for the owner
