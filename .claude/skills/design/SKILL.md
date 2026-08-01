---
name: design
description: This outlines the design system for Digital Training Log and how to design the experience
---

## Visual Hierarchy

Don't rely on `font-size` alone to create visual hierarchy. Making a primary element bolder lets you use a more reasonable font size, and often does a better job at communicating its importance. Using a softer color for supporting text instead of a tiny font size makes it clear that the text is secondary while sacrificing less on readability.

These are the three primary text colors in the app
- A dark color named ink-700 for primary content: `--ink: oklch(0.3 0.008 75)` this same color is also aliased in `--foreground` which is used by shadcn and `--color-foreground`, the Tailwind classes are `text-text-primary`, `text-foreground` or `color-foreground`.
- A grey named ink-500 for secondary content: `--ink-500: oklch(0.45 0.008 75)`, the Tailwind class: `text-muted-foreground` or `color-muted-foreground`.
- A lighter grey named ink-300 for tertiary content: `--ink-300: oklch(0.6 0.008 75)`. Tailwind class: `text-text-tertiary` or `color-text-tertiary`

### Font Weight
- Use class `font-normal` (`font-weight: 400`) for most text
- Use class `font-bold` for text that should be emphasized (`font-weight: 700`)

Stay away from font weights under 400 for UI work, they can work for headings but are too hard to read at smaller sizes. Instead of reaching for a lighter weight to de-emphasize some text, use a lighter color or smaller font size instead.

Don't use grey text on colored backgrounds. Instead choose the color with the closest hue from the Tailwind color palette and adjust the saturation and lightness until it looks right.

Emphasize by de-emphasizing. Sometimes the main element of an interface isn't standing out enough, but there's nothing to add for emphasis. Figure out how to de-emphasize the elements that are competing with it.

Labels are a last resort
- You may not need labels at all
- Clarifying text can be used instead
- When you need a label treat it as secondary content and make it smaller, lighter, or a lighter font weight

Balance weight and contrast
- use a lighter color to de-emphasize heavy elements such as icons
- increasing weight is a great way to add a bit of emphasis to low constrast elements

### Actions

Primary actions should be obvious. Use the default variant from shadcn. Secondary actions should be clear but not prominent. Use the outline or secondary variants from shadcn. Tertiary actions should be discoverable but unobtrusive. Use the ghost variant from shadcn. If a destructive action isn't the primary on the page, it might be better to give it a secondary or tertiary button treatment. Combine this with a confirmation step where the destructive action actually is the primary action, and apply the destructive variant from shadcn there.

## Color

| Palette | Stops | Role |
|---|---|---|
| `grey` | 100–900 | Text, borders, backgrounds, panels, form controls |
| `terracotta` | 100–900 | Primary — buttons, links, elements that need to stand out |
| `teal` | 100–900 | Secondary — supporting actions, less prominent than primary |
| `rose` | 100–900 | Accent — hover/highlight states, flagged/attention items |

All four are declared with the `color-` prefix in `@theme`, which generates the corresponding Tailwind utility classes (`bg-terracotta-500`, `text-grey-700`, etc.).

Don't rely on color alone to communicate meaning. Use icons, text, and contrast to make sure your interface is accessible to everyone.

### Heuristics

- **Reserve high-saturation color for small areas.** Large surfaces should stay closer to grey/tinted-neutral; saturated color is for buttons, links, and accents — not backgrounds or panels.
- **Don't reach for the raw scale directly in components.** Use semantic tokens (`--primary`, `--border`, `--muted-foreground`, etc.) wherever one exists; they carry the light/dark mapping automatically. Reach for `grey-500` etc. directly only for one-off cases with no existing semantic role.

### Dark mode

Semantic tokens are redefined per-mode in `.dark`, not the raw palette. Background/foreground pairs invert which end of the scale they draw from — e.g. a status background moves from a light tint (`green-100`) to a dark tint (`green-900`), while its text moves the opposite direction (`green-700` → `green-300`). When adding a new semantic token, always define both halves of the pair together rather than assuming the light-mode value works as-is in dark mode.

### Semantic Accent Colors

Use Tailwind's default palette to emphasize semantic states with color, at these five stops:

- `100` — subtle background tint
- `300` — border
- `500` — base and icons
- `700` — text-on-light
- `900` — dark background and text-on-dark

Applied to:

- `red-*` for destructive or error states
- `amber-*` for warning states
- `green-*` for success states
- `blue-*` for info states

These use Tailwind's built-in colors rather than a custom hue-anchored scale, since status colors need to be instantly recognizable (red = error, green = success) regardless of the app's brand palette.