---
title: training gear - running shoes
author: Chris Capps
status: proposed
issues:
  - 181
---

# Training gear - running shoes

Related intent: [`intent/add_running_shoes/intent.md`](../../intent/add_running_shoes/intent.md)

This slice adds the closet. It does not attach a shoe to a training session. When it ships, update the Settings row in [`spec/sidebar-nav/spec.md`](../sidebar-nav/spec.md) to the group described here.

## Summary

A signed-in user can keep running shoes on a Gear page under Settings. The page lists active shoes above a collapsible retired section. The user can add a shoe, edit an active shoe, retire an active shoe, and delete any shoe. A retired shoe stays in the list and cannot be edited or made active again.

## Outcomes (acceptance)

A signed-in user can:

1. Open Gear from Settings in the sidebar. The current settings form is the General child of that group.
2. See active shoes above retired shoes. Each section is present when it has no shoes.
3. Add a shoe from the floating button or from the empty active section. Brand and model are required. Nickname and date first used are optional.
4. Edit brand, model, nickname, and date first used on an active shoe.
5. Retire an active shoe from the list. The dialog opens on today's date. A past date is allowed. A future date is not. The date cannot be earlier than date first used.
6. Delete an active or retired shoe from the list, after confirming.
7. Land on `/login` when signed out and opening any Gear URL.

Out of scope for this slice:

- Associating a shoe with a training session.
- Setting date first used from a session.
- Mileage on a shoe.
- Making a retired shoe active again, or editing a retired shoe.
- Sorting active shoes by most recently used.
- Other kinds of gear. The nav label is Gear. The page only manages running shoes.
- A unique constraint on brand, model, and nickname. Two identical pairs are allowed.

---

## Domain model

`User` has many `RunningShoe` rows. Destroy them with the user.

Primary key is a string UUID. The client may send one on create. The database default fills it when the request omits it.

| Column | Type | Required | Notes |
| --- | --- | --- | --- |
| `brand` | string | Yes | 100 characters or fewer |
| `model` | string | Yes | 100 characters or fewer |
| `nickname` | string | No | 100 characters or fewer. Blank is stored as null |
| `date_first_used` | date | No | On or before `Date.current` |
| `date_retired` | date | No | On or before `Date.current`. On or after `date_first_used` when that date is present |

Index `user_id`. Do not add a unique index on brand, model, or nickname.

`date_retired` null means the shoe is active. A non-null `date_retired` means it is retired.

Create and update strip brand, model, and nickname. They do not accept `date_retired`. Only the retire action writes that column.

A retired shoe rejects update. Delete still removes it. Nothing references a shoe in this slice, so delete does not orphan a session.

---

## API

All routes require login. A missing current user is the existing 401. A shoe id that is not the current user's is 404, including another user's shoe.

JSON uses the existing adapter, so the keys are `running_shoe` and `running_shoes`. Dates are `YYYY-MM-DD` or null.

```json
{
  "id": "<uuid>",
  "brand": "Nike",
  "model": "Pegasus 41",
  "nickname": "Volt",
  "date_first_used": "2026-03-02",
  "date_retired": null
}
```

### Index

`GET /api/v1/running_shoes` returns every shoe for the current user. The client sorts. No pagination.

### Create

`POST /api/v1/running_shoes` with `running_shoe`. Permit `id`, `brand`, `model`, `nickname`, and `date_first_used`. Do not permit `date_retired` or `user_id`.

Success is 201 and the shoe. Missing `running_shoe` is the existing 400. Invalid fields are 422 problem+json. Pointers use `#/running_shoe/brand`, `#/running_shoe/model`, `#/running_shoe/nickname`, and `#/running_shoe/date_first_used`.

### Show

`GET /api/v1/running_shoes/:id` returns one shoe for the edit form.

### Update

`PATCH /api/v1/running_shoes/:id` permits `brand`, `model`, `nickname`, and `date_first_used`. It does not permit `date_retired`, so this route cannot retire or unretire a shoe.

Success is 200 and the shoe. A retired shoe is 422 with detail `Retired shoes cannot be edited.` Field errors use the same pointers as create.

### Retire

`POST /api/v1/running_shoes/:id/retirement` with:

```json
{
  "retirement": {
    "date_retired": "2026-11-26"
  }
}
```

Permit `date_retired` only. Success is 200 and the shoe, now including `date_retired`.

422 when:

- `date_retired` is missing or not a date. Pointer `#/retirement/date_retired`.
- The date is after `Date.current`.
- The date is before `date_first_used`.
- The shoe is already retired.

