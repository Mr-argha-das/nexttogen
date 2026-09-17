import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Compass,
  Eye,
  HeartHandshake,
  Laptop,
  Lightbulb,
  MapPin,
  Monitor,
  Phone,
  Target,
  Users,
  Wifi,
} from "lucide-react";
import { getSettings, listCourses, listTestimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { SITE_CONTENT } from "@/content/settings";
import { initials } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { CtaBand, StatCard, TestimonialCard } from "@/components/site/cards";

export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "About Us — Institute, faculty and infrastructure",
    description: `${settings.siteName}, established in ${settings.foundedYear}, is a practical skill-training institute. More than ${Number(
      settings.studentsTrained,
    ).toLocaleString("en-IN")} students trained, a ${settings.placementRate}% placement record, industry-expert faculty and modern computer labs.`,
    path: "/about",
    keywords: [`about ${settings.siteName}`, "institute faculty", "computer lab", "training institute history"],
  });
}

export default async function AboutPage() {
  const settings = getSettings();
  const courses = listCourses();
  const testimonials = listTestimonials({ featuredOnly: true, limit: 3 });
  const years = Math.max(1, new Date().getFullYear() - Number(settings.foundedYear || "2014"));

  const stats = [
    { icon: Users, value: `${Number(settings.studentsTrained).toLocaleString("en-IN")}+`, label: "Students trained" },
    { icon: Award, value: `${settings.placementRate}%`, label: "Placement record" },
    { icon: Laptop, value: `${courses.length}`, label: "Job-oriented courses" },
    { icon: HeartHandshake, value: `${years} years`, label: "Of community training" },
  ];

  const values = [
    {
      icon: Target,
      title: "Skills first, certificate second",
      text: "Our focus is that every student can actually BUILD something. Projects, assignments and lab work are the foundation of how we teach.",
    },
    {
      icon: HeartHandshake,
      title: "Honest counselling",
      text: "We never make false placement promises. Students are told plainly how much work is involved and how long it takes.",
    },
    {
      icon: Lightbulb,
      title: "Affordable and accessible",
      text: "Scholarships, EMI and reduced-fee batches, so that money never becomes a barrier to learning.",
    },
    {
      icon: Building2,
      title: "Industry connection",
      text: "Trainers who work in the industry themselves, plus hiring tie-ups with 120+ companies.",
    },
  ];

  const infrastructure = [
    { icon: Monitor, label: "3 computer labs", note: "60+ systems with one-to-one lab access" },
    { icon: Wifi, label: "High-speed internet", note: "For live projects and cloud tools" },
    { icon: BookOpen, label: "Digital library", note: "Recorded lectures and study material" },
    { icon: Laptop, label: "Project studio", note: "A dedicated room for group projects" },
  ];

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`Building careers with real skills since ${settings.foundedYear}`}
        description={`${settings.legalName} began in a single small classroom with six computers and twelve students. Today more than ${Number(
          settings.studentsTrained,
        ).toLocaleString("en-IN")} students have studied with us, and our alumni work across the IT, banking, retail and startup ecosystem in ${settings.city} and beyond.`}
        crumbs={[{ label: "About Us" }]}
      />

      <section className="pt-8">
        <div className="container-x grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              From one small classroom to one of {settings.city}&apos;s most trusted institutes
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-slate-600">
              <p>
                We started in {settings.foundedYear} with a single belief: along with a degree, students deserve{" "}
                <strong>skills they can actually work with</strong>. Back then we had six computers and one course
                (DCA). Our students trusted us, and that trust is what moved us forward.
              </p>
              <p>
                Today we run more than eight courses, from web development and data science to cyber security and digital
                marketing. Every year brings new trainers, new labs and new industry partnerships, but one thing has not
                changed: batches stay small, and every student gets personal attention.
              </p>
              <p>
                Our placement cell does not just pass on referrals — it works on everything from your resume to mock
                interviews. That is why our placement record stands at {settings.placementRate}%, and why students keep
                referring their friends to us.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/courses" className="btn btn-primary">
                Browse courses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/testimonials" className="btn btn-outline">
                Student stories
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-[14px] font-bold text-ink">{title}</h3>
                <p className="mt-2 text-[12.5px] leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section bg-canvas">
        <div className="container-x grid gap-5 lg:grid-cols-3">
          <div className="card p-6">
            <Compass className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-heading text-lg font-bold">Mission</h2>
            <p className="mt-2 text-[14px] leading-7 text-slate-600">
              To equip the youth of {settings.city} and nearby areas with industry-ready skills — through affordable
              fees, practical training and honest guidance, so they can build a better future for their families and
              their communities.
            </p>
          </div>
          <div className="card p-6">
            <Eye className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-heading text-lg font-bold">Vision</h2>
            <p className="mt-2 text-[14px] leading-7 text-slate-600">
              To be the most trusted skill-training institute in the region — where every graduate is working in their
              chosen field and comes back to guide the next generation of students.
            </p>
          </div>
          <div className="card p-6">
            <HeartHandshake className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-heading text-lg font-bold">Social responsibility</h2>
            <p className="mt-2 text-[14px] leading-7 text-slate-600">
              Free and heavily discounted batches every year for girl students, SC/ST/OBC candidates and rural
              learners. Old laptops are refurbished and given to students who need them.
            </p>
            <Link href="/support" className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-semibold text-brand-700">
              Support us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="section" id="faculty">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Faculty</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Our trainers come from the industry</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              Our faculty are not purely academic — each of them has spent 9 to 14 years working in companies. That is
              why classes discuss real projects, real deadlines and real interview questions.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_CONTENT.faculty.map((member) => (
              <div key={member.name} className="card card-hover p-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 font-heading text-lg font-bold text-white">
                  {member.initials}
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-ink">{member.name}</h3>
                <p className="text-[12.5px] font-semibold text-brand-600">{member.role}</p>
                <p className="mt-1 text-[11.5px] font-medium uppercase tracking-wide text-slate-400">
                  {member.experience} experience
                </p>
                <p className="mt-3 text-[12.5px] leading-6 text-slate-600">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-5 text-center text-[13px] text-slate-500">
            Note: these are sample faculty profiles. Replace them with your real team from the admin panel or in code.
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section bg-canvas">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Infrastructure</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Campus and labs</h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                {settings.addressLine1}
                {settings.addressLine2 ? `, ${settings.addressLine2}` : ""}, {settings.city}, {settings.state} –{" "}
                {settings.pincode}
              </p>
            </div>
            <Link href="/contact#map" className="btn btn-outline">
              <MapPin className="h-4 w-4" /> Directions
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {infrastructure.map(({ icon: Icon, label, note }) => (
              <div key={label} className="card flex items-start gap-3 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[14px] font-bold text-ink">{label}</p>
                  <p className="text-[12.5px] leading-5 text-slate-600">{note}</p>
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Air-conditioned classrooms with projectors",
              "Power backup, so classes are never interrupted",
              "CCTV-monitored campus with a safe environment",
              "Separate washroom and common room for girls",
              "RO drinking water and a comfortable waiting area",
              "Library with exam preparation material",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13.5px] text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials + CTA */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">In our students&apos; words</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">What students say about us</h2>
            </div>
            <Link href="/testimonials" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
              All reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Visit the campus and see for yourself"
        description="Sit in a class, look at the labs and talk to our trainers. Then decide — there is no pressure from our side."
        primary={{ href: "/contact", label: "Schedule a campus visit" }}
        secondary={{ href: `tel:${settings.phone.replace(/\s/g, "")}`, label: `Call ${settings.phone}` }}
      />
    </>
  );
}
