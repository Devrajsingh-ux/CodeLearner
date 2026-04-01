import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Format date as YYYY-MM-DD for database storage
 * Shared utility to eliminate duplication across API routes
 */
export function formatDateISO(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function xpForNextLevel(level: number): number {
  return level * level * 100;
}

/**
 * Calculate days between two date strings (YYYY-MM-DD format)
 */
export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

// ============================================================================
// API Response Utilities
// ============================================================================

/**
 * Standardized unauthorized response
 * Eliminates duplication across API routes
 */
export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

/**
 * Standardized validation error response
 */
export function validationErrorResponse(errors: string[] | string) {
  return NextResponse.json(
    {
      error: "Invalid input",
      details: Array.isArray(errors) ? errors : [errors]
    },
    { status: 400 }
  );
}

/**
 * Standardized internal server error response
 */
export function serverErrorResponse(message = "Internal server error") {
  return NextResponse.json({ error: message }, { status: 500 });
}

/**
 * Standardized not found response
 */
export function notFoundResponse(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

// ============================================================================
// Database Error Handling
// ============================================================================

/**
 * Database error handler that provides consistent fallback behavior
 * Eliminates duplication of database error handling across API routes
 */
interface DatabaseFallback<T> {
  fallbackData: T;
  warningMessage?: string;
}

export function handleDatabaseError<T>(
  error: unknown,
  fallback: DatabaseFallback<T>,
  operationName: string = "database operation"
): { success: false; response: NextResponse } | { success: true; data: T } {
  const dbError = error as { code?: number; type?: string; message?: string };

  // Handle database not found gracefully (development/setup scenario)
  if (dbError.code === 404 && dbError.type === 'database_not_found') {
    console.warn(`Database not found during ${operationName}:`, dbError.message);
    return {
      success: true,
      data: fallback.fallbackData
    };
  }

  // Log other database errors but don't expose them
  console.error(`Database error in ${operationName}:`, dbError.message || 'Unknown error');

  return {
    success: false,
    response: serverErrorResponse(`Unable to complete ${operationName}. Please try again.`)
  };
}

/**
 * Generic async operation wrapper with error handling
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  getErrorResponse: (error: unknown) => NextResponse
): Promise<NextResponse | T> {
  try {
    return await operation();
  } catch (error) {
    console.error('Operation failed:', error instanceof Error ? error.message : 'Unknown error');
    return getErrorResponse(error);
  }
}