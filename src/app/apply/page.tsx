import type { Metadata } from "next";
import Link from "next/link";
import { Award, CalendarCheck, CheckCircle2, Clock, FileText, Percent, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { getSettings, listCourses } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { SITE_CONTENT } from "@/content/settings";
import { formatINR } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { Orbs } from "@/components/site/decor";
import { ApplyForm } from "@/components/site/apply-form";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { listFaqs } from "@/lib/data";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "Apply Online — Admission form",
    description: `Apply online to ${settings.siteName}. Free counselling, two demo classes, 0% EMI and scholarship options — the form takes about two minutes.`,
    path: "/apply",
    keywords: ["admission form", "apply online", "course admission", `${settings.city} institute admission`],
  });
}

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const params = await searchParams;
  const settings = getSettings();
  const courses = listCourses();
  const faqs = listFaqs().slice(0, 4);
  const cheapest = courses.length ? Math.min(...courses.map((c) => c.discountFee ?? c.fee)) : 0;

  const trust = [
    { icon: CalendarCheck, title: "Callback within 24 hours", text: "Our team contacts you as soon as your form is submitted." },
    { icon: Percent, title: "0% interest EMI", text: "3, 6 or 9 instalments, with no hidden charges." },
    { icon: Award, title: "Scholarships", text: "15% off with 75%+ marks, plus extra concessions for girl students." },
    { icon: ShieldCheck, title: "Demo first, fees later", text: "Attend two free demo classes before you decide." },
  ];

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Apply now"
        title={<>Admission form — <span className="text-gradient">takes about two minutes</span></>}
        description={`Fill in the form and our admission team will call you to arrange a free counselling session. Fees start at ${formatINR(
          cheapest,
        )}, with EMI and scholarship options available.`}
        crumbs={[{ label: "Apply" }]}
      >
        <div className="flex flex-wrap gap-2">
          {["No application fee", "Details safe & private", "Free demo class", "Reply within 24 hours"].map((item) => (
            <span key={item} className="chip chip-glass">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> {item}
            </span>
          ))}
        </div>
      </PageHero>

      {/* ------------------------------ step rail ------------------------------ */}
      <section className="relative z-10 -mt-8">
        <div className="container-x">
          <div className="card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", label: "Submit this form", text: "Takes about two minutes" },
              { step: "02", label: "Counsellor call", text: "Within 24 hours" },
              { step: "03", label: "Free demo class", text: "Attend two, then decide" },
              { step: "04", label: "Confirm your seat", text: "Fees or 0% EMI" },
            ].map(({ step, label, text }, index) => (
              <div key={step} className="relative flex gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--grad-brand)] font-heading text-[12px] font-extrabold text-white">
                  {step}
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-bold text-ink">{label}</p>
                  <p className="text-[12px] text-slate-500">{text}</p>
                </div>
                {index < 3 ? (
                  <span className="absolute -right-2 top-5 hidden h-px w-3 bg-[var(--line-strong)] lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-x grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6">
            <div>
              <p className="eyebrow">Application form</p>
              <h2 className="display-3 mt-3">Tell us about yourself</h2>
              <p className="mt-3 text-[14px] leading-7 text-slate-600">
                Fields marked with * are required. Not sure which course to pick? That is completely fine — a
                counsellor will help you choose during the call.
              </p>
            </div>

            <ApplyForm
              courses={courses.map((course) => ({
                id: course.id,
                slug: course.slug,
                title: course.title,
                fee: course.fee,
                discountFee: course.discountFee,
                duration: course.duration,
                mode: course.mode,
              }))}
              preselected={params.course}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {trust.map(({ icon: Icon, title, text }) => (
                <div key={title} className="card card-hover flex gap-3.5 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--grad-brand)] text-white shadow-[var(--shadow-sm)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-ink">{title}</p>
                    <p className="mt-1 text-[12.5px] leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="card card-hover p-5">
              <h3 className="flex items-center gap-2.5 font-heading text-[15px] font-bold">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <FileText className="h-4 w-4" />
                </span>
                Documents checklist
              </h3>
              <ul className="mt-3 space-y-2.5 text-[13px] text-slate-600">
                {[
                  "Aadhaar card (copy)",
                  "2 passport size photos",
                  "Last qualification marksheet",
                  "Previous course certificate (agar ho)",
                  "Bank details for EMI (optional)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-[12px] text-brand-800">
                Documents can also be sent online by WhatsApp or email — visiting the campus is optional.
              </p>
            </div>

            <div className="card card-hover p-5">
              <h3 className="flex items-center gap-2.5 font-heading text-[15px] font-bold">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Clock className="h-4 w-4" />
                </span>
                Admission process
              </h3>
              <ol className="mt-3 space-y-3">
                {SITE_CONTENT.admissionsSteps.map((step, index) => (
                  <li key={step.step} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11.5px] font-bold text-brand-700">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{step.title}</p>
                      <p className="text-[12px] leading-5 text-slate-500">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card overflow-hidden border-0 shadow-[var(--shadow-lg)]">
              <div className="relative overflow-hidden bg-[var(--grad-brand-deep)] p-5 text-white">
                <Orbs className="opacity-40" />
                <Sparkles className="relative h-5 w-5 text-accent-300" />
                <h3 className="relative mt-2 font-heading text-base font-bold">In a hurry?</h3>
                <p className="relative mt-2 text-[13px] text-white/75">
                  You can also reach us without filling the form — call or message us on WhatsApp.
                </p>
                <div className="relative mt-4 space-y-2">
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-accent w-full">
                    <Phone className="h-4 w-4" /> {settings.phone}
                  </a>
                  <a
                    href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                      "Hello! I would like to know more about admission at your institute.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full border border-white/25 bg-white/10 text-white hover:bg-white/20"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-heading text-[15px] font-bold">Admission FAQs</h3>
              <div className="mt-3">
                <FaqAccordion faqs={faqs} defaultOpen={-1} />
              </div>
              <Link href="/faq" className="mt-3 inline-block text-[13px] font-semibold text-brand-700">
                Read all FAQs →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
