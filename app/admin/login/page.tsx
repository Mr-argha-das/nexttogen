"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, GraduationCap, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.replace("/admin/dashboard");
  }, [isAuthenticated, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.ok) router.push("/admin/dashboard");
    else setError(res.error || "Login failed");
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] bg-brand-950 text-white flex items-center py-16 overflow-hidden">
      <div className="absolute inset-0 bg-hero-radial" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px"
        }}
      />
      <div className="relative container-x">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold-400 mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block">
            <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
              <Lock className="h-3.5 w-3.5" /> Admin Portal
            </span>
            <h1 className="heading mt-5 text-5xl lg:text-6xl text-white">
              Manage your<br />
              <span className="heading-italic text-gold-400">academy,</span> with ease.
            </h1>
            <p className="mt-5 text-white/70 text-[17px] leading-[1.7] font-light max-w-md">
              Edit courses, testimonials, blog posts, contact info, FAQs and
              site content — all from one clean dashboard. Changes reflect on
              the live site instantly.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3 max-w-md">
              {[
                "Add & edit courses",
                "Moderate testimonials",
                "Publish blog posts",
                "Update site settings"
              ].map((f) => (
                <div key={f} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm text-white/85">{f}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-md w-full mx-auto lg:ml-auto">
            <div className="glass !bg-white !text-ink-900 p-8 md:p-10 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-xl bg-brand-800 text-gold-400 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-xl font-semibold text-brand-900 tracking-display">NextToGen Admin</p>
                  <p className="text-xs text-ink-500 font-mono uppercase tracking-[0.2em] mt-0.5">Secure Login</p>
                </div>
              </div>

              <h2 className="heading text-2xl">Welcome back.</h2>
              <p className="text-sm text-ink-500 mt-1">Sign in to manage your academy.</p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mono-label mb-2 block">Email</label>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@academy.app"
                    className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-800 placeholder-ink-400 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition"
                  />
                </div>
                <div>
                  <label className="mono-label mb-2 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 pr-12 text-sm text-ink-800 placeholder-ink-400 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-brand-800"
                      aria-label="Toggle password"
                    >
                      {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-3 flex items-start gap-2 text-sm text-red-800">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
                  {loading ? "Signing in…" : "Sign In to Dashboard"}
                </button>
              </form>

              <div className="mt-6 rounded-xl bg-brand-50/60 border border-brand-100 p-4 text-xs text-ink-600 leading-relaxed">
                <p className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-brand-700 font-semibold mb-1">Default login</p>
                Set <b>ADMIN_EMAIL</b> & <b>ADMIN_PASSWORD</b> in <code>.env.local</code>.
                Defaults are shown in your project README.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
