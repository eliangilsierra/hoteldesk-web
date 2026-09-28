# HotelDesk

Operations dashboard for hospitality teams — reservations, rooms, guests and billing in one place.

[![CI](https://github.com/eliangilsierra/hoteldesk-web/actions/workflows/ci.yml/badge.svg)](https://github.com/eliangilsierra/hoteldesk-web/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933)](#installation)

## Description

HotelDesk is a front-end operations dashboard built for small and mid-sized hotels. It centralizes the day-to-day work of a property's front desk and back office: tracking reservations, room availability, guest records, and (soon) billing and reporting — all in a single, responsive interface.

This repository currently ships as a **self-contained demo**: all data (rooms, guests, reservations, users) is generated client-side with [Faker](https://fakerjs.dev/) and persisted to `localStorage`. There is no backend yet. The codebase is intentionally structured so that mock data can be swapped for real API calls without touching the UI layer — see [`docs/architecture.md`](docs/architecture.md) for how that boundary is drawn.

### Problem statement

Independent and small-chain hotels are often stuck between two bad options: expensive, over-engineered property management systems (PMS), or a patchwork of spreadsheets and notebooks. HotelDesk aims to sit in between — a lightweight, modern, self-hostable operations layer that covers the essentials well before adding complexity.

### Target users

- Front-desk and reception staff managing daily check-ins/check-outs and reservations
- Hotel administrators who need a real-time view of occupancy and revenue
- Finance staff handling billing and payment tracking

### Key features

- **Dashboard** — real-time occupancy, revenue, and check-in/check-out metrics, with a 7-day occupancy chart
- **Reservations** — searchable list with status tracking (pending, confirmed, checked-in, checked-out, cancelled, no-show)
- **Rooms** — card-based inventory view with status, type, capacity, and amenities
- **Guests** — guest directory with contact info, documents, and stay preferences
- **Role-based access** — Administrator, Reception, and Finance roles with route protection
- **Dark mode** — full light/dark theme support
- Localized for the Colombian market by default (COP currency formatting, `America/Bogota` timezone) — see [`docs/decisions.md`](docs/decisions.md)

### Roadmap

The following modules exist as placeholders in the navigation and are not yet implemented:

- [ ] Calendar (timeline/Gantt view of reservations)
- [ ] Guided check-in / check-out flows
- [ ] Billing and invoice generation
- [ ] Reports (ADR, RevPAR, CSV/XLSX export)
- [ ] Settings (hotel configuration, taxes, policies)
- [ ] Real API/backend integration to replace the mock data layer

## Architecture overview

HotelDesk is a client-only single-page application. See [`docs/architecture.md`](docs/architecture.md) for the full breakdown and [`docs/decisions.md`](docs/decisions.md) for the reasoning behind key choices (why there's no backend yet, why Zustand over Redux, etc.).

```
src/
├── components/
│   ├── layout/       # Shell components (sidebar, header)
│   └── ui/           # shadcn/ui primitives
├── hooks/            # Shared React hooks
├── lib/
│   ├── types.ts      # Domain types
│   ├── stores/       # Zustand state stores (auth, data)
│   ├── utils/        # Currency and date formatting utilities
│   └── mock/         # Faker-based mock data generation
├── pages/            # Route-level components
├── routes.tsx        # Route table
└── App.tsx           # App shell, providers, routing
```

## Tech stack

| Layer | Technology |
|---|---|
| Build tool | Vite 5 |
| Language | TypeScript 5 |
| UI framework | React 18 |
| Component library | shadcn/ui (Radix primitives) |
| Styling | Tailwind CSS |
| State management | Zustand |
| Forms & validation | React Hook Form + Zod |
| Data fetching (future) | TanStack Query |
| Charts | Recharts |
| Mock data | Faker.js |
| Linting | ESLint (flat config) |

## Installation

Requires [Node.js](https://nodejs.org/) 18+ and npm.

```bash
git clone <repository-url>
cd hoteldesk-web
npm install
```

## Environment variables

HotelDesk has no required environment variables today — it runs entirely client-side with mock data. See [`.env.example`](.env.example) for variables that will apply once a real backend is connected.

## Running locally

```bash
npm run dev
```

The app starts at `http://localhost:8080`.

### Demo accounts

Any password is accepted for these demo users (mock authentication only — do not use this pattern in production):

| Role | Email |
|---|---|
| Administrator | `admin@hotel.com` |
| Reception | `recepcion@hotel.com` |
| Finance | `finanzas@hotel.com` |

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Testing

No automated test suite exists yet. This is tracked as a priority in the roadmap — contributions adding test coverage (Vitest + React Testing Library is the intended stack) are welcome.

## Deployment

`npm run build` outputs a static bundle to `dist/`, deployable to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, etc.). No server runtime is required in the current mock-data version.

## Project structure

See [Architecture overview](#architecture-overview) above and [`docs/architecture.md`](docs/architecture.md) for details.

## Contributing

Contributions are welcome. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
