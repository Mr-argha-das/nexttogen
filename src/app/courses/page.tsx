import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Phone, Sparkles } from "lucide-react";
import { getSettings, listCourseCategories, listCourses, listFaqs } from "@/lib/data";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { cn, formatINR } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { CourseCard, CtaBand, SectionHeading } from "@/components/site/cards";
import { FaqAccordion } from "@/components/site/faq-accordion";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  const courses = listCourses();
  return buildMetadata({
    settings,
    title: `Courses — ${courses.length} job-oriented programmes`,
    description:
      "Browse every course we offer: web development, data science and AI, digital marketing, design, Tally with GST, cyber security and DCA — with fees, duration, mode and full syllabus. EMI and scholarships available.",
    path: "/courses",
    keywords: [
      "computer courses list",
      `IT courses ${settings.city}`,
      "course fees and duration",
      "job oriented courses after 12th",
      "short term computer courses",
    ],
  });
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; mode?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const settings = getSettings();
  const categories = listCourseCategories();
  let courses = listCourses();

  if (params.category && params.category !== "all") {
    courses = courses.filter((course) => course.category === params.category);
  }
  if (params.mode && params.mode !== "all") {
    courses = courses.filter((course) => course.mode === params.mode);
  }
  if (params.sort === "fees-low") courses = [...courses].sort((a, b) => a.fee - b.fee);
  if (params.sort === "fees-high") courses = [...courses].sort((a, b) => b.fee - a.fee);
  if (params.sort === "duration") courses = [...courses].sort((a, b) => a.duration.localeCompare(b.duration));

  const allCourses = listCourses();
  const priceRange = allCourses.length
    ? `${formatINR(Math.min(...allCourses.map((course) => course.discountFee ?? course.fee)))} – ${formatINR(
        Math.max(...allCourses.map((course) => course.fee)),
      )}`
    : "—";

  const buildQuery = (patch: Record<string, string>) => {
    const next = new URLSearchParams({ ...params, ...patch });
    for (const [key, value] of [...next.entries()]) if (!value || value === "all") next.delete(key);
    const query = next.toString();
    return query ? `/courses?${query}` : "/courses";
  };

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Our courses"
        title={<>Choose the course that fits your <span className="text-gradient">career goal</span></>}
        description={`${allCourses.length} job-oriented courses, from beginner to advanced. Every course includes live projects, a portfolio you can show and placement support. Fees range from ${priceRange}, with 0% EMI and scholarship options.`}
        crumbs={[{ label: "Courses" }]}
      >
        <div className="flex flex-wrap gap-2">
          {[
            { label: "All courses", href: buildQuery({ category: "all", mode: "all" }) },
            ...categories.map((category) => ({
              label: `${category.category} (${category.count})`,
              href: buildQuery({ category: category.category }),
            })),
          ].map((item, index) => {
            const active =
              index === 0 ? !params.category || params.category === "all" : params.category === item.label.split(" (")[0];
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "rounded-full border px-4 py-2 text-[12.5px] font-semibold backdrop-blur transition-all",
                  active
                    ? "border-transparent bg-accent-500 text-[#2a1c00] shadow-[var(--shadow-accent)]"
                    : "border-white/15 bg-white/[0.07] text-white/75 hover:border-white/30 hover:bg-white/15 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </PageHero>

      <section className="section pt-8">
        <div className="container-x">
          <div className="sticky top-[4.5rem] z-30 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white/90 p-4 shadow-[var(--shadow-md)] backdrop-blur-xl lg:top-20">
            <p className="text-[13.5px] text-slate-600">
              <strong className="text-ink">{courses.length}</strong> course{courses.length === 1 ? "" : "s"} found
              {params.category && params.category !== "all" ? ` · ${params.category}` : ""}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[12.5px]">
              <span className="font-semibold text-slate-500">Mode:</span>
              {["all", "Offline", "Online", "Hybrid"].map((mode) => (
                <Link
                  key={mode}
                  href={buildQuery({ mode })}
                  className={cn(
                    "rounded-full border px-3 py-1.5 font-semibold transition-colors",
                    (params.mode ?? "all") === mode
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line text-slate-500 hover:border-brand-300 hover:text-brand-700",
                  )}
                >
                  {mode === "all" ? "All modes" : mode}
                </Link>
              ))}
              <span className="ml-2 font-semibold text-slate-500">Sort:</span>
              {[
                { key: "default", label: "Popular" },
                { key: "fees-low", label: "Fees ↑" },
                { key: "fees-high", label: "Fees ↓" },
              ].map((option) => (
                <Link
                  key={option.key}
                  href={buildQuery({ sort: option.key === "default" ? "" : option.key })}
                  className={cn(
                    "rounded-full border px-3 py-1.5 font-semibold transition-colors",
                    (params.sort ?? "default") === option.key
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line text-slate-500 hover:border-brand-300 hover:text-brand-700",
                  )}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>

          {courses.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} featured />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[1.5rem] border border-dashed border-line-strong bg-canvas p-12 text-center">
              <GraduationCap className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-3 font-heading text-lg font-bold">No courses match this filter</p>
              <p className="mt-1 text-sm text-slate-500">
                Clear the filters to see everything, or call us and we will suggest the right course.
              </p>
              <Link href="/courses" className="btn btn-primary mt-5">
                View all courses
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-canvas pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow="How to choose"
            title="Confused about which course to pick? Start with these three questions"
            align="center"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "1. Write down your goal",
                text: "A job, freelancing or a skill for your own business — each path is best served by a different course.",
              },
              {
                title: "2. Check your time and mode",
                text: "If you are working, an evening, weekend or online-hybrid batch works best. Students usually prefer morning batches.",
              },
              {
                title: "3. Look at placement support",
                text: "It is not just the syllabus — check for mock interviews, resume reviews and a genuine referral system.",
              },
            ].map((item) => (
              <div key={item.title} className="card card-hover p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-[1.02rem] font-bold">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/apply" className="btn btn-primary">
              Book a free counselling session <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-outline">
              <Phone className="h-4 w-4" /> {settings.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-2 text-2xl font-bold">FAQs about admission and fees</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              Anything else you would like to know? Ask our chatbot — it answers using the live course and fee data.
            </p>
            <Link href="/faq" className="btn btn-outline mt-5">
              Read all FAQs
            </Link>
          </div>
          <FaqAccordion faqs={listFaqs().slice(0, 5)} defaultOpen={-1} />
        </div>
      </section>

      <CtaBand
        title="Demo classes are free — try one before you decide"
        description="Fill in the application form and we will arrange two free demo classes. We will also explain fees, timings and modes during counselling."
        primary={{ href: "/apply", label: "Book a demo class" }}
        secondary={{ href: "/contact", label: "Visit the campus" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Courses at ${settings.siteName}`,
            url: `${SITE_URL}/courses`,
            numberOfItems: allCourses.length,
            itemListElement: allCourses.map((course, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${SITE_URL}/courses/${course.slug}`,
              name: course.title,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
