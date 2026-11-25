### Changed — may break callers

- **hubspot is built on cli-core 1.0.0 and cli-base 1.0.0.** After its first run the store is at version 73, and only
  tools on cli-core 1.0 open it: upgrade every WireCat CLI on this computer together. The migration keeps a rollback
  copy, and refuses to run when it cannot write one (`store migrate --no-backup` migrates anyway).
- **`sync --rescan` no longer lets a sync mark most of a kind deleted.** It only lists everything again. When the
  guard holds a pass, `sync --allow-deletions <count>` lets it mark at most that many records deleted. The flag is
  for the owner in a terminal; the MCP server does not offer it.
- **A sync no longer marks records deleted when HubSpot could not list a whole kind.** The id pass is held until a
  full list comes back.
- **An MCP call that names a refused folder answers `permission_error`**, not `validation_error`.
