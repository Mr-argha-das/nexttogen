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
    <div className="min-h-screen bg-slate-100">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
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
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block font-heading text-[14.5px] font-extrabold text-ink">{siteName}</span>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                  Admin Panel
                </span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="btn btn-outline btn-sm hidden sm:inline-flex">
              <ExternalLink className="h-3.5 w-3.5" /> Website dekhein
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
            "fixed inset-y-0 left-0 z-30 mt-16 w-64 border-r border-slate-200 bg-white p-3 transition-transform lg:sticky lg:top-16 lg:mt-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
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
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors",
                    isActive(href)
                      ? "bg-brand-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-ink",
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

          <div className="mt-4 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
            <Star className="h-4 w-4 text-accent-100" />
            <p className="mt-2 text-[13px] font-semibold">Website SEO-ready hai</p>
            <p className="mt-1 text-[11.5px] text-white/75">
              Sitemap: /sitemap.xml · Robots: /robots.txt · Har page par meta + schema.
            </p>
          </div>

          <div className="mt-4 space-y-1 border-t border-slate-100 pt-3 text-[12px] text-slate-500">
            <Link href="/admin/settings" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100">
              <Settings className="h-3.5 w-3.5" /> Site settings
            </Link>
            <Link href="/admin/messages" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100">
              <Phone className="h-3.5 w-3.5" /> Support requests
            </Link>
            <Link href="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100">
              <BarChart3 className="h-3.5 w-3.5" /> Analytics
              <ChevronRight className="ml-auto h-3 w-3" />
            </Link>
          </div>
        </aside>

        {open ? (
          <button
            type="button"
            aria-label="Menu band karein"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-20 bg-ink/30 lg:hidden"
          />
        ) : null}

        <main className="min-w-0 flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
