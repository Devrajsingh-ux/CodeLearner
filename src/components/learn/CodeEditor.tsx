"use client";

import Editor from "@monaco-editor/react";
import { Check, Copy, Loader2, Play, RotateCcw, Terminal, X } from "lucide-react";
import type { editor } from "monaco-editor";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  initialCode: string;
  language?: string;
  filename?: string;
  readOnly?: boolean;
  className?: string;
}

type RunStatus = "idle" | "running" | "success" | "error";

// ── Very light client-side eval sandbox ──────────────────────────────────────
// For production: replace this with a secure server-side sandbox (e.g. Firecracker VM / Cloudflare Durable Object).
function runCode(code: string): { output: string; error: string | null } {
  const logs: string[] = [];
  const origLog = console.log;
  const origError = console.error;
  const origWarn = console.warn;

  try {
    // Redirect console
    console.log = (...a) => logs.push(a.map(String).join(" "));
    console.error = (...a) => logs.push(`[error] ${a.map(String).join(" ")}`);
    console.warn = (...a) => logs.push(`[warn]  ${a.map(String).join(" ")}`);

    // Strip TypeScript type annotations with a naive regex so eval works
    const js = code
      .replace(/:\s*\w[\w<>[\], |&?]*(?=\s*[=,);{])/g, "") // param types
      .replace(/:\s*\w[\w<>[\], |&?]*\s*\{/g, " {") // return types
      .replace(/<[A-Z]\w*>/g, "") // generics
      .replace(/^import\s+.*$/gm, "") // imports
      .replace(/^export\s+/gm, ""); // exports

    // eslint-disable-next-line no-eval
    // biome-ignore lint/security/noGlobalEval: intentional editor sandbox
    eval(js);

    const output = logs.length > 0 ? logs.join("\n") : "(no output)";
    return { output, error: null };
  } catch (e) {
    return { output: logs.join("\n"), error: String(e) };
  } finally {
    console.log = origLog;
    console.error = origError;
    console.warn = origWarn;
  }
}

export function CodeEditor({
  initialCode,
  language = "typescript",
  filename = "exercise.ts",
  readOnly = false,
  className,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<RunStatus>("idle");
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  function handleEditorMount(ed: editor.IStandaloneCodeEditor) {
    try {
      editorRef.current = ed;
      // Ctrl/Cmd + Enter to run
      ed.addCommand(
        // Monaco KeyMod / KeyCode loaded lazily
        // 2048 = CtrlCmd, 3 = Enter in Monaco key codes
        2048 | 3, // eslint-disable-line no-bitwise
        () => handleRun(),
      );
    } catch (error) {
      console.error("Monaco initialization error:", error);
    }
  }

  const handleRun = useCallback(() => {
    const currentCode = editorRef.current?.getValue() ?? code;
    setStatus("running");
    setShowOutput(true);

    // Simulate a micro-delay so the spinner renders
    setTimeout(() => {
      const result = runCode(currentCode);
      if (result.error) {
        setOutput(
          `${result.output ? `${result.output}\n` : ""}❌ ${result.error}`,
        );
        setStatus("error");
      } else {
        setOutput(result.output);
        setStatus("success");
      }
    }, 120);
  }, [code]);

  function handleReset() {
    editorRef.current?.setValue(initialCode);
    setCode(initialCode);
    setOutput("");
    setStatus("idle");
  }

  async function handleCopy() {
    const val = editorRef.current?.getValue() ?? code;
    await navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className={cn("flex h-full flex-col bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a]", className)}>
      {/* ── Title bar ────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-zinc-900/50 backdrop-blur-sm px-4 py-3">
        {/* macOS-style traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer" />
        </div>

        <span className="font-mono text-[11px] text-zinc-400 font-medium">{filename}</span>

        <div className="flex items-center gap-1.5">
          {/* Copy */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-white/10 hover:text-zinc-300"
            title="Copy code"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-white/10 hover:text-zinc-300"
            title="Reset code"
            aria-label="Reset code"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Monaco editor ─────────────────────────────────────────── */}
      <div className="min-h-0 flex-1">
        <Editor
          defaultValue={initialCode}
          language={language}
          theme="vs-dark"
          options={{
            fontSize: 13.5,
            fontFamily:
              '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
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
            readOnly,
            automaticLayout: true,
          }}
          onMount={handleEditorMount}
          onChange={(v) => setCode(v ?? "")}
          onValidate={() => {}}
          loading={
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
            </div>
          }
        />
      </div>

      {/* ── Output panel ──────────────────────────────────────────── */}
      {showOutput && (
        <div className="shrink-0 border-t border-white/10">
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <Terminal className="h-4 w-4 text-zinc-400" />
              <span className="text-xs font-semibold text-zinc-300">
                Console Output
              </span>
              {status === "success" && (
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-medium">Success</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] text-red-400 font-medium">Error</span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowOutput(false)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 hover:bg-white/10 hover:text-zinc-300 transition-all"
              aria-label="Close output"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <pre
            className={cn(
              "max-h-40 overflow-auto px-4 py-3 font-mono text-xs leading-relaxed bg-black/30",
              status === "error" ? "text-red-300" : "text-emerald-300",
            )}
          >
            {output || " "}
          </pre>
        </div>
      )}

      {/* ── Run button ────────────────────────────────────────────── */}
      <div className="shrink-0 border-t border-white/10 p-3 bg-zinc-900/30 backdrop-blur-sm">
        <button
          type="button"
          onClick={handleRun}
          disabled={status === "running"}
          className={cn(
            "flex w-full items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-bold transition-all duration-200",
            "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white",
            "hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500",
            "shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50",
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
            "active:scale-[0.98]",
          )}
        >
          {status === "running" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4 fill-current" />
          )}
          {status === "running" ? "Running Code..." : "Run Code"}
          <span className="ml-auto text-[10px] font-normal text-white/50 hidden sm:block">
            ⌘ Enter
          </span>
        </button>
      </div>
    </div>
  );
}
