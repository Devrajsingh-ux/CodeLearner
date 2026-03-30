"use client";

import { motion } from "framer-motion";
import { cn, formatNumber } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/4 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CountUpValue({
  value,
  compact = false,
}: {
  value: number;
  compact?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="tabular-nums"
    >
      {compact ? formatNumber(value) : value.toLocaleString()}
    </motion.span>
  );
}

export function StatTile({
  icon,
  label,
  value,
  accent,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  accent: string;
  trend?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/35 p-4"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${accent}30 0%, transparent 60%)`,
        }}
      />
      <div className="relative">
        <div
          className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${accent}22` }}
        >
          {icon}
        </div>
        <p className="text-xl font-bold text-white">{value}</p>
        <p className="text-xs text-zinc-500">{label}</p>
        {trend ? (
          <p className="mt-1 text-[11px] text-cyan-300">{trend}</p>
        ) : null}
      </div>
    </motion.div>
  );
}

export function CircularProgress({
  value,
  total,
  size = 120,
  label,
}: {
  value: number;
  total: number;
  size?: number;
  label?: string;
}) {
  const ratio = total > 0 ? Math.min(1, Math.max(0, value / total)) : 0;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * ratio;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full -rotate-90"
        role="img"
        aria-label={label ? `${label} progress` : "Progress"}
      >
        <title>{label ? `${label} progress` : "Progress"}</title>
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="fill-none stroke-white/10"
          strokeWidth="10"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          className="fill-none stroke-violet-500"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${dash} ${circumference - dash}` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-bold text-white">
          {Math.round(ratio * 100)}%
        </p>
        {label ? <p className="text-[11px] text-zinc-500">{label}</p> : null}
      </div>
    </div>
  );
}

export function TabChip({
  active,
  children,
  onClick,
  icon,
  badge,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  badge?: string | number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
        active
          ? "bg-violet-500/20 text-violet-200"
          : "text-zinc-400 hover:bg-white/6 hover:text-zinc-200",
      )}
    >
      {icon}
      <span>{children}</span>
      {badge ? (
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-300">
          {badge}
        </span>
      ) : null}
      {active ? (
        <motion.span
          layoutId="profile-tab-indicator"
          className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-violet-400"
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
        />
      ) : null}
    </button>
  );
}
