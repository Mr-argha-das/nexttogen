import type { Metadata } from "next";
import Link from "next/link";
import { Award, CalendarCheck, CheckCircle2, Clock, FileText, Percent, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { getSettings, listCourses } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { SITE_CONTENT } from "@/content/settings";
import { formatINR } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { ApplyForm } from "@/components/site/apply-form";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { listFaqs } from "@/lib/data";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "Apply Online — Admission form",
    description: `Online admission form — ${settings.siteName} me apply karein. Free counselling, 2 demo classes, 0% EMI aur scholarship option. Form 2 minute me bhar jaata hai.`,
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
    { icon: CalendarCheck, title: "24 ghante me callback", text: "Form bharne ke baad humari team turant contact karti hai." },
    { icon: Percent, title: "0% interest EMI", text: "3, 6 ya 9 instalments — bina kisi hidden charge." },
    { icon: Award, title: "Scholarship", text: "75%+ marks par 15% off, girl students ke liye extra concession." },
    { icon: ShieldCheck, title: "Demo pehle, fees baad me", text: "2 free demo classes ke baad hi decide kijiye." },
  ];

  return (
    <>
      <PageHero
        eyebrow="Apply now"
        title="Admission form — 2 minute me complete"
        description={`Form bharein aur humari admission team aapko call karke free counselling ka slot de degi. Fees ${formatINR(
          cheapest,
        )} se shuru, EMI aur scholarship options ke saath.`}
        crumbs={[{ label: "Apply" }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip chip-neutral">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> No application fee
          </span>
          <span className="chip chip-neutral">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Details safe & private
          </span>
          <span className="chip chip-neutral">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Demo class free
          </span>
        </div>
      </PageHero>

      <section className="section pt-8">
        <div className="container-x grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-bold">Application form</h2>
              <p className="mt-2 text-[14px] text-slate-600">
                * wale fields zaroori hain. Course confirm nahi hai? Koi baat nahi — “Other / Not sure” me rehne dijiye,
                counsellor aapko sahi course suggest karega.
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
                <div key={title} className="card flex gap-3 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
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
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-heading text-[15px] font-bold">
                <FileText className="h-4 w-4 text-brand-600" /> Documents checklist
              </h3>
              <ul className="mt-3 space-y-2.5 text-[13px] text-slate-600">
                {[
                  "Aadhaar card (copy)",
                  "2 passport size photos",
                  "Last qualification ki marksheet",
                  "Previous course certificate (agar ho)",
                  "Bank details / EMI ke liye (optional)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-[12px] text-brand-800">
                Documents online (WhatsApp/email) bhi bhej sakte hain — campus aana zaroori nahi.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-heading text-[15px] font-bold">
                <Clock className="h-4 w-4 text-brand-600" /> Admission process
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

            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
                <Sparkles className="h-5 w-5 text-accent-100" />
                <h3 className="mt-2 font-heading text-base font-bold">Jaldi karna chahte hain?</h3>
                <p className="mt-2 text-[13px] text-white/80">
                  Form ke bina bhi baat kar sakte hain — seedha call ya WhatsApp kijiye.
                </p>
                <div className="mt-4 space-y-2">
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-accent w-full">
                    <Phone className="h-4 w-4" /> {settings.phone}
                  </a>
                  <a
                    href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                      "Namaste! Mujhe admission ke baare me jaankari chahiye.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn w-full border border-white/25 bg-white/10 text-white hover:bg-white/20"
                  >
                    WhatsApp par poochhein
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
                Saare FAQs padhein →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
