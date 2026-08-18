# CLAUDE.md

This file provides context for Claude Code when working in this repository. Read it fully before making any changes.

---

## Project overview

**Digital Training Log** is a progressive web app (PWA) for planning, logging, and analyzing athletic training. It is a digital analog to a paper-based training journal — not a coaching platform, not a social network, and not a GPS data aggregator.

The app is rooted in long-distance running but treats all sports, including strength training, as first-class citizens. The core philosophy is flexibility: athletes should be able to log what matters to them, not just what a watch can measure. The app calculates volume and trends automatically but never prescribes behavior or offers algorithmic coaching.

The primary audience is dedicated, high-level athletes. Coaches are a secondary audience; athletes can share their logs with coaches when needed.

**Live URL:** digitaltraininglog.com  
**Tagline:** Plan. Train. Log.

---

## Tech stack

### Frontend

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| PWA | vite-plugin-pwa |
| Routing | React Router |
| Component library | shadcn/ui (Base UI primitives, Nova style) |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Data fetching | SWR |
| Icons | Lucide React |

### Infrastructure

| Concern | Choice |
|---|---|
| Frontend hosting | Netlify |
| Backend hosting | Railway |
| DNS | Cloudflare |

---

## Monorepo structure

The repository is organized as a monorepo with three top-level directories:

```
/
├── frontend/              # React PWA (Vite + TypeScript)
├── backend/               # Rails API-only application
└── features/              # Markdown files describing feature intent
```

The `features/` directory is the source of truth for what the app is meant to do and why. Before implementing anything non-trivial, check whether a relevant feature document exists there. These documents describe intent and scope — they are not technical specs.

### frontend/

```
frontend/
├── src/
│   ├── components/        # Shared UI components (flat, no single-file directories)
│   │   └── ui/            # shadcn generated components — do not edit manually
│   ├── pages/             # Route-level page components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities, calculations, helpers
│   ├── types/             # TypeScript type definitions
│   └── app.css            # Global styles, Tailwind imports, @theme tokens
├── tests/                 # All test files (mirrors src/ structure)
│   └── vitest.setup.tsx   # Vitest setup
├── public/
│   └── fonts/             # Self-hosted web fonts (.woff2)
├── tsconfig.json          # Root — references app, node, and test configs
├── tsconfig.app.json      # App compilation
├── tsconfig.node.json     # Vite config compilation
├── tsconfig.test.json     # Test compilation
├── vite.config.ts         # Vite + Vitest config (imports from vitest/config only)
└── package.json
```

### backend/

Standard Rails API-only layout. See ![backed CLAUDE.md for more detail](./backend/CLAUDE.md)

### features/

Markdown files describing feature intent, scope, and constraints. Not technical specs — they capture the *why* and *what* before implementation begins. Consult these before making significant product decisions.

---

## Key conventions

### Package manager

The frontend uses **yarn**. Never use `npm` for frontend dependency management — it will create a `package-lock.json` and conflict with `yarn.lock`. All frontend commands should be run from the `frontend/` directory.

### TypeScript and imports

- The `@/` alias maps to `./src/` — use it for all internal imports
- Defined in both `tsconfig.app.json` and `tsconfig.test.json` under `paths`
- Defined in `vite.config.ts` using `fileURLToPath(new URL('./src', import.meta.url))`
- No single-file directories — prefer `src/components/Button.tsx` over `src/components/Button/index.tsx`
- All test files live in `tests/` not alongside source files

### Vite config

Always import `defineConfig` and `mergeConfig` from `vitest/config`, never from `vite` directly — mixing the two causes TypeScript errors in CI builds.

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
```

### tsconfig discipline

Every tsconfig file referenced from the root must include `target`, `skipLibCheck: true`, and `noEmit: true`. Missing any of these causes build failures on Netlify even when local `tsc` passes.

### Tailwind

- Tailwind v4 — configuration is CSS-first via `@theme` in `app.css`, not `tailwind.config.js`
- Custom design tokens (colors, fonts) are defined as CSS variables in `@theme`
- `--font-playfair` is the display/heading font (Playfair Display, self-hosted in `public/fonts/`)
- `--color-accent` maps to `oklch(0.6045 0.1414 46.33)` — the primary brand color
- Spacing scale uses the default `--spacing: 0.25rem` base

### shadcn/ui

- Using **Base UI** primitives (not Radix) — there is no `asChild` prop
- Use the `render` prop for polymorphic rendering: `<Button render={<Link to="/path" />}>`
- Components are generated into `src/components/ui/` — treat as owned code, not a dependency
- The `buttonVariants` export triggers an ESLint fast-refresh warning — suppressed project-wide via `allowConstantExport: true` in ESLint config

### Forms

React Hook Form + Zod. Zod schemas serve as both validation and TypeScript types — define the schema first, infer the type from it:

```ts
const schema = z.object({ ... });
type FormValues = z.infer<typeof schema>;
```

### Data fetching

SWR for all API calls. The Rails API runs on `http://localhost:3000` in development. Vite proxies `/api` requests to the Rails server — all fetch calls should use `/api/...` paths, never hardcoded localhost URLs.

