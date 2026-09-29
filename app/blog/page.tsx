"use client";

import Link from "next/link";
import { BookOpen, Search, ArrowRight, Rss } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { useSiteData } from "@/lib/siteData";

const tags = [
  "All",
  "AI & Future",
  "Design",
  "Career",
  "Learning",
  "Business"
];

export default function BlogPage() {
  const { data } = useSiteData();
  const posts = data.posts;
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <section className="relative bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative container-x pt-20 pb-28 md:pt-28 md:pb-36">
          <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
            <BookOpen className="h-3.5 w-3.5" /> The NextToGen Blog
          </span>
          <h1 className="heading mt-5 text-4xl md:text-6xl text-white max-w-3xl">
            Ideas, guides and <span className="heading-italic text-gold-400">stories</span> for lifelong learners.
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl text-[17px] leading-[1.7] font-light">
            Weekly writing from our educators, alumni and industry guests on the
            topics shaping the future of work and learning.
          </p>

          <div className="mt-10 relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
            <input
              type="text"
              placeholder="Search articles…"
              className="w-full rounded-full bg-white/10 border border-white/15 pl-14 pr-5 py-4 text-white placeholder-white/50 focus:outline-none focus:border-gold-400 backdrop-blur"
            />
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#06081a]" />
      </section>

      {featured && (
        <section className="container-x -mt-16 relative z-10">
          <Link
            href={`/blog/${featured.slug}`}
            className="grid lg:grid-cols-2 gap-8 rounded-3xl overflow-hidden bg-ink-100 shadow-soft border border-white/10 group hover:shadow-glow-brand transition"
          >
            <div className="relative aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-brand-700 to-brand-950 overflow-hidden">
              {featured.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-hero-radial opacity-80" />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
                      backgroundSize: "32px 32px"
                    }}
                  />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="rounded-full bg-gold-400 text-ink-900 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-gold-300 font-semibold">
                {featured.category}
              </span>
              <h2 className="heading mt-3 text-2xl md:text-4xl group-hover:text-ink-800 transition">
                {featured.title}
              </h2>
              <p className="mt-4 text-ink-600 leading-[1.7]">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-ink-500">{featured.date} · {featured.readTime}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-ink-900 group-hover:text-gold-300">
                  Read <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="section container-x">
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((t, i) => (
            <button
              key={t}
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${
                i === 0
                  ? "bg-brand-800 text-white border-white/10"
                  : "bg-ink-100 text-ink-600 border-white/15 hover:border-white/10 hover:text-ink-900"
              }`}
            >
              {t}
            </button>
          ))}
          <button className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-100 px-4 py-2 text-sm font-semibold text-ink-700 hover:border-white/10 hover:text-ink-900">
            <Rss className="h-4 w-4" /> Subscribe
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
