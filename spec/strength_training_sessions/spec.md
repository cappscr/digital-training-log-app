---
title: strength training sessions
author: Chris Capps
status: ready for implementation
issues:
  - 376
  - 240 # parent
---

# Strength Training Sessions

Related intent: [`intent/strength_training_sessions/intent.md`](../../intent/strength_training_sessions/intent.md)  
Parent domain: [`spec/training_sessions/spec.md`](../training_sessions/spec.md)

## Summary

Athletes need to log strength work as a first-class training session — not as a tagged run or a catch-all cross-training row. Strength sessions reuse the shared `TrainingSession` shell (date/time, optional duration, indoor/outdoor, notes, ownership) and add a `StrengthTrainingSession` record via the existing delegated-type pattern, plus a list of `StrengthTrainingExercise` rows.

Much of the table layer already exists. This feature completes validations, nested exercise persistence (including order), serializers, seeds, and UI so customers can create, list, view, edit, and delete strength sessions and their exercises end-to-end.

Supplementary training is absorbed by strength. Remove `SupplementaryTrainingSession` from `delegated_type` (no table or model exists; it is a placeholder name only).

## Outcomes (acceptance)

A signed-in user can:

1. Choose **Strength Training** when logging a new training session.
2. Enter shared session fields. Duration is optional. Indoor/outdoor defaults to **indoor** on the form (DB default stays `outdoor`; do not migrate it).
3. Optionally enter average heart rate on the strength session.
4. Add one or more exercises: name, sets, reps, and either bodyweight, external weight (+ unit), or both.
5. See exercises persist in the order they appear in the form; the API stores that order explicitly.
6. See strength sessions in the training sessions list with a distinct icon, title, and volume (when computable).
7. Edit exercises (add, change, reorder via form order, remove) and edit/delete their own strength sessions.
8. Not create, read, update, or delete another user’s sessions.

Out of scope for this slice:

- Weather and tags.
- Moving average heart rate onto `TrainingSession` or a shared HR concern (keep HR on the strength sport-details row, matching running/CT).
- Changing sport type on edit (same rule as CT: disabled selector + delete-to-change copy).
- Per-set breakdowns, rest timers, RPE, laterality, supersets.
- Converting lbs ↔ kg.
- Drag-and-drop reorder (array order in the form is enough).
- Summaries / aggregation across sessions beyond the per-session volume load.
- Changing the database default for `location_type` (form-only defaults).
- GPS watch links.

---

## Domain model

### Relationship to parent `TrainingSession`

| Layer | Responsibility |
| --- | --- |
| `TrainingSession` | Ownership (`user`), `session_date`, `session_time`, `duration_seconds` (optional), `location_type`, `notes`, weather association |
| `StrengthTrainingSession` | Optional `average_heart_rate`; `has_many :exercises` |
| `StrengthTrainingExercise` | `name`, `sets`, `reps`, `bodyweight`, `weight`, `weight_units`, `position` |

`strength_training_sessions` currently has only timestamps. Add `average_heart_rate` (nullable integer).

`strength_training_exercises` already has name/sets/reps/weight/weight_units/bodyweight. Changes:

- Add `position` (integer, not null) — explicit order, unique per session.
- Change `weight` from integer to decimal with **1 decimal place** (e.g. `precision: 6, scale: 1`).

### Session fields

| Field | Required | Notes |
| --- | --- | --- |
| Parent `session_date` | Yes | Inherited. |
| Parent `session_time` | No | Inherited. |
| Parent `duration_seconds` | No | Optional. No duration-or-distance rule (strength has no distance). When present, parent rule still applies (integer > 0). |
| Parent `location_type` | Yes | `indoor` \| `outdoor`. Form default for this sport: `indoor`. |
| Parent `notes` | No | Free text. |
| `average_heart_rate` | No | Positive integer (bpm). |
| `exercises` | Yes | At least one. Destroyed with the session (`dependent: :destroy`). |

### Exercise fields

| Field | Required | Notes |
| --- | --- | --- |
| `id` | No | Client UUID allowed on create (local-first); DB default if omitted. |
| `name` | Yes | Free-text. Strip whitespace; reject blank. Max 100. |
| `sets` | Yes | Integer > 0. |
| `reps` | Yes | Integer > 0. |
| `bodyweight` | Yes | Boolean, default `false`. |
| `weight` | Conditional | Positive decimal; at most 1 decimal place. |
| `weight_units` | If weight present | `lbs` \| `kg`. Existing enum (`prefix: :weight_in`). Use `validate: { allow_nil: true }` so nil is allowed when there is no weight. |
| `position` | Yes (persisted) | Integer ≥ 1. Unique per `strength_training_session_id`. |

### Load rules (bodyweight vs weight)

Per exercise, **at least one** of the following must be true:

