---
title: add running shoes
author: Chris Capps
status: in-progress
issue: 181
---

# Intent: add running shoes

## Problem

One of the most important functional gaps in the running log functionality is the ability to associate running shoes to a running training session. Additionally, in order to associate running shoes to a training session those shoes must first be associated to the current user.

## Proposed outcome

Users can add running shoes to their profile on a net new page that gets added in the Settings tree. The navigation item will be called Gear and will house a page that allows users to view, create, edit, and delete running shoes.

## In scope

- New table and model for `RunningShoe`
- Columns should include brand (string required), model (string required), nickname (string nullable), date first used (date nullable), and date retired (date nullable)
- Existing Settings page remains at `/settings` but becomes Settings > General in the breadcrumbs and sidebar nav
- New Gear page at `/settings/gear`
- Gear page has a FAB for creating a new pair of running shoes
- Form for creating a new pair of running shoes at `/settings/gear/new`
- Form for editing a pair of running shoes at `/settings/gear/:id/edit`

## UX

### Running shoe list

The list view should show active shoes on top and a collapsible section below of retired shoes. Each list section is always visible and each should have its own empty state but only the active shoes section needs an action button in the empty state. From the list view there should be a retire button that opens a dialog where the user can select the retirement date. The field for the retirement date should default to the current date but the user should be able to select a past date but not a future date. The retirement date cannot be before the date first used. For now shoes are also deletable; however, future work will remove the ability to delete shoes once they are associated with training sessions. The delete button should show from the list view as well. The active section of the list view should show the brand, model, nickname, and date first used. The retired section of the list view should show the brand, model, nickname, date first used, and date retired. Brand, model, and nickname _is not_ a unique index, only the shoe's id will be unique as a user could own multiple pairs of the same shoe (the user would be encouraged to differeniate using nickname but the app will not enforce this at the db level). For now, active shoes can be sorted by date first used with newest shoes on top and undated shoes below dated shoes, eventually that will be updated to most recently used. Retired shoes can be sorted by date retired with most recent retirements appearing at the top of the list.

### Form

The brand field should be an autocomplete with a suggestions list but ultimately allow whatever value the user inputs. Brand and model are required fields while nickname remains optional. Nickname field should have a helper description that describes the purpose. The model and nickname fields will be normal text fields as running shoe models are too volatile to provide a suggestions list. The date first used field should be optional when creating a new pair of running shoes and allow today or any past date but not future dates. Future work will automatically update that field when running shoes are associated with a training session. Date first used is editable after the initial create. A retired shoe is no longer editable.

#### Running shoe brand suggestion list

- Adidas
- Altra
- ASICS
- Brooks
- HOKA
- Merrell
- Mizuno
- New Balance
- Nike
- On
- PUMA
- rabbit
- Salomon
- Saucony
- Topo Athletic
- Tracksmith

## Out of scope

The nav item is called Gear and eventually could and will serve exercise gear in addition to running shoes; however, in this slice only running shoes are in scope.

- Associating shoes to training sessions
- Automatically calculating the first used date based on association with a training session
- Calculating or displaying the mileage on a pair of shoes
- Unretiring shoes after they have been retired
- Sorting the active section of the list view by most recently used