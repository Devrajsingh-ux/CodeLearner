import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Zentax",
  description:
    "Tutorials, deep-dives, engineering culture, and career advice from the Zentax team and community.",
};

type Category =
  | "All"
  | "Tutorial"
  | "Engineering"
  | "Career"
  | "Community"
  | "Product";

const CATEGORIES: Category[] = [
  "All",
  "Tutorial",
  "Engineering",
  "Career",
  "Community",
  "Product",
];

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<Category, "All">;
  author: { name: string; initials: string; gradient: string };
  date: string;
  readTime: string;
  isFeatured?: boolean;
  tagColor: string;
}

const POSTS: Post[] = [
  {
    slug: "react-19-new-features",
    title: "React 19 in Production: What Actually Changed",
    excerpt:
      "Server Components are stable, the compiler is real, and the mental model has shifted. We spent three months migrating Zentax's own dashboard — here's what we learned.",
    category: "Engineering",
    author: {
      name: "Jordan Lee",
      initials: "JL",
      gradient: "from-cyan-500 to-blue-600",
    },
    date: "Feb 17, 2026",
    readTime: "12 min read",
    isFeatured: true,
    tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    slug: "typescript-5-satisfies",
    title: "TypeScript 5's `satisfies` Operator: The Complete Guide",
    excerpt:
      "`satisfies` is the most ergonomic addition to TypeScript since template literal types. Here's every pattern you'll actually use.",
    category: "Tutorial",
    author: {
      name: "Sofia Reyes",
      initials: "SR",
      gradient: "from-emerald-500 to-teal-600",
    },
    date: "Feb 10, 2026",
    readTime: "9 min read",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    slug: "landing-your-first-dev-job",
    title: "How to Land Your First Developer Job in 2026",
    excerpt:
      "The market is different but by no means closed. We analysed 400 successful Zentax graduates and distilled eight repeatable patterns.",
    category: "Career",
    author: {
      name: "Priya Sharma",
      initials: "PS",
      gradient: "from-fuchsia-500 to-purple-700",
    },
    date: "Feb 4, 2026",
    readTime: "14 min read",
    tagColor: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  },
  {
    slug: "building-at-scale-postgres",
    title: "PostgreSQL at 100M Rows: Indexing Strategies That Work",
    excerpt:
      "Partial indexes, BRIN for time-series, covering indexes, and how we cut our P99 query latency from 800 ms to 12 ms without adding hardware.",
    category: "Engineering",
    author: {
      name: "Daniel Osei",
      initials: "DO",
      gradient: "from-amber-500 to-orange-600",
    },
    date: "Jan 28, 2026",
    readTime: "18 min read",
    tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    slug: "open-source-curriculum",
    title: "We're Open-Sourcing Our Entire Exercise Repository",
    excerpt:
      "All 2 400+ hands-on exercises are now on GitHub under MIT license. Here's how to contribute new ones and how the review process works.",
    category: "Community",
    author: {
      name: "Priya Sharma",
      initials: "PS",
      gradient: "from-fuchsia-500 to-purple-700",
    },
    date: "Jan 20, 2026",
    readTime: "6 min read",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    slug: "ai-code-review-launch",
    title: "Introducing AI Code Review — Your Personal Senior Dev",
    excerpt:
      "We've embedded an AI reviewer into every exercise. It doesn't just tell you if you're wrong — it explains the why and suggests idiomatic alternatives.",
    category: "Product",
    author: {
      name: "Maya Patel",
      initials: "MP",
      gradient: "from-violet-500 to-indigo-600",
    },
    date: "Jan 13, 2026",
    readTime: "5 min read",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    slug: "css-grid-subgrid-guide",
    title: "CSS Subgrid: The Layout Technique We've All Been Waiting For",
    excerpt:
      "Subgrid shipped in all major browsers. Here's how it eliminates the hacks we've been living with and what layouts it makes trivial.",
    category: "Tutorial",
    author: {
      name: "Kai Nguyen",
      initials: "KN",
      gradient: "from-pink-500 to-rose-600",
    },
    date: "Jan 7, 2026",
    readTime: "10 min read",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    slug: "community-2025-year-in-review",
    title: "2025 Year in Review: Platform Growth, 60 New Tracks",
    excerpt:
      "A look back at everything we shipped, the community milestones that moved us, and a preview of what's coming in 2026.",
    category: "Community",
    author: {
      name: "Maya Patel",
      initials: "MP",
      gradient: "from-violet-500 to-indigo-600",
    },
    date: "Dec 31, 2025",
    readTime: "7 min read",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
];

const featured = POSTS.find((p) => p.isFeatured) ?? POSTS[0];
const rest = POSTS.filter((p) => !p.isFeatured);

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      {/* ── Ambient ────────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/2 h-144 w-xl -translate-x-1/2 rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <BookOpen className="h-3.5 w-3.5" />
            The Zentax Blog
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Ideas &{" "}
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              craft
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Tutorials, engineering deep-dives, career playbooks, and everything
            happening inside the Zentax community.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Category pills ─────────────────────────────────────── */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={
                cat === "All"
                  ? "rounded-full border border-violet-500/40 bg-violet-500/15 px-4 py-1.5 text-sm font-medium text-violet-300"
                  : "rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:border-violet-500/30 hover:text-violet-300"
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Featured post ──────────────────────────────────────── */}
        <div className="mb-12 overflow-hidden rounded-3xl border border-white/8 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/5 lg:flex">
          {/* Colour block */}
          <div className="relative flex min-h-55 w-full items-end overflow-hidden bg-linear-to-br from-violet-500/20 to-indigo-600/20 p-8 lg:min-h-full lg:w-[42%]">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 40%, rgba(139,92,246,0.15), transparent 60%)",
              }}
            />
            <span
              className={`relative z-10 rounded-full border px-3 py-1 text-xs font-semibold ${featured.tagColor}`}
            >
              {featured.category}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-8 lg:p-10">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
                Featured
              </p>
              <h2 className="mb-3 text-2xl font-bold leading-snug text-white lg:text-3xl">
                {featured.title}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-400">
                {featured.excerpt}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br ${featured.author.gradient} text-xs font-bold text-white`}
                >
                  {featured.author.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {featured.author.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <Clock className="h-3 w-3" />
                    {featured.readTime}
                  </div>
                </div>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition-colors hover:bg-violet-500/20"
              >
                Read <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Post grid ──────────────────────────────────────────── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-white/8 bg-white/3 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-white/5"
            >
              <div className="mb-4">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${post.tagColor}`}
                >
                  {post.category}
                </span>
              </div>
              <h3 className="mb-2 flex-1 text-base font-semibold leading-snug text-white group-hover:text-violet-100">
                {post.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-zinc-500 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-white/6 pt-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br ${post.author.gradient} text-xs font-bold text-white`}
                  >
                    {post.author.initials}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-300">
                      {post.author.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-600">
                      <span>{post.date}</span>
                      <span>·</span>
                      <Clock className="h-2.5 w-2.5" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read: ${post.title}`}
                  className="text-zinc-600 transition-colors hover:text-violet-400"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── Load more ──────────────────────────────────────────── */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-white/10"
          >
            <Tag className="h-4 w-4" />
            Load more articles
          </button>
        </div>
      </div>
    </main>
  );
}
