import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSettings } from "@/lib/data";
import { organizationSchema, SITE_URL } from "@/lib/seo";
import { safeJsonLd } from "@/lib/utils";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { Analytics, ThemeStyle } from "@/components/site/theme-style";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  const title = `${settings.siteName} — ${settings.siteTagline}`;
  const description = `${settings.siteName} (${settings.city}) me job-oriented computer courses — Full Stack Web Development, Python & Data Science, Digital Marketing, Tally with GST, Cyber Security aur DCA. ${settings.placementRate}% placement record, EMI option aur free counselling.`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${settings.siteName}`,
    },
    description,
    keywords: [
      `${settings.city} computer institute`,
      "full stack web development course",
      "python data science course",
      "digital marketing course",
      "tally gst training",
      "cyber security course",
      "computer classes near me",
      "best IT institute",
    ],
    applicationName: settings.siteName,
    authors: [{ name: settings.siteName }],
    creator: settings.siteName,
    publisher: settings.siteName,
    formatDetection: { telephone: true, address: true, email: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: SITE_URL,
      siteName: settings.siteName,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSettings();

  return (
    <html lang="en-IN">
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <ThemeStyle settings={settings} />
        <SiteHeader
          siteName={settings.siteName}
          siteShortName={settings.siteShortName}
          phone={settings.phone}
          tagline={settings.siteTagline}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
        {settings.chatbotEnabled !== "false" ? (
          <ChatbotWidget
            botName={settings.chatbotName}
            welcome={settings.chatbotWelcome}
            phone={settings.phone}
            whatsapp={settings.whatsapp}
          />
        ) : null}
        <Analytics settings={settings} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationSchema(settings)) }}
        />
      </body>
    </html>
  );
}
