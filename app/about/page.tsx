import Link from "next/link";
import {
  Sparkles,
  Target,
  Heart,
  Users,
  Award,
  Globe,
  GraduationCap,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { testimonials } from "@/lib/data";

const team = [
  {
    name: "Dr. Ananya Roy",
    role: "Founder & CEO",
    bio: "Ex-McKinsey, IIT Delhi. Believes education is the highest leverage for change.",
    initials: "AR"
  },
  {
    name: "Prof. Kunal Sethi",
    role: "Chief Academic Officer",
    bio: "Former faculty at Stanford. 20+ years in pedagogy & curriculum design.",
    initials: "KS"
  },
  {
    name: "Meera Joshi",
    role: "Head of Mentorship",
    bio: "Ex-Google PM. Has mentored 2,000+ students into top tech careers.",
    initials: "MJ"
  },
  {
    name: "Arjun Khanna",
    role: "Head of Careers",
    bio: "Built talent pipelines at Flipkart & Unacademy. Our students' biggest advocate.",
    initials: "AK"
  }
];

const values = [
  {
    icon: Target,
    title: "Rigour",
    desc: "We hold ourselves to the bar of the world's best institutions."
  },
  {
    icon: Heart,
    title: "Empathy",
    desc: "We meet learners where they are and help them get where they dream of being."
  },
  {
    icon: Sparkles,
    title: "Curiosity",
    desc: "We foster lifelong learning — in our students and in ourselves."
  },
  {
    icon: Users,
    title: "Community",
    desc: "Growth happens together. We build belonging before building skills."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative container-x pt-20 pb-28 md:pt-28 md:pb-36">
          <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
            <Sparkles className="h-3.5 w-3.5" /> About NextToGen
          </span>
          <h1 className="heading mt-5 text-4xl md:text-6xl text-white max-w-3xl">
            A decade of building minds that build the future.
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl text-lg">
            We're a team of educators, engineers, and dreamers united by one
            mission: to make world-class learning accessible to every human
            willing to put in the work.
          </p>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Stats */}
      <section className="container-x -mt-16 relative z-10">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { n: "10+", l: "Years of Impact", icon: Award },
            { n: "25K+", l: "Alumni Worldwide", icon: GraduationCap },
            { n: "120+", l: "Mentors & Faculty", icon: Users },
            { n: "94%", l: "Career Placement", icon: TrendingUp }
          ].map((s) => (
            <div key={s.l} className="card !p-6 text-center">
              <s.icon className="h-7 w-7 text-gold-500 mx-auto" />
              <div className="mt-3 font-display text-3xl font-bold text-brand-900">
                {s.n}
              </div>
              <div className="text-xs uppercase tracking-wider text-ink-500 mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="eyebrow">
              <Target className="h-3.5 w-3.5" /> Our Mission
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              To unlock human potential at scale.
            </h2>
            <p className="mt-5 text-ink-600 text-lg leading-relaxed">
              We believe talent is evenly distributed, but opportunity is not.
              That's why we've built a different kind of academy — one that
              combines the rigour of a top university, the relevance of industry,
              and the warmth of a mentorship relationship.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Every program we build starts with one question: "Will this change
              a learner's life?" If the answer isn't a clear "yes," we don't
              ship it.
            </p>
            <div className="mt-8">
              <Link href="/support" className="btn-gold">
                Support Our Mission <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-brand-700 to-brand-950 relative overflow-hidden shadow-glow-brand">
              <div className="absolute inset-0 bg-hero-radial opacity-70" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                  backgroundSize: "36px 36px"
                }}
              />
              <div className="relative h-full flex flex-col items-center justify-center p-10 text-center text-white">
                <div className="h-20 w-20 rounded-2xl bg-gold-400 text-brand-950 flex items-center justify-center shadow-glow-gold">
                  <GraduationCap className="h-10 w-10" />
                </div>
                <p className="mt-6 font-display text-2xl italic leading-snug">
                  "Education is the most powerful weapon which you can use to
                  change the world."
                </p>
                <p className="mt-3 text-gold-400 text-sm font-semibold">
                  — Nelson Mandela
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gradient-to-b from-white to-brand-50/50">
        <div className="container-x">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow">
              <Heart className="h-3.5 w-3.5" /> Our Values
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              What we stand for.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-brand-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" id="careers">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <Users className="h-3.5 w-3.5" /> Our Team
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl">
              The people behind NextToGen.
            </h2>
            <p className="mt-4 text-ink-600 text-lg">
              Educators, operators and engineers who have built at world-class
              institutions and companies — and who care deeply about the next
              generation.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="card text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-brand-700 to-brand-950 text-gold-400 flex items-center justify-center text-2xl font-display font-bold">
                  {m.initials}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-900">
                  {m.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-gold-600 mt-1">
                  {m.role}
                </p>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials strip */}
      <section className="section bg-brand-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
        <div className="relative container-x">
          <div className="max-w-2xl">
            <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
              <Globe className="h-3.5 w-3.5" /> Global Impact
            </span>
            <h2 className="heading mt-4 text-3xl md:text-5xl text-white">
              Stories from our community.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-7"
              >
                <p className="text-white/85 leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full border-2 border-gold-400"
                  />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-white/60">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
