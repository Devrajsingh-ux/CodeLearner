/**
 * Maps each course slug to its official brand SVG icon via react-icons/si (Simple Icons).
 * Falls back to a generic code icon for unknown slugs.
 */

import type { ComponentType, SVGProps } from "react";
import { FaBrain, FaCode, FaDatabase, FaShieldAlt } from "react-icons/fa";
import {
  SiAmazonwebservices,
  SiAngular,
  SiCplusplus,
  SiDart,
  SiDjango,
  SiDocker,
  SiDotnet,
  SiElixir,
  SiEthereum,
  SiFastapi,
  SiGo,
  SiGodotengine,
  SiGraphql,
  SiHaskell,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiLinux,
  SiLua,
  SiNestjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRstudioide,
  SiRuby,
  SiRust,
  SiScala,
  SiSolidity,
  SiSvelte,
  SiSwift,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiUnity,
  SiUnrealengine,
  SiVuedotjs,
} from "react-icons/si";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** slug → { Icon, color } */
const ICON_MAP: Record<string, { Icon: IconComponent; color: string }> = {
  // ── Languages ──────────────────────────────────────────────────────────────
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  python: { Icon: SiPython, color: "#3776AB" },
  rust: { Icon: SiRust, color: "#CE422B" },
  golang: { Icon: SiGo, color: "#00ADD8" },
  java: { Icon: SiOpenjdk, color: "#ED8B00" },
  cpp: { Icon: SiCplusplus, color: "#00599C" },
  csharp: { Icon: SiDotnet, color: "#9B59B6" },
  kotlin: { Icon: SiKotlin, color: "#7F52FF" },
  swift: { Icon: SiSwift, color: "#FA7343" },
  ruby: { Icon: SiRuby, color: "#CC342D" },
  php: { Icon: SiPhp, color: "#8892BE" },
  dart: { Icon: SiDart, color: "#0175C2" },
  elixir: { Icon: SiElixir, color: "#9B59B6" },
  scala: { Icon: SiScala, color: "#DC322F" },
  haskell: { Icon: SiHaskell, color: "#5D4F85" },
  "r-lang": { Icon: SiRstudioide, color: "#276DC3" },
  lua: { Icon: SiLua, color: "#000080" },

  // ── Frontend ───────────────────────────────────────────────────────────────
  react: { Icon: SiReact, color: "#61DAFB" },
  vue: { Icon: SiVuedotjs, color: "#42B883" },
  angular: { Icon: SiAngular, color: "#DD0031" },
  svelte: { Icon: SiSvelte, color: "#FF3E00" },
  "html-css": { Icon: SiHtml5, color: "#E34C26" },
  "tailwind-css": { Icon: SiTailwindcss, color: "#06B6D4" },
  threejs: { Icon: SiThreedotjs, color: "#049EF4" },

  // ── Backend ────────────────────────────────────────────────────────────────
  nodejs: { Icon: SiNodedotjs, color: "#339933" },
  nestjs: { Icon: SiNestjs, color: "#E0234E" },
  django: { Icon: SiDjango, color: "#0C4B33" },
  fastapi: { Icon: SiFastapi, color: "#009688" },
  graphql: { Icon: SiGraphql, color: "#E535AB" },

  // ── Data & AI ──────────────────────────────────────────────────────────────
  "data-science": { Icon: SiPython, color: "#FF6B35" },
  "machine-learning": { Icon: FaBrain, color: "#FF9A3C" },
  "deep-learning": { Icon: SiPytorch, color: "#EE4C2C" },
  "llm-engineering": { Icon: FaBrain, color: "#10B981" },
  sql: { Icon: SiPostgresql, color: "#336791" },

  // ── Mobile ──────────────────────────────────────────────────────────────────
  "react-native": { Icon: SiReact, color: "#61DAFB" },
  flutter: { Icon: SiDart, color: "#54C5F8" },
  "ios-swift": { Icon: SiSwift, color: "#FA7343" },

  // ── DevOps & Cloud ─────────────────────────────────────────────────────────
  devops: { Icon: SiDocker, color: "#2496ED" },
  aws: { Icon: SiAmazonwebservices, color: "#FF9900" },
  linux: { Icon: SiLinux, color: "#FCC624" },

  // ── Systems ────────────────────────────────────────────────────────────────
  algorithms: { Icon: FaBrain, color: "#9333EA" },
  "system-design": { Icon: FaDatabase, color: "#64748B" },

  // ── Web3 & Security ─────────────────────────────────────────────────────────
  solidity: { Icon: SiSolidity, color: "#363636" },
  web3: { Icon: SiEthereum, color: "#F6851B" },
  cybersecurity: { Icon: FaShieldAlt, color: "#00FF41" },

  // ── Game Dev ────────────────────────────────────────────────────────────────
  unity: { Icon: SiUnity, color: "#FFFFFF" },
  godot: { Icon: SiGodotengine, color: "#478CBF" },
  unreal: { Icon: SiUnrealengine, color: "#AAAAAA" },
};

const FALLBACK: { Icon: IconComponent; color: string } = {
  Icon: FaCode,
  color: "#8B8B8B",
};

interface TechIconProps {
  slug: string;
  /** Size in pixels (passed as both width & height) */
  size?: number;
  className?: string;
}

export function TechIcon({ slug, size = 28, className }: TechIconProps) {
  const { Icon, color } = ICON_MAP[slug] ?? FALLBACK;
  return (
    <Icon width={size} height={size} style={{ color }} className={className} />
  );
}

/** Returns the brand color for a given slug (for gradient / glow usage) */
export function getTechColor(slug: string): string {
  return ICON_MAP[slug]?.color ?? "#8B8B8B";
}
