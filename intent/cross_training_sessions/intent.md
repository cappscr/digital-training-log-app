---
title: cross training sessions
author: Chris Capps
status: implemented
issue: 375
---

# Intent: cross training sessions

## Problem

Runners train using exercises other than running. These exercises can contribute meaningfully to an overall training program.

## Proposed outcome

Customers are able to log, view, edit, and delete cross training sessions in the app. At present running is the only supported sport so any sport other than running would be logged as cross training. Eventually support for other sports will be added and the app will become less focused on running and then a user could choose to log cross training sessions or the more specific sport they are training if its supported e.g. a runner who trains by cycling.

## In scope

- Activity is required, which should be a free-form text field that provides some suggestions
- All training session fields should be supported (notes, indoor/outdoor, duration, date, and time)
- Duration or distance is required
- Optional elevation gain and average heart rate should be supported
- Distance (mi, km) and elevation (ft, m) should have selectable units

## UX Expectations

Cross training sessions will appear in the same training sessions list as Running Training Sessions with a similar card design

## Out of scope

Weather and tags. Eventually I want specific sports to be able to carry a cross training tag, which will be different from a cross training session.

Letting the user switch the sport while editing a training session. There should however, be a field description with the disabled select telling the user to delete the training session if they wish to the change the sport.

Non-run modalities (bike, aqua jog, uphill treadmill) log at cross training not as a tagged run.

Any summary or aggregation of cross training sessions
