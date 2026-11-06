"use client";

import Link from "next/link";
import {
  BookOpen, Quote, FileText, MessageCircleQuestion, Pencil, TrendingUp,
  Users, Eye, Plus, LogOut
} from "lucide-react";
import { useSiteData } from "@/lib/siteData";
import { useAdminAuth } from "@/lib/adminAuth";

export default function AdminDashboardPage() {
  const { data } = useSiteData();
  const { email, logout } = useAdminAuth();
  if (!data) return null;

  const stats = [
    { label: "Courses", value: data.courses.length, icon: BookOpen, href: "/admin/courses" },
    { label: "Testimonials", value: data.testimonials.length, icon: Quote, href: "/admin/testimonials" },
    { label: "Blog Posts", value: data.posts.length, icon: FileText, href: "/admin/posts" },
    { label: "FAQs", value: data.faqs.length, icon: MessageCircleQuestion, href: "/admin/faqs" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="mono-label">Overview</p>
          <h2 className="heading text-3xl md:text-4xl mt-2">
            Welcome back, <span className="heading-italic text-gold-600">Admin.</span>
          </h2>
          <p className="text-ink-600 mt-2">
            Signed in as <b>{email}</b>. Changes persist on the server and reflect
            on the live site instantly.
          </p>
        </div>
        <button onClick={logout} className="btn-outline">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group rounded-2xl border border-ink-100 bg-white p-6 shadow-soft hover:-translate-y-1 hover:shadow-glow-brand transition">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center"><s.icon className="h-5 w-5" /></div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="mt-4 num-display text-4xl text-brand-900">{s.value}</div>
            <p className="mono-label mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="mono-label">Quick Actions</p>
              <h3 className="heading text-xl mt-1">Manage Content</h3>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/admin/courses", label: "Add New Course", icon: Plus, desc: "Create a new program" },
              { href: "/admin/posts", label: "Write a Post", icon: Pencil, desc: "Publish a blog article" },
              { href: "/admin/testimonials", label: "Add Testimonial", icon: Users, desc: "Add student story" },
              { href: "/admin/settings", label: "Site Settings", icon: Eye, desc: "Brand, contact info & hero" }
            ].map((a) => (
              <Link key={a.label} href={a.href} className="group flex items-start gap-3 rounded-xl border border-ink-100 p-4 hover:border-brand-700 hover:bg-brand-50/40 transition">
                <div className="h-10 w-10 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center shrink-0"><a.icon className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-brand-900 group-hover:text-brand-700">{a.label}</p>
                  <p className="text-xs text-ink-500 mt-0.5">{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-brand-950 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-radial opacity-60" />
          <div className="relative">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-gold-400 font-semibold">Live Preview</p>
            <h3 className="heading text-2xl text-white mt-2">View your changes</h3>
            <p className="text-white/70 text-sm mt-2 leading-[1.7]">
              Open the live site to see your edits reflected in real-time. Data
              is persisted on the server (not in browser storage).
            </p>
            <Link href="/" target="_blank" className="btn-gold mt-5 justify-center w-full">
              Open Live Site <Eye className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
