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
    description: `Hamare students ke real experiences — placement, fees aur training quality ke baare me. ${settings.averageRating}/5 average rating, ${Number(
      settings.studentsTrained,
    ).toLocaleString("en-IN")}+ students trained.`,
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
        title="Hamare students ki kahaniyan, unhi ki zubaani"
        description={`Ye reviews hum khud nahi likhte — students course complete karne ke baad apne experience likhte hain. ${cities.length} shehron se students humare saath padh chuke hain.`}
        crumbs={[{ label: "Testimonials" }]}
      />

      <section className="pt-8">
        <div className="container-x grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* Featured reviews */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Placement stories</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Unlogon ki kahani jo job pa gaye 🎉</h2>
            </div>
            <p className="text-[13px] text-slate-500">
              Salary figures students ne khud share kiye hain — privacy ke liye company ka naam kahin hide kiya gaya hai.
            </p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* All reviews */}
      <section className="section bg-canvas pt-0">
        <div className="container-x pt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Sabhi reviews</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Students ne kya likha</h2>
            </div>
            <span className="chip chip-neutral">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {settings.averageRating}/5 average
            </span>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Video + trust */}
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Video reviews</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Students se direct sunna chahte hain?</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Campus par video testimonials available hain — aap kisi bhi placed student se baat kar sakte hain (consent ke
              saath). Ye sabse fast tarika hai sach jaanne ka: counsellor se kehiye, wo aapko 2–3 students ke numbers de
              dega.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-slate-700">
              {[
                "Placed students se direct baat karne ka option",
                "Campus visit par live demo class attend karein",
                "Fees aur EMI ka written breakdown lein",
                "Placement record ke documents campus par dekh sakte hain",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Video className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/apply" className="btn btn-primary">
                Free counselling book karein <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Campus visit schedule
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <Quote className="h-8 w-8 text-brand-200" />
            <p className="mt-4 text-[15px] leading-8 text-slate-700">
              “Hum students ko sirf course nahi bechte. Counselling me hum saaf-saaf batate hain kitna kaam karna
              padega, kitna time lagega aur fees ka kya plan rahega. Jo students weekly 10–12 ghante de dete hain, unka
              placement record humare paas {settings.placementRate}% hai.”
            </p>
            <p className="mt-4 text-[13px] font-semibold text-ink">— Placement Cell, {settings.siteName}</p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-dashed border-slate-200 pt-5 text-center">
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
        title="Agla success story aapki ho sakti hai"
        description="Free counselling + demo class ke saath shuruat karein. Hum aapko honest plan denge — kaam kitna lagega, fees kitni hogi, placement ka kya chance hai."
        primary={{ href: "/apply", label: "Apply karein" }}
        secondary={{ href: "/courses", label: "Courses dekhein" }}
      />
    </>
  );
}
