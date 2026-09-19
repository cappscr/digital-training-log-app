# Training Sessions

Users should be able to view, log (create), edit, and delete (their own) training sessions in the app. There are several types of training sessions that should be supported: running, (a generic) cross training, strength training, and supplementary training. Support for other specific sports could be added in the future including cycling and swimming.

Training sessions consist of:

- A duration (stored in seconds displayed in S, SS, M:SS, MM:SS, H:MM:SS, or HH:MM:SS)
- Is either indoors or outdoors
- Notes (or comments)

- Belongs to a user
- May have many links to GPS watch data
- May have associated weather data

Outdoor training sessions can include:

- A temperature
- A humidity
- Conditions – this should be a free-form text field but provide some standard options. Data should be normalized on the backend before saving

## Validations

All numeric values need to be positive

## Data Model

Use delegated types with a base TrainingSession model and then inheritance for specific sport TrainingSessions like RunningTrainingSession, CrossTrainingSession, StrengthTrainingSession, SupplementaryTrainingSession

Create a separate model and association for Weather Conditions, which will be associated to outdoor workouts
