"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { saveTestimonialAction, type ActionState } from "@/app/admin/actions";
import { Field, TextArea, Toast, Toggle } from "./ui";

export function TestimonialForm({
  testimonial,
  onDone,
}: {
  testimonial?: Testimonial;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState>(null);

  function submit(formData: FormData) {
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.id = testimonial?.id;
    payload.rating = Number(formData.get("rating")) || 5;
    payload.featured = formData.get("featured") === "1";
    payload.published = formData.get("published") === "1";

    startTransition(async () => {
      const result = await saveTestimonialAction(payload);
      setState(result);
      if (result?.ok) {
        router.refresh();
        onDone?.();
      }
    });
  }

  return (
    <form action={submit} className="space-y-4">
      <Toast state={state} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Student name" name="name" defaultValue={testimonial?.name ?? ""} required />
        <Field
          label="Current role / company"
          name="role"
          defaultValue={testimonial?.role ?? ""}
          placeholder="Software Engineer @ Infosys"
        />
        <Field label="Course" name="course" defaultValue={testimonial?.course ?? ""} placeholder="Full Stack Web Development" />
        <div>
          <label className="label" htmlFor="rating">
            Rating
          </label>
          <select id="rating" name="rating" defaultValue={String(testimonial?.rating ?? 5)} className="field">
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {"⭐".repeat(rating)} ({rating})
              </option>
            ))}
          </select>
        </div>
        <Field label="City" name="city" defaultValue={testimonial?.city ?? ""} placeholder="Jaipur" />
        <Field label="Year" name="year" defaultValue={testimonial?.year ?? ""} placeholder="2025" />
        <Field label="Video URL (optional)" name="videoUrl" defaultValue={testimonial?.videoUrl ?? ""} className="sm:col-span-2" />
      </div>
      <TextArea
        label="Testimonial message"
        name="message"
        defaultValue={testimonial?.message ?? ""}
        required
        rows={4}
        hint="Keep the student&apos;s own words — the more natural it sounds, the more convincing it is"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Toggle name="published" label="Show on the website" defaultChecked={testimonial?.published ?? true} />
        <Toggle
          name="featured"
          label="Featured review"
          defaultChecked={testimonial?.featured ?? false}
          hint="Shown on the home page and at the top of the testimonials page"
        />
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Saving…
          </>
        ) : testimonial ? (
          "Save changes"
        ) : (
          "Add testimonial"
        )}
      </button>
    </form>
  );
}
