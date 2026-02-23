export interface LessonContent {
  title: string;
  type: "article" | "exercise" | "quiz";
  duration: string;
  xp: number;
  content: string;   // markdown-like text rendered by the lesson page
  code: string;      // initial editor code
  language: string;
  filename: string;
  objectives: string[];
}

export interface TrackCurriculum {
  sections: {
    title: string;
    lessons: {
      slug: string;
      title: string;
      type: "article" | "exercise" | "quiz";
      duration: string;
      isLocked: boolean;
      xp: number;
    }[];
  }[];
}

// ── Shared fallback ───────────────────────────────────────────────────────────
function makeFallback(num: number, trackTitle: string): LessonContent {
  return {
    title: `Lesson ${num}`,
    type: "exercise",
    duration: `${12 + num * 2}m`,
    xp: 50,
    objectives: [
      "Understand the core concepts introduced in this lesson",
      "Complete the coding challenge in the editor",
      "Apply what you learned to a real scenario",
    ],
    content: `## Lesson ${num} — ${trackTitle}

This lesson content is on the way! Meanwhile, use the editor on the right to explore the language.

### What to try
- Declare variables and log them to the console
- Write a function and call it
- Experiment with different data types

> 💡 Use **Run Code** (or ⌘ Enter) to execute your code and see the output below the editor.`,
    code: `// Lesson ${num} — ${trackTitle}
// Write your code here and click "Run Code" to execute it.

function main(): void {
  console.log("Lesson ${num} ready — let's code!");
}

main();
`,
    language: "typescript",
    filename: `lesson-${num}.ts`,
  };
}

// ── JavaScript Mastery curriculum ─────────────────────────────────────────────
const JS_CURRICULUM: TrackCurriculum = {
  sections: [
    {
      title: "Getting Started",
      lessons: [
        { slug: "lesson-1", title: "Introduction & Setup",      type: "article",   duration: "8m",  isLocked: false, xp: 30  },
        { slug: "lesson-2", title: "Variables & Data Types",    type: "exercise",  duration: "14m", isLocked: false, xp: 50  },
        { slug: "lesson-3", title: "Operators & Expressions",   type: "exercise",  duration: "12m", isLocked: false, xp: 50  },
        { slug: "lesson-4", title: "Control Flow",              type: "exercise",  duration: "16m", isLocked: false, xp: 60  },
        { slug: "lesson-5", title: "Functions Deep Dive",       type: "exercise",  duration: "20m", isLocked: false, xp: 80  },
      ],
    },
    {
      title: "Core JavaScript",
      lessons: [
        { slug: "lesson-6",  title: "Arrays & Iterators",       type: "exercise",  duration: "22m", isLocked: true, xp: 80  },
        { slug: "lesson-7",  title: "Objects & Destructuring",  type: "exercise",  duration: "18m", isLocked: true, xp: 70  },
        { slug: "lesson-8",  title: "Closures & Scope",         type: "article",   duration: "16m", isLocked: true, xp: 60  },
        { slug: "lesson-9",  title: "Prototype & Classes",      type: "exercise",  duration: "24m", isLocked: true, xp: 90  },
        { slug: "lesson-10", title: "Error Handling",           type: "exercise",  duration: "14m", isLocked: true, xp: 60  },
      ],
    },
    {
      title: "Async JavaScript",
      lessons: [
        { slug: "lesson-11", title: "Callbacks & Hell",         type: "article",   duration: "14m", isLocked: true, xp: 50  },
        { slug: "lesson-12", title: "Promises",                 type: "exercise",  duration: "20m", isLocked: true, xp: 80  },
        { slug: "lesson-13", title: "async / await",            type: "exercise",  duration: "22m", isLocked: true, xp: 90  },
        { slug: "lesson-14", title: "Fetch API & REST",         type: "exercise",  duration: "26m", isLocked: true, xp: 100 },
      ],
    },
    {
      title: "Modern Patterns",
      lessons: [
        { slug: "lesson-15", title: "ES2024 Features",          type: "article",   duration: "18m", isLocked: true, xp: 70 },
        { slug: "lesson-16", title: "Functional Programming",   type: "exercise",  duration: "22m", isLocked: true, xp: 90 },
        { slug: "lesson-17", title: "Design Patterns",          type: "article",   duration: "20m", isLocked: true, xp: 80 },
        { slug: "lesson-18", title: "Final Project",            type: "exercise",  duration: "45m", isLocked: true, xp: 200 },
      ],
    },
  ],
};

