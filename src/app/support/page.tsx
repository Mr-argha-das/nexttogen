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
import { ContactForm } from "@/components/site/contact-form";
import { CtaBand } from "@/components/site/cards";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "Support Us — Sponsor a student's education",
    description: `Donate ya sponsor karein — ek student ki fees, lab equipment ya batch sponsorship. 80G tax exemption receipt, UPI/bank transfer aur CSR partnership options.`,
    path: "/support",
    keywords: ["donate education", "sponsor student", "CSR training partner", "NGO computer education", "80G donation"],
  });
}

export default async function SupportPage() {
  const settings = getSettings();
  const tiers = SITE_CONTENT.supportTiers.map((tier) => ({ name: tier.name, amount: tier.amount }));

  const impact = [
    { icon: Users, value: "620+", label: "Students ko scholarship mili (pichhle 3 saal)" },
    { icon: Laptop, value: "85", label: "Refurbished laptops rural students ko diye" },
    { icon: Target, value: "3", label: "Free batches har saal (SC/ST/OBC & girl students)" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Support us"
        title="Ek donation, ek poori zindagi badal sakti hai"
        description={`${settings.siteName} me hum maan-te hain ki skill training sabke liye affordable honi chahiye. Aapki madad se hum har saal aise students ko training dete hain jinke ghar me fees ka kharcha uthane ki capacity nahi hai.`}
        crumbs={[{ label: "Support Us" }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip chip-neutral">
            <Receipt className="h-3.5 w-3.5 text-emerald-500" /> 80G tax exemption receipt
          </span>
          <span className="chip chip-neutral">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" /> Har rupye ka hisaab, annual report me
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
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Apni capacity ke hisaab se madad karein</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              Koi amount chhota nahi hota — ₹1,000 se ek student ke lab aur internet ka kharcha nikalta hai. Bade
              sponsors ke liye lab aur batch sponsorship bhi available hai.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {SITE_CONTENT.supportTiers.map((tier) => (
              <div
                key={tier.name}
                className={`card relative flex flex-col p-6 ${
                  tier.highlight ? "border-brand-300 shadow-[0_24px_50px_-32px_rgb(79_70_229/0.6)]" : ""
                }`}
              >
                {tier.highlight ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-bold text-white">
                    Sabse popular
                  </span>
                ) : null}
                <HandHeart className={`h-6 w-6 ${tier.highlight ? "text-brand-600" : "text-slate-400"}`} />
                <h3 className="mt-3 font-heading text-lg font-bold">{tier.name}</h3>
                <p className="mt-2 text-[13px] leading-6 text-slate-600">{tier.description}</p>
                <p className="mt-4 flex items-end gap-1.5">
                  <span className="font-heading text-3xl font-extrabold text-ink">{formatINR(tier.amount)}</span>
                  <span className="pb-1 text-[12.5px] text-slate-500">{tier.period}</span>
                </p>
                <ul className="mt-4 space-y-2.5 text-[13px] text-slate-600">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Link href="#donate" className={`btn mt-6 ${tier.highlight ? "btn-primary" : "btn-outline"}`}>
                  {tier.name} chunein <ArrowRight className="h-4 w-4" />
                </Link>
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
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Payment kaise bhejein?</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Aap UPI, bank transfer ya cheque se contribute kar sakte hain. Transfer ke baad screenshot WhatsApp par
              bhej dijiye — hum 48 ghante me 80G receipt aur thank-you certificate issue kar dete hain.
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
                  UPI app me ye ID daal kar transfer karein — note me apna naam likh dijiye.
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
                  Cheque/DD: {settings.legalName}, {settings.addressLine1}, {settings.city} – {settings.pincode}
                </p>
              </div>

              <div className="card p-5">
                <h3 className="flex items-center gap-2 text-[14px] font-bold text-ink">
                  <Gift className="h-4 w-4 text-brand-600" /> Cash ya kind me don't karna chahte hain?
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
                <Receipt className="h-4 w-4 text-brand-600" /> Transparency promise
              </h3>
              <ul className="mt-3 space-y-2.5 text-[13px] text-slate-600">
                {[
                  "Har donation ka receipt aur 80G certificate 48 ghante me",
                  "Annual impact report (students trained, laptops diye gaye, fees sponsored)",
                  "Scholarship donors ko student ka progress report (name ke bina)",
                  "Kabhi bhi campus aakar records dekh sakte hain",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
                <Banknote className="h-5 w-5 text-accent-100" />
                <h3 className="mt-2 font-heading text-base font-bold">CSR partnership ke liye</h3>
                <p className="mt-2 text-[13px] text-white/80">
                  Company CSR budget se lab, batch ya scholarship sponsor kar sakti hai. Hum annual report, photos aur
                  utilisation certificate bhi provide karte hain.
                </p>
                <a href={`mailto:${settings.admissionsEmail}`} className="btn btn-accent mt-4 w-full">
                  CSR ke liye email karein
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
            <h2 className="mt-3 font-heading text-xl font-bold">Paisa nahi hai? Time dijiye 🙌</h2>
            <p className="mt-3 text-[14px] leading-7 text-slate-600">
              Har mahine humare students industry professionals se milte hain — unki journey, mistakes aur practical tips
              sunkar unka confidence badhta hai. Aap 1 ghante ka guest session le lijiye, ya online mock interview panel
              me aa jaiye. Ye donation se kam nahi.
            </p>
            <ul className="mt-4 space-y-2 text-[13.5px] text-slate-600">
              {[
                "Guest lecture (offline ya online, 60 min)",
                "Mock interview panelist (2 ghante/mahina)",
                "Resume review volunteer",
                "Internship / hiring pipeline banana",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-primary mt-5">
              Volunteer / guest session ke liye contact karein
            </Link>
          </div>

          <div className="rounded-3xl border border-brand-100 bg-brand-50 p-7">
            <p className="eyebrow">Kaha jaata hai aapka paisa?</p>
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
              Note: ye demo data hai — actual numbers admin panel/accounts se update karke apni annual report ke hisaab se
              bhar lijiye.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Aaj ek student ka future sponsor karein"
        description="₹25,000 me ek student ki poori course fees sponsor ho jaati hai — uske paas skill, certificate aur job ka raasta aa jaata hai."
        primary={{ href: "#donate", label: "Support pledge bhejein" }}
        secondary={{ href: "/contact", label: "Baath karein" }}
      />
    </>
  );
}
