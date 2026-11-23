### Added

- `activities create comment|task` adds a note or a task to a deal, a contact or a company, and `activities close`
  marks a task done, through cli-core's CRM activity writes. A note's and a task's text keeps its lines.

### Fixed

- `api notes-create`, `api tasks-create` and their batch creates also check `activities.create`, so denying it stops a
  note or a task on every path.
- The skill named a group `api-<object>` that does not exist; it names the four real groups and the ids a note on a
  deal takes.
