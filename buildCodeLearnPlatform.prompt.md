---
name: buildZentaxPlatform
description: Universal God Mode Protocol for a Production-Grade Coding Learning Platform
---
# ROLE: Senior Multi-Stack Architect (God Mode)
# CONTEXT: High-priority development of a Full-Stack Coding Learning Platform using Next.js 16, React 19, Tailwind CSS v4, TypeScript 5

# MANDATORY RULES:
- ZERO-TOLERANCE for hallucinations or placeholders (No `// implement here`).
- AUDIT all logic for edge cases and security breaches.
- OPTIMIZE for extreme scale and performance.
- DESIGN for intuitive and elite UX/UI flow.

# GOD MODE THREE PILLARS:

## Pillar 1 — SECURITY (Zero-Trust Architecture)
- All user inputs sanitized server-side via Zod schema validation before DB write.
- Passwords hashed with bcrypt (cost factor ≥ 12); never stored in plaintext.
- JWT tokens use HS256/RS256 with short-lived access tokens (15 min) + refresh tokens (7d) in HttpOnly cookies.
- All API routes protected with Next.js Middleware + RBAC role checks.
- CSRF protection via SameSite cookie + CSRF token double-submit pattern.
- Rate-limiting on auth endpoints (max 5 req/min per IP).
- XSS prevention: React's default escaping + strict CSP headers.

## Pillar 2 — PERFORMANCE (O(n) Scale)
- Use React Server Components (RSC) by default; opt into `"use client"` only at leaf nodes.
- Static course catalog pages with ISR (revalidate: 3600).
- Dynamic user dashboard with streaming (`<Suspense>`) and skeleton loaders.
- Images optimized via `next/image` with AVIF/WebP.
- Code editor (Monaco/CodeMirror) lazy-loaded via `dynamic(() => import(...), { ssr: false })`.
- Route prefetching for instant navigation.
- CSS-only animations via Tailwind; `framer-motion` only for complex sequences.

## Pillar 3 — USER EXPERIENCE (WCAG 2.1 AA)
- Dark-first, responsive design (mobile → tablet → desktop) with no layout shift.
- 60 fps smooth transitions; `will-change` and `transform` hardware acceleration used sparingly.
- Keyboard navigable: all interactive elements have visible `:focus-visible` rings.
- ARIA labels on icons, live regions for progress feedback, roles on landmark elements.
- Color contrast ratio ≥ 4.5:1 for text; ≥ 3:1 for UI components.
- Error states shown inline with clear, actionable copy.
- Skeleton screens (not spinners) for async content.

# TASK DEFINITION:
Build a production-grade Coding Learning Platform with the following features:
1. **Home / Landing Page** — Hero with animated code snippet, features grid, course tracks, stats counter, testimonials, and CTA.
2. **Authentication** — Register (email + password + username) and Login with client-side validation, server actions, and secure session management.
3. **Dashboard** — Personalized greeting, progress rings, enrolled courses, activity streak, recommended next lessons.
4. **Course Catalog** (/learn) — Filterable, searchable grid of course tracks (Web, Backend, Data Science, DevOps, etc.).
5. **Lesson Page** (/learn/[track]/[lesson]) — Split-pane layout: lesson markdown content + in-browser code editor with run/test capability.
6. **Profile & Settings** — Avatar upload, bio, social links, notification preferences.

# FILE STRUCTURE (enforced):
```
src/
  app/
    (auth)/login/page.tsx
    (auth)/register/page.tsx
    (auth)/layout.tsx
    (dashboard)/dashboard/page.tsx
    (dashboard)/layout.tsx
    learn/page.tsx
    learn/[track]/page.tsx
    learn/[track]/[lesson]/page.tsx
    api/auth/[...nextauth]/route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    ui/           # Button, Input, Card, Badge, Avatar, Progress, Skeleton
    layout/       # Navbar, Footer, Sidebar
    home/         # Hero, Features, Stats, CourseCard, Testimonials, CTA
    auth/         # LoginForm, RegisterForm
    dashboard/    # ProgressCard, ActivityFeed
    learn/        # TrackCard, LessonNavigation, CodeEditor
  lib/
    auth.ts       # NextAuth config
    utils.ts      # cn(), formatDate(), truncate()
    db.ts         # Prisma/Drizzle client
    validations.ts # Zod schemas
  types/index.ts
  hooks/
    useAuth.ts
    useProgress.ts
  data/
    courses.ts    # static seed data
    tracks.ts
```

# TECH STACK:
- **Framework**: Next.js 16 (App Router, RSC, Server Actions)
- **UI**: React 19, Tailwind CSS v4, Lucide React icons
- **Auth**: NextAuth.js v5 (Auth.js) with credentials + OAuth (GitHub/Google)
- **Database**: PostgreSQL via Prisma ORM
- **Validation**: Zod
- **Animation**: CSS keyframes + optional Framer Motion for hero
- **Code Editor**: Monaco Editor (lazy-loaded)
- **Deployment target**: Vercel (Edge-compatible)
