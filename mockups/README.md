# UI mockups

Clickable mockups for the UI overhaul, built with stock shadcn/ui (`base-luma` style, Base UI primitives; Inter body, Barlow Condensed headings). Independent from `frontend/` — nothing here is wired to the API.

```sh
npm install
npm run dev
```

The toolbar switches between screens, previews mobile / tablet / desktop widths, and toggles dark mode. Each preview is the app rendered in an iframe (`/?embed#<screen>`) at that device size, so media queries and the sidebar's mobile behavior match a real device.

- `src/mockups/LandingPage.tsx`
- `src/mockups/SessionsListPage.tsx`
- `src/mockups/LogSessionPage.tsx`
- `src/mockups/PaceCalculatorPage.tsx`
- `src/mockups/AppShell.tsx` — signed-in layout: sidebar, header with trigger and breadcrumb
- `src/components/app-sidebar.tsx`, `nav-main.tsx`, `nav-user.tsx` — adapted from the shadcn [sidebar-07](https://ui.shadcn.com/blocks/sidebar#sidebar-07) block
- `src/mockups/PalettePage.tsx` — the `volt` (primary) and `iris` (secondary) scales defined in `src/index.css`