---

## App ethos — important for feature decisions

These principles should inform every feature and UI decision:

- **No algorithmic coaching.** The app calculates volume and trends but never suggests what to do with them.
- **Hardware agnostic.** No GPS trace integration. Manual entry only. Works the same regardless of what watch or device the athlete uses.
- **Not a social network.** No feeds, followers, or public profiles. Training is private by default.
- **Flexibility over prescription.** Athletes can log what matters to them. Templates enforce consistency without rigidity.
- **Paper analog.** The planning experience should feel as fluid as a paper calendar. Sessions can be moved, copied, deleted easily.
- **Mobile-first.** The app should be as usable at the track on a phone as at a desk on a laptop. PWA installability is a priority.
- **Coach sharing is supported but secondary.** Athletes own their data and choose what to share and with whom.

---

## Brand and design

- **Display font:** Playfair Display (variable, self-hosted)
- **Body font:** DM Sans
- **Primary accent:** `oklch(0.6045 0.1414 46.33)` (burnt terracotta)
- **Background:** `oklch(0.9618 0.0086 84.57)` (warm cream)
- **Ink:** `oklch(0.2098 0.0083 84.59)` (near-black)
- **Design language:** DTL's visual language treats the interface as a digital analog to a paper training journal — a warm, paper-toned background with fine grid or ruled texture, structured data in a clean sans-serif, and freeform commentary in a hand-drawn heading typeface. The aesthetic deliberately departs from generic SaaS polish (soft shadows, uniform radii, pill buttons) to signal a personal tool rather than a commercial product, while keeping quantitative data — distances, splits, dates — rendered with full legibility and trust.

The app icon is a split open-journal mark: left page is a calendar grid (planning), right page is ruled lines with entry bars (logging). The favicon is a minimal 3×3 grid of cells at varying opacity. Both use the accent color on a dark ground.

The app uses the shadcn component library with the Nova style and Base UI variant.

## Color Theming

The app uses semantic CSS variables to theme shadcn components.

|Token|Description|Light Mode Value|Dark Mode Value|
|---|---|---|---|
|background|The default app background color|**paper-50:** `oklch(0.99 0.006 75)`|**paper-50-dark:** `oklch(0.2 0.01 75)`|
|text-primary|The default app text color|**ink-700:** `oklch(0.3 0.008 75)`|**ink-700-dark:** `oklch(0.9 0.006 75)`|
|text-secondary|The secondary app text color|**ink-500:** `oklch(0.45 0.008 75)`|**ink-500-dark:** `oklch(0.72 0.006 75)`|
|text-tertiary|The tertiary app text color|**ink-300:** `oklch(0.6 0.008 75)`|**ink-300-dark:** `oklch(0.56 0.006 75)`|
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

---

## Running the project

```bash
# Install frontend dependencies (run from frontend/)
yarn install

# Start dev server
yarn dev

# Type check
yarn tsc --noEmit

# Run tests
yarn test

# Build for production
yarn build
```

---

## Deployment

- **Frontend:** Netlify — deploys automatically on push to `main`, build root set to `frontend/`
- **Backend:** Railway — deploys automatically on push to `main`, build root set to `backend/`
- **Environment variables:** Set in Netlify and Railway dashboards respectively — never commit `.env` files
- **DNS:** Managed via Cloudflare — `digitaltraininglog.com`
- **Package manager:** yarn — Netlify is configured to use yarn, not npm

Build errors on Netlify that pass locally are almost always TypeScript config issues — run `yarn build` from `frontend/` locally before pushing to catch them early.