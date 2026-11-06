"use client";

import { useState } from "react";
import { useSiteData } from "@/lib/siteData";
import { Course } from "@/lib/data";
import { slugify } from "@/lib/utils";
import ImageUpload from "@/components/ImageUpload";
import RichTextArea from "@/components/RichTextArea";
import {
  Plus, Pencil, Trash2, Save, X, BookOpen, Star, Clock, Users, Loader2, Trash, ListPlus
} from "lucide-react";

const accents = [
  "from-brand-700 to-brand-950",
  "from-gold-500 to-gold-700",
  "from-brand-800 to-brand-600",
  "from-gold-500 to-brand-700",
  "from-brand-700 to-brand-900",
  "from-gold-600 to-brand-900",
  "from-brand-600 to-brand-900",
  "from-brand-900 to-gold-600"
];

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
  instructorBio: "",
  image: "",
  bannerImage: "",
  accent: "from-brand-700 to-brand-950",
  description: "Short tagline for cards.",
  longDescription:
    "Write a detailed multi-paragraph description here.\n\nSeparate paragraphs with a blank line.\n\n- Bullet points start with \"- \"\n- Like this one\n- One more",
  whatYouLearn: [
    "Outcome one that students can point to",
    "Outcome two with a concrete deliverable",
    "Outcome three showing competence",
    "Outcome four relevant to jobs"
  ],
  requirements: [
    "A laptop with at least 8GB RAM",
    "Commitment of 10–12 hours per week",
    "Curiosity and willingness to build"
  ],
  curriculum: [
    { title: "Module 1 · Foundations", lessons: ["Welcome & orientation", "Core concepts", "First project"] },
    { title: "Module 2 · Applied Practice", lessons: ["Guided builds", "Mentor office hours", "Mid-module quiz"] },
    { title: "Module 3 · Capstone", lessons: ["Problem scoping", "Build week", "Presentation"] }
  ],
  includes: [
    "Lifetime access to content",
    "1:1 weekly mentorship",
    "Hands-on capstone projects",
    "Certificate of completion",
    "Career support & referrals",
    "Private alumni community"
  ]
});

