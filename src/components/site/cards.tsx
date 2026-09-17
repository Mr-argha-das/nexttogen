import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock,
  IndianRupee,
  Laptop,
  MapPin,
  Quote,
  Star,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { BlogPost, Course, Testimonial } from "@/lib/types";
import { cn, discountPercent, formatDate, formatINR, initials, truncate } from "@/lib/utils";

/* ----------------------------- Section heading ---------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: { href: string; label: string };
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{title}</h2>
        {description ? <p className="mt-3 text-[15px] leading-7 text-slate-600">{description}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}

/* -------------------------------- Course ---------------------------------- */

export function CourseCard({ course, featured = false }: { course: Course; featured?: boolean }) {
  const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
  const off = discountPercent(course.fee, course.discountFee);

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900">
        <div className="grid-lines absolute inset-0 opacity-30" />
        <div className="absolute inset-0 flex items-end justify-between p-4">
          <div>
            <span className="chip chip-accent">{course.category}</span>
            <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-white">{course.title}</h3>
          </div>
        </div>
        {off > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-rose-600 shadow-sm">
            {off}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[13px] leading-6 text-slate-600">{truncate(course.shortDesc, 120)}</p>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-brand-500" /> {course.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Laptop className="h-3.5 w-3.5 text-brand-500" /> {course.mode}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-brand-500" /> {course.seats} seats
          </div>
          <div className="flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5 text-brand-500" /> {course.level}
          </div>
        </dl>

        {featured && course.highlights.length ? (
          <ul className="mt-4 space-y-1.5 text-[12px] text-slate-600">
            {course.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
                <span>{truncate(highlight, 62)}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between border-t border-dashed border-slate-200 pt-3">
            <div>
              <p className="flex items-center gap-1 text-lg font-bold text-ink">
                <IndianRupee className="h-4 w-4" />
                {formatINR(payable).replace("₹", "")}
              </p>
              {off > 0 ? <p className="text-[11px] text-slate-400 line-through">{formatINR(course.fee)}</p> : null}
            </div>
            <div className="flex gap-2">
              <Link href={`/courses/${course.slug}`} className="btn btn-outline btn-sm">
                Details
              </Link>
              <Link href={`/apply?course=${course.slug}`} className="btn btn-primary btn-sm">
                Apply
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* --------------------------------- Blog ----------------------------------- */

export function BlogCard({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  return (
    <article className={cn("card card-hover group flex h-full flex-col overflow-hidden", compact && "sm:flex-row")}>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "relative block shrink-0 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-brand-900",
          compact ? "h-40 sm:h-auto sm:w-44" : "h-44",
        )}
      >
        <div className="grid-lines absolute inset-0 opacity-25" />
        <span className="absolute bottom-3 left-3 chip chip-accent">{post.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
          </span>
        </p>
        <h3 className="mt-2 font-heading text-base font-bold leading-snug text-ink">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-[13px] leading-6 text-slate-600">{truncate(post.excerpt, compact ? 110 : 130)}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[12px] font-medium text-slate-500">{post.author}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-700 hover:text-brand-900"
          >
            Padhein <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ Testimonial -------------------------------- */

export function TestimonialCard({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  return (
    <figure className={cn("card flex h-full flex-col p-5", className)}>
      <Quote className="h-7 w-7 text-brand-200" />
      <blockquote className="mt-3 flex-1 text-[13.5px] leading-7 text-slate-600">{testimonial.message}</blockquote>
      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
          {initials(testimonial.name)}
        </span>
        <figcaption className="min-w-0">
          <p className="truncate text-sm font-bold text-ink">{testimonial.name}</p>
          <p className="truncate text-[12px] text-slate-500">
            {testimonial.role ?? testimonial.course}
            {testimonial.city ? ` · ${testimonial.city}` : ""}
          </p>
        </figcaption>
        <span className="ml-auto flex shrink-0 items-center gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </span>
      </div>
    </figure>
  );
}

/* -------------------------------- Small bits ------------------------------- */

export function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
}) {
  return (
    <div className="card p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-heading text-2xl font-extrabold text-ink">{value}</p>
      <p className="text-[13px] text-slate-500">{label}</p>
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="card card-hover h-full p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-heading text-base font-bold text-ink">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-6 text-slate-600">{description}</p>
    </div>
  );
}

export function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-ink px-6 py-10 text-white sm:px-10 sm:py-14">
          <div className="mesh absolute inset-0 opacity-40" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">{title}</h2>
              <p className="mt-3 text-[15px] leading-7 text-white/80">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={primary.href} className="btn btn-accent btn-lg">
                {primary.label}
              </Link>
              {secondary ? (
                <Link
                  href={secondary.href}
                  className="btn btn-lg border border-white/25 bg-white/10 text-white hover:bg-white/20"
                >
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlacementStrip({ partners }: { partners: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      {partners.map((partner) => (
        <span key={partner} className="font-heading text-sm font-bold uppercase tracking-wider text-slate-400">
          {partner}
        </span>
      ))}
    </div>
  );
}
