"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Trash2, Mail, Calendar, BadgeCheck, Search, X } from "lucide-react";
import clsx from "clsx";

type App = {
  id: string;
  submittedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  course: string;
  startDate: string;
  experience: string;
  education: string;
  goals: string;
  linkedin: string;
  resume: string;
  hearAbout: string;
  scholarship: boolean;
  status: "new" | "reviewing" | "accepted" | "rejected";
};

const statusColors: Record<App["status"], string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  reviewing: "bg-amber-100 text-amber-700 border-amber-200",
  accepted: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200"
};

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<App | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/submissions?kind=applications", { cache: "no-store" });
    if (res.ok) {
      const j = await res.json();
      setApps(j.applications || []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (id: string, status: App["status"]) => {
    await fetch("/api/admin/submissions?kind=application", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    });
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (open && open.id === id) setOpen({ ...open, status });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    await fetch(`/api/admin/submissions?kind=application&id=${id}`, { method: "DELETE" });
    setApps((prev) => prev.filter((a) => a.id !== id));
    if (open?.id === id) setOpen(null);
  };

  const filtered = apps.filter((a) =>
    `${a.firstName} ${a.lastName} ${a.email} ${a.course} ${a.id}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="mono-label">Admissions</p>
        <h2 className="heading text-3xl mt-1">Applications</h2>
        <p className="text-ink-600 mt-1">
          {apps.length} total application{apps.length !== 1 ? "s" : ""} submitted via the Apply form.
        </p>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white shadow-soft">
        <div className="p-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="relative max-w-sm w-full">
            <Search className="h-4 w-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, email, course, ID…"
              className="w-full rounded-xl border border-ink-200 bg-white pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <button onClick={load} className="btn-outline text-sm">Refresh</button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-ink-500 mono-label">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-ink-500">
            <ClipboardList className="h-10 w-10 mx-auto text-ink-300" />
            <p className="mt-3">No applications yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-50/60 text-ink-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Course</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-brand-50/30 cursor-pointer" onClick={() => setOpen(a)}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-brand-900">{a.firstName} {a.lastName}</p>
                      <p className="text-xs text-ink-500 flex items-center gap-1"><Mail className="h-3 w-3" />{a.email}</p>
                    </td>
                    <td className="px-4 py-3 text-ink-700">{a.course}</td>
                    <td className="px-4 py-3">
                      <span className={clsx("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium", statusColors[a.status])}>
                        <BadgeCheck className="h-3 w-3" /> {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-500 text-xs flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(a.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); remove(a.id); }}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-ink-100 flex items-start justify-between">
              <div>
                <p className="mono-label">Application</p>
                <h3 className="heading text-2xl mt-1">{open.firstName} {open.lastName}</h3>
                <p className="text-ink-500 text-sm mt-1">{open.id} · {new Date(open.submittedAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setOpen(null)} className="p-2 rounded-lg hover:bg-ink-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                {(["new", "reviewing", "accepted", "rejected"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => changeStatus(open.id, s)}
                    className={clsx("px-3 py-1.5 rounded-lg text-sm font-medium border transition",
                      open.status === s ? statusColors[s] : "border-ink-200 text-ink-600 hover:bg-ink-50"
                    )}
                  >{s}</button>
                ))}
              </div>
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                {[
                  ["Email", open.email],
                  ["Phone", open.phone],
                  ["Location", `${open.city}, ${open.country}`],
                  ["Course", open.course],
                  ["Start Date", open.startDate],
                  ["Experience", open.experience],
                  ["Education", open.education],
                  ["LinkedIn", open.linkedin],
                  ["Heard From", open.hearAbout],
                  ["Scholarship", open.scholarship ? "Yes" : "No"]
                ].map(([k, v]) => (
                  <div key={k as string} className="rounded-xl border border-ink-100 p-3">
                    <dt className="mono-label !text-[10px]">{k}</dt>
                    <dd className="mt-1 text-ink-800 break-words">{v || "—"}</dd>
                  </div>
                ))}
                <div className="rounded-xl border border-ink-100 p-3 sm:col-span-2">
                  <dt className="mono-label !text-[10px]">Goals</dt>
                  <dd className="mt-1 text-ink-800 whitespace-pre-wrap">{open.goals || "—"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
