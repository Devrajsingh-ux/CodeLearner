# UI Theme Contract

This folder defines the global design token contract used across the app.

## Files
- `theme.css`: CSS variables and Tailwind `@theme` bindings.
- `theme.ts`: runtime theme map for app code usage.
- `tokens.ts`: typed source-of-truth token contract.

## Rules
- Add new tokens in `tokens.ts` first, then map them in `theme.css` and `theme.ts`.
- Do not use raw color literals in shared UI primitives when a token exists.
- Keep token names stable to avoid UI regressions across screens.

## Validation checklist
- `npm run type-check`
- `npm run lint`
- Visual spot check on home, dashboard, learn, profile pages