// ── JavaScript lesson content ─────────────────────────────────────────────────
const JS_LESSONS: Record<string, LessonContent> = {
  "lesson-1": {
    title: "Introduction & Setup",
    type: "article",
    duration: "8m",
    xp: 30,
    objectives: [
      "Understand what JavaScript is and where it runs",
      "Learn how to use the code editor",
      "Write and run your very first JS snippet",
    ],
    content: `## Welcome to JavaScript Mastery 🚀

JavaScript is the world's most widely-used programming language. It runs in browsers, on servers (Node.js), on mobile devices, and even inside databases.

### Why JavaScript?
- **Universal** — the only language that runs natively in every browser
- **Versatile** — frontend, backend, mobile, desktop, IoT
- **Massive ecosystem** — npm has over 2 million packages
- **High demand** — consistently one of the top-paying and most-hired languages

### Your Learning Environment
The panel on the right is a full Monaco editor (the same engine that powers VS Code). You can:
- Edit code freely
- Press **Run Code** (or **⌘ Enter**) to execute and see output below
- Press the **Reset** button to restore the original code

### Hello, World!
The classic first program — just to make sure everything works. Look at the editor, hit **Run Code**, and you'll see the output appear.

> 💡 **Tip:** Every lesson builds on the previous one. Don't skip — the concepts stack!`,
    code: `// Your first JavaScript program!
// Press "Run Code" or ⌘ Enter to execute.

const language = "JavaScript";
const year = new Date().getFullYear();

console.log(\`Hello, \${language}! It's \${year}.\`);

// Let's also explore a basic function:
function add(a, b) {
  return a + b;
}

console.log("2 + 3 =", add(2, 3));
console.log("10 + 7 =", add(10, 7));
`,
    language: "javascript",
    filename: "hello.js",
  },

  "lesson-2": {
    title: "Variables & Data Types",
    type: "exercise",
    duration: "14m",
    xp: 50,
    objectives: [
      "Distinguish between var, let, and const",
      "Identify all primitive data types in JavaScript",
      "Use typeof to inspect runtime types",
    ],
    content: `## Variables & Data Types

JavaScript has **three** ways to declare variables — and knowing the difference is crucial.

### const vs let vs var

| Keyword | Scope   | Re-assignable | Re-declarable |
|---------|---------|---------------|---------------|
| \`const\`  | Block   | ✗ No          | ✗ No          |
| \`let\`    | Block   | ✓ Yes         | ✗ No          |
| \`var\`    | Function| ✓ Yes         | ✓ Yes         |

> 🔑 **Rule of thumb:** always start with \`const\`. Only use \`let\` if you know the value will change. Never use \`var\` in modern code.

### Primitive Types
JavaScript has **7 primitive types**:
- \`number\` — integers and floats (e.g. \`42\`, \`3.14\`)
- \`string\` — text (e.g. \`"hello"\`, \`\`template literal\`\`)
- \`boolean\` — \`true\` or \`false\`
- \`null\` — deliberate absence of a value
- \`undefined\` — variable declared but not assigned
- \`bigint\` — arbitrarily large integers (e.g. \`9007199254740991n\`)
- \`symbol\` — unique identifiers

### Challenge
Complete the code on the right to pass all the \`console.assert\` checks!`,
    code: `// CHALLENGE: fill in the correct values / types to pass all asserts.

// 1. Declare a constant for your name
const myName = ""; // ← change this to your name

// 2. Declare a mutable variable for your age
let myAge = 0; // ← set your age

// 3. Is JavaScript awesome? (boolean)
const isAwesome = false; // ← fix me

// 4. Use typeof to check types
const typeOfAge  = typeof myAge;      // should be "number"
const typeOfName = typeof myName;     // should be "string"

// ─── Tests ───────────────────────────────────────────────
console.assert(myName.length > 0,         "❌ myName should not be empty");
console.assert(myAge > 0 && myAge < 130,  "❌ myAge should be a valid age");
console.assert(isAwesome === true,        "❌ isAwesome should be true!");
console.assert(typeOfAge  === "number",   "❌ typeof age should be 'number'");
console.assert(typeOfName === "string",   "❌ typeof name should be 'string'");

console.log("✅ All checks passed! Great work.");
console.log(\`Hi \${myName}, age \${myAge}. JS is awesome: \${isAwesome}\`);
`,
    language: "javascript",
    filename: "variables.js",
  },

  "lesson-3": {
    title: "Operators & Expressions",
    type: "exercise",
    duration: "12m",
    xp: 50,
    objectives: [
      "Use arithmetic, comparison, and logical operators",
      "Understand strict equality (===) vs loose equality (==)",
      "Work with string concatenation and template literals",
    ],
    content: `## Operators & Expressions

### Arithmetic Operators

\`\`\`js
+   -   *   /   %   **   ++   --
\`\`\`

The \`**\` operator is **exponentiation** (e.g. \`2 ** 10 === 1024\`).

### Comparison Operators

| Operator | Meaning                      | Example         |
|----------|------------------------------|-----------------|
| \`===\`     | Strict equal (type + value)  | \`1 === 1\` → true|
| \`!==\`     | Strict not equal             | \`1 !== 2\` → true|
| \`==\`      | Loose equal (coerces types)  | \`1 == "1"\` → true|
| \`>\`  \`<\`  | Greater / less than          | \`5 > 3\` → true  |

> ⚠️ **Always prefer \`===\`** — loose equality (\`==\`) has surprising edge-cases caused by type coercion.

### Logical Operators

- \`&&\` — AND (both must be truthy)
- \`||\` — OR (at least one must be truthy)
- \`!\`  — NOT (inverts the boolean)
- \`??\` — Nullish coalescing (falls back only on \`null\`/\`undefined\`)

### Template Literals
Use backticks (\`\`) for multi-line strings and interpolation:
\`\`\`js
const msg = \\\`Hello, \\\${name}! You scored \\\${score}/100.\\\`;
\`\`\``,
    code: `// Operators & Expressions — fill in the blanks

// ── Arithmetic ───────────────────────────────────────────
const a = 10;
const b = 3;

const sum   = a + b;     // 13
const diff  = a - b;     // 7
const prod  = a * b;     // 30
const quot  = a / b;     // ~3.33
const rem   = a % b;     // 1  (remainder)
const power = a ** b;    // 1000

console.log("Arithmetic:", { sum, diff, prod, quot: quot.toFixed(2), rem, power });

// ── Comparison ───────────────────────────────────────────
console.log("5 === 5:", 5 === 5);          // true
console.log("5 === '5':", 5 === "5");      // false (strict)
console.log("5 ==  '5':", 5 == "5");       // true  (loose — avoid!)

// ── Logical ──────────────────────────────────────────────
const score = 72;
const passed = score >= 60 && score <= 100;
console.log("Passed:", passed); // true

const username = null;
const displayName = username ?? "Anonymous";
console.log("Display name:", displayName); // "Anonymous"

// ── Template literals ────────────────────────────────────
const name = "Alice";
const greeting = \`Hello, \${name}! You scored \${score}/100.\`;
console.log(greeting);
`,
    language: "javascript",
    filename: "operators.js",
  },

  "lesson-4": {
    title: "Control Flow",
    type: "exercise",
    duration: "16m",
    xp: 60,
    objectives: [
      "Write if / else if / else chains",
      "Use switch statements effectively",
      "Understand and use ternary expressions",
    ],
    content: `## Control Flow

Programs need to make decisions. JavaScript gives you several constructs for that.

### if / else
\`\`\`js
if (condition) {
  // runs when condition is truthy
} else if (otherCondition) {
  // runs when otherCondition is truthy
} else {
  // fallback
}
\`\`\`

### Ternary Operator
A compact one-liner for simple if/else:
\`\`\`js
const label = score >= 60 ? "Pass" : "Fail";
\`\`\`

### switch
Best when comparing a single value against many possibilities:
\`\`\`js
switch (direction) {
  case "north": move(0, 1);  break;
  case "south": move(0, -1); break;
  default:      console.log("Unknown direction");
}
\`\`\`

> 💡 Always add \`break\` (or \`return\`) after each case to prevent **fall-through** bugs.

### Challenges
The code editor has three challenges to solve. Uncomment and fix each one!`,
    code: `// CHALLENGE 1: Grade calculator
// Fix the function to return the correct letter grade
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  // TODO: add C (70-79), D (60-69), and F (0-59)
  return "?"; // ← fix this
}

console.log("Tests - getGrade:");
console.assert(getGrade(95) === "A",  "95 should be A");
console.assert(getGrade(83) === "B",  "83 should be B");
console.assert(getGrade(75) === "C",  "75 should be C");
console.assert(getGrade(62) === "D",  "62 should be D");
console.assert(getGrade(40) === "F",  "40 should be F");

// CHALLENGE 2: Day name from number
function getDayName(n) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday"];
  // TODO: use switch or array lookup to return the day name
  // Return "Invalid" if n is not 0-6
  return "Invalid";
}

console.log("\\nTests - getDayName:");
console.assert(getDayName(0) === "Sunday",  "0 → Sunday");
console.assert(getDayName(6) === "Saturday","6 → Saturday");
console.assert(getDayName(7) === "Invalid", "7 → Invalid");

console.log("\\n✅ Fix the TODOs above and re-run to pass all tests!");
`,
    language: "javascript",
    filename: "control-flow.js",
  },

  "lesson-5": {
    title: "Functions Deep Dive",
    type: "exercise",
    duration: "20m",
    xp: 80,
    objectives: [
      "Write function declarations, expressions, and arrow functions",
      "Understand default parameters and rest args",
      "Use higher-order functions (map, filter, reduce)",
    ],
    content: `## Functions Deep Dive

Functions are **first-class citizens** in JavaScript — they can be stored in variables, passed as arguments, and returned from other functions.

### Three Ways to Write Functions

**Declaration** (hoisted — can be called before the line it's defined on):
\`\`\`js
function add(a, b) { return a + b; }
\`\`\`

**Expression** (not hoisted):
\`\`\`js
const add = function(a, b) { return a + b; };
\`\`\`

**Arrow function** (concise, no own \`this\`):
\`\`\`js
const add = (a, b) => a + b;
\`\`\`

### Default Parameters
\`\`\`js
function greet(name = "World") {
  return \\\`Hello, \\\${name}!\\\`;
}
greet();        // "Hello, World!"
greet("Alice"); // "Hello, Alice!"
\`\`\`

### Rest Parameters & Spread
\`\`\`js
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10
\`\`\`

### Higher-Order Functions
- \`array.map(fn)\`    — transform each element
- \`array.filter(fn)\` — keep elements where fn returns true
- \`array.reduce(fn)\` — fold array into a single value`,
    code: `// ── Arrow function practice ──────────────────────────────────
const double  = n => n * 2;
const square  = n => n ** 2;
const isEven  = n => n % 2 === 0;

// ── Default parameters ────────────────────────────────────────
const greet = (name = "World", emoji = "👋") =>
  \`Hello, \${name}! \${emoji}\`;

console.log(greet());           // Hello, World! 👋
console.log(greet("Alice", "🚀")); // Hello, Alice! 🚀

// ── Rest parameters ───────────────────────────────────────────
const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);
console.log("sum(1..5):", sum(1, 2, 3, 4, 5)); // 15

// ── Higher-order functions ────────────────────────────────────
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doubled = nums.map(double);
console.log("doubled:", doubled);

const evens  = nums.filter(isEven);
console.log("evens:", evens);

const total  = nums.reduce((acc, n) => acc + n, 0);
console.log("total:", total); // 55

// ── CHALLENGE: write a function 'pipeline' that applies
//   an array of functions to a value, left to right.
// e.g. pipeline(3, [double, square]) → 36  (double first → 6, then square → 36)
function pipeline(value, fns) {
  // TODO: implement this using .reduce()
  return value;
}

const result = pipeline(3, [double, square]);
console.assert(result === 36, "pipeline(3, [double, square]) should be 36");
console.log("pipeline result:", result);
`,
    language: "javascript",
    filename: "functions.js",
  },
};

