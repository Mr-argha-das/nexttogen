import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-glow-brand">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950" />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(232,177,42,0.4), transparent 60%), radial-gradient(circle at 80% 70%, rgba(106,119,186,0.5), transparent 60%)"
            }}
          />
          <div className="absolute inset-0 flex items-end p-5">
            <span className="rounded-full bg-gold-400 text-brand-950 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-ink-500">
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {post.readTime}
          </span>
        </div>
        <h3 className="mt-3 font-display text-lg font-bold text-brand-900 leading-snug group-hover:text-brand-700 transition">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-ink-100">
          <div className="flex items-center gap-3">
            <img
              src={post.avatar}
              alt={post.author}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-xs font-semibold text-ink-700">
              {post.author}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-800 group-hover:text-gold-600 transition"
          >
            Read <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
