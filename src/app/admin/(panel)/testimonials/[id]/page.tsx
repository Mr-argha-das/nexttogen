import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTestimonialById } from "@/lib/data";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = getTestimonialById(id);
  if (!testimonial) notFound();

  return (
    <div className="space-y-5">
      <div>
        <Link href="/admin/testimonials" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to testimonials
        </Link>
        <h1 className="mt-2 font-heading text-xl font-extrabold sm:text-2xl">{testimonial.name} ka review</h1>
      </div>
      <div className="card p-5">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  );
}
