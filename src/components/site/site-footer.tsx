import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { SOCIAL_ICONS } from "./social-icons";
import type { SiteSettings } from "@/lib/types";
import { FOOTER_COURSE_LINKS, FOOTER_QUICK_LINKS } from "@/lib/nav";
import { NewsletterForm } from "./newsletter-form";

const SOCIALS = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "twitter", label: "X (Twitter)" },
  { key: "telegram", label: "Telegram" },
] as const;

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-800 bg-ink text-slate-300">
      {/* Newsletter */}
      <div className="border-b border-slate-800">
        <div className="container-x grid gap-6 py-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
              Free career counselling and batch alerts
            </h3>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              New batches, scholarship announcements and career guides from our trainers — delivered to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-heading text-lg font-extrabold text-white">{settings.siteShortName}</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            {settings.legalName}. Established {settings.foundedYear} — practical skill training, small batches and
            genuine placement support.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {SOCIALS.filter((social) => settings[social.key]).map(({ key, label }) => {
              const Icon = SOCIAL_ICONS[key];
              return (
                <a
                  key={key}
                  href={settings[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-brand-500 hover:bg-brand-500/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Popular Courses</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_COURSE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-slate-400 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-slate-400 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">Visit / Contact</h4>
          <ul className="mt-4 space-y-3.5 text-sm text-slate-400">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>
                {settings.addressLine1}
                {settings.addressLine2 ? `, ${settings.addressLine2}` : ""}
                <br />
                {settings.city}, {settings.state} – {settings.pincode}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {settings.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href={`mailto:${settings.email}`} className="hover:text-white">
                {settings.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>{settings.officeHours}</span>
            </li>
          </ul>
          <Link href="/apply" className="btn btn-primary btn-sm mt-5">
            Apply Online <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {settings.siteName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms & Conditions
            </Link>
            <Link href="/faq" className="hover:text-slate-300">
              FAQs
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
