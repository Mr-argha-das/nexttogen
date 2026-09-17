import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Eye,
  Share2,
  Tag,
  User,
} from "lucide-react";
import { getPostBySlug, getSettings, incrementPostViews, listPosts } from "@/lib/data";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { formatDate, initials, safeJsonLd, truncate } from "@/lib/utils";
import { BlogCard, CtaBand } from "@/components/site/cards";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { Markdown } from "@/lib/markdown";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    return listPosts().map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const settings = getSettings();
  if (!post) {
    return buildMetadata({
      settings,
      title: "Article nahi mila",
      description: "Ye article ab available nahi hai.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    settings,
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    image: post.coverImage ?? undefined,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const settings = getSettings();
  incrementPostViews(post.id);
  const related = listPosts({ category: post.category, limit: 4 }).filter((item) => item.id !== post.id).slice(0, 3);
  const fallbackRelated = listPosts({ limit: 4 }).filter((item) => item.id !== post.id).slice(0, 3);
  const suggestions = related.length ? related : fallbackRelated;
  const shareUrl = `${(process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "")}/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} — ${settings.siteName}`);

  return (
    <>
      <article>
        {/* Hero */}
        <header className="relative overflow-hidden border-b border-slate-100 bg-canvas">
          <div className="mesh pointer-events-none absolute inset-0 opacity-60" />
          <div className="container-x relative py-10 sm:py-14">
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-[12.5px] text-slate-500">
              <Link href="/" className="hover:text-brand-700">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <Link href="/blog" className="hover:text-brand-700">
                Blog
              </Link>
              <span className="text-slate-300">/</span>
              <span className="font-medium text-slate-700">{post.category}</span>
            </nav>

            <div className="max-w-3xl">
              <span className="chip chip-accent">{post.category}</span>
              <h1 className="mt-4 font-heading text-[1.7rem] font-extrabold leading-tight sm:text-[2.2rem]">
                {post.title}
              </h1>
              <p className="mt-4 text-[15.5px] leading-7 text-slate-600">{post.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[12px] font-bold text-white">
                    {initials(post.author)}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{post.author}</span>
                    <span className="block text-[12px] text-slate-500">{post.authorRole ?? "Faculty"}</span>
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" /> {formatDate(post.publishedAt, "long")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {post.readMinutes} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> {(post.views + 1).toLocaleString("en-IN")} views
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="section pt-8">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
            <div>
              <div className="card overflow-hidden">
                <div className="relative h-44 bg-gradient-to-br from-slate-800 via-slate-900 to-brand-900 sm:h-56">
                  <div className="grid-lines absolute inset-0 opacity-25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-xl bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
                      {settings.siteName} · Career Guide
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <Markdown content={post.content} />
                </div>
              </div>

              {/* Tags + share */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-slate-400" />
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="chip chip-neutral">
                      #{tag}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-500">
                    <Share2 className="h-4 w-4" /> Share:
                  </span>
                  <a
                    href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-canvas p-5">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                  <ArrowLeft className="h-4 w-4" /> Saare articles
                </Link>
                <Link href="/courses" className="btn btn-primary btn-sm">
                  Courses dekhein <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
                    {initials(post.author)}
                  </span>
                  <div>
                    <p className="text-[14px] font-bold text-ink">{post.author}</p>
                    <p className="text-[12px] text-slate-500">{post.authorRole ?? "Faculty"}</p>
                  </div>
                </div>
                <p className="mt-3 text-[13px] leading-6 text-slate-600">
                  {settings.siteName} me padhate hain aur students ko industry-ready banate hain.
                </p>
                <Link href="/about#faculty" className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-700">
                  Faculty ke baare me <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="card overflow-hidden">
                <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-white/70">Skill banaiye</p>
                  <h3 className="mt-1 font-heading text-base font-bold">Is topic ka full course karein</h3>
                  <p className="mt-2 text-[13px] text-white/80">
                    Live projects, portfolio aur placement support ke saath.
                  </p>
                  <Link href="/courses" className="btn btn-accent mt-4 w-full">
                    Course dekhein
                  </Link>
                </div>
              </div>

              <div className="card p-5">
                <h3 className="font-heading text-[15px] font-bold">Aise hi articles</h3>
                <ul className="mt-3 space-y-3">
                  {listPosts({ limit: 4 })
                    .filter((item) => item.id !== post.id)
                    .slice(0, 3)
                    .map((item) => (
                      <li key={item.id}>
                        <Link href={`/blog/${item.slug}`} className="group block">
                          <p className="text-[13.5px] font-semibold leading-6 text-ink group-hover:text-brand-700">
                            {truncate(item.title, 70)}
                          </p>
                          <p className="mt-0.5 text-[11.5px] text-slate-500">
                            {formatDate(item.publishedAt)} · {item.readMinutes} min
                          </p>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="card p-5">
                <h3 className="font-heading text-[15px] font-bold">Newsletter</h3>
                <p className="mt-2 text-[13px] leading-6 text-slate-600">
                  Naye articles aur batch updates — mahine me 2–4 email.
                </p>
                <div className="mt-4">
                  <NewsletterForm compact />
                </div>
              </div>
            </aside>
          </div>

          {/* Related */}
          {suggestions.length ? (
            <div className="container-x mt-14">
              <div className="flex items-end justify-between gap-3">
                <h2 className="font-heading text-xl font-bold">Ye bhi padhein</h2>
                <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  Saare blogs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {suggestions.map((item) => (
                  <BlogCard key={item.id} post={item} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </article>

      <CtaBand
        title="Guide padh liya — ab practically seekhne ka time hai"
        description={`${settings.siteName} me demo class book karein. Trainer se baat kijiye aur apne career ka plan banwaiye.`}
        primary={{ href: "/apply", label: "Demo class book karein" }}
        secondary={{ href: "/contact", label: "Contact karein" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd([
            articleSchema(
              {
                title: post.title,
                excerpt: post.excerpt,
                slug: post.slug,
                publishedAt: post.publishedAt,
                author: post.author,
                coverImage: post.coverImage,
              },
              settings,
            ),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ]),
        }}
      />
    </>
  );
}
