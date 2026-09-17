import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getPostById } from "@/lib/data";
import { BlogForm } from "@/components/admin/blog-form";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) notFound();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/admin/blogs" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
          </Link>
          <h1 className="mt-2 font-heading text-xl font-extrabold sm:text-2xl">{post.title}</h1>
          <p className="mt-1 text-[13.5px] text-slate-600">
            /{post.slug} · {post.views.toLocaleString("en-IN")} views
          </p>
        </div>
        <Link href={`/blog/${post.slug}`} target="_blank" className="btn btn-outline btn-sm">
          <ExternalLink className="h-3.5 w-3.5" /> View on the website
        </Link>
      </div>
      <BlogForm post={post} />
    </div>
  );
}
