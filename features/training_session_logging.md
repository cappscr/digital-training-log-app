# Training Sessions

Users should be able to view, log (create), edit, and delete (their own) training sessions in the app. There are several types of training sessions that should be supported: running, (a generic) cross training, strength training, and supplementary training. Support for other specific sports could be added in the future including cycling and swimming.

Training sessions consist of:
- A duration (stored in seconds displayed in HH:MM:SS)
- Is either indoors or outdoors

Running training sessions consist of:
- A distance
- Elevation gain (optional)
- Zero or more types
  - Workout (meaning high intensity session like intervals or threshold)
  - Cross Training
  - Long Run (for running workouts)
  - Race
- An average HR (optional)
- An average cadence (optional)
- A tag (optional)
  - Treadmill
  - Strides

Outdoor training sessions can include:
- A temperature
- A humidity

## Validations

Create a shared concern for distance or duration validations. Either a duration or distance must be supplied for a RunningTrainingSession (and a CyclingTrainingSession or a SwimmingTrainingSession in the future).

All numeric values need to be positive

## Data Model

Use delegated types with a base TrainingSession model and then inheritance for specific sport TrainingSessions like RunningTrainingSession, CrossTrainingSession, StrengthTrainingSession, SupplementaryTrainingSession

Create a separate model and association for Weather Conditions, which will be associated to outdoor workouts

Create separate models, tables, and associations for RunningTrainingSession types and RunningTrainingSessionTags