// ── TypeScript lesson content ─────────────────────────────────────────────────
const TS_LESSONS: Record<string, LessonContent> = {
  "lesson-1": {
    title: "Introduction to TypeScript",
    type: "article",
    duration: "10m",
    xp: 30,
    objectives: [
      "Understand the difference between TypeScript and JavaScript",
      "Know how to annotate variables and function signatures",
      "See how TypeScript catches errors at compile-time",
    ],
    content: `## Welcome to TypeScript Pro 🔷

TypeScript is **JavaScript with types**. It compiles down to plain JS, but during development it catches an entire class of bugs before they reach production.

### Why TypeScript?

\`\`\`ts
// JavaScript — this crashes at runtime
function greet(user) {
  return "Hello, " + user.toUpperCase();
}
greet(undefined); // 💥 TypeError: Cannot read properties of undefined

// TypeScript — caught at *compile time*
function greet(user: string): string {
  return "Hello, " + user.toUpperCase();
}
greet(undefined); // ❌ Argument of type 'undefined' is not assignable to parameter of type 'string'.
\`\`\`

TypeScript also gives you:
- **Autocomplete** everywhere — even for your own code
- **Refactoring safety** — rename a function and all usages update
- **Living documentation** — types are always up-to-date

### Basic Type Annotations
\`\`\`ts
const name: string   = "Alice";
const age:  number   = 30;
const admin: boolean = true;

function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

The editor on the right shows TypeScript running with full type-checking. Run it and watch the output!`,
    code: `// TypeScript Basics

// ── Primitive annotations ───────────────────────────────────
const name: string  = "Alice";
const age:  number  = 30;
const admin: boolean = false;

// ── Function with typed params + return ────────────────────
function add(a: number, b: number): number {
  return a + b;
}

// ── Object type ────────────────────────────────────────────
interface User {
  id:    number;
  name:  string;
  email: string;
  role?: "admin" | "student"; // optional union type
}

const user: User = {
  id:    1,
  name:  "Alice",
  email: "alice@example.com",
  role:  "student",
};

// ── Generic function ───────────────────────────────────────
function firstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

// ── Runtime output ─────────────────────────────────────────
console.log(\`User: \${user.name} (\${user.role})\`);
console.log("add(5, 7) =", add(5, 7));
console.log("firstItem([10,20,30]) =", firstItem([10, 20, 30]));
console.log("firstItem([]) =", firstItem([]));
`,
    language: "typescript",
    filename: "intro.ts",
  },
};

