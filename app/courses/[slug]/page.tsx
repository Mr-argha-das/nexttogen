"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock, Users, Star, CheckCircle2, Award, Globe, PlayCircle, ArrowLeft
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
                <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-brand-950">{c.level}</span>
                {c.bestseller && <span className="rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold text-white">★ Bestseller</span>}
              </div>
              <h1 className="heading mt-5 text-3xl md:text-5xl text-white">{c.title}</h1>
              <p className="mt-5 text-white/75 text-base md:text-[17px] leading-[1.7] font-light max-w-2xl">{c.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-gold-400 text-gold-400" /><b>{c.rating}</b><span className="text-white/60">({c.reviews.toLocaleString()} reviews)</span></span>
                <span className="inline-flex items-center gap-1.5 text-white/80"><Users className="h-4 w-4" /> {c.students.toLocaleString()} students</span>
                <span className="inline-flex items-center gap-1.5 text-white/80"><Clock className="h-4 w-4" /> {c.duration}</span>
                <span className="inline-flex items-center gap-1.5 text-white/80"><Globe className="h-4 w-4" /> English · Hindi</span>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-brand-950 flex items-center justify-center font-bold shrink-0">
                  {c.instructor.split(" ").map((s: string) => s[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white/60">Created by</p>
                  <p className="font-semibold truncate">{c.instructor}</p>
                  <p className="text-xs text-gold-400 truncate">{c.instructorRole}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="glass !bg-white !text-ink-900 p-6 shadow-2xl">
                {c.image || c.bannerImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image || c.bannerImage} alt="" className="aspect-video rounded-xl object-cover mb-5 border border-ink-100" />
                ) : (
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-brand-800 to-brand-950 relative overflow-hidden flex items-center justify-center mb-5">
                    <div className="absolute inset-0 bg-hero-radial opacity-80" />
                    <button className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-brand-950 shadow-glow-gold hover:scale-105 transition"><PlayCircle className="h-8 w-8" /></button>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold">Admissions Open</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 text-brand-800 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold">{c.level}</span>
                </div>
                <h3 className="font-display text-[22px] font-semibold text-brand-900 tracking-display leading-tight">Join the next cohort</h3>
                <p className="text-sm text-ink-600 mt-2 leading-[1.6]">Cohort-based program with limited seats. Scholarships & EMIs available for deserving candidates.</p>
                <Link href="/apply" className="btn-gold w-full mt-5 justify-center">Apply to Enroll</Link>
                <Link href="/apply" className="btn-outline w-full mt-3 justify-center">Request Scholarship</Link>
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
                  <details key={m.title} className="group rounded-xl border border-ink-100 bg-white p-5 open:shadow-soft" open={i === 0}>
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-brand-100 text-brand-800 flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                        <span className="font-semibold text-brand-900">{m.title}</span>
                      </div>
                      <span className="text-xs text-gold-600 font-bold group-open:hidden ml-2">{m.lessons.length} lessons</span>
                      <span className="text-xs text-gold-600 font-bold hidden group-open:inline ml-2">−</span>
                    </summary>
                    <ul className="mt-4 pl-11 space-y-2 text-sm text-ink-700">
                      {m.lessons.map((item) => (
                        <li key={item} className="flex items-center gap-2"><PlayCircle className="h-4 w-4 text-brand-500 shrink-0" />{item}</li>
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

            {c.instructorBio && (
              <div>
                <h2 className="heading text-2xl md:text-3xl">About the instructor</h2>
                <div className="mt-5 rounded-2xl border border-ink-100 bg-white p-6 flex flex-col sm:flex-row gap-5">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 text-gold-400 flex items-center justify-center font-bold text-2xl shrink-0">
                    {c.instructor.split(" ").map((s: string) => s[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-900">{c.instructor}</h3>
                    <p className="text-sm text-gold-600 font-semibold mt-0.5">{c.instructorRole}</p>
                    <p className="text-ink-600 mt-3 leading-relaxed">{c.instructorBio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="card">
              <Award className="h-8 w-8 text-gold-500" />
              <h3 className="mt-4 font-display text-xl font-bold text-brand-900">Accredited Certificate</h3>
              <p className="mt-2 text-sm text-ink-600">Industry-recognized credential upon completion, shareable on LinkedIn and verifiable by employers.</p>
            </div>
            <div className="card">
              <Users className="h-8 w-8 text-gold-500" />
              <h3 className="mt-4 font-display text-xl font-bold text-brand-900">Who is this for?</h3>
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
