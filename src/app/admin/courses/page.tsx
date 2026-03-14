"use client";

import {
  Archive,
  Check,
  EyeOff,
  FileUp,
  Globe,
  Loader2,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  type AdminCourse,
  type CourseStatus,
} from "@/data/admin";
import { WordImportDialog } from "@/components/admin/WordImportDialog";
import { AICourseGeneratorDialog } from "@/components/admin/AICourseGeneratorDialog";
import { cn, formatNumber } from "@/lib/utils";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: CourseStatus }) {
  const map: Record<CourseStatus, string> = {
    published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    draft: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    archived: "bg-zinc-700 text-zinc-400 border-zinc-600",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

function DiffBadge({
  diff,
}: {
  diff: "Beginner" | "Intermediate" | "Advanced";
}) {
  const map = {
    Beginner: "bg-emerald-500/10 text-emerald-400",
    Intermediate: "bg-sky-500/10 text-sky-400",
    Advanced: "bg-amber-500/10 text-amber-400",
  };
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
        map[diff],
      )}
    >
      {diff}
    </span>
  );
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-zinc-400">{label}</label>
      {children}
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/8 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-violet-500 transition-colors";

const CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Data & AI",
  "DevOps & Cloud",
  "Mobile",
  "Systems",
  "Game Dev",
  "Web3 & Security",
  "Other",
];

type CourseForm = {
  title: string;
  slug: string;
  description: string;
  tags: string;         // comma-separated
  category: string;
  customCategory: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  duration: string;
  status: CourseStatus;
  isFeatured: boolean;
  isNew: boolean;
};