// ── React lesson content ──────────────────────────────────────────────────────
const REACT_LESSONS: Record<string, LessonContent> = {
  "lesson-1": {
    title: "React & RSC — Introduction",
    type: "article",
    duration: "12m",
    xp: 30,
    objectives: [
      "Understand components, JSX, and the virtual DOM",
      "Know the difference between Server and Client components",
      "Write a simple functional component",
    ],
    content: `## React & Next.js ⚛️

React 19 is the latest version of the most popular UI library on earth. Combined with Next.js App Router, you get a full-stack React framework that runs components on the server by default.

### Components
Everything in React is a **component** — a function that returns JSX:
\`\`\`tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

### Server vs Client Components
- **Server Components** (default in Next.js) — render on the server, zero JS shipped to the client
- **Client Components** — add \`"use client"\` at the top, opts into hydration + interactivity

### JSX Rules
1. Return a **single root element** (or use \`<></>\` fragment)
2. Use **className** instead of class
3. **camelCase** all HTML attributes (\`onClick\`, \`onSubmit\`)
4. Self-close void elements (\`<img />\`, \`<input />\`)

### Props & Children
\`\`\`tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
\`\`\`

The code editor shows a TypeScript/JSX snippet — run it to see it in action (output will show JSX structure as a string, since we're in a plain sandbox).`,
    code: `// React Component Patterns (TypeScript / JSX preview)
// This is pseudocode for illustration — in a real Next.js app,
// these components would render to actual DOM.

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

// ── Functional component with typed props ───────────────────
function Button({ label, variant = "primary", onClick }: ButtonProps) {
  const styles = {
    primary:   "bg-violet-600 text-white",
    secondary: "bg-zinc-700 text-zinc-200",
  };

  // In real JSX: return <button className={styles[variant]}>{label}</button>
  return \`<button class="\${styles[variant]}">\${label}</button>\`;
}

// ── Component composition ───────────────────────────────────
function Card({ title, children }: { title: string; children: string }) {
  return \`<div class="card"><h2>\${title}</h2>\${children}</div>\`;
}

// ── Simulate rendering ──────────────────────────────────────
const primaryBtn = Button({ label: "Get Started" });
const ghostBtn   = Button({ label: "Learn More", variant: "secondary" });

console.log("Primary button:", primaryBtn);
console.log("Ghost button:  ", ghostBtn);
console.log("Card:", Card({ title: "My Card", children: primaryBtn }));
`,
    language: "typescript",
    filename: "components.tsx",
  },
};

