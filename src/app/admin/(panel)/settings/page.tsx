import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";
import { getSettings } from "@/lib/data";
import { SettingsForm } from "@/components/admin/settings-form";
import { ChangePasswordForm } from "@/components/admin/change-password-form";

export default function AdminSettingsPage() {
  const settings = getSettings();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Site settings</h1>
          <p className="mt-1 text-[13.5px] text-slate-600">
            Institute details, contact information, brand colors, the chatbot and donation settings.
          </p>
        </div>
        <Link href="/" target="_blank" className="btn btn-outline btn-sm">
          <ExternalLink className="h-3.5 w-3.5" /> View the website
        </Link>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-brand-50 px-4 py-3 text-[13px] text-brand-900">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Changing the theme colors here instantly restyles the whole site. The institute name, fees, courses, blog
          posts, testimonials and FAQs are all managed from the admin panel too.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-start">
        <SettingsForm settings={settings} />
        <div className="space-y-5 lg:sticky lg:top-24">
          <ChangePasswordForm />
          <div className="card p-5">
            <h2 className="font-heading text-[15px] font-bold">Data & backup</h2>
            <p className="mt-2 text-[12.5px] leading-6 text-slate-600">
              All data lives in a single SQLite file: <code className="rounded bg-slate-100 px-1">data/institute.db</code>.
              Keep a regular copy of it as a backup, and restore by putting the file back in place.
            </p>
            <p className="mt-3 text-[12.5px] leading-6 text-slate-600">
              For a fresh start (deletes all demo data), run in the terminal:{" "}
              <code className="rounded bg-slate-100 px-1">npm run db:reset</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
