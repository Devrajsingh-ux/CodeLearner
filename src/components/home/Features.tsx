import {
  BarChart2,
  BookMarked,
  Code2,
  MessageSquare,
  ShieldCheck,
  Terminal,
  Trophy,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: Terminal,
    title: "In-Browser Code Editor",
    description:
      "Write, run, and test code directly in the browser. Full syntax highlighting, autocomplete, and instant feedback.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Code2,
    title: "Project-Based Learning",
    description:
      "Every track culminates in a real-world project you can add to your portfolio. No more toy examples.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Trophy,
    title: "XP & Achievement System",
    description:
      "Earn XP, unlock badges, maintain streaks. Gamification keeps you motivated and consistent.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Zap,
    title: "Adaptive Learning Path",
    description:
      "Our algorithm detects your strengths and gaps, then personalizes the next lessons accordingly.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BarChart2,
    title: "Detailed Progress Analytics",
    description:
      "Visual dashboards track completion, time spent, and skill growth across all your enrolled tracks.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: MessageSquare,
    title: "Community & Mentorship",
    description:
      "Ask questions, share work, and get feedback from our growing community and expert instructors.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Industry Certificates",
    description:
      "Earn verified certificates recognized by top tech companies upon completing tracks.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
  },
  {
    icon: BookMarked,
    title: "Offline Access",
    description:
      "Download lessons for offline reading. Your progress syncs automatically when you reconnect.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative py-16 sm:py-24 lg:py-28"
      aria-label="Platform features"
    >
      {/* Subtle bg glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-96 w-200 -translate-x-1/2 rounded-full bg-violet-600/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <span className="mb-3 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-400">
            Why Zentax?
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything you need to go{" "}
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              pro, fast
            </span>
          </h2>
          <p className="mt-3 text-base text-zinc-400 sm:mt-4 sm:text-lg">
            We've built the learning environment we wish existed — interactive,
            structured, and brutally focused on outcomes.
          </p>
        </div>

        {/* Features grid — 1 col mobile → 2 sm → 2 md → 4 lg */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <Card key={title} hover className="group">
              <div
                className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${bg} sm:mb-4`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h3 className="mb-1.5 font-semibold text-white sm:mb-2">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
