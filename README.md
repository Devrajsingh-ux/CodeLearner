# Zentax - Interactive Coding Education Platform

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)

A modern, full-stack coding education platform built with Next.js, featuring interactive lessons, in-browser code compilation, gamification elements, and an admin dashboard.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [User Flows](#user-flows)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Gamification System](#gamification-system)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## Features

### For Learners
- **Interactive Course Tracks** - Structured learning paths across 9 categories
- **In-Browser Code Editor** - Monaco Editor with syntax highlighting
- **Multi-Language Support** - JavaScript, TypeScript, Python, C++, Java, Go, Rust, and more
- **Code Compilation** - Execute code directly in the browser via Judge0 CE API
- **Progress Tracking** - XP, levels, streaks, and completion percentages
- **Achievements System** - 10 unique badges to earn
- **Coding Problems** - LeetCode-style challenges with difficulty levels
- **Responsive Design** - Works on desktop and mobile

### For Administrators
- **User Management** - View, suspend, and manage user accounts
- **Course Management** - Create, edit, and publish course tracks
- **Lesson Editor** - Add and manage lesson content with DOCX import
- **AI Course Generation** - Generate course content with AI assistance
- **Platform Analytics** - User growth, enrollments, retention metrics
- **System Settings** - Configure platform behavior and integrations

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI** | Tailwind CSS 4, Framer Motion |
| **Icons** | Lucide React, React Icons |
| **Backend** | Appwrite (Database, Auth) |
| **Code Editor** | Monaco Editor |
| **Code Execution** | Judge0 CE API |
| **Validation** | Zod |
| **Linting** | Biome |

---

## Project Structure

```
zentax/
├── public/                     # Static assets
├── scripts/                    # Utility scripts
│   └── create-admin.mjs        # Admin account creation
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages (login, register, verify)
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── verify/
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── dashboard/     # Analytics overview
│   │   │   ├── users/         # User management
│   │   │   ├── courses/       # Course management
│   │   │   ├── lessons/      # Lesson management
│   │   │   ├── settings/      # Platform settings
│   │   │   └── layout.tsx     # Admin layout with auth guard
│   │   ├── api/               # API routes
│   │   │   ├── admin/         # Admin API endpoints
│   │   │   ├── auth/          # Auth session management
│   │   │   ├── compile/       # Code compilation
│   │   │   ├── courses/       # Course data
│   │   │   ├── problems/      # Coding problems
│   │   │   ├── snippets/      # Code snippets
│   │   │   ├── testimonials/  # User testimonials
│   │   │   └── platform/      # Platform stats
│   │   ├── dashboard/         # User dashboard
│   │   ├── learn/            # Course catalog & lessons
│   │   ├── problems/         # Coding challenges
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── home/              # Landing page sections
│   │   ├── learn/             # Learning components
│   │   ├── problems/          # Problem-solving components
│   │   ├── admin/             # Admin panel components
│   │   └── auth/              # Authentication components
│   ├── context/               # React Context providers
│   │   └── AuthContext.tsx    # Authentication state
│   ├── lib/                   # Utility libraries
│   │   ├── appwrite.ts        # Appwrite client
│   │   ├── utils.ts            # Helper functions
│   │   ├── rateLimit.ts       # Rate limiting
│   │   └── lessons.ts          # Lesson utilities
│   ├── types/                 # TypeScript types
│   │   └── index.ts            # Core type definitions
│   └── data/                  # Static data & config
│       ├── courses.ts          # Course categories
│       ├── admin.ts            # Admin types
│       └── achievements/       # Achievement definitions
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── biome.json                 # Biome linter config
└── tsconfig.json
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (Browser)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    │
│  │   Next.js App    │    │  Monaco Editor   │    │  React Context   │    │
│  │   (App Router)   │    │  (Code Input)    │    │  (Auth State)    │    │
│  └────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘    │
│           │                       │                       │               │
│           │    HTTP/Fetch         │                       │               │
└───────────┼───────────────────────┼───────────────────────┼───────────────┘
            │                       │                       │
            ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          NEXT.JS SERVER / API LAYER                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    │
│  │  API Routes      │    │  ISR Pages       │    │  Server         │    │
│  │  (Route Handlers)│    │  (Cached)        │    │  Components     │    │
│  └────────┬─────────┘    └──────────────────┘    └──────────────────┘    │
│           │                                                                │
│           │                                                                │
│           ▼                                                                │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │                     INTERNAL SERVICES                               │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐    │   │
│  │  │ Rate Limit  │  │ Session     │  │ Code Execution          │    │   │
│  │  │ Middleware  │  │ Management  │  │ (JS/TS client-side,     │    │   │
│  │  └─────────────┘  └─────────────┘  │  Others via Judge0)     │    │   │
│  │                                     └─────────────────────────┘    │   │
│  └────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
            │                                        │
            ▼                                        ▼
┌──────────────────────────┐        ┌──────────────────────────────┐
│      APPWRITE CLOUD      │        │       JUDGE0 CE API          │
│  ┌────────────────────┐  │        │  (Code Compilation)         │
│  │  • Databases       │  │        │                              │
│  │  • Auth            │  │        │  Supported Languages:       │
│  │  • Users           │  │        │  • Python, JavaScript        │
│  │  • Preferences     │  │        │  • TypeScript, Java         │
│  └────────────────────┘  │        │  • C++, Go, Rust, etc.      │
└──────────────────────────┘        └──────────────────────────────┘
```

---

## User Flows

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER AUTHENTICATION FLOW                         │
└─────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │  User    │
    │ visits   │
    └────┬─────┘
         │
         ▼
┌─────────────────────────┐
│ Check Session Cookie    │
│ (HttpOnly, Secure)      │
└───────────┬─────────────┘
            │
            ├─── Found ─────────────────────────────────────┐
            │                                               │
            ▼                                               ▼
    ┌───────────────┐                              ┌───────────────┐
    │ Verify with   │                              │ Show Login/   │
    │ Appwrite      │                              │ Register Page │
    └───────┬───────┘                              └───────┬───────┘
            │                                              │
            │ Valid                                        │
            ▼                                              ▼
    ┌───────────────┐                              ┌───────────────┐
    │ Update Context│                              │ User submits  │
    │ & Allow Access│                              │ credentials   │
    └───────┬───────┘                              └───────┬───────┘
            │                                              │
            │                                              ▼
            │                                    ┌─────────────────────┐
            │                                    │ Rate Limit Check    │
            │                                    │ (5 attempts/15min)  │
            │                                    └──────────┬──────────┘
            │                                               │
            │                              ┌────────────────┴───────────┐
            │                              │ Valid                      │
            │                              ▼                           │ Invalid
            │                     ┌───────────────┐                      │
            │                     │ Create Session│                      ▼
            │                     │ & Save Cookie │              ┌───────────────┐
            │                     └───────┬───────┘              │ Show Error &  │
            │                             │                      │ Increment     │
            │                             ▼                      │ Attempt Count │
            │                     ┌───────────────┐              └───────────────┘
            │                     │ Redirect to   │
            │                     │ Dashboard     │
            │                     └───────────────┘
            │
            │ Invalid (expired/revoked)
            ▼
    ┌───────────────┐
    │ Clear Cookie  │
    │ Redirect to   │
    │ Login         │
    └───────────────┘
```

### Learning Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           LEARNING FLOW                                  │
└─────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │  User    │         ┌─────────────────┐
    │ enters   │────────▶│   /learn page   │
    │ platform │         │  (Course Grid)  │
    └──────────┘         └────────┬────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
            ┌────────────┐ ┌────────────┐ ┌────────────┐
            │  Search &  │ │  Filter by │ │   Browse   │
            │  Filter    │ │  Category  │ │  Featured  │
            └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
                  │              │              │
                  └──────────────┼──────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │   Course Track Page     │
                    │   /learn/[track]        │
                    │  • Course Overview       │
                    │  • Curriculum List       │
                    │  • Start/Continue Button │
                    └────────────┬───────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                          │
                    ▼                          ▼
            ┌──────────────┐            ┌──────────────┐
            │   Enroll     │            │   Continue   │
            │   (First     │            │   (Return    │
            │    Time)     │            │    User)     │
            └──────┬───────┘            └──────┬───────┘
                   │                           │
                   └───────────┬───────────────┘
                               │
                               ▼
                    ┌────────────────────────┐
                    │    Lesson Page         │
                    │  /learn/[track]/       │
                    │       [lesson]         │
                    └────────────┬───────────┘
                                 │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Video/Article │    │   Code Editor   │    │     Quiz        │
│   Content       │    │   (Monaco)      │    │   Questions     │
│                 │    │                 │    │                 │
│  • Watch video  │    │  • Write code   │    │  • Answer Qs    │
│  • Read content │    │  • Run locally  │    │  • Submit       │
│  • Mark complete│    │  • Submit       │    │  • Get feedback │
│                 │    │  • Get result   │    │                 │
└─────────────────┘    └────────┬────────┘    └─────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
            ┌──────────────┐        ┌──────────────┐
            │   Correct    │        │   Incorrect  │
            │   +XP Awarded │        │   +Try Again │
            └──────┬───────┘        └──────────────┘
                   │
                   ▼
            ┌──────────────┐
            │  Next Lesson │
            │  or Complete │
            └──────────────┘
```

### Code Compilation Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       CODE COMPILATION FLOW                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐                    ┌─────────────────┐
│  User Types     │                    │  Monaco Editor  │
│  Code           │──────────────────▶ │  (Syntax Highlight)
└─────────────────┘                    └────────┬────────┘
                                                │
                                                ▼
                                ┌───────────────────────────┐
                                │     Language Selection     │
                                │   (JS, TS, Python, etc.)   │
                                └─────────────┬─────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    │                                                   │
                    ▼                                                   ▼
        ┌───────────────────────┐                           ┌───────────────────────┐
        │  JavaScript / TypeScript│                           │   Other Languages    │
        │  (Client-Side)         │                           │   (Judge0 API)        │
        └───────────┬───────────┘                           └───────────┬───────────┘
                    │                                                   │
                    ▼                                                   ▼
        ┌───────────────────────┐                           ┌───────────────────────┐
        │  Function constructor │                           │   POST /api/compile   │
        │  + eval() with safe   │                           │   { code, languageId }│
        │  sandbox limits       │                           └───────────┬───────────┘
        └───────────┬───────────┘                                           │
                    │                                                       │
                    │                                                       ▼
                    │                                       ┌───────────────────────────┐
                    │                                       │   Create Submission       │
                    │                                       │   (Judge0 API)            │
                    │                                       └───────────┬───────────┘
                    │                                                   │
                    ▼                                                   ▼
        ┌───────────────────────┐                           ┌───────────────────────┐
        │  Execute with         │                           │   Poll for Result      │
        │  timeout (5s)        │                           │   (max 15 attempts)    │
        └───────────┬───────────┘                           └───────────┬───────────┘
                    │                                                   │
                    │                              ┌────────────────────┴───────────┐
                    │                              │                                │
                    │                              ▼                                ▼
                    │                   ┌─────────────────┐             ┌─────────────────┐
                    │                   │    Complete     │             │     Timeout     │
                    │                   │    + Return     │             │    (Error)      │
                    │                   │    Output       │             └─────────────────┘
                    │                   └─────────────────┘
                    ▼
        ┌───────────────────────┐
        │  Display Output      │
        │  (Console or Error)  │
        └───────────────────────┘
```

### Admin Dashboard Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       ADMIN DASHBOARD FLOW                               │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│  Admin User  │──────────▶ /admin
│  Access      │
└──────┬───────┘
       │
       ▼
┌─────────────────────────┐
│  Admin Layout (Guard)   │
│  • Check auth cookie    │
│  • Verify admin role    │
│  • Redirect if invalid  │
└───────────┬─────────────┘
            │
            ▼
    ┌───────────────┐
    │   Dashboard   │◀──────────────────┐
    │   (Overview)  │                   │
    └───────┬───────┘                   │
            │                           │
            ├───┬───┬───┬───┬───┬───┬───┤
            │   │   │   │   │   │   │   │
            ▼   ▼   ▼   ▼   ▼   ▼   ▼   ▼
        ┌─────┬─────┬─────┬─────┬─────┬─────┐
        │Users│Courses│Lessons│Settings│Analytics│
        └─────┴─────┴─────┴─────┴─────┴─────┘
            │       │        │          │
            ▼       ▼        ▼          ▼
    ┌───────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
    │ • List    │ │• List  │ │• List  │ │• General │
    │ • View    │ │• Edit  │ │• Add   │ │• Security │
    │ • Suspend │ │• Create│ │• Edit  │ │• Email   │
    │ • Delete  │ │• Delete│ │• Delete│ │• OAuth   │
    └───────────┘ └────────┘ └────────┘ └──────────┘
```

---

## API Reference

### Public APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/courses` | GET | Fetch all course tracks |
| `/api/problems` | GET | Fetch coding problems |
| `/api/testimonials` | GET | Fetch user testimonials |
| `/api/snippets` | GET | Fetch code snippets |
| `/api/platform/stats` | GET | Fetch platform statistics |
| `/api/compile` | POST | Compile and execute code |

### Authentication APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/session` | GET | Get current session |
| `/api/auth/session` | POST | Create session |
| `/api/auth/session` | DELETE | Logout (clear session) |

### Admin APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/users` | GET | List all users |
| `/api/admin/courses` | GET, POST | List/create courses |
| `/api/admin/courses/import` | POST | Import from DOCX |
| `/api/admin/courses/generate` | POST | AI generate course |
| `/api/admin/lessons` | GET, POST, PUT, DELETE | Manage lessons |
| `/api/admin/settings` | GET, PUT | Platform settings |
| `/api/admin/stats` | GET | Admin dashboard stats |

### Compile Request/Response

```typescript
// POST /api/compile
// Request
{
  "code": "console.log('Hello')",
  "languageId": 63  // JavaScript
}

// Response
{
  "output": "Hello",
  "stderr": "",
  "status": "Accepted"
}
```

### Language IDs (Judge0)

| Language | ID |
|----------|-----|
| JavaScript | 63 |
| TypeScript | 75 |
| Python | 71 |
| Java | 62 |
| C++ | 54 |
| Go | 60 |
| Rust | 73 |

---

## Data Models

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: "student" | "instructor" | "admin";
  joinedAt: string;
  streak: number;
  xp: number;
  level: number;
}
```

### Track (Course)

```typescript
interface Track {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessonsCount: number;
  duration: string;
  enrolledCount: number;
  rating: number;
  tags: string[];
  category: TrackCategory;
  isFeatured?: boolean;
  isNew?: boolean;
}

type TrackCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Data & AI"
  | "Mobile"
  | "DevOps & Cloud"
  | "Systems"
  | "Web3 & Security"
  | "Game Dev";
```

### Lesson

```typescript
interface Lesson {
  id: string;
  slug: string;
  trackId: string;
  title: string;
  description: string;
  duration: string;
  type: "video" | "article" | "exercise" | "quiz";
  order: number;
  isLocked?: boolean;
}
```

### Problem

```typescript
interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  acceptance: number;
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  hints: string[];
  starterCode: Partial<Record<string, string>>;
}
```

---

## Gamification System

### XP & Levels

| Action | XP Awarded |
|--------|------------|
| Complete Lesson | 100 XP |
| Complete Quiz | 50 XP |
| Solve Problem | 150 XP |
| Daily Login | 10 XP |
| 7-Day Streak Bonus | 500 XP |

### Level Thresholds

| Level | Total XP Required |
|-------|-------------------|
| 1 | 0 |
| 2 | 100 |
| 3 | 250 |
| 5 | 600 |
| 10 | 2,000 |
| 25 | 10,000 |
| 50 | 50,000 |

### Achievements

| Achievement | Description | Criteria |
|-------------|-------------|----------|
| First Steps | Welcome to the platform | Complete first lesson |
| Century Club | 100 problems solved | Solve 100 problems |
| Streak Warrior | 7-day learning streak | Maintain 7-day streak |
| Sprint Learner | 25 lessons in a week | Complete 25 lessons in 7 days |
| Course Collector | Complete 5 courses | Finish 5 track courses |
| Rising Star | Reach Level 10 | Achieve level 10 |
| Seasoned Coder | 500 XP earned | Earn 500 total XP |
| Problem Solver | 50 problems solved | Solve 50 problems |
| Social Butterfly | First comment/post | Engage with community |
| Marathoner | 30-day streak | Maintain 30-day streak |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun
- Appwrite account (self-hosted or cloud)
- Judge0 API key (optional, for server-side compilation)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd zentax

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-api-key

# Judge0 CE API (Optional - for server-side code compilation)
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your-rapidapi-key

# Platform Settings
NEXT_PUBLIC_PLATFORM_NAME=Zentax
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Appwrite Setup

1. Create a new Appwrite project
2. Create the following collections:
   - `users` (or use Appwrite Auth built-in)
   - `courses`
   - `lessons`
   - `problems`
   - `settings`
3. Set appropriate permissions

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run Biome linter
npm run format           # Format code with Biome

# Admin
npm run create-admin     # Create admin user (node scripts/create-admin.mjs)
```

---

## License

This project is private and proprietary.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
  Built with ❤️ by the Zentax Team
</p>
