import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, MessageCircle, Phone } from "lucide-react";
import { getSettings, listFaqs } from "@/lib/data";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { safeJsonLd } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { CtaBand } from "@/components/site/cards";

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
        title="Your questions, answered properly"
        description="From admission to certification — these are the questions we are asked most often. Not found your answer? Ask our chatbot, or simply call or WhatsApp us."
        crumbs={[{ label: "FAQs" }]}
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`#faq-${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-700"
            >
              {category} ({groups[category].length})
            </a>
          ))}
        </div>
      </PageHero>

      <section className="section pt-10">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="space-y-10">
            {categories.map((category) => (
              <div key={category} id={`faq-${category.toLowerCase().replace(/\s+/g, "-")}`} className="scroll-mt-28">
                <h2 className="flex items-center gap-2 font-heading text-xl font-bold">
                  <HelpCircle className="h-5 w-5 text-brand-600" /> {category}
                </h2>
                <div className="mt-4">
                  <FaqAccordion faqs={groups[category]} defaultOpen={-1} />
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="card p-5">
              <h3 className="font-heading text-[15px] font-bold">Not found your answer?</h3>
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
              <h3 className="font-heading text-[15px] font-bold">Documents checklist</h3>
              <ul className="mt-3 space-y-2 text-[13px] text-slate-600">
                <li>• Aadhaar card</li>
                <li>• 2 photos</li>
                <li>• Last marksheet</li>
                <li>• Previous certificate (optional)</li>
              </ul>
              <p className="mt-3 text-[12px] text-slate-500">All of these can also be sent online.</p>
            </div>

            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
                <h3 className="font-heading text-base font-bold">Demo classes are free</h3>
                <p className="mt-2 text-[13px] text-white/80">
                  Attend a class first, then decide about admission.
                </p>
                <Link href="/apply" className="btn btn-accent mt-4 w-full">
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
