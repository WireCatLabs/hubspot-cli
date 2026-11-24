### Changed — may break callers

- **`activities create --subject person:<n>` and `organization:<n>` name the record by its ref, as `deals show` gives
  it.** A contact or company by HubSpot's id, as `people list` prints it, is now `person:crm:<id>`. Before, the same
  form meant HubSpot's id, so a ref copied from `deals show` put the note on someone else's contact.
