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
    title: `Courses — ${courses.length} job-oriented programs`,
    description: `Web development, data science, digital marketing, design, Tally-GST, cyber security aur DCA courses ki poori list — fees, duration, mode aur syllabus ke saath. EMI aur scholarship available.`,
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
    ? `${formatINR(Math.min(...allCourses.map((c) => c.discountFee ?? c.fee)))} – ${formatINR(
        Math.max(...allCourses.map((c) => c.fee)),
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
        eyebrow="Our courses"
        title="Apne career ke liye sahi course chuniye"
        description={`${allCourses.length} job-oriented courses — beginner se advanced tak. Har course me live projects, portfolio banwana aur placement support shaamil hai. Fees range ${priceRange}, 0% EMI aur scholarship options ke saath.`}
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
              index === 0
                ? !params.category || params.category === "all"
                : params.category === item.label.split(" (")[0];
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors",
                  active
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700",
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
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-[13.5px] text-slate-600">
              <strong className="text-ink">{courses.length}</strong> course{courses.length === 1 ? "" : "s"} mil
              {courses.length === 1 ? "a" : "e"}
              {params.category && params.category !== "all" ? ` · ${params.category}` : ""}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[12.5px]">
              <span className="font-semibold text-slate-500">Mode:</span>
              {["all", "Offline", "Online", "Hybrid"].map((mode) => (
                <Link
                  key={mode}
                  href={buildQuery({ mode })}
                  className={cn(
                    "rounded-lg px-2.5 py-1 font-medium",
                    (params.mode ?? "all") === mode ? "bg-brand-50 text-brand-700" : "text-slate-500 hover:text-brand-700",
                  )}
                >
                  {mode === "all" ? "Sab" : mode}
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
                    "rounded-lg px-2.5 py-1 font-medium",
                    (params.sort ?? "default") === option.key
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-500 hover:text-brand-700",
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
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
              <GraduationCap className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-3 font-heading text-lg font-bold">Is filter me koi course nahi mila</p>
              <p className="mt-1 text-sm text-slate-500">Filter hata kar saare courses dekhein ya humein call karein.</p>
              <Link href="/courses" className="btn btn-primary mt-5">
                Saare courses dekhein
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-canvas pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow="Kaise chunein?"
            title="Course select karne me confusion? Ye 3 baat dekhein"
            align="center"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "1. Apna goal likhiye",
                text: "Job chahiye, freelancing karni hai, ya business ke liye skill — teeno ka course alag hota hai.",
              },
              {
                title: "2. Time & mode dekhein",
                text: "Working ho to shaam/weekend ya online-hybrid batch best rehti hai. Students ke liye morning batch.",
              },
              {
                title: "3. Placement support check karein",
                text: "Sirf syllabus nahi — mock interviews, resume review aur referrals ka system dekhna zaroori hai.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <Sparkles className="h-5 w-5 text-accent-500" />
                <h3 className="mt-3 font-heading text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/apply" className="btn btn-primary">
              Free counselling book karein <ArrowRight className="h-4 w-4" />
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
            <p className="eyebrow">Common sawaal</p>
            <h2 className="mt-2 text-2xl font-bold">Admission & fees se judi FAQs</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              Aur kuch poochhna hai to chatbot se poochhiye — ye fees aur batch ki live information deta hai.
            </p>
            <Link href="/faq" className="btn btn-outline mt-5">
              Saare FAQs padhein
            </Link>
          </div>
          <FaqAccordion faqs={listFaqs().slice(0, 5)} defaultOpen={-1} />
        </div>
      </section>

      <CtaBand
        title="Demo class free hai — pehle dekh lijiye, phir decide kijiye"
        description="Apply form bharein, hum aapko 2 free demo classes ka slot de denge. Fees, timing, mode — sab counselling me clear kar denge."
        primary={{ href: "/apply", label: "Demo class book karein" }}
        secondary={{ href: "/contact", label: "Campus visit" }}
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
