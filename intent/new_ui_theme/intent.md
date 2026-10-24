---
title: new ui theme
author: Chris Capps
status: in-progress
issue: 490
---

# Intent: new UI theme

## Problem

The initial version of the landing page was vibe coded as a static HTML artifact using Claude. It contains many of the AI-design tells of that era, see [Impeccable.style's AI slop section for details](https://impeccable.style/slop/). The design was also not tuned for the fact that the project is utilizing the shadcn/ui component library. The near-term goal is to develop a core set of application functionality while largely accepting the basic design system offered by shadcn and Tailwind CSS. The longer term vision remains building a completely custom design system and component library based on HTML primitives and modern CSS.

## Proposed outcome

The shadcn component style gets updated from `"nova"` to `"luma"`, reinstalling components as necessary. The heading font gets updated to Barlow Condensed. The color palette gets redined using `oklch(0.9496 0.197 117.78)` aka `--volt-300` as the primary accent and `oklch(0.5556 0.2523 281.13)` aka `--iris-600` as the secondary accent.

## In Scope

- Updating `DESIGN.md` and the design skill to reflect new theme direction
- Updating the shadcn component style
- Reinstalling the necessary shadcn components
- Reapply limited customizations to shadcn components
- Swapping the header font for Barlow Condensed
- Retooling the color palette for `volt` and `iris` colors
- Fixing any callsites that use unsupported variants or props

## Out of scope

- Switching the app's navigation to a collapsible sidebar
- Redesign of _any_ page, this is a simple color palette, heading font, and component style swap