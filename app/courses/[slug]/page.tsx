"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock, Users, BookOpen, CheckCircle2, Award, Globe, PlayCircle, ArrowLeft
} from "lucide-react";
import { useSiteData } from "@/lib/siteData";
import { RenderRich } from "@/components/RichTextArea";

export default function CourseDetail() {
  const params = useParams();
  const slug = String(params.slug);
  const { data } = useSiteData();
  const course = data.courses.find((c) => c.slug === slug);
  if (!course) {
    return (
      <div className="section container-x text-center">
        <p className="text-ink-500">Course not found. It may have been removed.</p>
        <Link href="/courses" className="btn-primary mt-4 inline-flex">Back to Courses</Link>
      </div>
    );
  }

  const c = course;
  const modules = c.curriculum && c.curriculum.length ? c.curriculum : [
    { title: "Foundation & Setup", lessons: ["Module overview", "Core concepts", "Guided practice", "Project milestone", "Quiz"] },
    { title: "Core Concepts Deep-Dive", lessons: ["Lectures", "Live demos", "Office hours", "Assignment", "Review"] },
    { title: "Applied Projects", lessons: ["Brief", "Build", "Mentor reviews", "Peer feedback", "Submit"] },
    { title: "Capstone & Career Prep", lessons: ["Capstone kickoff", "Resume review", "Mock interviews", "Showcase", "Graduation"] }
  ];
  const outcomes = c.whatYouLearn && c.whatYouLearn.length ? c.whatYouLearn : [
    "Master fundamentals through real-world projects",
    "Build a portfolio employers notice",
    "Work 1:1 with an industry mentor weekly",
    "Solve production-grade challenges",
    "Ace interviews with dedicated coaching"
  ];
  const reqs = c.requirements && c.requirements.length ? c.requirements : [
    "A laptop with at least 8GB RAM and a stable internet connection.",
    "Commitment of 10–12 hours per week for the cohort duration.",
    "Curiosity, discipline, and a hunger to grow."
  ];
  const includes = c.includes && c.includes.length ? c.includes : [
    "Lifetime access to all content",
    "1:1 weekly mentorship sessions",
    "Hands-on capstone projects",
    "Certificate of completion",
    "Career support & job referrals",
    "Access to private community"
  ];

  return (
    <>
      <section className="relative bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        {c.bannerImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.bannerImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-40`} />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-50`} />
        )}
        <div className="relative container-x pt-10 pb-24 md:pt-16 md:pb-32">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold-400 mb-6 sm:mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to all courses
          </Link>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold border border-white/20">{c.category}</span>
                <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-ink-900">{c.level}</span>
                {c.bestseller && <span className="rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold text-white">★ Bestseller</span>}
              </div>
              <h1 className="heading mt-5 text-3xl md:text-5xl text-white">{c.title}</h1>
              <p className="mt-5 text-white/75 text-base md:text-[17px] leading-[1.7] font-light max-w-2xl">{c.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1.5 text-white/80"><BookOpen className="h-4 w-4" /> {c.lessons} lessons</span>
                <span className="inline-flex items-center gap-1.5 text-white/80"><Clock className="h-4 w-4" /> {c.duration}</span>
                <span className="inline-flex items-center gap-1.5 text-white/80"><Globe className="h-4 w-4" /> English · Hindi</span>
              </div>
            </div>

            <div>
              <div className="glass !bg-ink-100 !text-ink-900 p-6 shadow-2xl">
                {c.image || c.bannerImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image || c.bannerImage} alt="" className="aspect-video rounded-xl object-cover mb-5 border border-white/10" />
                ) : (
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-brand-800 to-brand-950 relative overflow-hidden flex items-center justify-center mb-5">
                    <div className="absolute inset-0 bg-hero-radial opacity-80" />
                    <button className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-ink-900 shadow-glow-gold hover:scale-105 transition"><PlayCircle className="h-8 w-8" /></button>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-400/10 border border-gold-400/40 text-gold-300 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold">Admissions Open</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] text-ink-800 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold">{c.level}</span>
                </div>
                <h3 className="font-display text-[22px] font-semibold text-ink-900 tracking-display leading-tight">Join the next cohort</h3>
                <p className="text-sm text-ink-600 mt-2 leading-[1.6]">Cohort-based program with limited seats. Scholarships & EMIs available for deserving candidates.</p>
                <Link href="/apply" className="btn-gold w-full mt-5 justify-center">Apply to Enroll</Link>
                <Link href="/apply" className="btn-outline w-full mt-3 justify-center">Request Scholarship</Link>
                <Link href="/certificates" className="mt-4 flex items-center gap-3 rounded-xl border border-gold-400/30 bg-gold-400/10 p-3 hover:border-gold-400/60 transition">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400/15 text-gold-300 shrink-0">
                    <Award className="h-5 w-5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold text-ink-900">Certificate on completion</span>
                    <span className="block text-xs text-ink-600">Signed, stamped & verifiable</span>
                  </span>
                </Link>
                <div className="mt-6 space-y-3 text-sm">
                  {includes.map((f) => (
                    <div key={f} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-gold-500 mt-0.5 shrink-0" /><span className="text-ink-700">{f}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            {c.longDescription && (
              <div>
                <h2 className="heading text-2xl md:text-3xl">About this course</h2>
                <RenderRich text={c.longDescription} />
              </div>
            )}

            <div>
              <h2 className="heading text-2xl md:text-3xl">What you'll learn</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                    <span className="text-ink-700">{o}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading text-2xl md:text-3xl">Curriculum</h2>
              <p className="text-ink-600 mt-2">{c.lessons} lessons · {c.duration} · Hands-on</p>
              <div className="mt-6 space-y-3">
                {modules.map((m, i) => (
                  <details key={m.title} className="group rounded-xl border border-white/[0.08] bg-ink-100/70 p-5 open:shadow-soft" open={i === 0}>
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-gold-400/15 text-ink-900 flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                        <span className="font-semibold text-ink-900">{m.title}</span>
                      </div>
                      <span className="text-xs text-gold-300 font-bold group-open:hidden ml-2">{m.lessons.length} lessons</span>
                      <span className="text-xs text-gold-300 font-bold hidden group-open:inline ml-2">−</span>
                    </summary>
                    <ul className="mt-4 pl-11 space-y-2 text-sm text-ink-700">
                      {m.lessons.map((item) => (
                        <li key={item} className="flex items-center gap-2"><PlayCircle className="h-4 w-4 text-ink-700 shrink-0" />{item}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading text-2xl md:text-3xl">Requirements</h2>
              <ul className="mt-4 space-y-2 text-ink-700 list-disc pl-5">
                {reqs.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>

          </div>

          <aside className="space-y-6">
            <div className="card">
              <Award className="h-8 w-8 text-gold-500" />
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Accredited Certificate</h3>
              <p className="mt-2 text-sm text-ink-600">Industry-recognized credential upon completion, shareable on LinkedIn and verifiable by employers.</p>
            </div>
            <div className="card">
              <Users className="h-8 w-8 text-gold-500" />
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Who is this for?</h3>
              <ul className="mt-3 text-sm text-ink-600 space-y-2">
                <li>• Aspiring professionals switching careers</li>
                <li>• College students preparing for roles</li>
                <li>• Working professionals upskilling</li>
                <li>• Founders building technical fluency</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
