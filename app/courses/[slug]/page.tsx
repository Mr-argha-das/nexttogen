"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Clock,
  Users,
  Star,
  CheckCircle2,
  Award,
  Globe,
  Download,
  PlayCircle,
  ArrowLeft
} from "lucide-react";
import { useSiteData } from "@/lib/siteData";

export default function CourseDetail() {
  const params = useParams();
  const slug = String(params.slug);
  const { data } = useSiteData();
  const course = data.courses.find((c) => c.slug === slug);
  if (!course) return (
    <div className="section container-x text-center">
      <p className="text-ink-500">Course not found. It may have been removed.</p>
      <Link href="/courses" className="btn-primary mt-4 inline-flex">Back to Courses</Link>
    </div>
  );

  const modules = [
    "Foundation & Setup",
    "Core Concepts Deep-Dive",
    "Applied Projects",
    "Advanced Topics",
    "Capstone & Career Prep"
  ];

  return (
    <>
      <section className="relative bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${course!.accent} opacity-30`}
        />
        <div className="relative container-x pt-10 pb-24 md:pt-16 md:pb-32">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold-400 mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all courses
          </Link>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold border border-white/20">
                  {course!.category}
                </span>
                <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-bold text-brand-950">
                  {course!.level}
                </span>
                {course!.bestseller && (
                  <span className="rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold text-white">
                    ★ Bestseller
                  </span>
                )}
              </div>
              <h1 className="heading mt-5 text-3xl md:text-5xl text-white">
                {course!.title}
              </h1>
              <p className="mt-5 text-white/75 text-[17px] leading-[1.7] font-light max-w-2xl">
                {course!.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                  <b>{course!.rating}</b>
                  <span className="text-white/60">
                    ({course!.reviews.toLocaleString()} reviews)
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/80">
                  <Users className="h-4 w-4" /> {course!.students.toLocaleString()}{" "}
                  students
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/80">
                  <Clock className="h-4 w-4" /> {course!.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/80">
                  <Globe className="h-4 w-4" /> English · Hindi
                </span>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-brand-950 flex items-center justify-center font-bold">
                  {course!.instructor
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="text-sm text-white/60">Created by</p>
                  <p className="font-semibold">{course!.instructor}</p>
                  <p className="text-xs text-gold-400">{course!.instructorRole}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="glass !bg-white !text-ink-900 p-6 shadow-2xl">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-brand-800 to-brand-950 relative overflow-hidden flex items-center justify-center mb-5">
                  <div className="absolute inset-0 bg-hero-radial opacity-80" />
                  <button className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-brand-950 shadow-glow-gold hover:scale-105 transition">
                    <PlayCircle className="h-8 w-8" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold">
                    Admissions Open
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 text-brand-800 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em] font-semibold">
                    {course!.level}
                  </span>
                </div>
                <h3 className="font-display text-[22px] font-semibold text-brand-900 tracking-display leading-tight">
                  Join the next cohort
                </h3>
                <p className="text-sm text-ink-600 mt-2 leading-[1.6]">
                  Cohort-based program with limited seats. Scholarships & EMIs
                  available for deserving candidates.
                </p>

                <Link href="/apply" className="btn-gold w-full mt-5 justify-center">
                  Apply to Enroll
                </Link>
                <Link href="/apply" className="btn-outline w-full mt-3 justify-center">
                  Request Scholarship
                </Link>

                <div className="mt-6 space-y-3 text-sm">
                  {[
                    "Lifetime access to all content",
                    "1:1 weekly mentorship sessions",
                    "Hands-on capstone projects",
                    "Certificate of completion",
                    "Career support & job referrals",
                    "Access to private community"
                  ].map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-gold-500 mt-0.5 shrink-0" />
                      <span className="text-ink-700">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-ink-100 flex items-center justify-between text-sm">
                  <button className="inline-flex items-center gap-2 text-ink-600 hover:text-brand-800">
                    <Download className="h-4 w-4" /> Brochure
                  </button>
                  <button className="inline-flex items-center gap-2 text-ink-600 hover:text-brand-800">
                    Talk to Counsellor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="heading text-2xl md:text-3xl">What you'll learn</h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  "Master the fundamentals through real-world projects",
                  "Build a portfolio that employers notice",
                  "Work 1:1 with an industry mentor every week",
                  "Solve authentic, production-grade challenges",
                  "Learn the tools teams use on the job today",
                  "Ace interviews with dedicated coaching"
                ].map((o) => (
                  <div key={o} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                    <span className="text-ink-700">{o}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading text-2xl md:text-3xl">Curriculum</h2>
              <p className="text-ink-600 mt-2">
                {course!.lessons} lessons · {course!.duration} · Hands-on
              </p>
              <div className="mt-6 space-y-3">
                {modules.map((m, i) => (
                  <details
                    key={m}
                    className="group rounded-xl border border-ink-100 bg-white p-5 open:shadow-soft"
                    open={i === 0}
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-brand-100 text-brand-800 flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="font-semibold text-brand-900">{m}</span>
                      </div>
                      <span className="text-xs text-ink-500 group-open:hidden">
                        {8 + i * 4} lessons
                      </span>
                      <span className="text-xs text-gold-600 font-bold hidden group-open:inline">
                        −
                      </span>
                    </summary>
                    <ul className="mt-4 pl-11 space-y-2 text-sm text-ink-700">
                      {[
                        "Module overview & learning outcomes",
                        "Core concepts with live lectures",
                        "Guided practice with mentor",
                        "Weekly project milestone",
                        "Quiz & reflection"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <PlayCircle className="h-4 w-4 text-brand-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading text-2xl md:text-3xl">Requirements</h2>
              <ul className="mt-4 space-y-2 text-ink-700 list-disc pl-5">
                <li>A laptop with at least 8GB RAM and a stable internet connection.</li>
                <li>Commitment of 10–12 hours per week for the cohort duration.</li>
                <li>Curiosity, discipline, and a hunger to grow.</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card">
              <Award className="h-8 w-8 text-gold-500" />
              <h3 className="mt-4 font-display text-xl font-bold text-brand-900">
                Accredited Certificate
              </h3>
              <p className="mt-2 text-sm text-ink-600">
                Earn an industry-recognized credential upon completion, shareable
                on LinkedIn and verifiable by employers.
              </p>
            </div>
            <div className="card">
              <Users className="h-8 w-8 text-gold-500" />
              <h3 className="mt-4 font-display text-xl font-bold text-brand-900">
                Who is this for?
              </h3>
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
