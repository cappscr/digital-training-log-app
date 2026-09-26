---
title: elevation gain concern
author: Chris Capps
status: in-progress
issue: 410
---

# Intent: shared elevation gain

## Problem

Running and cross training both record elevation gain, but the unit (`ft` or `m`) and its validation only existed on cross training. Running stored a bare integer, so the same metric could not be validated or displayed consistently.

## Proposed outcome

Elevation gain and its unit are one shared rule. Running and cross training both accept an optional non-negative integer elevation gain and require `ft` or `m` when a gain is present. Existing running rows that already have a gain are backfilled to `ft`. The app does not convert between units.

## In scope

- Shared `ElevationGainValidatable` concern used by running and cross training
- `elevation_unit` on running training sessions, backfilled to `ft` when a gain exists
- API, serializer, seeds, and factory support for the running elevation unit
- The running log form uses the same elevation gain and unit input as cross training
- Session cards show the gain with its unit when both are present

## Out of scope

- Converting between feet and meters
- Elevation support on strength training or other sports
