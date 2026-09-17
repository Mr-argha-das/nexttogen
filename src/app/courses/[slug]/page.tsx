import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Home,
  IndianRupee,
  Layers,
  Laptop,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { getCourseBySlug, getSettings, listCourses, listFaqs, listTestimonials } from "@/lib/data";
import { breadcrumbSchema, buildMetadata, courseSchema, faqSchema } from "@/lib/seo";
import { discountPercent, formatDate, formatINR, safeJsonLd } from "@/lib/utils";
import { CourseCard, CtaBand, TestimonialCard, iconForCourse } from "@/components/site/cards";
import { CourseArt, Orbs } from "@/components/site/decor";
import { Reveal } from "@/components/site/motion";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ApplyForm } from "@/components/site/apply-form";
import { Markdown } from "@/lib/markdown";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    return listCourses().map((course) => ({ slug: course.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [course, settings] = [getCourseBySlug(slug), getSettings()];
  if (!course) {
    return buildMetadata({
      settings,
      title: "Course not found",
      description: "This course is no longer available.",
      path: `/courses/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    settings,
    title: `${course.title} Course — Fees, Duration & Syllabus`,
    description: `${course.shortDesc} Duration ${course.duration}, mode ${course.mode}. Fees ${formatINR(
      course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee,
    )} with 0% EMI options.`,
    path: `/courses/${course.slug}`,
    keywords: [course.title, `${course.title} fees`, `${course.title} syllabus`, `${course.category} course ${settings.city}`],
    type: "website",
  });
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const settings = getSettings();
  const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
  const off = discountPercent(course.fee, course.discountFee);
  const emi = Math.ceil(payable / 6 / 100) * 100;
  const related = listCourses().filter((c) => c.id !== course.id).slice(0, 3);
  const faqs = listFaqs().slice(0, 5);
  const testimonials = listTestimonials({ limit: 2 });

  const facts = [
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: Laptop, label: "Mode", value: course.mode },
    { icon: GraduationCap, label: "Level", value: course.level },
    { icon: Users, label: "Batch size", value: `Max ${course.seats} students` },
    { icon: CalendarDays, label: "Next batch", value: course.startDate ? formatDate(course.startDate, "long") : "Every month" },
    { icon: IndianRupee, label: "Fees", value: formatINR(payable) },
  ];

  return (
    <>
      {/* ================================ HERO ================================ */}
      <section className="relative overflow-hidden bg-[var(--grad-brand-deep)] pb-24 pt-10 text-white lg:pb-28">
        <Orbs tone="mixed" className="opacity-60" />
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.14]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--canvas)]" />

        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px] text-white/55">
            <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/25" />
            <Link href="/courses" className="transition-colors hover:text-white">
              Courses
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/25" />
            <span className="font-semibold text-white">{course.title}</span>
          </nav>

          <div className="animate-rise mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip chip-glass">{course.category}</span>
                <span className="chip chip-glass">{course.level}</span>
                {off > 0 ? (
                  <span className="rounded-full bg-accent-500 px-3 py-1 text-[11.5px] font-extrabold text-[#2a1c00] shadow-[var(--shadow-accent)]">
                    {off}% OFF · limited seats
                  </span>
                ) : null}
              </div>

              <h1 className="display-1 mt-5 text-white" style={{ fontSize: "clamp(1.95rem, 4vw, 3rem)" }}>
                {course.title}
              </h1>

              <p className="mt-4 max-w-2xl text-[15.5px] leading-8 text-white/70">
                {course.tagline ?? course.shortDesc}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Clock, label: "Duration", value: course.duration },
                  { icon: Laptop, label: "Mode", value: course.mode },
                  { icon: Users, label: "Batch size", value: `${course.seats} seats` },
                  {
                    icon: CalendarDays,
                    label: "Next batch",
                    value: course.startDate ? formatDate(course.startDate, "long") : "Every month",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-white/12 bg-white/[0.07] p-3.5 backdrop-blur">
                    <Icon className="h-4 w-4 text-accent-300" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">{label}</p>
                    <p className="mt-0.5 text-[13px] font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href={`/apply?course=${course.slug}`} className="btn btn-accent btn-lg">
                  Apply now <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#syllabus" className="btn btn-light btn-lg">
                  <BookOpen className="h-4 w-4" /> See the syllabus
                </a>
                <div className="text-[12.5px] leading-tight text-white/60">
                  <strong className="block font-heading text-lg text-white">{formatINR(payable)}</strong>
                  {off > 0 ? `was ${formatINR(course.fee)} · ` : ""}EMI from {formatINR(emi)}/month
                </div>
              </div>
            </div>

            {/* hero visual */}
            <div className="relative animate-rise [animation-delay:120ms]">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-2 backdrop-blur">
                <div className="relative h-52 overflow-hidden rounded-[1.35rem] sm:h-64">
                  <CourseArt seed={course.slug} icon={iconForCourse(course)} />
                  <div className="absolute inset-x-5 bottom-5">
                    <span className="chip chip-glass">
                      <ShieldCheck className="h-3.5 w-3.5" /> Placement support included
                    </span>
                    <p className="mt-3 font-heading text-lg font-bold text-white">
                      {course.syllabus.length} modules ·{" "}
                      {course.syllabus.reduce((sum, module) => sum + module.topics.length, 0)} topics
                    </p>
                    <p className="text-[12.5px] text-white/70">Hands-on projects · Certificate on completion</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3">
                  {[
                    { icon: Wallet, label: "0% EMI" },
                    { icon: Sparkles, label: "2 free demos" },
                    { icon: BadgeCheck, label: "Certificate" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl bg-white/[0.06] py-3">
                      <Icon className="h-4 w-4 text-accent-300" />
                      <span className="text-[11px] font-semibold text-white/75">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-float absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/15 bg-white px-4 py-3 text-ink shadow-[var(--shadow-lg)] sm:block">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">You save</p>
                <p className="font-heading text-lg font-extrabold text-emerald-600">
                  {off > 0 ? formatINR(course.fee - payable) : "Scholarship up to 15%"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-x grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          {/* Main content */}
          <div className="space-y-8">
            <div className="card card-hover overflow-hidden">
              <div className="relative h-36 overflow-hidden bg-[var(--grad-brand-deep)]">
                <div className="dot-grid absolute inset-0 opacity-[0.18]" />
                <Orbs className="opacity-40" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="eyebrow !text-accent-300">Course overview</span>
                  <h2 className="mt-2 font-heading text-xl font-bold text-white sm:text-2xl">
                    What you will learn in this course
                  </h2>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <Markdown content={course.description} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="card card-hover flex items-center gap-3.5 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--grad-brand)] text-white shadow-[var(--shadow-sm)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
                    <p className="truncate text-[14px] font-bold text-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Syllabus */}
            <div className="card scroll-mt-28 p-6 sm:p-7" id="syllabus">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Layers className="h-5 w-5" />
                  </span>
                  <h2 className="font-heading text-xl font-bold">Course syllabus / modules</h2>
                </div>
                <span className="chip chip-accent">
                  <Sparkles className="h-3.5 w-3.5" /> {course.syllabus.length} modules
                </span>
              </div>
              <p className="mt-2 text-[14px] text-slate-600">
                {course.syllabus.length} modules ·{" "}
                {course.syllabus.reduce((sum, module) => sum + module.topics.length, 0)} topics · hands-on projects
                included
              </p>
              <div className="mt-5 space-y-3">
                {course.syllabus.map((module, index) => (
                  <details
                    key={module.title}
                    className="group rounded-2xl border border-line bg-canvas/60 px-5 py-4 transition-colors open:border-brand-200 open:bg-white hover:border-brand-200"
                    open={index === 0}
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-3 text-[14.5px] font-bold text-ink marker:content-none">
                      <span className="flex items-center gap-3.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--grad-brand)] text-[12px] font-extrabold text-white shadow-[var(--shadow-xs)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {module.title}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-brand-400 transition-transform duration-300 group-open:rotate-90" />
                    </summary>
                    <ul className="mt-4 grid gap-2.5 pl-12 sm:grid-cols-2">
                      {module.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2 text-[13px] text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>

            {/* Highlights + tools */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="card card-hover p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <h2 className="font-heading text-lg font-bold">Course highlights</h2>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {course.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-[13.5px] text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card card-hover p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Wrench className="h-5 w-5" />
                  </span>
                  <h2 className="font-heading text-lg font-bold">Tools &amp; technologies</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tools.map((tool) => (
                    <span key={tool} className="chip chip-neutral">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-4 border-t border-dashed border-line pt-5">
                  <div>
                    <p className="flex items-center gap-2 text-[13px] font-bold text-ink">
                      <GraduationCap className="h-4 w-4 text-brand-600" /> Eligibility
                    </p>
                    <p className="mt-1 text-[13px] leading-6 text-slate-600">{course.eligibility}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[13px] font-bold text-ink">
                      <BadgeCheck className="h-4 w-4 text-brand-600" /> Certification
                    </p>
                    <p className="mt-1 text-[13px] leading-6 text-slate-600">{course.certification}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student feedback */}
            {testimonials.length ? (
              <div>
                <h2 className="font-heading text-xl font-bold">What students of this course say</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                </div>
                <Link
                  href="/testimonials"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
                >
                  Read more reviews <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}

            {/* FAQs */}
            <div>
              <h2 className="font-heading text-xl font-bold">Common admission questions</h2>
              <div className="mt-4">
                <FaqAccordion faqs={faqs} defaultOpen={-1} />
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="card overflow-hidden border-0 shadow-[var(--shadow-lg)]">
              <div className="relative overflow-hidden bg-[var(--grad-brand-deep)] p-6 text-white">
                <Orbs className="opacity-40" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow !text-accent-300">Course fees</p>
                    {off > 0 ? (
                      <span className="rounded-full bg-accent-500 px-2.5 py-1 text-[11px] font-extrabold text-[#2a1c00]">
                        {off}% OFF
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 flex items-end gap-2.5 font-heading text-[2.35rem] font-extrabold leading-none">
                    {formatINR(payable)}
                    {off > 0 ? (
                      <span className="pb-1 text-sm font-medium text-white/55 line-through">{formatINR(course.fee)}</span>
                    ) : null}
                  </p>
                  {off > 0 ? (
                    <p className="mt-2 text-[12.5px] font-semibold text-emerald-300">
                      You save {formatINR(course.fee - payable)} with the current offer
                    </p>
                  ) : null}

                  <div className="mt-5 space-y-2 rounded-2xl border border-white/12 bg-white/[0.06] p-4 text-[12.5px]">
                    {[
                      { label: "EMI (6 months)", value: `${formatINR(emi)}/month` },
                      { label: "Payable at registration", value: formatINR(Math.ceil(payable * 0.2)) },
                      { label: "Scholarship", value: "Up to 15% off" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-3">
                        <span className="text-white/60">{row.label}</span>
                        <span className="font-bold text-white">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <Link href={`/apply?course=${course.slug}`} className="btn btn-primary w-full">
                  Apply now <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-outline w-full">
                  <Phone className="h-4 w-4" /> {settings.phone}
                </a>
                <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-[12px] font-semibold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" /> Free counselling · 2 demo classes
                </div>
                <p className="text-center text-[12px] text-slate-500">Only {course.seats} seats in this batch</p>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-heading text-[15px] font-bold">What is included in this course?</h3>
              <ul className="mt-3 space-y-2.5 text-[13px] text-slate-600">
                {[
                  "Live classes + recorded backup",
                  "Weekly doubt-clearing sessions",
                  "Portfolio projects & GitHub profile",
                  "Resume, mock interview & referral support",
                  "Course completion certificate",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-heading text-[15px] font-bold">
                <MapPin className="h-4 w-4 text-brand-600" /> Campus
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-600">
                {settings.addressLine1}
                {settings.addressLine2 ? `, ${settings.addressLine2}` : ""}
                <br />
                {settings.city}, {settings.state} – {settings.pincode}
              </p>
              <p className="mt-2 text-[12.5px] text-slate-500">{settings.officeHours}</p>
              <Link href="/contact#map" className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-700">
                Get directions <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Apply form */}
      <section className="section bg-canvas" id="apply">
        <div className="container-x grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Apply</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Apply for {course.title}</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Fill in the form and our admission team will call you within 24 hours with complete details on batches,
              timings and fees. Demo classes are free.
            </p>
            <ul className="mt-6 space-y-3 text-[13.5px] text-slate-700">
              {[
                "Documents: Aadhaar, 2 photos, last marksheet",
                "Fees: 20% at registration, the rest in easy EMI",
                "Scholarship: 15% off with 75% or higher marks",
                "Batches: morning, afternoon or evening — your choice",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <ApplyForm
            courses={listCourses().map((c) => ({
              id: c.id,
              slug: c.slug,
              title: c.title,
              fee: c.fee,
              discountFee: c.discountFee,
              duration: c.duration,
              mode: c.mode,
            }))}
            preselected={course.slug}
          />
        </div>
      </section>

      {/* Related */}
      {related.length ? (
        <section className="section">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Related courses</p>
                <h2 className="mt-2 text-2xl font-bold">You may also like these courses</h2>
              </div>
              <Link href="/courses" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                All courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <CourseCard key={item.id} course={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Want to reserve your seat? Confirm it today"
        description="New batches fill up fast. Apply now to lock your seat — we will share complete fee and timing details during counselling."
        primary={{ href: `https://wa.me/${settings.whatsapp}`, label: "Chat on WhatsApp" }}
        secondary={{ href: `/apply?course=${course.slug}`, label: "Fill the application form" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd([
            courseSchema(
              {
                title: course.title,
                slug: course.slug,
                shortDesc: course.shortDesc,
                duration: course.duration,
                fee: course.fee,
                discountFee: course.discountFee,
                mode: course.mode,
                category: course.category,
                startDate: course.startDate,
              },
              settings,
            ),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Courses", path: "/courses" },
              { name: course.title, path: `/courses/${course.slug}` },
            ]),
            faqSchema(faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))),
          ]),
        }}
      />
    </>
  );
}
