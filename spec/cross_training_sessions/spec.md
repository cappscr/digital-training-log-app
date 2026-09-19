---
title: cross training sessions
author: Chris Capps
status: ready for implementation
issues:
  - 375
  - 240 # parent
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
3. Optionally enter distance (+ unit), elevation gain, and average heart rate when relevant.
4. See cross training sessions in the training sessions list with correct sport labeling and metrics.
5. Edit and delete their own cross training sessions (same ownership rules as running).
6. Not create, read, update, or delete another user’s sessions.

Out of scope for this slice:

- Strength training, supplementary training, cycling/swimming as distinct sport types (beyond enabling the cross-training path).
- Weather capture UI/API (still specified on the parent domain; not wired for any sport yet).
- GPS watch links.
- Changing sport type on edit (e.g. converting a run into cross training). Create as the chosen sport; edit stays within that sport.
- Coaching/share views.

---

## Domain model

### Relationship to parent `TrainingSession`

Cross training is one delegated sport type under `TrainingSession`:

| Layer                  | Responsibility                                                                                                        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `TrainingSession`      | Ownership (`user`), `session_date`, `session_time`, `duration_seconds`, `location_type`, `notes`, weather association |
| `CrossTrainingSession` | Activity-specific fields: `activity`, optional `distance` / `distance_unit`, `elevation_gain`, `average_heart_rate`   |

Table `cross_training_sessions` already exists (string UUID PK) with those columns. No new migration is required unless validation work surfaces a schema gap (see Concerns).

### Fields

