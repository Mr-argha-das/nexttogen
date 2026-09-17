"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  ChevronRight,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Newspaper,
  Phone,
  Settings,
  Star,
  HelpCircle,
  Users,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: CalendarCheck },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  user,
  siteName,
  counts,
}: {
  children: React.ReactNode;
  user: { name: string; email: string };
  siteName: string;
  counts: { applications: number; messages: number };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const badge = (href: string) => {
    if (href === "/admin/applications" && counts.applications) return counts.applications;
    if (href === "/admin/messages" && counts.messages) return counts.messages;
    return null;
  };

  return (
    <div className="min-h-screen bg-canvas">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between gap-3 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--grad-brand)] text-white shadow-[var(--shadow-brand)]">
                <GraduationCap className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent-500 ring-2 ring-white" />
              </span>
              <span className="leading-tight">
                <span className="block font-heading text-[14.5px] font-extrabold text-ink">{siteName}</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand-600">
                  Admin panel
                </span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="btn btn-outline btn-sm hidden sm:inline-flex">
              <ExternalLink className="h-3.5 w-3.5" /> View website
            </Link>
            <div className="hidden text-right sm:block">
              <p className="text-[13px] font-semibold text-ink">{user.name}</p>
              <p className="text-[11.5px] text-slate-500">{user.email}</p>
            </div>
            <form action={logoutAction}>
              <button type="submit" className="btn btn-outline btn-sm">
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 mt-16 w-64 border-r border-line bg-white p-3 transition-transform lg:sticky lg:top-16 lg:mt-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <nav className="space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const count = badge(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-all",
                    isActive(href)
                      ? "bg-[var(--grad-brand)] text-white shadow-[var(--shadow-brand)]"
                      : "text-slate-600 hover:translate-x-0.5 hover:bg-brand-50 hover:text-brand-800",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{label}</span>
                  {count ? (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-bold",
                        isActive(href) ? "bg-white/20 text-white" : "bg-rose-100 text-rose-700",
                      )}
                    >
                      {count}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="relative mt-4 overflow-hidden rounded-2xl bg-[var(--grad-brand-deep)] p-4 text-white">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.14]" />
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-accent-300">
              <Star className="h-4 w-4" />
            </span>
            <p className="relative mt-3 text-[13px] font-bold text-white">Your website is SEO-ready</p>
            <p className="relative mt-1.5 text-[11.5px] leading-5 text-white/65">
              Sitemap: /sitemap.xml · Robots: /robots.txt · every page ships meta tags and structured data.
            </p>
          </div>

          <div className="mt-4 space-y-1 border-t border-line pt-3 text-[12px] text-slate-500">
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors hover:bg-brand-50 hover:text-brand-800"
            >
              <Settings className="h-3.5 w-3.5" /> Site settings
            </Link>
            <Link
              href="/admin/messages"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors hover:bg-brand-50 hover:text-brand-800"
            >
              <Phone className="h-3.5 w-3.5" /> Support requests
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-colors hover:bg-brand-50 hover:text-brand-800"
            >
              <BarChart3 className="h-3.5 w-3.5" /> Analytics
              <ChevronRight className="ml-auto h-3 w-3" />
            </Link>
          </div>
        </aside>

        {open ? (
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-20 bg-ink/30 lg:hidden"
          />
        ) : null}

        <main className="min-w-0 flex-1 p-4 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
