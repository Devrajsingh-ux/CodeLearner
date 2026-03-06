"use client";

import {
  Ban,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  Shield,
  UserCheck,
  UserMinus,
  UserX,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ADMIN_USERS, type AdminUser, type UserRole, type UserStatus } from "@/data/admin";
import { cn, formatNumber } from "@/lib/utils";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: UserRole }) {
  const map: Record<UserRole, string> = {
    student: "bg-sky-500/15 text-sky-300 border-sky-500/20",
    instructor: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    admin: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize",
        map[role],
      )}
    >
      {role === "admin" && <Shield className="mr-1 h-2.5 w-2.5" />}
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const map: Record<UserStatus, string> = {
    active: "bg-emerald-500/15 text-emerald-400",
    suspended: "bg-red-500/15 text-red-400",
    pending: "bg-zinc-700 text-zinc-400",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize",
        map[status],
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "active"
            ? "bg-emerald-400"
            : status === "suspended"
              ? "bg-red-400"
              : "bg-zinc-500",
        )}
      />
      {status}
    </span>
  );
}

// ─── Confirmation modal ───────────────────────────────────────────────────────

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  title,
  message,
  confirmLabel,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-zinc-400">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/8"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors",
              danger
                ? "bg-red-600 hover:bg-red-500"
                : "bg-violet-600 hover:bg-violet-500",
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit role modal ──────────────────────────────────────────────────────────

function EditRoleModal({
  user,
  onSave,
  onCancel,
}: {
  user: AdminUser;
  onSave: (id: string, role: UserRole) => void;
  onCancel: () => void;
}) {
  const [role, setRole] = useState<UserRole>(user.role);
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
        <h3 className="text-base font-bold text-white">Edit Role</h3>
        <p className="mt-1 text-sm text-zinc-400">
          {user.name} — {user.email}
        </p>
        <fieldset className="mt-4 space-y-2">
          <legend className="sr-only">Select role</legend>
          {(["student", "instructor", "admin"] as UserRole[]).map((r) => (
            <label
              key={r}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                role === r
                  ? "border-violet-500/40 bg-violet-500/10"
                  : "border-white/8 hover:border-white/15",
              )}
            >
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
                className="accent-violet-500"
              />
              <span className="text-sm font-medium capitalize text-zinc-200">
                {r}
              </span>
            </label>
          ))}
        </fieldset>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/8 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(user.id, role)}
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sort helper ──────────────────────────────────────────────────────────────

type SortKey = "name" | "xp" | "joinedAt" | "enrolledCourses" | "completedLessons";
type SortDir = "asc" | "desc";

function SortHeader({
  label,
  field,
  current,
  dir,
  onSort,
}: {
  label: string;
  field: SortKey;
  current: SortKey;
  dir: SortDir;
  onSort: (f: SortKey) => void;
}) {
  const active = current === field;
  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      className={cn(
        "flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider transition-colors",
        active ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300",
      )}
    >
      {label}
      {active ? (
        dir === "asc" ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )
      ) : null}
    </button>
  );
}

