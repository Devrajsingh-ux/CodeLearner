"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { client } from "@/lib/appwrite";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/**
 * Client wrapper rendered inside the root <body>.
 * Suppresses the public Navbar + Footer for every /admin/* route
 * so the admin panel can own its own full-screen chrome.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Ping the Appwrite backend on app open to verify the setup
  useEffect(() => {
    client.ping().catch(console.error);
  }, []);

  return (
    <>
      {!isAdmin && <Navbar />}
      <div id="main-content">{children}</div>
      {!isAdmin && <Footer />}
    </>
  );
}
