import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  Calculator,
  CalendarDays,
  Clock,
  Code2,
  GraduationCap,
  Languages,
  Laptop,
  Megaphone,
  MonitorSmartphone,
  PenTool,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { BlogPost, Course, Testimonial } from "@/lib/types";
import { cn, discountPercent, formatDate, formatINR, initials, truncate } from "@/lib/utils";
import { CourseArt, Marquee, Orbs } from "./decor";
import { Counter } from "./motion";

/* --------------------------- course icon mapping --------------------------- */

const ICONS: Record<string, LucideIcon> = {
  "full-stack-web-development": Code2,
  "python-data-science-ai": BrainCircuit,
  "digital-marketing-mastery": Megaphone,
  "ui-ux-graphic-design": PenTool,
  "tally-gst-accounting": Calculator,
  "cyber-security-ethical-hacking": ShieldCheck,
  "dca-computer-applications": MonitorSmartphone,
  "spoken-english-personality": Languages,
};

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Web Development": Code2,
  "Data & AI": BrainCircuit,
  "Digital Marketing": Megaphone,
  Design: PenTool,
  Accounting: Calculator,
  "Cyber Security": ShieldCheck,
  Foundation: MonitorSmartphone,
  "Soft Skills": Languages,
  Career: BarChart3,
  Government: GraduationCap,
};

export function iconForCourse(course: { slug: string; category: string }): LucideIcon {
  return ICONS[course.slug] ?? CATEGORY_ICONS[course.category] ?? GraduationCap;
}

/* ----------------------------- Section heading ---------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: { href: string; label: string };
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2
          className={cn(
            "display-2 mt-3",
            tone === "dark" && "text-white",
            align === "center" && "flex flex-col items-center",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className={cn("lede mt-4", tone === "dark" && "text-white/70")}>{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
            tone === "dark"
              ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
              : "border-line bg-white text-brand-700 shadow-[var(--shadow-xs)] hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[var(--shadow-sm)]",
          )}
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}

/* -------------------------------- Course ---------------------------------- */

