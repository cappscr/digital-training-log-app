---
title: user settings
author: Chris Capps
status: in-progress
issue: 495
---

# Intent: theme selector

## Problem

The app has a theme selector implemented as a ToggleGroup that lives in the app's primary navigation. The user doesn't need to be presented with this choice on every single page of the application. So instead of setting the theme via the navigation bar the ToggleGroup will move onto the settings page and become part of the form that updates the user's settings.

## Proposed Outcome

The theme selector is removed from the app's primary navigation and relocated to the settings page. The theme selector becomes part of the UserSettingsForm and the selection is submitted as part of that form's payload. The theme default's to dark mode as the site's design is optimized for dark mode; however, the user retains the ability to choose light or system. The current toggle does not read the saved theme on load and always defaults to system, that gets updated as part of this work. Removing the theme selector will remove a user's ability to change the theme before creating an account or logging in, this is intentional.

## UX

The selector remains a ToggleGroup but the controls are moved from the navigation bar to the UserSettingsForm. The user's theme choice is still persisted to `localStorage` so that is available even when logged out. The toggle is a form field, clicking it does not change the page. A successful save writes `theme` to the database and calls `setTheme`, which updates `localStorage`, and the document class. When the current user loads, apply `user.settings.theme`. If it differs from `localStorage`. With no `localStorage` value and no signed-in user, dark mode is used.

## In Scope

- Moving the `ModeToggle` to the `/forms` directory
- Wiring the theme selection into the form submit payload and form schema
- Make sure the API accepts and validates theme
- When the toggle loads on the settings page it initializes with the theme value saved in the database
- Saving a change to the theme, saves to both the database and `localStorage`

## Out of scope

- Switching the app's navigation to a collapsible sidebar