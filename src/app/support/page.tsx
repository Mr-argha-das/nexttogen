import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Gift,
  HandHeart,
  HeartHandshake,
  Laptop,
  Landmark,
  Mic,
  QrCode,
  Receipt,
  Target,
  Users,
} from "lucide-react";
import { getSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { SITE_CONTENT } from "@/content/settings";
import { formatINR } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { Orbs } from "@/components/site/decor";
import { ContactForm } from "@/components/site/contact-form";
import { CtaBand } from "@/components/site/cards";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "Support Us — Sponsor a student's education",
    description: `Donate or sponsor — fund a student's fees, lab equipment or a full batch. 80G tax exemption receipts, UPI and bank transfer options, plus CSR partnerships.`,
    path: "/support",
    keywords: ["donate education", "sponsor student", "CSR training partner", "NGO computer education", "80G donation"],
  });
}

export default async function SupportPage() {
  const settings = getSettings();
  const tiers = SITE_CONTENT.supportTiers.map((tier) => ({ name: tier.name, amount: tier.amount }));

  const impact = [
    { icon: Users, value: "620+", label: "Students received scholarships in the last three years" },
    { icon: Laptop, value: "85", label: "Refurbished laptops donated to rural students" },
    { icon: Target, value: "3", label: "Free batches every year for SC/ST/OBC and girl students" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Support us"
        tone="dark"
        title={<>One donation can change an <span className="text-gradient">entire life</span></>}
        description={`At ${settings.siteName} we believe skill training should be affordable for everyone. With your help we train students every year whose families simply cannot afford the fees.`}
        crumbs={[{ label: "Support Us" }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip chip-neutral">
            <Receipt className="h-3.5 w-3.5 text-emerald-500" /> 80G tax exemption receipt
          </span>
          <span className="chip chip-neutral">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" /> Every rupee accounted for in our annual report
          </span>
        </div>
      </PageHero>

      {/* Impact */}
      <section className="pt-8">
        <div className="container-x grid gap-4 sm:grid-cols-3">
          {impact.map(({ icon: Icon, value, label }) => (
            <div key={label} className="card flex items-start gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-xl font-extrabold text-ink">{value}</p>
                <p className="text-[12.5px] leading-5 text-slate-600">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Support options</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Help in whatever way works for you</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              No amount is too small — ₹1,000 covers a student's lab and internet costs for a month. For larger
              supporters, lab and batch sponsorships are also available.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-start">
            {SITE_CONTENT.supportTiers.map((tier) => (
              <div
                key={tier.name}
                className={`card relative flex flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 sm:p-7 ${
                  tier.highlight
                    ? "border-transparent bg-[var(--grad-brand-deep)] text-white shadow-[var(--shadow-xl)] lg:-mt-4 lg:pb-9"
                    : "hover:border-brand-200 hover:shadow-[var(--shadow-lg)]"
                }`}
              >
                {tier.highlight ? <Orbs className="opacity-40" /> : null}
                {tier.highlight ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-extrabold text-[#2a1c00] shadow-[var(--shadow-accent)]">
                    Most popular
                  </span>
                ) : null}

                <div className="relative">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      tier.highlight
                        ? "bg-white/12 text-accent-300 ring-1 ring-white/15"
                        : "bg-brand-50 text-brand-700"
                    }`}
                  >
                    <HandHeart className="h-6 w-6" />
                  </span>
                  <h3 className={`mt-4 font-heading text-lg font-bold ${tier.highlight ? "text-white" : ""}`}>
                    {tier.name}
                  </h3>
                  <p className={`mt-2 text-[13px] leading-6 ${tier.highlight ? "text-white/70" : "text-slate-600"}`}>
                    {tier.description}
                  </p>
                  <p className="mt-5 flex items-end gap-1.5">
                    <span className={`font-heading text-[2.1rem] font-extrabold leading-none ${tier.highlight ? "text-white" : "text-ink"}`}>
                      {formatINR(tier.amount)}
                    </span>
                    <span className={`pb-1 text-[12.5px] ${tier.highlight ? "text-white/55" : "text-slate-500"}`}>
                      {tier.period}
                    </span>
                  </p>
                  <ul className={`mt-5 space-y-2.5 text-[13px] ${tier.highlight ? "text-white/75" : "text-slate-600"}`}>
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${tier.highlight ? "text-emerald-400" : "text-emerald-500"}`}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#donate"
                    className={`btn mt-7 w-full ${tier.highlight ? "btn-accent" : "btn-outline"}`}
                  >
                    Choose {tier.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to donate */}
      <section className="section bg-canvas" id="donate">
        <div className="container-x grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="eyebrow">Donation process</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">How to send your contribution</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              You can contribute by UPI, bank transfer or cheque. After the transfer, send us the screenshot on WhatsApp
              and we will issue your 80G receipt and a thank-you certificate within 48 hours.
            </p>

            <div className="mt-6 space-y-4">
              <div className="card p-5">
                <h3 className="flex items-center gap-2 text-[14px] font-bold text-ink">
                  <QrCode className="h-4 w-4 text-brand-600" /> UPI
                </h3>
                <p className="mt-2 rounded-xl bg-canvas px-4 py-3 font-mono text-[14px] font-semibold text-ink">
                  {settings.supportUpiId}
                </p>
                <p className="mt-2 text-[12.5px] text-slate-500">
                  Transfer using this ID in any UPI app, and please add your name in the note.
                </p>
              </div>

              <div className="card p-5">
                <h3 className="flex items-center gap-2 text-[14px] font-bold text-ink">
                  <Landmark className="h-4 w-4 text-brand-600" /> Bank transfer / NEFT
                </h3>
                <dl className="mt-3 grid gap-2 text-[13px] sm:grid-cols-2">
                  {[
                    ["Account name", settings.supportAccountName],
                    ["Bank", settings.supportBankName],
                    ["Account number", settings.supportAccountNumber],
                    ["IFSC", settings.supportIfsc],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg bg-canvas px-3 py-2">
                      <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
                      <dd className="font-semibold text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-[12.5px] text-slate-500">
                  By cheque or demand draft: {settings.legalName}, {settings.addressLine1}, {settings.city} – {settings.pincode}
                </p>
              </div>

              <div className="card p-5">
                <h3 className="flex items-center gap-2 text-[14px] font-bold text-ink">
                  <Gift className="h-4 w-4 text-brand-600" /> Prefer to help without money?
                </h3>
                <ul className="mt-3 space-y-2 text-[13px] text-slate-600">
                  {SITE_CONTENT.supportOtherWays.map((way) => (
                    <li key={way} className="flex items-start gap-2">
                      <HeartHandshake className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                      {way}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <ContactForm variant="support" tiers={tiers} />
            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-heading text-[15px] font-bold">
                <Receipt className="h-4 w-4 text-brand-600" /> Our transparency promise
              </h3>
              <ul className="mt-3 space-y-2.5 text-[13px] text-slate-600">
                {[
                  "A receipt and 80G certificate for every donation within 48 hours",
                  "An annual impact report covering students trained, laptops donated and fees sponsored",
                  "Progress reports for scholarship donors, with the student's identity protected",
                  "Visit the campus any time to review our records",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card overflow-hidden border-0 shadow-[var(--shadow-lg)]">
              <div className="relative overflow-hidden bg-[var(--grad-brand-deep)] p-5 text-white">
                <Orbs className="opacity-40" />
                <Banknote className="relative h-5 w-5 text-accent-300" />
                <h3 className="relative mt-2 font-heading text-base font-bold">For CSR partnerships</h3>
                <p className="relative mt-2 text-[13px] text-white/75">
                  Companies can sponsor a lab, a batch or a scholarship from their CSR budget. We provide an annual
                  report, photographs and a utilisation certificate.
                </p>
                <a href={`mailto:${settings.admissionsEmail}`} className="btn btn-accent relative mt-4 w-full">
                  Email us about CSR
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship */}
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="card p-6">
            <Mic className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-heading text-xl font-bold">No budget? Give your time instead 🙌</h2>
            <p className="mt-3 text-[14px] leading-7 text-slate-600">
              Every month our students meet industry professionals, and hearing about real journeys, real mistakes and
              practical tips builds their confidence. You could take a one-hour guest session or join an online mock
              interview panel. That contribution is worth as much as a donation.
            </p>
            <ul className="mt-4 space-y-2 text-[13.5px] text-slate-600">
              {[
                "Deliver a guest lecture (online or on campus, 60 minutes)",
                "Join a mock interview panel (two hours a month)",
                "Volunteer to review resumes",
                "Build an internship or hiring pipeline",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-primary mt-5">
              Contact us to volunteer or take a session
            </Link>
          </div>

          <div className="rounded-3xl border border-brand-100 bg-brand-50 p-7">
            <p className="eyebrow">Where your money goes</p>
            <h3 className="mt-2 font-heading text-xl font-bold">Fund utilisation (last financial year)</h3>
            <div className="mt-5 space-y-3">
              {[
                { label: "Scholarship & fees sponsorship", value: 58 },
                { label: "Lab, computers & internet", value: 24 },
                { label: "Study material & exam fees", value: 11 },
                { label: "Placement drives & events", value: 7 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-[13px] font-medium text-slate-700">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12.5px] leading-6 text-slate-600">
              Note: this is sample data. Replace it with your actual annual report figures from your accounts.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Sponsor a student's future today"
        description="₹25,000 covers one student's entire course fee — and gives them a skill, a certificate and a route into a job."
        primary={{ href: "#donate", label: "Send a support pledge" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
      />
    </>
  );
}
