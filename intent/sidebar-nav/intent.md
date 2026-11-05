---
title: sidebar nav
author: Chris Capps
status: in-progress
issue: 496
---

# Intent: sidebar nav

## Problem

The app currently uses an horizontal rail across the top of the page for primary navigation for both pre-authentication pages and post-authentication application pages.

## Proposed Outcome

Within the authenticated portion of the app and on the calculator pages, the primary navigation moves from the top nav bar to a collapsible sidebar following the pattern laid out in the [shadcn blocks documentation](https://ui.shadcn.com/blocks/sidebar#sidebar-07). [Figma designs of the app screens](https://www.figma.com/design/e1kKKR6kvokgnPCZIo7jfA/Training-Log-%E2%80%94-UI-mockups?node-id=21-2) are available that contain the new sidebar design.

## UX

Primary navigation lives in the sidebar. The top contains a static display containing a brand icon, the current microcycle, and the year. Click this will continue to navigate users to the home page (eventually that target will become the dashboard within the `AppLayout` and remain the homepage for calculator pages). A context bar on the top of the main page content will contain a control for collapsing and expanding the sidebar. Clicking it toggles the sidebar between collapsed and expanded states. There is a persistent button at the top of the sidebar for "Log session" that directs the user to the `/training-sessions/new` page. The sidebar is divided into groups (Training Sessions, Calculators, Settings, etc) that are collapsible and contain lists of navigation links to individual pages (Log a session, all sessions, pace calculator, settings, etc). The very bottom of the sidebar contains a clickable region that displays the user's name, email, and avatar. Clicking that region should open a menu that contains the logout link. When the user is current on a page in the sidebar navigation that link should get an active styling treatment. For a group like "Settings" that today is just a single `/settings` route, the nav item does not need to be collapsible and can clickable directly from the sidebar. "Calculators" however should be collapsible and contain a single link to `/calculators/pace-calculator`.

## In Scope

The sidebar that collapses to icons is implemented within `AppLayout`. A new layout file is created for calculator pages because they don't necessarily require authentication like the pages that use the `AppLayout`, which contains an authentication guard that redirects users if they are no logged in. A new context bar component that contains the control for collapsing and expanding the sidebar and breadcrumbs.

- Adjusting the route for the pace calculator to include a `calculators` path segment.
- The "Sessions" nav group should contain just the links for adding a new session (`/training-sessions-new`) and all sessions (`/training-sessions`)

## Out of scope

- The home page, the about page, the terms of use page, the login page, and the sign up page will keep the current top nav bar layout.
- Allowing users to upload their own avatars. The app will continue to use gravatar when available and fallback to initial based avatars.
- Redesign of _any_ of the other page elements.
- Creating any new routes that are shown in the Figma mockups.
- Showing disabled placeholders for future routes. The sidebar can contain just the links that are active today.
- Adding anything additional to the user menu outside of logout capability.