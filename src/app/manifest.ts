import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/data";

/** Web app manifest — helps browsers, Android and Lighthouse treat the site as an installable app. */
export default function manifest(): MetadataRoute.Manifest {
  const settings = getSettings();

  return {
    name: `${settings.siteName} — ${settings.siteTagline}`,
    short_name: settings.siteShortName,
    description: `Job-oriented computer courses in ${settings.city} with live projects, EMI options and placement support.`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b2a5b",
    lang: "en-IN",
    categories: ["education", "training"],
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
