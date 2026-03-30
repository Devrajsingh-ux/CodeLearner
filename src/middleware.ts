import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("cl_session");
  const path = request.nextUrl.pathname;

  // 1. If logged in and trying to access the home page or auth pages, redirect to dashboard
  const authPages = ["/", "/login", "/register", "/verify", "/forgot-password", "/reset-password", "/oauth/callback"];
  if (sessionCookie && authPages.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 2. If NOT logged in and trying to access protected paths, redirect to home page
  // Add any specific client paths that require authentication here
  const protectedPaths = ["/dashboard", "/profile"];
  const isProtectedPath = protectedPaths.some((p) => path.startsWith(p));

  if (!sessionCookie && isProtectedPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except standard Next.js static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};
