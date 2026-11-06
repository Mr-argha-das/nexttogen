"use client";

import { useState } from "react";
import {
  Heart,
  HandCoins,
  Users,
  GraduationCap,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Gift,
  HandHeart
} from "lucide-react";
import Link from "next/link";

const amounts = [1000, 5000, 10000, 25000, 50000];

export default function SupportPage() {
  const [amount, setAmount] = useState(5000);
  const [custom, setCustom] = useState("");
  const [donated, setDonated] = useState(false);

  return (
    <>
      <section className="relative bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative container-x pt-20 pb-28 md:pt-28 md:pb-36">
          <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
            <Heart className="h-3.5 w-3.5" /> Support Us
          </span>
          <h1 className="heading mt-5 text-4xl md:text-6xl text-white max-w-3xl">
            Invest in the leaders of tomorrow.
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl text-lg">
            Your generosity powers scholarships, free learning resources, and
            community programs that reach thousands of underserved learners every
            year.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#donate" className="btn-gold">
              Donate Now <Heart className="h-4 w-4" />
            </a>
            <a href="#volunteer" className="btn-outline !bg-white/10 !text-white !border-white/20 hover:!border-gold-400 hover:!text-gold-400">
              Volunteer With Us
            </a>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Impact numbers */}
      <section className="container-x -mt-16 relative z-10">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { n: "₹4.2Cr+", l: "Scholarships Funded", icon: HandCoins },
            { n: "3,800+", l: "Students Supported", icon: GraduationCap },
            { n: "250+", l: "Volunteer Mentors", icon: Users },
            { n: "18", l: "Partner NGOs", icon: Building }
          ].map((s) => (
            <div key={s.l} className="card text-center">
              <s.icon className="h-7 w-7 text-gold-500 mx-auto" />
              <div className="mt-3 font-display text-3xl font-bold text-brand-900">
                {s.n}
              </div>
              <div className="text-xs uppercase tracking-wider text-ink-500 mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ways to support */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> Ways to support
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              Every contribution matters.
            </h2>
            <p className="mt-4 text-ink-600 text-lg">
              There are many ways to help us scale our mission. Choose what
              resonates most with you.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Gift,
                title: "Donate",
                desc: "Fund scholarships directly for learners who cannot afford tuition. 100% of your donation goes to students.",
                cta: "Make a gift",
                href: "#donate"
              },
              {
                icon: HandHeart,
                title: "Volunteer",
                desc: "Mentor a student, run a workshop, or help with career guidance. Even an hour a week changes lives.",
                cta: "Join as volunteer",
                href: "#volunteer"
              },
              {
                icon: Building,
                title: "Partner",
                desc: "For companies and institutions — sponsor cohorts, host hiring, or co-create curriculum with us.",
                cta: "Become a partner",
                href: "#partners"
              }
            ].map((w) => (
              <div key={w.title} className="card h-full flex flex-col">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                  <w.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-brand-900">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">
                  {w.desc}
                </p>
                <a
                  href={w.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-800 hover:text-gold-600"
                >
                  {w.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate form */}
      <section id="donate" className="section bg-gradient-to-b from-brand-50/40 to-white">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="eyebrow">
              <Heart className="h-3.5 w-3.5" /> Make a Donation
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              Your rupee goes a long way.
            </h2>
            <p className="mt-4 text-ink-600 text-lg leading-relaxed">
              Every donation is 80G tax-deductible in India. We publish our
              audited impact report every quarter so you can see exactly how
              your contribution is used.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "₹1,000 powers a week of mentorship for a student",
                "₹10,000 funds a full module of career coaching",
                "₹50,000 covers a 50% scholarship for a cohort program",
                "₹1,00,000+ endows a full named scholarship"
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 mt-0.5 shrink-0" />
                  <span className="text-ink-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card !p-8">
            {donated ? (
              <div className="text-center py-10">
                <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="heading mt-5 text-2xl">Thank you!</h3>
                <p className="mt-3 text-ink-600">
                  Your generous gift of{" "}
                  <b>₹{(custom ? parseInt(custom) || 0 : amount).toLocaleString("en-IN")}</b>{" "}
                  will directly change a learner's life. A receipt has been
                  emailed to you.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDonated(true);
                }}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-ink-500">
                  Choose an amount
                </p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amounts.map((a) => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => {
                        setAmount(a);
                        setCustom("");
                      }}
                      className={`rounded-xl border px-3 py-4 text-sm font-bold transition whitespace-nowrap ${
                        amount === a && !custom
                          ? "border-brand-800 bg-brand-50 ring-2 ring-brand-200 text-brand-900"
                          : "border-ink-200 text-ink-700 hover:border-brand-500"
                      }`}
                    >
                      ₹{a.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <input
                    type="number"
                    min={100}
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="Enter custom amount (₹)"
                    className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
                  />
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-ink-500 mt-6">
                  Personal details
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <input
                    required
                    placeholder="Full name"
                    className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
                  />
                  <input
                    placeholder="PAN (for 80G receipt)"
                    className="md:col-span-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-700"
                  />
                </div>

                <label className="flex items-start gap-2 mt-4 text-xs text-ink-600">
                  <input type="checkbox" defaultChecked className="mt-0.5 accent-gold-500" />
                  I'd like my donation to remain anonymous in public reports.
                </label>

                <button type="submit" className="btn-gold w-full mt-6 justify-center">
                  Donate ₹{(custom ? parseInt(custom) || amount : amount).toLocaleString("en-IN")} <Heart className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-[11px] text-ink-400">
                  Secured by Razorpay · 80G tax-deductible receipt via email
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[5/4] rounded-3xl bg-gradient-to-br from-brand-700 to-brand-950 overflow-hidden shadow-glow-brand">
              <div className="absolute inset-0 bg-hero-radial opacity-70" />
              <div className="relative h-full flex items-center justify-center p-10 text-white">
                <div className="grid grid-cols-2 gap-5 w-full max-w-sm">
                  {[
                    { icon: Users, n: "250+", l: "Volunteers" },
                    { icon: GraduationCap, n: "3.8K", l: "Mentees" },
                    { icon: HandCoins, n: "1.2L", l: "Hours Given" },
                    { icon: Sparkles, n: "4.9/5", l: "Volunteer NPS" }
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur text-center"
                    >
                      <s.icon className="h-6 w-6 text-gold-400 mx-auto" />
                      <div className="mt-2 font-display text-2xl font-bold">{s.n}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/60 mt-1">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="eyebrow">
              <HandHeart className="h-3.5 w-3.5" /> Volunteer
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              Give the gift of your time.
            </h2>
            <p className="mt-4 text-ink-600 text-lg leading-relaxed">
              Share what you know. Mentor a learner, lead a workshop, review
              resumes, run mock interviews, or help run our community. Even one
              hour a week compounds into life-changing impact.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "1:1 student mentorship (1 hour/week)",
                "Live masterclasses & workshops",
                "Career coaching & resume reviews",
                "Regional language translation"
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 mt-0.5 shrink-0" />
                  <span className="text-ink-700">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/apply" className="btn-primary">
                Apply to Volunteer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="pb-24">
        <div className="container-x">
          <div className="rounded-3xl bg-brand-950 text-white p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-radial" />
            <div className="relative grid gap-8 md:grid-cols-2 items-center">
              <div>
                <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
                  <Building className="h-3.5 w-3.5" /> For Organizations
                </span>
                <h2 className="heading mt-4 text-3xl md:text-4xl text-white">
                  Partner with NextToGen.
                </h2>
                <p className="mt-4 text-white/75 max-w-lg">
                  Co-create programs, sponsor cohorts, hire our graduates, or
                  run CSR-funded skilling initiatives at scale. We'd love to
                  build something meaningful together.
                </p>
                <Link href="/contact" className="btn-gold mt-6 inline-flex">
                  Talk to Partnerships <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-white/60 font-display font-semibold text-center">
                {[
                  "Google.org",
                  "Infosys Fdn",
                  "TCS CSR",
                  "Adobe",
                  "Flipkart",
                  "Gates Fdn",
                  "NITI Aayog",
                  "UNDP",
                  "Azim Premji"
                ].map((p) => (
                  <div
                    key={p}
                    className="rounded-xl border border-white/10 bg-white/5 py-5 px-2 sm:py-6 hover:text-gold-400 hover:border-gold-400/40 transition text-xs sm:text-sm break-words"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
