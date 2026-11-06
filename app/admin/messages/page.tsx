"use client";

import { useEffect, useState } from "react";
import { Inbox, Trash2, Mail, Calendar, MailOpen, Search } from "lucide-react";
import clsx from "clsx";

type Msg = {
  id: string;
  submittedAt: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
};

export default function AdminMessagesPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Msg | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/submissions?kind=messages", { cache: "no-store" });
    if (res.ok) {
      const j = await res.json();
      setMsgs(j.messages || []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openMsg = async (m: Msg) => {
    setOpen(m);
    if (!m.read) {
      await fetch("/api/admin/submissions?kind=message", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: m.id })
      });
      setMsgs((prev) => prev.map((x) => (x.id === m.id ? { ...x, read: true } : x)));
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/submissions?kind=message&id=${id}`, { method: "DELETE" });
    setMsgs((prev) => prev.filter((x) => x.id !== id));
    if (open?.id === id) setOpen(null);
  };

  const filtered = msgs.filter((m) =>
    `${m.name} ${m.email} ${m.subject} ${m.message} ${m.id}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  const unread = msgs.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="mono-label">Inbox</p>
        <h2 className="heading text-3xl mt-1">Contact Messages</h2>
        <p className="text-ink-600 mt-1">
          {msgs.length} total · {unread} unread.
        </p>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white shadow-soft overflow-hidden">
        <div className="p-4 flex items-center justify-between gap-3 flex-wrap border-b border-ink-100">
          <div className="relative max-w-sm w-full">
            <Search className="h-4 w-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-xl border border-ink-200 bg-white pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <button onClick={load} className="btn-outline text-sm">Refresh</button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-ink-500 mono-label">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-ink-500">
            <Inbox className="h-10 w-10 mx-auto text-ink-300" />
            <p className="mt-3">No messages yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-ink-100">
            {filtered.map((m) => (
              <li
                key={m.id}
                onClick={() => openMsg(m)}
                className={clsx("p-4 hover:bg-brand-50/40 cursor-pointer flex items-start gap-4",
                  !m.read && "bg-blue-50/30"
                )}
              >
                <div className={clsx("h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                  m.read ? "bg-ink-100 text-ink-500" : "bg-gold-100 text-gold-700"
                )}>
                  {m.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-semibold text-brand-900 truncate">
                      {!m.read && <span className="inline-block h-2 w-2 rounded-full bg-gold-500 mr-2 align-middle" />}
                      {m.name} <span className="text-ink-400 font-normal text-xs">&lt;{m.email}&gt;</span>
                    </p>
                    <p className="text-xs text-ink-500 flex items-center gap-1 shrink-0">
                      <Calendar className="h-3 w-3" /> {new Date(m.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-ink-700 mt-0.5">{m.subject}</p>
                  <p className="text-sm text-ink-500 mt-0.5 line-clamp-2">{m.message}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); remove(m.id); }}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
