# Architecture Decision Records

Lightweight ADRs for the choices that shape this codebase. Format: Context → Decision → Consequences.

## ADR-001: Ship mock-data-only, no backend yet

**Context**: The project's first goal was to validate hotel front-desk workflows (reservations, rooms, guests) end-to-end in the UI before investing in backend/API design.

**Decision**: Generate realistic data client-side with Faker and persist it to `localStorage` via Zustand's `persist` middleware. No server, no database.

**Consequences**:
- Fast to run and demo — `npm install && npm run dev` and the app is fully interactive.
- All data is local to the browser; it is not shared across devices or users, and clearing site data resets it.
- The store interface (`useDataStore`) is designed as the seam for a future API integration — see `architecture.md`. Introducing a real backend should mean changing store internals, not page components.
- We deliberately did **not** add a `services/`/repository abstraction layer ahead of having a real API to abstract over (YAGNI). That refactor is planned for when backend work starts, not before.

## ADR-002: Zustand over Redux/Context

**Context**: Needed shared client state for auth and hotel data (rooms/guests/reservations) across otherwise independent pages.

**Decision**: Use Zustand.

**Consequences**: Minimal boilerplate for a small, flat state shape. If server-state (caching, revalidation, pagination) becomes a real need after a backend exists, TanStack Query — already installed and provider-wired in `App.tsx` — is the intended tool for that, with Zustand staying for genuinely client-only state (e.g. UI/session state).

## ADR-003: Mock authentication, not a real auth system

**Context**: Role-based access (Administrator, Reception, Finance) needed to be demonstrable in the UI.

**Decision**: `useAuthStore` accepts any password for three hardcoded demo emails and treats a match as a successful login.

**Consequences**: This is explicitly a demo affordance, documented in the README under "Demo accounts," and must **not** be mistaken for a security control. Any real deployment requires replacing this with real authentication (e.g. an identity provider or a backend-verified session) before handling real guest or payment data.

## ADR-004: Colombian market defaults (COP, America/Bogota)

**Context**: The initial target market is Colombia.

**Decision**: Hardcode COP currency formatting (`lib/utils/currency.ts`) and `America/Bogota` timezone handling (`lib/utils/dates.ts`) rather than building general internationalization from day one.

**Consequences**: Fast to build for the initial use case. Supporting other currencies/timezones later means extracting these utilities into a small locale/config layer (see `README.md` roadmap) rather than a full i18n rewrite, since the domain types (`Room`, `Reservation`, etc.) don't hardcode currency assumptions themselves — only the formatting utilities do.

## ADR-005: Spanish domain language, English code

**Context**: The application's users (hotel staff) work in Spanish; the codebase should be approachable to any contributor regardless of language.

**Decision**: UI copy, route paths, and domain enum values (e.g. `'pendiente'`, `/habitaciones`) stay in Spanish, matching the product's target market. Code identifiers, comments, commit messages, and all project documentation are in English.

**Consequences**: Contributors need to know this split is intentional (documented in `CONTRIBUTING.md`) rather than an inconsistency to "fix" by translating one side to match the other.
