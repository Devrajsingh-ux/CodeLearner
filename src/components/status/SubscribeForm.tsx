"use client";
import type React from "react";
import { useState } from "react";

export function SubscribeForm(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      // Placeholder: replace with real server action / API call.
      await new Promise((res) => setTimeout(res, 700));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="mx-auto flex max-w-sm flex-col gap-3 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email for status updates"
        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>

      {status === "success" && (
        <p className="mt-2 text-sm text-emerald-400">
          Subscribed — check your inbox.
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400">
          Unable to subscribe. Try again later.
        </p>
      )}
    </form>
  );
}
