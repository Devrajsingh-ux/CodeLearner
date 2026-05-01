# Screens Architecture

This folder contains route screen implementations, while route files under `src/app/**/page.tsx` should stay as thin wrappers.

## Convention
- Screen file: `src/app/screens/<route>/index.tsx`
- Wrapper file: `src/app/<route>/page.tsx`
- Wrapper responsibility: re-export the corresponding screen only.
- Screen responsibility: data loading, rendering logic, and metadata when needed.

## Why
- Keeps route tree stable for Next.js while centralizing page logic.
- Reduces merge conflicts when multiple teams touch route wrappers.
- Makes screen modules easier to test and reuse.

## Migration rule
When adding a new route, create screen first, then wrapper re-export.
