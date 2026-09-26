# Training Sessions

Users can view, log (create), edit, and delete their own training sessions. Sessions share a common shell and diverge by sport via delegated types.

## Supported sports (status)

| Sport | Status |
| --- | --- |
| Running (`RunningTrainingSession`) | Implemented end-to-end (API + UI) |
| Cross training (`CrossTrainingSession`) | Implemented end-to-end (API + UI). Details: [`spec/cross_training_sessions/spec.md`](../cross_training_sessions/spec.md) |
| Strength (`StrengthTrainingSession`) | Model layer only; not user-facing yet |
| Supplementary (`SupplementaryTrainingSession`) | Named in `delegated_type` but unfinished — resolve with strength-training work, not ad hoc |

Future specific sports (e.g. cycling, swimming) may be added as additional delegated types. Until then, non-run work is logged as cross training.

## Shared session fields

Every training session has:

- `session_date` (required) and optional `session_time`
- Optional `duration_seconds` (stored in seconds; displayed as S, SS, M:SS, MM:SS, H:MM:SS, or HH:MM:SS). Duration is **not** always required: running and cross training allow **duration or distance** (at least one). Other sports may differ later.
- `location_type`: `indoor` \| `outdoor`
- Optional notes
- Belongs to a user (ownership enforced on all API actions)

### Future (specified, not implemented)

- Links to GPS watch data
- Weather for outdoor sessions (`TrainingSessionWeather`: temperature, humidity, free-form conditions with suggested options and backend normalization). Do not assume outdoor sessions collect weather in the UI/API yet.

## Validations

- Parent `duration_seconds`, when present, must be an integer **> 0**
- Most sport-specific numerics must be **> 0** when present
- **Elevation gain** may be **≥ 0** (non-negative) when present; clarify this exception when validating elevation
- Sport-specific rules live on the delegated models (see sport specs)

## Data model

`TrainingSession` uses ActiveRecord `delegated_type :sport_details` for:

- `RunningTrainingSession`
- `CrossTrainingSession`
- `StrengthTrainingSession`
- `SupplementaryTrainingSession` (placeholder — see status table)

Weather is a separate `TrainingSessionWeather` model associated to the parent session (implemented at the model/table layer; not wired through the training-sessions API/UI yet).

## API

Shared resource: `POST/GET/PUT/DELETE /api/v1/training_sessions` (scoped to the current user).

- **Create** uses `sport_details.kind` to instantiate the delegated type:
  - `running` → `RunningTrainingSession`
  - `cross_training` → `CrossTrainingSession`
  - Unknown kind → validation error (422) with pointer `#/training_session/sport_details/kind`
- **Update** does **not** change sport type. The persisted `sport_details_type` selects which attributes are applied; client-supplied `kind` / sport-details `id` are ignored for mutation.
- Clients may supply UUIDs for session and sport-detail ids on create (local-first ready).

## UI

- List, create, and edit share routes under `/training-sessions`
- Sport selector on create; on edit the sport is disabled with copy explaining the user must delete and recreate to change sport
- Sport-specific fields are conditional (running vs cross training panels)

## Related specs

- [`spec/running_training_sessions/spec.md`](../running_training_sessions/spec.md)
- [`spec/cross_training_sessions/spec.md`](../cross_training_sessions/spec.md) — activity required; optional distance / HR / elevation with units; duration-or-distance; elevation unit on CT only until shared concern #410
