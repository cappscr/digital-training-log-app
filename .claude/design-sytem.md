# design-system.md

This file provides a skill for Claude Code when working in this repository. 

---

## Brand and design

- **Display font:** Playfair Display (variable, self-hosted)
- **Body font:** DM Sans
- **Primary accent:** `oklch(0.6045 0.1414 46.33)` (burnt terracotta)
- **Background:** `oklch(0.9618 0.0086 84.57)` (warm cream)
- **Ink:** `oklch(0.2098 0.0083 84.59)` (near-black)
- **Design language:** Editorial minimalism — warm, serious, personal. Not a fitness startup aesthetic.

The app icon is a split open-journal mark: left page is a calendar grid (planning), right page is ruled lines with entry bars (logging). The favicon is a minimal 3×3 grid of cells at varying opacity. Both use the accent color on a dark ground.

## Color Theming

The app uses a CSS variable based Tailwind theme.

Raw color tokens
- **cream:** `oklch(0.9618 0.0086 84.57)`
- **warm-stone:** `oklch(0.72 0.01 84.59)`
- **burnt-terracotta:** `oklch(0.6045 0.1414 46.33)`
- **earthy-ash:** `oklch(0.38 0.01 84.59)`
- **deep-espresso:** `oklch(0.32 0.01 84.59)`
- **taupe:** `oklch(0.72 0.03 60)`;
- **dusty-beige**: `oklch(0.85 0.03 60)`
- **ink:** `oklch(0.2098 0.0083 84.59)`
- **ink-foreground:** `oklch(0.9913 0.0029 84.56)`
- **ink-muted:** `oklch(0.5152 0.0119 81.78)`
- **ink-faint:** `oklch(0.7203 0.0097 78.2)`
- **near-white:** `oklch(0.95 0.01 80)`

There are CSS vars, and Tailwind utility classes for each of the raw color tokens except for burnt-terracotta (which is used as the semantic accent)

There are semantic color tokens as well:
- **background:** maps to cream
- **foreground:** maps to ink
- **primary:** maps to ink
- **secondary:** maps to warm-stone
- **muted:** maps to ink-muted
- **accent:** maps to burnt-terracotta
- **accent-light** does not map to a raw color token
- **border:** maps to ink with a 12% opacity applied
- **body-text** maps to deep espresso

## Typography Theming

The following conventions are preferred for themeing typography

| Class | font-size | line-height |
|---|---|---|
| xs |	0.75 rem |	`calc(1 / 0.75)` |
| sm | 0.875 rem |  `calc(1.25 / 0.875)` |
| base | 1 rem	| `calc(1.5 / 1)` |
| lg	| 1.125 rem |	`calc(1.75 / 1.125)` |
| xl |	1.25 rem	| `calc(1.75 / 1.25)` |

| Class | line-height |
|---|---|
| tight | 1.25 |
| snug | 1.375 |
| normal | 1.5	|
| relaxed	| 1.625 |
| loose |	2	|

| Class | letter-spacing |
|---|---|
| tighter |	-0.05em |
| tight | -0.025em |
| normal | 0em	|
| wide	| 0.025em |
| wider |	0.05em	|
| widest | 0.1em |

All font-weights 100-900 are available to use.

## Producing designs

Please create designs as static html pages using plain CSS. The designs will be converted to React and styled using components from shadcn and Tailwind CSS utility classes; however, I prefer to convert the designs myself. Please use component asethics from the nova style shadcn components when appropriate. Please prefer the values from the color tokens and typography theming sections. Different values  can be used but please provide a justification as to why. In addition, if new colors need to be added please provide a name as well as the channel values for oklch.