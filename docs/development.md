# Development guide

## Prerequisites

- Node.js 18+
- npm (the project's lockfile is `package-lock.json`; please don't introduce a second package manager's lockfile)

## Setup

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:8080` with hot module reloading.

## Project conventions

- **Aliases**: `@/` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.json`). Prefer `@/lib/...` imports over deep relative paths (`../../../lib/...`).
- **UI primitives**: components under `src/components/ui/` are shadcn/ui-generated. Prefer composing them over writing new low-level primitives; if you need a new one, generate it with the shadcn CLI (`components.json` holds the config) rather than hand-rolling it, to keep styling consistent.
- **Stores**: all cross-page state lives in `src/lib/stores/`. Don't lift local UI state (e.g. a dialog's open/closed flag) into a store — keep that in the component with `useState`.
- **Types**: shared domain types belong in `src/lib/types.ts`. Component-local prop types stay next to the component.
- **Forms**: use `react-hook-form` + `zod` for any form with validation (see `src/pages/Login.tsx` for the pattern) rather than manual `useState` per field.

## Adding a new route

1. Create the page component under `src/pages/`.
2. Add it to `appRoutes` in `src/routes.tsx`.
3. If it should appear in navigation, add an entry to `menuItems` in `src/components/layout/AppSidebar.tsx`.

## Working with mock data

Mock data is generated once per session in `src/lib/mock/faker-data.ts` and loaded into `useDataStore` on app start. To change the volume or shape of generated data (e.g. number of rooms), edit the generator functions there — do not hardcode fixtures in components.

## Checks

```bash
npm run lint     # ESLint
npm run build    # Type-checks and builds a production bundle
```

Both are required to pass before merging (enforced by the `ci.yml` GitHub Actions workflow).

## Releasing

This project follows [Semantic Versioning](https://semver.org/). Bump `version` in `package.json` and add an entry to `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/) conventions.