1. `bodyweight` is `true`, or
2. `weight` and `weight_units` are both present.

All three of these are valid:

| `bodyweight` | `weight` + units | Meaning |
| --- | --- | --- |
| `true` | absent | Bodyweight-only (push-ups, unweighted pull-ups) |
| `false` | present | Includes an external load (barbell squat) |

Invalid: `bodyweight: false` and no weight. Invalid: weight without units, or units without weight.

A **session** may mix bodyweight-only and weighted exercises. That is what the intent means by “an exercise can have both bodyweight and weighted sets in the same session.” One named movement done both ways is two rows (e.g. Pull-Ups bodyweight + Pull-Ups weighted), not a richer set schema.

### Order

The UI derives order from the form field array (top → bottom). The API must persist it:

- Client **should** send `position` (1-based).
- If `position` is omitted, assign `index + 1` from the submitted array.
- Query exercises `order(:position)`.
- On update, the submitted array is the full desired collection (see API).

Do not use array index in the DB as the only source of truth — `position` is a real column.

### Volume load (computed, not stored)

Session volume is derived, never a column.

```
volume = Σ (sets × reps × weight)
```

for exercises that have a `weight`. Bodyweight-only rows (no weight) are omitted. A bodyweight+weight row counts **external load only** (not body mass).

If those weighted rows do not all share the same `weight_units`, do **not** emit a single total (no lbs↔kg conversion). Serializer then omits `volume_load` / `volume_unit` (or returns them null).

When computable:

```json
"volume_load": 1230.0,
"volume_unit": "lbs"
```

### Validations (summary)

**`StrengthTrainingSession`**

1. `average_heart_rate` > 0 when present.
2. At least one exercise.
3. `validates_associated :exercises` (and copy child errors onto the session the same way `TrainingSession` copies `sport_details` errors, so pointers can include `exercises/0/name`).
4. `has_many :exercises, -> { order(:position) }, inverse_of: :session, dependent: :destroy, autosave: true`

**`StrengthTrainingExercise`**

1. `name` presence, max 100, strip before validate.
2. `sets` / `reps` integers > 0.
3. `weight` > 0 when present; at most 1 decimal place.
4. `weight_units` present iff `weight` present; inclusion `lbs` / `kg`.
5. Bodyweight-or-weight rule above (`validate` on the model).
6. `position` integer ≥ 1; uniqueness scoped to `strength_training_session_id`.

**Parent** unchanged except duration remains optional (already `allow_nil`). Do not add `DurationOrDistanceValidatable` to strength.

### Exercise name UX (not a closed enum)

Same pattern as cross-training activity: autocomplete / combobox, any string allowed.

Suggested starters (non-exhaustive):

- Squats
- Deadlifts
- Bench Press
- Overhead Press
- Pull-Ups
- Push-Ups
- Lunges
- Calf Raises
- RDLs
- Power Cleans
- Snatch

Store the string the user confirmed. No exercises table of canonical names in this slice.

### Supplementary training

Remove `SupplementaryTrainingSession` from `TrainingSession`’s `delegated_type` list. Update `training_session_spec` expected types. There is no model, factory, or table to drop.

---

## API

Same resource: `resources :training_sessions` under `/api/v1`. Extend the shared controller.

### Auth / ownership

Preserve existing rules (`require_login`, scope through `current_user.training_sessions`, never accept `user_id`, client UUIDs allowed).

- `kind: "strength_training"` selects `StrengthTrainingSession`. Unknown kind still 422 with pointer `#/training_session/sport_details/kind`.
- Update still cannot change `sport_details_type`. Ignore sport-details `id` / `kind` for mutation.
- Nested exercises are owned through the session; do not accept a `strength_training_session_id` from the client that points at another session.

### Request shape

`sport_details.kind` values:

| `kind` | Model |
| --- | --- |
| `running` | `RunningTrainingSession` |
| `cross_training` | `CrossTrainingSession` |
| `strength_training` | `StrengthTrainingSession` |

Align the client to `strength_training` (not `strength`) so it matches `cross_training` and the seed CSV `sport` column.

Create example:

```json
{
  "training_session": {
    "id": "<uuid>",
    "session_date": "2026-10-03",
    "session_time": "13:58",
    "duration_seconds": 2008,
    "location_type": "indoor",
    "notes": "Calf raises felt good",
    "sport_details": {
      "id": "<uuid>",
      "kind": "strength_training",
      "average_heart_rate": 97,
      "exercises": [
        {
          "id": "<uuid>",
          "name": "Calf Raises",
          "sets": 3,
          "reps": 12,
          "bodyweight": true,
          "position": 1
        },
        {
          "id": "<uuid>",
          "name": "Squats",
          "sets": 3,
          "reps": 6,
          "bodyweight": false,
          "weight": 185.5,
          "weight_units": "lbs",
          "position": 2
        }
      ]
    }
  }
}
```

