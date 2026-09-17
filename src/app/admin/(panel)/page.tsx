import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Eye,
  Inbox,
  MessageSquareQuote,
  Newspaper,
  Plus,
  TrendingUp,
  Users,
  HandHeart,
} from "lucide-react";
import { getDashboardStats, getSettings } from "@/lib/data";
import { formatDate, formatINR, relativeTime, truncate } from "@/lib/utils";
import { StatusPill } from "@/components/admin/ui";

export default async function AdminDashboardPage() {
  const stats = getDashboardStats();
  const settings = getSettings();
  const maxMonthly = Math.max(1, ...stats.monthlyApplications.map((item) => item.count));

  const cards = [
    { label: "New applications", value: stats.newApplications, total: stats.applications, icon: CalendarCheck, href: "/admin/applications", tone: "text-brand-700 bg-brand-50" },
    { label: "New messages", value: stats.newMessages, total: stats.messages, icon: Inbox, href: "/admin/messages", tone: "text-emerald-700 bg-emerald-50" },
    { label: "Courses", value: stats.publishedCourses, total: stats.courses, icon: BookOpen, href: "/admin/courses", tone: "text-blue-700 bg-blue-50" },
    { label: "Blog posts", value: stats.posts, total: stats.totalViews, icon: Newspaper, href: "/admin/blogs", tone: "text-amber-700 bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Welcome back! 👋</h1>
          <p className="mt-1 text-[13.5px] text-slate-600">
            Welcome to the {settings.siteName} admin panel. Everything on the website is managed from here.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/courses/new" className="btn btn-primary btn-sm">
            <Plus className="h-4 w-4" /> New course
          </Link>
          <Link href="/admin/blogs/new" className="btn btn-outline btn-sm">
            <Plus className="h-4 w-4" /> New blog
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, total, icon: Icon, href, tone }) => (
          <Link key={label} href={href} className="card card-hover p-5">
            <div className="flex items-start justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-slate-300" />
            </div>
            <p className="mt-4 font-heading text-2xl font-extrabold text-ink">{value}</p>
            <p className="text-[13px] text-slate-500">{label}</p>
            <p className="mt-1 text-[11.5px] text-slate-400">Total: {total}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* Applications chart */}
        <div className="card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-heading text-[15px] font-bold">
              <TrendingUp className="h-4 w-4 text-brand-600" /> Applications (last 12 months)
            </h2>
            <Link href="/admin/applications" className="text-[12.5px] font-semibold text-brand-700">
              View all →
            </Link>
          </div>

          {stats.monthlyApplications.length ? (
            <div className="mt-5 flex h-40 items-end gap-2">
              {stats.monthlyApplications.map((item) => (
                <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">{item.count}</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-700 to-brand-400"
                    style={{ height: `${Math.max(6, (item.count / maxMonthly) * 100)}%` }}
                    title={`${item.month}: ${item.count}`}
                  />
                  <span className="text-[10px] text-slate-400">{item.month.slice(5)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-canvas p-4 text-[13px] text-slate-500">
              No applications yet. Once students submit the apply form, the graph will appear here.
            </p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-4">
            {stats.applicationsByStatus.map((item) => (
              <div key={item.status} className="rounded-xl bg-canvas p-3">
                <StatusPill status={item.status} />
                <p className="mt-2 font-heading text-lg font-extrabold">{item.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary stats */}
        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-heading text-[15px] font-bold">Content overview</h2>
            <dl className="mt-4 space-y-3 text-[13.5px]">
              {[
                { icon: MessageSquareQuote, label: "Testimonials", value: stats.testimonials, href: "/admin/testimonials" },
                { icon: Users, label: "Newsletter subscribers", value: stats.subscribers, href: "/admin/subscribers" },
                { icon: Eye, label: "Blog total views", value: stats.totalViews.toLocaleString("en-IN"), href: "/admin/blogs" },
                { icon: HandHeart, label: "Support pledges (₹)", value: formatINR(stats.supportRaised), href: "/admin/messages" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-canvas text-brand-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <dt className="flex-1 text-slate-600">{label}</dt>
                  <dd className="font-heading text-[15px] font-bold text-ink">{value}</dd>
                  <Link href={href} className="text-[11.5px] font-semibold text-brand-700">
                    →
                  </Link>
                </div>
              ))}
            </dl>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-[15px] font-bold">Recent messages</h2>
              <Link href="/admin/messages" className="text-[12.5px] font-semibold text-brand-700">
                View all →
              </Link>
            </div>
            <ul className="mt-3 divide-y divide-slate-100">
              {stats.recentMessages.slice(0, 4).map((message) => (
                <li key={message.id} className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13.5px] font-semibold text-ink">{message.name}</p>
                    <StatusPill status={message.status} />
                  </div>
                  <p className="mt-1 text-[12.5px] text-slate-500">{truncate(message.message, 70)}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {message.type} · {relativeTime(message.createdAt)}
                  </p>
                </li>
              ))}
              {!stats.recentMessages.length ? (
                <li className="py-3 text-[13px] text-slate-500">No messages yet.</li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>

      {/* Recent applications */}
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <h2 className="font-heading text-[15px] font-bold">Recent applications</h2>
          <Link href="/admin/applications" className="text-[12.5px] font-semibold text-brand-700">
            All applications →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead className="bg-canvas text-[11.5px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Student</th>
                <th className="px-5 py-3 font-semibold">Course</th>
                <th className="px-5 py-3 font-semibold">Contact</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentApplications.map((application) => (
                <tr key={application.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-ink">{application.fullName}</p>
                    <p className="text-[11.5px] text-slate-500">
                      {application.city ?? "—"} · {application.qualification ?? "—"}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{truncate(application.courseName ?? "—", 34)}</td>
                  <td className="px-5 py-3">
                    <a href={`tel:${application.phone}`} className="block font-medium text-brand-700">
                      {application.phone}
                    </a>
                    <a href={`mailto:${application.email}`} className="text-[11.5px] text-slate-500">
                      {application.email}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(application.createdAt)}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={application.status} />
                  </td>
                </tr>
              ))}
              {!stats.recentApplications.length ? (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center text-slate-500">
                    No applications yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
