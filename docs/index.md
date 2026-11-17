# hubspot

`hubspot` reads a HubSpot account's CRM from the terminal, from scripts and from AI agents. `sync` copies the deals,
contacts and companies into WireCat's local store, so lists, the pipeline and `search all` answer offline. Contacts,
companies and owners are also read live. `api` offers every operation of HubSpot's CRM API, version 2026-03, each
with its own permission. Deals, contacts and companies are created and changed with their own commands, behind the
owner's permissions, and only when the key has the write scopes.

It has the commands every WireCat CLI shares: `doctor`, `commands`, `config`, `setup`, `skill`, `mcp`, `runs`,
`schedule` and `upgrade`, and the CRM commands every WireCat CRM CLI shares: `sync`, `store status`, `deals`, `leads`,
`pipelines`, `stages`, `fields`, `activities`, `changes`, `people`, `organizations`, `users` and `search all`.
Start with [installation](installation.md), then [usage](usage.md).
