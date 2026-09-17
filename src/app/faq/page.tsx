import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, HelpCircle, MessageCircle, Phone } from "lucide-react";
import { getSettings, listFaqs } from "@/lib/data";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { safeJsonLd } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { CtaBand } from "@/components/site/cards";
import { Orbs } from "@/components/site/decor";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "FAQs — Admission, fees, EMI and batch timings",
    description:
      "Everything about the admission process, documents, fees and EMI, scholarships, batch timings, placement support and certificates, answered in one place.",
    path: "/faq",
    keywords: ["admission FAQ", "fees EMI question", "batch timing", "scholarship process", "placement support FAQ"],
  });
}

export default async function FaqPage() {
  const settings = getSettings();
  const faqs = listFaqs();
  const groups = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    acc[faq.category] = acc[faq.category] ?? [];
    acc[faq.category].push(faq);
    return acc;
  }, {});
  const categories = Object.keys(groups);

  return (
    <>
      <PageHero
        eyebrow="Help center"
        tone="dark"
        title={<>Your questions, <span className="text-gradient">answered properly</span></>}
        description="From admission to certification — these are the questions we are asked most often. Not found your answer? Ask our chatbot, or simply call or WhatsApp us."
        crumbs={[{ label: "FAQs" }]}
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`#faq-${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="chip chip-glass"
            >
              {category} ({groups[category].length})
            </a>
          ))}
        </div>
      </PageHero>

      <section className="section pt-12">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_330px] lg:items-start">
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category} id={`faq-${category.toLowerCase().replace(/\s+/g, "-")}`} className="scroll-mt-28">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--grad-brand)] text-white shadow-[var(--shadow-brand)]">
                    <HelpCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-heading text-[1.15rem] font-extrabold text-ink">{category}</h2>
                    <p className="text-[12.5px] text-slate-500">
                      {groups[category].length} question{groups[category].length === 1 ? "" : "s"} in this section
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <FaqAccordion faqs={groups[category]} defaultOpen={-1} />
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="card card-rail p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <MessageCircle className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-heading text-[15px] font-extrabold text-ink">Not found your answer?</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-600">
                Our chatbot is available 24×7 and answers from live data on fees, batch timings and the syllabus. You can also call us directly.
              </p>
              <div className="mt-4 space-y-2">
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-primary w-full">
                  <Phone className="h-4 w-4" /> {settings.phone}
                </a>
                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline w-full"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <Link href="/apply" className="btn btn-ghost w-full">
                  Fill the application form →
                </Link>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-heading text-[15px] font-extrabold text-ink">Documents checklist</h3>
              <ul className="mt-3 space-y-2.5 text-[13px] text-slate-600">
                {["Aadhaar card", "2 passport-size photos", "Last qualification marksheet", "Previous certificate (optional)"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-4 rounded-xl border border-dashed border-line bg-canvas px-3 py-2 text-[12px] text-slate-500">
                All of these can also be sent online after you apply.
              </p>
            </div>

            <div className="card overflow-hidden border-0 shadow-[var(--shadow-lg)]">
              <div className="relative overflow-hidden bg-[var(--grad-brand-deep)] p-5 text-white">
                <Orbs className="opacity-40" />
                <p className="eyebrow relative !text-accent-300">No commitment</p>
                <h3 className="relative mt-2 font-heading text-base font-bold">Demo classes are free</h3>
                <p className="relative mt-2 text-[13px] text-white/75">
                  Attend a class first, then decide about admission.
                </p>
                <Link href="/apply" className="btn btn-accent relative mt-4 w-full">
                  Book a demo class
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Any doubt at all — just ask us"
        description="Speak with a counsellor, share your goal and we will give you an honest plan — a realistic picture of the fees, the time involved and placement prospects."
        primary={{ href: "/contact", label: "Contact us" }}
        secondary={{ href: "/courses", label: "Browse courses" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(faqSchema(faqs.map((faq) => ({ question: faq.question, answer: faq.answer })))),
        }}
      />
    </>
  );
}
