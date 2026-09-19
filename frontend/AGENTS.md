# Digital Training Log Frontend

## Commands

- Dev Server: `yarn run dev`
- Build: `yarn run build`
- Test: `yarn run test`
- Lint: `yarn run lint`
- Typecheck: `yarn run types`

## Conventions

- yarn is the package manager
- vite is the build tool
- React 19, React Router 8, React Hook Form, SWR, Zod, shadcn, tailwind
- Form components live in `src/forms`
- Page components live in `src/pages`
- Layout components live in `src/layouts`
- Atomic components are generated into `src/components/ui/` — treat as owned code, not a dependency
- Lucide React for icons
- Custom design tokens (colors, fonts) are defined as CSS variables in `@theme`
- Use semantic tokens in components not the tokens that describe how a style appears
- All test files live in `tests/` not alongside source files
- The `@/` alias maps to `./src/` — use it for all internal imports

## Architecture

- React Router data router for routing, routes defined in `src/Routes.tsx`
- Tailwind v4 — configuration is CSS-first via `@theme` in `app.css`, not `tailwind.config.js`
- Using shadcn with **Base UI** primitives (not Radix) — there is no `asChild` prop
- React Hook Form + Zod. Zod schemas serve as both validation and TypeScript types — define the schema first, infer the type from it:

```ts
const schema = z.object({ ... });
type FormValues = z.infer<typeof schema>;
```

- SWR for all API calls. The Rails API runs on `http://localhost:3000` in development. Vite proxies `/api` requests to the Rails server — all fetch calls should use `/api/...` paths, never hardcoded localhost URLs.

## Things agents get wrong

- Every tsconfig file referenced from the root must include `target`, `skipLibCheck: true`, and `noEmit: true`. Missing any of these causes build failures on Netlify even when local `tsc` passes.
- Always import `defineConfig` and `mergeConfig` from `vitest/config`, never from `vite` directly — mixing the two causes TypeScript errors in CI builds.

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
```
