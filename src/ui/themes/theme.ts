
import { Geist, Geist_Mono } from "next/font/google";
import { themeTokenContract } from "@/ui/themes/tokens";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const theme = {
  colors: {
    background: `hsl(var(${themeTokenContract.color.background}))`,
    foreground: `hsl(var(${themeTokenContract.color.foreground}))`,
    card: `hsl(var(${themeTokenContract.color.card}))`,
    cardForeground: `hsl(var(${themeTokenContract.color.cardForeground}))`,
    popover: "hsl(var(--popover))",
    popoverForeground: "hsl(var(--popover-foreground))",
    primary: `hsl(var(${themeTokenContract.color.primary}))`,
    primaryForeground: `hsl(var(${themeTokenContract.color.primaryForeground}))`,
    secondary: `hsl(var(${themeTokenContract.color.secondary}))`,
    secondaryForeground: `hsl(var(${themeTokenContract.color.secondaryForeground}))`,
    muted: `hsl(var(${themeTokenContract.color.muted}))`,
    mutedForeground: `hsl(var(${themeTokenContract.color.mutedForeground}))`,
    accent: `hsl(var(${themeTokenContract.color.accent}))`,
    accentForeground: `hsl(var(${themeTokenContract.color.accentForeground}))`,
    destructive: `hsl(var(${themeTokenContract.color.destructive}))`,
    destructiveForeground: `hsl(var(${themeTokenContract.color.destructiveForeground}))`,
    border: `hsl(var(${themeTokenContract.color.border}))`,
    input: `hsl(var(${themeTokenContract.color.input}))`,
    ring: `hsl(var(${themeTokenContract.color.ring}))`,
  },
  borderRadius: {
    lg: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
    sm: "calc(var(--radius) - 4px)",
  },
  fontFamily: {
    sans: ["var(--font-geist-sans)"],
    mono: ["var(--font-geist-mono)"],
  },
};
