### Fixed

- **Notes, meetings and tasks read as clean text.** HTML codes such as `&#8217;` and `&mdash;` become the characters
  they stand for, and style blocks are left out, so search finds the words. Before, only six codes were decoded.
- **HubSpot's daily limit says "do not retry" on every path.** The CRM commands called it retryable while `api` did
  not, so an agent could retry for hours.
- **`session start --help` no longer says hubspot changes nothing.** Writes shipped in 0.2.0.
