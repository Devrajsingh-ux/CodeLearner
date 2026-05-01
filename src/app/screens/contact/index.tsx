"use client";

import {
  ArrowRight,
  Bug,
  HelpCircle,
  LifeBuoy,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CONTACT_OPTIONS = [
  {
    icon: LifeBuoy,
    title: "Technical support",
    description: "Issues with the platform, editor, or your account.",
    cta: "support@zentax.io",
    href: "mailto:support@zentax.io",
    color: "text-violet-400",
    bg: "border-violet-500/20 bg-violet-500/8",
  },
  {
    icon: Bug,
    title: "Report a bug",
    description: "Found something broken? We want to know.",
    cta: "bugs@zentax.io",
    href: "mailto:bugs@zentax.io",
    color: "text-red-400",
    bg: "border-red-500/20 bg-red-500/8",
  },
  {
    icon: MessageCircle,
    title: "Discord community",
    description: "Fastest response — our active community members and mods.",
    cta: "Join Discord",
    href: "https://discord.gg/zentax",
    color: "text-indigo-400",
    bg: "border-indigo-500/20 bg-indigo-500/8",
  },
  {
    icon: Twitter,
    title: "Twitter / X",
    description: "Quick questions or public feedback.",
    cta: "@zentax_io",
    href: "https://twitter.com/zentax_io",
    color: "text-sky-400",
    bg: "border-sky-500/20 bg-sky-500/8",
  },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !subject || !message) return;
    setStatus("sending");
    // Simulated async submit — replace with real API call / server action
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  }

  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      {/* ── Ambient ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/2 h-144 w-xl -translate-x-1/2 rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      {/* ── Header ──────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 text-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
            <Mail className="h-3.5 w-3.5" />
            Contact us
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Get in{" "}
            <span className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              touch
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            We're a small team and we read every message. Typical response time
            is under one business day.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* ── Contact form ─────────────────────────────── */}
          <section>
            <h2 className="mb-6 text-xl font-semibold text-white">
              Send us a message
            </h2>

            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/8 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <Send className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Message sent!
                </h3>
                <p className="mb-6 max-w-xs text-sm text-zinc-400">
                  Thanks for reaching out. We'll reply to {email} within one
                  business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                  }}
                  className="text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="cf-email"
                    className="mb-1.5 block text-sm font-medium text-zinc-300"
                  >
                    Your email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cf-subject"
                    className="mb-1.5 block text-sm font-medium text-zinc-300"
                  >
                    Subject
                  </label>
                  <input
                    id="cf-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What's this about?"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cf-type"
                    className="mb-1.5 block text-sm font-medium text-zinc-300"
                  >
                    Type
                  </label>
                  <select
                    id="cf-type"
                    className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition-colors focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  >
                    <option>General question</option>
                    <option>Technical issue</option>
                    <option>Bug report</option>
                    <option>Billing / subscription</option>
                    <option>Curriculum feedback</option>
                    <option>Partnership inquiry</option>
                    <option>Press inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cf-message"
                    className="mb-1.5 block text-sm font-medium text-zinc-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us everything that's relevant — the more context, the faster we can help."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </section>

          {/* ── Contact options sidebar ───────────────────── */}
          <aside className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Other ways to reach us
            </h2>
            {CONTACT_OPTIONS.map(
              ({ icon: Icon, title, description, cta, href, color, bg }) => (
                <a
                  key={title}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className={`group flex items-start gap-4 rounded-2xl border ${bg} p-5 transition-all hover:-translate-y-0.5`}
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${bg} ${color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{title}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {description}
                    </p>
                    <p className={`mt-1.5 text-xs font-semibold ${color}`}>
                      {cta}
                    </p>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-violet-400" />
                </a>
              ),
            )}

            {/* FAQ link */}
            <Link
              href="/help"
              className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 p-5 transition-all hover:border-violet-500/25"
            >
              <HelpCircle className="h-5 w-5 shrink-0 text-zinc-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-300">
                  Check the Help Center first
                </p>
                <p className="text-xs text-zinc-600">
                  Over 100 articles cover most questions
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-violet-400" />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
