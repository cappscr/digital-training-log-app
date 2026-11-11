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

The next button still becomes disabled once the date range shown between the pagination controls includes the current date; however, the date range no longer clamps onto today.

## In Scope

Updaing the pagination logic

- When no `to` is present, the current microcycle is determined using the user's `microcycle_start_day` setting and today's date. The sessions returned are from the current microcycle and the two previous.
- When `to` is present, the microcycle that contains `to` is determined using the user's `microcycle_start_day` setting. The sessions returned are from that microcycle and the two previous.
- The previous and next buttons in the UI, will always apply `to` dates at the boundaries of microcycles as determined by the user's `microcycle_start_day` setting.
- When the visible date range includes today, the next pagination controls becomes disabled.

## Out of Scope

- Updating the pagination UI or UX outside of the logic.
- Adding a microcycle length to the user settings (stays fixed at 7 days or 1 week)