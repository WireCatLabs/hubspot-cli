# When something goes wrong

Get `hubspot` working again from the message it shows. A key that was revoked, a scope left out and a daily allowance
spent each have their own message and their own fix.

Find your symptom in the table and run the check beside it. Your agent can do the same: each error names its reason,
such as `session.expired`, so it knows what happened. Start with `hubspot doctor`, which shows what is set up and
needs no network.

**On this page:**

1. [Symptoms and what to do](#symptoms-and-what-to-do)
2. [Asking for help](#asking-for-help)

## Symptoms and what to do

| Symptom | What to do |
| --- | --- |
| Not sure what is set up | Run `hubspot doctor`. It reads no keyring and uses no network. |
| `hubspot` is not found | Open a new terminal, and check that npm's global folder is on `PATH`. Another tool may own the word `hubspot`: run `wcat-hubspot` instead. |
| "name a profile" | Put the profile first, as in `hubspot work config show`, or set `WCHUBSPOT_PROFILE`. |
| The settings file does not read | `doctor` lists every problem in the file under `config.issues`. Run the `config unset` each one gives, or fix the file by hand. |
| `doctor` lists `files.problems` | Other users of the computer can read `config.json` or enter its folder. Run each `chmod` that `doctor` prints after "to make it private:". `doctor` never changes a file mode itself. |
| "HubSpot refused the token" (`session.expired`) | The key was deleted, rotated or mistyped. Make a new one and run `hubspot work session start` again, as [install and connect](installation.md#make-a-key) shows. |
| "the token lacks the … scope" (`hubspot.scope-missing`) | Add the scope the error names to the key in HubSpot. The key keeps working, no new sign-in needed. |
| "already signs in to HubSpot account" (`session.duplicate`) | Another profile reads that account. Use that profile, or end its session first. |
| "spent its daily API allowance" (`hubspot.daily-limit`) | Every app on the account shares one daily allowance. It comes back at midnight in the account's time zone, and the error says when. |
| `owner:me` finds nothing | A key names no user. Filter by `owner:<owner id>` from `hubspot work users list`. |
| A write is refused | The profile's permissions or `WCHUBSPOT_READ_ONLY` stop it, as [settings](configuration.md#permissions) shows. |

## Asking for help

Keep the error code and the profile name. `hubspot doctor reports create` writes a problem report to a file and says
where to send it. Open an issue in the [hubspot-cli repository](https://github.com/WireCatLabs/hubspot-cli/issues).

Never paste a key, a password or private content into a support request.
