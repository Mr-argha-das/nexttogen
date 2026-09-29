import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#161b3f]/80 to-[#0c0e26]/80 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-glow-gold">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950">
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          ) : null}
          <div className={`absolute inset-0 ${post.image ? "bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" : ""}`}>
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, rgba(139,116,239,0.45), transparent 60%), radial-gradient(circle at 80% 70%, rgba(92,103,207,0.55), transparent 60%)"
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-end p-5">
            <span className="rounded-full bg-gold-400 text-ink-900 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
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
        <h3 className="mt-3 font-display text-lg font-bold text-ink-900 leading-snug group-hover:text-ink-800 transition">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-end pt-4 border-t border-white/10">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-ink-900 group-hover:text-gold-300 transition"
          >
            Read <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
