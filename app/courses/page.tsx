"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Cpu,
  Palette,
  Briefcase,
  TrendingUp,
  Target,
  Search
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { categories } from "@/lib/data";
import { useSiteData } from "@/lib/siteData";

const iconMap: Record<string, any> = {
  BookOpen,
  Cpu,
  Palette,
  Briefcase,
  TrendingUp,
  Target
};

export default function CoursesPage() {
  const { data } = useSiteData();
  const [activeCat, setActiveCat] = useState("All Courses");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All Levels");

  const filtered = useMemo(() => {
    return data.courses.filter((c) => {
      const matchCat =
        activeCat === "All Courses" || c.category === activeCat;
      const matchLevel = level === "All Levels" || c.level === level;
      const matchQ =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchLevel && matchQ;
    });
  }, [activeCat, query, level]);

  return (
    <>
      <section className="relative bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative container-x pt-20 pb-28 md:pt-28 md:pb-36">
          <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
            <BookOpen className="h-3.5 w-3.5" /> Our Courses
          </span>
          <h1 className="heading mt-5 text-4xl md:text-6xl text-white max-w-3xl">
            Find a program <span className="heading-italic text-gold-400">that matches your ambition.</span>
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl text-lg">
            40+ expert-led programs spanning AI, design, business, marketing and
            career skills — crafted to transform your trajectory.
          </p>

          <div className="mt-10 relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, topics or instructors…"
              className="w-full rounded-full bg-white/10 border border-white/15 pl-14 pr-5 py-4 text-white placeholder-white/50 focus:outline-none focus:border-gold-400 backdrop-blur"
            />
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      <section className="container-x -mt-16 relative z-10 pb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const Icon = iconMap[c.icon] || BookOpen;
            const active = activeCat === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setActiveCat(c.name)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition border ${
                  active
                    ? "bg-brand-800 text-white border-brand-800 shadow-glow-brand"
                    : "bg-white text-ink-700 border-ink-200 hover:border-brand-700 hover:text-brand-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {c.name}
                <span
                  className={`ml-1 text-xs px-2 py-0.5 rounded-full ${
                    active ? "bg-gold-400 text-brand-950" : "bg-ink-100 text-ink-500"
                  }`}
                >
                  {c.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <p className="text-ink-600">
            Showing <span className="font-bold text-brand-900">{filtered.length}</span> course
            {filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {["All Levels", "Beginner", "Intermediate", "Advanced"].map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`rounded-full px-4 py-2 text-xs font-semibold border transition ${
                  level === l
                    ? "bg-gold-400 text-brand-950 border-gold-400"
                    : "bg-white text-ink-600 border-ink-200 hover:border-gold-400"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 p-16 text-center">
            <p className="text-ink-500">No courses match your filters yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
