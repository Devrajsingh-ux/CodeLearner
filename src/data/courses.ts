import type { Stat, Testimonial, Track, TrackCategory } from "@/types";

export const CATEGORIES: TrackCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Data & AI",
  "Mobile",
  "DevOps & Cloud",
  "Systems",
  "Web3 & Security",
  "Game Dev",
];

export const tracks: Track[] = [
  // â”€â”€â”€ Languages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "1",
    slug: "javascript",
    title: "JavaScript Mastery",
    description:
      "From fundamentals to advanced patterns â€” closures, async/await, the event loop, promises, and modern ES2024+ features.",
    icon: "âš¡",
    color: "#F7DF1E",
    gradient: "from-yellow-500/20 to-orange-500/20",
    difficulty: "Beginner",
    lessonsCount: 48,
    duration: "32h",
    enrolledCount: 52400,
    rating: 4.9,
    tags: ["ES2024", "DOM", "Async", "OOP"],
    category: "Languages",
    isFeatured: true,
  },
  {
    id: "2",
    slug: "typescript",
    title: "TypeScript Pro",
    description:
      "Type-safe development at scale. Generics, utility types, template literals, decorators, and strict configuration strategies.",
    icon: "ðŸ”·",
    color: "#3178C6",
    gradient: "from-blue-600/20 to-cyan-500/20",
    difficulty: "Intermediate",
    lessonsCount: 36,
    duration: "24h",
    enrolledCount: 31800,
    rating: 4.8,
    tags: ["Generics", "Types", "OOP", "Decorators"],
    category: "Languages",
    isFeatured: true,
  },
  {
    id: "3",
    slug: "python",
    title: "Python for Developers",
    description:
      "Pythonic code, data structures, OOP, decorators, context managers, async programming, and real-world scripting projects.",
    icon: "ðŸ",
    color: "#3776AB",
    gradient: "from-blue-500/20 to-green-500/20",
    difficulty: "Beginner",
    lessonsCount: 44,
    duration: "28h",
    enrolledCount: 68100,
    rating: 4.9,
    tags: ["OOP", "Async", "Data Structures", "Testing"],
    category: "Languages",
    isFeatured: true,
  },
  {
    id: "4",
    slug: "rust",
    title: "Rust Systems Programming",
    description:
      "Memory safety without GC. Ownership, borrowing, lifetimes, traits, async Rust, WebAssembly, and building CLI & web servers.",
    icon: "ðŸ¦€",
    color: "#CE422B",
    gradient: "from-orange-600/20 to-red-600/20",
    difficulty: "Advanced",
    lessonsCount: 52,
    duration: "40h",
    enrolledCount: 14200,
    rating: 4.9,
    tags: ["Ownership", "Async", "WebAssembly", "CLI"],
    category: "Languages",
    isNew: true,
  },
  {
    id: "5",
    slug: "golang",
    title: "Go (Golang) Essentials",
    description:
      "Concurrency with goroutines and channels, interfaces, error handling patterns, Go modules, HTTP servers, and cloud-native tooling.",
    icon: "ðŸ¹",
    color: "#00ADD8",
    gradient: "from-cyan-500/20 to-teal-500/20",
    difficulty: "Intermediate",
    lessonsCount: 40,
    duration: "28h",
    enrolledCount: 19400,
    rating: 4.8,
    tags: ["Goroutines", "Channels", "HTTP", "Microservices"],
    category: "Languages",
    isNew: true,
  },
  {
    id: "6",
    slug: "java",
    title: "Java Modern Development",
    description:
      "Core Java 21 â€” records, sealed classes, virtual threads (Project Loom), streams, generics, and Spring Boot fundamentals.",
    icon: "â˜•",
    color: "#ED8B00",
    gradient: "from-amber-500/20 to-orange-600/20",
    difficulty: "Intermediate",
    lessonsCount: 56,
    duration: "42h",
    enrolledCount: 38500,
    rating: 4.7,
    tags: ["Java 21", "Spring", "Streams", "OOP"],
    category: "Languages",
  },
  {
    id: "7",
    slug: "cpp",
    title: "C++ Modern Programming",
    description:
      "C++20 and beyond â€” templates, smart pointers, RAII, coroutines, ranges, concurrency, and STL mastery for systems performance.",
    icon: "âš™ï¸",
    color: "#00599C",
    gradient: "from-blue-700/20 to-indigo-600/20",
    difficulty: "Advanced",
    lessonsCount: 58,
    duration: "44h",
    enrolledCount: 16700,
    rating: 4.8,
    tags: ["C++20", "Templates", "STL", "Concurrency"],
    category: "Languages",
  },
  {
    id: "8",
    slug: "csharp",
    title: "C# & .NET Mastery",
    description:
      "Modern C# 12 â€” LINQ, pattern matching, async/await, Blazor, Entity Framework Core, and building production .NET 8 apps.",
    icon: "ðŸ”µ",
    color: "#512BD4",
    gradient: "from-violet-600/20 to-purple-700/20",
    difficulty: "Intermediate",
    lessonsCount: 50,
    duration: "36h",
    enrolledCount: 22800,
    rating: 4.7,
    tags: ["LINQ", "Blazor", "Entity Framework", ".NET 8"],
    category: "Languages",
  },
  {
    id: "9",
    slug: "kotlin",
    title: "Kotlin for JVM & Android",
    description:
      "Null safety, coroutines, extension functions, sealed classes, Kotlin Multiplatform, and building idiomatic Android apps.",
    icon: "ðŸŸ£",
    color: "#7F52FF",
    gradient: "from-purple-600/20 to-violet-500/20",
    difficulty: "Intermediate",
    lessonsCount: 42,
    duration: "30h",
    enrolledCount: 13300,
    rating: 4.8,
    tags: ["Coroutines", "KMP", "Android", "Null Safety"],
    category: "Languages",
    isNew: true,
  },
  {
    id: "10",
    slug: "swift",
    title: "Swift Programming",
    description:
      "Optionals, protocols, generics, result builders, Swift concurrency (async/await actors), and building modern iOS & macOS apps.",
    icon: "ðŸŽ",
    color: "#FA7343",
    gradient: "from-orange-500/20 to-red-500/20",
    difficulty: "Intermediate",
    lessonsCount: 46,
    duration: "34h",
    enrolledCount: 17600,
    rating: 4.8,
    tags: ["SwiftUI", "Protocols", "Actors", "CoreData"],
    category: "Languages",
  },
  {
    id: "11",
    slug: "ruby",
    title: "Ruby & Rails",
    description:
      "Ruby idioms, blocks, metaprogramming, ActiveRecord, REST APIs with Rails 7, Hotwire Turbo, and test-driven development with RSpec.",
    icon: "ðŸ’Ž",
    color: "#CC342D",
    gradient: "from-red-600/20 to-rose-500/20",
    difficulty: "Beginner",
    lessonsCount: 44,
    duration: "32h",
    enrolledCount: 11900,
    rating: 4.7,
    tags: ["Rails 7", "ActiveRecord", "Hotwire", "RSpec"],
    category: "Languages",
  },
  {
    id: "12",
    slug: "php",
    title: "PHP 8 & Laravel",
    description:
      "Modern PHP 8 â€” fibers, named arguments, enums, Eloquent ORM, Livewire, Inertia.js, and full-stack Laravel applications.",
    icon: "ðŸ˜",
    color: "#777BB4",
    gradient: "from-indigo-400/20 to-purple-500/20",
    difficulty: "Beginner",
    lessonsCount: 46,
    duration: "34h",
    enrolledCount: 19200,
    rating: 4.6,
    tags: ["PHP 8", "Laravel", "Eloquent", "Livewire"],
    category: "Languages",
  },
  {
    id: "13",
    slug: "dart",
    title: "Dart Programming",
    description:
      "Strong typing, null safety, isolates, records, patterns, async streams, and Flutter-ready Dart for cross-platform development.",
    icon: "ðŸŽ¯",
    color: "#0175C2",
    gradient: "from-sky-600/20 to-blue-500/20",
    difficulty: "Beginner",
    lessonsCount: 32,
    duration: "22h",
    enrolledCount: 9800,
    rating: 4.7,
    tags: ["Null Safety", "Async", "Isolates", "Flutter"],
    category: "Languages",
  },
  {
    id: "14",
    slug: "elixir",
    title: "Elixir & Phoenix",
    description:
      "Functional programming, pattern matching, the Actor model with OTP, LiveView real-time UIs, and fault-tolerant distributed systems.",
    icon: "ðŸ’œ",
    color: "#6E4A7E",
    gradient: "from-purple-700/20 to-fuchsia-600/20",
    difficulty: "Advanced",
    lessonsCount: 44,
    duration: "32h",
    enrolledCount: 6200,
    rating: 4.9,
    tags: ["OTP", "Phoenix LiveView", "GenServer", "Ecto"],
    category: "Languages",
    isNew: true,
  },
  {
    id: "15",
    slug: "scala",
    title: "Scala & Functional JVM",
    description:
      "Type inference, case classes, implicit conversions, Futures, Akka actors, and building robust data pipelines with Apache Spark.",
    icon: "ðŸ”´",
    color: "#DC322F",
    gradient: "from-red-600/20 to-orange-500/20",
    difficulty: "Advanced",
    lessonsCount: 46,
    duration: "34h",
    enrolledCount: 5800,
    rating: 4.8,
    tags: ["Functional", "Akka", "Spark", "Type System"],
    category: "Languages",
    isNew: true,
  },
  {
    id: "16",
    slug: "haskell",
    title: "Haskell Functional Programming",
    description:
      "Pure functions, type classes, monads, functors, lazy evaluation, and advanced type-level programming in real-world Haskell.",
    icon: "Î»",
    color: "#5D4F85",
    gradient: "from-purple-800/20 to-indigo-700/20",
    difficulty: "Advanced",
    lessonsCount: 40,
    duration: "32h",
    enrolledCount: 3400,
    rating: 4.9,
    tags: ["Monads", "Type Classes", "Lazy", "GHC"],
    category: "Languages",
    isNew: true,
  },
  {
    id: "17",
    slug: "r-lang",
    title: "R Programming",
    description:
      "Statistical computing, data wrangling with tidyverse, ggplot2 visualizations, R Markdown, Shiny apps, and machine learning with caret.",
    icon: "ðŸ“ˆ",
    color: "#276DC3",
    gradient: "from-blue-700/20 to-cyan-600/20",
    difficulty: "Beginner",
    lessonsCount: 36,
    duration: "24h",
    enrolledCount: 13600,
    rating: 4.7,
    tags: ["tidyverse", "ggplot2", "Statistics", "Shiny"],
    category: "Languages",
    isNew: true,
  },
  {
    id: "18",
    slug: "lua",
    title: "Lua Scripting & Game Dev",
    description:
      "Lightweight scripting, metatables, coroutines, embedding in C/C++, and building game logic and mods with Lua in LÃ–VE and Roblox.",
    icon: "ðŸŒ™",
    color: "#000080",
    gradient: "from-blue-900/20 to-indigo-800/20",
    difficulty: "Beginner",
    lessonsCount: 28,
    duration: "18h",
    enrolledCount: 7200,
    rating: 4.6,
    tags: ["Metatables", "Coroutines", "LÃ–VE", "Roblox"],
    category: "Languages",
    isNew: true,
  },

  // â”€â”€â”€ Frontend â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "21",
    slug: "react",
    title: "React & Next.js",
    description:
      "Build production-grade UIs with hooks, context, server components, streaming, Suspense, and the full Next.js App Router.",
    icon: "âš›ï¸",
    color: "#61DAFB",
    gradient: "from-cyan-400/20 to-blue-500/20",
    difficulty: "Intermediate",
    lessonsCount: 56,
    duration: "40h",
    enrolledCount: 48200,
    rating: 4.9,
    tags: ["Hooks", "RSC", "App Router", "Server Actions"],
    category: "Frontend",
    isFeatured: true,
    isNew: true,
  },
  {
    id: "22",
    slug: "vue",
    title: "Vue.js 3 Complete",
    description:
      "Composition API, Pinia state management, Vue Router, Nuxt 3 SSR, TypeScript integration, and testing with Vitest.",
    icon: "ðŸ’š",
    color: "#42B883",
    gradient: "from-emerald-500/20 to-green-400/20",
    difficulty: "Intermediate",
    lessonsCount: 48,
    duration: "34h",
    enrolledCount: 21400,
    rating: 4.8,
    tags: ["Composition API", "Pinia", "Nuxt 3", "SSR"],
    category: "Frontend",
    isNew: true,
  },
  {
    id: "23",
    slug: "angular",
    title: "Angular Mastery",
    description:
      "Standalone components, signals, reactive forms, RxJS operators, Angular Material, zoneless change detection, and SSR with Angular Universal.",
    icon: "ðŸ”º",
    color: "#DD0031",
    gradient: "from-red-600/20 to-orange-500/20",
    difficulty: "Intermediate",
    lessonsCount: 52,
    duration: "38h",
    enrolledCount: 17800,
    rating: 4.7,
    tags: ["Signals", "RxJS", "Forms", "Angular 17"],
    category: "Frontend",
    isNew: true,
  },
  {
    id: "24",
    slug: "svelte",
    title: "Svelte & SvelteKit",
    description:
      "Zero-runtime-overhead components, Svelte 5 runes, stores, transitions, SvelteKit routing, form actions, and edge deployment.",
    icon: "ðŸ”¥",
    color: "#FF3E00",
    gradient: "from-orange-600/20 to-red-500/20",
    difficulty: "Intermediate",
    lessonsCount: 38,
    duration: "26h",
    enrolledCount: 9400,
    rating: 4.8,
    tags: ["Svelte 5", "SvelteKit", "Runes", "Forms"],
    category: "Frontend",
    isNew: true,
  },
  {
    id: "25",
    slug: "html-css",
    title: "HTML & CSS Mastery",
    description:
      "Semantic HTML5, Flexbox, Grid, container queries, CSS animations, responsive design, accessibility (WCAG 2.1 AA), and CSS architecture.",
    icon: "ðŸŽ¨",
    color: "#E34C26",
    gradient: "from-orange-500/20 to-pink-500/20",
    difficulty: "Beginner",
    lessonsCount: 42,
    duration: "28h",
    enrolledCount: 54700,
    rating: 4.8,
    tags: ["Flexbox", "Grid", "Animations", "WCAG"],
    category: "Frontend",
  },
  {
    id: "26",
    slug: "tailwind-css",
    title: "Tailwind CSS Complete",
    description:
      "Utility-first mastery â€” configuration, custom design systems, Tailwind plugins, component extraction, and dark mode strategies.",
    icon: "ðŸŒŠ",
    color: "#06B6D4",
    gradient: "from-cyan-500/20 to-sky-400/20",
    difficulty: "Beginner",
    lessonsCount: 28,
    duration: "18h",
    enrolledCount: 23100,
    rating: 4.8,
    tags: ["Utility-First", "Design System", "Plugins", "Dark Mode"],
    category: "Frontend",
    isNew: true,
  },
  {
    id: "27",
    slug: "threejs",
    title: "Three.js & WebGL",
    description:
      "3D graphics in the browser â€” geometries, materials, lighting, shaders (GLSL), animations, physics, and building immersive WebGL experiences.",
    icon: "ðŸŒ",
    color: "#049EF4",
    gradient: "from-blue-500/20 to-indigo-500/20",
    difficulty: "Advanced",
    lessonsCount: 44,
    duration: "34h",
    enrolledCount: 7600,
    rating: 4.8,
    tags: ["Three.js", "GLSL", "Shaders", "Physics"],
    category: "Frontend",
    isNew: true,
  },

  // â”€â”€â”€ Backend â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "31",
    slug: "nodejs",
    title: "Node.js Backend",
    description:
      "REST APIs, authentication flows, database integration, WebSockets, BullMQ job queues, and zero-downtime production deployment.",
    icon: "ðŸŸ¢",
    color: "#339933",
    gradient: "from-green-600/20 to-emerald-400/20",
    difficulty: "Intermediate",
    lessonsCount: 40,
    duration: "30h",
    enrolledCount: 24600,
    rating: 4.8,
    tags: ["Express", "JWT", "PostgreSQL", "Redis"],
    category: "Backend",
  },
  {
    id: "32",
    slug: "nestjs",
    title: "NestJS Enterprise",
    description:
      "TypeScript-first Node.js framework â€” decorators, dependency injection, microservices, guards, pipes, interceptors, and gRPC.",
    icon: "ðŸ°",
    color: "#E0234E",
    gradient: "from-rose-600/20 to-red-500/20",
    difficulty: "Advanced",
    lessonsCount: 42,
    duration: "30h",
    enrolledCount: 9200,
    rating: 4.8,
    tags: ["DI", "gRPC", "Microservices", "Guards"],
    category: "Backend",
    isNew: true,
  },
  {
    id: "33",
    slug: "django",
    title: "Django & DRF",
    description:
      "Batteries-included web development â€” ORM, class-based views, Django REST Framework, Celery tasks, caching, and production deployment.",
    icon: "ðŸ¦Š",
    color: "#0C4B33",
    gradient: "from-green-800/20 to-teal-600/20",
    difficulty: "Intermediate",
    lessonsCount: 44,
    duration: "32h",
    enrolledCount: 15900,
    rating: 4.7,
    tags: ["ORM", "DRF", "Celery", "Auth"],
    category: "Backend",
  },
  {
    id: "34",
    slug: "fastapi",
    title: "FastAPI & Async Python",
    description:
      "High-performance Python APIs â€” Pydantic v2, async SQLAlchemy, OAuth2, Background Tasks, WebSockets, and auto OpenAPI documentation.",
    icon: "âš¡",
    color: "#009688",
    gradient: "from-teal-600/20 to-cyan-500/20",
    difficulty: "Intermediate",
    lessonsCount: 36,
    duration: "24h",
    enrolledCount: 12800,
    rating: 4.9,
    tags: ["Pydantic", "Async", "OAuth2", "OpenAPI"],
    category: "Backend",
    isNew: true,
  },
  {
    id: "35",
    slug: "graphql",
    title: "GraphQL Mastery",
    description:
      "Schema design, resolvers, subscriptions, DataLoaders, N+1 prevention, Apollo Server/Client, and Federation for microservices.",
    icon: "ðŸ”—",
    color: "#E535AB",
    gradient: "from-pink-600/20 to-fuchsia-500/20",
    difficulty: "Intermediate",
    lessonsCount: 34,
    duration: "22h",
    enrolledCount: 8300,
    rating: 4.7,
    tags: ["Schema", "Apollo", "Subscriptions", "Federation"],
    category: "Backend",
  },

  // â”€â”€â”€ Data & AI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "41",
    slug: "data-science",
    title: "Data Science with Python",
    description:
      "NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn â€” from exploratory data analysis to deploying production ML models.",
    icon: "ðŸ“Š",
    color: "#FF6B35",
    gradient: "from-orange-500/20 to-rose-500/20",
    difficulty: "Intermediate",
    lessonsCount: 60,
    duration: "48h",
    enrolledCount: 18900,
    rating: 4.8,
    tags: ["NumPy", "Pandas", "ML", "Visualization"],
    category: "Data & AI",
  },
  {
    id: "42",
    slug: "machine-learning",
    title: "Machine Learning Aâ€“Z",
    description:
      "Supervised & unsupervised learning, model evaluation, feature engineering, ensemble methods, XGBoost, and ML pipelines with MLflow.",
    icon: "ðŸ¤–",
    color: "#FF9A3C",
    gradient: "from-amber-500/20 to-orange-600/20",
    difficulty: "Advanced",
    lessonsCount: 64,
    duration: "52h",
    enrolledCount: 21200,
    rating: 4.9,
    tags: ["Scikit-learn", "XGBoost", "MLflow", "Evaluation"],
    category: "Data & AI",
    isFeatured: true,
  },
  {
    id: "43",
    slug: "deep-learning",
    title: "Deep Learning & PyTorch",
    description:
      "Neural networks from scratch, CNNs, RNNs, Transformers, fine-tuning LLMs with LoRA/QLoRA, and deploying AI models at scale.",
    icon: "ðŸ§¬",
    color: "#EE4C2C",
    gradient: "from-red-600/20 to-orange-500/20",
    difficulty: "Advanced",
    lessonsCount: 58,
    duration: "46h",
    enrolledCount: 14400,
    rating: 4.9,
    tags: ["PyTorch", "CNN", "Transformers", "LoRA"],
    category: "Data & AI",
    isNew: true,
  },
  {
    id: "44",
    slug: "llm-engineering",
    title: "LLM Engineering",
    description:
      "Build production AI apps â€” prompt engineering, RAG pipelines, LangChain, LlamaIndex, vector databases, and fine-tuning open-source LLMs.",
    icon: "ðŸ¦™",
    color: "#10B981",
    gradient: "from-emerald-500/20 to-teal-600/20",
    difficulty: "Advanced",
    lessonsCount: 48,
    duration: "36h",
    enrolledCount: 17600,
    rating: 4.9,
    tags: ["RAG", "LangChain", "Vector DB", "Fine-tuning"],
    category: "Data & AI",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "45",
    slug: "sql",
    title: "SQL & Databases",
    description:
      "SQL fundamentals to expert-level query optimization, indexing strategies, transactions, PostgreSQL, and NoSQL patterns with MongoDB.",
    icon: "ðŸ—„ï¸",
    color: "#336791",
    gradient: "from-blue-700/20 to-sky-500/20",
    difficulty: "Beginner",
    lessonsCount: 38,
    duration: "24h",
    enrolledCount: 38600,
    rating: 4.8,
    tags: ["PostgreSQL", "Indexing", "Transactions", "MongoDB"],
    category: "Data & AI",
  },

  // â”€â”€â”€ Mobile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "51",
    slug: "react-native",
    title: "React Native",
    description:
      "Cross-platform iOS & Android apps â€” Expo SDK 51, React Navigation 7, Reanimated 3, native modules, and App Store/Play Store deployment.",
    icon: "ðŸ“±",
    color: "#61DAFB",
    gradient: "from-sky-500/20 to-cyan-400/20",
    difficulty: "Intermediate",
    lessonsCount: 46,
    duration: "34h",
    enrolledCount: 17800,
    rating: 4.7,
    tags: ["Expo", "Navigation", "Reanimated", "Native Modules"],
    category: "Mobile",
  },
  {
    id: "52",
    slug: "flutter",
    title: "Flutter & Dart",
    description:
      "Beautiful cross-platform apps for iOS, Android, Web & Desktop â€” custom widgets, Riverpod 2, GoRouter, and Firebase integration.",
    icon: "ðŸ¦‹",
    color: "#54C5F8",
    gradient: "from-sky-400/20 to-blue-600/20",
    difficulty: "Intermediate",
    lessonsCount: 52,
    duration: "38h",
    enrolledCount: 19100,
    rating: 4.8,
    tags: ["Widgets", "Riverpod 2", "GoRouter", "Firebase"],
    category: "Mobile",
    isNew: true,
  },
  {
    id: "53",
    slug: "ios-swift",
    title: "iOS Development with Swift",
    description:
      "Build native iOS 17 apps â€” SwiftUI from scratch, UIKit interop, Core Data, CloudKit, WidgetKit, and complete App Store launch guide.",
    icon: "ðŸ“²",
    color: "#FA7343",
    gradient: "from-orange-400/20 to-red-400/20",
    difficulty: "Intermediate",
    lessonsCount: 54,
    duration: "42h",
    enrolledCount: 11600,
    rating: 4.8,
    tags: ["SwiftUI", "UIKit", "Core Data", "WidgetKit"],
    category: "Mobile",
  },

  // â”€â”€â”€ DevOps & Cloud â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "61",
    slug: "devops",
    title: "DevOps & CI/CD",
    description:
      "Docker, Kubernetes, Helm, GitHub Actions, Terraform, Prometheus/Grafana monitoring, and zero-downtime blue-green deployments.",
    icon: "ðŸš€",
    color: "#326CE5",
    gradient: "from-indigo-500/20 to-purple-500/20",
    difficulty: "Advanced",
    lessonsCount: 38,
    duration: "26h",
    enrolledCount: 11700,
    rating: 4.7,
    tags: ["Docker", "K8s", "CI/CD", "Terraform"],
    category: "DevOps & Cloud",
  },
  {
    id: "62",
    slug: "aws",
    title: "AWS Cloud Architect",
    description:
      "EC2, S3, Lambda, RDS, VPC, ECS/Fargate, IAM, CloudFormation, and preparing for the AWS Solutions Architect Associate exam.",
    icon: "â˜ï¸",
    color: "#FF9900",
    gradient: "from-amber-500/20 to-yellow-400/20",
    difficulty: "Intermediate",
    lessonsCount: 50,
    duration: "38h",
    enrolledCount: 19200,
    rating: 4.8,
    tags: ["Lambda", "S3", "ECS", "CloudFormation"],
    category: "DevOps & Cloud",
    isNew: true,
  },
  {
    id: "63",
    slug: "linux",
    title: "Linux & Bash Scripting",
    description:
      "File system, processes, permissions, bash scripting, cron jobs, SSH hardening, networking fundamentals, and sysadmin automation.",
    icon: "ðŸ§",
    color: "#FCC624",
    gradient: "from-yellow-500/20 to-amber-600/20",
    difficulty: "Beginner",
    lessonsCount: 36,
    duration: "24h",
    enrolledCount: 24300,
    rating: 4.7,
    tags: ["Bash", "Shell", "SSH", "Sysadmin"],
    category: "DevOps & Cloud",
  },

  // â”€â”€â”€ Systems â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "71",
    slug: "algorithms",
    title: "Algorithms & DSA",
    description:
      "Master Big-O analysis, sorting, trees, graphs, dynamic programming, tries, and crack FAANG-level technical interviews with confidence.",
    icon: "ðŸ§ ",
    color: "#9333EA",
    gradient: "from-purple-600/20 to-pink-500/20",
    difficulty: "Intermediate",
    lessonsCount: 52,
    duration: "38h",
    enrolledCount: 29400,
    rating: 4.9,
    tags: ["Graphs", "DP", "Trees", "Sorting"],
    category: "Systems",
  },
  {
    id: "72",
    slug: "system-design",
    title: "System Design",
    description:
      "Design scalable distributed systems â€” consistent hashing, load balancing, CDNs, Kafka, two-phase commit, and real FAANG case studies.",
    icon: "ðŸ—ï¸",
    color: "#64748B",
    gradient: "from-slate-500/20 to-zinc-500/20",
    difficulty: "Advanced",
    lessonsCount: 44,
    duration: "32h",
    enrolledCount: 23700,
    rating: 4.9,
    tags: ["Scalability", "Kafka", "Microservices", "CAP"],
    category: "Systems",
    isNew: true,
  },

  // â”€â”€â”€ Web3 & Security â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "81",
    slug: "solidity",
    title: "Solidity & Smart Contracts",
    description:
      "EVM deep-dive, Solidity patterns, ERC-20/721/1155 tokens, security audits, Hardhat/Foundry testing, and DeFi protocol development.",
    icon: "ðŸ’Ž",
    color: "#627EEA",
    gradient: "from-blue-600/20 to-violet-500/20",
    difficulty: "Advanced",
    lessonsCount: 46,
    duration: "34h",
    enrolledCount: 9800,
    rating: 4.8,
    tags: ["EVM", "ERC-20", "Foundry", "DeFi"],
    category: "Web3 & Security",
    isNew: true,
  },
  {
    id: "82",
    slug: "web3",
    title: "Web3 Full-Stack",
    description:
      "ethers.js v6, wagmi, viem, IPFS, The Graph, Chainlink oracles, and building production-grade dApps with Next.js and RainbowKit.",
    icon: "ðŸŒ",
    color: "#F6851B",
    gradient: "from-orange-500/20 to-amber-400/20",
    difficulty: "Intermediate",
    lessonsCount: 38,
    duration: "26h",
    enrolledCount: 7200,
    rating: 4.7,
    tags: ["ethers.js", "wagmi", "IPFS", "Chainlink"],
    category: "Web3 & Security",
    isNew: true,
  },
  {
    id: "83",
    slug: "cybersecurity",
    title: "Ethical Hacking",
    description:
      "Penetration testing, reconnaissance, exploitation, OWASP Top 10, CTF techniques, network scanning, and responsible disclosure methodology.",
    icon: "ðŸ”",
    color: "#00FF41",
    gradient: "from-green-600/20 to-emerald-500/20",
    difficulty: "Advanced",
    lessonsCount: 52,
    duration: "40h",
    enrolledCount: 13400,
    rating: 4.8,
    tags: ["Pentesting", "OWASP", "CTF", "Kali Linux"],
    category: "Web3 & Security",
    isNew: true,
    isFeatured: true,
  },

  // â”€â”€â”€ Game Dev â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    id: "91",
    slug: "unity",
    title: "Unity & C# Game Dev",
    description:
      "2D/3D game development â€” physics, animations, shaders, AI pathfinding, procedural generation, UI Toolkit, and publishing to multiple platforms.",
    icon: "ðŸŽ®",
    color: "#000000",
    gradient: "from-zinc-600/20 to-gray-500/20",
    difficulty: "Intermediate",
    lessonsCount: 58,
    duration: "44h",
    enrolledCount: 18600,
    rating: 4.8,
    tags: ["Unity 6", "Physics", "Shaders", "AI"],
    category: "Game Dev",
    isNew: true,
  },
  {
    id: "92",
    slug: "godot",
    title: "Godot 4 & GDScript",
    description:
      "Open-source game dev with Godot 4 â€” nodes & scenes, GDScript, shaders, multiplayer networking, and exporting to web, mobile, and desktop.",
    icon: "ðŸ¤–",
    color: "#478CBF",
    gradient: "from-blue-600/20 to-sky-500/20",
    difficulty: "Beginner",
    lessonsCount: 44,
    duration: "30h",
    enrolledCount: 11200,
    rating: 4.8,
    tags: ["GDScript", "Shaders", "Multiplayer", "Export"],
    category: "Game Dev",
    isNew: true,
  },
  {
    id: "93",
    slug: "unreal",
    title: "Unreal Engine & C++",
    description:
      "AAA game development â€” Blueprints, C++ game classes, Nanite/Lumen rendering, network replication, and Unreal's subsystem architecture.",
    icon: "ðŸ†",
    color: "#1F2022",
    gradient: "from-gray-700/20 to-slate-600/20",
    difficulty: "Advanced",
    lessonsCount: 62,
    duration: "50h",
    enrolledCount: 8900,
    rating: 4.9,
    tags: ["Blueprints", "C++", "Nanite", "Lumen"],
    category: "Game Dev",
    isNew: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Frontend Engineer @ Stripe",
    avatar: "SC",
    content:
      "Zentax completely changed how I approach learning. The structured tracks and hands-on exercises helped me land my dream job in 6 months. The React course alone is worth it.",
    rating: 5,
    course: "React & Next.js",
  },
  {
    id: "2",
    name: "Marcus Williams",
    role: "Full-Stack Developer @ Shopify",
    avatar: "MW",
    content:
      "I tried other platforms but nothing compared to the depth here. The TypeScript Pro track transformed how I write code â€” the generics section especially blew my mind.",
    rating: 5,
    course: "TypeScript Pro",
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "Backend Engineer @ Airbnb",
    avatar: "PP",
    content:
      "The Node.js Backend track is incredibly comprehensive. Real-world projects, not just toy examples. I shipped my first SaaS product 3 months after completing it.",
    rating: 5,
    course: "Node.js Backend",
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    role: "Data Scientist @ Netflix",
    avatar: "AR",
    content:
      "The Machine Learning Aâ€“Z track is hands-down the best I've found. The MLflow integration and end-to-end pipelines section alone saved me weeks of research.",
    rating: 5,
    course: "Machine Learning Aâ€“Z",
  },
  {
    id: "5",
    name: "Lukas Weber",
    role: "Systems Engineer @ Cloudflare",
    avatar: "LW",
    content:
      "I had tried to learn Rust for years. The Rust track here finally made ownership and lifetimes click. The exercises are brilliant, deeply practical, and production-focused.",
    rating: 5,
    course: "Rust Systems Programming",
  },
  {
    id: "6",
    name: "Mei Lin",
    role: "Mobile Engineer @ TikTok",
    avatar: "ML",
    content:
      "The Flutter track is incredibly well-structured. I went from zero to publishing my first app on both stores in 8 weeks. The Riverpod 2 and GoRouter sections are gold.",
    rating: 5,
    course: "Flutter & Dart",
  },
  {
    id: "7",
    name: "Jordan Blake",
    role: "Staff Engineer @ Meta",
    avatar: "JB",
    content:
      "System Design is a topic I always avoided. This course broke it down into something approachable and practical. I aced my Staff Engineer interviews afterwards.",
    rating: 5,
    course: "System Design",
  },
  {
    id: "8",
    name: "Fatima Al-Hassan",
    role: "Cloud Architect @ Microsoft",
    avatar: "FA",
    content:
      "Passed my AWS Solutions Architect exam first try after the AWS Cloud track. The hands-on labs with real AWS resources â€” not just theory â€” made all the difference.",
    rating: 5,
    course: "AWS Cloud Architect",
  },
  {
    id: "9",
    name: "Daniel Kim",
    role: "AI Engineer @ OpenAI",
    avatar: "DK",
    content:
      "The LLM Engineering track is by far the best resource I've seen for building real RAG pipelines. It covers everything from embeddings to production deployment.",
    rating: 5,
    course: "LLM Engineering",
  },
  {
    id: "10",
    name: "Elena Kovacs",
    role: "Smart Contract Auditor @ Trail of Bits",
    avatar: "EK",
    content:
      "The Solidity & Smart Contracts track is exceptionally rigorous. The security audit section and Foundry testing coverage are better than most paid bootcamps.",
    rating: 5,
    course: "Solidity & Smart Contracts",
  },
  {
    id: "11",
    name: "Ravi Sharma",
    role: "Game Developer @ EA",
    avatar: "RS",
    content:
      "The Unity track is the most complete game dev resource I've found. From basic physics to procedural generation and shader programming â€” absolutely comprehensive.",
    rating: 5,
    course: "Unity & C# Game Dev",
  },
  {
    id: "12",
    name: "Amira Nour",
    role: "Security Researcher @ HackerOne",
    avatar: "AN",
    content:
      "The Ethical Hacking track taught me more in 8 weeks than my entire CS degree. The CTF challenges and OWASP walkthroughs are spectacularly well-crafted.",
    rating: 5,
    course: "Ethical Hacking",
  },
];

