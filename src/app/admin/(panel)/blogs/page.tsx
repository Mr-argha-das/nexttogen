import Link from "next/link";
import { Eye, Pencil, Plus, Star, TrendingUp } from "lucide-react";
import { listPosts } from "@/lib/data";
import { formatDate, truncate } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/ui";
import { deletePostAction, resetViewsAction } from "@/app/admin/actions";

export default function AdminBlogsPage() {
  const posts = listPosts({ includeUnpublished: true });
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Blogs</h1>
          <p className="mt-1 flex items-center gap-2 text-[13.5px] text-slate-600">
            {posts.length} posts · {posts.filter((post) => post.published).length} published
            <span className="flex items-center gap-1 text-[12.5px] text-slate-500">
              <TrendingUp className="h-3.5 w-3.5" /> {totalViews.toLocaleString("en-IN")} views
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <form action={resetViewsAction}>
            <button type="submit" className="btn btn-outline btn-sm">
              Views reset
            </button>
          </form>
          <Link href="/admin/blogs/new" className="btn btn-primary btn-sm">
            <Plus className="h-4 w-4" /> Naya blog likhein
          </Link>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-[13px]">
            <thead className="bg-canvas text-[11.5px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Post</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Author</th>
                <th className="px-5 py-3 font-semibold">Published</th>
                <th className="px-5 py-3 font-semibold">Views</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-start gap-2">
                      {post.featured ? <Star className="mt-0.5 h-3.5 w-3.5 fill-amber-400 text-amber-400" /> : null}
                      <div className="max-w-[320px]">
                        <p className="font-semibold text-ink">{truncate(post.title, 60)}</p>
                        <p className="text-[11.5px] text-slate-500">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">{post.category}</td>
                  <td className="px-5 py-3 text-slate-600">{post.author}</td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(post.publishedAt)}</td>
                  <td className="px-5 py-3 font-medium text-slate-600">{post.views.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        post.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {post.published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="btn btn-outline btn-sm">
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      <Link href={`/admin/blogs/${post.id}`} className="btn btn-outline btn-sm">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <DeleteButton action={deletePostAction} id={post.id} label="" confirmText={`"${post.title}" delete karna hai?`} />
                    </div>
                  </td>
                </tr>
              ))}
              {!posts.length ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center">
                    <p className="font-heading text-base font-bold">Abhi koi blog post nahi hai</p>
                    <Link href="/admin/blogs/new" className="btn btn-primary mt-4">
                      <Plus className="h-4 w-4" /> Pehla blog likhein
                    </Link>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
