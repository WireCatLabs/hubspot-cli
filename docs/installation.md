# Install

Install `hubspot` once on each computer where you or an agent use it. You need Node.js 22.16 or a later 22.x, or 24 or
later. Node 23 is not supported.

```sh
npm install -g @wirecat/hubspot-cli
hubspot --version
hubspot doctor
```

`doctor` needs no network and opens no keyring. It shows the version, where settings live, the profiles that exist,
and whether other users of the computer can read the settings.

## Make a key

`hubspot` signs in with a key that belongs to one HubSpot account. A super admin, or a user with HubSpot's
**Developer tools access** permission, makes it once
([HubSpot's guide](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/account-service-keys)):

1. Open **Development**, then **Keys → Service keys** in the left menu. Some accounts show it under **Settings →
   Integrations → Service keys** instead.
2. Click **Create service key** and name it *WireCat*.
3. Click **Add new scope**, tick each scope in the table below, and click **Update**. A key gets only the scopes its
   maker has.
4. Click **Create** and confirm.
5. Click the key's name, then **Show** and **Copy**. The key starts with `pat-`.

HubSpot stopped new private apps on 26 October 2026
([HubSpot's notice](https://developers.hubspot.com/changelog/legacy-private-app-creation-sunset)). An existing private
app's access token still works: give the app the same scopes and copy the token from its **Auth** tab.

Give it read scopes only ([HubSpot's list of scopes](https://developers.hubspot.com/docs/apps/legacy-apps/authentication/scopes)):

| Scope | What it reads |
| --- | --- |
| `crm.objects.contacts.read`, `crm.objects.companies.read`, `crm.objects.deals.read` | contacts, companies and deals |
| `crm.objects.owners.read` | the owners deals are assigned to |
| `crm.schemas.contacts.read`, `crm.schemas.companies.read`, `crm.schemas.deals.read` | the properties of each |
| `crm.objects.notes.read`, `crm.objects.calls.read`, `crm.objects.emails.read`, `crm.objects.meetings.read`, `crm.objects.tasks.read` | activities |
| `crm.objects.leads.read` | leads, on Sales Hub Professional or Enterprise only |
| `tickets` | tickets, through `api` only |

A scope you leave out fails only the commands that need it, with the scope named in the error.

## Sign in

Pick a profile name for the account, such as `work`, and paste the key when asked:

```sh
hubspot work session start
```

The key is read hidden, or from stdin (`hubspot work session start < key.txt`), never as an argument. `hubspot` asks
HubSpot which account the key belongs to, and keeps the key with the account's id in the system keyring, or in a file
only you can read with `--credential-storage file`. A second profile on the same account is refused.

`hubspot work setup` asks the same questions step by step. WireCat Desktop shows the same steps: it draws them from
one JSON document the CLI prints, `hubspot work setup show --json`, in English, Spanish or Russian.

`WCHUBSPOT_TOKEN` in the environment takes the place of the saved key for every profile, as in CI. Set
`WCHUBSPOT_ACCOUNT` beside it to the account's id: `hubspot work session status --check` with the token alone prints it
as `account`. Every command that reaches HubSpot checks the id against the token first. A command that reads only the
local copy needs one such command, such as `sync`, to have run before. `api` does not learn the account's time zone
this way, so its spent daily allowance says to try again after a time in UTC, the earliest it can be back.

Next: [use it](usage.md).
