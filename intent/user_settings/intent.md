---
title: user settings
author: Chris Capps
status: in-progress
issue: 497
---

# Intent: user settings

## Problem

There are a handful of values within the app that should be configurable. Which day of the week that microcycles start on (Sunday or Monday), which units serve as the default for weights, distances, and elevation gain, and which theme the UI takes.

## Proposed outcome

The replace the current User Profile route and page with a settings page. A set of default settings is created at the same time the user is created (dark mode, monday, lbs, mi, and ft). Existing users should get the default settings. The user can update their settings while logged in. Units are used in the app today and will now default to the units chosen in settings. Day of the week that microcycles start will be used in future work to refine the way the pagination works on the training sessions view. This issue will store theme with the default `"dark"` value and leaves ThemeProvider on `localStorage`. Changing a default unit in settings only affects the defaults the forms open with when creating new training sessions, doing new pace calculations (while logged in), and adding new sets or exercises in a session. It does not change any already recorded sessions.

## UX

The current user profile page is dropped and its nav item is replaced with a link to the new "Settings" page. This page will contained sectioned lists containing controls to change the settings. Because each of the currently supported settings only has 2-3 choices I think the `ToggleGroup` is probably the best UI control. User's name and email should be normal inputs. All settings should be saved together when the user clicks a save button.

## In Scope

- Creating new API endpoint for updating settings (which should also be capable update user objects)
- Data model for user settings that includes `microcycle_start_day`, `weight_unit`, `distance_unit`, `elevation_unit`, and `theme`.
- Page in the app that allows a user to change any of the settings and save those changes
- All forms that use `weight`, `distance` (or `pace`), or `elevation` default the units to the user's setting
- User profile settings should be a section on the settings page with initially allowing a user to update their name and should display email in a disabled input.

## Out of scope

- Switching the app's navigation to a collapsible sidebar
- Moving the theme toggle in the UI onto the settings page, that is the next issue that follows
- Allowing users to update email address or password from the settings page
- Redesign of _any_ page
- Implementing any pagination changes using the new microcycle start day of week setting