| Field                     | Required            | Notes                                                                                                                                               |
| ------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activity`                | Yes                 | Free-text name of the activity. Paper-journal flexibility: do not constrain to a fixed DB enum. Normalize with strip; reject blank. Max length 100. |
| `distance`                | No                  | Positive decimal; at most 2 decimal places (matches running / existing `precision: 5, scale: 2`).                                                   |
| `distance_unit`           | If distance present | `mi` or `km` via shared `DistanceValidatable`.                                                                                                      |
| `elevation_gain`          | No                  | Non-negative integer (meters or feet — same ambiguity as running today; do not invent unit UI in this slice).                                       |
| `average_heart_rate`      | No                  | Positive integer (bpm).                                                                                                                             |
| Parent `duration_seconds` | Conditionally       | See validations.                                                                                                                                    |
| Parent `session_date`     | Yes                 | Inherited.                                                                                                                                          |
| Parent `location_type`    | Yes                 | `indoor` \| `outdoor`.                                                                                                                              |
| Parent `notes`            | No                  | Free text.                                                                                                                                          |

### Validations

Mirror running where the metrics overlap; add activity rules unique to this sport:

1. **`activity`**: presence, max 100 characters, strip whitespace before validate/save.
2. **Reuse `DistanceValidatable`** on `CrossTrainingSession`.
3. **Reuse `DurationOrDistanceValidatable`**: either parent `duration_seconds` or `distance` must be present (same rule as running). Rationale: some sessions are time-only (yoga, mobility); some are distance-oriented (bike, uphill treadmill) like the seed data.
4. Numeric positivity: distance > 0; elevation_gain ≥ 0; average_heart_rate > 0 when present (align elevation with running’s `greater_than_or_equal_to: 0`).
5. Parent `TrainingSession` rules unchanged (`session_date` required; `duration_seconds` integer > 0 when present).

### Activity UX (not a closed enum)

Product ethos ([`spec/product/spec.md`](../product/spec.md)): flexible manual entry, not GPS-constrained.

- UI: text input for activity, with **suggested** options presented as a combobox / select-with-custom-value (or datalist-style suggestions). Suggested starters (non-exhaustive): Aqua Jogging, Uphill Treadmill, Elliptical, Bike, Rowing, Swim, Yoga, Hiking, Other.
- Backend: store the string the user confirmed; do not reject unknown activities.
- Do **not** add a separate activities table in this slice.

### Naming collision: running tag `cross_training` vs sport type

Today:

- `RunningTrainingSessionTag` enum includes `cross_training`.
- Seed CSV uses `session_type=cross_training` for uphill-treadmill-style sessions (currently skipped in `db/seeds.rb`).
- Factory examples use activities like `"Uphill Treadmill"` and `"Aqua Jogging"`.

**Decision for this feature:**

| Concept                           | Meaning                               | Use when                                                                                                            |
| --------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Sport type `CrossTrainingSession` | The session **is** cross training     | Logging bike, aqua jog, elliptical, uphill treadmill CT, etc.                                                       |
| Running tag `cross_training`      | Legacy / ambiguous label on a **run** | Do not expose in new UI. Treat as deprecated for product purposes until a dedicated running-tags slice revisits it. |

Seed rows with `session_type=cross_training` must be imported as `CrossTrainingSession` records (see Seeds), not as tagged runs.

### Weather, GPS, tags/types

- Weather remains a parent `TrainingSession` concern (outdoor). Not implemented in API/UI for any sport; do not block cross training on weather.
- No cross-training-specific tags/types tables (unlike running). Activity string covers categorization for v1.
- No cadence field (not in schema).

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

Update `backend/db/seeds.rb` to stop skipping `session_type=cross_training`. For those rows:

1. Build `CrossTrainingSession` with:
   - `activity`: default `"Uphill Treadmill"` when tags include `treadmill` and notes mention uphill/incline; otherwise `"Cross Training"` or derive a simple default — document the chosen heuristic in a seed comment. Prefer a single default `"Uphill Treadmill"` for current CSV CT rows (they are all treadmill CT).
   - distance / unit / elevation / HR from CSV columns.
2. Set `location_type` indoor when tags include `treadmill`.
3. Attach as `sport_details` on `TrainingSession` with UUID seeding via existing `seed_id` helper (`cross_training_session` label).

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
5. Update seeds to import CT rows.
6. Expand model + request specs.

### Frontend

1. Enable sport selector; add CT option.
2. Discriminated form schema + conditional fields + activity input with suggestions.
3. Widen SWR types; fix card rendering for union details.
4. Map API `kind` consistently; update `formatSportName`.
5. Add/adjust frontend tests under `frontend/tests/`.

### Docs (this PR / follow-up)

1. Keep this file as the living design for CT.
2. Apply the parent-spec edits listed below in `spec/training_sessions/spec.md` (and a small note in running spec if tags are deprecated).

---

## Required edits to `spec/training_sessions/spec.md`

When implementing, update the parent spec to reflect current reality and this feature. Suggested changes:

1. **Clarify delegated types status**  
   Note that `RunningTrainingSession` and `CrossTrainingSession` are implemented end-to-end (after this work); `StrengthTrainingSession` exists at model layer but is not user-facing yet; `SupplementaryTrainingSession` is named in `delegated_type` but **has no model/table yet** — treat as future, or remove from the delegated list until built (see Concerns).

2. **Cross training bullet**  
   Add an explicit subsection or pointer: “Cross training details are specified in `spec/cross_training_sessions/spec.md` (activity required; optional distance/HR/elevation; duration-or-distance).”

3. **Duration wording**  
   Parent text currently implies every session has a duration. Align with implementation: duration is stored on the parent when present; running and cross training allow duration **or** distance. Strength may later require duration only.

4. **Weather**  
   Mark weather as specified-but-unimplemented for all sports so implementers do not assume outdoor CT must collect weather in this slice.

5. **GPS watch links**  
   Keep as future; not part of CT.

6. **API polymorphism**  
   Document that create/update uses `sport_details.kind` to select the delegated type, and that clients cannot change kind on update.

### Related note for `spec/running_training_sessions/spec.md`

Add a short clarification under tags:

- Tag value `cross_training` is **not** the same as logging a `CrossTrainingSession`.
- Product direction: prefer the dedicated sport type for non-run sessions; do not surface the running tag in UI until tags are fully implemented and revisited.

---

## Areas of concern / policy conflicts

### 1. Thin intent vs existing schema (resolved by this spec, confirm before build)

The intent only requires CRUD for cross training. The DB already includes `activity`, distance, elevation, and HR. This spec **adopts the existing schema** rather than inventing a duration-only CT model. If product intent was literally “notes + duration only,” the extra columns would be unused — confirm that activity + optional metrics are desired (recommended: yes; matches seeds and factories).

### 2. Running tag `cross_training` vs sport type (product ambiguity)

Two concepts share a name. This spec deprecates the tag for UI purposes and uses the sport type for seed `session_type=cross_training`. A future running-tags feature must not reintroduce user-facing confusion without copy that distinguishes them.

### 3. `SupplementaryTrainingSession` referenced but missing

`TrainingSession` `delegated_type` lists `SupplementaryTrainingSession`, but no model/migration exists. That is a pre-existing landmine (constantize/load errors if ever selected). **Out of scope to implement supplementary**, but implementers should avoid adding a `kind` for it. Prefer a follow-up to remove it from the delegated list until real, or add a stub — do not silently ignore in CT work if tests assert the full type list.

### 4. Design skill vs marketing frontend rules

User/marketing design rules discourage cards and push brand-hero layouts. In-app session list already uses `Card` as the interaction container, and the design skill + `frontend/AGENTS.md` govern app UI. **Resolution:** preserve existing session list patterns; apply the design skill’s typography/color/action hierarchy. Do not redesign the training sessions index as a marketing page in this feature.

### 5. Security policy skill missing

There is no in-repo security skill or threat-model doc. This spec encodes ownership, auth, and param-filtering requirements from existing controller patterns. If organizational security policies (e.g. rate limits, audit logs, PII retention for notes) exist outside the repo, they are **not applied here** because they are unavailable to the agent. Prioritize a security skill (below).

### 6. Elevation unit ambiguity (inherited)

Running and CT store `elevation_gain` as an integer with no unit. Do not “fix” units only for CT — would contradict running. Track as shared parent-domain debt.

### 7. Kind string inconsistency (`run` vs `running` vs `cross-training`)

Frontend form enum uses `run` and commented `cross-training`; API request specs use `running`; sport selector comment uses `cross_training`. CT work must pick a single API contract and map UI → API in one place. Recommended API: `running` | `cross_training`.

### 8. Weather conditions “normalize on backend” (parent spec)

Parent training-sessions spec asks for weather condition normalization. Unimplemented. CT outdoor sessions will not collect weather until that parent work lands — **not a CT blocker**, but outdoor CT will look incomplete relative to the parent doc until then.

### 9. Positive-number rule vs elevation ≥ 0

Parent says “all numeric values need to be positive.” Running allows `elevation_gain >= 0`. CT should match running (allow 0), and the parent spec should eventually say “positive unless explicitly non-negative (e.g. elevation).”

---

## Skill & agent guidance gaps (what to prioritize next)

Only one app-specific skill exists today: **design** (visual hierarchy, color, actions). For prompts like this (“read intent → produce integration spec”), the highest-leverage additions are:

### Priority 1 — `training-sessions` domain skill (or Cursor rule)

Capture delegated types, `kind` mapping, shared vs sport-specific fields, ownership rules, form/page file locations, and “extend shared controller/serializer — don’t add parallel resources.” This is the knowledge that took the most exploration for this spec.

### Priority 2 — Security / authz skill

Document: Bearer session auth, `require_login`, always scope by `current_user`, never trust client `user_id`, UUID client generation rules, strong-params expectations, and forbidden patterns (IDOR via direct `TrainingSession.find`). Reference concrete controller concerns under `backend/app/controllers/concerns/authentication.rb`.

### Priority 3 — Spec authoring skill

How intent → spec works in this repo: acceptance outcomes, data model, API contract, UI behavior, test plan, explicit “edits to sibling specs,” and a **Concerns** section for contradictions. Include the product ethos constraints (no coaching advice, flexible manual entry, mobile-first).

### Priority 4 — UX patterns skill (in-app, not marketing)

Complement the design skill with interaction patterns: form field ordering, indoor/outdoor control, duration input, delete confirm dialogs, toast copy, list vs edit layouts, empty states. Point at canonical files (`LogTrainingSession.tsx`, `TrainingSessionCard.tsx`).

### Priority 5 — Expand design skill lightly

Add sport-accent guidance (how running vs CT vs strength should differ without rainbow UI) and when cards are appropriate in authenticated app chrome.

### Lower priority for this prompt style

Hook/CLI/repo meta-skills (`create-hook`, `origin`, etc.) do not help intent→spec work. Keep them; don’t prioritize them for domain design prompts.

### Intent quality tip

Future intents should state: primary objects & fields, required vs optional, what is explicitly out of scope, and any collisions with existing concepts (e.g. tags vs sport types). Even five extra bullets would have removed several concerns above.