### Update: full exercise list

The submitted `exercises` array is the **complete** collection after the save:

- Rows with an existing `id` belonging to this session are updated.
- Rows with a new client UUID (or no id) are created.
- Existing exercises whose ids are **absent** from the array are destroyed.
- Re-apply `position` from the payload (or array order).

Do not use a separate exercises resource in this slice. Add/remove happens inside the strength form and one PUT.

`params.expect` must permit a nested array, e.g. Rails 8:

```ruby
exercises: [[
  :id, :name, :sets, :reps, :bodyweight, :weight, :weight_units, :position
]]
```

Kind-aware permit lists: running/CT params must not be required on strength; strength must not permit distance/cadence/activity.

### Response shape

Add `StrengthTrainingSessionSerializer`:

- `id`, `average_heart_rate`, `volume_load`, `volume_unit`, `exercises`, `created_at`, `updated_at`

`StrengthTrainingExerciseSerializer` (or inline in the parent):

- `id`, `name`, `sets`, `reps`, `bodyweight`, `weight` (float / decimal), `weight_units`, `position`

Parent `TrainingSessionSerializer` already constantizes `"#{sport_details.class}Serializer"`. `sport_details_type` will be `"StrengthTrainingSession"`.

Copy exercise validation errors onto the parent with pointers like `#/training_session/sport_details/exercises/0/name`.

### Controller

Extend `build_sport_details` / `update_sport_details` with `when "strength_training"`. After building/assigning the session, assign nested exercises (build on create; sync collection on update) **before** `save!` so `autosave` and XOR validations see in-memory duration + exercises in one transaction.

Empty `exercises` → 422 (associated / custom “must have at least one exercise”).

### Error semantics

Keep problem+json 422 style. Missing sport_details still 400 via `expect`.

---

## Frontend

### Routes / pages

Reuse `/training-sessions`, `/training-sessions/new`, `/training-sessions/:id/edit`. No new routes.

### Types (`useTrainingSessions.ts`)

```ts
type StrengthTrainingExercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  bodyweight: boolean;
  weight: number | null;
  weight_units: 'lbs' | 'kg' | null;
  position: number;
};

type StrengthTrainingSession = {
  id: string;
  average_heart_rate: number | null;
  volume_load: number | null;
  volume_unit: 'lbs' | 'kg' | null;
  exercises: StrengthTrainingExercise[];
};

type SportDetailsType =
  | 'RunningTrainingSession'
  | 'CrossTrainingSession'
  | 'StrengthTrainingSession';
```

Discriminate on `sport_details_type`. `formatSportName` currently defaults to `"Cross Training"` — add an explicit `StrengthTrainingSession` → `"Strength Training"` branch or strength cards will be mislabeled.

### Form

1. Enable Strength Training on `SportSelectorField` (`value: 'strength_training'`).
2. Discriminated Zod union: add a strength branch.
   - Shared date/time/notes/duration (duration optional; **no** duration-or-distance refine).
   - `average_heart_rate` optional, positive integer.
   - `exercises`: array min 1.
   - Per exercise: name (trim, 1–100), sets/reps integers > 0, `bodyweight` boolean, weight optional positive with 1 decimal refine, `weight_units` required iff weight present, refine bodyweight-or-weight.
3. `StrengthFields` + `useFieldArray`: add exercise, remove exercise (keep at least one row in the UI, or allow zero rows and let Zod fail).
4. Exercise name: reuse the CT autocomplete pattern (`CrossTrainingActivityField` as a model; new `StrengthExerciseNameField` with the suggestion list).
5. Weight row: checkbox or toggle for bodyweight; number + unit (`lbs` / `kg`) when they enter load. Both can be set.
6. Conditional panels: `{sport === 'strength_training' && <StrengthFields />}`. Hide distance, pace, elevation, cadence, activity.
7. Submit: `kind: 'strength_training'`; mint UUIDs for the session, sport details, and each new exercise; send `position` from array index + 1; `weight: null` when cleared.
8. Edit: prefill exercises sorted by `position`; sport selector disabled.
9. **Location defaults (form only)**  
   - New running session: `outdoor` (current).  
   - New strength or cross training: `indoor`.  
   - `defaultsForSport` / sport-change reset should set `indoor_or_outdoor` to that sport’s default (strength/CT → indoor, running → outdoor).

### List card

1. Icon: `Dumbbell` in the existing circular badge (`TrainingSessionSportIcon`). Do not reuse `SportShoe` or CT `Activity`.
2. Title: `Indoor Strength Training` / `Outdoor Strength Training` via `getTrainingSessionTitle` + `formatSportName` (no activity string).
3. Numeric column: `volume_load` + `volume_unit` when present; else duration; if both, volume primary and duration secondary.
4. Metric chips: HR when present. No elevation/cadence. Optional tertiary: exercise count (not required).
5. Edit/delete unchanged.