export const stats: Stat[] = [
  {
    label: "Active Learners",
    value: "485",
    suffix: "k+",
    description: "developers learning every day",
  },
  {
    label: "Course Tracks",
    value: "50",
    suffix: "+",
    description: "across 9 technology categories",
  },
  {
    label: "Completion Rate",
    value: "94",
    suffix: "%",
    description: "of enrolled students finish",
  },
  {
    label: "Job Placements",
    value: "18",
    suffix: "k+",
    description: "graduates hired in 2025",
  },
];

export const LANGUAGE_SNIPPETS: Array<{
  lang: string;
  icon: string;
  color: string;
  code: string;
}> = [
  {
    lang: "TypeScript",
    icon: "ðŸ”·",
    color: "#3178C6",
    code: `// TypeScript â€” type-safe async data fetching
async function getCourse(id: string): Promise<Course> {
  const res = await fetch(\`/api/courses/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<Course>;
}

const course = await getCourse("react-101");
console.log(\`\${course.title} â€¢ \${course.lessonsCount} lessons\`);`,
  },
  {
    lang: "Python",
    icon: "ðŸ",
    color: "#3776AB",
    code: `# Python â€” async web scraper with type hints
import asyncio
import aiohttp
from dataclasses import dataclass

@dataclass
class Course:
    title: str
    lessons: int

async def fetch_course(session: aiohttp.ClientSession, id: str) -> Course:
    async with session.get(f"/api/courses/{id}") as r:
        data = await r.json()
        return Course(data["title"], data["lessons"])`,
  },
  {
    lang: "Rust",
    icon: "ðŸ¦€",
    color: "#CE422B",
    code: `// Rust â€” zero-cost async HTTP client
use serde::Deserialize;

#[derive(Deserialize)]
struct Course { title: String, lessons: u32 }

async fn fetch_course(id: &str) -> anyhow::Result<Course> {
    let url = format!("https://api.zentax.io/courses/{id}");
    let course = reqwest::get(&url).await?.json().await?;
    Ok(course)
}`,
  },
  {
    lang: "Go",
    icon: "ðŸ¹",
    color: "#00ADD8",
    code: `// Go â€” concurrent course fetcher
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Course struct {
    Title   string \`json:"title"\`
    Lessons int    \`json:"lessons"\`
}

func fetchCourse(id string) (*Course, error) {
    resp, err := http.Get("/api/courses/" + id)
    if err != nil { return nil, err }
    defer resp.Body.Close()
    var c Course
    return &c, json.NewDecoder(resp.Body).Decode(&c)
}`,
  },
  {
    lang: "Kotlin",
    icon: "ðŸŸ£",
    color: "#7F52FF",
    code: `// Kotlin â€” coroutine-based API call
data class Course(val title: String, val lessons: Int)

suspend fun fetchCourse(id: String): Result<Course> =
    runCatching {
        val url = "https://api.zentax.io/courses/$id"
        httpClient.get(url).body<Course>()
    }

val course = fetchCourse("kotlin-101").getOrThrow()
println("\${course.title} â€¢ \${course.lessons} lessons")`,
  },
  {
    lang: "Swift",
    icon: "ðŸŽ",
    color: "#FA7343",
    code: `// Swift â€” async/await with actors
actor CourseCache {
    private var store: [String: Course] = [:]

    func fetch(id: String) async throws -> Course {
        if let cached = store[id] { return cached }
        let url = URL(string: "/api/courses/(id)")!
        let (data, _) = try await URLSession.shared.data(from: url)
        let course = try JSONDecoder().decode(Course.self, from: data)
        store[id] = course
        return course
    }
}`,
  },
  {
    lang: "Java",
    icon: "â˜•",
    color: "#ED8B00",
    code: `// Java 21 â€” virtual threads + records
record Course(String title, int lessons) {}

public class CourseClient {
    public static Course fetch(String id) throws Exception {
        try (var client = HttpClient.newHttpClient()) {
            var req = HttpRequest.newBuilder()
                .uri(URI.create("/api/courses/" + id))
                .build();
            var body = client.send(req,
                BodyHandlers.ofString()).body();
            return parseJson(body, Course.class);
        }
    }
}`,
  },
  {
    lang: "Elixir",
    icon: "ðŸ’œ",
    color: "#6E4A7E",
    code: `# Elixir â€” OTP GenServer course cache
defmodule CourseCache do
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  def init(state), do: {:ok, state}

  def fetch(id) do
    GenServer.call(__MODULE__, {:fetch, id})
  end

  def handle_call({:fetch, id}, _from, cache) do
    course = Req.get!("/api/courses/#{id}").body
    {:reply, course, Map.put(cache, id, course)}
  end
end`,
  },
];

export const codeSnippet = LANGUAGE_SNIPPETS[0].code;
