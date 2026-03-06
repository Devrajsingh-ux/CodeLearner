import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zentax — Master Coding. Build the Future.",
    template: "%s — Zentax",
  },
  description:
    "Expert-crafted coding courses with an in-browser editor, project-based learning, and a community of 285k+ developers. Free forever plan.",
  keywords: [
    "coding",
    "programming",
    "learn to code",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Zentax" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zentax.io",
    siteName: "Zentax",
    title: "Zentax — Master Coding. Build the Future.",
    description:
      "Expert-crafted coding courses with an in-browser editor and 285k+ learners.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentax — Master Coding. Build the Future.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-950 text-zinc-100 antialiased`}
      >
        <AuthProvider>
          {/*
            AppShell renders Navbar + Footer on all public routes.
            /admin/* routes suppress both — the admin layout owns its chrome.
          */}
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
