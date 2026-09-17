import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  IndianRupee,
  Laptop,
  Layers,
  MapPin,
  Phone,
  Users,
  Wrench,
} from "lucide-react";
import { getCourseBySlug, getSettings, listCourses, listFaqs, listTestimonials } from "@/lib/data";
import { breadcrumbSchema, buildMetadata, courseSchema, faqSchema } from "@/lib/seo";
import { discountPercent, formatDate, formatINR, safeJsonLd } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { CourseCard, CtaBand, TestimonialCard } from "@/components/site/cards";
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
      title: "Course nahi mila",
      description: "Ye course ab available nahi hai.",
      path: `/courses/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    settings,
    title: `${course.title} Course — Fees, Duration & Syllabus`,
    description: `${course.shortDesc} Duration ${course.duration}, mode ${course.mode}. Fees ${formatINR(
      course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee,
    )} ke saath EMI option.`,
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
  const related = listCourses().filter((c) => c.id !== course.id).slice(0, 3);
  const faqs = listFaqs().slice(0, 5);
  const testimonials = listTestimonials({ limit: 2 });

  const facts = [
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: Laptop, label: "Mode", value: course.mode },
    { icon: GraduationCap, label: "Level", value: course.level },
    { icon: Users, label: "Batch size", value: `Max ${course.seats} students` },
    { icon: CalendarDays, label: "Next batch", value: course.startDate ? formatDate(course.startDate, "long") : "Har mahine" },
    { icon: IndianRupee, label: "Fees", value: formatINR(payable) },
  ];

  return (
    <>
      <PageHero
        eyebrow={course.category}
        title={course.title}
        description={course.tagline ?? course.shortDesc}
        crumbs={[{ href: "/courses", label: "Courses" }, { label: course.title }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip chip-neutral">{course.category}</span>
          <span className="chip chip-neutral">{course.level}</span>
          <span className="chip chip-neutral">{course.mode}</span>
          {off > 0 ? <span className="chip chip-accent">{off}% discount chal raha hai</span> : null}
          {course.placementSupport ? <span className="chip">Placement support included</span> : null}
        </div>
      </PageHero>

      <section className="section pt-8">
        <div className="container-x grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          {/* Main content */}
          <div className="space-y-8">
            <div className="card overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900">
                <div className="grid-lines absolute inset-0 opacity-30" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-white/70">Course overview</p>
                  <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                    {course.title} kya sikhaata hai?
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <Markdown content={course.description} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="card flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="text-[14px] font-semibold text-ink">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Syllabus */}
            <div className="card p-6">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-brand-600" />
                <h2 className="font-heading text-xl font-bold">Course syllabus / modules</h2>
              </div>
              <p className="mt-2 text-[14px] text-slate-600">
                {course.syllabus.length} modules · {course.syllabus.reduce((sum, module) => sum + module.topics.length, 0)}{" "}
                topics · hands-on projects shaamil
              </p>
              <div className="mt-5 space-y-3">
                {course.syllabus.map((module, index) => (
                  <details key={module.title} className="group rounded-xl border border-slate-200 p-4" open={index === 0}>
                    <summary className="flex cursor-pointer items-center justify-between gap-3 text-[14.5px] font-semibold text-ink marker:content-none">
                      <span className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-[12px] font-bold text-brand-700">
                          {index + 1}
                        </span>
                        {module.title}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                    </summary>
                    <ul className="mt-3 grid gap-2 pl-10 sm:grid-cols-2">
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
              <div className="card p-6">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-brand-600" />
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

              <div className="card p-6">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-brand-600" />
                  <h2 className="font-heading text-lg font-bold">Tools & technologies</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tools.map((tool) => (
                    <span key={tool} className="chip chip-neutral">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-4 border-t border-dashed border-slate-200 pt-5">
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
                <h2 className="font-heading text-xl font-bold">Is course ke students ka feedback</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))}
                </div>
                <Link
                  href="/testimonials"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
                >
                  Aur reviews padhein <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}

            {/* FAQs */}
            <div>
              <h2 className="font-heading text-xl font-bold">Admission se judi common sawaal</h2>
              <div className="mt-4">
                <FaqAccordion faqs={faqs} defaultOpen={-1} />
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-white/70">Course fees</p>
                <p className="mt-1 flex items-end gap-2 font-heading text-3xl font-extrabold">
                  {formatINR(payable)}
                  {off > 0 ? (
                    <span className="pb-1 text-sm font-medium text-white/70 line-through">{formatINR(course.fee)}</span>
                  ) : null}
                </p>
                {off > 0 ? (
                  <p className="mt-1 text-[12.5px] font-semibold text-accent-100">
                    Aap {formatINR(course.fee - payable)} bacha rahe hain ({off}% off)
                  </p>
                ) : null}
                <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-[12.5px]">
                  0% interest EMI: approx {formatINR(Math.ceil(payable / 6 / 100) * 100)}/month (6 instalments)
                </p>
              </div>
              <div className="space-y-3 p-5">
                <Link href={`/apply?course=${course.slug}`} className="btn btn-primary w-full">
                  Apply karein <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-outline w-full">
                  <Phone className="h-4 w-4" /> {settings.phone}
                </a>
                <p className="text-center text-[12px] text-slate-500">
                  Free counselling + 2 demo classes · Seat {course.seats} hi hain
                </p>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-heading text-[15px] font-bold">Is course me kya milega?</h3>
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
                Directions dekhein <ArrowRight className="h-3.5 w-3.5" />
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
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{course.title} me admission lein</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Form bharein — hamari admission team 24 ghante ke andar call karke batch, timing aur fees ki poori detail
              de degi. Demo class bhi free hai.
            </p>
            <ul className="mt-6 space-y-3 text-[13.5px] text-slate-700">
              {[
                "Documents: Aadhaar, 2 photos, last marksheet",
                "Fees: 20% registration par, baaki EMI me",
                "Scholarship: 75%+ marks par 15% off",
                "Batch: subah / dopahar / shaam — aapki choice",
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
                <h2 className="mt-2 text-2xl font-bold">Ye courses bhi dekh lijiye</h2>
              </div>
              <Link href="/courses" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                Saare courses <ArrowRight className="h-4 w-4" />
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
        title="Seat book karwana chahte hain? Aaj hi confirm karein"
        description="Nayi batch jaldi bhar jaati hai. Aaj apply karein aur apna slot lock karein — fees aur timing ki poori detail ke saath."
        primary={{ href: `https://wa.me/${settings.whatsapp}`, label: "WhatsApp par baat karein" }}
        secondary={{ href: `/apply?course=${course.slug}`, label: "Apply form bharein" }}
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
