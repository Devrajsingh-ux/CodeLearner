import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "violet" | "cyan" | "emerald" | "amber";
  className?: string;
}

const colorClasses = {
  violet: "bg-linear-to-r from-violet-500 to-indigo-500",
  cyan: "bg-linear-to-r from-cyan-500 to-blue-500",
  emerald: "bg-linear-to-r from-emerald-500 to-teal-500",
  amber: "bg-linear-to-r from-amber-500 to-orange-500",
};

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = false,
  size = "md",
  color = "violet",
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs text-zinc-400">
          {label && <span>{label}</span>}
          {showPercent && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-white/8",
          sizeClasses[size],
        )}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorClasses[color],
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
