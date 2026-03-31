# design-system.md

This file provides a skill for Claude Code when working in this repository. 

---

## Project overview

**Digital Training Log** is a progressive web app (PWA) for planning, logging, and analyzing athletic training. It is a digital analog to a paper-based training journal — not a coaching platform, not a social network, and not a GPS data aggregator.

The app is rooted in long-distance running but treats all sports, including strength training, as first-class citizens. The core philosophy is flexibility: athletes should be able to log what matters to them, not just what a watch can measure. The app calculates volume and trends automatically but never prescribes behavior or offers algorithmic coaching.

The primary audience is dedicated, high-level athletes. Coaches are a secondary audience; athletes can share their logs with coaches when needed.

**Live URL:** digitaltraininglog.com  
**Tagline:** Plan. Train. Log.

## App ethos — important for feature decisions

These principles should inform every feature and UI decision:

- **No algorithmic coaching.** The app calculates volume and trends but never suggests what to do with them.
- **Hardware agnostic.** No GPS trace integration. Manual entry only. Works the same regardless of what watch or device the athlete uses.
- **Not a social network.** No feeds, followers, or public profiles. Training is private by default.
- **Flexibility over prescription.** Athletes can log what matters to them. Templates enforce consistency without rigidity.
- **Paper analog.** The planning experience should feel as fluid as a paper calendar. Sessions can be moved, copied, deleted easily.
- **Mobile-first.** The app should be as usable at the track on a phone as at a desk on a laptop. PWA installability is a priority.
- **Coach sharing is supported but secondary.** Athletes own their data and choose what to share and with whom.

## Brand and design

- **Display font:** Playfair Display (variable, self-hosted)
- **Body font:** DM Sans
- **Primary accent:** `oklch(0.6045 0.1414 46.33)` (burnt terracotta)
- **Background:** `oklch(0.9618 0.0086 84.57)` (warm cream)
- **Ink:** `oklch(0.2098 0.0083 84.59)` (near-black)
- **Design language:** Editorial minimalism — warm, serious, personal. Not a fitness startup aesthetic.

The app icon is a split open-journal mark: left page is a calendar grid (planning), right page is ruled lines with entry bars (logging). The favicon is a minimal 3×3 grid of cells at varying opacity. Both use the accent color on a dark ground.

## Color Theming

The app uses semantic CSS variables to theme shadcn components.

|Token|Description|Light Mode Value|Dark Mode Value|
|---|---|---|---|
|background|The default app background color|**cream:** `oklch(0.9618 0.0086 84.57)`|**deep-warm-charcoal:** `oklch(0.16 0.008 84.59)`|
|foreground|The default app text color|**ink:** `oklch(0.2098 0.0083 84.59)`|**near-cream:** `oklch(0.91 0.0008 84.57)`|
|primary|High-emphasis actions and brand surfaces|**burnt-terracotta:** `oklch(0.6045 0.1414 46.33)`|**burnt-terracotta:** `oklch(0.6045 0.1414 46.33)`|
|secondary|Lower-emphasis filled actions and supporting surfaces|**warm-stone:** `oklch(0.72 0.01 84.59)`|**dark stone:** `oklch(0.24 0.009 84.59)`|
|muted|Subtle surfaces and lower-emphasis content|**pale-sand:** `oklch(0.9257 0.0188 62.44)`|**dark-warm-hover:** `oklch(0.2 0.008 84.59)`|
|muted-foreground|Text color for lower-emphasis|**ink-muted:** `oklch(0.5152 0.0119 81.78)`|**taupe:** `oklch(0.72 0.03 60)`|
|accent|Interactive hover, focus, and active surfaces|**dusty-beige**: `oklch(0.85 0.03 60)`|**dark stone / 60%:** `oklch(0.24 0.009 84.59 / 0.6)`|
|emphasis|High constrast surfaces|**ink:** `oklch(0.2098 0.0083 84.59)`|**near-black:** `oklch(0.10 0.006 84.59)`|
|emphasis-foreground|Text on high contrast surfaces|**ink-faint:** `oklch(0.7203 0.0097 78.2)`|
|destructive|Destructive actions and error emphasis|**destructive-red:** `oklch(0.577 0.245 27.325)`|`oklch(0.704 0.191 22.216)`|
|border|Default borders and separators|`oklch(0.2098 0.0083 84.59 / 0.1)`|`oklch(0.91 0.0008 84.57 / 0.1)`|
|input|Form control borders and input surface treatment|`oklch(0.2098 0.0083 84.59 / 0.18)`|
|ring|Focus rings and outlines|**burnt-terracotta:** `oklch(0.6045 0.1414 46.33)`|

See the [shadcn theming docs](https://ui.shadcn.com/docs/theming) for more details on the semantic theme tokens.

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

Please create designs as static html pages using plain CSS. The designs will be converted to React and styled using components from shadcn and Tailwind CSS utility classes; however, I prefer to convert the designs myself. Please use component asethics from the nova style shadcn components when appropriate. Please prefer the values from the semantic color tokens and typography theming sections. Different values  can be used but please provide a justification as to why. In addition, if new colors need to be added please provide a name as well as the channel values for oklch.