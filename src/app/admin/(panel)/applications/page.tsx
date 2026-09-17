import Link from "next/link";
import { CalendarCheck, Mail, MapPin, Phone, Search } from "lucide-react";
import { listApplications } from "@/lib/data";
import { cn, formatDate, relativeTime } from "@/lib/utils";
import { DeleteButton, StatusPill } from "@/components/admin/ui";
import { deleteApplicationAction, updateApplicationAction } from "@/app/admin/actions";

const STATUSES = [
  { key: "ALL", label: "All" },
  { key: "NEW", label: "Naye" },
  { key: "CONTACTED", label: "Contacted" },
  { key: "ENROLLED", label: "Enrolled" },
  { key: "REJECTED", label: "Rejected" },
];

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "ALL";
  const query = params.q?.trim().toLowerCase();

  let applications = listApplications({ status });
  if (query) {
    applications = applications.filter(
      (application) =>
        application.fullName.toLowerCase().includes(query) ||
        application.email.toLowerCase().includes(query) ||
        application.phone.includes(query) ||
        (application.courseName ?? "").toLowerCase().includes(query),
    );
  }

  const all = listApplications();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Applications</h1>
          <p className="mt-1 text-[13.5px] text-slate-600">
            {all.length} total · {all.filter((item) => item.status === "NEW").length} naye ·{" "}
            {all.filter((item) => item.status === "ENROLLED").length} enrolled
          </p>
        </div>
        <form action="/admin/applications" method="get" className="flex gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="Search by name, phone or email"
              className="field pl-9 sm:w-72"
            />
          </div>
          <button type="submit" className="btn btn-outline">
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((item) => (
          <Link
            key={item.key}
            href={item.key === "ALL" ? "/admin/applications" : `/admin/applications?status=${item.key}`}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold",
              status === item.key
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-brand-300",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {applications.map((application) => {
          const waText = encodeURIComponent(
            `Hello ${application.fullName}, thank you for your enquiry about ${application.courseName ?? "our course"} — our team tried to reach you on ${new Date().toLocaleDateString("en-IN")}. When would be a good time to call you?`,
          );
          return (
            <div key={application.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-heading text-[15.5px] font-bold text-ink">{application.fullName}</h2>
                    <StatusPill status={application.status} />
                    <span className="text-[11.5px] text-slate-400">
                      {relativeTime(application.createdAt)} · {formatDate(application.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] font-medium text-brand-700">{application.courseName ?? "No course selected"}</p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-[12.5px] text-slate-600">
                    <a href={`tel:${application.phone}`} className="flex items-center gap-1.5 hover:text-brand-700">
                      <Phone className="h-3.5 w-3.5" /> {application.phone}
                    </a>
                    <a href={`mailto:${application.email}`} className="flex items-center gap-1.5 hover:text-brand-700">
                      <Mail className="h-3.5 w-3.5" /> {application.email}
                    </a>
                    {application.city ? (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {application.city}
                      </span>
                    ) : null}
                    <span className="flex items-center gap-1.5">
                      <CalendarCheck className="h-3.5 w-3.5" /> {application.qualification ?? "—"} ·{" "}
                      {application.preferredMode ?? "—"}
                    </span>
                  </div>
                  {application.message ? (
                    <p className="mt-2 rounded-lg bg-canvas px-3 py-2 text-[12.5px] text-slate-600">
                      “{application.message}”
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/${application.phone.replace(/[^\d]/g, "").slice(-10).padStart(12, "91")}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    WhatsApp
                  </a>
                  <a href={`tel:${application.phone}`} className="btn btn-primary btn-sm">
                    Call
                  </a>
                </div>
              </div>

              <form
                action={updateApplicationAction}
                className="mt-4 flex flex-wrap items-end gap-3 border-t border-slate-100 pt-4"
              >
                <input type="hidden" name="id" value={application.id} />
                <div>
                  <label className="label" htmlFor={`status-${application.id}`}>
                    Status
                  </label>
                  <select id={`status-${application.id}`} name="status" defaultValue={application.status} className="field">
                    {["NEW", "CONTACTED", "ENROLLED", "REJECTED"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-[220px] flex-1">
                  <label className="label" htmlFor={`notes-${application.id}`}>
                    Internal notes (not visible to the student)
                  </label>
                  <input
                    id={`notes-${application.id}`}
                    name="notes"
                    defaultValue={application.notes ?? ""}
                    placeholder="For example: called twice, prefers the evening batch"
                    className="field"
                  />
                </div>
                <button type="submit" className="btn btn-outline btn-sm">
                  Update
                </button>
                <DeleteButton
                  action={deleteApplicationAction}
                  id={application.id}
                  label=""
                  confirmText={`Delete the application from ${application.fullName}?`}
                />
              </form>
            </div>
          );
        })}

        {!applications.length ? (
          <div className="card p-10 text-center">
            <CalendarCheck className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-3 font-heading text-base font-bold">No applications found</p>
            <p className="mt-1 text-[13px] text-slate-500">
              {query ? "Try clearing your search." : "Applications will appear here once students submit the apply form."}
            </p>
            {status !== "ALL" ? (
              <Link href="/admin/applications" className="btn btn-outline mt-4">
                View all applications
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
