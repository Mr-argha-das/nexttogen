import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Hammer,
  Laptop,
  MapPin,
  MessageSquareQuote,
  Percent,
  Phone,
  Presentation,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
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
  StatsBand,
  TestimonialCard,
  iconForCourse,
} from "@/components/site/cards";
import { AvatarCluster, CourseArt, Marquee, Orbs } from "@/components/site/decor";
import { Reveal } from "@/components/site/motion";
import { FaqAccordion } from "@/components/site/faq-accordion";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  presentation: Presentation,
  users: Users,
  hammer: Hammer,
  briefcase: Briefcase,
  target: Target,
  wallet: Wallet,
};

const HERO_POINTS = [
  { icon: Sparkles, text: "2 free demo classes" },
  { icon: Wallet, text: "0% interest EMI" },
  { icon: ShieldCheck, text: "100% placement assistance" },
];

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
  const students = Number(settings.studentsTrained) || 0;

  const heroStats = [
    { value: `${students.toLocaleString("en-IN")}+`, label: "Students trained" },
    { value: `${settings.placementRate}%`, label: "Placement record" },
    { value: `${years}+ yrs`, label: "Experience" },
  ];

  const avatars = (testimonials.length ? testimonials : []).slice(0, 4).map((person) => ({
    name: person.name,
    initials: person.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join(""),
  }));

  return (
    <>
      {/* ================================= HERO ================================= */}
      <section className="relative overflow-hidden bg-[var(--grad-brand-deep)] pb-28 pt-14 text-white sm:pb-32 lg:pt-20">
        <Orbs tone="mixed" className="opacity-70" />
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.16]" />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.07]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--canvas)]" />

        <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          {/* copy */}
          <div className="animate-rise">
            <span className="eyebrow-pill !border-white/20 !bg-white/10 !text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Admissions open · {new Date().getFullYear()} batches
            </span>

            <h1 className="display-1 mt-6 text-white">
              Learn the skills that
              <br className="hidden sm:block" />{" "}
              <span className="relative inline-block">
                <span className="text-gradient relative z-10">get you hired</span>
                <span className="absolute inset-x-0 bottom-1.5 z-0 h-3.5 rounded-full bg-accent-500/30" />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[15.5px] leading-8 text-white/70">
              {settings.siteName}, {settings.city} — practical, project-based training in web development, data science,
              design, digital marketing and more. Live classes, real projects and placement support from day one, with{" "}
              {students.toLocaleString("en-IN")}+ students trained so far.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {HERO_POINTS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3.5 py-2 text-[12.5px] font-semibold text-white/85 backdrop-blur"
                >
                  <Icon className="h-3.5 w-3.5 text-accent-300" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/courses" className="btn btn-accent btn-lg">
                Explore courses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/apply" className="btn btn-light btn-lg">
                <CalendarCheck className="h-4 w-4" /> Book free counselling
              </Link>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="hidden items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white sm:flex"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.07]">
                  <Phone className="h-4 w-4" />
                </span>
                {settings.phone}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              {avatars.length ? (
                <div className="flex items-center gap-3">
                  <AvatarCluster people={avatars} tone="dark" />
                  <p className="text-[12.5px] leading-tight text-white/65">
                    <strong className="block text-white">{settings.averageRating}/5 rating</strong>
                    from our students
                  </p>
                </div>
              ) : null}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.07]">
                  <MapPin className="h-4 w-4 text-accent-300" />
                </span>
                <p className="text-[12.5px] leading-tight text-white/65">
                  <strong className="block text-white">On-campus + online</strong>
                  {settings.addressLine1}, {settings.city}
                </p>
              </div>
            </div>
          </div>

          {/* visual composition */}
          <div className="relative animate-rise [animation-delay:140ms]">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-white/[0.04]" />

            {/* main course card */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white p-5 text-ink shadow-[var(--shadow-xl)]">
              <div className="relative -mx-5 -mt-5 h-40 overflow-hidden">
                <CourseArt
                  seed={heroCourse?.slug ?? "full-stack-web-development"}
                  icon={heroCourse ? iconForCourse(heroCourse) : Laptop}
                />
                <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <span className="chip chip-glass">Most popular</span>
                    <h2 className="mt-2 font-heading text-lg font-bold text-white">
                      {heroCourse?.title ?? "Full Stack Web Development"}
                    </h2>
                  </div>
                  <span className="rounded-xl bg-white/95 px-2.5 py-1.5 text-[11px] font-extrabold text-brand-800 shadow">
                    {heroCourse?.seats ?? 30} seats
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2.5">
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
                  <div key={label} className="rounded-2xl border border-line bg-canvas p-3">
                    <Icon className="h-4 w-4 text-brand-600" />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                    <p className="text-[12.5px] font-bold text-ink">{value}</p>
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
                  .slice(0, 3)
                  .map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-[12.5px] text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {truncate(highlight, 62)}
                    </li>
                  ))}
              </ul>

              <div className="mt-5 flex gap-2">
                <Link href={heroCourse ? `/courses/${heroCourse.slug}` : "/courses"} className="btn btn-primary flex-1">
                  View syllabus
                </Link>
                <Link
                  href={heroCourse ? `/apply?course=${heroCourse.slug}` : "/apply"}
                  className="btn btn-outline flex-1"
                >
                  Apply now
                </Link>
              </div>
            </div>

            {/* floating rating card */}
            <div className="animate-float absolute -left-3 -top-5 hidden rounded-2xl border border-white/15 bg-white/95 px-4 py-3 shadow-[var(--shadow-lg)] backdrop-blur sm:block">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-heading text-base font-extrabold leading-none text-ink">
                    {settings.placementRate}%
                  </p>
                  <p className="text-[10.5px] font-medium text-slate-500">Placement record</p>
                </div>
              </div>
            </div>

            {/* floating student card */}
            <div className="animate-float-slow absolute -bottom-6 -right-3 hidden w-60 rounded-2xl border border-white/15 bg-white/95 p-3.5 shadow-[var(--shadow-lg)] backdrop-blur sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800 text-[12px] font-bold text-white">
                  {testimonials[0]?.name
                    ?.split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("") ?? "AS"}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-bold text-ink">{testimonials[0]?.name ?? "Aman Sharma"}</p>
                  <p className="truncate text-[11px] text-slate-500">
                    {truncate(testimonials[0]?.role ?? "Software Engineer at Infosys", 30)}
                  </p>
                </div>
              </div>
            </div>

            {/* decorative rings */}
            <span className="pointer-events-none absolute -right-6 top-8 hidden h-24 w-24 rounded-full border border-white/15 lg:block" />
            <span className="pointer-events-none absolute -bottom-10 left-12 hidden h-16 w-16 rounded-full border border-white/10 lg:block" />
          </div>
        </div>
      </section>

      {/* ============================= TRUST STRIP ============================== */}
      <section className="relative z-10 -mt-16">
        <div className="container-x">
          <div className="rounded-[1.75rem] border border-line bg-white/95 px-6 py-6 shadow-[var(--shadow-lg)] backdrop-blur">
            <p className="text-center text-[11.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Our students now work at
            </p>
            <div className="mt-4">
              <PlacementStrip partners={SITE_CONTENT.placementPartners} />
            </div>
          </div>
        </div>
      </section>

      {/* ================================ STATS ================================ */}
      <section className="section-tight pt-14">
        <div className="container-x">
          <StatsBand
            stats={[
              { icon: Users, value: students, suffix: "+", label: "Students trained" },
              { icon: Percent, value: Number(settings.placementRate) || 0, suffix: "%", label: "Placement record" },
              { icon: Award, value: years, suffix: "+ yrs", label: "Training experience" },
              {
                icon: Star,
                value: Number(settings.averageRating) || 0,
                decimals: 1,
                label: "Average student rating",
              },
            ]}
          />
        </div>
      </section>

      {/* =============================== COURSES =============================== */}
      <section className="section pt-10">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Our courses"
              title="Job-oriented courses built around industry demand"
              description="Every course includes live projects, a portfolio you can show and placement support. Choose your path from beginner to advanced."
              action={{ href: "/courses", label: "All courses" }}
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course, index) => (
              <Reveal key={course.id} delay={index * 70}>
                <CourseCard course={course} featured />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line bg-canvas px-6 py-6 text-center sm:flex-row sm:justify-center sm:text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-[var(--shadow-xs)]">
              <Sparkles className="h-5 w-5" />
            </span>
            <p className="text-sm text-slate-600">
              Not sure which course suits you?{" "}
              <Link href="/apply" className="font-bold text-brand-700 underline decoration-accent-300 decoration-2 underline-offset-4">
                Book a free counselling session
              </Link>{" "}
              — we will map your goal to the right programme.
            </p>
          </div>
        </div>
      </section>

      {/* =============================== WHY US ================================ */}
      <section className="section band-canvas">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Why students choose us"
              title="More than classes — a complete career support system"
              description="Our focus is not just finishing a syllabus. It is making sure you walk into interviews prepared."
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONTENT.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 60}>
                <FeatureCard
                  icon={FEATURE_ICONS[feature.icon] ?? Target}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== PLACEMENT ============================== */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Placement support</p>
            <h2 className="display-2 mt-3">
              {settings.placementRate}% placement record — from{" "}
              <span className="text-gradient">preparation to offer letter</span>
            </h2>
            <p className="lede mt-5">
              Our placement cell starts working three months before you finish: rewriting your resume, cleaning up your
              GitHub and LinkedIn profiles, running five mock interviews and referring you to more than 120 hiring
              partners.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: CheckCircle2, text: "Resume and portfolio review, twice, at no cost" },
                { icon: CheckCircle2, text: "Technical and HR mock interviews" },
                { icon: CheckCircle2, text: "Aptitude and communication practice sessions" },
                { icon: CheckCircle2, text: "Daily job openings shared in a private group" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-[13.5px] leading-6 text-slate-700">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/testimonials" className="btn btn-primary">
                <MessageSquareQuote className="h-4 w-4" /> Read placed students&apos; stories
              </Link>
              <Link href="/about" className="btn btn-outline">
                About the institute
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-5">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[var(--grad-brand-deep)] p-7 text-white shadow-[var(--shadow-lg)]">
                <Orbs className="opacity-50" />
                <div className="relative">
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-white/50">
                    Placement cell promise
                  </p>
                  <p className="mt-4 font-heading text-[1.35rem] font-bold leading-snug">
                    &ldquo;We do not just forward your resume. We prepare you until you clear the interview.&rdquo;
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                    {[
                      { value: "120+", label: "Hiring partners" },
                      { value: "5", label: "Mock interviews" },
                      { value: "1:1", label: "Career mentoring" },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="font-heading text-xl font-extrabold text-accent-300">{item.value}</p>
                        <p className="mt-1 text-[11.5px] text-white/60">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-heading text-[1.05rem] font-bold">Hiring drives every month</p>
                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    On-campus and virtual drives with partner companies, plus referrals for alumni.
                  </p>
                </div>
                <div className="card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-heading text-[1.05rem] font-bold">₹3–12 LPA outcomes</p>
                  <p className="mt-2 text-[13px] leading-6 text-slate-600">
                    Salary range reported by our graduates across IT, analytics and marketing roles.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================== ADMISSION PROCESS ========================== */}
      <section className="section band-canvas">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Admission process"
              title="Admission in four simple steps"
              align="center"
              description="Apply today and our team will call you within 24 hours to guide you through the whole process."
            />
          </Reveal>

          <div className="relative mt-14">
            <span
              className="absolute left-6 top-0 hidden h-full w-px lg:left-0 lg:top-7 lg:h-px lg:w-full lg:block"
              style={{ background: "linear-gradient(90deg, transparent, var(--brand-200) 12%, var(--brand-200) 88%, transparent)" }}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SITE_CONTENT.admissionsSteps.map((step, index) => (
                <Reveal key={step.step} delay={index * 80}>
                  <div className="card card-hover relative h-full p-6 pt-8">
                    <span className="absolute -top-5 left-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-800 font-heading text-sm font-extrabold text-white shadow-[var(--shadow-brand)]">
                      {step.step}
                    </span>
                    <h3 className="mt-2 font-heading text-[1.03rem] font-bold text-ink">{step.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-6 text-slate-600">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link href="/apply" className="btn btn-primary btn-lg">
              Fill the application form <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              <Clock className="h-4 w-4" /> Visit the campus
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ TESTIMONIALS ============================= */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Student testimonials"
              title="What our students say"
              description={`Rated ${settings.averageRating}/5 on average by the students who study with us.`}
              action={{ href: "/testimonials", label: "All testimonials" }}
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 80}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Star, title: `${settings.averageRating}/5 average rating`, text: "From verified student feedback" },
              { icon: Users, title: `${students.toLocaleString("en-IN")}+ learners`, text: "Trained since " + settings.foundedYear },
              { icon: MapPin, title: "Jaipur & online", text: "Students from across Rajasthan" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-4 rounded-2xl border border-line bg-canvas p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-[var(--shadow-xs)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[13.5px] font-bold text-ink">{title}</p>
                  <p className="text-[12px] text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================ BLOG ================================= */}
      <section className="section band-canvas">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Career blog"
              title="Skills, roadmaps and job tips"
              description="Practical guides written from the experience of our trainers and placement team."
              action={{ href: "/blog", label: "All articles" }}
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.id} delay={index * 70}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================= FAQ ================================= */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">FAQs</p>
            <h2 className="display-2 mt-3">Your questions, answered directly</h2>
            <p className="lede mt-5">
              Admission, fees, EMI, batch timings and placement — the questions we hear most often are answered here.
              Anything else? Ask the chatbot or simply give us a call.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/faq" className="btn btn-outline">
                All FAQs
              </Link>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="btn btn-primary">
                <Phone className="h-4 w-4" /> Call us
              </a>
            </div>

            <div className="mt-9 overflow-hidden rounded-[1.5rem] border border-line bg-canvas p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-700 shadow-[var(--shadow-xs)]">
                <MapPin className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[11.5px] font-bold uppercase tracking-[0.18em] text-slate-400">Visit us</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                {settings.addressLine1}
                {settings.addressLine2 ? `, ${settings.addressLine2}` : ""}
                <br />
                {settings.city}, {settings.state} – {settings.pincode}
              </p>
              <p className="mt-3 flex items-center gap-2 text-[13px] text-slate-500">
                <Clock className="h-4 w-4 text-brand-500" /> {settings.officeHours}
              </p>
              <Link
                href="/contact#map"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900"
              >
                View on the map <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <FaqAccordion faqs={faqs} />
            <p className="mt-5 text-center text-[13px] text-slate-500">
              Still have a question?{" "}
              <Link href="/contact" className="font-bold text-brand-700 underline decoration-accent-300 decoration-2 underline-offset-4">
                Send us a message
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================ EXTRA HIGHLIGHTS ========================= */}
      <section className="section-tight band-canvas">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Clock, title: "Flexible batches", text: "Morning, afternoon, evening and weekend." },
            { icon: Laptop, title: "Online or campus", text: "Live classes with recordings included." },
            { icon: Award, title: "Certified courses", text: "Certificate with project record on completion." },
            { icon: Briefcase, title: "Internship support", text: "Live client work for top performers." },
          ].map(({ icon: Icon, title, text }) => (
            <StatCard key={title} icon={Icon} value={title} label={text} />
          ))}
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
