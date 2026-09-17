import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Hammer,
  Laptop,
  MapPin,
  MessageSquareQuote,
  Percent,
  Phone,
  Presentation,
  Star,
  Target,
  Users,
  Wallet,
  type LucideIcon,
  Sparkles,
} from "lucide-react";
import { getSettings, listCourses, listFaqs, listPosts, listTestimonials } from "@/lib/data";
import { SITE_CONTENT } from "@/content/settings";
import { absoluteUrl, faqSchema, SITE_URL } from "@/lib/seo";
import { formatDate, formatINR, safeJsonLd, truncate } from "@/lib/utils";
import {
  BlogCard,
  CourseCard,
  CtaBand,
  FeatureCard,
  PlacementStrip,
  SectionHeading,
  StatCard,
  TestimonialCard,
} from "@/components/site/cards";
import { FaqAccordion } from "@/components/site/faq-accordion";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  presentation: Presentation,
  users: Users,
  hammer: Hammer,
  briefcase: Briefcase,
  target: Target,
  wallet: Wallet,
};

export const revalidate = 60;

export default function HomePage() {
  const settings = getSettings();
  const courses = listCourses();
  const featured = courses.filter((course) => course.featured).slice(0, 6);
  const testimonials = listTestimonials({ featuredOnly: true, limit: 3 });
  const posts = listPosts({ limit: 3 });
  const faqs = listFaqs().slice(0, 5);
  const years = Math.max(1, new Date().getFullYear() - Number(settings.foundedYear || "2014"));

  const stats = [
    { icon: Users, value: `${Number(settings.studentsTrained).toLocaleString("en-IN")}+`, label: "Students trained" },
    { icon: Percent, value: `${settings.placementRate}%`, label: "Placement record" },
    { icon: Award, value: `${years}+ yrs`, label: "Training experience" },
    { icon: Star, value: `${settings.averageRating}/5`, label: "Student rating" },
  ];

  const highlights = [
    "Free counselling + 2 demo classes",
    "Small batches (max 30 students)",
    "0% EMI & scholarship option",
    "Lifetime recorded class access",
  ];

  return (
    <>
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-canvas">
        <div className="mesh pointer-events-none absolute inset-0 opacity-70" />
        <div className="container-x relative grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              New batch admissions open · {new Date().getFullYear()}
            </span>

            <h1 className="mt-5 font-heading text-[2rem] font-extrabold leading-[1.1] text-ink sm:text-[2.6rem] lg:text-[3.1rem]">
              {settings.siteTagline.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                  {settings.siteTagline.split(" ").slice(3).join(" ") || "job-ready"
                }</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded bg-accent-100" />
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-600">
              {settings.siteName} — {settings.city} ka trusted skill training institute. Live classes, real projects aur
              placement support ke saath {courses.length}+ job-oriented courses. Ab tak{" "}
              {Number(settings.studentsTrained).toLocaleString("en-IN")}+ students humare saath career bana chuke hain.
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13.5px] font-medium text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/courses" className="btn btn-primary btn-lg">
                Courses dekhein <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/apply" className="btn btn-accent btn-lg">
                <CalendarCheck className="h-4 w-4" /> Free counselling
              </Link>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-outline btn-lg">
                <Phone className="h-4 w-4" /> {settings.phone}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-slate-500">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-500" /> {settings.addressLine1}, {settings.city}
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {settings.averageRating}/5 Google rating
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-rise [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_30px_60px_-40px_rgb(15_23_42/0.5)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow">Most popular course</p>
                  <h2 className="mt-1 font-heading text-lg font-bold">
                    {featured[0]?.title ?? "Full Stack Web Development"}
                  </h2>
                </div>
                <span className="chip chip-accent">
                  {featured[0]?.seats ?? 30} seats · {featured[0]?.mode ?? "Hybrid"}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: BookOpen, label: "Duration", value: featured[0]?.duration ?? "6 Months" },
                  { icon: Laptop, label: "Mode", value: featured[0]?.mode ?? "Hybrid" },
                  {
                    icon: Wallet,
                    label: "Fees",
                    value: formatINR(
                      featured[0]
                        ? (featured[0].discountFee && featured[0].discountFee < featured[0].fee
                            ? featured[0].discountFee
                            : featured[0].fee)
                        : 39999,
                    ),
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl bg-canvas p-3">
                    <Icon className="h-4 w-4 text-brand-600" />
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="text-[13px] font-bold text-ink">{value}</p>
                  </div>
                ))}
              </div>

              <ul className="mt-4 space-y-2">
                {(featured[0]?.highlights ?? [
                  "12 industry-level projects",
                  "Live classes + lifetime recordings",
                  "Mock interviews & resume review",
                ])
                  .slice(0, 4)
                  .map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
                      {highlight}
                    </li>
                  ))}
              </ul>

              <div className="mt-5 flex gap-2">
                <Link
                  href={featured[0] ? `/courses/${featured[0].slug}` : "/courses"}
                  className="btn btn-primary flex-1"
                >
                  Syllabus dekhein
                </Link>
                <Link
                  href={featured[0] ? `/apply?course=${featured[0].slug}` : "/apply"}
                  className="btn btn-outline flex-1"
                >
                  Apply karein
                </Link>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 hidden w-56 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Briefcase className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-ink">{testimonials[0]?.name ?? "Aman Sharma"}</p>
                  <p className="text-[11px] text-slate-500">
                    {truncate(testimonials[0]?.role ?? "Software Engineer @ Infosys", 32)}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 -top-3 hidden rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-xl sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Placement rate</p>
              <p className="font-heading text-xl font-extrabold text-emerald-600">{settings.placementRate}%</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ STATS ------------------------------ */}
      <section className="border-b border-slate-100">
        <div className="container-x grid grid-cols-2 gap-3 py-8 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* ----------------------------- COURSES ----------------------------- */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Courses"
            title="Job-oriented courses jo industry maangti hai"
            description="Har course me live projects, portfolio banwana aur placement support shaamil hai. Beginner se advanced tak — apna rasta chuniye."
            action={{ href: "/courses", label: "Saare courses" }}
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} featured />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            <span>Confuse hain kaunsa course sahi hai?</span>
            <Link href="/apply" className="font-semibold text-brand-700 hover:text-brand-900">
              Free counselling book karein →
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------ WHY US ----------------------------- */}
      <section className="section bg-canvas">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why students choose us"
            title="Sirf class nahi — poora career support system"
            description="Humara focus sirf syllabus complete karana nahi, balki aapko interview-ready banane par hai."
            align="center"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONTENT.features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={FEATURE_ICONS[feature.icon] ?? Target}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- PLACEMENT ---------------------------- */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Placement support</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              {settings.placementRate}% students ko placement — preparation se lekar offer letter tak
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Placement cell interview se 3 mahine pehle se kaam shuru kar deti hai: resume banwana, GitHub/LinkedIn
              profile theek karna, 5 mock interviews aur 120+ companies me referrals.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Resume + portfolio review (2 baar free)",
                "Technical + HR mock interviews",
                "Aptitude & communication practice sessions",
                "Job openings WhatsApp group me daily updates",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/testimonials" className="btn btn-primary">
                <MessageSquareQuote className="h-4 w-4" /> Placed students ki kahaniyan
              </Link>
              <Link href="/about" className="btn btn-outline">
                Institute ke baare me
              </Link>
            </div>
          </div>

          <div className="card overflow-hidden p-6">
            <p className="text-center text-[13px] font-semibold uppercase tracking-wider text-slate-400">
              Hamare students yahan kaam karte hain
            </p>
            <div className="mt-5">
              <PlacementStrip partners={SITE_CONTENT.placementPartners} />
            </div>
            <div className="mt-6 grid gap-3 border-t border-dashed border-slate-200 pt-6 sm:grid-cols-3">
              {[
                { icon: Building2, value: "120+", label: "Hiring partners" },
                { icon: Briefcase, value: "₹3–12 LPA", label: "Salary range" },
                { icon: Users, value: "1:1", label: "Career mentoring" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-xl bg-canvas p-3 text-center">
                  <Icon className="mx-auto h-4.5 w-4.5 text-brand-600" />
                  <p className="mt-2 font-heading text-base font-extrabold text-ink">{value}</p>
                  <p className="text-[11.5px] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- TESTIMONIALS -------------------------- */}
      <section className="section bg-canvas">
        <div className="container-x">
          <SectionHeading
            eyebrow="Student testimonials"
            title="Humare students kya kehte hain"
            description={`${settings.averageRating}/5 average rating · video reviews campus par available`}
            action={{ href: "/testimonials", label: "Sabhi testimonials" }}
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------- ADMISSION PROCESS ----------------------- */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Admission process"
            title="Admission sirf 4 simple step me"
            align="center"
            description="Aaj apply karein — hamari team 24 ghante ke andar call karke poora process guide karegi."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_CONTENT.admissionsSteps.map((step, index) => (
              <div key={step.step} className="relative card card-hover p-5">
                <span className="font-heading text-3xl font-extrabold text-brand-100">{step.step}</span>
                <h3 className="mt-2 font-heading text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-slate-600">{step.text}</p>
                {index < SITE_CONTENT.admissionsSteps.length - 1 ? (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-brand-200 lg:block" />
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/apply" className="btn btn-primary btn-lg">
              Apply form bharein <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------- BLOG ------------------------------ */}
      <section className="section bg-canvas">
        <div className="container-x">
          <SectionHeading
            eyebrow="Career blog"
            title="Skills, roadmap aur job tips"
            description="Humare trainers aur placement team ke experience se likhe practical guides."
            action={{ href: "/blog", label: "Saare blogs" }}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------- FAQ ------------------------------ */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Aapke sawaal, seedhe jawab</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Admission, fees, EMI, batch timing ya placement — jo sabse zyada poochha jaata hai wo yahan hai. Aur kuch
              ho to chatbot se poochhiye ya direct call kar lijiye.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/faq" className="btn btn-outline">
                Saare FAQs
              </Link>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-primary">
                <Phone className="h-4 w-4" /> Call karein
              </a>
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-canvas p-5">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-400">Visit us</p>
              <p className="mt-2 text-sm font-medium text-ink">
                {settings.addressLine1}
                {settings.addressLine2 ? `, ${settings.addressLine2}` : ""}
                <br />
                {settings.city}, {settings.state} – {settings.pincode}
              </p>
              <p className="mt-2 text-[13px] text-slate-500">{settings.officeHours}</p>
              <Link href="/contact#map" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                Map par dekhein <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div>
            <FaqAccordion faqs={faqs} />
            <p className="mt-4 text-center text-[13px] text-slate-500">
              Aur sawaal hain?{" "}
              <Link href="/contact" className="font-semibold text-brand-700">
                Contact page
              </Link>{" "}
              par message bhejein.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title={`${settings.siteName} me admission ke liye aaj hi baat karein`}
        description="Free counselling, 2 demo classes aur 0% EMI option ke saath. Seat limited hain — nayi batch jaldi bhar jaati hai."
        primary={{ href: "/apply", label: "Apply Online" }}
        secondary={{ href: "/contact", label: "Campus visit schedule karein" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd([
            faqSchema(faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))),
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: settings.siteName,
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/courses?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: courses.slice(0, 8).map((course, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(`/courses/${course.slug}`),
                name: course.title,
              })),
            },
          ]),
        }}
      />
    </>
  );
}
