"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Quote,
  FileText,
  MessageCircleQuestion,
  Settings,
  LogOut,
  GraduationCap,
  Home,
  Menu,
  X,
  Loader2,
  Inbox,
  ClipboardList
} from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";
import clsx from "clsx";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/posts", label: "Blog Posts", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/faqs", label: "FAQs", icon: MessageCircleQuestion },
  { href: "/admin/applications", label: "Applications", icon: ClipboardList },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/settings", label: "Site Settings", icon: Settings }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout, loading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50/40">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-800 mx-auto" />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-500">
            Verifying session…
          </p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-brand-50/40 flex">
      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed lg:sticky top-0 left-0 h-screen w-72 bg-brand-950 text-white z-40 transition-transform overflow-y-auto",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="h-10 w-10 rounded-xl bg-gold-400 text-brand-950 flex items-center justify-center">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-display">NextToGen</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-400">Admin</p>
            </div>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-4 mt-4 space-y-1">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                  active
                    ? "bg-gold-400 text-brand-950 shadow-glow-gold"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 px-4 pt-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <Home className="h-4 w-4" /> View Live Site
          </Link>
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-red-500/20 hover:text-red-200 transition"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-ink-100 px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-brand-800"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-semibold text-brand-900 tracking-display">
            {nav.find((n) => n.href === pathname)?.label || "Admin"}
          </h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-800 text-gold-400 font-semibold text-xs">
              A
            </span>
          </div>
        </header>
        <main className="p-6 md:p-8">{children}</main>
      </div>

      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
