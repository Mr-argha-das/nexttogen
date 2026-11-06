"use client";

import Link from "next/link";
import { Clock, Users, Star, ArrowRight, BookOpen } from "lucide-react";
import type { Course } from "@/lib/data";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-glow-brand">
      <Link href={`/courses/${course.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-900">
          {course.image || course.bannerImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.image || course.bannerImage!} alt={course.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          ) : null}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${course.accent} ${course.image || course.bannerImage ? "opacity-60" : ""}`}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "28px 28px"
            }}
          />
          <div className="absolute inset-0 flex items-end p-5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold text-white border border-white/20">
                {course.category}
              </span>
              {course.bestseller && (
                <span className="rounded-full bg-gold-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-950">
                  ★ Bestseller
                </span>
              )}
            </div>
          </div>
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-brand-900">
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
            {course.rating}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> {course.lessons} lessons
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {course.students.toLocaleString()}
          </span>
        </div>

        <h3 className="mt-3 font-display text-[22px] font-semibold text-brand-900 group-hover:text-brand-700 transition leading-[1.2] tracking-display">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="mt-2 text-[14.5px] text-ink-600 leading-[1.7] line-clamp-2">
          {course.description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-700 to-brand-900 text-gold-400 flex items-center justify-center font-semibold text-xs">
            {course.instructor
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink-800">
              {course.instructor}
            </p>
            <p className="text-xs text-ink-500">{course.instructorRole}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-ink-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 text-brand-800 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.2em]">
              {course.level}
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-400">
              · Cohort
            </span>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-800 group-hover:bg-gold-400 group-hover:text-brand-950 transition"
            aria-label="View course"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
