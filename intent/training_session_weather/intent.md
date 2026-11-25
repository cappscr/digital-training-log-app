---
title: training session weather
author: Chris Capps
status: completed
issue: 380
---

# Intent: training session weather

## Problem

Training sessions that take place outdoors are subject to weather conditions and recording those conditions can be an important part of analyzing a training session later.

## Proposed outcome

Users are able to input weather conditions in the log training session form when ourdoor is selected in the indoor or outdoor selector. Users will be able to input 3 pieces of information concerning weather: the temperature, the humidity, and conditions. Weather details will be viewable on the training session card and editable when editing an existing training session.

## In scope

- Fully implementing the `TrainingSessionWeather` model
- Temperature column should keep the decimal 4,1 type to allow users entering celisus based temperatures to capture 1 decimal place.
- Add a temperature units column to `TrainingSessionWeather` model, (f/c with a default of f)
- Add a default temperature unit setting to `UserSetting` model
- The humidity column should be update to hold an integer between 0 and 100 representing the percentage.
- Make any necessary updates to the `TrainingSession` model and its `has_one` `TrainingSessionWeather`
- Adding `WeatherConditionsFields` to the `LogTrainingSessionForm` and render them when `indoorOrOutdoor` is `'outdoor'`
- All 3 weather fields are optional so an outdoor save with 3 blanks _does not_ create a weather row
- A later edit that clears every field or switching a session from outdoor to indoor destroys the weather row
- Display weather conditions on the `TrainingSessionCard`
- Database seeding is updated to add weather conditions for training sessions when present in the `training_sessions.csv` file and the csv file gains a temperature unit column

## UX

The weather related fields are available when the indoor/outdoor selector has a value of outdoor. If the selector is set to indoor the weather fields are not rendered. All weather fields are optional. The conditions should be a free-form text field that provides some suggestions. For weather conditions it is likely that the suggestion list will be exhaustive and so no additional backend normalization should be needed. Temperature follows the same patter as distance and elevation: the unit control defaults from the user setting on create and an edit keeps the unit stored on the weather row. Changing the setting later does not rewrite sessions already saved. A selected unit alone does not create a row and temperatrue requires a unit.

On the `TrainingSessionCard` weather conditions should be on the same "row" as the `TrainingSessionMetrics` but on the opposite end of the flex container. The free-form conditions can be represented using icons from Lucide with the following mappings (these contains matches are not case sensitive and listed in the order in which they should match):

- Contains `rain` (provided suggestion `'Rainy'`) – `cloud-rain`
- Contains `'wind'` (provided suggestion `'Windy'`) - `wind`
- Contains `'fog'` (provided suggestion `'Foggy'`) - `cloud-fog`
- Contains `'snow'` (provided suggestion `'Snowy'`) - `cloud-snow`
- `'Partly cloudy'` - `cloud-sun`
- Contains `'cloud'` (provided suggestion `'Cloudy'`) - `cloudy`
- Contains `'sun'` (provided suggestion `'Sunny'`) – `sun`

When matched only the icon is shown with the string as an accessible name. Any other string that doesn't match one of the above contains is represented by the text. Temperature and its unit can appear after the `thermometer` icon and humidity can appear after the `droplet` icon with a % as well. Each piece of data is only renders when a value is present and the order is always the same: conditions, temperature, and then humidity.

## Out of scope

Any sort of weather related information for indoor training sessions.