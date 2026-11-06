"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import clsx from "clsx";
import { useSiteData } from "@/lib/siteData";

export default function ContactPage() {
  const { data } = useSiteData();
  const faqs = data.faqs;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <section className="relative bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative container-x pt-20 pb-28 md:pt-28 md:pb-36">
          <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
            <MessageCircle className="h-3.5 w-3.5" /> Get in Touch
          </span>
          <h1 className="heading mt-5 text-4xl md:text-6xl text-white max-w-3xl">
            We'd love to hear from you.
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl text-lg">
            Questions about courses, admissions, partnerships or anything else?
            Our team is here to help — Mon–Sat, 9 AM to 8 PM IST.
          </p>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      <section className="container-x -mt-20 relative z-10 pb-24">
        <div className="grid gap-6 md:grid-cols-4 mb-14">
          {[
            {
              icon: Mail,
              label: "Email",
              value: data.contactEmail,
              sub: "Reply within 24h"
            },
            {
              icon: Phone,
              label: "Phone",
              value: data.contactPhone,
              sub: "Mon–Sat 9am–8pm"
            },
            {
              icon: MapPin,
              label: "Office",
              value: data.contactAddress.split(",")[0] || "Jaipur",
              sub: data.contactAddress
            },
            {
              icon: Clock,
              label: "Live Chat",
              value: "24/7 Assistant",
              sub: "Bot always available"
            }
          ].map((c) => (
            <div key={c.label} className="card">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <c.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-500">
                {c.label}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-brand-900">
                {c.value}
              </p>
              <p className="text-xs text-ink-500 mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="card !p-8">
              <h2 className="heading text-2xl">Send us a message</h2>
              <p className="mt-2 text-ink-600 text-sm">
                Fill out the form and we'll get back within one business day.
              </p>

              {sent ? (
                <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-6 flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Thanks for reaching out, {form.name}. We'll reply to{" "}
                      <b>{form.email}</b> shortly.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-3 text-xs font-semibold text-green-800 underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSending(true);
                    setErr(null);
                    try {
                      const res = await fetch("/api/admin/submissions?kind=message", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(form)
                      });
                      const j = await res.json();
                      if (!res.ok || !j.ok) throw new Error(j.error || "Failed to send");
                      setSent(true);
                      setForm({ name: "", email: "", subject: "General Inquiry", message: "" });
                    } catch (ex: any) {
                      setErr(ex.message || "Something went wrong");
                    } finally {
                      setSending(false);
                    }
                  }}
                  className="mt-6 grid gap-5 md:grid-cols-2"
                >
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                      Your Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Jane Doe"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => set("subject", e.target.value)}
                      className={inputCls}
                    >
                      <option>General Inquiry</option>
                      <option>Admissions Help</option>
                      <option>Course Question</option>
                      <option>Scholarship Query</option>
                      <option>Partnership / Press</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="How can we help?"
                      className={inputCls + " resize-none"}
                    />
                  </div>
                  {err && (
                    <div className="md:col-span-2 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                      {err}
                    </div>
                  )}
                  <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-3">
                    <p className="text-xs text-ink-500">
                      By submitting, you agree to our privacy policy.
                    </p>
                    <button disabled={sending} className="btn-gold disabled:opacity-60">
                      {sending ? "Sending…" : (<>Send Message <Send className="h-4 w-4" /></>)}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="card !p-0 overflow-hidden">
              <div className="relative h-56 bg-gradient-to-br from-brand-700 to-brand-950">
                <div className="absolute inset-0 bg-hero-radial opacity-80" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                    backgroundSize: "30px 30px"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-brand-950 shadow-glow-gold">
                    <MapPin className="h-7 w-7" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-brand-900">
                  Visit our campus
                </h3>
                <p className="text-sm text-ink-600 mt-1">
                  221B Knowledge Avenue, Education Hub, Jaipur, Rajasthan 302001,
                  India
                </p>
                <a
                  href="#"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-800 hover:text-gold-600"
                >
                  Get directions →
                </a>
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-lg font-bold text-brand-900 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-gold-500" /> Quick answers
              </h3>
              <p className="text-xs text-ink-500 mt-1">
                Can't wait? Our chatbot Gen can help 24/7 — click the icon on the
                bottom-right.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div id="faqs" className="mt-20">
          <div className="max-w-3xl">
            <span className="eyebrow">
              <HelpCircle className="h-3.5 w-3.5" /> FAQs
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              Frequently asked questions.
            </h2>
          </div>
          <div className="mt-10 max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-ink-100 bg-white p-5"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-semibold text-brand-900 pr-4">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={clsx(
                      "h-5 w-5 text-ink-400 transition-transform shrink-0",
                      openFaq === i && "rotate-180 text-gold-500"
                    )}
                  />
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-ink-600 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="legal" className="mt-16 text-center text-xs text-ink-400">
          NextToGen Academy is an ISO 9001:2015 certified institution. All
          trademarks belong to their respective owners.
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-800 placeholder-ink-400 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition";