### Delete

`DELETE /api/v1/running_shoes/:id` destroys an active or retired shoe. Success is 204.

---

## Frontend

### Route and nav

Settings becomes a collapsible sidebar group, using the same control as Training Sessions. The row expands the group and does not navigate.

| Item | Destination |
| --- | --- |
| General | `/settings` |
| Gear | `/settings/gear` |

General is active only on `/settings`. Gear is active only on `/settings/gear`. On `/settings/gear/new` and `/settings/gear/:id/edit`, neither child is active. The Settings group is.

The group starts expanded when the route is under `/settings`.

| Route | Desktop trail |
| --- | --- |
| `/settings` | Settings → General |
| `/settings/gear` | Settings → Gear |
| `/settings/gear/new` | Settings → Gear → New shoe |
| `/settings/gear/:id/edit` | Settings → Gear → Edit shoe |

Settings links to `/settings`. Gear links to `/settings/gear`. The last crumb is not a link. On a narrow screen, render only the last crumb.

The General page heading and document title change from Settings to General. The form on that page stays as it is.

Signed-out visits to the three Gear routes redirect to `/login`.

### Gear list

Match the training-sessions list width. The document title and heading are Gear. One sentence under the heading: shoes you can attach to runs later. This page does not show mileage.

Two sections, both always rendered.

**Active.** Not collapsible. Shoes with no `date_retired`. Sort by `date_first_used` descending, undated shoes below dated shoes. Break ties with `created_at` descending.

Each row shows brand and model as the title, the nickname when present, and the first-used date. An empty first-used date reads "Not used yet". Dates render as `Nov 6, 2026`.

Row actions: Edit, Retire, and Delete. Edit links to `/settings/gear/:id/edit`. Retire opens the retire dialog. Delete opens the delete dialog. Delete is a quiet action on the row. The confirmation button is the destructive one.

Empty state: "No active shoes." and a button, Add running shoe, linking to `/settings/gear/new`.

**Retired.** Collapsible. Starts expanded. Shoes with `date_retired`. Sort by `date_retired` descending, then `created_at` descending.

Each row shows brand, model, nickname when present, date first used, and date retired. The only row action is Delete. No Edit link. No Retire button.

Empty state: "No retired shoes." No button in that empty state.

A floating button on this page links to `/settings/gear/new`. Same placement as Add Training Session. Its label is Add running shoe. It is not on the new or edit pages.

While the list is loading, show the existing loading state. A failed load shows an error message and does not show the empty states.

### Retire dialog

Title: Retire shoe. Name the shoe by brand and model, and the nickname when it is present.

The date field is Date retired. It opens on the user's current local date. The calendar disables future dates. When the shoe has a date first used, the calendar also disables earlier dates. The user can change the date before confirming.

Cancel closes the dialog without a request. Retire sends the retirement request. Disable Retire while the request is in flight. On success, close the dialog, move the shoe into the retired section, and show a success toast. On 422, keep the dialog open and show the error.

### Delete dialog

Title: Delete shoe. Body names the shoe and says the delete cannot be undone. Cancel closes the dialog. Delete sends the request and uses the destructive button. Disable it while the request is in flight. On success, close the dialog, remove the row, and show a success toast. On failure, keep the dialog open and show the error.

### Create and edit form

Both forms use the settings page width.

| Field | Control | Required |
| --- | --- | --- |
| Brand | Autocomplete. Any string is allowed | Yes |
| Model | Text | Yes |
| Nickname | Text | No |
| Date first used | Date picker | No |

Brand suggestions are a fixed client list, in this order: Adidas, Altra, ASICS, Brooks, HOKA, Merrell, Mizuno, New Balance, Nike, On, PUMA, rabbit, Salomon, Saucony, Topo Athletic, Tracksmith. The list is not loaded from the API and does not include brands the user typed before.

Nickname helper text: "Optional. A colorway or other name that tells this pair apart, such as Volt or Race day."

Date first used starts empty on create and shows the stored date on edit. The calendar allows today and past dates and disables future dates. The user can clear it.

The create heading is New running shoe. The submit label is Add shoe. The edit heading is Edit running shoe. The submit label is Save. Cancel returns to `/settings/gear`.

Disable submit while the request is in flight. On success, toast and go to `/settings/gear`. On 422, show the field errors and stay on the form.

The edit page loads the shoe by id. When `date_retired` is set, redirect to `/settings/gear` and do not show the form. A 404 uses the existing not-found behavior.

Create generates the id on the client and sends it, matching training sessions.
