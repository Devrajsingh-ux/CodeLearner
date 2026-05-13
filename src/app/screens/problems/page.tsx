import type { Metadata } from "next";
import { Query } from "node-appwrite";
import { createAdminClient, DB_ID, COL_PROBLEMS, COL_LANGUAGES } from "@/lib/appwriteServer";
import { ProblemsClient } from "@/components/problems/ProblemsClient";
import type { Problem, ProblemExample, SupportedLanguage } from "@/types";

export const metadata: Metadata = {
  title: "Problems — Zentax",
  description:
    "Practice coding problems across JavaScript, TypeScript, Python, Java, C++, Go, Rust, C# and more — with an in-browser compiler.",
};

// Re-validate every 60 s via Next.js caching
export const revalidate = 60;

function parseJsonField<T>(value: unknown, fallback: T): T {
  if (Array.isArray(value)) return value as unknown as T;
  if (typeof value === "string" && value.trim()) {
    try { return JSON.parse(value) as T; } catch { return fallback; }
  }
  return fallback;
}

async function fetchProblems(): Promise<Problem[]> {
  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_PROBLEMS, [
      Query.orderAsc("number"),
      Query.limit(500),
    ]);
    return resp.documents.map((doc: any): Problem => ({
      id         : doc.$id,
      number     : Number(doc.number) || 0,
      title      : doc.title       ?? "Untitled",
      difficulty : (["Easy", "Medium", "Hard"].includes(doc.difficulty)
                    ? doc.difficulty : "Easy") as Problem["difficulty"],
      tags       : parseJsonField<string[]>(doc.tags, []),
      acceptance : Number(doc.acceptance) || 0,
      description: doc.description ?? "",
      examples   : parseJsonField<ProblemExample[]>(doc.examples, []),
      constraints: parseJsonField<string[]>(doc.constraints, []),
      hints      : parseJsonField<string[]>(doc.hints, []),
      starterCode: parseJsonField<Record<string, string>>(doc.starterCode, {}),
    }));
  } catch {
    return [];
  }
}

// fetch the array of supported languages from Appwrite
async function fetchLanguages(): Promise<SupportedLanguage[]> {
  try {
    const { databases } = createAdminClient();
    const resp = await databases.listDocuments(DB_ID, COL_LANGUAGES, [
      Query.orderAsc("label"),
      Query.limit(100),
    ]);
    return resp.documents.map((d: any) => ({
      id: d.id,
      label: d.label || d.id,
      monacoId: d.monacoId || d.id,
      icon: d.icon || "",
      color: d.color || "",
      judge0Id: Number(d.judge0Id) || 0,
      fileExt: d.fileExt || "",
    }));
  } catch {
    return [];
  }
}
export default async function ProblemsPage() {
  const problems = await fetchProblems();
  const languages = await fetchLanguages();

  return (
    <ProblemsClient
      problems={problems}
      languages={languages}
    />
  );
}
