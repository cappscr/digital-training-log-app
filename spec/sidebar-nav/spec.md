---
title: sidebar nav
author: Chris Capps
status: ready for implementation
issues:
  - 496
---

# Sidebar nav

Related intent: [`intent/sidebar-nav/intent.md`](../../intent/sidebar-nav/intent.md)

Visual source: the [app screens in Figma](https://www.figma.com/design/e1kKKR6kvokgnPCZIo7jfA/Training-Log-%E2%80%94-UI-mockups?node-id=21-2) and the [shadcn sidebar-07](https://ui.shadcn.com/blocks/sidebar#sidebar-07) block. This spec decides behavior where those sources include items that are out of scope.

## Summary

Signed-in pages replace the top nav with a collapsible sidebar and a context bar. The sidebar lists the routes that exist today. The context bar shows breadcrumbs for the current route, including routes that have no sidebar link.

Public pages keep the top nav and the marketing footer. The pace calculator is the exception: it has a public URL and a signed-in URL, and each URL redirects to the other when the visitor is on the wrong side of auth.

## Outcomes (acceptance)

A signed-in user can:

1. See the sidebar and context bar on training sessions, the new-session form, the edit-session form, settings, and `/calculators/pace-calculator`.
2. Collapse the sidebar to icons on a wide screen, and open it as a left-hand drawer on a narrow screen.
3. Follow the sidebar to all sessions, the new-session form, the pace calculator, and settings.
4. Read a breadcrumb trail for the current page, including Edit Training Session.
5. Log out from the user menu. Logout from the signed-in pace calculator lands on `/pace-calculator`. Logout from anywhere else lands on `/`.

A signed-out user who opens a signed-in URL lands on `/login`, except `/calculators/pace-calculator`, which lands on `/pace-calculator`.

A signed-in user who opens `/pace-calculator` lands on `/calculators/pace-calculator`.

Out of scope for this slice:

- The home, about, terms, login, signup, and public pace-calculator pages. They keep the current top nav and footer.
- A session detail page at `/training-sessions/:trainingSessionId`.
- A dashboard. The sidebar brand continues to link to `/`.
- Templates, or any other Figma link that has no route yet.
- Restyling the contents of any page. The shell changes. Page headings, forms, and lists stay as they are.
- Uploading an avatar. The menu uses Gravatar, then initials.
- Any user-menu action besides log out.

---

## Shell

`AppLayout` renders the sidebar, the context bar, and the page. It does not render `PrimaryNav` or `Footer`. `Layout` is unchanged.

While the current user is loading, `AppLayout` shows the existing loading state and does not redirect.

### Context bar

The bar contains the sidebar trigger, a separator, and the breadcrumbs. The trigger toggles the desktop sidebar between expanded and icon-only. On a narrow screen it opens the drawer.

The desktop collapsed state persists in the browser. The drawer starts closed and closes when the user chooses a destination.

### Sidebar header

The header is a link to `/`. It shows a brand icon, the title "Training Log", and the local calendar date with the year, as in `Nov 6, 2026`.

Under that, a Log session button links to `/training-sessions/new`. It is an action, not a nav item, so it does not take the current-page style.

### Sidebar navigation

| Item | Children | Destination |
| --- | --- | --- |
| Log session | — | `/training-sessions/new` |
| Training Sessions | All sessions, Log a session | The group toggles its children. |
| All sessions | — | `/training-sessions` |
| Log a session | — | `/training-sessions/new` |
| Calculators | Pace calculator | The group toggles its children. |
| Pace calculator | — | `/calculators/pace-calculator` |
| Settings | — | `/settings` |

Training Sessions and Calculators are collapsible groups. Settings is a single link, with no children and no disclosure control. Do not render Templates or any disabled placeholder.

The group that contains the current route starts expanded. The other group starts collapsed.

Active styling:

- All sessions is active only on `/training-sessions`.
- Log a session is active only on `/training-sessions/new`.
- Pace calculator is active only on `/calculators/pace-calculator`.
- Settings is active only on `/settings`.
- On `/training-sessions/:trainingSessionId/edit`, neither child link is active. The Training Sessions group is.

Collapsed icon mode shows each item's icon and a tooltip, following sidebar-07.

On a narrow screen the sidebar is an off-screen drawer that animates in from the left and overlays the page.

### Sidebar footer

The footer button shows the user's avatar, name, and email. The avatar uses the existing Gravatar treatment: the Gravatar image, then initials from the name.

The button opens a menu with one action, Log out.

---

## Breadcrumbs

Breadcrumbs belong to the route, not to the sidebar. A page inside `AppLayout` can declare a trail whether or not it has a nav link. `AppLayout` reads the trail from the current route's `handle` and renders it in the context bar.

Ancestor crumbs are links. The last crumb is the current page and is not a link. On a narrow screen, render only the last crumb.

| Route | Desktop trail |
| --- | --- |
| `/training-sessions` | Training Sessions → All sessions |
| `/training-sessions/new` | Training Sessions → Log a session |
| `/training-sessions/:trainingSessionId/edit` | Training Sessions → Edit Training Session |
| `/calculators/pace-calculator` | Calculators → Pace calculator |
| `/settings` | Settings |

Training Sessions links to `/training-sessions`. Calculators links to `/calculators/pace-calculator`.

The edit trail stays two crumbs until a session detail page exists. Do not add `/training-sessions/:trainingSessionId` in this slice. When that page exists, the edit trail gains a middle crumb for the session, linking to `/training-sessions/:trainingSessionId`, and that route is registered after `/training-sessions/new`.

---

## Routes and redirects

`/calculators/pace-calculator` renders the existing pace calculator page inside `AppLayout`. `/pace-calculator` keeps rendering that same page inside `Layout`.

Redirects replace the current history entry.

| Visitor | From | To |
| --- | --- | --- |
| Signed in | `/pace-calculator` | `/calculators/pace-calculator` |
| Signed out | `/calculators/pace-calculator` | `/pace-calculator` |
| Signed out | Any other `AppLayout` route | `/login` |
| Logging out from `/calculators/pace-calculator` | — | `/pace-calculator` |
| Logging out from anywhere else | — | `/` |

The signed-in calculator route declares the public path on its route `handle`. `AppLayout` uses that path for the signed-out redirect, and logout uses the same path when the current route declares one. Routes that declare no public path keep `/login` and `/`.

The public pace-calculator route declares the signed-in path. `Layout` redirects a signed-in visitor along it. Wait until the current-user request has settled before redirecting, so a refresh does not bounce.
