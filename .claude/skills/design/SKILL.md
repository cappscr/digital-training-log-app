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