// ═════════════════════════════════════════════════════════════════════════════

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("joinedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    confirmLabel: string;
    danger?: boolean;
    action: () => void;
  } | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }

  // ── Sort toggle ──────────────────────────────────────────────────────────
  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  // ── Derived list ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...users];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q),
      );
    }
    if (roleFilter !== "all") list = list.filter((u) => u.role === roleFilter);
    if (statusFilter !== "all") list = list.filter((u) => u.status === statusFilter);
    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "string" ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [users, search, roleFilter, statusFilter, sortKey, sortDir]);

  // ── Actions ───────────────────────────────────────────────────────────────
  function saveRole(id: string, role: UserRole) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    setEditUser(null);
    showToast(`Role updated to "${role}"`);
  }

  function toggleSuspend(user: AdminUser) {
    const isSuspended = user.status === "suspended";
    setConfirmModal({
      title: isSuspended ? "Restore user?" : "Suspend user?",
      message: isSuspended
        ? `${user.name} will regain access to the platform.`
        : `${user.name} will lose access immediately. You can reverse this later.`,
      confirmLabel: isSuspended ? "Restore" : "Suspend",
      danger: !isSuspended,
      action: () => {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id
              ? { ...u, status: isSuspended ? "active" : "suspended" }
              : u,
          ),
        );
        setConfirmModal(null);
        showToast(isSuspended ? "User restored." : "User suspended.");
      },
    });
  }

  function deleteUser(user: AdminUser) {
    setConfirmModal({
      title: "Delete user account?",
      message: `This will permanently remove ${user.name} and all their data. This action cannot be undone.`,
      confirmLabel: "Delete permanently",
      danger: true,
      action: () => {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
        setConfirmModal(null);
        showToast("User deleted.");
      },
    });
  }

  const counts = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    instructors: users.filter((u) => u.role === "instructor").length,
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Users</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {formatNumber(counts.total)} total · {formatNumber(counts.active)} active · {counts.suspended} suspended
          </p>
        </div>
      </div>

      {/* ── Quick count cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Users", val: counts.total, accent: "#8b5cf6" },
          { label: "Active", val: counts.active, accent: "#10b981" },
          { label: "Suspended", val: counts.suspended, accent: "#ef4444" },
          { label: "Instructors", val: counts.instructors, accent: "#f59e0b" },
        ].map(({ label, val, accent }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/6 bg-zinc-900 px-4 py-3"
          >
            <p className="text-xl font-bold text-white" style={{ color: accent }}>
              {val}
            </p>
            <p className="text-xs text-zinc-500">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Filters ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex flex-1 min-w-48 items-center gap-2 rounded-xl border border-white/8 bg-zinc-900 px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="w-full bg-transparent text-sm text-zinc-300 outline-none placeholder:text-zinc-600"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
              <X className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-300" />
            </button>
          )}
        </div>

        {/* Role filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
          className="rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-violet-500"
        >
          <option value="all">All roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as UserStatus | "all")}
          className="rounded-xl border border-white/8 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 outline-none focus:border-violet-500"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* ── Table ────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-white/6 bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm" aria-label="Users table">
            <thead>
              <tr className="border-b border-white/6">
                <th className="px-4 py-3 text-left">
                  <SortHeader label="User" field="name" current={sortKey} dir={sortDir} onSort={handleSort} />
                </th>
                <th className="hidden px-4 py-3 text-left sm:table-cell">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Role</span>
                </th>
                <th className="hidden px-4 py-3 text-left md:table-cell">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Status</span>
                </th>
                <th className="hidden px-4 py-3 text-right lg:table-cell">
                  <SortHeader label="XP" field="xp" current={sortKey} dir={sortDir} onSort={handleSort} />
                </th>
                <th className="hidden px-4 py-3 text-right lg:table-cell">
                  <SortHeader label="Courses" field="enrolledCourses" current={sortKey} dir={sortDir} onSort={handleSort} />
                </th>
                <th className="hidden px-4 py-3 text-left xl:table-cell">
                  <SortHeader label="Joined" field="joinedAt" current={sortKey} dir={sortDir} onSort={handleSort} />
                </th>
                <th className="px-4 py-3 text-right">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-zinc-500">
                    No users match your filters.
                  </td>
                </tr>
              )}
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/4 transition-colors hover:bg-white/2 last:border-0"
                >
                  {/* User info */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[11px] font-bold text-violet-300">
                        {user.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-200">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Role */}
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <RoleBadge role={user.role} />
                  </td>
                  {/* Status */}
                  <td className="hidden px-4 py-3 md:table-cell">
                    <StatusBadge status={user.status} />
                  </td>
                  {/* XP */}
                  <td className="hidden px-4 py-3 text-right text-sm tabular-nums text-zinc-300 lg:table-cell">
                    {formatNumber(user.xp)}
                  </td>
                  {/* Courses */}
                  <td className="hidden px-4 py-3 text-right text-sm tabular-nums text-zinc-300 lg:table-cell">
                    {user.enrolledCourses}
                  </td>
                  {/* Joined */}
                  <td className="hidden px-4 py-3 text-xs text-zinc-500 xl:table-cell">
                    {user.joinedAt}
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {/* Edit role */}
                      <button
                        type="button"
                        onClick={() => setEditUser(user)}
                        title="Edit role"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-violet-500/15 hover:text-violet-400"
                      >
                        <UserCheck className="h-3.5 w-3.5" />
                      </button>
                      {/* Suspend / restore */}
                      {user.role !== "admin" && (
                        <button
                          type="button"
                          onClick={() => toggleSuspend(user)}
                          title={user.status === "suspended" ? "Restore" : "Suspend"}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                            user.status === "suspended"
                              ? "text-zinc-500 hover:bg-emerald-500/15 hover:text-emerald-400"
                              : "text-zinc-500 hover:bg-amber-500/15 hover:text-amber-400",
                          )}
                        >
                          {user.status === "suspended" ? (
                            <UserMinus className="h-3.5 w-3.5 rotate-180" />
                          ) : (
                            <Ban className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                      {/* Delete */}
                      {user.role !== "admin" && (
                        <button
                          type="button"
                          onClick={() => deleteUser(user)}
                          title="Delete user"
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-red-500/15 hover:text-red-400"
                        >
                          <UserX className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Row count */}
        <div className="border-t border-white/6 px-4 py-3">
          <p className="text-xs text-zinc-600">
            Showing {filtered.length} of {users.length} users
          </p>
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────────── */}
      {editUser && (
        <EditRoleModal
          user={editUser}
          onSave={saveRole}
          onCancel={() => setEditUser(null)}
        />
      )}

      {confirmModal && (
        <ConfirmModal
          title={confirmModal.title}
          message={confirmModal.message}
          confirmLabel={confirmModal.confirmLabel}
          danger={confirmModal.danger}
          onConfirm={confirmModal.action}
          onCancel={() => setConfirmModal(null)}
        />
      )}

      {/* ── Toast ────────────────────────────────────────────────── */}
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
