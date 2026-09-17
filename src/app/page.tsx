import Link from "next/link";
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
import { formatINR, safeJsonLd, truncate } from "@/lib/utils";
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
  const heroCourse = featured[0];

  const stats = [
    { icon: Users, value: `${Number(settings.studentsTrained).toLocaleString("en-IN")}+`, label: "Students trained" },
    { icon: Percent, value: `${settings.placementRate}%`, label: "Placement record" },
    { icon: Award, value: `${years}+ yrs`, label: "Training experience" },
    { icon: Star, value: `${settings.averageRating}/5`, label: "Student rating" },
  ];

  const highlights = [
    "Free counselling and two demo classes",
    "Small batches of up to 30 students",
    "0% EMI and scholarship options",
    "Lifetime access to class recordings",
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
              Learn the skills that{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                  get you hired
                </span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded bg-accent-100" />
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-600">
              {settings.siteName}, {settings.city} — practical, project-based training in web development, data science,
              design, digital marketing and more. Live classes, real projects and placement support from day one, with
              more than {Number(settings.studentsTrained).toLocaleString("en-IN")} students trained so far.
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
                Explore courses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/apply" className="btn btn-accent btn-lg">
                <CalendarCheck className="h-4 w-4" /> Book free counselling
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
                {settings.averageRating}/5 average student rating
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
                    {heroCourse?.title ?? "Full Stack Web Development"}
                  </h2>
                </div>
                <span className="chip chip-accent">
                  {heroCourse?.seats ?? 30} seats · {heroCourse?.mode ?? "Hybrid"}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: BookOpen, label: "Duration", value: heroCourse?.duration ?? "6 Months" },
                  { icon: Laptop, label: "Mode", value: heroCourse?.mode ?? "Hybrid" },
                  {
                    icon: Wallet,
                    label: "Fees",
                    value: formatINR(
                      heroCourse
                        ? heroCourse.discountFee && heroCourse.discountFee < heroCourse.fee
                          ? heroCourse.discountFee
                          : heroCourse.fee
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
                {(
                  heroCourse?.highlights ?? [
                    "12 industry-level projects",
                    "Live classes with lifetime recordings",
                    "Mock interviews and resume review",
                  ]
                )
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
                  href={heroCourse ? `/courses/${heroCourse.slug}` : "/courses"}
                  className="btn btn-primary flex-1"
                >
                  View syllabus
                </Link>
                <Link href={heroCourse ? `/apply?course=${heroCourse.slug}` : "/apply"} className="btn btn-outline flex-1">
                  Apply now
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
                    {truncate(testimonials[0]?.role ?? "Software Engineer at Infosys", 32)}
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
            title="Job-oriented courses built around industry demand"
            description="Every course includes live projects, a portfolio you can show and placement support. Choose your path from beginner to advanced."
            action={{ href: "/courses", label: "All courses" }}
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} featured />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            <span>Not sure which course suits you?</span>
            <Link href="/apply" className="font-semibold text-brand-700 hover:text-brand-900">
              Book a free counselling session →
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------ WHY US ----------------------------- */}
      <section className="section bg-canvas">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why students choose us"
            title="More than classes — a complete career support system"
            description="Our focus is not just finishing a syllabus. It is making sure you walk into interviews prepared."
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
              {settings.placementRate}% placement record — from preparation to offer letter
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Our placement cell starts working three months before you finish: rewriting your resume, cleaning up your
              GitHub and LinkedIn profiles, running five mock interviews and referring you to more than 120 hiring
              partners.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Resume and portfolio review, twice, at no cost",
                "Technical and HR mock interviews",
                "Aptitude and communication practice sessions",
                "Daily job openings shared in a private group",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/testimonials" className="btn btn-primary">
                <MessageSquareQuote className="h-4 w-4" /> Read placed students&apos; stories
              </Link>
              <Link href="/about" className="btn btn-outline">
                About the institute
              </Link>
            </div>
          </div>

          <div className="card overflow-hidden p-6">
            <p className="text-center text-[13px] font-semibold uppercase tracking-wider text-slate-400">
              Our students now work at
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
            title="What our students say"
            description={`Rated ${settings.averageRating}/5 on average by our students`}
            action={{ href: "/testimonials", label: "All testimonials" }}
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
            title="Admission in four simple steps"
            align="center"
            description="Apply today and our team will call you within 24 hours to guide you through the whole process."
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
              Fill the application form <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------- BLOG ------------------------------ */}
      <section className="section bg-canvas">
        <div className="container-x">
          <SectionHeading
            eyebrow="Career blog"
            title="Skills, roadmaps and job tips"
            description="Practical guides written from the experience of our trainers and placement team."
            action={{ href: "/blog", label: "All articles" }}
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
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Your questions, answered directly</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              Admission, fees, EMI, batch timings and placement — the questions we hear most often are answered here.
              Anything else? Ask the chatbot or simply give us a call.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/faq" className="btn btn-outline">
                All FAQs
              </Link>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-primary">
                <Phone className="h-4 w-4" /> Call us
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
              <Link
                href="/contact#map"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
              >
                View on the map <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div>
            <FaqAccordion faqs={faqs} />
            <p className="mt-4 text-center text-[13px] text-slate-500">
              Still have a question?{" "}
              <Link href="/contact" className="font-semibold text-brand-700">
                Send us a message
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title={`Talk to us about admission at ${settings.siteName}`}
        description="Free counselling, two demo classes and 0% EMI options. Seats are limited and new batches fill up quickly."
        primary={{ href: "/apply", label: "Apply online" }}
        secondary={{ href: "/contact", label: "Schedule a campus visit" }}
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
