import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GraduationCap, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import { getSettings } from "@/lib/data";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/admin");
  const settings = getSettings();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-[15px] font-extrabold text-ink">{settings.siteName}</span>
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                Admin Panel
              </span>
            </span>
          </Link>

          <h1 className="font-heading text-2xl font-extrabold">Admin login</h1>
          <p className="mt-2 text-[14px] text-slate-600">
            Sign in to manage courses, blogs, applications and messages.
          </p>

          <div className="mt-7">
            <LoginForm />
          </div>

          <div className="mt-6 rounded-xl bg-canvas p-4">
            <p className="flex items-center gap-2 text-[12.5px] font-semibold text-ink">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> Demo login (seed se)
            </p>
            <p className="mt-1.5 font-mono text-[12px] text-slate-600">admin@nexttogen.in / Admin@12345</p>
            <p className="mt-1 text-[11.5px] text-slate-500">
              For production, change ADMIN_EMAIL and ADMIN_PASSWORD in .env and run `npm run db:reset`.
            </p>
          </div>

          <Link href="/" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to the website
          </Link>
        </div>
      </div>

      {/* Right: visual */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-ink lg:block">
        <div className="mesh absolute inset-0 opacity-40" />
        <div className="relative flex h-full flex-col justify-center px-14 text-white">
          <Lock className="h-8 w-8 text-accent-100" />
          <h2 className="mt-5 font-heading text-3xl font-extrabold leading-tight">
            The entire website, under your control
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-white/80">
            From the admin panel you can manage course fees, the syllabus, blog posts, testimonials, FAQs, contact details and brand colors —
            and the website updates instantly.
          </p>
          <ul className="mt-8 space-y-3 text-[14px] text-white/85">
            {[
              "Applications & enquiries ek jagah",
              "Edit courses and fees live",
              "Publish blog posts with SEO fields",
              "Site settings, colors and chatbot control",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
