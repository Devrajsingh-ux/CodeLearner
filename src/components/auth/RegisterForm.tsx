"use client";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 12 characters",       ok: password.length >= 12 },
    { label: "Uppercase letter (A–Z)",        ok: /[A-Z]/.test(password) },
    { label: "Lowercase letter (a–z)",        ok: /[a-z]/.test(password) },
    { label: "Number (0–9)",                  ok: /[0-9]/.test(password) },
    { label: "Special character (!@#$…)",     ok: /[^A-Za-z0-9]/.test(password) },
  ];

  if (!password) return null;

  const strength = checks.filter((c) => c.ok).length;
  const barColor =
    strength <= 1
      ? "bg-red-500"
      : strength === 2
        ? "bg-orange-500"
        : strength === 3
          ? "bg-amber-500"
          : strength === 4
            ? "bg-lime-500"
            : "bg-emerald-500";

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= strength ? barColor : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <ul className="space-y-1">
        {checks.map(({ label, ok }) => (
          <li key={label} className="flex items-center gap-1.5 text-xs">
            {ok ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <XCircle className="h-3.5 w-3.5 text-zinc-600" />
            )}
            <span className={ok ? "text-zinc-300" : "text-zinc-600"}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }

    setIsLoading(true);
    const result = await register(name, email, password);
    setIsLoading(false);

    if (result.error) {
      setError(result.error);
      setVerificationSent(false);
    } else if (result.needsVerification) {
      setError("");
      setVerificationSent(true);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Input
        label="Full name"
        type="text"
        placeholder="Jane Smith"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        leftAddon={<User className="h-4 w-4" />}
        required
      />
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        leftAddon={<Mail className="h-4 w-4" />}
        required
      />

      <div>
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          leftAddon={<Lock className="h-4 w-4" />}
          rightAddon={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
          required
        />
        <PasswordStrength password={password} />
      </div>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400 select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet-500"
        />
        <span>
          I agree to the {" "}
          <a href="/terms" className="text-violet-400 hover:text-violet-300 transition-colors">Terms of Service</a>
          {" "}and{" "}
          <a href="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors">Privacy Policy</a>
        </span>
      </label>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {verificationSent && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-200">
          A verification email was sent. Please check your inbox and follow the link to verify your email before signing in.
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        rightIcon={<ArrowRight className="h-5 w-5" />}
      >
        Create account
      </Button>
    </form>
  );
}