export default function AdminCoursesPage() {
  const { data, savePatch } = useSiteData();
  const [editing, setEditing] = useState<Course | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const openNew = () => { setIsNew(true); setEditing(emptyCourse()); };
  const openEdit = (c: Course) => { setIsNew(false); setEditing(JSON.parse(JSON.stringify({ ...emptyCourse(), ...c }))); };
  const close = () => { setEditing(null); setIsNew(false); setError(""); };

  const save = async () => {
    if (!editing || !data) return;
    setSaving(true); setError("");
    const final = { ...editing, slug: editing.slug || slugify(editing.title) };
    let courses = [...data.courses];
    if (isNew) courses.unshift(final);
    else courses = courses.map((c) => (c.slug === final.slug || c.slug === editing.slug ? final : c));
    const res = await savePatch({ courses });
    setSaving(false);
    if (res.ok) close();
    else setError(res.error || "Save failed");
  };

  const remove = async (slug: string, title: string) => {
    if (!data || !confirm(`Delete "${title}"?`)) return;
    await savePatch({ courses: data.courses.filter((c: Course) => c.slug !== slug) });
  };

  // Curriculum helpers
  const addModule = () => editing && setEditing({ ...editing, curriculum: [...(editing.curriculum || []), { title: "New Module", lessons: ["Lesson 1"] }] });
  const updateModule = (i: number, patch: Partial<{ title: string; lessons: string[] }>) => {
    if (!editing?.curriculum) return;
    const next = [...editing.curriculum];
    next[i] = { ...next[i], ...patch };
    setEditing({ ...editing, curriculum: next });
  };
  const removeModule = (i: number) => editing?.curriculum && setEditing({ ...editing, curriculum: editing.curriculum.filter((_, idx) => idx !== i) });
  const addLesson = (mi: number) => editing?.curriculum && updateModule(mi, { lessons: [...editing.curriculum[mi].lessons, "New lesson"] });
  const updateLesson = (mi: number, li: number, v: string) => {
    if (!editing?.curriculum) return;
    const ls = [...editing.curriculum[mi].lessons];
    ls[li] = v;
    updateModule(mi, { lessons: ls });
  };
  const removeLesson = (mi: number, li: number) => {
    if (!editing?.curriculum) return;
    updateModule(mi, { lessons: editing.curriculum[mi].lessons.filter((_, idx) => idx !== li) });
  };

  // string list helpers
  const setList = (key: "whatYouLearn" | "requirements" | "includes", val: string[]) =>
    editing && setEditing({ ...editing, [key]: val });
  const updateListItem = (key: "whatYouLearn" | "requirements" | "includes", i: number, v: string) => {
    if (!editing) return;
    const list = [...(editing[key] || [])];
    list[i] = v;
    setList(key, list);
  };
  const addListItem = (key: "whatYouLearn" | "requirements" | "includes", placeholder: string) =>
    editing && setList(key, [...(editing[key] || []), placeholder]);
  const removeListItem = (key: "whatYouLearn" | "requirements" | "includes", i: number) =>
    editing && setList(key, (editing[key] || []).filter((_, idx) => idx !== i));

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="mono-label">Content Manager</p>
          <h2 className="heading text-3xl mt-2">Courses</h2>
          <p className="text-ink-500 text-sm mt-1">Add/Edit banners, full descriptions, curriculum, outcomes — everything shown on the course detail page.</p>
        </div>
        <button onClick={openNew} className="btn-gold"><Plus className="h-4 w-4" /> Add Course</button>
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
                      {c.bannerImage || c.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.bannerImage || c.image} alt="" className="h-10 w-14 rounded-lg object-cover shrink-0 border border-ink-100" />
                      ) : (
                        <div className={`h-10 w-14 rounded-lg bg-gradient-to-br ${c.accent} flex items-center justify-center text-white shrink-0`}>
                          <BookOpen className="h-4 w-4" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-brand-900 truncate max-w-[220px]">{c.title}</p>
                        <p className="text-xs text-ink-500 truncate">{c.instructor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink-700">{c.category}</td>
                  <td className="px-6 py-4"><span className="rounded-full bg-brand-50 text-brand-800 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold">{c.level}</span></td>
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
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center p-2 sm:p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-4">
              <div className="flex items-center justify-between p-5 border-b border-ink-100 sticky top-0 bg-white z-10 rounded-t-2xl">
                <div>
                  <p className="mono-label">{isNew ? "Create" : "Edit"} Course</p>
                  <h3 className="heading text-xl mt-0.5">{editing.title}</h3>
                </div>
                <button onClick={close} className="h-9 w-9 rounded-lg hover:bg-ink-100 flex items-center justify-center"><X className="h-5 w-5" /></button>
              </div>

              <div className="p-5 sm:p-6 space-y-8">
                {error && <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">{error}</div>}

                {/* BASIC */}
                <Section title="Basic Info">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Title" required className="md:col-span-2">
                      <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: isNew ? "" : editing.slug })} className={inputCls} />
                    </Field>
                    <Field label="Category">
                      <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputCls}>
                        <option>Data & AI</option><option>Design</option><option>Business</option><option>Marketing</option><option>Career Skills</option>
                      </select>
                    </Field>
                    <Field label="Level"><select value={editing.level} onChange={(e) => setEditing({ ...editing, level: e.target.value as Course["level"] })} className={inputCls}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></Field>
                    <Field label="Duration"><input value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} className={inputCls} placeholder="e.g. 6 months" /></Field>
                    <Field label="Lessons"><input type="number" value={editing.lessons} onChange={(e) => setEditing({ ...editing, lessons: parseInt(e.target.value) || 0 })} className={inputCls} /></Field>
                    <Field label="Students"><input type="number" value={editing.students} onChange={(e) => setEditing({ ...editing, students: parseInt(e.target.value) || 0 })} className={inputCls} /></Field>
                    <Field label="Rating (0–5)"><input type="number" step="0.1" min={0} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseFloat(e.target.value) || 0 })} className={inputCls} /></Field>
                    <Field label="Bestseller?" className="md:col-span-2">
                      <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editing.bestseller} onChange={(e) => setEditing({ ...editing, bestseller: e.target.checked })} className="accent-gold-500 h-4 w-4" /> Mark as bestseller</label>
                    </Field>
                    <Field label="Short Description (cards)" className="md:col-span-2">
                      <textarea rows={2} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={inputCls + " resize-none"} />
                    </Field>
                    <Field label="Accent color (fallback if no image)" className="md:col-span-2">
                      <div className="flex flex-wrap gap-2">
                        {accents.map((a) => (
                          <button key={a} type="button" onClick={() => setEditing({ ...editing, accent: a })} className={`h-9 w-16 rounded-lg bg-gradient-to-br ${a} ring-2 ${editing.accent === a ? "ring-brand-800" : "ring-transparent"} transition`} />
                        ))}
                      </div>
                    </Field>
                  </div>
                </Section>

                {/* MEDIA */}
                <Section title="Media">
                  <div className="grid gap-6 md:grid-cols-2">
                    <ImageUpload
                      label="Banner Image (detail page hero)"
                      hint="16:9 recommended · shown at top of /courses/[slug]"
                      aspect="aspect-[16/9]"
                      value={editing.bannerImage || ""}
                      onChange={(url) => setEditing({ ...editing, bannerImage: url })}
                    />
                    <ImageUpload
                      label="Card Image (course card thumbnail)"
                      hint="16:10 recommended · course listing cards"
                      aspect="aspect-[16/10]"
                      value={editing.image}
                      onChange={(url) => setEditing({ ...editing, image: url })}
                    />
                  </div>
                </Section>

                {/* INSTRUCTOR */}
                <Section title="Instructor">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Name"><input value={editing.instructor} onChange={(e) => setEditing({ ...editing, instructor: e.target.value })} className={inputCls} /></Field>
                    <Field label="Role / Title"><input value={editing.instructorRole} onChange={(e) => setEditing({ ...editing, instructorRole: e.target.value })} className={inputCls} placeholder="e.g. Ex-Google Research Scientist" /></Field>
                    <Field label="Short Bio" className="md:col-span-2">
                      <textarea rows={3} value={editing.instructorBio || ""} onChange={(e) => setEditing({ ...editing, instructorBio: e.target.value })} className={inputCls + " resize-none"} placeholder="A 1–3 line bio about the instructor." />
                    </Field>
                  </div>
                </Section>

                {/* FULL DESCRIPTION */}
                <Section title="Full Description (detail page body)">
                  <Field label="Long description">
                    <RichTextArea
                      value={editing.longDescription || ""}
                      onChange={(v) => setEditing({ ...editing, longDescription: v })}
                      minHeight={200}
                      placeholder={"Write paragraphs separated by blank lines.\n\n- Use lines starting with '- ' for bullets\n- Like this one"}
                    />
                    <p className="mt-1 text-[11px] text-ink-400">Blank line = new paragraph. Lines starting with "- " become bullets.</p>
                  </Field>
                </Section>

                {/* WHAT YOU LEARN */}
                <ListEditor
                  title="What You'll Learn"
                  items={editing.whatYouLearn || []}
                  onAdd={() => addListItem("whatYouLearn", "New learning outcome")}
                  onUpdate={(i, v) => updateListItem("whatYouLearn", i, v)}
                  onRemove={(i) => removeListItem("whatYouLearn", i)}
                />

                {/* REQUIREMENTS */}
                <ListEditor
                  title="Requirements"
                  items={editing.requirements || []}
                  onAdd={() => addListItem("requirements", "New requirement")}
                  onUpdate={(i, v) => updateListItem("requirements", i, v)}
                  onRemove={(i) => removeListItem("requirements", i)}
                />

                {/* INCLUDES */}
                <ListEditor
                  title="This Course Includes (sidebar bullets)"
                  items={editing.includes || []}
                  onAdd={() => addListItem("includes", "New feature bullet")}
                  onUpdate={(i, v) => updateListItem("includes", i, v)}
                  onRemove={(i) => removeListItem("includes", i)}
                />

                {/* CURRICULUM */}
                <Section title="Curriculum">
                  <div className="space-y-4">
                    {(editing.curriculum || []).map((mod, mi) => (
                      <div key={mi} className="rounded-xl border border-ink-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="mono-label">Module {mi + 1}</span>
                          <input value={mod.title} onChange={(e) => updateModule(mi, { title: e.target.value })} className={inputCls + " flex-1"} />
                          <button type="button" onClick={() => removeModule(mi)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 shrink-0"><Trash className="h-4 w-4" /></button>
                        </div>
                        <div className="space-y-2 pl-2">
                          {mod.lessons.map((ls, li) => (
                            <div key={li} className="flex items-center gap-2">
                              <span className="text-ink-400 text-xs w-5 text-right">{li + 1}.</span>
                              <input value={ls} onChange={(e) => updateLesson(mi, li, e.target.value)} className={inputCls + " flex-1"} />
                              <button type="button" onClick={() => removeLesson(mi, li)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 shrink-0"><X className="h-4 w-4" /></button>
                            </div>
                          ))}
                          <button type="button" onClick={() => addLesson(mi)} className="text-xs font-semibold text-brand-700 hover:text-gold-600 inline-flex items-center gap-1 mt-1"><ListPlus className="h-3.5 w-3.5" /> Add lesson</button>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={addModule} className="btn-outline text-sm">+ Add Module</button>
                  </div>
                </Section>
              </div>

              <div className="p-5 border-t border-ink-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white rounded-b-2xl">
                <button onClick={close} className="btn-outline" disabled={saving}>Cancel</button>
                <button onClick={save} disabled={saving} className="btn-gold">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {saving ? "Saving…" : isNew ? "Create Course" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="mono-label !text-brand-800 mb-4 flex items-center gap-2"><span className="h-1 w-6 bg-gold-400 rounded-full" /> {title}</h4>
      {children}
    </section>
  );
}

function ListEditor({ title, items, onAdd, onUpdate, onRemove }: {
  title: string; items: string[];
  onAdd: () => void; onUpdate: (i: number, v: string) => void; onRemove: (i: number) => void;
}) {
  return (
    <Section title={title}>
      <div className="space-y-2">
        {items.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={v} onChange={(e) => onUpdate(i, e.target.value)} className={inputCls + " flex-1"} />
            <button type="button" onClick={() => onRemove(i)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 shrink-0"><Trash className="h-4 w-4" /></button>
          </div>
        ))}
        <button type="button" onClick={onAdd} className="btn-outline text-sm">+ Add Item</button>
      </div>
    </Section>
  );
}

const inputCls = "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition";
function Field({ label, children, required, className = "" }: any) {
  return <div className={className}><label className="mono-label mb-2 block">{label} {required && <span className="text-red-500">*</span>}</label>{children}</div>;
}
