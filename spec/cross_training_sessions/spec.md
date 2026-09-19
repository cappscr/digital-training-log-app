---
title: cross training sessions
author: Chris Capps
status: ready for implementation
issues:
  - 375
  - 240 # parent
  - 410 # shared elevation gain + unit (running follow-up)
---

# Cross Training Sessions

Related intent: [`intent/cross_training_sessions/intent.md`](../../intent/cross_training_sessions/intent.md)  
Parent domain: [`spec/training_sessions/spec.md`](../training_sessions/spec.md)

## Summary

Athletes need to log non-running sessions (bike, aqua jogging, elliptical, uphill treadmill, yoga, etc.) as first-class training sessions — not as tagged runs. Cross training sessions reuse the shared `TrainingSession` shell (date/time, duration, indoor/outdoor, notes, ownership) and add a sport-specific `CrossTrainingSession` record via the existing delegated-type pattern.

Much of the data model already exists. This feature completes the API, validations, serializers, seeds, and UI so customers can create, list, view, edit, and delete cross training sessions end-to-end.

## Outcomes (acceptance)

A signed-in user can:

1. Choose **Cross Training** when logging a new training session.
2. Enter a required **activity** (what they did) plus shared session fields.
3. Optionally enter distance (+ unit), elevation gain (+ unit), and average heart rate when relevant.
4. See cross training sessions in the training sessions list with correct sport labeling and metrics.
5. Edit and delete their own cross training sessions (same ownership rules as running).
6. Not create, read, update, or delete another user’s sessions.

Out of scope for this slice:

- Extracting elevation gain + unit into a shared concern and applying it to running (#410; CT implements `elevation_unit` on `cross_training_sessions` only for now).
- Strength training and supplementary training (including any decision about the unfinished `SupplementaryTrainingSession` delegated type — that belongs with strength training, not CT).
- Cycling/swimming as distinct sport types (beyond enabling the cross-training catch-all path).
- Weather capture UI/API (still specified on the parent domain; not wired for any sport yet).
- GPS watch links.
- Changing sport type on edit (e.g. converting a run into cross training). Create as the chosen sport; edit stays within that sport. Disabled sport select should show a tooltip telling the user to delete the session if they want a different sport.
- Summaries / aggregation of cross training volume.
- Coaching/share views.
- Tags (including any future “cross training” tag on other sports).

---

## Domain model

### Relationship to parent `TrainingSession`

Cross training is one delegated sport type under `TrainingSession`:

| Layer                  | Responsibility                                                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `TrainingSession`      | Ownership (`user`), `session_date`, `session_time`, `duration_seconds`, `location_type`, `notes`, weather association                  |
| `CrossTrainingSession` | Activity-specific fields: `activity`, optional `distance` / `distance_unit`, `elevation_gain` / `elevation_unit`, `average_heart_rate` |

Table `cross_training_sessions` already exists (string UUID PK) with most of these columns. **Add a migration for `elevation_unit`** (`ft` \| `m`); distance unit already exists.

### Fields

| Field                     | Required             | Notes                                                                                                                                               |
| ------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activity`                | Yes                  | Free-text name of the activity. Paper-journal flexibility: do not constrain to a fixed DB enum. Normalize with strip; reject blank. Max length 100. |
| `distance`                | No                   | Positive decimal; at most 2 decimal places (matches running / existing `precision: 5, scale: 2`).                                                   |
| `distance_unit`           | If distance present  | `mi` or `km` via shared `DistanceValidatable`.                                                                                                      |
| `elevation_gain`          | No                   | Non-negative integer.                                                                                                                               |
| `elevation_unit`          | If elevation present | `ft` or `m` (selectable in UI; new column on `cross_training_sessions`).                                                                            |
| `average_heart_rate`      | No                   | Positive integer (bpm).                                                                                                                             |
| Parent `duration_seconds` | Conditionally        | See validations.                                                                                                                                    |
| Parent `session_date`     | Yes                  | Inherited.                                                                                                                                          |
| Parent `location_type`    | Yes                  | `indoor` \| `outdoor`.                                                                                                                              |
| Parent `notes`            | No                   | Free text.                                                                                                                                          |

### Validations

Mirror running where the metrics overlap; add activity rules unique to this sport:

1. **`activity`**: presence, max 100 characters, strip whitespace before validate/save.
2. **Reuse `DistanceValidatable`** on `CrossTrainingSession`.
3. **Reuse `DurationOrDistanceValidatable`**: either parent `duration_seconds` or `distance` must be present (same rule as running). Rationale: some sessions are time-only (yoga, mobility); some are distance-oriented (bike, uphill treadmill) like the seed data.
4. Numeric positivity: distance > 0; elevation_gain ≥ 0; average_heart_rate > 0 when present (align elevation with running’s `greater_than_or_equal_to: 0`). Require `elevation_unit` when `elevation_gain` is present.
5. Parent `TrainingSession` rules unchanged (`session_date` required; `duration_seconds` integer > 0 when present).

### Activity UX (not a closed enum)

Product ethos ([`spec/product/spec.md`](../product/spec.md)): flexible manual entry, not GPS-constrained.

- UI: text input for activity, with **suggested** options presented as a combobox / select-with-custom-value (or datalist-style suggestions). Suggested starters (non-exhaustive): Aqua Jogging, Uphill Treadmill, Elliptical, Bike, Rowing, Swim, Yoga, Hiking, Other.
- Backend: store the string the user confirmed; do not reject unknown activities.
- Do **not** add a separate activities table in this slice.

### Seed CSV mapping (not a product collision)

The spreadsheet used for seeds historically labeled non-run rows with `session_type=cross_training` (and sometimes `tags=treadmill`). That was **import vocabulary**, not “a run with a cross_training tag.”

| Spreadsheet / seed signal                | Means                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Sport/type column value `cross_training` | Create a `CrossTrainingSession` (delegated sport details)                                              |
| `tags=treadmill` on those rows           | Seed hint only (e.g. `location_type=indoor`, activity default) — **not** a `RunningTrainingSessionTag` |

`RunningTrainingSessionTag` also happens to define a `cross_training` enum value in code. That is unrelated to these seed rows and **out of scope** for this feature (tags generally are). Do not create running tags when importing CT sessions.

As part of the seed work, **rename CSV headers** so the file matches the importer:

- Prefer `sport` (or `sport_details_type`) over overloaded `session_type`.
- Prefer an explicit `location_type` (and/or `activity`) on CT rows instead of overloading `tags`.
- Keep `running_tags` (or similar) only for actual running sessions when tags are seeded later.

Factory examples (`"Uphill Treadmill"`, `"Aqua Jogging"`) remain valid `activity` strings on `CrossTrainingSession`.

### Weather, GPS, tags/types

- Weather remains a parent `TrainingSession` concern (outdoor). Not implemented in API/UI for any sport; do not block cross training on weather.
- No cross-training-specific tags/types tables (unlike running). Activity string covers categorization for v1.
- No cadence field (not in schema).
- Tags on other sports (including a future “cross training” tag meaning) are out of scope; see intent.

---

## API

Routes already exist: `resources :training_sessions` under `/api/v1`. Extend the shared controller rather than adding a separate resource.

### Auth / ownership (security)

Existing patterns to preserve:

- `before_action :require_login` on create/index/show/update/destroy.
- Scope all reads/writes through `current_user.training_sessions` (or equivalent `where(user_id: current_user.id)`).
- Never accept `user_id` from the client on create/update; always assign from `current_user`.
- Client-generated UUIDs are allowed for `id` and nested sport `id` (local-first ready); DB defaults cover missing IDs.

Additional requirements for this slice:

- `kind` (or equivalent) in `sport_details` must select the correct delegated type. Reject unknown kinds with 400/422 — do not silently create a running session.
- On update, do **not** allow changing `sport_details_type` / `kind`. Ignore or 422 if the client sends a different kind than the persisted type.
- Strong params must permit cross-training fields (`activity`, and shared metric fields) without permitting mass-assignment of associations that bypass ownership.

There is no separate security skill/policy doc in-repo; follow these ownership and param rules as the security bar for this feature.

### Request shape

`sport_details.kind` values (normalize API to snake identifiers):

| `kind`           | Model                    |
| ---------------- | ------------------------ |
| `running`        | `RunningTrainingSession` |
| `cross_training` | `CrossTrainingSession`   |

(Frontend may continue to use a short label like `run` internally, but the API contract should be consistent — pick one mapping and document it in the client. Prefer aligning the client to `running` / `cross_training` to match request specs and avoid `run` vs `running` drift.)

Create example:

```json
{
  "training_session": {
    "id": "<uuid>",
    "session_date": "2026-09-18",
    "session_time": "16:05",
    "duration_seconds": 2400,
    "location_type": "indoor",
    "notes": "Felt good",
    "sport_details": {
      "id": "<uuid>",
      "kind": "cross_training",
      "activity": "Uphill Treadmill",
      "distance": 2.67,
      "distance_unit": "mi",
      "elevation_gain": 1936,
      "average_heart_rate": 153
    }
  }
}
```

### Response shape

`TrainingSessionSerializer` already constantizes `"#{sport_details.class}Serializer"`. Add `CrossTrainingSessionSerializer` with:

`id`, `activity`, `distance` (float), `distance_unit`, `elevation_gain`, `average_heart_rate`, `created_at`, `updated_at`

Parent serializer fields unchanged. `sport_details_type` will be `"CrossTrainingSession"`.

### Controller changes

`TrainingSessionsController#create` currently hard-codes `RunningTrainingSession.new(...)`. Replace with a kind → class factory (e.g. case/when or small private method). Apply the same permitted attributes for update, scoped to fields valid for the **existing** sport type.

Permit `activity` in create/update sport_details params. Cadence remains running-only (permit only when kind is running, or permit broadly but ignore on cross training — prefer kind-aware permitting to avoid silent data loss surprises).

### Error semantics

Keep existing JSON error style (422 with pointer into `#/training_session/...` / `#/training_session/sport_details/...`). Activity presence errors should point at `sport_details/activity`.

---

## Frontend

### Routes / pages

Reuse existing routes — no new pages:

- `/training-sessions` — list
- `/training-sessions/new` — create
- `/training-sessions/:id/edit` — edit

### Types (`useTrainingSessions.ts`)

Widen the model:

```ts
type SportDetailsType = "RunningTrainingSession" | "CrossTrainingSession";

type CrossTrainingSession = {
  id: string;
  activity: string;
  distance: number | null;
  distance_unit: "mi" | "km" | null;
  elevation_gain: number | null;
  average_heart_rate: number | null;
};

type TrainingSession = {
  // ...shared fields
  sport_details_type: SportDetailsType;
  sport_details: RunningTrainingSession | CrossTrainingSession;
};
```

Use a type guard or `sport_details_type` discriminant everywhere the UI branches (card metrics, form defaults). Avoid assuming `distance` always exists.

### Form (`LogTrainingSession.tsx` + `SportSelectorField.tsx`)

1. Enable sport selector (remove `disabled={true}`).
2. Add Cross Training to `typeOptions` (`value: 'cross_training'`).
3. Zod schema: discriminated union (or equivalent) on sport type:
   - **Running**: existing fields + duration-or-distance refine; cadence allowed.
   - **Cross training**: `activity` required non-empty string ≤ 100; distance/unit/elevation/HR optional with same numeric rules; duration-or-distance refine; **no** cadence; **no** computed pace field (pace is run-specific).
4. Conditional field visibility:
   - Always: date/time, sport, indoor/outdoor, duration, notes.
   - Cross training: activity (primary sport field), then optional distance, elevation, HR.
   - Running: distance, pace (read-only), elevation, HR, cadence.
5. Submit payload: set `sport_details.kind` and only include fields for that sport; generate client UUIDs for both parent and sport detail on create.
6. Edit mode: prefill from `sport_details_type`; keep sport selector disabled on edit (sport is fixed) **or** show read-only sport label — do not allow switching sports mid-edit.
7. Primary submit = default shadcn button; Cancel = outline (matches design skill Actions guidance). Destructive delete stays on the card with confirm dialog (already correct: outline trigger, destructive confirm).

### List card (`TrainingSessionCard.tsx`)

1. `formatSportName`: map `CrossTrainingSession` → `"Cross Training"` explicitly (today the default branch already returns that string — make it intentional).
2. Icon treatment: do not reuse `SportShoe` for CT. Use a distinct Lucide icon (e.g. `Bike`, `Dumbbell`, or `Waves` — pick one generic CT icon and use it for all CT activities in v1). Keep the existing circular badge pattern; prefer a secondary/teal-leaning treatment over the run’s rose accent so sports are distinguishable without relying on color alone (icon + text label). Follow design skill: de-emphasize icon with softer color if it competes with primary metrics.
3. Primary metric hierarchy for CT:
   - Prefer showing **activity** as the title-adjacent signal (e.g. replace or supplement `"Indoor Cross Training"` with activity name in the primary text line).
   - Numeric column: distance+unit when present; else duration; if both, distance primary and duration secondary (same visual hierarchy as runs).
4. Metric chips: HR and elevation when present; never cadence for CT.
5. Cards are already the interaction container for list items (edit/delete). Preserve this established pattern (design-system exception vs marketing “no cards” guidance).

### Empty / copy

No special empty state for CT-only. Shared empty state remains. Toast copy can stay generic (“Training session logged/updated successfully”).

### Design tokens (brand)

Apply [`.agents/skills/design/SKILL.md`](../../.agents/skills/design/SKILL.md):

- Primary text `text-foreground` / ink; secondary metrics `text-muted-foreground`; tertiary where needed.
- Prefer semantic tokens (`primary`, `secondary`, `muted-foreground`) over raw palette stops.
- Labels secondary to values (existing FieldLabel pattern is fine).
- Do not introduce purple gradients, glow, or new decorative card chrome.
- Right-align numeric metrics (already done).

---

## Seeds & fixtures

Update `backend/db/seeds/training_sessions.csv` headers (and row values as needed) so columns map cleanly to the domain — see [Seed CSV mapping](#seed-csv-mapping-not-a-product-collision). Then update `backend/db/seeds.rb` to stop skipping cross-training rows and import them as `CrossTrainingSession`.

For CT rows:

1. Build `CrossTrainingSession` with:
   - `activity` from an `activity` column when present; otherwise default `"Uphill Treadmill"` for current treadmill CT seed rows (document the heuristic in a seed comment).
   - `distance` / `distance_unit` / `elevation_gain` / `elevation_unit` / HR from CSV columns (set a default `elevation_unit` when elevation is present but unit is omitted in legacy rows).
2. Set `location_type` from an explicit column when present; otherwise indoor when the old treadmill hint applies.
3. Attach as `sport_details` on `TrainingSession` with UUID seeding via existing `seed_id` helper (`cross_training_session` label).
4. Never create `RunningTrainingSession` or running tags for these rows.

Factories already cover `:cross_training` traits — keep them aligned with validations (activity required; minimal trait still valid via duration on parent).

---

## Tests

### Backend

- Model: activity presence/length; distance/unit; duration-or-distance; numeric bounds; destroy cascading (existing association examples).
- Request: create cross training happy path; create with activity blank → 422; create with unknown kind → error; index includes CT sessions for current user only; show/update/destroy ownership 404 for other users’ IDs; update cannot change kind.
- Serializer: activity and metrics present; distance as float.

### Frontend

- Form: selecting Cross Training shows activity, hides cadence/pace; validation blocks submit without activity and without duration+distance.
- Card: renders activity / CT icon; does not show cadence.
- Hook types: compile against union sport details.

---

## Implementation checklist (handoff)

### Backend

1. Add validations to `CrossTrainingSession` (`activity`, `DistanceValidatable`, `DurationOrDistanceValidatable`, HR/elevation numeric rules).
2. Add `CrossTrainingSessionSerializer`.
3. Refactor `TrainingSessionsController` create/update to instantiate by `kind`; expand strong params; freeze kind on update.
4. Align running create path to use `kind: "running"` explicitly (fix silent hard-code).
5. Update seed CSV headers/columns and `seeds.rb` to import CT rows as `CrossTrainingSession`.
6. Expand model + request specs.

### Frontend

1. Enable sport selector; add CT option.
2. Discriminated form schema + conditional fields + activity input with suggestions.
3. Widen SWR types; fix card rendering for union details.
4. Map API `kind` consistently; update `formatSportName`.
5. Add/adjust frontend tests under `frontend/tests/`.

### Docs (this PR / follow-up)

1. Keep this file as the living design for CT.
2. Apply the parent-spec edits listed below in `spec/training_sessions/spec.md`.

---

## Required edits to `spec/training_sessions/spec.md`

When implementing, update the parent spec to reflect current reality and this feature. Suggested changes:

1. **Clarify delegated types status**  
   Note that `RunningTrainingSession` and `CrossTrainingSession` are implemented end-to-end (after this work); `StrengthTrainingSession` exists at model layer but is not user-facing yet. Do **not** resolve `SupplementaryTrainingSession` in the CT slice — leave that for strength-training intent/spec work.

2. **Cross training bullet**  
   Add an explicit subsection or pointer: “Cross training details are specified in `spec/cross_training_sessions/spec.md` (activity required; optional distance/HR/elevation with units; duration-or-distance).”

3. **Duration wording**  
   Parent text currently implies every session has a duration. Align with implementation: duration is stored on the parent when present; running and cross training allow duration **or** distance. Strength may later require duration only.

4. **Weather**  
   Mark weather as specified-but-unimplemented for all sports so implementers do not assume outdoor CT must collect weather in this slice.

5. **GPS watch links**  
   Keep as future; not part of CT.

6. **API polymorphism**  
   Document that create/update uses `sport_details.kind` to select the delegated type, and that clients cannot change kind on update.

### Related note for `spec/running_training_sessions/spec.md`

Optional, only if that doc discusses seed/tag vocabulary:

- Spreadsheet/seed values of `cross_training` refer to the `CrossTrainingSession` sport type, not a running tag.
- A future “cross training” **tag** on other sports (per CT intent) is a separate concept and out of scope here.

---

## Areas of concern / residual follow-ups

Most earlier conflicts are resolved by the intent or by decisions elsewhere in this spec (same list/card UX; weather and tags out of scope; seed `cross_training` → sport type with CSV header cleanup; auth/ownership rules under API; API `kind` values `running` | `cross_training`).

What remains in-doc only:

1. **Parent numeric wording** — When editing `spec/training_sessions/spec.md`, clarify that elevation may be non-negative (≥ 0) while other numerics stay strictly positive. CT should match running’s current elevation validation.

**Already accounted for (out of scope here):** sharing elevation gain + unit as a reusable concern and applying it to running is #410. This slice only adds `elevation_unit` on `cross_training_sessions`.
