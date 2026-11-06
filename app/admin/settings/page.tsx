"use client";

import { useEffect, useState } from "react";
import { useSiteData } from "@/lib/siteData";
import { Save, RotateCcw, CheckCircle2, Loader2 } from "lucide-react";

export default function AdminSettings() {
  const { data, savePatch } = useSiteData();
  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = async () => {
    setSaving(true);
    const res = await savePatch(form);
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      alert(res.error || "Failed to save");
    }
  };

  const reset = () => {
    if (!confirm("Reset form to current saved values?")) return;
    setForm(data);
  };

  if (!data) return null;

  const set = (k: keyof typeof data, v: any) => setForm({ ...form, [k]: v });

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="mono-label">Configuration</p>
          <h2 className="heading text-3xl mt-2">Site Settings</h2>
          <p className="text-ink-600 mt-2">
            Edits reflect on the live site instantly. All content is stored
            locally in your browser for demo purposes.
          </p>
        </div>
      </div>

      {saved && (
        <div className="rounded-xl bg-green-50 border border-green-200 p-4 flex items-center gap-2 text-sm text-green-800">
          <CheckCircle2 className="h-5 w-5" /> Changes saved successfully!
        </div>
      )}

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft space-y-5">
        <h3 className="heading text-xl">Branding</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Site Name"><input value={form.siteName} onChange={(e) => set("siteName", e.target.value)} className={inputCls} /></Field>
          <Field label="Tagline"><input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className={inputCls} /></Field>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft space-y-5">
        <h3 className="heading text-xl">Hero Section (Homepage)</h3>
        <Field label="Headline"><input value={form.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} className={inputCls} /></Field>
        <Field label="Italic phrase"><input value={form.heroItalic} onChange={(e) => set("heroItalic", e.target.value)} className={inputCls} /></Field>
        <Field label="Description"><textarea rows={3} value={form.heroDescription} onChange={(e) => set("heroDescription", e.target.value)} className={inputCls + " resize-none"} /></Field>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft space-y-5">
        <h3 className="heading text-xl">Contact Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Email"><input value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} className={inputCls} /></Field>
          <Field label="Phone"><input value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} className={inputCls} /></Field>
          <Field label="Address" className="md:col-span-2"><textarea rows={2} value={form.contactAddress} onChange={(e) => set("contactAddress", e.target.value)} className={inputCls + " resize-none"} /></Field>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap pt-4">
        <button onClick={reset} className="btn-outline">
          <RotateCcw className="h-4 w-4" /> Reset to Defaults
        </button>
        <button onClick={save} className="btn-gold">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition";
function Field({ label, children, className = "" }: any) {
  return <div className={className}><label className="mono-label mb-2 block">{label}</label>{children}</div>;
}
