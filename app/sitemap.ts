import type { MetadataRoute } from "next";
import { allCourses, allPosts } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nexttogen.app";
  const staticPages = ["", "/courses", "/about", "/blog", "/apply", "/contact", "/support"].map(
    (p) => ({ url: `${base}${p}`, lastModified: new Date() })
  );
  const coursePages = allCourses.map((c) => ({
    url: `${base}/courses/${c.slug}`,
    lastModified: new Date()
  }));
  const blogPages = allPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date()
  }));
  return [...staticPages, ...coursePages, ...blogPages];
}
