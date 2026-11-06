import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import AdminProviders from "@/components/AdminProviders";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexttogen.app"),
  title: {
    default: "NextToGen — Shaping Tomorrow's Leaders, Today",
    template: "%s | NextToGen"
  },
  description:
    "NextToGen is a premium learning platform offering industry-leading courses, expert mentorship, and career-transforming programs designed for the next generation of leaders.",
  keywords: [
    "NextToGen",
    "online courses",
    "education",
    "upskill",
    "career",
    "mentorship",
    "learning platform",
    "apply online"
  ],
  authors: [{ name: "NextToGen Academy" }],
  openGraph: {
    title: "NextToGen — Shaping Tomorrow's Leaders, Today",
    description:
      "Premium courses, expert mentorship, and career-transforming programs — designed for the next generation.",
    url: "https://nexttogen.app",
    siteName: "NextToGen",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "NextToGen Academy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NextToGen — Shaping Tomorrow's Leaders",
    description:
      "Premium courses, expert mentorship, and career-transforming programs.",
    images: ["/og.png"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AdminProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Chatbot />
        </AdminProviders>
      </body>
    </html>
  );
}
