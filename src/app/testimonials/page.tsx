import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote, Star, Users, Video, Briefcase, Award } from "lucide-react";
import { getSettings, listTestimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand, StatCard, TestimonialCard } from "@/components/site/cards";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "Student Testimonials — Success stories & reviews",
    description: `Genuine experiences from our students about placement, fees and training quality. Average rating ${settings.averageRating}/5, with ${Number(
      settings.studentsTrained,
    ).toLocaleString("en-IN")}+ students trained so far.`,
    path: "/testimonials",
    keywords: ["institute reviews", "student testimonials", "placement reviews", `${settings.city} institute feedback`],
  });
}

export default async function TestimonialsPage() {
  const settings = getSettings();
  const testimonials = listTestimonials();
  const featured = testimonials.filter((item) => item.featured);
  const rest = testimonials.filter((item) => !item.featured);
  const cities = [...new Set(testimonials.map((item) => item.city).filter(Boolean))] as string[];

  const stats = [
    { icon: Users, value: `${Number(settings.studentsTrained).toLocaleString("en-IN")}+`, label: "Students trained" },
    { icon: Briefcase, value: `${settings.placementRate}%`, label: "Placement record" },
    { icon: Star, value: `${settings.averageRating}/5`, label: "Average rating" },
    { icon: Award, value: `${testimonials.length}+`, label: "Written reviews" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        tone="dark"
        title={<>Real stories, in our students&apos; <span className="text-gradient">own words</span></>}
        description={`We do not write these reviews. Students write them after completing their course. Learners from ${cities.length} cities have studied with us and shared their experience here.`}
        crumbs={[{ label: "Testimonials" }]}
      />

      {/* stat cards pulled up over the hero */}
      <section className="relative z-10 -mt-8">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* Featured reviews */}
      <section className="section pt-16">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Placement stories</p>
              <h2 className="display-2 mt-3">Students who landed their first job</h2>
            </div>
            <p className="max-w-sm text-[13px] leading-6 text-slate-500">
              Salary figures are shared by the students themselves, and some company names are withheld for privacy.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* All reviews */}
      <section className="band-canvas section pt-0">
        <div className="container-x pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">All reviews</p>
              <h2 className="display-2 mt-3">What our students wrote</h2>
            </div>
            <span className="chip chip-outline">
              <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" /> {settings.averageRating}/5 average rating
            </span>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Video + trust */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Video reviews</p>
            <h2 className="display-2 mt-3">Prefer to hear it directly from students?</h2>
            <p className="mt-5 text-[15.5px] leading-8 text-slate-600">
              Video testimonials are available on campus, and with the student&apos;s consent you can speak to placed
              alumni directly. It is the fastest way to verify everything: ask a counsellor and we will connect you with
              two or three students.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Speak directly with placed students",
                "Attend a live demo class on a campus visit",
                "Ask for a written breakdown of fees and EMI",
                "Review placement records on campus in person",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 text-[13.5px] font-medium text-slate-700 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[var(--shadow-sm)]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Video className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/apply" className="btn btn-primary">
                Book free counselling <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Schedule a campus visit
              </Link>
            </div>
          </div>

          <div className="card card-rail p-6 sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--grad-brand)] text-white shadow-[var(--shadow-brand)]">
              <Quote className="h-6 w-6" />
            </span>
            <p className="mt-5 text-[15.5px] leading-8 text-slate-700">
              “We do not just sell courses. During counselling we are honest about the work involved, the time it takes
              and what the fee plan will look like. For students who put in 10 to 12 hours a week, our placement record
              is {settings.placementRate}%.”
            </p>
            <p className="mt-4 text-[13px] font-semibold text-ink">— Placement Cell, {settings.siteName}</p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-dashed border-line pt-6 text-center">
              <div>
                <p className="font-heading text-lg font-extrabold text-ink">{formatINR(3, { compact: false })}–12 LPA</p>
                <p className="text-[11.5px] text-slate-500">Salary range reported</p>
              </div>
              <div>
                <p className="font-heading text-lg font-extrabold text-ink">120+</p>
                <p className="text-[11.5px] text-slate-500">Hiring partners</p>
              </div>
              <div>
                <p className="font-heading text-lg font-extrabold text-ink">5</p>
                <p className="text-[11.5px] text-slate-500">Mock interviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="The next success story could be yours"
        description="Start with a free counselling session and a demo class. We will give you an honest plan: how much work is involved, what the fees are and what your placement prospects look like."
        primary={{ href: "/apply", label: "Apply now" }}
        secondary={{ href: "/courses", label: "Browse courses" }}
      />
    </>
  );
}