// ── Python lessons ────────────────────────────────────────────────────────────
const PYTHON_LESSONS: Record<string, LessonContent> = {
  "lesson-1": {
    title: "Python — Introduction",
    type: "article",
    duration: "8m",
    xp: 30,
    objectives: [
      "Understand Python's philosophy and use cases",
      "Run your first Python snippet in the editor",
      "Learn about print() and basic syntax",
    ],
    content: `## Welcome to Python for Developers 🐍

Python is the world's most popular language for newcomers and professionals alike. It's used for:
- **Web development** — Django, FastAPI, Flask
- **Data science & AI** — NumPy, Pandas, TensorFlow, PyTorch
- **Automation & scripting** — AWS Lambdas, CLI tools, web scraping
- **Systems & DevOps** — Ansible, Salt, automation scripts

### The Zen of Python
Python has an explicit philosophy baked in:
\`\`\`py
import this  # prints The Zen of Python
\`\`\`

Key principles: *Readability counts. Explicit is better than implicit. Simple is better than complex.*

### Syntax Highlights
- **Indentation** defines blocks (no curly braces)
- **No semicolons** at line ends
- **Duck typing** — variables don't need type annotations (but you can add them!)
- \`print()\` for output, \`input()\` for user input

### Code style — PEP 8
The official Python style guide:
- \`snake_case\` for variables and functions
- \`PascalCase\` for classes
- 4 spaces for indentation

> Note: The code editor uses JavaScript evaluation, so the code here is shown as a **TypeScript equivalent** of Python patterns.`,
    code: `// Equivalent Python concepts shown in JavaScript
// (The real platform would run Python via a server-side sandbox)

// Python: print("Hello World")
console.log("Hello, World!");

// Python variables — no type declarations needed
const language = "Python";
const version  = 3.12;
const is_fast  = true;   // Python uses snake_case

// Python: f-string  →  JS: template literal
const message = \`Welcome to \${language} \${version}!\`;
console.log(message);

// Python: list  →  JS: array
const fruits = ["apple", "banana", "cherry"];
console.log("Fruits:", fruits);

// Python: dict  →  JS: object
const person = {
  name: "Alice",
  age: 30,
  skills: ["Python", "SQL", "Docker"],
};
console.log("Person:", JSON.stringify(person, null, 2));
`,
    language: "typescript",
    filename: "intro.py",
  },
};

