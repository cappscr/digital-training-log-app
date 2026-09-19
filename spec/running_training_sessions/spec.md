# Running Training Sessions

Running training sessions consist of:

- A distance
- Elevation gain (optional)
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

All numeric values need to be positive

## Data Model

Uses delegated types with a parent TrainingSession model and then RunningTrainingSession is the inheritance for specific sport class

Create separate models, tables, and associations for RunningTrainingSessionTypes and RunningTrainingSessionTags
