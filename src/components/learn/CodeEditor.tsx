"use client";

import Editor from "@monaco-editor/react";
import {
  Check,
  Copy,
  Loader2,
  Play,
  RotateCcw,
  Terminal,
  X,
} from "lucide-react";
import type { editor } from "monaco-editor";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
  initialCode: string;
  language?: string;
  filename?: string;
  readOnly?: boolean;
  className?: string;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => Promise<{ output: string; error: string | null }>;
}

// Map lesson language to Monaco language ID
function getMonacoLanguage(language: string): string {
  const map: Record<string, string> = {
    javascript: "javascript",
    typescript: "typescript",
    tsx: "typescript", // Monaco doesn't have TSX, use TypeScript
    python: "python",
    java: "java",
    cpp: "cpp",
    csharp: "csharp",
    rust: "rust",
    go: "go",
    ruby: "ruby",
    php: "php",
    swift: "swift",
    kotlin: "kotlin",
    sql: "sql",
    html: "html",
    css: "css",
    json: "json",
    markdown: "markdown",
    shell: "shell",
    bash: "shell",
  };
  return map[language?.toLowerCase()] ?? "javascript";
}

type RunStatus = "idle" | "running" | "success" | "error";

interface LogBuffer {
  logs: string[];
  restore: () => void;
}

function createLogBuffer(): LogBuffer {
  const logs: string[] = [];
  const origLog = console.log;
  const origError = console.error;
  const origWarn = console.warn;

  console.log = (...args) => {
    logs.push(args.map(String).join(" "));
  };
  console.error = (...args) => {
    logs.push(`[error] ${args.map(String).join(" ")}`);
  };
  console.warn = (...args) => {
    logs.push(`[warn]  ${args.map(String).join(" ")}`);
  };

  return {
    logs,
    restore: () => {
      console.log = origLog;
      console.error = origError;
      console.warn = origWarn;
    },
  };
}

function stripTypeScript(code: string): string {
  return code
    .replace(/:\s*\w[\w<>[\], |&?]*(?=\s*[=,);{])/g, "")
    .replace(/:\s*\w[\w<>[\], |&?]*\s*\{/g, " {")
    .replace(/<[A-Z]\w*>/g, "")
    .replace(/^import\s+.*$/gm, "")
    .replace(/^export\s+/gm, "");
}

function runCodeSafely(code: string): { output: string; error: string | null } {
  const buffer = createLogBuffer();

  try {
    const js = stripTypeScript(code);
    const safeCode = `
      "use strict";
      (function() {
        try {
          ${js}
        } catch (e) {
          throw e;
        }
      })();
    `;

    // biome-ignore lint/security/noGlobalEval: intentional sandbox for educational purposes
    eval(safeCode);

    const output =
      buffer.logs.length > 0 ? buffer.logs.join("\n") : "(no output)";
    return { output, error: null };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    const output = buffer.logs.length > 0 ? `${buffer.logs.join("\n")}\n` : "";
    return { output, error: errorMessage };
  } finally {
    buffer.restore();
  }
}

const DEFAULT_EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  fontSize: 14,
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
  suggestOnTriggerCharacters: true,
  quickSuggestions: true,
  formatOnPaste: true,
  formatOnType: true,
  autoIndent: "full",
  folding: true,
  foldingStrategy: "indentation",
  matchBrackets: "always",
  autoClosingBrackets: "always",
  autoClosingQuotes: "always",
  renderWhitespace: "selection",
  rulers: [],
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  overviewRulerLanes: 0,
  scrollbar: {
    vertical: "auto",
    horizontal: "auto",
    useShadows: false,
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
  },
};

const MONACO_THEME = "custom-dark";

