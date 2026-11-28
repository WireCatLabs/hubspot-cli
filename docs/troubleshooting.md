# When something goes wrong

A command stopped with an error, a sync did not bring your deals, or the agent says it may not change a deal. Most of
these take one step to fix, and the error message names that step.

Find what you see in the list and do what it says. Your agent can do the same: each error carries a reason, such as
`session.expired`, so it knows what happened. If the problem stays, write to us with the error code and the command you
ran.

**On this page:**

1. [What happened](#what-happened)
2. [How to fix it](#how-to-fix-it)
3. [Check that it works](#check-that-it-works)
4. [Ask for help](#ask-for-help)
5. [Messages and what to do](#messages-and-what-to-do)

## What happened

- **The key stopped working.** Someone deleted or rotated the key in HubSpot, or it was mistyped.
- **A scope is missing.** The key was made without a scope that the command needs, such as the one for leads.
- **The profile does not allow it.** You, or a default setting, made this write "read only" or "refuse".
- **The daily allowance is spent.** Every app on the HubSpot account shares one daily number of requests.
- **The command has no profile.** Every command starts with the profile, the name you gave the account, such as `work`.

## How to fix it

1. Run `hubspot doctor`. It shows what is set up and lists every problem in the settings file. It needs no network
   and reads no keyring.
2. Run `hubspot work session status --check`. It asks HubSpot about the key and shows the account's id as `account`.
3. If HubSpot refused the key, make a new one and run `hubspot work session start` again, as
   [install and connect](installation.md#make-a-key) shows.
4. If a scope is missing, add the scope that the error names to the key in HubSpot. The key keeps working, and you do
   not sign in again.
5. If a write is refused, look at the profile's permissions with `hubspot work config show`, and change them as
   [permissions](permissions.md) shows.
6. For any other message, find it in [messages and what to do](#messages-and-what-to-do).

## Check that it works

Run `hubspot work session status --check`, then `hubspot work store status`. The first shows the account the key acts
for. The second shows how far each sync got and when it last ran. Then run the command that failed once more.

## Ask for help

Keep the error code and the profile name. `hubspot doctor reports create` writes a problem report to a file and says
where to send it. Ask on [Discord](https://discord.gg/DebENqbRrJ), or open an issue in the
[hubspot-cli repository](https://github.com/WireCatLabs/hubspot-cli/issues).

Never paste a key, a password or private content into a support request.

## Messages and what to do

| What you see | What to do |
| --- | --- |
| `hubspot` is not found | Open a new terminal, and check that npm's global folder is on `PATH`. Another tool may own the word `hubspot`, such as HubSpot's own Agent CLI: run `wcat-hubspot` instead. |
| "name a profile" | Put the profile first, as in `hubspot work config show`, or set `WCHUBSPOT_PROFILE`. |
| The settings file does not read | `doctor` lists every problem in the file under `config.issues`. Run the `config unset` each one gives, or fix the file by hand. |
| `doctor` lists `files.problems` | Other users of the computer can read `config.json` or enter its folder. Run each `chmod` that `doctor` prints after "to make it private:". `doctor` never changes a file mode itself. |
| "HubSpot refused the token" (`session.expired`) | The key was deleted, rotated or mistyped. Make a new one and run `hubspot work session start` again, as [install and connect](installation.md#make-a-key) shows. |
| "the token lacks the … scope" (`hubspot.scope-missing`) | Add the scope the error names to the key in HubSpot. The key keeps working, no new sign-in needed. |
| `WCHUBSPOT_TOKEN needs WCHUBSPOT_ACCOUNT` (`account.id-missing`) | Set `WCHUBSPOT_ACCOUNT` to the account's id beside the token. `hubspot work session status --check` with the token alone prints it as `account`. |
| `WCHUBSPOT_ACCOUNT names account …, but the token belongs to account …` (`account.mismatch`) | The id is another account's. Set `WCHUBSPOT_ACCOUNT` to the id the error names. Nothing was written. |
| "run `hubspot work sync` once with `WCHUBSPOT_TOKEN` first" (`account.unchecked`) | A command that reads only the local copy with `WCHUBSPOT_TOKEN` needs a checked one first. Run `hubspot work sync`, with your profile in place of `work`. |
| "already signs in to HubSpot account" (`session.duplicate`) | Another profile reads that account. Use that profile, or end its session first. |
| "spent its daily API allowance" (`hubspot.daily-limit`) | Every app on the account shares one daily allowance. It comes back at midnight in the account's time zone, and the error says in how many hours. `api` with `WCHUBSPOT_TOKEN` does not know the time zone: its error says to try again after a time in UTC, the earliest the allowance can be back. |
| `owner:me` finds nothing | A key names no user. Take the owner's id from `hubspot work users list` and filter by it, such as `owner:51234567`. |
| A write is refused | The profile's permissions or `WCHUBSPOT_READ_ONLY` stop it, as [permissions](permissions.md) shows. |