export function CourseCard({ course, featured = false }: { course: Course; featured?: boolean }) {
  const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
  const off = discountPercent(course.fee, course.discountFee);
  const Icon = iconForCourse(course);
  const emi = Math.ceil(payable / 6 / 100) * 100;

  return (
    <article className="card card-hover card-rail group flex h-full flex-col overflow-hidden">
      <Link href={`/courses/${course.slug}`} className="relative block h-44 overflow-hidden" aria-label={course.title}>
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.06]">
          <CourseArt seed={course.slug} icon={Icon} />
        </div>

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="chip chip-glass">{course.category}</span>
          {off > 0 ? (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-extrabold text-rose-600 shadow-md">
              {off}% OFF
            </span>
          ) : null}
        </div>

        <div className="absolute inset-x-4 bottom-3">
          <h3 className="font-heading text-[1.05rem] font-bold leading-snug text-white drop-shadow-sm">
            {course.title}
          </h3>
          {course.tagline ? <p className="mt-1 text-[12px] text-white/75">{truncate(course.tagline, 64)}</p> : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[13.5px] leading-6 text-slate-600">{truncate(course.shortDesc, 118)}</p>

        <dl className="mt-4 grid grid-cols-2 gap-2">
          {[
            { icon: Clock, value: course.duration },
            { icon: Laptop, value: course.mode },
            { icon: BadgeCheck, value: course.level },
            { icon: Users, value: `${course.seats} seats` },
          ].map(({ icon: MetaIcon, value }) => (
            <div
              key={value}
              className="flex items-center gap-2 rounded-xl border border-line bg-canvas px-2.5 py-2 text-[12px] font-medium text-slate-600"
            >
              <MetaIcon className="h-3.5 w-3.5 shrink-0 text-brand-500" />
              <span className="truncate">{value}</span>
            </div>
          ))}
        </dl>

        {featured && course.highlights.length ? (
          <ul className="mt-4 space-y-2">
            {course.highlights.slice(0, 2).map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-[12.5px] leading-5 text-slate-600">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
                <span>{truncate(highlight, 58)}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-dashed border-line pt-4">
            <div>
              <p className="font-heading text-xl font-extrabold text-ink">{formatINR(payable)}</p>
              {off > 0 ? (
                <p className="text-[11.5px] text-slate-400">
                  <span className="line-through">{formatINR(course.fee)}</span> · EMI {formatINR(emi)}/mo
                </p>
              ) : (
                <p className="text-[11.5px] text-slate-400">EMI from {formatINR(emi)}/mo</p>
              )}
            </div>
            <Link
              href={`/apply?course=${course.slug}`}
              className="btn btn-primary btn-sm group/cta"
              aria-label={`Apply for ${course.title}`}
            >
              Apply
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* --------------------------------- Blog ----------------------------------- */

export function BlogCard({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  const Icon = CATEGORY_ICONS[post.category] ?? BarChart3;

  return (
    <article
      className={cn(
        "card card-hover card-rail group flex h-full flex-col overflow-hidden",
        compact && "sm:flex-row",
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn("relative block shrink-0 overflow-hidden", compact ? "h-44 sm:h-auto sm:w-48" : "h-44")}
        aria-label={post.title}
      >
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.06]">
          <CourseArt seed={post.slug} icon={Icon} compact />
        </div>
        <span className="chip chip-glass absolute left-3 top-3">{post.category}</span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-3 text-[11.5px] font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
          </span>
        </p>

        <h3 className="mt-2.5 font-heading text-[1.02rem] font-bold leading-snug text-ink">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-700">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 text-[13px] leading-6 text-slate-600">{truncate(post.excerpt, compact ? 105 : 128)}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-700">
              {initials(post.author || "NextGen")}
            </span>
            {post.author}
          </span>
          <ArrowUpRight className="h-4 w-4 text-brand-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700" />
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ Testimonial -------------------------------- */

export function TestimonialCard({
  testimonial,
  className,
  tone = "light",
}: {
  testimonial: Testimonial;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <figure
      className={cn(
        "card card-hover flex h-full flex-col p-6",
        tone === "dark" && "border-white/10 bg-white/5 backdrop-blur",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--grad-brand)] text-white shadow-[var(--shadow-sm)]">
          <Quote className="h-4.5 w-4.5" />
        </span>
        <span className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "h-3.5 w-3.5",
                index < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-slate-200",
              )}
            />
          ))}
        </span>
      </div>

      <blockquote
        className={cn("mt-4 flex-1 text-[13.5px] leading-7 text-slate-600", tone === "dark" && "text-white/75")}
      >
        {truncate(testimonial.message, 260)}
      </blockquote>

      <div className={cn("mt-5 flex items-center gap-3 border-t pt-4", tone === "dark" ? "border-white/10" : "border-line")}>
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--grad-brand)] text-[13px] font-bold text-white ring-2 ring-white/60">
          {initials(testimonial.name)}
        </span>
        <figcaption className="min-w-0">
          <p className={cn("truncate text-[13.5px] font-bold text-ink", tone === "dark" && "text-white")}>
            {testimonial.name}
          </p>
          <p className={cn("truncate text-[12px] text-slate-500", tone === "dark" && "text-white/60")}>
            {testimonial.role ?? testimonial.course}
            {testimonial.city ? ` · ${testimonial.city}` : ""}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

/* -------------------------------- Small bits ------------------------------- */

export function StatCard({
  icon: Icon,
  value,
  label,
  tone = "light",
}: {
  icon: LucideIcon;
  value: React.ReactNode;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1",
        tone === "dark"
          ? "border-white/10 bg-white/[0.06] backdrop-blur hover:bg-white/[0.1]"
          : "border-line bg-white shadow-[var(--shadow-sm)] hover:border-brand-200 hover:shadow-[var(--shadow-md)]",
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
          tone === "dark"
            ? "bg-white/10 text-white"
            : "bg-brand-50 text-brand-700 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white",
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className={cn("mt-4 font-heading text-[1.7rem] font-extrabold leading-none", tone === "dark" && "text-white")}>
        {value}
      </p>
      <p className={cn("mt-1.5 text-[12.5px] font-medium", tone === "dark" ? "text-white/65" : "text-slate-500")}>
        {label}
      </p>
      <span
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          tone === "dark" ? "bg-white/10" : "bg-brand-100",
        )}
      />
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <div className="card card-hover card-rail group h-full p-6">
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--grad-brand)] text-white shadow-[var(--shadow-brand)] transition-transform duration-300 group-hover:-rotate-6">
          <Icon className="h-5.5 w-5.5" />
        </span>
        {typeof index === "number" ? (
          <span className="font-heading text-3xl font-extrabold leading-none text-brand-100">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 font-heading text-[1.02rem] font-bold text-ink">{title}</h3>
      <p className="mt-2.5 text-[13.5px] leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-canvas text-brand-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}

export function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--grad-brand-deep)] px-6 py-12 text-white shadow-[var(--shadow-xl)] sm:px-12 sm:py-16">
          <Orbs tone="mixed" className="opacity-60" />
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.18]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <div>
              <span className="chip chip-glass">
                <Sparkles className="h-3.5 w-3.5" /> Free counselling · 2 demo classes
              </span>
              <h2 className="display-2 mt-4 text-white">{title}</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/75">{description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Link href={primary.href} className="btn btn-accent btn-lg justify-center">
                {primary.label} <ArrowRight className="h-4 w-4" />
              </Link>
              {secondary ? (
                <Link href={secondary.href} className="btn btn-light btn-lg justify-center">
                  {secondary.label}
                </Link>
              ) : null}
              <p className="text-center text-[12px] text-white/55 lg:text-left">
                Call, WhatsApp or walk in — no obligation, no pressure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlacementStrip({ partners, dark = false }: { partners: string[]; dark?: boolean }) {
  return (
    <Marquee>
      {partners.map((partner) => (
        <span
          key={partner}
          className={cn(
            "whitespace-nowrap font-heading text-[15px] font-bold tracking-tight transition-colors",
            dark ? "text-white/45 hover:text-white" : "text-slate-400 hover:text-brand-700",
          )}
        >
          {partner}
        </span>
      ))}
      <span className={cn("font-heading text-lg", dark ? "text-white/30" : "text-slate-300")}>•</span>
    </Marquee>
  );
}

/** Dark stats band — used on the home page between hero and courses. */
export function StatsBand({
  stats,
}: {
  stats: { icon: LucideIcon; value: number; suffix?: string; prefix?: string; label: string; decimals?: number }[];
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--grad-brand-deep)] px-6 py-10 shadow-[var(--shadow-xl)] sm:px-10">
      <Orbs tone="mixed" className="opacity-50" />
      <div className="grid-noise dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label, suffix, prefix, decimals }) => (
          <div key={label} className="text-center lg:text-left">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent-300 backdrop-blur lg:mx-0">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 font-heading text-[2rem] font-extrabold leading-none text-white sm:text-[2.35rem]">
              <Counter value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
            </p>
            <p className="mt-2 text-[12.5px] font-medium text-white/60">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
