# Contributing to Zentax

Thank you for your interest in contributing to Zentax!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/zentax.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

```bash
# Copy environment variables
cp .env.example .env.local

# Setup database
npm run setup:db

# Start development server
npm run dev
```

## Code Standards

### Linting & Formatting

We use [Biome](https://biomejs.dev/) for linting and formatting.

```bash
# Check for issues
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### TypeScript

- Use strict TypeScript
- Avoid `any` type
- Export types from `src/types/index.ts`
- Use descriptive type names

### React Components

- Use functional components with hooks
- Co-locate component styles
- Use Lucide React icons
- Follow existing naming conventions

## Pull Request Process

1. Ensure all checks pass (`lint`, `type-check`, `build`)
2. Update documentation if needed
3. Follow the commit message format
4. Request review from maintainers

## Commit Message Format

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
```

Examples:
- `feat(api): add user progress endpoint`
- `fix(editor): resolve syntax highlighting issue`
- `docs(readme): update installation guide`

## Reporting Issues

- Use GitHub Issues
- Include reproduction steps
- Specify environment details
- Add screenshots for UI issues

## Questions?

Open an issue for discussion before starting major changes.
