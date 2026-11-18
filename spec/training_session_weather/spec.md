---
title: training session weather
author: Chris Capps
status: specified
issue: 380
---

# Training session weather

Related intent: [`intent/training_session_weather/intent.md`](../../intent/training_session_weather/intent.md)

## Summary

An outdoor training session can record optional weather: temperature with a unit, humidity, and a free-form conditions string. The log form shows those fields only when the session is outdoor. The training session card shows whatever was saved. Indoor sessions do not record weather.

`TrainingSession` already has `has_one :training_session_weather, dependent: :destroy`. This spec wires that model through validation, the training-sessions API, the log form, the card, user settings, and seeds.

## Outcomes (acceptance)

A signed-in user can:

1. Enter an optional temperature, humidity, and conditions while logging or editing an outdoor session.
2. Leave all three blank and save an outdoor session with no weather row.
3. See saved weather on the training session card, in the order conditions, temperature, humidity.
4. Edit weather on an existing outdoor session, including clearing it.
5. Change an outdoor session to indoor and have its weather row removed.
6. Choose a default temperature unit of `f` or `c` in Settings. New outdoor sessions open with that unit. Sessions already saved keep the unit they were stored with.

Out of scope:

- Weather for indoor sessions.
- Converting a stored temperature between `f` and `c`.
- Rewriting conditions to a canonical string.

---

## Domain model

`TrainingSessionWeather` belongs to `TrainingSession`. The session id is unique. Primary key is a string UUID. The client may supply it on create; the database supplies one when the request omits it. Destroying the session destroys the weather row.

| Field | Type | Required | Allowed values |
| --- | --- | --- | --- |
| `temperature` | decimal, precision 4, scale 1 | No | One decimal place, including negative and zero |
| `temperature_unit` | string | Only when `temperature` is present | `f`, `c` |
| `humidity` | integer | No | 0 through 100 |
| `conditions` | string | No | Free text, stored trimmed and otherwise as typed |

`temperature` stays decimal 4,1 so a Celsius value can keep one decimal place. Change `humidity` from decimal 4,1 to an integer. There is no database default on `temperature_unit`. A row with humidity or conditions and no temperature stores `temperature_unit` as null.

The user-setting default `f` is the form default for a new session. It is not stamped onto a weather row that has no temperature.

### When a row exists

A weather row exists only when at least one of `temperature`, `humidity`, or `conditions` is present after trimming `conditions`.

- An outdoor create or update with all three blank does not create a row.
- An update that clears all three destroys the existing row.
- Saving `location_type` as `indoor` destroys any existing weather row and ignores a weather payload.
- A temperature unit without a temperature does not create a row and is not stored.
- A temperature without `f` or `c` is invalid.

No other normalization. `"Sunny"` and `"sunny"` both persist as entered.

---

## API

Weather is nested on the existing training-session resource. Create, update, show, and index use the same object. Index includes the association.

```json
"weather_conditions": {
  "id": "<uuid>",
  "temperature": "72.0",
  "temperature_unit": "f",
  "humidity": 88,
  "conditions": "Sunny"
}
```

The key is `null` when the session has no weather row. `temperature` is a decimal string or `null`. `humidity` is an integer or `null`. `conditions` is a string or `null`.

Permit `id`, `temperature`, `temperature_unit`, `humidity`, and `conditions`. On update, ignore a client-supplied weather `id` that does not match the persisted row. A missing `id` on create is fine.

Invalid temperature, unit, or humidity is a 422 validation error on `weather_conditions/<field>`, using the same problem+json shape as other training-session fields.

---

## Frontend

### Log form

`WeatherConditionsFields` renders inside the log training session form when `indoor_or_outdoor` is `outdoor`. Indoor hides the fields.

| Field | Control | Rules |
| --- | --- | --- |
| Temperature | Number | Optional. At most one decimal place. |
| Temperature unit | Single-select, `f` or `c` | On create, the user setting. On edit, the stored unit. A null stored unit stays empty. Required only when temperature is entered. |
| Humidity | Integer | Optional. 0 through 100. |
| Conditions | Text with suggestions | Optional. Suggestions: `Rainy`, `Windy`, `Foggy`, `Snowy`, `Partly cloudy`, `Cloudy`, `Sunny`. Any other string is allowed. |

The suggestion list is the full set offered in the control. The submitted string is not rewritten to one of those values.

Submitting an outdoor session sends `training_session_weather` only when at least one of the three values is present. The payload omits `temperature_unit` when temperature is empty. Submitting an indoor session omits weather.

### Training session card

Weather sits on the same row as `TrainingSessionCardMetricsRow`, aligned to the opposite end of that row. The row still renders when the session has weather and no heart rate, elevation, or cadence.

Each piece renders only when its value is present, always in this order:

1. Conditions.
2. Temperature, after the Lucide `thermometer` icon, with the number and its unit (`72°F` or `22.5°C`).
3. Humidity, after the Lucide `droplet` icon, with the number and `%`.

Conditions use one icon when the stored string matches. Matching is case-insensitive, trims first, and uses the first hit in this order:

| Rule | Icon |
| --- | --- |
| Contains `rain` | `cloud-rain` |
| Contains `wind` | `wind` |
| Contains `fog` | `cloud-fog` |
| Contains `snow` | `cloud-snow` |
| Equals `Partly cloudy` | `cloud-sun` |
| Contains `cloud` | `cloudy` |
| Contains `sun` | `sun` |

A match shows the icon only. The accessible name is the stored string. Any other string shows that text.

Temperature and humidity use accessible names that include the value and unit, in the same way the other metrics on the row name heart rate, elevation, and cadence.

---

## Seeding

`training_sessions.csv` gains a `temperature_unit` column immediately after `temperature`. Existing numeric temperatures are Fahrenheit, so those cells are `f`. Leave `temperature_unit` blank when temperature is blank.

For each outdoor row, create a weather row when at least one of `temperature`, `humidity`, or `conditions` is present. Copy `temperature_unit` when temperature is present. Skip weather columns on indoor rows.

---

## Related specs

- [`spec/training_sessions/spec.md`](../training_sessions/spec.md) — parent session. Weather is a parent association, shared by every sport.
- [`spec/user_settings/spec.md`](../user_settings/spec.md) — `default_temperature_unit`.
