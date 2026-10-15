import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to admin
  if (!loading && user) {
    navigate({ to: "/admin" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signIn(email, password);
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message ?? "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0e]">
      {/* Animated background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 size-[500px] rounded-full bg-orange-600/8 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 size-[400px] rounded-full bg-orange-500/6 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/4 blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Login card */}
      <div className="relative z-10 mx-4 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25">
            <Lock className="size-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            Admin Access
          </h1>
          <p className="mt-1 text-sm text-white/40">{SITE.name}</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/20" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/20" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] py-3 pl-11 pr-12 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/20 transition-colors hover:text-white/50"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="size-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      fill="currentColor"
                      className="opacity-75"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/20">
            Authorized administrators only
          </p>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-white/30 transition-colors hover:text-white/50"
          >
            &larr; Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
