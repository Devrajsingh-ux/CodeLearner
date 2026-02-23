import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    default: "CodeLearn — Master Coding. Build the Future.",
    template: "%s — CodeLearn",
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
  authors: [{ name: "CodeLearn" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codelearn.io",
    siteName: "CodeLearn",
    title: "CodeLearn — Master Coding. Build the Future.",
    description:
      "Expert-crafted coding courses with an in-browser editor and 285k+ learners.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeLearn — Master Coding. Build the Future.",
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

// Pages that should NOT show the site-wide Navbar/Footer (they have their own or none)
const BARE_PATHS_PREFIX = ["/learn/", "/dashboard"];

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
            Navbar is rendered on all routes.
            Auth pages and full-screen lesson pages control their own top bar.
          */}
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
