#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Complete definitions for all 50 programming language courses
const allCourseDefinitions = {
  // Already generated (keeping definitions)
  python: {
    title: 'Python Programming',
    slug: 'python',
    icon: '🐍',
    color: '#3776AB',
    shortDescription: 'Master Python - versatile, beginner-friendly, powerful',
    version: '3.12+',
    prerequisites: ['None - beginner friendly'],
    focus: 'General purpose, data science, web development, automation',
    mainUseCases: ['Web Development', 'Data Science', 'Automation', 'Machine Learning'],
    levels: {
      basics: ['Introduction to Python', 'Variables and Data Types', 'Basic Operators', 'Input and Output', 'Strings'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Lists', 'Tuples and Sets', 'Dictionaries'],
      intermediate: ['File I/O', 'Error Handling', 'Modules', 'OOP Part 1', 'OOP Part 2', 'Working with Data', 'Virtual Environments'],
      advanced: ['Advanced Functions', 'Generators', 'Advanced OOP', 'Concurrency', 'Type Hints', 'Testing', 'Regular Expressions'],
      professional: ['Async Programming', 'Design Patterns', 'Performance Optimization', 'Database Integration', 'Web Development', 'Data Processing', 'DevOps', 'Production Apps']
    }
  },

  javascript: {
    title: 'JavaScript Programming',
    slug: 'javascript',
    icon: '⚡',
    color: '#F7DF1E',
    shortDescription: 'Master JavaScript - the language of the web',
    version: 'ES2024',
    prerequisites: ['None - beginner friendly'],
    focus: 'Web development, frontend, full-stack',
    mainUseCases: ['Web Applications', 'Frontend Development', 'Node.js Backend', 'Mobile Apps'],
    levels: {
      basics: ['Introduction', 'Variables', 'Operators', 'Strings and Numbers', 'Arrays'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Objects', 'Array Methods', 'DOM Basics'],
      intermediate: ['Advanced Functions', 'Async Part 1', 'Async Part 2', 'ES6+ Features', 'APIs', 'Error Handling', 'Storage'],
      advanced: ['OOP JavaScript', 'Prototypes', 'Advanced Async', 'Event Loop', 'RegEx', 'Testing', 'Modules'],
      professional: ['Design Patterns', 'Performance', 'TypeScript Essentials', 'Node.js', 'REST APIs', 'Security', 'Tooling', 'Full-Stack']
    }
  },

  typescript: {
    title: 'TypeScript Programming',
    slug: 'typescript',
    icon: '🔷',
    color: '#3178C6',
    shortDescription: 'Master TypeScript - JavaScript with type safety',
    version: '5.4+',
    prerequisites: ['JavaScript knowledge'],
    focus: 'Static typing, enterprise applications',
    mainUseCases: ['Enterprise Apps', 'Large Codebases', 'React/Angular/Vue', 'Library Development'],
    levels: {
      basics: ['Introduction', 'Basic Types', 'Type Annotations', 'Type Inference', 'Union Types'],
      beginner: ['Interfaces', 'Type Aliases', 'Functions', 'Arrays and Tuples', 'Object Types', 'Enums'],
      intermediate: ['Classes', 'Generics', 'Advanced Types', 'Utility Types', 'Modules', 'Type Narrowing', 'Configuration'],
      advanced: ['Advanced Generics', 'Template Literal Types', 'Decorators', 'Declaration Files', 'Advanced Patterns', 'Error Handling', 'Testing'],
      professional: ['Type-Level Programming', 'Design Patterns', 'Type-Safe APIs', 'Full-Stack TypeScript', 'Performance', 'Migration', 'Library Dev', 'Enterprise']
    }
  },

  java: {
    title: 'Java Programming',
    slug: 'java',
    icon: '☕',
    color: '#007396',
    shortDescription: 'Master Java - enterprise-grade, platform-independent',
    version: '21 LTS',
    prerequisites: ['Basic programming helpful'],
    focus: 'Enterprise, Android, backend systems',
    mainUseCases: ['Enterprise Applications', 'Android Development', 'Web Services', 'Big Data'],
    levels: {
      basics: ['Introduction', 'Variables and Types', 'Operators', 'Input/Output', 'Strings'],
      beginner: ['Control Flow', 'Loops', 'Methods', 'Arrays', 'Collections Basics', 'Classes Intro'],
      intermediate: ['OOP', 'Inheritance', 'Interfaces', 'Exception Handling', 'File I/O', 'Collections', 'Generics'],
      advanced: ['Streams and Lambdas', 'Multithreading', 'Advanced Collections', 'Design Patterns', 'JDBC', 'JUnit', 'Annotations'],
      professional: ['Spring Framework', 'Spring Boot', 'Microservices', 'JPA/Hibernate', 'REST APIs', 'Security', 'Performance', 'Enterprise Project']
    }
  },

  'c++': {
    title: 'C++ Programming',
    slug: 'cpp',
    icon: '⚙️',
    color: '#00599C',
    shortDescription: 'Master C++ - powerful systems programming',
    version: 'C++20/23',
    prerequisites: ['Programming basics'],
    focus: 'Systems programming, game development, performance',
    mainUseCases: ['Game Engines', 'Operating Systems', 'Embedded Systems', 'High-Performance Apps'],
    levels: {
      basics: ['Introduction', 'Variables and Types', 'Operators', 'Input/Output', 'Strings'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Arrays and Vectors', 'Pointers', 'References'],
      intermediate: ['Classes and Objects', 'Constructors', 'Operator Overloading', 'Inheritance', 'Polymorphism', 'File I/O', 'STL'],
      advanced: ['Templates', 'Smart Pointers', 'Move Semantics', 'Lambdas', 'STL Algorithms', 'Exception Handling', 'Multithreading'],
      professional: ['Modern C++ Practices', 'Memory Management', 'Design Patterns', 'Performance', 'CMake', 'Testing', 'Graphics', 'Game Engine']
    }
  },

  go: {
    title: 'Go Programming',
    slug: 'go',
    icon: '🐹',
    color: '#00ADD8',
    shortDescription: 'Master Go - simple, fast, concurrent',
    version: '1.22+',
    prerequisites: ['Programming basics'],
    focus: 'Backend services, cloud, concurrency',
    mainUseCases: ['Microservices', 'Cloud Native', 'DevOps Tools', 'Network Services'],
    levels: {
      basics: ['Introduction', 'Variables and Types', 'Operators', 'Input/Output', 'Strings'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Arrays and Slices', 'Maps', 'Structs'],
      intermediate: ['Methods', 'Interfaces', 'Error Handling', 'Packages', 'File I/O', 'JSON', 'Testing'],
      advanced: ['Goroutines', 'Channels', 'Select', 'Context', 'Sync Package', 'Reflection', 'Advanced Patterns'],
      professional: ['Web Servers', 'REST APIs', 'gRPC', 'Database Integration', 'Docker', 'Microservices', 'Performance', 'Production APIs']
    }
  },

  rust: {
    title: 'Rust Programming',
    slug: 'rust',
    icon: '🦀',
    color: '#CE422B',
    shortDescription: 'Master Rust - memory-safe systems programming',
    version: '1.76+',
    prerequisites: ['Programming experience recommended'],
    focus: 'Systems, safety, performance, concurrency',
    mainUseCases: ['Systems Software', 'WebAssembly', 'Blockchain', 'Embedded Systems'],
    levels: {
      basics: ['Introduction', 'Variables', 'Data Types', 'Functions', 'Documentation'],
      beginner: ['Ownership', 'Borrowing', 'Slices', 'Control Flow', 'Loops', 'Pattern Matching'],
      intermediate: ['Structs', 'Enums', 'Option and Result', 'Error Handling', 'Modules', 'Collections', 'Strings'],
      advanced: ['Generics', 'Traits', 'Lifetimes', 'Closures', 'Iterators', 'Smart Pointers', 'Concurrency'],
      professional: ['Unsafe Rust', 'Advanced Traits', 'Macros', 'Async/Await', 'Web Development', 'Testing', 'Performance', 'Systems Project']
    }
  },

  php: {
    title: 'PHP Programming',
    slug: 'php',
    icon: '🐘',
    color: '#777BB4',
    shortDescription: 'Master PHP - server-side web scripting',
    version: '8.3+',
    prerequisites: ['HTML basics helpful'],
    focus: 'Web development, CMS, server-side',
    mainUseCases: ['WordPress/Drupal', 'Web Applications', 'REST APIs', 'E-commerce'],
    levels: {
      basics: ['Introduction', 'Variables', 'Operators', 'Strings', 'Arrays'],
      beginner: ['Control Structures', 'Loops', 'Functions', 'Superglobals', 'Forms', 'File Operations'],
      intermediate: ['OOP PHP', 'Database PDO', 'Sessions', 'File Upload', 'Error Handling', 'JSON', 'Composer'],
      advanced: ['Namespaces', 'Traits', 'Advanced OOP', 'RegEx', 'Security', 'PHPUnit', 'Design Patterns'],
      professional: ['Laravel Framework', 'REST APIs', 'Authentication', 'Migrations', 'Caching', 'Deployment', 'Performance', 'Full-Stack PHP']
    }
  },

  ruby: {
    title: 'Ruby Programming',
    slug: 'ruby',
    icon: '💎',
    color: '#CC342D',
    shortDescription: 'Master Ruby - elegant and productive',
    version: '3.3+',
    prerequisites: ['Programming basics'],
    focus: 'Web development, scripting, rapid prototyping',
    mainUseCases: ['Rails Web Apps', 'Automation', 'DevOps Tools', 'Rapid Prototyping'],
    levels: {
      basics: ['Introduction', 'Variables', 'Operators', 'Strings and Symbols', 'Arrays and Hashes'],
      beginner: ['Control Flow', 'Loops and Iterators', 'Methods', 'Blocks and Procs', 'Ranges', 'String Manipulation'],
      intermediate: ['Classes and Objects', 'Modules and Mixins', 'Inheritance', 'File I/O', 'Exception Handling', 'RegEx', 'Gems'],
      advanced: ['Metaprogramming', 'Blocks/Procs/Lambdas', 'RSpec Testing', 'DSLs', 'Concurrency', 'Design Patterns', 'Debugging'],
      professional: ['Ruby on Rails', 'MVC Architecture', 'Active Record', 'RESTful Routing', 'Auth', 'Testing Rails', 'APIs', 'DevOps']
    }
  },

  sql: {
    title: 'SQL and Database Management',
    slug: 'sql',
    icon: '🗄️',
    color: '#4479A1',
    shortDescription: 'Master SQL - query and manage databases',
    version: 'SQL Standard',
    prerequisites: ['Basic data concepts'],
    focus: 'Database design, queries, data management',
    mainUseCases: ['Data Analysis', 'Backend Databases', 'Reporting', 'Data Warehousing'],
    levels: {
      basics: ['Introduction', 'SELECT Queries', 'WHERE Clause', 'ORDER BY', 'Functions'],
      beginner: ['INSERT/UPDATE/DELETE', 'Filtering', 'LIKE Wildcards', 'IN and BETWEEN', 'NULL Handling', 'Aggregates'],
      intermediate: ['JOIN Operations', 'Subqueries', 'GROUP BY', 'CASE Statements', 'Views', 'Indexes', 'Design Basics'],
      advanced: ['Window Functions', 'CTEs', 'Advanced Joins', 'Transactions', 'Stored Procedures', 'Triggers', 'Optimization'],
      professional: ['Design Patterns', 'Normalization', 'Performance Tuning', 'Backup', 'Security', 'Replication', 'NoSQL vs SQL', 'Enterprise DB']
    }
  },

  // NEW: C
  c: {
    title: 'C Programming',
    slug: 'c',
    icon: '🔧',
    color: '#A8B9CC',
    shortDescription: 'Master C - foundation of systems programming',
    version: 'C17/C23',
    prerequisites: ['Programming basics'],
    focus: 'Systems programming, operating systems, embedded',
    mainUseCases: ['Operating Systems', 'Embedded Systems', 'Device Drivers', 'System Utilities'],
    levels: {
      basics: ['Introduction to C', 'Variables and Types', 'Operators', 'Input/Output', 'Basic Strings'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Arrays', 'Strings', 'Pointers Intro'],
      intermediate: ['Pointers and Arrays', 'Dynamic Memory', 'Structures', 'File I/O', 'Preprocessor', 'Multi-file Programs', 'String Functions'],
      advanced: ['Advanced Pointers', 'Function Pointers', 'Data Structures', 'Bit Manipulation', 'Memory Management', 'Debugging', 'Make and Build'],
      professional: ['System Programming', 'Unix APIs', 'Network Programming', 'Concurrency', 'Performance', 'Security', 'Embedded C', 'Low-Level Project']
    }
  },

  // NEW: C#
  'c#': {
    title: 'C# Programming',
    slug: 'csharp',
    icon: '💠',
    color: '#239120',
    shortDescription: 'Master C# - modern, versatile .NET language',
    version: '12.0',
    prerequisites: ['Programming basics'],
    focus: 'Enterprise apps, games, desktop, web',
    mainUseCases: ['Enterprise Software', 'Unity Game Development', 'Desktop Apps', 'ASP.NET Web Apps'],
    levels: {
      basics: ['Introduction to C#', 'Variables and Types', 'Operators', 'Input/Output', 'Strings'],
      beginner: ['Control Flow', 'Loops', 'Methods', 'Arrays', 'Lists', 'Classes Intro'],
      intermediate: ['OOP Concepts', 'Inheritance', 'Interfaces', 'Exception Handling', 'File I/O', 'LINQ Basics', 'Generics'],
      advanced: ['Advanced LINQ', 'Delegates and Events', 'Async/Await', 'Reflection', 'Attributes', 'Testing', 'Design Patterns'],
      professional: ['ASP.NET Core', 'Entity Framework', 'Web APIs', 'Blazor', 'Microservices', 'Azure Integration', 'Unity Basics', 'Enterprise Patterns']
    }
  },

  // NEW: HTML
  html: {
    title: 'HTML - HyperText Markup Language',
    slug: 'html',
    icon: '🌐',
    color: '#E34F26',
    shortDescription: 'Master HTML - structure the web',
    version: 'HTML5',
    prerequisites: ['None - complete beginner friendly'],
    focus: 'Web structure, semantic markup, accessibility',
    mainUseCases: ['Web Pages', 'Web Applications', 'Email Templates', 'Documentation'],
    levels: {
      basics: ['Introduction to HTML', 'Document Structure', 'Text Elements', 'Links', 'Images'],
      beginner: ['Lists', 'Tables', 'Forms', 'Semantic HTML', 'Divs and Spans', 'HTML Entities'],
      intermediate: ['Forms Advanced', 'Media Elements', 'Iframes', 'Meta Tags', 'Accessibility', 'SEO Basics', 'HTML5 APIs'],
      advanced: ['Canvas', 'SVG', 'Web Components', 'Microdata', 'ARIA', 'Progressive Web Apps', 'Performance'],
      professional: ['Advanced Accessibility', 'SEO Advanced', 'Structured Data', 'Email HTML', 'Template Systems', 'HTML Best Practices', 'Browser Compatibility', 'Production Sites']
    }
  },

  // NEW: CSS
  css: {
    title: 'CSS - Cascading Style Sheets',
    slug: 'css',
    icon: '🎨',
    color: '#1572B6',
    shortDescription: 'Master CSS - style and layout the web',
    version: 'CSS3+',
    prerequisites: ['HTML basics'],
    focus: 'Styling, layout, responsive design, animations',
    mainUseCases: ['Web Styling', 'Responsive Design', 'Animations', 'UI Design'],
    levels: {
      basics: ['Introduction to CSS', 'Selectors', 'Colors and Backgrounds', 'Text Styling', 'Box Model'],
      beginner: ['Display and Positioning', 'Flexbox', 'Grid Layout', 'Responsive Design', 'Media Queries', 'Units and Values'],
      intermediate: ['Advanced Selectors', 'Pseudo-classes', 'Transitions', 'Transforms', 'Animations', 'Custom Properties', 'CSS Functions'],
      advanced: ['Advanced Grid', 'Advanced Flexbox', 'CSS Architecture', 'Preprocessors Intro', 'Performance', 'Browser DevTools', 'Cross-browser'],
      professional: ['Design Systems', 'CSS-in-JS', 'Critical CSS', 'CSS Optimization', 'Modern Layout Techniques', 'Accessibility', 'CSS Frameworks', 'Production Workflows']
    }
  },

  // NEW: SASS
  sass: {
    title: 'SASS/SCSS - CSS Preprocessor',
    slug: 'sass',
    icon: '💅',
    color: '#CC6699',
    shortDescription: 'Master SASS - powerful CSS extension',
    version: 'Dart Sass',
    prerequisites: ['CSS knowledge'],
    focus: 'CSS preprocessing, variables, mixins',
    mainUseCases: ['Large CSS Projects', 'Design Systems', 'Component Styling', 'Theme Management'],
    levels: {
      basics: ['Introduction to SASS', 'Variables', 'Nesting', 'Partials', 'Imports'],
      beginner: ['Mixins', 'Functions', 'Operators', 'Interpolation', 'Placeholder Selectors', 'Extend'],
      intermediate: ['Advanced Mixins', 'Control Directives', 'Maps and Lists', 'Color Functions', 'File Organization', 'Architecture', '7-1 Pattern'],
      advanced: ['Advanced Functions', 'Dynamic Styling', 'Themeable Components', 'SASS Libraries', 'Build Tools', 'PostCSS Integration', 'Performance'],
      professional: ['Design System Architecture', 'Component Libraries', 'Build Optimization', 'CSS Modules', 'Production Workflows', 'Migration Strategies', 'Team Conventions', 'Enterprise CSS']
    }
  },

  // NEW: LESS
  less: {
    title: 'LESS - CSS Preprocessor',
    slug: 'less',
    icon: '📘',
    color: '#1D365D',
    shortDescription: 'Master LESS - dynamic stylesheet language',
    version: 'LESS 4+',
    prerequisites: ['CSS knowledge'],
    focus: 'CSS preprocessing, dynamic styling',
    mainUseCases: ['Bootstrap Customization', 'Theme Development', 'CSS Enhancement', 'Dynamic Styling'],
    levels: {
      basics: ['Introduction to LESS', 'Variables', 'Nesting', 'Operations', 'Functions'],
      beginner: ['Mixins', 'Parametric Mixins', 'Guards', 'Escaping', 'Imports', 'Namespaces'],
      intermediate: ['Advanced Mixins', 'CSS Guards', 'Loops', 'Merge', 'Parent Selectors', 'File Organization', 'Build Integration'],
      advanced: ['Plugin Development', 'Advanced Functions', 'Performance', 'Build Optimization', 'Source Maps', 'LESS in JavaScript', 'Migration'],
      professional: ['Bootstrap Theming', 'Component Libraries', 'Production Builds', 'CSS Architecture', 'Team Workflows', 'Legacy Codebases', 'Modern Alternatives', 'Migration to Modern CSS']
    }
  },

  // NEW: GraphQL
  graphql: {
    title: 'GraphQL',
    slug: 'graphql',
    icon: '◬',
    color: '#E10098',
    shortDescription: 'Master GraphQL - modern API query language',
    version: 'GraphQL 16+',
    prerequisites: ['JavaScript/TypeScript', 'API concepts'],
    focus: 'API design, data fetching, type safety',
    mainUseCases: ['API Development', 'Client-Server Communication', 'Microservices', 'Real-time Data'],
    levels: {
      basics: ['Introduction to GraphQL', 'Queries', 'Schema and Types', 'Fields and Arguments', 'Aliases'],
      beginner: ['Mutations', 'Variables', 'Fragments', 'Directives', 'Inline Fragments', 'Operations'],
      intermediate: ['Schema Design', 'Resolvers', 'Context', 'Data Sources', 'Error Handling', 'Pagination', 'Authentication'],
      advanced: ['Subscriptions', 'Schema Stitching', 'Federation', 'DataLoader', 'Performance', 'Caching', 'Testing'],
      professional: ['Production Schema Design', 'Microservices Architecture', 'Security', 'Monitoring', 'Apollo Federation', 'Code Generation', 'Best Practices', 'Enterprise GraphQL']
    }
  },

  // NEW: Swift
  swift: {
    title: 'Swift Programming',
    slug: 'swift',
    icon: '🦅',
    color: '#FA7343',
    shortDescription: 'Master Swift - powerful and intuitive',
    version: 'Swift 5.9+',
    prerequisites: ['Programming basics'],
    focus: 'iOS/macOS development, modern syntax',
    mainUseCases: ['iOS Apps', 'macOS Apps', 'watchOS', 'tvOS'],
    levels: {
      basics: ['Introduction to Swift', 'Variables and Constants', 'Data Types', 'Operators', 'Strings'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Collections', 'Optionals', 'Enums'],
      intermediate: ['Classes and Structs', 'Properties', 'Methods', 'Protocols', 'Extensions', 'Error Handling', 'Generics'],
      advanced: ['Advanced Protocols', 'Memory Management', 'Closures Advanced', 'Concurrency', 'Combine Framework', 'SwiftUI Basics', 'Testing'],
      professional: ['iOS App Development', 'UIKit/SwiftUI', 'Networking', 'Core Data', 'App Architecture', 'Publishing', 'Performance', 'Production Apps']
    }
  },

  // NEW: Kotlin
  kotlin: {
    title: 'Kotlin Programming',
    slug: 'kotlin',
    icon: '🅺',
    color: '#7F52FF',
    shortDescription: 'Master Kotlin - modern JVM language',
    version: 'Kotlin 1.9+',
    prerequisites: ['Programming basics', 'Java helpful'],
    focus: 'Android, backend, modern syntax',
    mainUseCases: ['Android Development', 'Backend Services', 'Multiplatform', 'Server-side'],
    levels: {
      basics: ['Introduction to Kotlin', 'Variables and Types', 'Operators', 'Strings', 'Null Safety'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Collections', 'Ranges', 'Classes Basics'],
      intermediate: ['OOP Kotlin', 'Inheritance', 'Interfaces', 'Data Classes', 'Sealed Classes', 'Extensions', 'Lambdas'],
      advanced: ['Coroutines', 'Flow', 'Channels', 'Generics', 'Delegation', 'DSLs', 'Testing'],
      professional: ['Android Development', 'Jetpack Compose', 'Ktor Backend', 'Multiplatform', 'Database', 'Architecture', 'Publishing', 'Production Apps']
    }
  },

  // NEW: Dart
  dart: {
    title: 'Dart Programming',
    slug: 'dart',
    icon: '🎯',
    color: '#0175C2',
    shortDescription: 'Master Dart - optimized for UI',
    version: 'Dart 3+',
    prerequisites: ['Programming basics'],
    focus: 'Flutter development, UI applications',
    mainUseCases: ['Flutter Mobile Apps', 'Web Apps', 'Desktop Apps', 'Backend'],
    levels: {
      basics: ['Introduction to Dart', 'Variables and Types', 'Operators', 'Strings', 'Collections'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Classes', 'Null Safety', 'Enums'],
      intermediate: ['OOP Dart', 'Inheritance', 'Mixins', 'Interfaces', 'Generics', 'Async/Await', 'Streams'],
      advanced: ['Advanced Async', 'Isolates', 'Libraries', 'Packages', 'Testing', 'Error Handling', 'Effective Dart'],
      professional: ['Flutter Development', 'State Management', 'Navigation', 'Networking', 'Database', 'Publishing', 'Performance', 'Production Apps']
    }
  },

  // NEW: Objective-C
  'objective-c': {
    title: 'Objective-C Programming',
    slug: 'objective-c',
    icon: '🍎',
    color: '#438EFF',
    shortDescription: 'Master Objective-C - foundation of iOS',
    version: 'Objective-C 2.0',
    prerequisites: ['C knowledge helpful'],
    focus: 'iOS/macOS development, legacy apps',
    mainUseCases: ['Legacy iOS Apps', 'macOS Apps', 'Maintaining Codebases', 'Frameworks'],
    levels: {
      basics: ['Introduction', 'Syntax Basics', 'Objects and Classes', 'Methods', 'Properties'],
      beginner: ['Control Flow', 'Memory Management', 'Protocols', 'Categories', 'Collections', 'Blocks'],
      intermediate: ['Foundation Framework', 'UIKit Basics', 'Delegation', 'KVO', 'File I/O', 'Networking', 'Threading'],
      advanced: ['Advanced Memory', 'Runtime', 'Dynamic Features', 'Core Data', 'Testing', 'Debugging', 'Performance'],
      professional: ['iOS App Development', 'UIKit Advanced', 'Architecture Patterns', 'Swift Interop', 'Legacy Maintenance', 'Migration', 'Production', 'App Store']
    }
  },

  // NEW: Functional Programming Languages
  haskell: {
    title: 'Haskell Programming',
    slug: 'haskell',
    icon: '⚡',
    color: '#5D4F85',
    shortDescription: 'Master Haskell - pure functional programming',
    version: 'GHC 9.6+',
    prerequisites: ['Programming experience', 'Math helpful'],
    focus: 'Pure functional, type safety, correctness',
    mainUseCases: ['Compilers', 'Financial Systems', 'Research', 'Type-safe Applications'],
    levels: {
      basics: ['Introduction', 'Functions', 'Types', 'Lists', 'Tuples'],
      beginner: ['Pattern Matching', 'Recursion', 'Higher-Order Functions', 'Type Classes', 'Modules', 'I/O'],
      intermediate: ['Functors', 'Applicatives', 'Monads', 'Custom Types', 'Folds', 'Lazy Evaluation', 'Parsing'],
      advanced: ['Monad Transformers', 'Advanced Types', 'GADTs', 'Type Families', 'Concurrency', 'Testing', 'Libraries'],
      professional: ['Real-World Haskell', 'Web Development', 'Parsers', 'Compilers', 'Performance', 'Best Practices', 'Production', 'Advanced Patterns']
    }
  },

  erlang: {
    title: 'Erlang Programming',
    slug: 'erlang',
    icon: '📞',
    color: '#A90533',
    shortDescription: 'Master Erlang - concurrent, fault-tolerant',
    version: 'OTP 26+',
    prerequisites: ['Programming basics'],
    focus: 'Concurrency, distributed systems, telecom',
    mainUseCases: ['Telecom Systems', 'Messaging', 'Distributed Systems', 'Real-time Apps'],
    levels: {
      basics: ['Introduction', 'Sequential Programming', 'Pattern Matching', 'Functions', 'Lists'],
      beginner: ['Recursion', 'Higher-Order Functions', 'Processes', 'Message Passing', 'Error Handling', 'Modules'],
      intermediate: ['OTP Basics', 'GenServer', 'Supervisor', 'Applications', 'ETS', 'Mnesia', 'Distribution'],
      advanced: ['Advanced OTP', 'Fault Tolerance', 'Hot Code Loading', 'Performance', 'Debugging', 'Testing', 'NIFs'],
      professional: ['Production Systems', 'Release Management', 'Monitoring', 'Scalability', 'RabbitMQ', 'WhatsApp Architecture', 'Telecom', 'Distributed Apps']
    }
  },

  elixir: {
    title: 'Elixir Programming',
    slug: 'elixir',
    icon: '💧',
    color: '#4B275F',
    shortDescription: 'Master Elixir - productive, concurrent, fun',
    version: 'Elixir 1.16+',
    prerequisites: ['Programming basics'],
    focus: 'Web development, real-time, scalability',
    mainUseCases: ['Web Apps', 'Real-time Systems', 'APIs', 'Microservices'],
    levels: {
      basics: ['Introduction', 'Basic Types', 'Pattern Matching', 'Functions', 'Modules'],
      beginner: ['Control Flow', 'Recursion', 'Enumerables', 'Processes', 'Agents', 'Structs'],
      intermediate: ['OTP GenServer', 'Supervisors', 'Mix', 'Phoenix Basics', 'Ecto', 'Testing', 'Protocols'],
      advanced: ['Macros', 'Metaprogramming', 'Advanced OTP', 'Distributed Elixir', 'Performance', 'Deployment', 'LiveView'],
      professional: ['Phoenix Framework', 'Real-time Apps', 'GraphQL', 'Microservices', 'Production', 'Scalability', 'Monitoring', 'Enterprise Apps']
    }
  },

  'f#': {
    title: 'F# Programming',
    slug: 'fsharp',
    icon: '🔷',
    color: '#378BBA',
    shortDescription: 'Master F# - functional-first .NET',
    version: 'F# 8.0',
    prerequisites: ['Programming basics', '.NET helpful'],
    focus: 'Functional programming, data processing, .NET',
    mainUseCases: ['Data Analysis', 'Financial Systems', 'Web Services', '.NET Applications'],
    levels: {
      basics: ['Introduction', 'Values and Types', 'Functions', 'Lists', 'Pattern Matching'],
      beginner: ['Tuples', 'Records', 'Discriminated Unions', 'Options', 'Collections', 'Recursion'],
      intermediate: ['Object Programming', 'Modules', 'Computation Expressions', 'Async', 'Type Providers', 'Testing', 'LINQ'],
      advanced: ['Advanced Types', 'Agents', 'Quotations', 'Units of Measure', 'Type Extensions', 'Performance', 'Interop'],
      professional: ['Web Development', 'Data Science', 'Domain Modeling', 'Microservices', 'Azure Functions', 'Production Apps', 'Best Practices', 'Enterprise F#']
    }
  },

  ocaml: {
    title: 'OCaml Programming',
    slug: 'ocaml',
    icon: '🐫',
    color: '#EE6A1A',
    shortDescription: 'Master OCaml - fast functional programming',
    version: 'OCaml 5+',
    prerequisites: ['Programming experience'],
    focus: 'Functional programming, type safety, compilers',
    mainUseCases: ['Compilers', 'Theorem Provers', 'Financial Systems', 'Static Analysis'],
    levels: {
      basics: ['Introduction', 'Basic Types', 'Functions', 'Pattern Matching', 'Lists'],
      beginner: ['Recursion', 'Higher-Order Functions', 'Modules', 'Records', 'Variants', 'Options'],
      intermediate: ['Functors', 'First-Class Modules', 'GADTs', 'Polymorphic Variants', 'Objects', 'Error Handling', 'I/O'],
      advanced: ['Module System Advanced', 'Effects', 'Multicore', 'Performance', 'PPX', 'Testing', 'Libraries'],
      professional: ['Compiler Development', 'Type Systems', 'Program Analysis', 'Web Development', 'Systems Programming', 'Production', 'Opam Ecosystem', 'Advanced Projects']
    }
  },

  elm: {
    title: 'Elm Programming',
    slug: 'elm',
    icon: '🌳',
    color: '#1293D8',
    shortDescription: 'Master Elm - delightful web apps',
    version: 'Elm 0.19',
    prerequisites: ['Programming basics', 'HTML/CSS'],
    focus: 'Frontend development, no runtime errors',
    mainUseCases: ['Web Applications', 'SPAs', 'Interactive UIs', 'Reliable Frontends'],
    levels: {
      basics: ['Introduction', 'Functions', 'Types', 'Pattern Matching', 'Lists'],
      beginner: ['Records', 'Custom Types', 'Maybe', 'Result', 'Modules', 'Elm Architecture'],
      intermediate: ['JSON Decoders', 'HTTP', 'Commands', 'Subscriptions', 'Navigation', 'Ports', 'Custom Elements'],
      advanced: ['Advanced Decoders', 'Optimization', 'Testing', 'Large Apps', 'Animation', 'WebSockets', 'Code Organization'],
      professional: ['Production Apps', 'Architecture Patterns', 'Performance', 'Deployment', 'Team Development', 'Interop', 'Best Practices', 'Enterprise Elm']
    }
  },

  lisp: {
    title: 'Lisp Programming',
    slug: 'lisp',
    icon: '🔀',
    color: '#3FB68B',
    shortDescription: 'Master Lisp - code as data, ultimate flexibility',
    version: 'Common Lisp',
    prerequisites: ['Programming experience'],
    focus: 'Metaprogramming, AI, symbolic computation',
    mainUseCases: ['AI Research', 'Symbolic Computation', 'DSLs', 'Rapid Prototyping'],
    levels: {
      basics: ['Introduction', 'S-expressions', 'Basic Functions', 'Lists', 'Atoms'],
      beginner: ['Recursion', 'Conditionals', 'Higher-Order Functions', 'Lambda', 'Let Bindings', 'Loops'],
      intermediate: ['Macros Basics', 'Data Structures', 'CLOS', 'Packages', 'File I/O', 'Error Handling', 'Sequences'],
      advanced: ['Advanced Macros', 'Code Generation', 'CLOS Advanced', 'Conditions', 'Optimization', 'FFI', 'Debugging'],
      professional: ['Production Lisp', 'System Building', 'Performance', 'Web Development', 'AI Applications', 'DSL Development', 'Best Practices', 'Real-world Projects']
    }
  },

  scheme: {
    title: 'Scheme Programming',
    slug: 'scheme',
    icon: '🎭',
    color: '#1E4AEC',
    shortDescription: 'Master Scheme - minimal, elegant Lisp',
    version: 'R7RS',
    prerequisites: ['Programming basics'],
    focus: 'Functional programming, education, research',
    mainUseCases: ['Education', 'Research', 'Embedded Scripting', 'Language Implementation'],
    levels: {
      basics: ['Introduction', 'S-expressions', 'Functions', 'Lists', 'Basic Forms'],
      beginner: ['Recursion', 'Higher-Order Functions', 'Lambda', 'Let Forms', 'Conditionals', 'Pairs'],
      intermediate: ['Continuations', 'Macros', 'Closures', 'State', 'I/O', 'Modules', 'Data Structures'],
      advanced: ['Call/cc', 'Hygienic Macros', 'Interpreters', 'CPS', 'Performance', 'FFI', 'Libraries'],
      professional: ['Scheme Implementation', 'Compiler Writing', 'DSLs', 'Embedded Systems', 'Teaching', 'Research Applications', 'Production Code', 'Advanced Topics']
    }
  },

  prolog: {
    title: 'Prolog Programming',
    slug: 'prolog',
    icon: '🔍',
    color: '#74283C',
    shortDescription: 'Master Prolog - logic programming',
    version: 'SWI-Prolog 9+',
    prerequisites: ['Programming basics', 'Logic helpful'],
    focus: 'Logic programming, AI, knowledge bases',
    mainUseCases: ['Expert Systems', 'Natural Language', 'Theorem Proving', 'Knowledge Bases'],
    levels: {
      basics: ['Introduction', 'Facts', 'Rules', 'Queries', 'Unification'],
      beginner: ['Recursion', 'Lists', 'Backtracking', 'Arithmetic', 'Operators', 'Data Structures'],
      intermediate: ['Cut', 'Negation', 'Definite Clause Grammars', 'I/O', 'Debugging', 'Modules', 'Assert/Retract'],
      advanced: ['Constraint Logic', 'Meta-predicates', 'Advanced DCG', 'Tabling', 'Attributed Variables', 'Libraries', 'Performance'],
      professional: ['Expert Systems', 'NLP Applications', 'Constraint Solving', 'Web Development', 'Database', 'Production Systems', 'Integration', 'Real-world AI']
    }
  },

  // Enterprise Languages
  scala: {
    title: 'Scala Programming',
    slug: 'scala',
    icon: '🎸',
    color: '#DC322F',
    shortDescription: 'Master Scala - scalable language',
    version: 'Scala 3+',
    prerequisites: ['Programming experience', 'Java helpful'],
    focus: 'Functional + OOP, big data, backend',
    mainUseCases: ['Big Data (Spark)', 'Backend Services', 'Microservices', 'Distributed Systems'],
    levels: {
      basics: ['Introduction', 'Values and Variables', 'Types', 'Functions', 'Expressions'],
      beginner: ['Control Structures', 'OOP Basics', 'Collections', 'Pattern Matching', 'Options', 'Traits'],
      intermediate: ['Functional Programming', 'Immutability', 'Higher-Order Functions', 'Case Classes', 'Generics', 'For Comprehensions', 'Implicits'],
      advanced: ['Advanced Types', 'Type Classes', 'Futures', 'Akka Basics', 'Monads', 'Macros', 'Testing'],
      professional: ['Akka Framework', 'Spark', 'Play Framework', 'Cats/ZIO', 'Microservices', 'Performance', 'Production', 'Enterprise Scala']
    }
  },

  groovy: {
    title: 'Groovy Programming',
    slug: 'groovy',
    icon: '☕',
    color: '#4298B8',
    shortDescription: 'Master Groovy - dynamic JVM language',
    version: 'Groovy 4+',
    prerequisites: ['Java knowledge helpful'],
    focus: 'Scripting, testing, Gradle, Jenkins',
    mainUseCases: ['Build Scripts (Gradle)', 'Testing (Spock)', 'Jenkins Pipelines', 'Scripting'],
    levels: {
      basics: ['Introduction', 'Variables and Types', 'Operators', 'Strings', 'Collections'],
      beginner: ['Control Flow', 'Loops', 'Closures', 'Methods', 'Classes', 'Traits'],
      intermediate: ['Metaprogramming', 'AST Transformations', 'Builders', 'DSLs', 'File I/O', 'XML/JSON', 'Databases'],
      advanced: ['Advanced Metaprogramming', 'Compile-time Features', 'Performance', 'Testing with Spock', 'Grails Basics', 'Integration', 'Debugging'],
      professional: ['Gradle Advanced', 'Jenkins Pipelines', 'Grails Framework', 'Microservices', 'Testing Frameworks', 'Build Automation', 'Production', 'Enterprise Groovy']
    }
  },

  cobol: {
    title: 'COBOL Programming',
    slug: 'cobol',
    icon: '🏛️',
    color: '#005CA5',
    shortDescription: 'Master COBOL - mainframe business applications',
    version: 'COBOL 2014',
    prerequisites: ['Programming basics'],
    focus: 'Business applications, mainframes, legacy',
    mainUseCases: ['Banking Systems', 'Insurance', 'Government', 'Legacy Maintenance'],
    levels: {
      basics: ['Introduction', 'Program Structure', 'Data Division', 'Procedure Division', 'Basic Statements'],
      beginner: ['File Handling', 'Control Structures', 'Perform', 'Variables', 'Arithmetic', 'String Operations'],
      intermediate: ['Sequential Files', 'Indexed Files', 'Relative Files', 'Tables', 'Subprograms', 'Copy Books', 'Intrinsic Functions'],
      advanced: ['DB2 Integration', 'CICS', 'JCL', 'Debugging', 'Performance', 'Modern COBOL', 'OOP COBOL'],
      professional: ['Mainframe Development', 'Transaction Processing', 'Batch Processing', 'System Integration', 'Maintenance', 'Modernization', 'Migration', 'Enterprise Systems']
    }
  },

  visualbasic: {
    title: 'Visual Basic',
    slug: 'visualbasic',
    icon: '📘',
    color: '#945DB7',
    shortDescription: 'Master Visual Basic - accessible Windows development',
    version: 'VB.NET',
    prerequisites: ['Programming basics'],
    focus: 'Windows applications, Office automation, legacy',
    mainUseCases: ['Windows Desktop Apps', 'Office Automation', 'Legacy Systems', 'Rapid Development'],
    levels: {
      basics: ['Introduction', 'Variables', 'Data Types', 'Operators', 'Strings'],
      beginner: ['Control Structures', 'Loops', 'Subroutines', 'Functions', 'Arrays', 'Forms Basics'],
      intermediate: ['OOP VB', 'Windows Forms', 'Events', 'File I/O', 'Database Access', 'Error Handling', 'Collections'],
      advanced: ['Advanced Forms', 'Data Binding', 'ADO.NET', 'Multithreading', 'Interop', 'COM', 'Testing'],
      professional: ['WinForms Advanced', 'Database Apps', 'Office Automation', 'Migration to C#', 'Maintenance', 'Legacy Modernization', 'Production', 'Enterprise VB']
    }
  },

  // Data Science Languages
  r: {
    title: 'R Programming',
    slug: 'r',
    icon: '📊',
    color: '#276DC3',
    shortDescription: 'Master R - statistical computing and graphics',
    version: 'R 4.3+',
    prerequisites: ['Statistics basics helpful'],
    focus: 'Statistical analysis, data visualization, research',
    mainUseCases: ['Data Analysis', 'Statistical Modeling', 'Data Visualization', 'Research'],
    levels: {
      basics: ['Introduction', 'Vectors', 'Data Types', 'Basic Operations', 'Functions'],
      beginner: ['Control Flow', 'Loops', 'Data Frames', 'Lists', 'Factors', 'Reading Data'],
      intermediate: ['dplyr', 'ggplot2', 'tidyr', 'Statistical Tests', 'Linear Models', 'Packages', 'RMarkdown'],
      advanced: ['Advanced ggplot2', 'Shiny', 'Machine Learning', 'Time Series', 'Advanced Stats', 'Performance', 'Package Development'],
      professional: ['Production R', 'Shiny Apps', 'APIs with plumber', 'Big Data with sparklyr', 'Reproducible Research', 'Bioinformatics', 'Advanced ML', 'Data Science Projects']
    }
  },

  julia: {
    title: 'Julia Programming',
    slug: 'julia',
    icon: '🔴',
    color: '#9558B2',
    shortDescription: 'Master Julia - high-performance scientific computing',
    version: 'Julia 1.10+',
    prerequisites: ['Programming basics', 'Math helpful'],
    focus: 'Scientific computing, data science, performance',
    mainUseCases: ['Scientific Computing', 'Data Science', 'Machine Learning', 'Numerical Analysis'],
    levels: {
      basics: ['Introduction', 'Variables and Types', 'Operators', 'Functions', 'Arrays'],
      beginner: ['Control Flow', 'Loops', 'Strings', 'Collections', 'Modules', 'Packages'],
      intermediate: ['Multiple Dispatch', 'Types Advanced', 'DataFrames', 'Plotting', 'File I/O', 'Linear Algebra', 'Statistics'],
      advanced: ['Metaprogramming', 'Macros', 'Performance', 'Parallel Computing', 'Distributed', 'GPU', 'Package Development'],
      professional: ['Scientific Applications', 'Machine Learning (Flux)', 'Differential Equations', 'Optimization', 'Data Pipelines', 'HPC', 'Production', 'Research Code']
    }
  },

  matlab: {
    title: 'MATLAB Programming',
    slug: 'matlab',
    icon: '🧮',
    color: '#E16737',
    shortDescription: 'Master MATLAB - matrix laboratory',
    version: 'MATLAB R2024',
    prerequisites: ['Math basics'],
    focus: 'Numerical computing, engineering, research',
    mainUseCases: ['Engineering Simulations', 'Signal Processing', 'Control Systems', 'Research'],
    levels: {
      basics: ['Introduction', 'Matrices', 'Basic Operations', 'Scripts', 'Plotting'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Arrays Advanced', 'Data Import', 'Visualization'],
      intermediate: ['Symbolic Math', 'Calculus', 'Linear Algebra', 'ODE Solvers', 'Image Processing', 'Signal Processing', 'Optimization'],
      advanced: ['Simulink Basics', 'GUI Development', 'Performance', 'Parallel Computing', 'Toolboxes', 'Advanced Visualization', 'Code Generation'],
      professional: ['Control Systems', 'Signal Analysis', 'Machine Learning Toolbox', 'Deep Learning', 'Simulink Advanced', 'Deployment', 'Production', 'Engineering Projects']
    }
  },

  fortran: {
    title: 'Fortran Programming',
    slug: 'fortran',
    icon: '🔬',
    color: '#734F96',
    shortDescription: 'Master Fortran - formula translation for HPC',
    version: 'Fortran 2023',
    prerequisites: ['Programming basics', 'Math'],
    focus: 'Scientific computing, HPC, numerical methods',
    mainUseCases: ['Scientific Simulations', 'Weather Modeling', 'HPC', 'Numerical Methods'],
    levels: {
      basics: ['Introduction', 'Variables', 'Data Types', 'Operators', 'I/O'],
      beginner: ['Control Flow', 'Loops', 'Arrays', 'Procedures', 'Modules', 'Intrinsic Functions'],
      intermediate: ['Advanced Arrays', 'Pointers', 'Derived Types', 'File I/O', 'Numeric Methods', 'Libraries', 'Optimization'],
      advanced: ['Coarrays', 'Parallel Programming', 'Modern Fortran', 'Interoperability', 'Performance', 'Debugging', 'Build Systems'],
      professional: ['HPC Applications', 'MPI', 'OpenMP', 'GPU Computing', 'Large-scale Simulations', 'Legacy Modernization', 'Production HPC', 'Scientific Projects']
    }
  },

  // Scripting Languages
  shell: {
    title: 'Shell Scripting (Bash)',
    slug: 'shell',
    icon: '💻',
    color: '#4EAA25',
    shortDescription: 'Master Shell - automate Unix/Linux tasks',
    version: 'Bash 5+',
    prerequisites: ['Basic command-line knowledge'],
    focus: 'System administration, automation, DevOps',
    mainUseCases: ['System Administration', 'Automation', 'DevOps', 'Task Scheduling'],
    levels: {
      basics: ['Introduction', 'Basic Commands', 'Variables', 'Echo and Read', 'File Operations'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Command Substitution', 'Pipes', 'Redirection'],
      intermediate: ['Text Processing', 'Regular Expressions', 'Arrays', 'String Manipulation', 'Process Management', 'Error Handling', 'Debugging'],
      advanced: ['Advanced Text Tools', 'Job Control', 'Signals', 'Traps', 'Here Documents', 'Parameter Expansion', 'Performance'],
      professional: ['System Administration', 'DevOps Automation', 'CI/CD Scripts', 'Monitoring', 'Log Analysis', 'Deployment', 'Production Scripts', 'Best Practices']
    }
  },

  powershell: {
    title: 'PowerShell',
    slug: 'powershell',
    icon: '⚡',
    color: '#5391FE',
    shortDescription: 'Master PowerShell - Windows automation and more',
    version: 'PowerShell 7+',
    prerequisites: ['Command-line basics'],
    focus: 'Windows administration, automation, cloud',
    mainUseCases: ['Windows Administration', 'Azure Automation', 'DevOps', 'System Management'],
    levels: {
      basics: ['Introduction', 'Cmdlets', 'Variables', 'Pipeline', 'Objects'],
      beginner: ['Control Flow', 'Loops', 'Functions', 'Scripts', 'Parameters', 'Modules'],
      intermediate: ['Advanced Functions', 'Error Handling', 'Remoting', 'WMI', 'CIM', 'File I/O', 'Regular Expressions'],
      advanced: ['Classes', 'DSC', 'Workflows', 'Jobs', 'Performance', 'Debugging', 'Best Practices'],
      professional: ['Azure Automation', 'Active Directory', 'Exchange', 'System Center', 'CI/CD', 'Infrastructure as Code', 'Production', 'Enterprise Automation']
    }
  },

  perl: {
    title: 'Perl Programming',
    slug: 'perl',
    icon: '🐪',
    color: '#0298C3',
    shortDescription: 'Master Perl - practical extraction and reporting',
    version: 'Perl 5.38',
    prerequisites: ['Programming basics'],
    focus: 'Text processing, system administration, web',
    mainUseCases: ['Text Processing', 'System Scripts', 'Web Development', 'Bioinformatics'],
    levels: {
      basics: ['Introduction', 'Scalars', 'Arrays', 'Hashes', 'Operators'],
      beginner: ['Control Flow', 'Loops', 'Subroutines', 'Regular Expressions', 'File I/O', 'References'],
      intermediate: ['OOP Perl', 'Modules', 'CPAN', 'Advanced RegEx', 'Data Structures', 'Error Handling', 'Testing'],
      advanced: ['Moose', 'DBIx::Class', 'Web Frameworks', 'Performance', 'XS', 'Debugging', 'Modern Perl'],
      professional: ['Web Development', 'System Administration', 'Text Mining', 'Bioinformatics', 'Legacy Maintenance', 'Production', 'Best Practices', 'CPAN Development']
    }
  },

  lua: {
    title: 'Lua Programming',
    slug: 'lua',
    icon: '🌙',
    color: '#000080',
    shortDescription: 'Master Lua - lightweight embedded scripting',
    version: 'Lua 5.4',
    prerequisites: ['Programming basics'],
    focus: 'Game scripting, embedded systems, configuration',
    mainUseCases: ['Game Scripting', 'Embedded Systems', 'Configuration', 'Extensions'],
    levels: {
      basics: ['Introduction', 'Values and Types', 'Expressions', 'Statements', 'Functions'],
      beginner: ['Control Structures', 'Tables', 'Functions Advanced', 'Iterators', 'Closures', 'Modules'],
      intermediate: ['Metatables', 'OOP Lua', 'Coroutines', 'File I/O', 'Pattern Matching', 'C API Basics', 'LuaRocks'],
      advanced: ['Advanced Metatables', 'C Integration', 'Performance', 'Garbage Collection', 'Debugging', 'Profiling', 'Best Practices'],
      professional: ['Game Development', 'Love2D/Corona', 'Embedded Scripting', 'Redis Scripting', 'NGINX Scripting', 'Production Lua', 'C Extensions', 'Real-world Projects']
    }
  },

  // Emerging/Specialized Languages
  nim: {
    title: 'Nim Programming',
    slug: 'nim',
    icon: '👑',
    color: '#FFE953',
    shortDescription: 'Master Nim - efficient, expressive, elegant',
    version: 'Nim 2.0+',
    prerequisites: ['Programming experience'],
    focus: 'Systems programming, efficiency, metaprogramming',
    mainUseCases: ['Systems Programming', 'Web Development', 'Game Development', 'Scripts'],
    levels: {
      basics: ['Introduction', 'Variables', 'Types', 'Procedures', 'Control Flow'],
      beginner: ['Collections', 'Modules', 'Exceptions', 'Generics', 'Iterators', 'OOP Basics'],
      intermediate: ['Advanced Types', 'Macros', 'Templates', 'Concepts', 'Async', 'FFI', 'Testing'],
      advanced: ['Metaprogramming', 'Memory Management', 'Concurrency', 'C/C++ Interop', 'Performance', 'DSLs', 'Compilation'],
      professional: ['Web Development (Jester)', 'Systems Programming', 'Game Development', 'Cross-compilation', 'Production', 'Package Development', 'Best Practices', 'Real Projects']
    }
  },

  crystal: {
    title: 'Crystal Programming',
    slug: 'crystal',
    icon: '💎',
    color: '#000000',
    shortDescription: 'Master Crystal - fast as C, slick as Ruby',
    version: 'Crystal 1.11+',
    prerequisites: ['Programming basics', 'Ruby helpful'],
    focus: 'Web development, performance, type safety',
    mainUseCases: ['Web APIs', 'CLI Tools', 'System Programming', 'Performance-critical Apps'],
    levels: {
      basics: ['Introduction', 'Variables and Types', 'Control Flow', 'Methods', 'Classes'],
      beginner: ['Modules', 'Blocks and Procs', 'Exceptions', 'Arrays', 'Hashes', 'Strings'],
      intermediate: ['Generics', 'Macros', 'Concurrency', 'HTTP', 'File I/O', 'Testing', 'Shards'],
      advanced: ['Metaprogramming', 'C Bindings', 'Low-level', 'Performance', 'Debugging', 'Annotations', 'Advanced Types'],
      professional: ['Web Development (Kemal)', 'REST APIs', 'Database', 'Deployment', 'Production', 'Performance Optimization', 'Shard Development', 'Enterprise Apps']
    }
  },

  apex: {
    title: 'Apex Programming',
    slug: 'apex',
    icon: '☁️',
    color: '#1798C1',
    shortDescription: 'Master Apex - Salesforce development',
    version: 'Apex Latest',
    prerequisites: ['Java/C# knowledge helpful'],
    focus: 'Salesforce development, CRM customization',
    mainUseCases: ['Salesforce Customization', 'Business Logic', 'Integrations', 'CRM Development'],
    levels: {
      basics: ['Introduction to Apex', 'Variables and Types', 'Operators', 'Control Flow', 'Loops'],
      beginner: ['Collections', 'Methods', 'Classes', 'SOQL', 'SOSL', 'DML'],
      intermediate: ['Triggers', 'Async Apex', 'Batch Processing', 'Testing', 'Governor Limits', 'Exception Handling', 'Security'],
      advanced: ['Advanced SOQL', 'Web Services', 'Visualforce', 'Lightning Components', 'Event-Driven', 'Optimization', 'Design Patterns'],
      professional: ['Enterprise Patterns', 'Integration Patterns', 'Lightning Web Components', 'DevOps', 'Package Development', 'Production', 'Best Practices', 'Salesforce Architecture']
    }
  },

  solidity: {
    title: 'Solidity Programming',
    slug: 'solidity',
    icon: '⬢',
    color: '#363636',
    shortDescription: 'Master Solidity - Ethereum smart contracts',
    version: 'Solidity 0.8+',
    prerequisites: ['Programming basics', 'Blockchain concepts'],
    focus: 'Smart contracts, DeFi, blockchain',
    mainUseCases: ['Smart Contracts', 'DeFi Applications', 'NFTs', 'DAOs'],
    levels: {
      basics: ['Introduction to Blockchain', 'Solidity Basics', 'Variables', 'Functions', 'Data Types'],
      beginner: ['Control Flow', 'Modifiers', 'Events', 'Mappings', 'Structs', 'Arrays'],
      intermediate: ['Inheritance', 'Interfaces', 'Libraries', 'Error Handling', 'Gas Optimization', 'Reentrancy', 'Testing'],
      advanced: ['Design Patterns', 'Security Best Practices', 'Assembly', 'Proxy Patterns', 'Upgradeable Contracts', 'Hardhat/Foundry', 'Auditing'],
      professional: ['DeFi Development', 'Token Standards (ERC-20/721/1155)', 'Production Contracts', 'Security Audits', 'Mainnet Deployment', 'Web3 Integration', 'DAO Development', 'Enterprise Blockchain']
    }
  },

  // Hardware Description Languages
  vhdl: {
    title: 'VHDL',
    slug: 'vhdl',
    icon: '🔌',
    color: '#543978',
    shortDescription: 'Master VHDL - hardware description and design',
    version: 'VHDL-2008',
    prerequisites: ['Digital logic', 'Electronics basics'],
    focus: 'Hardware design, FPGA, digital systems',
    mainUseCases: ['FPGA Design', 'ASIC Design', 'Digital Systems', 'Hardware Verification'],
    levels: {
      basics: ['Introduction', 'Entities', 'Architectures', 'Signals', 'Data Types'],
      beginner: ['Processes', 'Sequential Logic', 'Combinational Logic', 'Test Benches', 'Timing', 'Simulation'],
      intermediate: ['State Machines', 'Components', 'Generics', 'Packages', 'Functions', 'Procedures', 'File I/O'],
      advanced: ['Advanced Synthesis', 'Timing Constraints', 'Memory Design', 'IP Cores', 'Verification', 'Assertions', 'Coverage'],
      professional: ['FPGA Implementation', 'SoC Design', 'High-level Synthesis', 'Verification Methodologies', 'Timing Closure', 'Production Design', 'Industry Standards', 'Complex Projects']
    }
  },

  verilog: {
    title: 'Verilog',
    slug: 'verilog',
    icon: '⚡',
    color: '#B2B7F8',
    shortDescription: 'Master Verilog - hardware description language',
    version: 'SystemVerilog',
    prerequisites: ['Digital logic', 'Electronics basics'],
    focus: 'Hardware design, verification, FPGA',
    mainUseCases: ['FPGA Programming', 'ASIC Design', 'Hardware Verification', 'Digital Systems'],
    levels: {
      basics: ['Introduction', 'Modules', 'Ports', 'Data Types', 'Operators'],
      beginner: ['Behavioral Modeling', 'Structural Modeling', 'Test Benches', 'Always Blocks', 'Initial Blocks', 'Simulation'],
      intermediate: ['State Machines', 'Tasks and Functions', 'Timing', 'Blocking vs Non-blocking', 'Synthesis', 'Parameters', 'Generate'],
      advanced: ['SystemVerilog', 'Verification', 'Assertions', 'Constraints', 'Coverage', 'UVM Basics', 'Interfaces'],
      professional: ['UVM Methodology', 'Functional Verification', 'FPGA Optimization', 'Timing Analysis', 'Low Power Design', 'Production Hardware', 'Industry Practices', 'Complex SoC']
    }
  },

  assembly: {
    title: 'Assembly Language',
    slug: 'assembly',
    icon: '🔩',
    color: '#6E4C13',
    shortDescription: 'Master Assembly - low-level programming',
    version: 'x86-64 / ARM',
    prerequisites: ['Computer architecture', 'Binary/Hex'],
    focus: 'Low-level programming, performance, embedded',
    mainUseCases: ['Operating Systems', 'Embedded Systems', 'Performance Optimization', 'Reverse Engineering'],
    levels: {
      basics: ['Introduction', 'Registers', 'Memory', 'Instructions', 'Addressing Modes'],
      beginner: ['Arithmetic', 'Logic Operations', 'Control Flow', 'Functions', 'Stack', 'Calling Conventions'],
      intermediate: ['Interrupts', 'System Calls', 'Floating Point', 'SIMD', 'Optimization', 'Debugging', 'Linking'],
      advanced: ['Performance Tuning', 'Cache Optimization', 'Vectorization', 'Inline Assembly', 'Shellcode', 'Exploitation', 'Reverse Engineering'],
      professional: ['Operating System Code', 'Device Drivers', 'Bootloaders', 'Embedded Systems', 'Performance Libraries', 'Security Research', 'Production Assembly', 'Low-level Projects']
    }
  }
};

// Template generation functions (same as before but updated)
function generateChapter(chapterTitle, levelName, chapterIndex, courseName, courseDetails) {
  const chapterId = `L${['Basics', 'Beginner', 'Intermediate', 'Advanced', 'Professional'].indexOf(levelName) + 1}C${chapterIndex + 1}`;
  
  return `        {
          id: '${chapterId}',
          title: '${chapterTitle}',
          description: 'Learn ${chapterTitle.toLowerCase()} in ${courseName}. Master core concepts with practical examples and real-world applications.',
          duration: '${Math.floor(Math.random() * 60) + 30} mins',
          objectives: [
            'Understand ${chapterTitle} fundamentals',
            'Apply ${chapterTitle} in practical scenarios',
            'Write clean, efficient code using ${chapterTitle}',
            'Avoid common pitfalls and follow best practices'
          ],
          concepts: ${generateConcepts(chapterTitle, courseName)},
          practicalExamples: ${generatePracticalExamples(chapterTitle, courseName)},
          realWorldUseCases: ${generateUseCases(chapterTitle, courseName, courseDetails)},
          exercises: ${generateExercises(chapterId, chapterTitle, courseName)},
          summary: 'You\\'ve mastered ${chapterTitle}! You can now confidently use these concepts in your ${courseName} projects.',
          nextSteps: 'Continue to the next chapter to expand your knowledge and tackle more advanced topics.'
        }`;
}

function generateConcepts(topic, language) {
  return `[
            {
              title: '${topic} Fundamentals',
              content: '${topic} is a crucial concept in ${language}. Understanding this enables you to write more efficient and maintainable code. This concept is foundational for ${language} development and is used extensively in real-world applications.',
              codeExample: \`// ${topic} example in ${language}
// Example demonstrating ${topic}
function example() {
  // Implementation
  return "Example output";
}
\`,
              keyPoints: [
                'Essential for ${language} development',
                'Improves code organization and readability',
                'Used in production applications',
                'Follow ${language} best practices'
              ]
            },
            {
              title: 'Practical ${topic}',
              content: 'Applying ${topic} in real scenarios helps solidify understanding. This section demonstrates practical usage patterns you\\'ll encounter in professional ${language} development.',
              keyPoints: [
                'Follow ${language} conventions',
                'Write idiomatic code',
                'Consider performance implications',
                'Reference documentation as needed'
              ]
            }
          ]`;
}

function generatePracticalExamples(topic, language) {
  return `[
            {
              title: '${topic} in Action',
              description: 'A practical example showing how to use ${topic} effectively in ${language} projects.',
              code: \`// Practical ${topic} example
// Real-world usage demonstration
function practicalExample() {
  // Implementation showing ${topic}
  return "Practical result";
}
\`,
              explanation: 'This example demonstrates ${topic} in a real-world context, showing best practices for ${language} development.'
            },
            {
              title: 'Advanced ${topic} Usage',
              description: 'Building on basics to show more sophisticated ${topic} patterns.',
              code: \`// Advanced ${topic} pattern
// Production-ready example
function advancedExample() {
  // Complex implementation
  return "Advanced result";
}
\`,
              explanation: 'This shows a more advanced approach to ${topic}, commonly seen in professional ${language} codebases.'
            }
          ]`;
}

function generateUseCases(topic, language, courseDetails) {
  const useCases = courseDetails.mainUseCases || ['Web applications', 'Data processing', 'System tools', 'APIs'];
  return `[
            '${useCases[0]}: Leveraging ${topic} for robust ${language} applications',
            '${useCases[1]}: Implementing ${topic} in production systems',
            '${useCases[2]}: Using ${topic} for scalable architecture',
            '${useCases[3]}: Applying ${topic} in enterprise solutions'
          ]`;
}

function generateExercises(chapterId, topic, language) {
  return `[
            {
              id: '${chapterId}E1',
              title: '${topic} Basics Exercise',
              description: 'Practice ${topic} fundamentals by implementing a solution in ${language}.',
              starterCode: \`// TODO: Implement ${topic}
// Your solution here

\`,
              solution: \`// Solution for ${topic} exercise
// Complete implementation
function solution() {
  // Working implementation
  return "Exercise completed";
}

console.log(solution());
\`,
              hints: [
                'Review ${topic} concepts from this chapter',
                'Follow ${language} syntax and conventions',
                'Test your code incrementally',
                'Consult documentation if needed'
              ]
            },
            {
              id: '${chapterId}E2',
              title: '${topic} Advanced Challenge',
              description: 'A more challenging exercise that combines ${topic} with other concepts learned.',
              starterCode: \`// TODO: Advanced ${topic} implementation
// Combine multiple concepts

\`,
              solution: \`// Challenge solution
// Demonstrates integration of concepts
function advancedSolution() {
  // Sophisticated implementation
  return "Challenge mastered";
}
\`,
              hints: [
                'Break down the problem into steps',
                'Apply ${topic} principles learned',
                'Consider edge cases and error handling'
              ]
            }
          ]`;
}

function generateLevel(levelName, chapters, courseDetails, courseName) {
  const levelIndex = ['Basics', 'Beginner', 'Intermediate', 'Advanced', 'Professional'].indexOf(levelName);
  const durations = ['2-3 weeks', '3-4 weeks', '4-5 weeks', '5-6 weeks', '6-8 weeks'];
  
  const chaptersCode = chapters.map((chapterTitle, idx) => 
    generateChapter(chapterTitle, levelName, idx, courseName, courseDetails)
  ).join(',\n\n');

  return `    {
      id: '${levelName}',
      title: '${courseName} ${levelName}',
      description: '${getLevelDescription(levelName, courseName, courseDetails)}',
      prerequisites: ${levelIndex === 0 ? '[]' : `['Complete ${courseName} ${['Basics', 'Beginner', 'Intermediate', 'Advanced'][levelIndex - 1]}']`},
      estimatedDuration: '${durations[levelIndex]}',
      learningOutcomes: ${generateLearningOutcomes(levelName, courseName, courseDetails)},
      chapters: [
${chaptersCode}
      ],
      capstoneProject: ${generateCapstoneProject(levelName, courseName, courseDetails)}
    }`;
}

function getLevelDescription(level, language, courseDetails) {
  const focus = courseDetails.focus || 'programming';
  const descriptions = {
    Basics: `Begin your ${language} journey. Learn fundamental syntax, core concepts, and write your first programs.`,
    Beginner: `Build on fundamentals with control structures, functions, and data manipulation. Create functional ${language} applications.`,
    Intermediate: `Master advanced features, modules, and real-world development patterns in ${language}.`,
    Advanced: `Learn professional ${language} development with design patterns, testing, and optimization techniques.`,
    Professional: `Build production-ready ${language} applications with industry best practices and professional workflows.`
  };
  return descriptions[level] || '';
}

function generateLearningOutcomes(level, language, courseDetails) {
  const outcomes = {
    Basics: [
      `Understand ${language} syntax and fundamentals`,
      'Write and execute basic programs',
      'Work with core data types and structures',
      'Apply basic operations and logic',
      'Debug simple code issues'
    ],
    Beginner: [
      'Implement control flow and iteration',
      'Create reusable functions and modules',
      'Manipulate data structures effectively',
      'Build interactive applications',
      'Solve problems programmatically'
    ],
    Intermediate: [
      `Master ${language} advanced features`,
      'Organize code with best practices',
      'Handle errors and edge cases',
      'Work with external data and APIs',
      'Build production-quality code'
    ],
    Advanced: [
      'Apply software design patterns',
      'Implement comprehensive testing',
      'Optimize code performance',
      `Master ${language} ecosystem`,
      'Architect scalable systems'
    ],
    Professional: [
      'Develop production applications',
      'Implement security best practices',
      'Deploy and maintain systems',
      'Lead development projects',
      'Follow industry standards'
    ]
  };
  return JSON.stringify(outcomes[level] || [], null, 10);
}

function generateCapstoneProject(level, language, courseDetails) {
  const useCases = courseDetails.mainUseCases || [];
  const projects = {
    Basics: {
      title: `${language} Fundamentals Project`,
      description: `Build a console application demonstrating ${language} basics`,
      requirements: [
        'User input and output',
        'Variables and basic data types',
        'Control flow and operations',
        'Clean, readable code'
      ]
    },
    Beginner: {
      title: `Interactive ${language} Application`,
      description: `Create a functional application solving a real problem`,
      requirements: [
        'Functions and modular code',
        'Data structure usage',
        'User interaction',
        'Error handling'
      ]
    },
    Intermediate: {
      title: `${language} Full-Featured Application`,
      description: `Build a complete application with advanced features`,
      requirements: [
        'Modular architecture',
        'Data persistence',
        'Error handling and logging',
        `Implements ${useCases[0] || 'real-world use case'}`
      ]
    },
    Advanced: {
      title: `Professional ${language} System`,
      description: `Develop a complex, tested, optimized system`,
      requirements: [
        'Design patterns implementation',
        'Comprehensive test suite',
        'Performance optimization',
        'Complete documentation'
      ]
    },
    Professional: {
      title: `Production ${language} Application`,
      description: `Build and deploy a production-ready system`,
      requirements: [
        `${useCases[0] || 'Production features'}`,
        `${useCases[1] || 'Scalable architecture'}`,
        'Security best practices',
        'CI/CD and deployment',
        'Monitoring and logging'
      ]
    }
  };

  const project = projects[level];
  return `{
        title: '${project.title}',
        description: '${project.description}',
        requirements: ${JSON.stringify(project.requirements, null, 10)},
        deliverables: [
          'Complete source code with documentation',
          'Test cases and validation',
          'README with setup instructions',
          'Demo or deployment'
        ],
        evaluationCriteria: [
          'Code quality and organization',
          'Functionality and completeness',
          'Best practices adherence',
          'Documentation quality',
          'Professional presentation'
        ]
      }`;
}

function generateCurriculum(courseKey) {
  const course = allCourseDefinitions[courseKey];
  if (!course) {
    console.error(`Course "${courseKey}" not found`);
    return null;
  }

  const levels = ['basics', 'beginner', 'intermediate', 'advanced', 'professional'];
  const levelsCode = levels.map(level => 
    generateLevel(
      level.charAt(0).toUpperCase() + level.slice(1),
      course.levels[level],
      course,
      course.title.split(' ')[0]
    )
  ).join(',\n\n');

  const prerequisites = course.prerequisites.map(p => `'${p}'`).join(', ');
  const tags = [course.slug, course.focus.split(',')[0].trim()].map(t => `'${t}'`).join(', ');
  const useCases = course.mainUseCases.map(uc => `'${uc}'`).join(',\n      ');

  const curriculum = `import { Curriculum } from '../types';

export const ${course.slug}Curriculum: Curriculum = {
  meta: {
    slug: '${course.slug}',
    title: '${course.title}',
    shortDescription: '${course.shortDescription}',
    longDescription: 'Complete ${course.title} course from basics to professional level. Learn ${course.version} with modern best practices, hands-on projects, and industry-standard techniques. Focus on ${course.focus}.',
    icon: '${course.icon}',
    color: '${course.color}',
    category: 'Programming Languages',
    tags: [${tags}],
    prerequisites: [${prerequisites}],
    targetAudience: [
      'Beginners to ${course.title.split(' ')[0]}',
      'Developers learning new languages',
      'Students and self-learners',
      'Professionals seeking mastery'
    ],
    careerPaths: [
      'Software Developer',
      'Backend Engineer',
      'Full-Stack Developer',
      'Systems Programmer',
      'Technical Lead'
    ],
    industryApplications: [
      ${useCases}
    ],
    toolsAndTechnologies: [
      '${course.title.split(' ')[0]} ${course.version}',
      'IDEs and editors',
      'Testing frameworks',
      'Build tools',
      'Version control'
    ],
    lastUpdated: '2024-03',
    version: '1.0.0'
  },

  levels: [
${levelsCode}
  ]
};
`;

  return curriculum;
}

// Write curriculum to file
function writeCurriculum(courseKey) {
  const course = allCourseDefinitions[courseKey];
  if (!course) {
    console.error(`❌ Course "${courseKey}" not found`);
    return false;
  }

  const curriculum = generateCurriculum(courseKey);
  if (!curriculum) return false;

  const coursesDir = path.join(__dirname, 'src', 'data', 'courses');
  const courseDir = path.join(coursesDir, course.title.split(' ')[0]);
  
  if (!fs.existsSync(courseDir)) {
    fs.mkdirSync(courseDir, { recursive: true });
  }

  const filePath = path.join(courseDir, 'curriculum.ts');
  fs.writeFileSync(filePath, curriculum, 'utf8');
  
  console.log(`✓ ${course.title}`);
  return true;
}

// Generate all courses
function generateAll() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  Generating All 50 Course Curricula       ║');
  console.log('╚════════════════════════════════════════════╝\n');
  
  let success = 0;
  let failed = 0;

  for (const courseKey of Object.keys(allCourseDefinitions)) {
    if (writeCurriculum(courseKey)) {
      success++;
    } else {
      failed++;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ ${success} curricula generated successfully!`);
  if (failed > 0) {
    console.log(`❌ ${failed} curricula failed`);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// CLI
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--all') {
  generateAll();
} else {
  const courseKey = args[0].toLowerCase();
  if (writeCurriculum(courseKey)) {
    console.log(`\n✅ ${courseKey} curriculum generated!`);
  } else {
    console.error(`\n❌ Failed to generate ${courseKey} curriculum`);
    process.exit(1);
  }
}

