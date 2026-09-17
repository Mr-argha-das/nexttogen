"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Bookmark,
  Share2,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { useSiteData } from "@/lib/siteData";

export default function BlogPost() {
  const params = useParams();
  const slug = String(params.slug);
  const { data } = useSiteData();
  const post = data.posts.find((p) => p.slug === slug);
  const related = data.posts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="section container-x text-center">
        <p className="text-ink-500">Post not found.</p>
        <Link href="/blog" className="btn-primary mt-4 inline-flex">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-brand-50/50 border-b border-ink-100">
        <div className="container-x py-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-ink-600 hover:text-brand-800">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
          <div className="mt-6 max-w-3xl">
            <span className="rounded-full bg-gold-100 text-gold-700 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]">
              {post.category}
            </span>
            <h1 className="heading mt-4 text-3xl md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-ink-600 text-lg leading-[1.7]">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-ink-500">
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-ink-800">{post.author}</p>
                  <p className="text-xs text-ink-500">Contributor</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <article className="container-x py-14 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6 text-[17px] leading-[1.75] text-ink-700">
          <div className="aspect-[16/8] rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-hero-radial opacity-80" />
          </div>
          <p>The world of learning is undergoing its most profound shift in a century. As artificial intelligence reshapes industries and the half-life of skills shrinks, the ability to learn, unlearn and relearn has become the single most valuable meta-skill of our time.</p>
          <p>At NextToGen, we've spent a decade studying what separates learners who thrive from those who stagnate. The pattern is unmistakable: consistent, deliberate practice in community, guided by mentorship, and anchored to real-world outcomes.</p>
          <h2 className="heading text-2xl md:text-3xl pt-4">The three pillars of accelerated mastery</h2>
          <p>Across every cohort, across every domain — from machine learning to product design — three forces consistently predict transformative outcomes. They are not talent, privilege, or IQ. They are structure, support and stakes.</p>
          <blockquote className="border-l-4 border-gold-400 bg-gold-50/50 p-6 rounded-r-xl my-8">
            <p className="font-serif italic text-brand-900 text-xl">"The best time to plant a tree was 20 years ago. The second best time is now."</p>
          </blockquote>
          <p>If you're ready to begin, explore our programs, apply in under five minutes, or reach out to a counsellor. The future rewards those who start.</p>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <h3 className="font-display text-lg font-semibold text-brand-900 tracking-display">Join our newsletter</h3>
            <p className="mt-2 text-sm text-ink-600">Weekly insights from our educators, delivered to your inbox.</p>
            <input placeholder="you@example.com" className="w-full mt-4 rounded-full border border-ink-200 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-700" />
            <button className="btn-gold w-full mt-3 justify-center">Subscribe</button>
          </div>
          <div className="card">
            <h3 className="font-display text-lg font-semibold text-brand-900 tracking-display">Related</h3>
            <div className="mt-4 space-y-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="flex gap-3 group">
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-brand-700 to-brand-950 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-brand-900 group-hover:text-brand-700 line-clamp-2">{r.title}</p>
                    <p className="text-xs text-ink-500 mt-1">{r.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </article>
    </>
  );
}
