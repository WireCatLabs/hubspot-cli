### Fixed

- **`mcp serve` starts on a computer with no profile yet.** It lists its tools, and each call answers with the command
  that sets up a profile. Before, the server stopped at start, so a directory that checks servers could not list
  them. From cli-core 0.699.0.
