### Added

- **WireCat Desktop reads hubspot's sign-in and MCP port from hubspot itself.** The manifest
  (`hubspot --wcat-describe`) now names the MCP server's port, 8758, and the sign-in Desktop runs: a service key or
  access token, typed on stdin. Built on `@wirecat/cli-base` 1.2.0.
