# Contributing to HotelDesk

Thanks for your interest in contributing! This document covers the basics of getting set up and submitting a change.

## Getting started

```bash
git clone <repository-url>
cd hoteldesk-web
npm install
npm run dev
```

## Development workflow

1. Create a branch off `main` named `type/short-description` (e.g. `feat/checkin-flow`, `fix/reservation-overlap`).
2. Make your change, keeping commits atomic and focused.
3. Run the checks below before opening a pull request.
4. Open a PR using the provided template, describing what changed and why.

## Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <description>

[optional body]
```

Common types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `style`, `perf`, `build`, `ci`.

Examples:
- `feat(reservations): add status filter to reservations table`
- `fix(auth): prevent redirect loop on expired session`
- `docs: update environment variable reference`

## Code style

- TypeScript everywhere in `src/`; avoid `any` where a real type is available.
- Components are functional, using hooks — no class components.
- Run `npm run lint` before committing; the CI workflow will fail the build otherwise.
- Prefer editing shared `lib/` utilities over duplicating logic in a page component.
- Domain-facing strings (routes, labels shown to hotel staff) are in Spanish, matching the target market; code identifiers, comments, and documentation are in English.

## Checks before submitting a PR

```bash
npm run lint
npm run build
```

Both must pass. There is no automated test suite yet (see the roadmap in `README.md`); if you're adding one, Vitest + React Testing Library is the intended stack — open an issue first to discuss the setup.

## Reporting bugs / requesting features

Please use the issue templates under `.github/ISSUE_TEMPLATE/`.