// ── Master curriculum map ─────────────────────────────────────────────────────
export const CURRICULA: Record<string, TrackCurriculum> = {
  javascript: JS_CURRICULUM,
};

// Default curriculum generator for tracks without custom content
function defaultCurriculum(title: string, lessonCount: number): TrackCurriculum {
  const sectionSize = 5;
  const sectionTitles = [
    "Getting Started", "Core Concepts", "Intermediate Patterns",
    "Advanced Topics", "Real-World Projects",
  ];

  const sections: TrackCurriculum["sections"] = [];
  let lessonIdx = 0;

  const genericTitles = [
    "Introduction & Setup", "Core Concepts", "Data Structures",
    "Functions & Modules", "Control Flow", "Object Orientation",
    "Error Handling", "Async Patterns", "Testing", "Performance",
    "Security Basics", "Deployment", "Project Setup", "Building Features",
    "Authentication", "Database Integration", "API Design", "Final Project",
  ];

  for (let s = 0; s < sectionTitles.length && lessonIdx < lessonCount; s++) {
    const lessons = [];
    for (let l = 0; l < sectionSize && lessonIdx < lessonCount; l++, lessonIdx++) {
      lessons.push({
        slug:     `lesson-${lessonIdx + 1}`,
        title:    genericTitles[lessonIdx % genericTitles.length],
        type:     (lessonIdx % 4 === 3 ? "exercise" : lessonIdx % 7 === 6 ? "quiz" : "article") as "article" | "exercise" | "quiz",
        duration: `${10 + lessonIdx * 2}m`,
        isLocked: lessonIdx > 4,
        xp:       50 + lessonIdx * 5,
      });
    }
    sections.push({ title: sectionTitles[s], lessons });
  }

  return { sections };
}

export function getCurriculum(slug: string, title: string, lessonCount: number): TrackCurriculum {
  return CURRICULA[slug] ?? defaultCurriculum(title, Math.min(lessonCount, 18));
}

// ── Lesson content resolver ───────────────────────────────────────────────────
const TRACK_LESSONS: Record<string, Record<string, LessonContent>> = {
  javascript: JS_LESSONS,
  typescript: TS_LESSONS,
  react:      REACT_LESSONS,
  python:     PYTHON_LESSONS,
};

export function getLessonContent(
  trackSlug: string,
  lessonSlug: string,
  trackTitle: string,
  lessonNum: number
): LessonContent {
  return (
    TRACK_LESSONS[trackSlug]?.[lessonSlug] ??
    makeFallback(lessonNum, trackTitle)
  );
}
