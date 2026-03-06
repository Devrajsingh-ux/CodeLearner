"use client";

import {
  Archive,
  Check,
  EyeOff,
  Globe,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  ADMIN_COURSES,
  type AdminCourse,
  type CourseStatus,
} from "@/data/admin";
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

// ─────────────────────────────────────────────────────────────────────────────

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<AdminCourse[]>(ADMIN_COURSES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }

  const categories = useMemo((): string[] => {
    return ["all", ...Array.from(new Set<string>(ADMIN_COURSES.map((c: AdminCourse) => c.category)))];
  }, []);

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

  function toggleStatus(id: string, next: CourseStatus) {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, status: next } : c)));
    showToast(`Course status → ${next}`);
  }

  function toggleFeatured(id: string) {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, isFeatured: !c.isFeatured } : c)));
    showToast("Featured status updated.");
  }

  function toggleNew(id: string) {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, isNew: !c.isNew } : c)));
    showToast("'New' badge toggled.");
  }

  const counts = {
    published: courses.filter((c) => c.status === "published").length,
    draft: courses.filter((c) => c.status === "draft").length,
    archived: courses.filter((c) => c.status === "archived").length,
    featured: courses.filter((c) => c.isFeatured).length,
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Courses</h2>
        <p className="mt-1 text-sm text-zinc-500">
          {courses.length} total · {counts.published} published · {counts.draft} drafts · {counts.featured} featured
        </p>
      </div>

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
                  <td colSpan={7} className="py-12 text-center text-sm text-zinc-500">
                    No courses match your filters.
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

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-300 flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 shadow-2xl"
        >
          <Check className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-zinc-200">{toast}</span>
        </div>
      )}
    </div>
  );
}
