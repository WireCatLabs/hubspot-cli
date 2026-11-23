### Fixed

- **`account remove` and `account rename` of a profile that does not exist fail the same way, with
  `profile.unknown`.** They answered with two different reasons for one failure (cli-core 0.721.0).
