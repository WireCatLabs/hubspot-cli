### Fixed

- A won or lost deal's closed day is HubSpot's close date (`closedate`), not the day the copy last saw the deal
  change. A deal won months ago no longer counts as won in the month of the first sync, and `deals show` gives the
  same day as `close_date` and `closed_date`.
