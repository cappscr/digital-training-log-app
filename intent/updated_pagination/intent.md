---
title: updated pagination
author: Chris Capps
status: in-progress
issue: 535
---

# Intent: updated pagination

## Problem

The app currently takes today's date and then fetches sessions that are within the last 3 weeks regardless of where today falls within a microcycle. In [#497] a user setting was added that allows users to select between microcycles starting on Sunday or Monday, which is currently unused.

## Proposed Outcome

Instead of just reaching back three weeks from the current date, the pagination will figure out the current microcycle and then fetch sessions for that microcycle and the 2 previous microcycles. This will end up fetching future sessions early in the microcycle and then 21 full days of historical sessions on the last day of the microcycle.

## UX

Nothing about the pagination UX will change as part of this intent save for the dates shown.

## In Scope

Updaing the pagination logic

## Out of Scope

- Updating the pagination UI or UX outside of the logic.
- Adding a microcycle length to the user settings (stays fixed at 7 days or 1 week)