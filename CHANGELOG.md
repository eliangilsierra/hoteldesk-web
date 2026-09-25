# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-09-28

### Added
- Initial public release of HotelDesk as an independent, rebranded project.
- Dashboard with occupancy, revenue, and check-in/check-out metrics.
- Reservations, Rooms, and Guests management pages backed by mock data.
- Role-based mock authentication (Administrator, Reception, Finance).
- Dark mode support.
- Project documentation: README, CONTRIBUTING, architecture and decision records.
- GitHub issue/PR templates and a CI workflow (lint + build).

### Changed
- Rebranded from the original Lovable-generated scaffold (`vite_react_shadcn_ts` / "Hotel Admin") to **HotelDesk**.
- Consolidated the two prior README files into a single, comprehensive `README.md`.
- Extracted the route table out of `App.tsx` into `src/routes.tsx`.

### Removed
- `lovable-tagger` development dependency and its Vite plugin wiring (no longer tied to the Lovable platform).
- Duplicate lockfile (`bun.lockb`) in favor of a single package manager (npm).
