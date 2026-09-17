"use client";

import { useEffect, useState } from "react";
import { useSiteData } from "@/lib/siteData";
import { Course } from "@/lib/data";
import { slugify } from "@/lib/utils";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  BookOpen,
  Star,
  Clock,
  Users,
  Loader2
} from "lucide-react";

const emptyCourse = (): Course => ({
  slug: "",
  title: "New Course",
  category: "Data & AI",
  level: "Beginner",
  duration: "3 months",
  lessons: 40,
  rating: 4.8,
  reviews: 0,
  price: "",
  oldPrice: "",
  students: 0,
  instructor: "Instructor Name",
  instructorRole: "Instructor Role",
  image: "",
  accent: "from-brand-700 to-brand-950",
  description: "Write a short description here."
});

export default function AdminCoursesPage() {
  const { data, savePatch } = useSiteData();
  const [editing, setEditing] = useState<Course | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openNew = () => { setIsNew(true); setEditing(emptyCourse()); };
  const openEdit = (c: Course) => { setIsNew(false); setEditing({ ...c }); };
  const close = () => { setEditing(null); setIsNew(false); setError(""); };

  const save = async () => {
    if (!editing || !data) return;
    setSaving(true); setError("");
    const slug = editing.slug || slugify(editing.title);
    const final = { ...editing, slug };
    let courses = [...data.courses];
    if (isNew) {
      courses.unshift(final);
    } else {
      courses = courses.map((c) => (c.slug === final.slug || c.slug === editing.slug ? final : c));
    }
    const res = await savePatch({ courses });
    setSaving(false);
    if (res.ok) close();
    else setError(res.error || "Save failed");
  };

  const remove = async (slug: string, title: string) => {
    if (!data || !confirm(`Delete "${title}"?`)) return;
    const res = await savePatch({ courses: data.courses.filter((c: Course) => c.slug !== slug) });
    if (!res.ok) alert(res.error || "Delete failed");
  };

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="mono-label">Content Manager</p>
          <h2 className="heading text-3xl mt-2">Courses</h2>
        </div>
        <button onClick={openNew} className="btn-gold">
          <Plus className="h-4 w-4" /> Add Course
        </button>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-50/60">
              <tr className="text-left">
                <th className="px-6 py-4 mono-label">Course</th>
                <th className="px-6 py-4 mono-label">Category</th>
                <th className="px-6 py-4 mono-label">Level</th>
                <th className="px-6 py-4 mono-label">Duration</th>
                <th className="px-6 py-4 mono-label">Students</th>
                <th className="px-6 py-4 mono-label text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {data.courses.map((c) => (
                <tr key={c.slug} className="hover:bg-brand-50/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${c.accent} flex items-center justify-center text-white shrink-0`}>
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-brand-900 max-w-xs truncate">{c.title}</p>
                        <p className="text-xs text-ink-500 flex items-center gap-2 mt-0.5">
                          <Star className="h-3 w-3 fill-gold-400 text-gold-400" /> {c.rating}
                          <span className="text-ink-300">·</span>{c.instructor}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink-700">{c.category}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-brand-50 text-brand-800 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold">{c.level}</span>
                  </td>
                  <td className="px-6 py-4 text-ink-700 inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {c.duration}</td>
                  <td className="px-6 py-4 text-ink-700 inline-flex items-center gap-1"><Users className="h-3 w-3" /> {c.students.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(c)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600 hover:border-brand-700 hover:text-brand-800 transition"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => remove(c.slug, c.title)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-ink-100">
              <h3 className="heading text-xl">{isNew ? "Add New Course" : "Edit Course"}</h3>
              <button onClick={close} className="h-9 w-9 rounded-lg hover:bg-ink-100 flex items-center justify-center"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 grid gap-4 md:grid-cols-2 max-h-[70vh] overflow-y-auto">
              {error && <div className="md:col-span-2 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">{error}</div>}
              <Field label="Title" required className="md:col-span-2">
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Category">
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputCls}>
                  <option>Data & AI</option><option>Design</option><option>Business</option><option>Marketing</option><option>Career Skills</option>
                </select>
              </Field>
              <Field label="Level">
                <select value={editing.level} onChange={(e) => setEditing({ ...editing, level: e.target.value as Course["level"] })} className={inputCls}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </Field>
              <Field label="Duration"><input value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} className={inputCls} /></Field>
              <Field label="Lessons"><input type="number" value={editing.lessons} onChange={(e) => setEditing({ ...editing, lessons: parseInt(e.target.value) || 0 })} className={inputCls} /></Field>
              <Field label="Instructor"><input value={editing.instructor} onChange={(e) => setEditing({ ...editing, instructor: e.target.value })} className={inputCls} /></Field>
              <Field label="Instructor Role"><input value={editing.instructorRole} onChange={(e) => setEditing({ ...editing, instructorRole: e.target.value })} className={inputCls} /></Field>
              <Field label="Students"><input type="number" value={editing.students} onChange={(e) => setEditing({ ...editing, students: parseInt(e.target.value) || 0 })} className={inputCls} /></Field>
              <Field label="Rating (0–5)"><input type="number" step="0.1" min={0} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseFloat(e.target.value) || 0 })} className={inputCls} /></Field>
              <Field label="Bestseller?" className="md:col-span-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!editing.bestseller} onChange={(e) => setEditing({ ...editing, bestseller: e.target.checked })} className="accent-gold-500 h-4 w-4" />
                  Mark as bestseller
                </label>
              </Field>
              <Field label="Short Description" className="md:col-span-2">
                <textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={inputCls + " resize-none"} />
              </Field>
            </div>
            <div className="p-6 border-t border-ink-100 flex items-center justify-end gap-3">
              <button onClick={close} className="btn-outline" disabled={saving}>Cancel</button>
              <button onClick={save} disabled={saving} className="btn-gold">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "Saving…" : isNew ? "Create Course" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition";
function Field({ label, children, required, className = "" }: any) {
  return <div className={className}><label className="mono-label mb-2 block">{label} {required && <span className="text-red-500">*</span>}</label>{children}</div>;
}
