import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BarChart3, CalendarDays, Clock, Search, Sparkles } from "lucide-react";
import { countPosts, getSettings, listPostCategories, listPosts, listPostTags } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { cn, formatDate, initials } from "@/lib/utils";
import { PageHero } from "@/components/site/page-hero";
import { Orbs } from "@/components/site/decor";
import { BlogCard, CATEGORY_ICONS, CtaBand } from "@/components/site/cards";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { CourseArt } from "@/components/site/decor";

export const revalidate = 120;

const PER_PAGE = 6;

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "Blog — Career guides, roadmaps and job tips",
    description:
      "Web development roadmap, resume writing tips, the difference between data science and AI, free marketing tools and a cyber security career guide — written from our trainers' and placement team's experience.",
    path: "/blog",
    keywords: ["career blog", "IT career tips", "fresher resume tips", "web development roadmap", "job search India"],
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string; page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const settings = getSettings();
  const categories = listPostCategories();
  const tags = listPostTags();
  const page = Math.max(1, Number(params.page ?? "1"));

  let posts = listPosts({
    category: params.category && params.category !== "all" ? params.category : undefined,
    tag: params.tag,
  });

  const query = params.q?.trim().toLowerCase();
  if (query) {
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paged = posts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const featured = currentPage === 1 && !query && !params.category && !params.tag ? listPosts({ featuredOnly: true, limit: 1 })[0] : null;

  const buildQuery = (patch: Record<string, string | number | undefined>) => {
    const next = new URLSearchParams();
    const merged = { ...params, ...patch } as Record<string, string | number | undefined>;
    for (const [key, value] of Object.entries(merged)) {
      if (value !== undefined && value !== "" && value !== "all") next.set(key, String(value));
    }
    const queryString = next.toString();
    return queryString ? `/blog?${queryString}` : "/blog";
  };

  return (
    <>
      <PageHero
        eyebrow="Blog"
        tone="dark"
        title={<>Career guides, roadmaps and <span className="text-gradient">industry tips</span></>}
        description={`${countPosts()} articles written by our trainers and placement team — the same practical advice we give students in class. No jargon, just what works.`}
        crumbs={[{ label: "Blogs" }]}
      >
        <form action="/blog" method="get" className="flex max-w-md gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="Search a topic… (for example: resume, python)"
              className="field pl-9"
              aria-label="Blog search"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </PageHero>

      <section className="section pt-8">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
          <div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {[{ category: "all", count: countPosts() }, ...categories].map((item) => {
                const active =
                  item.category === "all" ? !params.category || params.category === "all" : params.category === item.category;
                return (
                  <Link
                    key={item.category}
                    href={buildQuery({ category: item.category, page: 1 })}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[12.5px] font-semibold backdrop-blur transition-all",
                      active
                        ? "border-transparent bg-accent-500 text-[#2a1c00] shadow-[var(--shadow-accent)]"
                        : "border-white/15 bg-white/[0.07] text-white/75 hover:border-white/30 hover:bg-white/15 hover:text-white",
                    )}
                  >
                    {item.category === "all" ? "All" : item.category} ({item.count})
                  </Link>
                );
              })}
            </div>

            {query ? (
              <p className="mt-5 text-[13.5px] text-slate-600">
                <strong>{total}</strong> result{total === 1 ? "" : "s"} for “{params.q}” ·{" "}
                <Link href="/blog" className="font-semibold text-brand-700">
                  Clear
                </Link>
              </p>
            ) : null}

            {/* Featured post */}
            {featured ? (
              <article className="card card-hover mt-8 overflow-hidden">
                <div className="grid lg:grid-cols-[1.05fr_1fr]">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group relative block h-52 overflow-hidden lg:h-full lg:min-h-[19rem]"
                  >
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                      <CourseArt seed={featured.slug} icon={CATEGORY_ICONS[featured.category] ?? BarChart3} />
                    </div>
                    <span className="chip chip-glass absolute left-5 top-5">
                      <Sparkles className="h-3.5 w-3.5" /> Editor&apos;s pick
                    </span>
                  </Link>
                  <div className="p-6 sm:p-8">
                    <p className="eyebrow">{featured.category}</p>
                    <h2 className="mt-3 font-heading text-[1.35rem] font-bold leading-snug sm:text-[1.5rem]">
                      <Link href={`/blog/${featured.slug}`} className="transition-colors hover:text-brand-700">
                        {featured.title}
                      </Link>
                    </h2>
                    <p className="mt-4 text-[14px] leading-7 text-slate-600">{featured.excerpt}</p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-700">
                          {initials(featured.author || "NextGen")}
                        </span>
                        {featured.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" /> {formatDate(featured.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {featured.readMinutes} min read
                      </span>
                    </div>

                    <Link href={`/blog/${featured.slug}`} className="btn btn-primary mt-6">
                      Read the article <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ) : null}

            {/* Posts */}
            {paged.length ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {paged.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-[1.5rem] border border-dashed border-line-strong bg-canvas p-12 text-center">
                <p className="font-heading text-lg font-bold">No articles found</p>
                <p className="mt-1 text-sm text-slate-500">Try another keyword, or browse every article.</p>
                <Link href="/blog" className="btn btn-primary mt-5">
                  All articles
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 ? (
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                <Link
                  href={buildQuery({ page: Math.max(1, currentPage - 1) })}
                  aria-disabled={currentPage === 1}
                  className={cn("btn btn-outline btn-sm", currentPage === 1 && "pointer-events-none opacity-40")}
                >
                  <ArrowLeft className="h-4 w-4" /> Previous
                </Link>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Link
                    key={index}
                    href={buildQuery({ page: index + 1 })}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-[13px] font-semibold",
                      currentPage === index + 1
                        ? "bg-brand-600 text-white"
                        : "border border-slate-200 text-slate-600 hover:border-brand-300",
                    )}
                  >
                    {index + 1}
                  </Link>
                ))}
                <Link
                  href={buildQuery({ page: Math.min(totalPages, currentPage + 1) })}
                  aria-disabled={currentPage === totalPages}
                  className={cn(
                    "btn btn-outline btn-sm",
                    currentPage === totalPages && "pointer-events-none opacity-40",
                  )}
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="card p-5">
              <h3 className="font-heading text-[15px] font-bold">Popular topics</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.tag}
                    href={buildQuery({ tag: tag.tag, page: 1, category: undefined })}
                    className={cn("chip chip-neutral", params.tag === tag.tag && "!bg-brand-600 !text-white")}
                  >
                    #{tag.tag} ({tag.count})
                  </Link>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-heading text-[15px] font-bold">New article alerts</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-600">
                Two to four career guides a month. No spam, only useful content.
              </p>
              <div className="mt-4">
                <NewsletterForm compact />
              </div>
            </div>

            <div className="card overflow-hidden border-0 shadow-[var(--shadow-lg)]">
              <div className="relative overflow-hidden bg-[var(--grad-brand-deep)] p-5 text-white">
                <Orbs className="opacity-40" />
                <p className="eyebrow relative !text-accent-300">Free counselling</p>
                <h3 className="relative mt-2 font-heading text-lg font-bold">Which course suits you best?</h3>
                <p className="relative mt-2 text-[13px] text-white/75">
                  Share your goal and our team will recommend the right course for you.
                </p>
                <Link href="/apply" className="btn btn-accent relative mt-4 w-full">
                  Apply now
                </Link>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-heading text-[15px] font-bold">Popular courses</h3>
              <ul className="mt-3 space-y-2 text-[13px]">
                {["Full Stack Web Development", "Python, Data Science & AI", "Digital Marketing", "Tally with GST"].map(
                  (item) => (
                    <li key={item}>
                      <Link href="/courses" className="text-slate-600 hover:text-brand-700">
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Reading helps — guidance helps more"
        description={`Book a free counselling session at ${settings.siteName} and get a clear roadmap for your career.`}
        primary={{ href: "/apply", label: "Free counselling" }}
        secondary={{ href: "/courses", label: "Browse courses" }}
      />
    </>
  );
}
