import type { Metadata } from "next";
import type { SiteSettings } from "./types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoInput = {
  settings: SiteSettings;
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/** Consistent, SEO-friendly metadata for every page. */
export function buildMetadata({
  settings,
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
  publishedTime,
  noIndex,
}: SeoInput): Metadata {
  const fullTitle = path === "/" ? `${settings.siteName} — ${settings.siteTagline}` : `${title} | ${settings.siteName}`;
  const url = absoluteUrl(path);

  return {
    // `absolute` bypasses the root layout's "%s | Site" template so the brand is not appended twice.
    title: { absolute: fullTitle },
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: settings.siteName,
      locale: "en_IN",
      type,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

type JsonLd = Record<string, unknown>;

export function organizationSchema(settings: SiteSettings): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: settings.siteName,
    legalName: settings.legalName,
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    foundingDate: settings.foundedYear,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${settings.addressLine1}${settings.addressLine2 ? `, ${settings.addressLine2}` : ""}`,
      addressLocality: settings.city,
      addressRegion: settings.state,
      postalCode: settings.pincode,
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: settings.averageRating,
      reviewCount: 480,
      bestRating: "5",
    },
    sameAs: [settings.facebook, settings.instagram, settings.youtube, settings.linkedin, settings.twitter].filter(
      Boolean,
    ),
  };
}

export function courseSchema(
  course: {
    title: string;
    slug: string;
    shortDesc: string;
    duration: string;
    fee: number;
    discountFee: number | null;
    mode: string;
    category: string;
    startDate: string | null;
  },
  settings: SiteSettings,
): JsonLd {
  const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.shortDesc,
    url: absoluteUrl(`/courses/${course.slug}`),
    provider: { "@type": "EducationalOrganization", name: settings.siteName, sameAs: SITE_URL },
    educationalLevel: course.category,
    teaches: course.shortDesc,
    ...(course.startDate ? { startDate: course.startDate.slice(0, 10) } : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.mode === "Online" ? "online" : course.mode === "Hybrid" ? "blended" : "onsite",
      courseWorkload: course.duration,
      location: {
        "@type": "Place",
        name: `${settings.siteName}, ${settings.city}`,
        address: `${settings.addressLine1}, ${settings.city}, ${settings.state} ${settings.pincode}`,
      },
      offers: {
        "@type": "Offer",
        price: payable,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: absoluteUrl(`/apply?course=${course.slug}`),
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(
  post: { title: string; excerpt: string; slug: string; publishedAt: string; author: string; coverImage: string | null },
  settings: SiteSettings,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: settings.siteName,
      ...(post.coverImage ? { logo: { "@type": "ImageObject", url: absoluteUrl(post.coverImage) } } : {}),
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
    ...(post.coverImage ? { image: absoluteUrl(post.coverImage) } : {}),
  };
}