const BLANK_FORM: CourseForm = {
  title: "",
  slug: "",
  description: "",
  tags: "",
  category: "Languages",
  customCategory: "",
  difficulty: "Beginner",
  instructor: "",
  duration: "",
  status: "draft",
  isFeatured: false,
  isNew: false,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Add Course Modal ─────────────────────────────────────────────────────────

function AddCourseModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (c: AdminCourse) => void;
}) {
  const [form, setFormState] = useState<CourseForm>(BLANK_FORM);
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CourseForm, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  function set<K extends keyof CourseForm>(key: K, val: CourseForm[K]) {
    setFormState((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  // Auto-derive slug from title unless manually edited
  useEffect(() => {
    if (!slugTouched) set("slug", slugify(form.title));
  }, [form.title, slugTouched]); // eslint-disable-line react-hooks/exhaustive-deps

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.slug.trim()) e.slug = "Slug is required.";
    else if (!/^[a-z0-9-]+$/.test(form.slug))
      e.slug = "Only lowercase letters, numbers, and hyphens.";
    if (!form.instructor.trim()) e.instructor = "Instructor name is required.";
    if (!form.duration.trim()) e.duration = "Duration is required (e.g. 24h).";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSaving(true);
    setServerError("");
    try {
      const category =
        form.category === "Other" && form.customCategory.trim()
          ? form.customCategory.trim()
          : form.category;
      const body = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean).join(","),
        category,
        difficulty: form.difficulty,
        instructor: form.instructor.trim(),
        duration: form.duration.trim(),
        status: form.status,
        isFeatured: form.isFeatured,
        isNew: form.isNew,
        lessonsCount: 0,
        enrolledCount: 0,
        completionRate: 0,
        rating: 0,
      };
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      onCreated(json.course);
    } catch (err: any) {
      setServerError(err.message ?? "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
          <h3 className="text-base font-semibold text-white">Add New Course</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 hover:bg-white/8 hover:text-zinc-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4">
            {serverError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {serverError}
              </div>
            )}

            {/* Title */}
            <Field label="Title *" error={errors.title}>
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. JavaScript Mastery"
                className={cn(inputCls, errors.title && "border-red-500")}
              />
            </Field>

            {/* Slug */}
            <Field label="Slug *" error={errors.slug}>
              <input
                value={form.slug}
                onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }}
                onBlur={() => set("slug", slugify(form.slug))}
                placeholder="e.g. javascript-mastery"
                className={cn(inputCls, errors.slug && "border-red-500")}
              />
              <p className="text-[11px] text-zinc-600">
                URL: /learn/<span className="text-zinc-400">{form.slug || "\u2026"}</span>
              </p>
            </Field>

            {/* Description */}
            <Field label="Description">
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                placeholder="Brief description shown on course cards and the catalog page\u2026"
                className={cn(inputCls, "resize-none")}
              />
            </Field>

            {/* Tags */}
            <Field label="Tags (comma-separated)">
              <input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="e.g. ES2024, Async, OOP, DOM"
                className={inputCls}
              />
              <p className="text-[11px] text-zinc-600">Displayed as badges on course cards.</p>
            </Field>

            {/* Category */}
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {form.category === "Other" && (
                <input
                  value={form.customCategory}
                  onChange={(e) => set("customCategory", e.target.value)}
                  placeholder="Enter custom category\u2026"
                  className={cn(inputCls, "mt-2")}
                />
              )}
            </Field>

            {/* Difficulty + Status row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Difficulty">
                <select
                  value={form.difficulty}
                  onChange={(e) => set("difficulty", e.target.value as CourseForm["difficulty"])}
                  className={inputCls}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </Field>
              <Field label="Initial Status">
                <select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value as CourseStatus)}
                  className={inputCls}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </Field>
            </div>

            {/* Instructor + Duration row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Instructor *" error={errors.instructor}>
                <input
                  value={form.instructor}
                  onChange={(e) => set("instructor", e.target.value)}
                  placeholder="e.g. Nina Volkov"
                  className={cn(inputCls, errors.instructor && "border-red-500")}
                />
              </Field>
              <Field label="Duration *" error={errors.duration}>
                <input
                  value={form.duration}
                  onChange={(e) => set("duration", e.target.value)}
                  placeholder="e.g. 24h"
                  className={cn(inputCls, errors.duration && "border-red-500")}
                />
              </Field>
            </div>

            {/* Toggles */}
            <div className="flex gap-4">
              {(
                [
                  { key: "isFeatured" as const, label: "Featured course", color: "text-amber-400" },
                  { key: "isNew" as const, label: "Show 'New' badge", color: "text-violet-400" },
                ]
              ).map(({ key, label, color }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => set(key, !form[key])}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                    form[key]
                      ? `border-white/15 bg-white/5 ${color}`
                      : "border-white/8 text-zinc-500 hover:border-white/15",
                  )}
                >
                  <div
                    className={cn(
                      "h-3.5 w-3.5 rounded-sm border transition-colors",
                      form[key] ? "border-current bg-current" : "border-zinc-600 bg-transparent",
                    )}
                  />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-white/8 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/8 bg-transparent px-4 py-2 text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-60 transition-colors"
            >
              {isSaving ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Creating\u2026</>
              ) : (
                <><Plus className="h-4 w-4" />Create Course</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────

function ConfirmDeleteModal({
  course,
  onClose,
  onConfirm,
}: {
  course: AdminCourse;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirm() {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
        <div className="px-6 py-5">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15">
            <Trash2 className="h-6 w-6 text-red-400" />
          </div>
          <h3 className="text-base font-semibold text-white">Delete Course</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-zinc-200">"{course.title}"</span>?
            This action cannot be undone.
          </p>
          {course.enrolledCount > 0 && (
            <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
              \u26a0 {formatNumber(course.enrolledCount)} users are enrolled in this course.
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-white/8 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/8 px-4 py-2 text-sm text-zinc-400 hover:border-white/20 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-60 transition-colors"
          >
            {isDeleting ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Deleting\u2026</>
            ) : (
              <><Trash2 className="h-4 w-4" />Delete</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [toast, setToast] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminCourse | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }

  async function loadCourses() {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/courses", { credentials: "same-origin" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCourses(data.courses ?? []);
    } catch (e: any) {
      setError(e.message ?? "Failed to load courses");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { loadCourses(); }, []);

  const categories = useMemo((): string[] => {
    return ["all", ...Array.from(new Set<string>(courses.map((c) => c.category).filter(Boolean)))];
  }, [courses]);

  const filtered = useMemo(() => {
    let list = [...courses];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
    }
    if (statusFilter !== "all") list = list.filter((c) => c.status === statusFilter);
    if (categoryFilter !== "all") list = list.filter((c) => c.category === categoryFilter);
    return list;
  }, [courses, search, statusFilter, categoryFilter]);

  async function toggleStatus(id: string, next: CourseStatus) {
    try {
      const res = await fetch("/api/admin/courses", {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      if (!res.ok) throw new Error(await res.text());
      setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, status: next } : c)));
      showToast(`Course status → ${next}`);
    } catch (e: any) { showToast(`Error: ${e.message}`); }
  }

  async function toggleFeatured(id: string) {
    const current = courses.find((c) => c.id === id)?.isFeatured ?? false;
    try {
      const res = await fetch("/api/admin/courses", {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isFeatured: !current }),
      });
      if (!res.ok) throw new Error(await res.text());
      setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, isFeatured: !c.isFeatured } : c)));
      showToast("Featured status updated.");
    } catch (e: any) { showToast(`Error: ${e.message}`); }
  }

  async function toggleNew(id: string) {
    const current = courses.find((c) => c.id === id)?.isNew ?? false;
    try {
      const res = await fetch("/api/admin/courses", {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isNew: !current }),
      });
      if (!res.ok) throw new Error(await res.text());
      setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, isNew: !c.isNew } : c)));
      showToast("'New' badge toggled.");
    } catch (e: any) { showToast(`Error: ${e.message}`); }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch("/api/admin/courses", {
        method: "DELETE",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      if (!res.ok) throw new Error(await res.text());
      setCourses((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      showToast(`"${deleteTarget.title}" deleted.`);
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    } finally {
      setDeleteTarget(null);
    }
  }

  function handleCourseCreated(course: AdminCourse) {
    setCourses((prev) => [course, ...prev]);
    setShowAddModal(false);
    showToast(`"${course.title}" created successfully!`);
  }

  const counts = {
    published: courses.filter((c) => c.status === "published").length,
    draft: courses.filter((c) => c.status === "draft").length,
    archived: courses.filter((c) => c.status === "archived").length,
    featured: courses.filter((c) => c.isFeatured).length,
  };

  return (
    <>
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Courses</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {isLoading ? "Loading…" : `${courses.length} total · ${counts.published} published · ${counts.draft} drafts · ${counts.featured} featured`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadCourses}
            disabled={isLoading}
            className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "↻"} Refresh
          </button>
          <button
            type="button"
            onClick={() => setShowAIModal(true)}
            className="flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition-all hover:from-violet-500/20 hover:to-indigo-500/20 hover:text-indigo-200"
          >
            <Sparkles className="h-4 w-4" />
            Generate with AI
          </button>
          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300 transition-colors hover:bg-violet-500/20 hover:text-violet-200"
          >
            <FileUp className="h-4 w-4" />
            Import Word
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-500"
          >
            <Plus className="h-4 w-4" />
            Add Course
          </button>
        </div>
      </div>
      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      {/* Quick stat chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Published", val: counts.published, accent: "#10b981" },
          { label: "Drafts", val: counts.draft, accent: "#f59e0b" },
          { label: "Archived", val: counts.archived, accent: "#71717a" },
          { label: "Featured", val: counts.featured, accent: "#8b5cf6" },
        ].map(({ label, val, accent }) => (
          <div key={label} className="rounded-2xl border border-white/6 bg-zinc-900 px-4 py-3">
            <p className="text-xl font-bold" style={{ color: accent }}>{val}</p>
            <p className="text-xs text-zinc-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 min-w-48 items-center gap-2 rounded-xl border border-white/8 bg-zinc-900 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses or instructor…"
            className="w-full bg-transparent text-sm text-zinc-300 outline-none placeholder:text-zinc-600"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")}>
              <X className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-300" />
            </button>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CourseStatus | "all")}
          className="rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-violet-500"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-violet-500"
        >
          {categories.map((c: string) => (
            <option key={c} value={c}>
              {c === "all" ? "All categories" : c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="overflow-hidden rounded-2xl border border-white/6 bg-zinc-900">
          <div className="space-y-px">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-white/4 px-4 py-4 last:border-0">
                <div className="h-4 flex-1 animate-pulse rounded-full bg-white/5" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-white/5" />
                <div className="h-4 w-16 animate-pulse rounded-full bg-white/5" />
                <div className="h-4 w-24 animate-pulse rounded-full bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      ) : (
      <div className="overflow-hidden rounded-2xl border border-white/6 bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm" aria-label="Courses table">
            <thead>
              <tr className="border-b border-white/6">
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Course</th>
                <th className="hidden px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500 sm:table-cell">Category</th>
                <th className="hidden px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500 md:table-cell">Difficulty</th>
                <th className="hidden px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-500 lg:table-cell">Enrolled</th>
                <th className="hidden px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-500 lg:table-cell">Rating</th>
                <th className="hidden px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500 xl:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <p className="text-sm text-zinc-500">No courses match your filters.</p>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(true)}
                      className="mt-3 text-xs text-violet-400 underline underline-offset-2 hover:text-violet-300"
                    >
                      + Add your first course
                    </button>
                  </td>
                </tr>
              )}
              {filtered.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-white/4 transition-colors hover:bg-white/2 last:border-0"
                >
                  {/* Course */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-zinc-200">
                          {course.title}
                        </span>
                        {course.isFeatured && (
                          <Sparkles className="h-3 w-3 shrink-0 text-amber-400" />
                        )}
                        {course.isNew && (
                          <span className="rounded-full bg-violet-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-400">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-600">
                        by {course.instructor} · {course.lessonsCount} lessons · {course.duration}
                      </span>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="hidden px-4 py-3 text-xs text-zinc-400 sm:table-cell">
                    {course.category}
                  </td>
                  {/* Difficulty */}
                  <td className="hidden px-4 py-3 md:table-cell">
                    <DiffBadge diff={course.difficulty} />
                  </td>
                  {/* Enrolled */}
                  <td className="hidden px-4 py-3 text-right text-sm tabular-nums text-zinc-300 lg:table-cell">
                    <div className="flex flex-col items-end gap-0.5">
                      <span>{formatNumber(course.enrolledCount)}</span>
                      <div className="flex items-center gap-1">
                        <div className="h-1 w-14 overflow-hidden rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full bg-violet-500"
                            style={{ width: `${course.completionRate}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-zinc-600">{course.completionRate}%</span>
                      </div>
                    </div>
                  </td>
                  {/* Rating */}
                  <td className="hidden px-4 py-3 text-right lg:table-cell">
                    {course.rating > 0 ? (
                      <div className="flex items-center justify-end gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-zinc-300">{course.rating}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-600">—</span>
                    )}
                  </td>
                  {/* Status */}
                  <td className="hidden px-4 py-3 xl:table-cell">
                    <StatusBadge status={course.status} />
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {/* Toggle featured */}
                      <button
                        type="button"
                        onClick={() => toggleFeatured(course.id)}
                        title={course.isFeatured ? "Remove featured" : "Mark featured"}
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                          course.isFeatured
                            ? "text-amber-400 hover:bg-amber-500/15"
                            : "text-zinc-500 hover:bg-amber-500/15 hover:text-amber-400",
                        )}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                      </button>

                      {/* Toggle new badge */}
                      <button
                        type="button"
                        onClick={() => toggleNew(course.id)}
                        title={course.isNew ? "Remove 'New' badge" : "Add 'New' badge"}
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                          course.isNew
                            ? "text-violet-400 hover:bg-violet-500/15"
                            : "text-zinc-500 hover:bg-violet-500/15 hover:text-violet-400",
                        )}
                      >
                        <Zap className="h-3.5 w-3.5" />
                      </button>

                      {/* Publish / Draft toggle */}
                      {course.status !== "archived" && (
                        <button
                          type="button"
                          onClick={() =>
                            toggleStatus(
                              course.id,
                              course.status === "published" ? "draft" : "published",
                            )
                          }
                          title={course.status === "published" ? "Set to draft" : "Publish"}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                            course.status === "published"
                              ? "text-emerald-400 hover:bg-emerald-500/15"
                              : "text-zinc-500 hover:bg-emerald-500/15 hover:text-emerald-400",
                          )}
                        >
                          {course.status === "published" ? (
                            <Globe className="h-3.5 w-3.5" />
                          ) : (
                            <EyeOff className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}

                      {/* Archive */}
                      {course.status !== "archived" && (
                        <button
                          type="button"
                          onClick={() => toggleStatus(course.id, "archived")}
                          title="Archive course"
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-red-500/15 hover:text-red-400"
                        >
                          <Archive className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {/* Restore archived */}
                      {course.status === "archived" && (
                        <button
                          type="button"
                          onClick={() => toggleStatus(course.id, "draft")}
                          title="Restore to draft"
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-emerald-500/15 hover:text-emerald-400"
                        >
                          <TrendingUp className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(course)}
                        title="Delete course permanently"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-red-500/15 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-white/6 px-4 py-3">
          <p className="text-xs text-zinc-600">
            Showing {filtered.length} of {courses.length} courses
          </p>
        </div>
      </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 shadow-2xl"
        >
          <Check className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-zinc-200">{toast}</span>
        </div>
      )}
    </div>

      {/* Add course modal */}
      {showAddModal && (
        <AddCourseModal
          onClose={() => setShowAddModal(false)}
          onCreated={handleCourseCreated}
        />
      )}

      {/* AI Course Generator modal */}
      {showAIModal && (
        <AICourseGeneratorDialog
          onClose={() => setShowAIModal(false)}
          onGenerated={(course) => {
            setCourses((prev) => [course, ...prev]);
            setShowAIModal(false);
            showToast(`"${course.title}" generated successfully!`);
          }}
        />
      )}

      {/* Import from Word modal */}
      {showImportModal && (
        <WordImportDialog
          onClose={() => setShowImportModal(false)}
          onImported={(course) => {
            setCourses((prev) => [course, ...prev]);
            setShowImportModal(false);
            showToast(`"${course.title}" imported successfully!`);
          }}
        />
      )}

      {/* Confirm delete modal */}
      {deleteTarget && (
        <ConfirmDeleteModal
          course={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
