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

### Backend

| Concern | Choice |
|---|---|
| API | Rails (API-only mode) |
| Database (dev/test) | SQLite |
| Database (production) | PostgreSQL via Supabase |

### Infrastructure

| Concern | Choice |
|---|---|
| Frontend hosting | Netlify |
| Backend hosting | Railway |
| DNS | Cloudflare |

---

## Project structure

```
/
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
└── vite.config.ts         # Vite + Vitest config (imports from vitest/config only)
```

---

## Key conventions

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
- `--color-accent` maps to `#C4622D` — the primary brand color
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
- **Primary accent:** `#C4622D` (burnt terracotta)
- **Background:** `#F5F2EC` (warm cream)
- **Ink:** `#1A1814` (near-black)
- **Design language:** Editorial minimalism — warm, serious, personal. Not a fitness startup aesthetic.

The app icon is a split open-journal mark: left page is a calendar grid (planning), right page is ruled lines with entry bars (logging). The favicon is a minimal 3×3 grid of cells at varying opacity. Both use the accent color on a dark ground.

---

## Running the project

```bash
# Install dependencies
npm install

# Start dev server (frontend)
npm run dev

# Type check
npx tsc --noEmit

# Run tests
npm run test

# Build for production
npm run build
```

The Rails API must be running separately on port 3000 for API calls to work in development.

---

## Deployment

- **Frontend:** Netlify — deploys automatically on push to `main`
- **Backend:** Railway — deploys automatically on push to `main`
- **Environment variables:** Set in Netlify and Railway dashboards respectively — never commit `.env` files
- **DNS:** Managed via Cloudflare — `digitaltraininglog.com`

Build errors on Netlify that pass locally are almost always TypeScript config issues — run `npm run build` locally before pushing to catch them early.