import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { getSettings, listFaqs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { CtaBand } from "@/components/site/cards";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "Contact Us — Campus address, phone & enquiry form",
    description: `Get in touch with ${settings.siteName} — ${settings.addressLine1}, ${settings.city}. Call ${settings.phone}, message us on WhatsApp or send an enquiry. Campus visits are welcome Monday to Saturday.`,
    path: "/contact",
    keywords: ["contact institute", `${settings.city} institute address`, "admission enquiry", "campus visit"],
  });
}

export default async function ContactPage() {
  const settings = getSettings();
  const faqs = listFaqs().slice(0, 5);
  const fullAddress = `${settings.addressLine1}${settings.addressLine2 ? `, ${settings.addressLine2}` : ""}, ${
    settings.city
  }, ${settings.state} – ${settings.pincode}`;

  const channels = [
    {
      icon: Phone,
      label: "Admission helpline",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s/g, "")}`,
      note: settings.alternatePhone ? `Alternate: ${settings.alternatePhone}` : "Mon–Sat, 8 AM – 8 PM",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: `+${settings.whatsapp}`,
      href: `https://wa.me/${settings.whatsapp}`,
      note: "Fastest replies — course details, fees, timings",
    },
    {
      icon: Mail,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
      note: `Admissions: ${settings.admissionsEmail}`,
    },
    {
      icon: MapPin,
      label: "Campus",
      value: `${settings.city}, ${settings.state}`,
      href: "#map",
      note: fullAddress,
    },
  ];

  const departments = [
    { icon: GraduationCap, title: "Admissions & counselling", detail: settings.admissionsEmail, note: "Course selection, fees, EMI, scholarship" },
    { icon: Briefcase, title: "Placement cell", detail: settings.email, note: "Company tie-ups, hiring drives, alumni support" },
    { icon: Building2, title: "Corporate / CSR", detail: settings.admissionsEmail, note: "Training partnerships, lab sponsorship" },
    { icon: Users, title: "Alumni & students", detail: settings.email, note: "Certificates, documents, doubt support" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Want to talk? We are right here."
        description="Call, WhatsApp, email or visit the campus — whichever is easiest. Our admission team is available Monday to Saturday from 8 AM to 8 PM, and WhatsApp is the fastest way to reach us."
        crumbs={[{ label: "Contact Us" }]}
      />

      <section className="section pt-8">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ icon: Icon, label, value, href, note }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card card-hover flex flex-col p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[11.5px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                <p className="text-[14.5px] font-bold text-ink">{value}</p>
                <p className="mt-2 text-[12.5px] leading-5 text-slate-500">{note}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="font-heading text-xl font-bold">Enquiry form</h2>
              <p className="mt-2 text-[14px] text-slate-600">
                Ask about courses, fees, batch timings or anything else — we reply within 24 hours. For anything urgent,
                WhatsApp is the quicker option.
              </p>
              <div className="mt-5">
                <ContactForm variant="contact" />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {departments.map(({ icon: Icon, title, detail, note }) => (
                  <div key={title} className="card p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas text-brand-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-[14px] font-bold text-ink">{title}</h3>
                    <a href={`mailto:${detail}`} className="text-[13px] font-medium text-brand-700 hover:underline">
                      {detail}
                    </a>
                    <p className="mt-1 text-[12.5px] leading-5 text-slate-500">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit info + map */}
            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="card p-5">
                <h3 className="flex items-center gap-2 font-heading text-[15px] font-bold">
                  <MapPin className="h-4 w-4 text-brand-600" /> Campus address
                </h3>
                <p className="mt-3 text-[13.5px] leading-6 text-slate-700">{fullAddress}</p>
                <div className="mt-4 space-y-2.5 text-[13px] text-slate-600">
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-brand-500" /> {settings.officeHours}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-brand-500" /> {settings.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-brand-500" /> {settings.email}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(
                      `${settings.siteName} ${settings.addressLine1} ${settings.city}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Open in Google Maps
                  </a>
                  <Link href="/apply" className="btn btn-outline btn-sm">
                    Apply online
                  </Link>
                </div>
              </div>

              <div className="card overflow-hidden" id="map">
                <iframe
                  title={`${settings.siteName} campus map`}
                  src={settings.mapEmbedUrl}
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="border-t border-slate-100 px-4 py-3 text-[12.5px] text-slate-500">
                  Landmark: {settings.addressLine2 || settings.city} · Autos are easily available from the nearest bus stand
                </div>
              </div>

              <div className="card p-5">
                <h3 className="font-heading text-[15px] font-bold">Tips for your campus visit</h3>
                <ul className="mt-3 space-y-2 text-[13px] text-slate-600">
                  <li>• Call before you arrive so a counsellor is free to meet you</li>
                  <li>• Mention which course you want to explore</li>
                  <li>• You can lock a demo class slot during the visit</li>
                  <li>• Ask for a written breakdown of the fees</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-canvas pt-0">
        <div className="container-x pt-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">FAQs</p>
              <h2 className="mt-2 text-2xl font-bold">Worth reading before you contact us</h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Most questions about fees, EMI, timings and documents are already answered here.
              </p>
              <Link href="/faq" className="btn btn-outline mt-5">
                See the full FAQ list
              </Link>
            </div>
            <FaqAccordion faqs={faqs} defaultOpen={-1} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to reserve a seat? The form takes two minutes"
        description="Apply online or simply walk into the campus — demo classes are free, counselling is free and EMI options are available."
        primary={{ href: "/apply", label: "Apply online" }}
        secondary={{ href: `/support`, label: "Support us" }}
      />
    </>
  );
}
