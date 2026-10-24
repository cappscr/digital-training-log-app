DTL adopts the visual language of shadcn's Luma component style. 

## Typography

The app uses Barlow Condensed for headings and display numbers and DM Sans for body text. There are two text levels primary and secondary which use the `foreground` and `muted-foreground` utility classes respectively.

## Colors

The color palette is anchored around `--volt-300` as the primary accent and `--iris-600` (light mode) and `--iris-400` (dark mode) as the secondary accent.

The `zinc` greys are used from the Tailwind CSS palette for surface and text work throughout the app.

|Role|Light|Dark|
|---|---|---|
|Page|`zinc-50`|`zinc-950`|
|Card, popover, muted fill|`zinc-100`|`zinc-800`|
|Border and input|`zinc-200`|`zinc-700`|
|Primary text|`zinc-950`|`zinc-50`|
|Secondary text|`zinc-700`|`zinc-400`|

The `red`, `amber`, `green`, and `blue` palettes from Tailwind are used for conveying semantic states through color at the following 5 stops:

- `100` — subtle background tint
- `300` — border
- `500` — base and icons
- `700` — text-on-light
- `900` — dark background and text-on-dark

Components use the semantic tokens (`primary`, `secondary`, `foreground`, `muted-foreground`, `border`, `destructive`) so the dark-mode shifts stay in one place.
