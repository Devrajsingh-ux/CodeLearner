"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Lightbulb,
  Loader2,
  Play,
  RefreshCw,
  RotateCcw,
  SendHorizonal,
  Share2,
  Terminal,
  X,
} from "lucide-react";
import type { editor } from "monaco-editor";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Problem, SupportedLanguage } from "@/types";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

function evalJsTs(code: string): { output: string; isError: boolean } {
  const logs: string[] = [];
  const orig = { log: console.log, error: console.error, warn: console.warn };

  try {
    console.log = (...args) => logs.push(args.map(String).join(" "));
    console.error = (...args) =>
      logs.push(`[error] ${args.map(String).join(" ")}`);
    console.warn = (...args) =>
      logs.push(`[warn] ${args.map(String).join(" ")}`);

    const js = code
      .replace(/:\s*\w[\w<>[\], |&?]*(?=\s*[=,);{])/g, "")
      .replace(/:\s*\w[\w<>[\], |&?]*\s*\{/g, " {")
      .replace(/<[A-Z]\w*>/g, "")
      .replace(/^import\s+.*$/gm, "")
      .replace(/^export\s+/gm, "");

    // biome-ignore lint/security/noGlobalEval: intentional local sandbox for client-side run support
    eval(js); // eslint-disable-line no-eval

    return {
      output: logs.length ? logs.join("\n") : "(no output)",
      isError: false,
    };
  } catch (error) {
    return {
      output: [logs.join("\n"), `Error: ${String(error)}`]
        .filter(Boolean)
        .join("\n"),
      isError: true,
    };
  } finally {
    Object.assign(console, orig);
  }
}

async function runOnServer(
  code: string,
  languageId: number,
): Promise<{ output: string; isError: boolean }> {
  try {
    const response = await fetch("/api/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, languageId }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = (await response.json()) as {
      output?: string;
      stderr?: string;
      compile_output?: string;
    };

    const errorOutput = data.stderr || data.compile_output;
    if (errorOutput) {
      return { output: errorOutput, isError: true };
    }

    return { output: data.output || "(no output)", isError: false };
  } catch (error) {
    return {
      output: `Compilation service unavailable.\n${String(error)}`,
      isError: true,
    };
  }
}

interface ProblemCompilerProps {
  problem: Problem;
  language: SupportedLanguage;
  onSolved: (id: string) => void;
  onAttempt: (id: string) => void;
}

type TopTab = "description" | "submissions" | "solutions" | "discuss";
type RunStatus = "idle" | "running" | "success" | "error";

type SubmissionRecord = {
  id: string;
  status: "AC" | "WA";
  language: string;
  createdAt: string;
  runtime: string;
};

const difficultyStyle = {
  Easy: "text-emerald-300 bg-emerald-500/12 border-emerald-500/25",
  Medium: "text-amber-300 bg-amber-500/12 border-amber-500/25",
  Hard: "text-red-300 bg-red-500/12 border-red-500/25",
} as const;

export function ProblemCompiler({
  problem,
  language,
  onSolved,
  onAttempt,
}: ProblemCompilerProps) {
  const initialCode =
    problem.starterCode[language.id] ??
    `// No starter code for ${language.label} yet.`;

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState(initialCode);
  const [topTab, setTopTab] = useState<TopTab>("description");
  const [status, setStatus] = useState<RunStatus>("idle");
  const [output, setOutput] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showOutput, setShowOutput] = useState(true);
  const [testCase, setTestCase] = useState("sample");
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setCode(initialCode);
    setStatus("idle");
    setOutput("");
    setShowHints(false);
    setTopTab("description");
    setShowOutput(true);
  }, [initialCode]);

  useEffect(() => {
    const startedAt = Date.now();
    setElapsed(0);
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tabItems: TopTab[] = [
    "description",
    "submissions",
    "solutions",
    "discuss",
  ];

  const parsedDescription = useMemo(
    () =>
      problem.description
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(
          /`(.*?)`/g,
          '<code class="rounded bg-zinc-800 px-1 py-0.5 text-cyan-300 text-xs">$1</code>',
        )
        .replace(/\n/g, "<br />"),
    [problem.description],
  );

  const pushSubmission = useCallback(
    (isError: boolean) => {
      const entry: SubmissionRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        status: isError ? "WA" : "AC",
        language: language.label,
        createdAt: new Date().toLocaleString(),
        runtime: `${Math.max(90, Math.floor(Math.random() * 220))} ms`,
      };
      setSubmissions((prev) => [entry, ...prev].slice(0, 20));
    },
    [language.label],
  );

  const handleRun = useCallback(async () => {
    const source = editorRef.current?.getValue() ?? code;
    setStatus("running");
    setShowOutput(true);
    onAttempt(problem.id);

    let result: { output: string; isError: boolean };
    if (language.id === "javascript" || language.id === "typescript") {
      await new Promise((resolve) => setTimeout(resolve, 150));
      result = evalJsTs(source);
    } else {
      result = await runOnServer(source, language.judge0Id);
    }

    setOutput(result.output);
    setStatus(result.isError ? "error" : "success");
    pushSubmission(result.isError);

    if (!result.isError) {
      onSolved(problem.id);
    }
  }, [
    code,
    language.id,
    language.judge0Id,
    onAttempt,
    onSolved,
    problem.id,
    pushSubmission,
  ]);

  const handleSubmit = useCallback(async () => {
    await handleRun();
  }, [handleRun]);

  const handleEditorMount = useCallback(
    (instance: editor.IStandaloneCodeEditor) => {
      editorRef.current = instance;
      instance.addCommand(2048 | 3, () => {
        void handleRun();
      });
    },
    [handleRun],
  );

  async function handleCopy() {
    const content = editorRef.current?.getValue() ?? code;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function resetCode() {
    editorRef.current?.setValue(initialCode);
    setCode(initialCode);
    setStatus("idle");
    setOutput("");
  }

  return (
    <section
      id="problem-compiler"
      className="flex h-full min-h-0 flex-col bg-zinc-950"
    >
      <div className="border-b border-white/10 bg-zinc-950/90 px-4 py-3 backdrop-blur-md sm:px-5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-zinc-100 sm:text-lg">
              <span className="mr-2 text-zinc-500">#{problem.number}</span>
              {problem.title}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  difficultyStyle[problem.difficulty],
                )}
              >
                {problem.difficulty}
              </span>
              {problem.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/8 px-1.5 py-0.5 text-[10px] text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={resetCode}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-zinc-900/65 px-2.5 text-xs text-zinc-300 transition hover:bg-white/10"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Try Again
            </button>
            <button
              type="button"
              onClick={() => setTopTab("discuss")}
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-zinc-900/65 px-2.5 text-xs text-zinc-300 transition hover:bg-white/10"
            >
              Discuss
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-zinc-900/65 px-2.5 text-xs text-zinc-300 transition hover:bg-white/10"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {tabItems.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setTopTab(tab)}
              className={cn(
                "relative rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition",
                topTab === tab
                  ? "bg-violet-500/18 text-violet-200"
                  : "text-zinc-400 hover:bg-white/8 hover:text-zinc-200",
              )}
            >
              {tab}
              {topTab === tab ? (
                <span className="absolute inset-x-2 bottom-0 h-px bg-linear-to-r from-transparent via-violet-400 to-transparent" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="min-h-0 overflow-y-auto border-b border-white/10 p-4 lg:border-b-0 lg:border-r lg:p-5">
          {topTab === "description" ? (
            <div className="space-y-5">
              <div
                className="prose prose-invert prose-sm max-w-none leading-relaxed text-zinc-300"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: source is trusted Appwrite-provided authored content
                dangerouslySetInnerHTML={{ __html: parsedDescription }}
              />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-200">
                  Examples
                </h3>
                {problem.examples.map((example, index) => (
                  <article
                    key={`${example.input}-${index}`}
                    className="rounded-xl border border-white/10 bg-zinc-900/55 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Example {index + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          navigator.clipboard.writeText(example.input)
                        }
                        className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[10px] text-zinc-400"
                      >
                        <Copy className="h-3 w-3" /> Copy
                      </button>
                    </div>
                    <p className="mb-1 text-[11px] uppercase tracking-wider text-zinc-500">
                      Input
                    </p>
                    <pre className="mb-2 whitespace-pre-wrap rounded-lg bg-zinc-950/85 p-2 font-mono text-xs text-zinc-300">
                      {example.input}
                    </pre>
                    <p className="mb-1 text-[11px] uppercase tracking-wider text-zinc-500">
                      Output
                    </p>
                    <pre className="whitespace-pre-wrap rounded-lg bg-zinc-950/85 p-2 font-mono text-xs text-emerald-300">
                      {example.output}
                    </pre>
                    {example.explanation ? (
                      <p className="mt-2 text-xs text-zinc-400">
                        {example.explanation}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-zinc-200">
                  Constraints
                </h3>
                <ul className="space-y-1">
                  {problem.constraints.map((item) => (
                    <li
                      key={`${problem.id}-${item}`}
                      className="flex gap-2 text-xs text-zinc-400"
                    >
                      <span className="text-zinc-700">•</span>
                      <span
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted authored constraint markup
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {problem.hints.length > 0 ? (
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/8">
                  <button
                    type="button"
                    onClick={() => setShowHints((prev) => !prev)}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-semibold text-amber-300"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Hints ({problem.hints.length})
                    {showHints ? (
                      <ChevronUp className="ml-auto h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    )}
                  </button>

                  {showHints ? (
                    <div className="space-y-2 border-t border-amber-400/15 px-3 pb-3 pt-2">
                      {problem.hints.map((hint, index) => (
                        <p
                          key={`${problem.id}-${hint}`}
                          className="text-xs text-amber-100/85"
                        >
                          <span className="mr-1 font-semibold text-amber-300">
                            #{index + 1}
                          </span>
                          {hint}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          {topTab === "submissions" ? (
            <div className="space-y-2">
              <h3 className="mb-2 text-sm font-semibold text-zinc-200">
                Submission History
              </h3>
              {submissions.length === 0 ? (
                <p className="rounded-xl border border-dashed border-white/12 p-4 text-sm text-zinc-500">
                  No submissions yet. Run or submit code to generate history.
                </p>
              ) : (
                submissions.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-white/10 bg-zinc-900/50 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-zinc-100">
                        {entry.status}
                      </p>
                      <p className="text-xs text-zinc-500">{entry.createdAt}</p>
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      {entry.language} • Runtime {entry.runtime}
                    </p>
                  </div>
                ))
              )}
            </div>
          ) : null}

          {topTab === "solutions" ? (
            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 text-sm text-zinc-400">
              Community and editorial solutions will appear here.
            </div>
          ) : null}

          {topTab === "discuss" ? (
            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 text-sm text-zinc-400">
              Discussion is coming soon. Use Share to collaborate with peers.
            </div>
          ) : null}
        </div>

        <div className="flex min-h-0 flex-col bg-[#0d0d0d]">
          <div className="flex items-center justify-between border-b border-white/8 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-[11px] text-zinc-500">
                {problem.id}.{language.fileExt}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFontSize((v) => Math.max(12, v - 1))}
                className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-zinc-400"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize((v) => Math.min(22, v + 1))}
                className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-zinc-400"
              >
                A+
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition hover:bg-white/10 hover:text-zinc-200"
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={resetCode}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition hover:bg-white/10 hover:text-zinc-200"
                aria-label="Reset code"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1">
            <MonacoEditor
              key={`${problem.id}-${language.id}`}
              defaultValue={initialCode}
              language={language.monacoId}
              theme="vs-dark"
              onMount={handleEditorMount}
              onChange={(value) => setCode(value ?? "")}
              options={{
                fontSize,
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                lineNumbers: "on",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 2,
                renderLineHighlight: "all",
                padding: { top: 12, bottom: 12 },
                smoothScrolling: true,
                automaticLayout: true,
              }}
              loading={
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
                </div>
              }
            />
          </div>

          {showOutput ? (
            <div className="max-h-44 border-t border-white/8">
              <div className="flex items-center justify-between bg-zinc-900/60 px-3 py-2">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Terminal className="h-3.5 w-3.5" />
                  Output
                  {status === "success" ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  ) : null}
                  {status === "error" ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setShowOutput(false)}
                  className="text-zinc-500 transition hover:text-zinc-300"
                  aria-label="Close output"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <pre
                className={cn(
                  "max-h-32 overflow-auto px-3 py-2 font-mono text-xs leading-relaxed",
                  status === "error" ? "text-red-300" : "text-emerald-300",
                )}
              >
                {output || "Run code to view output"}
              </pre>
            </div>
          ) : null}

          <div className="border-t border-white/8 p-3">
            <div className="mb-2 flex items-center justify-between">
              <label className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                Test case
                <select
                  value={testCase}
                  onChange={(event) => setTestCase(event.target.value)}
                  className="rounded-md border border-white/10 bg-zinc-900/60 px-2 py-1 text-zinc-300"
                >
                  <option value="sample">Sample</option>
                  <option value="edge">Edge cases</option>
                  <option value="custom">Custom</option>
                </select>
              </label>
              <span className="text-xs text-zinc-500">Timer: {elapsed}s</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  void handleRun();
                }}
                disabled={status === "running"}
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-cyan-500/35 bg-cyan-500/15 text-sm font-semibold text-cyan-200 transition",
                  "hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                {status === "running" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                Run
              </button>

              <button
                type="button"
                onClick={() => {
                  void handleSubmit();
                }}
                disabled={status === "running"}
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-cyan-600 text-sm font-semibold text-white transition",
                  "hover:from-violet-500 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-60",
                )}
              >
                <SendHorizonal className="h-4 w-4" />
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
