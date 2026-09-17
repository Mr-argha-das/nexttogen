import Link from "next/link";
import { Pencil, Plus, Star } from "lucide-react";
import { listTestimonials } from "@/lib/data";
import { truncate } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/ui";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { deleteTestimonialAction } from "@/app/admin/actions";

export default function AdminTestimonialsPage() {
  const testimonials = listTestimonials({ includeUnpublished: true });
  const average =
    testimonials.length
      ? (testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length).toFixed(1)
      : "—";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Testimonials</h1>
          <p className="mt-1 text-[13.5px] text-slate-600">
            {testimonials.length} reviews · {testimonials.filter((item) => item.featured).length} featured · average{" "}
            {average}★
          </p>
        </div>
      </div>

      {/* Inline create form */}
      <details className="card overflow-hidden">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 font-heading text-[15px] font-bold">
          <Plus className="h-4 w-4 text-brand-600" /> Naya testimonial add karein
        </summary>
        <div className="border-t border-slate-100 p-5">
          <TestimonialForm />
        </div>
      </details>

      <div className="grid gap-4 lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 font-heading text-[15px] font-bold text-ink">
                  {testimonial.name}
                  {testimonial.featured ? <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> : null}
                </p>
                <p className="text-[12.5px] text-slate-500">
                  {testimonial.role ?? testimonial.course} {testimonial.city ? `· ${testimonial.city}` : ""}
                </p>
              </div>
              <span className="shrink-0 text-[12px] text-amber-500">{"★".repeat(testimonial.rating)}</span>
            </div>
            <p className="mt-3 text-[13px] leading-6 text-slate-600">{truncate(testimonial.message, 200)}</p>
            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  testimonial.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                }`}
              >
                {testimonial.published ? "Live" : "Hidden"}
              </span>
              <Link href={`/admin/testimonials/${testimonial.id}`} className="btn btn-outline btn-sm ml-auto">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Link>
              <DeleteButton
                action={deleteTestimonialAction}
                id={testimonial.id}
                label=""
                confirmText={`${testimonial.name} ka testimonial delete karna hai?`}
              />
            </div>
          </div>
        ))}
        {!testimonials.length ? (
          <p className="card p-6 text-center text-[13.5px] text-slate-500">
            Abhi koi testimonial nahi hai — upar se add kar lijiye.
          </p>
        ) : null}
      </div>
    </div>
  );
}
