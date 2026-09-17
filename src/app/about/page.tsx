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
    title: "About Us — Institute, faculty aur infrastructure",
    description: `${settings.siteName} (est. ${settings.foundedYear}) — practical skill training institute. ${Number(
      settings.studentsTrained,
    ).toLocaleString("en-IN")}+ students trained, ${settings.placementRate}% placement record, industry-expert faculty aur modern computer labs.`,
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
    { icon: HeartHandshake, value: `${years} saal`, label: "Community training" },
  ];

  const values = [
    {
      icon: Target,
      title: "Skill pehle, certificate baad me",
      text: "Humara pura focus hai ki student kuch BANA sake. Projects, assignments aur lab work — yahi humari teaching ka base hai.",
    },
    {
      icon: HeartHandshake,
      title: "Honest counselling",
      text: "Hum kabhi jhoothi placement guarantee nahi dete. Students ko saaf batate hain kitna kaam lagega, kitna time lagega.",
    },
    {
      icon: Lightbulb,
      title: "Affordable & accessible",
      text: "Scholarship, EMI aur reduced-fee batches — taaki paisa kisi ke seekhne ke raaste me na aaye.",
    },
    {
      icon: Building2,
      title: "Industry connection",
      text: "Trainers jo khud industry me kaam karte hain, aur 120+ companies ke saath hiring tie-ups.",
    },
  ];

  const infrastructure = [
    { icon: Monitor, label: "3 computer labs", note: "60+ systems, 1:1 lab access" },
    { icon: Wifi, label: "High-speed internet", note: "Live projects aur cloud tools ke liye" },
    { icon: BookOpen, label: "Digital library", note: "Recorded lectures + study material" },
    { icon: Laptop, label: "Project studio", note: "Group projects ke liye separate room" },
  ];

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`${settings.foundedYear} se skills, sirf skills`}
        description={`${settings.legalName} ki shuruat ek chhote se classroom se hui thi — 6 computers aur 12 students ke saath. Aaj ${Number(
          settings.studentsTrained,
        ).toLocaleString("en-IN")}+ students humare saath padh chuke hain aur ${settings.city} ke IT, banking, retail aur startup ecosystem me kaam kar rahe hain.`}
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
            <p className="eyebrow">Humari kahani</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Ek chhote classroom se {settings.city} ke bharose-wale institute tak
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-slate-600">
              <p>
                {settings.foundedYear} me humne sirf ek soch ke saath shuru kiya tha — college degree ke saath-saath
                <strong> kaam karne layak skill</strong> milni chahiye. Tab humare paas 6 computers the aur ek hi course
                (DCA). Students ne bharosa kiya, aur unhone hi humein aage badhaya.
              </p>
              <p>
                Aaj hum 8 se zyada courses chalate hain — web development se lekar data science, cyber security aur digital
                marketing tak. Har saal naye trainers, naye labs aur nayi industry partnerships judti hain, lekin ek cheez
                kabhi nahi badli: batches chhote rehte hain, aur har student par personal attention.
              </p>
              <p>
                Humara placement cell sirf referral nahi deta — resume se lekar mock interview tak sab karata hai. Yahi
                wajah hai ki hamara placement record {settings.placementRate}% hai aur students humein referral dete hain.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/courses" className="btn btn-primary">
                Courses dekhein <ArrowRight className="h-4 w-4" />
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
              {settings.city} aur aas-paas ke areas ke youth ko industry-ready skills dena — affordable fees, practical
              training aur honest guidance ke saath, taaki wo apne parivaar aur samaj ko aage badha sakein.
            </p>
          </div>
          <div className="card p-6">
            <Eye className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-heading text-lg font-bold">Vision</h2>
            <p className="mt-2 text-[14px] leading-7 text-slate-600">
              Rajasthan ka sabse bharosemand skill-training institute banna, jahan se nikalne wala har student apne field
              me kaam kar raha ho — aur wapas aakar naye students ko raasta dikhaye.
            </p>
          </div>
          <div className="card p-6">
            <HeartHandshake className="h-6 w-6 text-brand-600" />
            <h2 className="mt-3 font-heading text-lg font-bold">Social responsibility</h2>
            <p className="mt-2 text-[14px] leading-7 text-slate-600">
              Har saal free aur heavily-discounted batches girl students, SC/ST/OBC candidates aur rural students ke liye.
              Purane laptops refurbish karke zarooratmand students ko diye jaate hain.
            </p>
            <Link href="/support" className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-semibold text-brand-700">
              Support Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="section" id="faculty">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Faculty</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Jo padhate hain, wo industry se aate hain</h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              Humare trainers sirf theory wale nahi hain — sabhi ne 9 se 14 saal tak companies me kaam kiya hai. Isliye
              class me real projects, real deadlines aur real interview questions discuss hote hain.
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
            Note: ye demo faculty profiles hain — admin panel se (ya code me) real faculty details update kar lijiye.
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section bg-canvas">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Infrastructure</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Campus & labs</h2>
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
              "Air-conditioned classrooms with projector",
              "Power backup — classes kabhi nahi rukti",
              "CCTV monitored campus & safe environment",
              "Girls ke liye separate washroom & common room",
              "RO drinking water & waiting area",
              "Library me exam preparation material",
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
              <p className="eyebrow">Students ki zubaani</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Humare baare me students kya kehte hain</h2>
            </div>
            <Link href="/testimonials" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
              Sabhi reviews <ArrowRight className="h-4 w-4" />
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
        title="Campus aaiye, khud dekh lijiye"
        description="Ek baar aa kar class attend kijiye, lab dekhiye aur trainers se baat kijiye. Uske baad decide kijiye — humein koi jaldi nahi."
        primary={{ href: "/contact", label: "Campus visit schedule" }}
        secondary={{ href: `tel:${settings.phone.replace(/\s/g, "")}`, label: `Call ${settings.phone}` }}
      />
    </>
  );
}
