"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, X, Loader2, ArrowLeft } from "lucide-react";
import type { Course } from "@/lib/types";
import { saveCourseAction, type ActionState } from "@/app/admin/actions";
import { slugify } from "@/lib/utils";
import { Field, TextArea, Toast, Toggle } from "./ui";

export function CourseForm({ course }: { course?: Course }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState>(null);

  const [title, setTitle] = useState(course?.title ?? "");
  const [slug, setSlug] = useState(course?.slug ?? "");
  const [modules, setModules] = useState<{ title: string; topics: string[] }[]>(
    course?.syllabus ?? [{ title: "", topics: [] }],
  );
  const [highlights, setHighlights] = useState<string[]>(course?.highlights ?? [""]);
  const [tools, setTools] = useState<string[]>(course?.tools ?? [""]);

  function submit(formData: FormData) {
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.id = course?.id;
    payload.slug = slug || slugify(title);
    payload.syllabus = modules
      .filter((module) => module.title.trim())
      .map((module) => ({ title: module.title.trim(), topics: module.topics.filter(Boolean) }));
    payload.highlights = highlights.filter((item) => item.trim());
    payload.tools = tools.filter((item) => item.trim());
    payload.placementSupport = formData.get("placementSupport") === "1";
    payload.featured = formData.get("featured") === "1";
    payload.published = formData.get("published") === "1";
    payload.startDate = formData.get("startDate") ? new Date(String(formData.get("startDate"))).toISOString() : null;

    startTransition(async () => {
      const result = await saveCourseAction(payload);
      setState(result);
      if (result?.ok) {
        router.refresh();
        if (!course) router.push("/admin/courses");
      }
    });
  }

  return (
    <form action={submit} className="space-y-5 pb-10">
      <Toast state={state} />

      <div className="card p-5">
        <h2 className="font-heading text-[15px] font-bold">Basic details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="title">
              Course title <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field"
              placeholder="Full Stack Web Development (MERN)"
            />
          </div>
          <Field
            label="URL slug"
            name="slug"
            defaultValue={slug}
            placeholder="full-stack-web-development"
            hint="Leave empty to generate it automatically from the title"
          />
          <Field label="Tagline" name="tagline" defaultValue={course?.tagline ?? ""} placeholder="6 months, 12 projects" />
          <Field label="Category" name="category" defaultValue={course?.category ?? "Web Development"} required />
          <Field label="Duration" name="duration" defaultValue={course?.duration ?? "6 Months"} required />
          <div>
            <label className="label" htmlFor="level">
              Level
            </label>
            <select id="level" name="level" defaultValue={course?.level ?? "Beginner"} className="field">
              {["Beginner", "Intermediate", "Advanced", "All Levels"].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="mode">
              Mode
            </label>
            <select id="mode" name="mode" defaultValue={course?.mode ?? "Offline"} className="field">
              {["Offline", "Online", "Hybrid"].map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>
          <TextArea
            label="Short description"
            name="shortDesc"
            defaultValue={course?.shortDesc ?? ""}
            required
            rows={2}
            className="sm:col-span-2"
            hint="Shown on the card and in search results (max 300 characters)"
          />
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-heading text-[15px] font-bold">Fees & seats</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="Total fees (₹)" name="fee" type="number" defaultValue={course?.fee ?? 0} required min={0} />
          <Field
            label="Discounted fees (₹)"
            name="discountFee"
            type="number"
            defaultValue={course?.discountFee ?? ""}
            min={0}
            hint="Leave empty to show no discount"
          />
          <Field label="Seats" name="seats" type="number" defaultValue={course?.seats ?? 30} min={1} />
          <Field
            label="Next batch start date"
            name="startDate"
            type="date"
            defaultValue={course?.startDate ? course.startDate.slice(0, 10) : ""}
          />
          <Field label="Sort order" name="sortOrder" type="number" defaultValue={course?.sortOrder ?? 0} />
          <Field label="Eligibility" name="eligibility" defaultValue={course?.eligibility ?? ""} />
          <Field label="Certification" name="certification" defaultValue={course?.certification ?? ""} className="sm:col-span-3" />
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-heading text-[15px] font-bold">Description (markdown)</h2>
        <p className="mt-1 text-[12px] text-slate-500">
          Supports ## headings, **bold**, - lists and [link](url).
        </p>
        <div className="mt-3">
          <textarea name="description" rows={10} defaultValue={course?.description ?? ""} required className="field font-mono text-[12.5px]" />
        </div>
      </div>

      {/* Syllabus */}
      <div className="card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-[15px] font-bold">Syllabus modules</h2>
            <p className="mt-1 text-[12px] text-slate-500">Separate each module&apos;s topics with commas.</p>
          </div>
          <button
            type="button"
            onClick={() => setModules([...modules, { title: "", topics: [] }])}
            className="btn btn-outline btn-sm"
          >
            <Plus className="h-3.5 w-3.5" /> Module
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {modules.map((module, index) => (
            <div key={index} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-[12px] font-bold text-brand-700">
                  {index + 1}
                </span>
                <input
                  value={module.title}
                  onChange={(e) => {
                    const next = [...modules];
                    next[index] = { ...module, title: e.target.value };
                    setModules(next);
                  }}
                  placeholder="Module title (for example: Module 1 — Web Foundations)"
                  className="field"
                />
                <button
                  type="button"
                  onClick={() => setModules(modules.filter((_, i) => i !== index))}
                  className="btn btn-sm border border-rose-200 text-rose-600"
                  aria-label="Delete module"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <input
                value={module.topics.join(", ")}
                onChange={(e) => {
                  const next = [...modules];
                  next[index] = {
                    ...module,
                    topics: e.target.value
                      .split(",")
                      .map((topic) => topic.trim())
                      .filter(Boolean),
                  };
                  setModules(next);
                }}
                placeholder="HTML5, CSS3, Flexbox, Git & GitHub"
                className="field mt-3"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Highlights + tools */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-[15px] font-bold">Highlights</h2>
            <button
              type="button"
              onClick={() => setHighlights([...highlights, ""])}
              className="btn btn-outline btn-sm"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={highlight}
                  onChange={(e) => {
                    const next = [...highlights];
                    next[index] = e.target.value;
                    setHighlights(next);
                  }}
                  placeholder="12 industry-level projects"
                  className="field"
                />
                <button
                  type="button"
                  onClick={() => setHighlights(highlights.filter((_, i) => i !== index))}
                  className="btn btn-sm border border-rose-200 text-rose-600"
                  aria-label="Delete highlight"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-[15px] font-bold">Tools & technologies</h2>
            <button type="button" onClick={() => setTools([...tools, ""])} className="btn btn-outline btn-sm">
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {tools.map((tool, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={tool}
                  onChange={(e) => {
                    const next = [...tools];
                    next[index] = e.target.value;
                    setTools(next);
                  }}
                  placeholder="React"
                  className="field"
                />
                <button
                  type="button"
                  onClick={() => setTools(tools.filter((_, i) => i !== index))}
                  className="btn btn-sm border border-rose-200 text-rose-600"
                  aria-label="Delete tool"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO + visibility */}
      <div className="card p-5">
        <h2 className="font-heading text-[15px] font-bold">SEO & visibility</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="SEO title" name="seoTitle" defaultValue={course?.seoTitle ?? ""} hint="Max 60–70 characters" />
          <Field label="SEO description" name="seoDescription" defaultValue={course?.seoDescription ?? ""} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Toggle name="published" label="Publish on the website" defaultChecked={course?.published ?? true} />
          <Toggle name="featured" label="Featured course" defaultChecked={course?.featured ?? false} hint="Home page par dikhega" />
          <Toggle
            name="placementSupport"
            label="Placement support"
            defaultChecked={course?.placementSupport ?? true}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 backdrop-blur">
        <button type="submit" disabled={pending} className="btn btn-primary btn-lg">
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : course ? (
            "Save changes"
          ) : (
            "Publish course"
          )}
        </button>
        <Link href="/admin/courses" className="btn btn-outline">
          <ArrowLeft className="h-4 w-4" /> Cancel
        </Link>
        {course ? (
          <Link href={`/courses/${course.slug}`} target="_blank" className="btn btn-ghost">
            View on the website →
          </Link>
        ) : null}
      </div>
    </form>
  );
}