export function CodeEditor({
  initialCode,
  language = "typescript",
  filename = "exercise.ts",
  readOnly = false,
  className,
  onCodeChange,
  onRun,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<RunStatus>("idle");
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const handleRunCode = useCallback(async () => {
    const currentCode = editorRef.current?.getValue() ?? code;
    setStatus("running");
    setShowOutput(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      let result: { output: string; error: string | null };

      if (onRun) {
        result = await onRun(currentCode);
      } else {
        result = runCodeSafely(currentCode);
      }

      if (result.error) {
        setOutput(
          `${result.output ? `${result.output}\n` : ""}❌ ${result.error}`,
        );
        setStatus("error");
      } else {
        setOutput(result.output || "(no output)");
        setStatus("success");
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      setOutput(`❌ Unexpected error: ${errorMessage}`);
      setStatus("error");
    }
  }, [code, onRun]);

  const handleEditorWillMount = useCallback((monaco: any) => {
    try {
      monaco.editor.defineTheme(MONACO_THEME, {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "6a9955" },
          { token: "string", foreground: "ce9178" },
          { token: "number", foreground: "b5cea8" },
          { token: "keyword", foreground: "569cd6" },
          { token: "type", foreground: "4ec9b0" },
          { token: "class", foreground: "4ec9b0" },
          { token: "function", foreground: "dcdcaa" },
          { token: "variable", foreground: "9cdcfe" },
          { token: "operator", foreground: "d4d4d4" },
          { token: "delimiter", foreground: "d4d4d4" },
        ],
        colors: {
          "editor.background": "#0d0d0d",
          "editor.foreground": "#d4d4d4",
          "editor.lineHighlightBackground": "#1a1a1a",
          "editorCursor.foreground": "#ffffff",
          "editor.selectionBackground": "#264f78",
          "editor.inactiveSelectionBackground": "#1a2f3d",
          "editorLineNumber.foreground": "#4d4d4d",
          "editorLineNumber.activeForeground": "#cccccc",
          "editorIndentGuide.background": "#2a2a2a",
          "editorIndentGuide.activeBackground": "#404040",
          "editorHoverWidget.background": "#1a1a1a",
          "editorHoverWidget.border": "#333333",
          "editorSuggestWidget.background": "#1a1a1a",
          "editorSuggestWidget.border": "#333333",
          "editorSuggestWidget.selectedBackground": "#2a2a2a",
          "input.background": "#1a1a1a",
          "input.border": "#333333",
        },
      });
      setThemeLoaded(true);
    } catch (error) {
      console.warn("Monaco theme configuration warning:", error);
      setThemeLoaded(true);
    }
  }, []);

  const handleEditorMount = useCallback(
    (ed: editor.IStandaloneCodeEditor) => {
      try {
        editorRef.current = ed;
        setEditorError(null);
        setIsLoading(false);

        ed.addCommand(2048 | 3, () => {
          handleRunCode();
        });

        ed.addCommand(2048 | 83, () => {
          ed.trigger("keyboard", "editor.action.formatDocument", undefined);
        });

        const model = ed.getModel();
        if (model) {
          model.onDidChangeContent(() => {
            const value = ed.getValue();
            setCode(value);
            onCodeChange?.(value);
          });
        }
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Unknown editor error";
        setEditorError(errorMsg);
        setIsLoading(false);
        console.error("Monaco editor mount error:", error);
      }
    },
    [handleRunCode, onCodeChange],
  );

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      const newValue = value ?? "";
      setCode(newValue);
      onCodeChange?.(newValue);
    },
    [onCodeChange],
  );

  const handleReset = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.setValue(initialCode);
    }
    setCode(initialCode);
    setOutput("");
    setStatus("idle");
    setShowOutput(false);
  }, [initialCode]);

  const handleCopy = useCallback(async () => {
    const codeToCopy = editorRef.current?.getValue() ?? code;
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  }, [code]);

  const handleCloseOutput = useCallback(() => {
    setShowOutput(false);
  }, []);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    if (editorRef.current && code !== editorRef.current.getValue()) {
      editorRef.current.setValue(code);
    }
  }, [code]);

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-emerald-400";
      case "error":
        return "text-red-400";
      case "running":
        return "text-amber-400";
      default:
        return "text-zinc-400";
    }
  };

  const getStatusDot = () => {
    switch (status) {
      case "success":
        return "bg-emerald-500";
      case "error":
        return "bg-red-500";
      case "running":
        return "bg-amber-500 animate-pulse";
      default:
        return "bg-zinc-500";
    }
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] rounded-lg overflow-hidden",
        className,
      )}
    >
      {editorError ? (
        <div className="flex h-full items-center justify-center bg-zinc-900 p-6">
          <div className="text-center max-w-md">
            <div className="mb-4 text-red-400 text-sm font-medium">
              ⚠️ Editor failed to load
            </div>
            <div className="text-xs text-zinc-500 mb-4 break-all">
              {editorError}
            </div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-xs bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors font-medium"
            >
              Reload Page
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-zinc-900/50 backdrop-blur-sm px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-pointer" />
            </div>

            <span className="font-mono text-[11px] text-zinc-400 font-medium">
              {filename}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-white/10 hover:text-zinc-300 active:scale-95"
                title="Copy code"
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
                onClick={handleReset}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-all hover:bg-white/10 hover:text-zinc-300 active:scale-95"
                title="Reset code"
                aria-label="Reset code"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 relative">
            {isLoading ? (
              <div className="flex h-full items-center justify-center bg-[#0d0d0d]">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
                  <p className="text-xs text-zinc-500 font-medium">
                    Loading editor…
                  </p>
                </div>
              </div>
            ) : (
              <Editor
                defaultValue={initialCode}
                language={getMonacoLanguage(language ?? "javascript")}
                theme={MONACO_THEME}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorMount}
                onChange={handleEditorChange}
                options={{
                  ...DEFAULT_EDITOR_OPTIONS,
                  readOnly,
                }}
              />
            )}
          </div>

          {showOutput && (
            <div className="shrink-0 border-t border-white/10 bg-zinc-900/80 backdrop-blur-sm">
              <div className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <Terminal className={cn("h-4 w-4", getStatusColor())} />
                  <span className="text-xs font-semibold text-zinc-300">
                    Console Output
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn("h-2 w-2 rounded-full", getStatusDot())}
                    />
                    <span
                      className={cn(
                        "text-[10px] font-medium",
                        getStatusColor(),
                      )}
                    >
                      {status === "running"
                        ? "Running"
                        : status === "success"
                          ? "Success"
                          : status === "error"
                            ? "Error"
                            : "Ready"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCloseOutput}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 hover:bg-white/10 hover:text-zinc-300 transition-all active:scale-95"
                  aria-label="Close output"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <pre
                className={cn(
                  "max-h-40 overflow-auto px-4 py-3 font-mono text-xs leading-relaxed bg-black/30 whitespace-pre-wrap break-words",
                  status === "error" ? "text-red-300" : "text-emerald-300",
                )}
              >
                {output || " "}
              </pre>
            </div>
          )}

          <div className="shrink-0 border-t border-white/10 p-3 bg-zinc-900/30 backdrop-blur-sm">
            <button
              type="button"
              onClick={handleRunCode}
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
              <span className="ml-auto text-[10px] font-normal text-white/50 hidden sm:block bg-white/5 px-2 py-1 rounded">
                ⌘ Enter
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