### Empty / copy

Shared empty state and generic toasts. No strength-only empty list.

### Design

Follow [`.agents/skills/design/SKILL.md`](../../.agents/skills/design/SKILL.md): semantic tokens, numeric column `font-numeric`, labels secondary to values, default submit / outline cancel. Exercise rows should align columns (name, sets, reps, load) the same way other repeating rows do — fixed-width slots for trailing remove actions.

---

## Seeds & fixtures

`backend/db/seeds/training_sessions.csv` already has `sport=strength_training` (row 96: indoor, duration, HR 97, notes about calf raises). `seeds.rb` currently `next`s unknown sports.

1. Branch on `strength_training` like running/CT.
2. Build `StrengthTrainingSession` with `average_heart_rate` from the CSV; UUID via `seed_id("strength_training_session", row["id"])`.
3. CSV has no exercise columns. For this existing row, seed one documented heuristic exercise: name `"Calf Raises"`, bodyweight `true`, sets/reps a small default (e.g. 3×12), `position` 1, UUID `seed_id("strength_training_exercise", "#{row["id"]}:1")`.
4. Do not invent a general exercise CSV format in this slice unless more strength rows show up.

Factories: keep `:strength_training` on `TrainingSession` (already sets `location_type: indoor`). Add exercise traits as needed so the parent session + one valid exercise is the usual happy path. After “at least one exercise” validation, the bare `:strength_training_session` factory should create (or build) at least one exercise so `create(:training_session, :strength_training)` stays valid.

---

## Tests

### Backend

- Exercise model: name/sets/reps; weight 1 decimal; units iff weight; bodyweight-only; weighted-only; bodyweight+weight; invalid neither; position uniqueness per session.
- Session model: HR bounds; at least one exercise; volume omits bodyweight-only; volume nil when units mixed; exercises destroyed with session; ordered by position.
- Request: create strength happy path; create with zero exercises → 422; create unknown kind still 422; index includes strength for current user only; show/update/destroy ownership 404; update replaces exercise list (add/remove/reorder); update cannot change kind; nested error pointer for invalid exercise.
- Serializer: exercises + volume fields.

### Frontend

- Schema: strength duration-only and duration-blank both allowed when exercises valid; reject empty exercises; reject neither-bodyweight-nor-weight.
- `formatSportName` / `getTrainingSessionTitle` for strength.
- Payload builder includes `kind: 'strength_training'` and positions.

---

## Implementation checklist (handoff)

### Backend

1. Remove `SupplementaryTrainingSession` from `delegated_type`; fix the types spec.
2. Migrate: `average_heart_rate` on `strength_training_sessions`; `position` on exercises (backfill existing rows if any); `weight` → decimal scale 1.
3. Validations + volume method + nested assign/autosave.
4. Serializers.
5. Controller kind + strong params + exercise sync on create/update.
6. Seeds for `strength_training` CSV rows.
7. Model + request specs.

### Frontend

1. Sport option + indoor default for strength and CT.
2. Discriminated schema, `StrengthFields`, name autocomplete, field array.
3. Types, payload, card icon/title/volume, `formatSportName`.
4. Tests under `frontend/tests/`.

### Docs

1. Keep this file as the living design for strength.
2. Apply the parent-spec edits below.

---

## Required edits to `spec/training_sessions/spec.md`

1. **Status table** — Strength is specified here and becomes implemented end-to-end after this work. Remove the Supplementary row (resolved: absorbed by strength; placeholder type deleted).
2. **Delegated types list** — Drop `SupplementaryTrainingSession`.
3. **Duration** — Strength allows optional duration with **no** distance alternative; running/CT stay duration-or-distance.
4. **API kinds** — Add `strength_training` → `StrengthTrainingSession`.
5. **UI** — Sport panels include strength; form default indoor for strength and cross training.
6. **Related specs** — Pointer to this file.

### Related note for `spec/cross_training_sessions/spec.md`

The CT “out of scope” bullet that deferred Supplementary to strength is done once this ships. Indoor form default for CT is specified here (form only).

---

## Areas of concern / decisions locked in this spec

1. **API kind** is `strength_training`, not `strength`.
2. **At least one exercise** is required in API and UI.
3. **Mixed load** is per session (and optionally on one row: bodyweight + weight). Not a per-set schema.
4. **Volume** uses external weight only; mixed units → no combined total.
5. **Exercise sync on PUT** is replace-by-full-list (destroy omitted ids).
6. **HR** stays on `StrengthTrainingSession` for this slice.
7. **Indoor default** is form-only; also applied to cross training when selecting that sport.
8. **`formatSportName` default must not stay “Cross Training”** once a third sport exists.
