import type { Metadata } from "next";
import { ProblemsClient } from "@/components/problems/ProblemsClient";
import { problems } from "@/data/problems";
import { SUPPORTED_LANGUAGES } from "@/data/problems";

export const metadata: Metadata = {
  title: "Problems — Zentax",
  description:
    "Practice coding problems across JavaScript, TypeScript, Python, Java, C++, Go, Rust, C# and more — with an in-browser compiler.",
};

export default function ProblemsPage() {
  return (
    <ProblemsClient
      problems={problems}
      languages={SUPPORTED_LANGUAGES}
    />
  );
}
