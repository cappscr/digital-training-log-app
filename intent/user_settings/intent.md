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

The replace the current User Profile route and page with a settings page. A set of default settings is created at the same time the user is created. The user can update their settings while logged in.

## In Scope

- Creating new API endpoint for updating settings
- Data model for user settings that includes `microcycle_start_day`, `weight_unit`, `distance_unit`, `elevation_gain_unit`, and `theme`.
- Page in the app that allows a user to change any of the settings and save those changes
- All forms that use `weight`, `distance` (or `pace`), or `elevation_gain` default the units to the user's setting

## Out of scope

- Switching the app's navigation to a collapsible sidebar
- Moving the theme toggle in the UI onto the settings page, that is the next issue that follows
- Redesign of _any_ page