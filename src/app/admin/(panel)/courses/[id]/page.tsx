import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getCourseById } from "@/lib/data";
import { CourseForm } from "@/components/admin/course-form";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = getCourseById(id);
  if (!course) notFound();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/admin/courses" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
            <ArrowLeft className="h-3.5 w-3.5" /> Courses par wapas
          </Link>
          <h1 className="mt-2 font-heading text-xl font-extrabold sm:text-2xl">{course.title}</h1>
          <p className="mt-1 text-[13.5px] text-slate-600">
            Slug: /{course.slug} · Last updated: {new Date(course.updatedAt).toLocaleString("en-IN")}
          </p>
        </div>
        <Link href={`/courses/${course.slug}`} target="_blank" className="btn btn-outline btn-sm">
          <ExternalLink className="h-3.5 w-3.5" /> Website par dekhein
        </Link>
      </div>
      <CourseForm course={course} />
    </div>
  );
}
