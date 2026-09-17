import Link from "next/link";
import { Plus, Pencil, Eye, Star, Users } from "lucide-react";
import { listCourses } from "@/lib/data";
import { formatDate, formatINR } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/ui";
import { deleteCourseAction } from "@/app/admin/actions";

export default function AdminCoursesPage() {
  const courses = listCourses({ includeUnpublished: true });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Courses</h1>
          <p className="mt-1 text-[13.5px] text-slate-600">
            {courses.length} courses · {courses.filter((course) => course.published).length} published
          </p>
        </div>
        <Link href="/admin/courses/new" className="btn btn-primary btn-sm">
          <Plus className="h-4 w-4" /> Add a new course
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[13px]">
            <thead className="bg-canvas text-[11.5px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Course</th>
                <th className="px-5 py-3 font-semibold">Fees</th>
                <th className="px-5 py-3 font-semibold">Mode / Duration</th>
                <th className="px-5 py-3 font-semibold">Next batch</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => {
                const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
                return (
                  <tr key={course.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="flex items-start gap-2">
                        {course.featured ? <Star className="mt-0.5 h-3.5 w-3.5 fill-amber-400 text-amber-400" /> : null}
                        <div>
                          <p className="font-semibold text-ink">{course.title}</p>
                          <p className="text-[11.5px] text-slate-500">
                            {course.category} · /{course.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-ink">{formatINR(payable)}</p>
                      {course.discountFee && course.discountFee < course.fee ? (
                        <p className="text-[11.5px] text-slate-400 line-through">{formatINR(course.fee)}</p>
                      ) : null}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {course.mode}
                      <span className="block text-[11.5px] text-slate-400">{course.duration}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {course.startDate ? formatDate(course.startDate) : "Every month"}
                      <span className="flex items-center gap-1 text-[11.5px] text-slate-400">
                        <Users className="h-3 w-3" /> {course.seats} seats
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          course.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {course.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/courses/${course.slug}`} target="_blank" className="btn btn-outline btn-sm">
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <Link href={`/admin/courses/${course.id}`} className="btn btn-outline btn-sm">
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </Link>
                        <DeleteButton
                          action={deleteCourseAction}
                          id={course.id}
                          label=""
                          confirmText={`Delete "${course.title}"?`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!courses.length ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    <p className="font-heading text-base font-bold">No courses yet</p>
                    <p className="mt-1 text-[13px] text-slate-500">Add your first course to get started.</p>
                    <Link href="/admin/courses/new" className="btn btn-primary mt-4">
                      <Plus className="h-4 w-4" /> New course
                    </Link>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
