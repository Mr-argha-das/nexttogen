"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { savePostAction, type ActionState } from "@/app/admin/actions";
import { readingTime, slugify } from "@/lib/utils";
import { Field, TextArea, Toast, Toggle } from "./ui";

const CATEGORIES = ["Career", "Web Development", "Data & AI", "Digital Marketing", "Cyber Security", "Interview Tips", "Student Life"];

export function BlogForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState>(null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tags, setTags] = useState((post?.tags ?? []).join(", "));

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;

  function submit(formData: FormData) {
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.id = post?.id;
    payload.slug = String(formData.get("slug") || slugify(title));
    payload.tags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    payload.featured = formData.get("featured") === "1";
    payload.published = formData.get("published") === "1";
    payload.readMinutes = Number(formData.get("readMinutes")) || readingTime(content);
    payload.publishedAt = formData.get("publishedAt")
      ? new Date(String(formData.get("publishedAt"))).toISOString()
      : new Date().toISOString();

    startTransition(async () => {
      const result = await savePostAction(payload);
      setState(result);
      if (result?.ok) {
        router.refresh();
        if (!post) router.push("/admin/blogs");
      }
    });
  }

  return (
    <form action={submit} className="space-y-5 pb-10">
      <Toast state={state} />

      <div className="card p-5">
        <h2 className="font-heading text-[15px] font-bold">Blog details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="title">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field"
              placeholder="How to Build a Career in Web Development in 2026"
            />
          </div>
          <Field label="URL slug" name="slug" defaultValue={post?.slug ?? ""} placeholder="web-development-career-2026" />
          <div>
            <label className="label" htmlFor="category">
              Category
            </label>
            <select id="category" name="category" defaultValue={post?.category ?? "Career"} className="field">
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <TextArea
            label="Excerpt (shown in the listing)"
            name="excerpt"
            defaultValue={post?.excerpt ?? ""}
            required
            rows={2}
            className="sm:col-span-2"
          />
          <Field label="Author" name="author" defaultValue={post?.author ?? "NextToGen Team"} />
          <Field label="Author role" name="authorRole" defaultValue={post?.authorRole ?? ""} placeholder="Lead Trainer — Web Development" />
          <div className="sm:col-span-2">
            <label className="label" htmlFor="tags">
              Tags (comma se separate)
            </label>
            <input
              id="tags"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="field"
              placeholder="Web Development, Roadmap, Fresher Jobs"
            />
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-[15px] font-bold">Content</h2>
          <p className="text-[12px] text-slate-500">
            {words} words · approx {readingTime(content)} min read
          </p>
        </div>
        <p className="mt-1 text-[12px] text-slate-500">
          Markdown support: <code className="rounded bg-slate-100 px-1">## Heading</code>,{" "}
          <code className="rounded bg-slate-100 px-1">**bold**</code>,{" "}
          <code className="rounded bg-slate-100 px-1">- list</code>,{" "}
          <code className="rounded bg-slate-100 px-1">[link](url)</code>
        </p>
        <textarea
          name="content"
          rows={16}
          required
          minLength={50}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="field mt-3 font-mono text-[12.5px]"
          placeholder={"## Introduction\nStart writing here…\n\n- Point 1\n- Point 2"}
        />
      </div>

      <div className="card p-5">
        <h2 className="flex items-center gap-2 font-heading text-[15px] font-bold">
          <Sparkles className="h-4 w-4 text-brand-600" /> SEO & publishing
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="SEO title" name="seoTitle" defaultValue={post?.seoTitle ?? ""} hint="Leave empty to use the title" />
          <Field label="SEO description" name="seoDescription" defaultValue={post?.seoDescription ?? ""} />
          <Field
            label="Publish date"
            name="publishedAt"
            type="date"
            defaultValue={post ? post.publishedAt.slice(0, 10) : new Date().toISOString().slice(0, 10)}
          />
          <Field label="Read minutes" name="readMinutes" type="number" defaultValue={post?.readMinutes ?? 4} min={1} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Toggle name="published" label="Publish" defaultChecked={post?.published ?? true} hint="Turn off to keep it as a draft" />
          <Toggle name="featured" label="Featured post" defaultChecked={post?.featured ?? false} hint="Blog page ke top par bada card" />
        </div>
      </div>

      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 backdrop-blur">
        <button type="submit" disabled={pending} className="btn btn-primary btn-lg">
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : post ? (
            "Save changes"
          ) : (
            "Publish post"
          )}
        </button>
        <Link href="/admin/blogs" className="btn btn-outline">
          <ArrowLeft className="h-4 w-4" /> Cancel
        </Link>
        {post ? (
          <Link href={`/blog/${post.slug}`} target="_blank" className="btn btn-ghost">
            View on the website →
          </Link>
        ) : null}
      </div>
    </form>
  );
}
