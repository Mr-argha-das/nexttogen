"use client";

import Link from "next/link";
import { useSiteData } from "@/lib/siteData";
import {
  ArrowRight,
  PlayCircle,
  Star,
  Award,
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle2,
  Quote,
  Sparkles,
  Globe,
  Briefcase,
  Heart,
  GraduationCap,
  Target
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import TestimonialCard from "@/components/TestimonialCard";
import BlogCard from "@/components/BlogCard";

export default function HomePage() {
  const { data } = useSiteData();
  const featured = data.courses.slice(0, 3);
  const posts = data.posts.slice(0, 3);
  const testimonials = data.testimonials.slice(0, 6);
  return (
    <>
      {/* =============== HERO =============== */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 bg-hero-radial" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px"
          }}
        />
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />

        <div className="relative container-x pt-20 pb-28 md:pt-28 md:pb-40">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
                <Sparkles className="h-3.5 w-3.5" /> Admissions Open · Fall 2026 Cohort
              </span>
              <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-gold-400 to-transparent" />
              <h1 className="heading mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-[84px] text-white">
                Shaping{" "}
                <span className="relative inline-block italic font-[500]">
                  <span className="relative z-10 text-gold-400">tomorrow's</span>
                  <span className="absolute inset-x-0 bottom-2 h-3 bg-gold-400/20 -skew-x-6" />
                </span>{" "}
                leaders,<br className="hidden md:block" />
                <span className="text-white/80 font-[400] italic font-serif tracking-wide">one mind at a time.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-[17px] text-white/75 leading-[1.75] font-light">
                NextToGen is a premium academy delivering industry-led courses,
                1:1 mentorship from world-class practitioners, and career
                programs designed to turn ambition into achievement.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/apply" className="btn-gold">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-gold-400 hover:text-gold-400 transition"
                >
                  <PlayCircle className="h-5 w-5" /> Explore Courses
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  { k: "25K+", v: "Learners" },
                  { k: "120+", v: "Expert Mentors" },
                  { k: "94%", v: "Career Success" }
                ].map((s) => (
                  <div
                    key={s.v}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur"
                  >
                    <div className="num-display text-3xl md:text-4xl text-gold-400">
                      {s.k}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/60 mt-1">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold-400/30 via-transparent to-brand-400/40 blur-2xl" />
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-brand-800 to-brand-950">
                  {/* Stylized illustration */}
                  <div className="absolute inset-0">
                    <div className="absolute -top-16 -right-10 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />
                    <div className="absolute bottom-0 -left-10 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl" />
                  </div>
                  <div className="relative h-full w-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="h-20 w-20 rounded-2xl bg-gold-400 text-brand-950 flex items-center justify-center shadow-glow-gold animate-float">
                      <GraduationCap className="h-10 w-10" />
                    </div>
                    <h3 className="mt-6 font-display text-[28px] leading-tight font-medium text-white tracking-display">
                      Learn from the best.
                    </h3>
                    <p className="mt-2 font-serif italic text-white/75 text-[15px]">
                      Live cohorts · Real projects · 1:1 mentorship
                    </p>

                    <div className="mt-8 w-full space-y-3 text-left">
                      {[
                        "Industry-aligned curriculum",
                        "Real-world capstone projects",
                        "Global alumni network",
                        "Job & internship support"
                      ].map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold-400 shrink-0" />
                          <span className="text-white/85">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating stat card */}
                <div className="absolute -left-6 top-10 glass !bg-white/90 !text-ink-800 p-4 w-56 shadow-xl animate-float [animation-delay:0.5s]">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-gold-400 text-gold-400"
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-semibold">4.9 / 5 rating</p>
                  <p className="text-xs text-ink-500">from 3,200+ reviews</p>
                </div>

                <div className="absolute -right-4 bottom-16 glass !bg-white/90 !text-ink-800 p-4 w-60 shadow-xl animate-float [animation-delay:1s]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">1,200+ Hiring Partners</p>
                      <p className="text-xs text-ink-500">Google · Microsoft · Infosys</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand strip */}
        <div className="relative container-x pb-12">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-white/50">
            Trusted by learners & teams at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/45 text-[17px] font-sans font-semibold tracking-tight">
            {["Google", "Microsoft", "Infosys", "TCS", "Adobe", "Flipkart", "ISRO", "IIT"].map(
              (b) => (
                <span key={b} className="hover:text-gold-400 transition duration-300">
                  {b}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* =============== WHY NEXTTOGEN =============== */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl">
            <span className="eyebrow">
              <Target className="h-3.5 w-3.5" /> Why NextToGen
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              A learning experience<br />
              <span className="heading-italic text-gold-600">designed for real-world impact.</span>
            </h2>
            <p className="mt-5 body-large">
              We combine rigorous academics, industry mentorship and community
              accountability — everything you need to launch or accelerate your
              career.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                title: "Industry Curriculum",
                desc: "Co-created with leaders from top companies, refreshed every quarter."
              },
              {
                icon: Users,
                title: "1:1 Mentorship",
                desc: "Weekly sessions with seasoned practitioners who guide your journey."
              },
              {
                icon: Award,
                title: "Recognized Certifications",
                desc: "Credentials respected by 1,200+ hiring partners globally."
              },
              {
                icon: TrendingUp,
                title: "Career Acceleration",
                desc: "Resume reviews, mock interviews, and dedicated placement support."
              }
            ].map((f, i) => (
              <div key={f.title} className="card group">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-800 group-hover:text-gold-400 transition">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-[22px] font-semibold text-brand-900 tracking-display leading-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-[14.5px] text-ink-600 leading-[1.7]">{f.desc}</p>
                <div className="mt-4 font-mono text-[10.5px] tracking-[0.25em] text-gold-600 font-medium">
                  0{i + 1} / 04
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== FEATURED COURSES =============== */}
      <section className="section bg-gradient-to-b from-white to-brand-50/50">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">
                <BookOpen className="h-3.5 w-3.5" /> Featured Programs
              </span>
              <h2 className="heading mt-4 text-3xl md:text-5xl">
                Explore our <span className="heading-italic text-gold-600">most loved</span> courses.
              </h2>
              <p className="mt-5 body-large">
                Hand-picked programs that deliver transformative outcomes — from
                first job to senior leadership.
              </p>
            </div>
            <Link href="/courses" className="btn-outline">
              View All Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* =============== ABOUT / STATS =============== */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-glow-brand bg-gradient-to-br from-brand-700 to-brand-900">
                <div className="absolute inset-0 bg-hero-radial opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                    {[
                      { n: "10+", l: "Years of Impact", icon: Award },
                      { n: "25K+", l: "Alumni Worldwide", icon: Globe },
                      { n: "120+", l: "Expert Mentors", icon: Users },
                      { n: "94%", l: "Placement Rate", icon: TrendingUp }
                    ].map((s) => (
                      <div
                        key={s.l}
                        className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur"
                      >
                        <s.icon className="h-6 w-6 text-gold-400" />
                        <div className="mt-3 font-display text-3xl font-bold text-white">
                          {s.n}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-white/60 mt-1">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 rounded-2xl bg-gold-400 p-5 shadow-glow-gold text-brand-950 hidden md:block">
                <Heart className="h-6 w-6" />
                <div className="mt-2 font-display text-2xl font-bold">A+</div>
                <div className="text-xs font-semibold uppercase tracking-wider">
                  Accredited
                </div>
              </div>
            </div>

            <div>
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" /> Our Story
              </span>
              <h2 className="heading mt-4 text-3xl md:text-5xl">
                We exist to unlock <span className="heading-italic text-gold-600">human potential.</span>
              </h2>
              <p className="mt-5 body-large leading-relaxed">
                Founded in 2015 by a team of IIT/IIM alumni and global
                educators, NextToGen was born out of a simple belief: great
                education should be accessible, practical, and deeply
                human. Every program we build is crafted to light that spark of
                possibility in every learner.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Rigorous, project-based pedagogy",
                  "A thriving community of doers and dreamers",
                  "Scholarships for underrepresented talent",
                  "Lifelong access to learning resources"
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                    <span className="text-ink-700">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-3">
                <Link href="/about" className="btn-primary">
                  More About Us
                </Link>
                <Link href="/support" className="btn-outline">
                  <Heart className="h-4 w-4" /> Support Our Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============== TESTIMONIALS =============== */}
      <section className="section bg-brand-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="relative container-x">
          <div className="max-w-3xl">
            <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
              <Quote className="h-3.5 w-3.5" /> Student Stories
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl text-white">
              Hear from the <span className="heading-italic text-gold-400">lives we've touched.</span>
            </h2>
            <p className="mt-5 text-white/70 text-lg leading-[1.7] font-light">
              Our learners don't just gain skills — they transform their
              careers, confidence, and futures.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* =============== BLOG PREVIEW =============== */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">
                <BookOpen className="h-3.5 w-3.5" /> From the Blog
              </span>
              <h2 className="heading mt-4 text-3xl md:text-5xl">
                Insights to <span className="heading-italic text-gold-600">fuel your growth.</span>
              </h2>
              <p className="mt-5 body-large">
                Deep dives, career guides, and student stories — published
                weekly.
              </p>
            </div>
            <Link href="/blog" className="btn-outline">
              View All Posts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* =============== CTA =============== */}
      <section className="pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 p-10 md:p-16 text-white">
            <div className="absolute inset-0 bg-hero-radial opacity-80" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "36px 36px"
              }}
            />
            <div className="relative grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
                  <Sparkles className="h-3.5 w-3.5" /> Ready for your next chapter?
                </span>
                <h2 className="heading mt-5 text-3xl md:text-5xl text-white">
                  Your future is built <span className="heading-italic text-gold-400">one decision</span> at a time.
                </h2>
                <p className="mt-5 text-white/75 text-[17px] leading-[1.7] font-light max-w-xl">
                  Applications for the Fall 2026 cohort are now open. Seats are
                  limited and reviewed on a rolling basis.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/apply" className="btn-gold">
                    Start Your Application <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="btn-ghost">
                    Talk to a Counsellor
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto w-full">
                {[
                  { n: "40+", l: "Courses" },
                  { n: "25K+", l: "Learners" },
                  { n: "120+", l: "Mentors" },
                  { n: "94%", l: "Success Rate" }
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6"
                  >
                    <div className="num-display text-3xl md:text-4xl text-gold-400">
                      {s.n}
                    </div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/60 mt-2">
                      {s.l}
                    </div>
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
