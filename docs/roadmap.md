# Roadmap

This page lists what is planned for `hubspot` and not done yet. Read it before you build a workaround for a missing
feature: it may already be on the way. The order can change, and there are no dates. To suggest something, open an
[issue on GitHub](https://github.com/WireCatLabs/hubspot-cli/issues).

## What works today

`hubspot` signs in to a HubSpot account with a service key or the token of a private app. It copies the pipelines, the
deals and leads with their contacts and companies, and the activities when you turn them on, into the local store on
your computer. You and your agent read that copy offline, see what changed since yesterday, get a morning digest, and
change deals, contacts and companies within the permissions you set, over the command line or MCP. Every operation of
HubSpot's CRM API is a command of its own. See [start here](index.md).

## Next

- Sign in as yourself in the browser, so `hubspot` acts with your own HubSpot user's rights and `owner:me` finds your
  deals. Today the key belongs to the account.
- Connect HubSpot in WireCat Desktop. Today `hubspot work setup` asks the same questions.

What changed in each released version is in the [changelog](../CHANGELOG.md).
