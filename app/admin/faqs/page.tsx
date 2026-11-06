"use client";

import { useState } from "react";
import { useSiteData } from "@/lib/siteData";
import { Plus, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";

export default function AdminFaqs() {
  const { data, savePatch } = useSiteData();
  const [editing, setEditing] = useState<{ q: string; a: string } | null>(null);
  const [idx, setIdx] = useState(-1);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openNew = () => { setIsNew(true); setIdx(-1); setEditing({ q: "", a: "" }); };
  const openEdit = (i: number) => { setIsNew(false); setIdx(i); setEditing({ ...data.faqs[i] }); };
  const close = () => { setEditing(null); setIdx(-1); setIsNew(false); setError(""); };

  const save = async () => {
    if (!editing || !editing.q.trim() || !data) return;
    setSaving(true); setError("");
    let faqs = [...data.faqs];
    if (isNew) faqs.push(editing); else faqs[idx] = editing;
    const res = await savePatch({ faqs });
    setSaving(false);
    if (res.ok) close(); else setError(res.error || "Save failed");
  };

  const remove = async (i: number) => {
    if (!data || !confirm("Delete?")) return;
    await savePatch({ faqs: data.faqs.filter((_, j) => j !== i) });
  };

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="mono-label">Content Manager</p>
          <h2 className="heading text-3xl mt-2">FAQs</h2>
        </div>
        <button onClick={openNew} className="btn-gold"><Plus className="h-4 w-4" /> Add FAQ</button>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white shadow-soft divide-y divide-ink-100">
        {data.faqs.map((f, i) => (
          <div key={i} className="p-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-semibold text-brand-900">{f.q}</p>
              <p className="text-sm text-ink-600 mt-1 leading-relaxed">{f.a}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(i)} className="h-9 w-9 rounded-lg border border-ink-200 hover:border-brand-700 hover:text-brand-800 text-ink-600 flex items-center justify-center"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => remove(i)} className="h-9 w-9 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 flex items-center justify-center"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">
            <div className="flex items-center justify-between p-6 border-b border-ink-100">
              <h3 className="heading text-xl">{isNew ? "Add FAQ" : "Edit FAQ"}</h3>
              <button onClick={close} className="h-9 w-9 rounded-lg hover:bg-ink-100 flex items-center justify-center"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">{error}</div>}
              <div><label className="mono-label mb-2 block">Question</label>
                <input value={editing.q} onChange={(e) => setEditing({ ...editing, q: e.target.value })} className={inputCls} />
              </div>
              <div><label className="mono-label mb-2 block">Answer</label>
                <textarea rows={5} value={editing.a} onChange={(e) => setEditing({ ...editing, a: e.target.value })} className={inputCls + " resize-none"} />
              </div>
            </div>
            <div className="p-6 border-t border-ink-100 flex items-center justify-end gap-3">
              <button onClick={close} className="btn-outline" disabled={saving}>Cancel</button>
              <button onClick={save} disabled={saving} className="btn-gold">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition";
