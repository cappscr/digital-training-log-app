---
title: elevation gain concern
author: Chris Capps
status: in-progress
issue: 410
---

# Intent: elevation gain concern

## Problem

The training sessions data model uses delegate types to support different sports. Multiple sport types have elevation gain but not all sport types. Initially elevation gain was implemented directly on the `RunningTrainingSession` model; however, as part of the `CrossTrainingSession` model it became apparent that it should be moved to a shared concern.

## Proposed outcome

The `RunningTrainingSession` and `CrossTrainingSession` models will share a common `ElevationGainValidatable` concern. The validation rules should match those that are implemented on the `CrossTrainingSession` model.

## In scope

- Creating the Rails migration to add the `elevation_unit` column to the `running_training_sessions` table
- Backfill existing `running_training_sessions` rows with the default `elevation_unit` value
- Updating impacted API params, serializers, and Zod types
- Remove duplication by moving the `elevation_gain` and `elevation_unit` fields from the `RunningTrainingSession` and `CrossTrainingSession` models to the `ElevationGainValidatable` concern
- Metrics row on the training session card should show the unit for elevation gain
- Updating training session, running training session, and cross training session specs to reflect the elevation gain changes

## UX Expectations

The `RunningFields` component should adopt the same elevation gain input style as the `CrossTrainingFields` component. The unit for elevation gain should be displayed next to the value on the training session card.

## Out of scope

Unit conversion
