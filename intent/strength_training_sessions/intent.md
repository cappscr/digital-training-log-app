---
title: strength training sessions
author: Chris Capps
status: in-progress
issue: 376
---

# Intent: strength training sessions

## Problem

Strength training involves tracking different information from the largely cardiorespiratory focused cross training sessions. Strength training is often a second-class citizen within endurance sport focused platforms but can be a meaningful part of an overall training program.

## Proposed outcome

Users are able to log, view, edit, and delete strength training sessions in the app. Users will be able to create, view, edit, and delete individual exercises from within a strength training session. For now, strength training will absorb the supplementary training use case and supplementary training should be removed from the app.

## In scope

- All training session fields should be supported (notes, indoor/outdoor, duration, date, and time)
- Duration is optional 
- Indoor/outdoor should default to indoor (this should be updated for cross training as well)
- Optional average heart rate should be supported
- Individual exercises should be supported consisting of a name, reps, sets, and weight
- Name, reps, and sets are required
- Either bodyweight is true or weight and weight units are required
- Weight should be a positive number and updated to support 1 decimal place
- Reps and sets are positive integer values
- Weight unit is required if weight is present

# UX Expectations

Strength training sessions will appear in the same training sessions list as Running and Cross Training sessions with a similar entry

The exercise name will use an autocomplete style entry where the user can enter any string but some sensible defaults will be provided as suggestions
- Squats
- Deadlifts
- Bench Press
- Overhead Press
- Pull-Ups
- Push-Ups
- Lunges
- Calf Raises
- RDLs
- Power Cleans
- Snatch

## Out of scope

Weather and tags. Average heart should be moved to a concern or even to the training session model itself but that is out of scope here. Updating any backend or database defaults for location type per sport, the defaults should be for the form in the UI only.
