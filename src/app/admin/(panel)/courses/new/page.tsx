import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseForm } from "@/components/admin/course-form";

export default function NewCoursePage() {
  return (
    <div className="space-y-5">
      <div>
        <Link href="/admin/courses" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
          <ArrowLeft className="h-3.5 w-3.5" /> Courses par wapas
        </Link>
        <h1 className="mt-2 font-heading text-xl font-extrabold sm:text-2xl">Naya course add karein</h1>
        <p className="mt-1 text-[13.5px] text-slate-600">
          Course publish karte hi website ke /courses page par turant dikhne lagega.
        </p>
      </div>
      <CourseForm />
    </div>
  );
}
