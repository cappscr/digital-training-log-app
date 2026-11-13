---
title: training session weather
author: Chris Capps
status: in-progress
issue: 380
---

# Intent: training session weather

## Problem

Training sessions that take place outdoors are subject to weather conditions and recording those conditions can be an important part of analyzing a training session later.

## Proposed outcome

Users are able to input weather conditions in the log training session form when ourdoor is selected in the indoor or outdoor selector. Users will be able to input 3 pieces of information concerning weather: the temperature, the humidity, and conditions. Weather details will be viewable on the training session card and editable when editing an existing training session.

## In scope

- Creating a new `WeatherConditions` model
- Creating a new optional association on the `TrainingSession` model `has_one` `WeatherConditions`
- Adding `WeatherConditionsFields` to the `LogTrainingSessionForm` and render them when `indoorOrOutdoor` is `'outdoor'`
- Display weather conditions on the `TrainingSessionCard`
- Database seeding is updated to add weather conditions for training sessions when present in the `training_sessions.csv` file

## UX

The weather related fields are available when the indoor/outdoor selector has a value of outdoor. If the selector is set to indoor the weather fields are not rendered. All weather fields are optional. The conditions should be a free-form text field that provides some suggestions.

On the `TrainingSessionCard` weather conditions should be on the same "row" as the `TrainingSessionMetrics` but on the opposite end of the flex container. The free-form conditions can be represented using icons from Lucide with the following mappings:

- Contains `'sun'` (provided suggestion `'Sunny'`) – `sun`
- Contains `rain` (provided suggestion `'Rainy'`) – `cloud-rain`
- `'Partly cloudy'` - `cloud-sun`
- `'Cloudy'` - `cloudy`
- Contains `'snow'` (provided suggestion `'Snowy'`) - `cloud-snow`
- Contains `'wind'` (provided suggestion `'Windy'`) - `wind`
- Contains `'fog'` (provided suggestion `'Foggy'`) - `cloud-fog`

Any other string that doesn't match one of the above contains is represented by the text. Temperature can appear after the `thermometer` icon and humidity can appear after the `droplet` icon.

## Out of scope

Any sort of weather related information for indoor training sessions.