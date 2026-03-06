"use client";

import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Lightbulb,
  Loader2,
  Play,
  RotateCcw,
  Terminal,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { Problem, SupportedLanguage } from "@/types";
import { cn } from "@/lib/utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// ── Client-side JS / TS eval sandbox ─────────────────────────────────────────
function evalJsTs(code: string): { output: string; isError: boolean } {
  const logs: string[] = [];
  const orig = { log: console.log, error: console.error, warn: console.warn };
  try {
    console.log = (...a) => logs.push(a.map(String).join(" "));
    console.error = (...a) => logs.push(`[error] ${a.map(String).join(" ")}`);
    console.warn = (...a) => logs.push(`[warn]  ${a.map(String).join(" ")}`);
    const js = code
      .replace(/:\s*\w[\w<>[\], |&?]*(?=\s*[=,);{])/g, "")
      .replace(/:\s*\w[\w<>[\], |&?]*\s*\{/g, " {")
      .replace(/<[A-Z]\w*>/g, "")
      .replace(/^import\s+.*$/gm, "")
      .replace(/^export\s+/gm, "");
    // biome-ignore lint/security/noGlobalEval: intentional editor sandbox
    eval(js); // eslint-disable-line no-eval
    return { output: logs.length > 0 ? logs.join("\n") : "(no output)", isError: false };
  } catch (e) {
    return { output: [logs.join("\n"), `❌ ${String(e)}`].filter(Boolean).join("\n"), isError: true };
  } finally {
    Object.assign(console, orig);
  }
}

// ── Judge0 server-side execution (via Next.js server action) ─────────────────
async function runOnServer(
  code: string,
  languageId: number,
): Promise<{ output: string; isError: boolean }> {
  try {
    const res = await fetch("/api/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, languageId }),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = (await res.json()) as { output: string; stderr: string; status: string };
    if (data.stderr) return { output: data.stderr, isError: true };
    return { output: data.output || "(no output)", isError: false };
  } catch (e) {
    return {
      output: `❌ Compilation service unavailable.\nThis language requires server-side execution.\nError: ${String(e)}`,
      isError: true,
    };
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

interface ProblemCompilerProps {
  problem: Problem;
  language: SupportedLanguage;
  onSolved: (id: string) => void;
}

type RunStatus = "idle" | "running" | "success" | "error";
type Tab = "description" | "editor";

const difficultyStyle: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-500/10",
  Medium: "text-amber-400 bg-amber-500/10",
  Hard: "text-red-400 bg-red-500/10",
};

export function ProblemCompiler({ problem, language, onSolved }: ProblemCompilerProps) {
  const initialCode = problem.starterCode[language.id] ?? `// No starter code for ${language.label} yet.`;
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<RunStatus>("idle");
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [tab, setTab] = useState<Tab>("description");

  // Reset editor when problem or language changes
  function resetForNewProblem(c: string) {
    editorRef.current?.setValue(c);
    setCode(c);
    setOutput("");
    setStatus("idle");
    setShowOutput(false);
  }

  // Intercept prop changes by listening on a key (handled via parent key prop)
  const handleEditorMount = useCallback((ed: editor.IStandaloneCodeEditor) => {
    editorRef.current = ed;
    ed.addCommand(2048 | 3, () => handleRun()); // Ctrl/Cmd + Enter
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRun = useCallback(async () => {
    const src = editorRef.current?.getValue() ?? code;
    setStatus("running");
    setShowOutput(true);

    let result: { output: string; isError: boolean };

    if (language.id === "javascript" || language.id === "typescript") {
      await new Promise((r) => setTimeout(r, 120));
      result = evalJsTs(src);
    } else {
      result = await runOnServer(src, language.judge0Id);
    }

    setOutput(result.output);
    setStatus(result.isError ? "error" : "success");
    if (!result.isError) onSolved(problem.id);
  }, [code, language, problem.id, onSolved]);

  async function handleCopy() {
    const val = editorRef.current?.getValue() ?? code;
    await navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function handleReset() {
    resetForNewProblem(initialCode);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-zinc-950">
      {/* ── Tabs ─────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center border-b border-white/8 bg-zinc-900/50">
        {(["description", "editor"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "border-b-2 px-5 py-3 text-sm font-medium capitalize transition-colors",
              "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-violet-500",
              tab === t
                ? "border-violet-500 text-violet-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300",
            )}
          >
            {t}
          </button>
        ))}
        <div className="ml-auto px-4 py-2 flex items-center gap-1">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
              difficultyStyle[problem.difficulty],
            )}
          >
            {problem.difficulty}
          </span>
        </div>
      </div>

      {/* ── Description tab ──────────────────────────────────────── */}
      {tab === "description" && (
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">
              <span className="mr-2 text-zinc-600">#{problem.number}</span>
              {problem.title}
            </h2>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/6 px-2 py-0.5 text-[11px] text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description markdown-ish text */}
          <div
            className="prose prose-invert prose-sm max-w-none text-zinc-300 leading-relaxed"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: problem description is internal static data
            dangerouslySetInnerHTML={{
              __html: problem.description
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\`(.*?)\`/g, '<code class="rounded bg-zinc-800 px-1 py-0.5 text-violet-300 text-xs">$1</code>')
                .replace(/\n/g, "<br />"),
            }}
          />

          {/* Examples */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-300">Examples</h3>
            {problem.examples.map((ex, i) => (
              <div key={i} className="rounded-xl border border-white/8 bg-zinc-900/60 p-4 space-y-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Input</span>
                  <pre className="mt-1 font-mono text-xs text-zinc-300 whitespace-pre-wrap">{ex.input}</pre>
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Output</span>
                  <pre className="mt-1 font-mono text-xs text-emerald-400 whitespace-pre-wrap">{ex.output}</pre>
                </div>
                {ex.explanation && (
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Explanation</span>
                    <p className="mt-1 text-xs text-zinc-400">{ex.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-zinc-300">Constraints</h3>
            <ul className="space-y-1">
              {problem.constraints.map((c, i) => (
                <li key={i} className="flex gap-2 text-xs text-zinc-400">
                  <span className="text-zinc-700">•</span>
                  <span dangerouslySetInnerHTML={{ __html: c }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Hints */}
          {problem.hints.length > 0 && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5">
              <button
                type="button"
                onClick={() => setShowHints((h) => !h)}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
              >
                <Lightbulb className="h-4 w-4" />
                <span>Hints ({problem.hints.length})</span>
                {showHints ? (
                  <ChevronUp className="ml-auto h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-auto h-4 w-4" />
                )}
              </button>
              {showHints && (
                <div className="border-t border-amber-500/10 px-4 pb-3 pt-2 space-y-2">
                  {problem.hints.map((hint, i) => (
                    <p key={i} className="text-xs text-amber-200/70">
                      <span className="font-semibold text-amber-400">#{i + 1}</span> {hint}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CTA to editor */}
          <button
            type="button"
            onClick={() => setTab("editor")}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold",
              "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20",
              "hover:from-violet-500 hover:to-indigo-500 transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
            )}
          >
            <Play className="h-4 w-4" />
            Start Coding
          </button>
        </div>
      )}

      {/* ── Editor tab ───────────────────────────────────────────── */}
      {tab === "editor" && (
        <div className="flex min-h-0 flex-1 flex-col bg-[#0d0d0d]">
          {/* Editor toolbar */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/6 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-amber-500/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            </div>
            <span className="font-mono text-[11px] text-zinc-500">
              {problem.id}.{language.fileExt}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopy}
                title="Copy code"
                aria-label="Copy code"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-white/8 hover:text-zinc-300 transition-colors"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="Reset to starter"
                aria-label="Reset code"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-white/8 hover:text-zinc-300 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Monaco */}
          <div className="min-h-0 flex-1">
            <MonacoEditor
              key={`${problem.id}-${language.id}`}
              defaultValue={initialCode}
              language={language.monacoId}
              theme="vs-dark"
              options={{
                fontSize: 13.5,
                fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
                fontLigatures: true,
                lineNumbers: "on",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 2,
                renderLineHighlight: "all",
                padding: { top: 16, bottom: 16 },
                smoothScrolling: true,
                cursorBlinking: "smooth",
                automaticLayout: true,
              }}
              onMount={handleEditorMount}
              onChange={(v) => setCode(v ?? "")}
              loading={
                <div className="flex h-full items-center justify-center bg-[#0d0d0d]">
                  <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
                </div>
              }
            />
          </div>

          {/* Output panel */}
          {showOutput && (
            <div className="shrink-0 border-t border-white/6 max-h-48">
              <div className="flex items-center justify-between bg-zinc-900/60 px-4 py-2">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-[11px] font-medium text-zinc-400">Output</span>
                  {status === "success" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  )}
                  {status === "error" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowOutput(false)}
                  aria-label="Close output"
                  className="text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <pre
                className={cn(
                  "overflow-auto px-4 py-3 font-mono text-xs leading-relaxed",
                  "max-h-32",
                  status === "error" ? "text-red-400" : "text-emerald-300",
                )}
              >
                {output || " "}
              </pre>
            </div>
          )}

          {/* Run button */}
          <div className="shrink-0 border-t border-white/6 p-3">
            <button
              type="button"
              onClick={handleRun}
              disabled={status === "running"}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold",
                "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20",
                "hover:from-violet-500 hover:to-indigo-500 transition-all duration-200",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
              )}
            >
              {status === "running" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {status === "running" ? "Running…" : "Run Code"}
              <span className="ml-auto hidden text-[10px] font-normal text-white/40 sm:block">
                ⌘ Enter
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
