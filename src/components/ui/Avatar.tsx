import { cn } from "@/lib/utils";

interface AvatarProps {
  initials?: string;
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

export function Avatar({ initials, src, alt, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        "bg-gradient-to-br from-violet-600 to-indigo-700 font-semibold text-white ring-2 ring-white/10",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt ?? initials ?? "avatar"} className="h-full w-full object-cover" />
      ) : (
        <span>{initials ?? "?"}</span>
      )}
    </div>
  );
}
