"use client";

import { useState } from "react";
import { useSiteData } from "@/lib/siteData";
import { BlogPost } from "@/lib/data";
import { slugify } from "@/lib/utils";
import { Plus, Pencil, Trash2, Save, X, Clock, Loader2 } from "lucide-react";

const emptyP = (): BlogPost => ({
  slug: "",
  title: "New Blog Post Title",
  excerpt: "Short excerpt of the post.",
  category: "Learning",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
  readTime: "5 min read",
  author: "NextToGen Team",
  avatar: "https://i.pravatar.cc/100?img=12",
  image: ""
});

export default function AdminPosts() {
  const { data, savePatch } = useSiteData();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openNew = () => { setIsNew(true); setEditing(emptyP()); };
  const openEdit = (p: BlogPost) => { setIsNew(false); setEditing({ ...p }); };
  const close = () => { setEditing(null); setIsNew(false); setError(""); };

  const save = async () => {
    if (!editing || !data) return;
    setSaving(true); setError("");
    const final = { ...editing, slug: editing.slug || slugify(editing.title) };
    let posts = [...data.posts];
    if (isNew) posts.unshift(final);
    else posts = posts.map((p) => (p.slug === editing.slug ? final : p));
    const res = await savePatch({ posts });
    setSaving(false);
    if (res.ok) close(); else setError(res.error || "Save failed");
  };

  const remove = async (slug: string) => {
    if (!data || !confirm("Delete?")) return;
    const res = await savePatch({ posts: data.posts.filter((p) => p.slug !== slug) });
    if (!res.ok) alert(res.error || "Delete failed");
  };

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="mono-label">Content Manager</p>
          <h2 className="heading text-3xl mt-2">Blog Posts</h2>
        </div>
        <button onClick={openNew} className="btn-gold"><Plus className="h-4 w-4" /> New Post</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.posts.map((p) => (
          <div key={p.slug} className="rounded-2xl border border-ink-100 bg-white overflow-hidden shadow-soft">
            <div className="aspect-[16/10] bg-gradient-to-br from-brand-700 to-brand-950 relative">
              <div className="absolute bottom-4 left-4"><span className="rounded-full bg-gold-400 text-brand-950 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">{p.category}</span></div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
                <span>{p.date}</span><span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime}</span>
              </div>
              <h3 className="mt-2 font-display text-[18px] font-semibold text-brand-900 leading-snug tracking-display">{p.title}</h3>
              <p className="mt-1 text-xs text-ink-500">by {p.author}</p>
              <div className="mt-4 flex items-center justify-end gap-2">
                <button onClick={() => openEdit(p)} className="h-9 w-9 rounded-lg border border-ink-200 hover:border-brand-700 hover:text-brand-800 text-ink-600 flex items-center justify-center"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(p.slug)} className="h-9 w-9 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 flex items-center justify-center"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal onClose={close} title={isNew ? "New Post" : "Edit Post"} onSave={save} saving={saving} error={error}>
          <Field label="Title" required className="md:col-span-2"><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputCls} /></Field>
          <Field label="Category"><input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputCls} /></Field>
          <Field label="Read Time"><input value={editing.readTime} onChange={(e) => setEditing({ ...editing, readTime: e.target.value })} className={inputCls} /></Field>
          <Field label="Author"><input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className={inputCls} /></Field>
          <Field label="Date"><input value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className={inputCls} /></Field>
          <Field label="Author Avatar URL" className="md:col-span-2"><input value={editing.avatar} onChange={(e) => setEditing({ ...editing, avatar: e.target.value })} className={inputCls} /></Field>
          <Field label="Excerpt" className="md:col-span-2"><textarea rows={3} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className={inputCls + " resize-none"} /></Field>
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
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
