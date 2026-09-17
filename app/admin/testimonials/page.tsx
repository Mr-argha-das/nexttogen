"use client";

import { useState } from "react";
import { useSiteData } from "@/lib/siteData";
import { Testimonial } from "@/lib/data";
import { Plus, Pencil, Trash2, Save, X, Star, Loader2 } from "lucide-react";

const emptyT = (): Testimonial => ({
  name: "Student Name",
  role: "Role · Company",
  avatar: "https://i.pravatar.cc/150?img=1",
  quote: "Write the testimonial quote here.",
  rating: 5,
  course: "Course Name"
});

export default function AdminTestimonials() {
  const { data, savePatch } = useSiteData();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [idx, setIdx] = useState<number>(-1);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openNew = () => { setIsNew(true); setIdx(-1); setEditing(emptyT()); };
  const openEdit = (i: number) => { setIsNew(false); setIdx(i); setEditing({ ...data.testimonials[i] }); };
  const close = () => { setEditing(null); setIdx(-1); setIsNew(false); setError(""); };

  const save = async () => {
    if (!editing || !data) return;
    setSaving(true); setError("");
    let testimonials = [...data.testimonials];
    if (isNew) testimonials.unshift(editing);
    else testimonials[idx] = editing;
    const res = await savePatch({ testimonials });
    setSaving(false);
    if (res.ok) close(); else setError(res.error || "Save failed");
  };

  const remove = async (i: number) => {
    if (!data || !confirm("Delete?")) return;
    const res = await savePatch({ testimonials: data.testimonials.filter((_, j) => j !== i) });
    if (!res.ok) alert(res.error || "Delete failed");
  };

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="mono-label">Content Manager</p>
          <h2 className="heading text-3xl mt-2">Testimonials</h2>
        </div>
        <button onClick={openNew} className="btn-gold"><Plus className="h-4 w-4" /> Add Testimonial</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.testimonials.map((t, i) => (
          <div key={i} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
            <div className="flex items-center gap-1 text-gold-400 mb-3">
              {[...Array(t.rating)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="font-serif italic text-ink-700 leading-[1.6]">"{t.quote}"</p>
            <div className="mt-4 flex items-center justify-between pt-4 border-t border-ink-100">
              <div className="flex items-center gap-3">
                <img src={t.avatar} className="h-10 w-10 rounded-full object-cover border-2 border-gold-300" alt={t.name} />
                <div>
                  <p className="font-semibold text-brand-900 text-sm">{t.name}</p>
                  <p className="text-xs text-ink-500">{t.role}</p>
                  {t.course && <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-600 mt-0.5">{t.course}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(i)} className="h-9 w-9 rounded-lg border border-ink-200 hover:border-brand-700 hover:text-brand-800 flex items-center justify-center text-ink-600"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(i)} className="h-9 w-9 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 flex items-center justify-center"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal onClose={close} title={isNew ? "Add Testimonial" : "Edit Testimonial"} onSave={save} saving={saving} error={error}>
          <Field label="Name" required><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputCls} /></Field>
          <Field label="Role · Company"><input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className={inputCls} /></Field>
          <Field label="Course" className="md:col-span-2"><input value={editing.course || ""} onChange={(e) => setEditing({ ...editing, course: e.target.value })} className={inputCls} /></Field>
          <Field label="Avatar URL" className="md:col-span-2"><input value={editing.avatar} onChange={(e) => setEditing({ ...editing, avatar: e.target.value })} className={inputCls} /></Field>
          <Field label="Quote" className="md:col-span-2"><textarea rows={4} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} className={inputCls + " resize-none"} /></Field>
          <Field label="Rating"><input type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })} className={inputCls} /></Field>
        </Modal>
      )}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition";
function Field({ label, children, required, className = "" }: any) {
  return <div className={className}><label className="mono-label mb-2 block">{label} {required && <span className="text-red-500">*</span>}</label>{children}</div>;
}
function Modal({ children, onClose, title, onSave, saving, error }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-ink-100"><h3 className="heading text-xl">{title}</h3><button onClick={onClose} className="h-9 w-9 rounded-lg hover:bg-ink-100 flex items-center justify-center"><X className="h-5 w-5" /></button></div>
        <div className="p-6 grid gap-4 md:grid-cols-2 max-h-[70vh] overflow-y-auto">
          {error && <div className="md:col-span-2 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">{error}</div>}
          {children}
        </div>
        <div className="p-6 border-t border-ink-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="btn-outline" disabled={saving}>Cancel</button>
          <button onClick={onSave} disabled={saving} className="btn-gold">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
