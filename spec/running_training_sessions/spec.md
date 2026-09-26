# Running Training Sessions

Running training sessions consist of:

- A distance
- Elevation gain (optional) with a unit of `ft` or `m` when a gain is present
- Zero or more types
  - Workout (meaning high intensity session like intervals or threshold)
  - Long Run (for running workouts)
  - Race
- An average HR (optional)
- An average cadence (optional)
- A tag (optional)
  - Treadmill
  - Strides
  - Cross Training
  - Run Club

## Validations

Create a shared concern for distance or duration validations. Either a duration or distance must be supplied for a RunningTrainingSession (and a CyclingTrainingSession or a SwimmingTrainingSession in the future).

All numeric values need to be positive. Elevation gain is the exception: when present it is an integer greater than or equal to 0.

Elevation gain and unit are shared with cross training through `ElevationGainValidatable`. `elevation_unit` (`ft` or `m`) is required when `elevation_gain` is present. The app does not convert between units. Existing running rows that already had an elevation gain are backfilled to `ft`.

## Data Model

Uses delegated types with a parent TrainingSession model and then RunningTrainingSession is the inheritance for specific sport class

Create separate models, tables, and associations for RunningTrainingSessionTypes and RunningTrainingSessionTags

`running_training_sessions.elevation_unit` stores `ft` or `m`.
