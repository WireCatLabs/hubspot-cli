### Added

- `sync --embed` indexes the copied notes, calls, meetings and tasks with a model already downloaded, and
  `search all` then finds deals and leads by what their activities mean, not only by their words (cli-core 0.743.0).
  The skill tells an agent to ask by meaning before it reads every note.

### Fixed

- `search all` lists a name one letter off the one that matched after it (Ferrara, then Ferraro), and finds a Latin
  name typed in Cyrillic (`феррара`), each marked `match: corrected`.
