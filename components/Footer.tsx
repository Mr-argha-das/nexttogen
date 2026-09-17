"use client";

import Link from "next/link";
import { useState } from "react";
import { useSiteData } from "@/lib/siteData";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const cols = [
  {
    title: "Learn",
    links: [
      { label: "All Courses", href: "/courses" },
      { label: "Apply Now", href: "/apply" },
      { label: "Scholarships", href: "/support" },
      { label: "Mentors", href: "/about" },
      { label: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about#careers" },
      { label: "Press", href: "/about" },
      { label: "Partners", href: "/support#partners" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "Support Us", href: "/support" },
      { label: "Donate", href: "/support#donate" },
      { label: "FAQs", href: "/contact#faqs" },
      { label: "Terms & Privacy", href: "/contact#legal" }
    ]
  }
];

export default function Footer() {
  const { data } = useSiteData();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="relative bg-brand-950 text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 10% 10%, rgba(232,177,42,0.25), transparent 60%), radial-gradient(700px 300px at 90% 90%, rgba(74,87,165,0.4), transparent 60%)"
        }}
      />
      <div className="relative container-x pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400 text-brand-950">
                <GraduationCap className="h-6 w-6" />
              </span>
              <span className="font-display text-[22px] font-semibold tracking-display">
                Next<span className="text-gold-400">To</span>Gen
              </span>
            </Link>
            <p className="mt-5 max-w-md text-white/70 leading-relaxed">
              Empowering the next generation of thinkers, creators, and leaders
              through world-class education, mentorship, and community. Your
              journey to mastery starts here.
            </p>

            <div className="mt-6 space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <span>{data.contactAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-400 shrink-0" />
                <a href={`mailto:${data.contactEmail}`} className="hover:text-gold-400">
                  {data.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-400 shrink-0" />
                <a href={`tel:${data.contactPhone.replace(/\s/g, "")}`} className="hover:text-gold-400">
                  {data.contactPhone}
                </a>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-gold-400 hover:text-brand-950 hover:border-gold-400 transition"
                    aria-label="social"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              )}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/70 hover:text-gold-400 text-sm transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <form
          onSubmit={subscribe}
          className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur"
        >
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h4 className="font-display text-2xl text-white">
                Join the NextToGen newsletter
              </h4>
              <p className="text-white/60 mt-2 text-sm">
                Weekly insights, course launches, scholarships and career
                playbooks — delivered straight to your inbox.
              </p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold justify-center md:justify-end">
                <CheckCircle2 className="h-5 w-5" /> You're subscribed — thank you!
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-gold-400"
                />
                <button className="btn-gold whitespace-nowrap" type="submit">
                  Subscribe <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </form>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© {new Date().getFullYear()} NextToGen Academy. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link href="/contact#legal" className="hover:text-gold-400">
              Privacy Policy
            </Link>
            <Link href="/contact#legal" className="hover:text-gold-400">
              Terms of Service
            </Link>
            <Link href="/contact#legal" className="hover:text-gold-400">
              Cookies
            </Link>
            <Link href="/admin/login" className="hover:text-gold-400 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 hover:opacity-100">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
