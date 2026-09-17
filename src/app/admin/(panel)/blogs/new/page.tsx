import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
  return (
    <div className="space-y-5">
      <div>
        <Link href="/admin/blogs" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
          <ArrowLeft className="h-3.5 w-3.5" /> Blogs par wapas
        </Link>
        <h1 className="mt-2 font-heading text-xl font-extrabold sm:text-2xl">Naya blog post</h1>
        <p className="mt-1 text-[13.5px] text-slate-600">
          Publish karte hi /blog page par dikhne lagega, sitemap me bhi add ho jayega.
        </p>
      </div>
      <BlogForm />
    </div>
  );
}
