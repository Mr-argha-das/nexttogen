"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  ShieldCheck,
  Stamp,
  Share2,
  PenLine,
  BadgeCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  XCircle
} from "lucide-react";
import CertificatePreview from "@/components/CertificatePreview";

export default function CertificatesPage() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<null | "ok" | "no">(null);

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim().toUpperCase();
    // Demo verification: valid format NG-YYYY-XXXXXX
    setResult(/^NG-\d{4}-\d{4,6}$/.test(v) ? "ok" : "no");
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px"
          }}
        />
        <div className="relative container-x pt-20 pb-28 md:pt-24 md:pb-36 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
              <Award className="h-3.5 w-3.5" /> NEXT GEN Certification
            </span>
            <h1 className="heading mt-5 text-4xl md:text-6xl text-white leading-[1.05]">
              Certificates that <span className="heading-italic">open doors.</span>
            </h1>
            <p className="mt-5 text-white/75 text-lg leading-[1.7] font-light max-w-xl">
              Complete a NEXT GEN program and receive an official, verifiable certificate — signed
              and stamped — that you can proudly share with the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/apply" className="btn-gold">
                Start a Program <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#verify" className="btn-outline">
                <Search className="h-4 w-4" /> Verify a Certificate
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold-400/25 via-transparent to-brand-400/30 blur-2xl" />
            <CertificatePreview
              className="relative"
              data={{
                recipient: "Your Name Here",
                program: "AI & Machine Learning Bootcamp",
                signatories: [
                  { name: "", title: "Program Director" },
                  { name: "", title: "Academic Head" }
                ]
              }}
            />
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#06081a]" />
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <BadgeCheck className="h-3.5 w-3.5" /> Why it matters
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              Built to be <span className="heading-italic">trusted.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, t: "Verifiable ID", d: "Every certificate carries a unique ID that can be verified online." },
              { icon: PenLine, t: "Authorised e-signature", d: "Digitally signed by NEXT GEN academic leadership." },
              { icon: Stamp, t: "Official e-stamp", d: "Embossed with our official seal for authenticity." },
              { icon: Share2, t: "Share anywhere", d: "Download as PNG or PDF, ready for LinkedIn & resumes." }
            ].map((f) => (
              <div key={f.t} className="card">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{f.t}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-gradient-to-b from-[#06081a] to-brand-950/50">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <Award className="h-3.5 w-3.5" /> How it works
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              Three steps to your <span className="heading-italic">credential.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Enrol & learn", d: "Join a mentor-led program and complete the hands-on curriculum." },
              { n: "02", t: "Finish your project", d: "Submit your capstone and meet the completion criteria." },
              { n: "03", t: "Get certified", d: "Receive your signed, stamped certificate — instantly downloadable." }
            ].map((s) => (
              <div key={s.n} className="card">
                <div className="font-display text-4xl font-bold text-gold-300">{s.n}</div>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink-900">{s.t}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verify */}
      <section id="verify" className="section">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <Search className="h-3.5 w-3.5" /> Verify a Certificate
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              Check <span className="heading-italic">authenticity.</span>
            </h2>
            <p className="mt-4 body-large">
              Enter a certificate ID (format <span className="font-mono text-gold-300">NG-YYYY-XXXXXX</span>) to verify it.
            </p>
            <form onSubmit={verify} className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setResult(null);
                }}
                placeholder="e.g. NG-2026-000123"
                className="field flex-1 text-center sm:text-left"
              />
              <button type="submit" className="btn-primary justify-center">
                <Search className="h-4 w-4" /> Verify
              </button>
            </form>
            {result === "ok" && (
              <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-300 flex items-center justify-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5" /> This certificate ID is valid and issued by NEXT GEN.
              </div>
            )}
            {result === "no" && (
              <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300 flex items-center justify-center gap-2 text-sm">
                <XCircle className="h-5 w-5" /> We couldn't verify that ID. Please check the format and try again.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 p-10 md:p-14 text-center">
            <div className="absolute inset-0 bg-hero-radial opacity-80" />
            <div className="relative">
              <h2 className="heading text-3xl md:text-5xl text-white">
                Ready to earn yours?
              </h2>
              <p className="mt-4 text-white/75 max-w-xl mx-auto">
                Pick a program, put in the work, and walk away with a credential that proves it.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/courses" className="btn-outline">Browse Courses</Link>
                <Link href="/apply" className="btn-gold">Apply Now <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
