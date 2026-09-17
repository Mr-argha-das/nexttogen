import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { SOCIAL_ICONS } from "./social-icons";
import type { SiteSettings } from "@/lib/types";
import { FOOTER_COURSE_LINKS, FOOTER_QUICK_LINKS } from "@/lib/nav";
import { NewsletterForm } from "./newsletter-form";
import { Orbs } from "./decor";

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
  const activeSocials = SOCIALS.filter((social) => settings[social.key]);

  return (
    <footer className="relative mt-auto overflow-hidden bg-[var(--grad-brand-deep)] text-slate-300">
      <Orbs tone="mixed" className="opacity-40" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.1]" />

      {/* ------------------------------- newsletter ------------------------------ */}
      <div className="relative border-b border-white/10">
        <div className="container-x grid gap-8 py-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <span className="chip chip-glass">
              <Sparkles className="h-3.5 w-3.5" /> Career tips &amp; batch alerts
            </span>
            <h3 className="display-3 mt-4 text-white">
              Free career counselling and new batch announcements
            </h3>
            <p className="mt-3 max-w-xl text-[14px] leading-7 text-white/65">
              Scholarship announcements, new batches and career guides from our trainers — straight to your inbox. No
              spam, unsubscribe any time.
            </p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* --------------------------------- links -------------------------------- */}
      <div className="container-x relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-white/10 text-white ring-1 ring-white/15">
              <GraduationCap className="h-5.5 w-5.5" />
            </span>
            <span>
              <span className="block font-heading text-lg font-extrabold text-white">{settings.siteShortName}</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-300">Institute</span>
            </span>
          </div>

          <p className="mt-5 text-[13.5px] leading-7 text-white/60">
            {settings.legalName}. Established {settings.foundedYear} — practical skill training, small batches and
            genuine placement support in {settings.city}.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip chip-glass">
              <BadgeCheck className="h-3.5 w-3.5" /> {settings.placementRate}% placement record
            </span>
            <span className="chip chip-glass">★ {settings.averageRating}/5 rating</span>
          </div>

          {activeSocials.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {activeSocials.map(({ key, label }) => {
                const Icon = SOCIAL_ICONS[key];
                return (
                  <a
                    key={key}
                    href={settings[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-white/70 transition-all hover:-translate-y-0.5 hover:border-accent-300/40 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <div>
          <h4 className="font-heading text-[13px] font-bold uppercase tracking-[0.16em] text-white">Popular courses</h4>
          <ul className="mt-5 space-y-3 text-[13.5px]">
            {FOOTER_COURSE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-start gap-2 text-white/60 transition-colors hover:text-white"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-300/60 transition-all group-hover:w-3" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-[13px] font-bold uppercase tracking-[0.16em] text-white">Quick links</h4>
          <ul className="mt-5 space-y-3 text-[13.5px]">
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-start gap-2 text-white/60 transition-colors hover:text-white"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-300/60 transition-all group-hover:w-3" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-[13px] font-bold uppercase tracking-[0.16em] text-white">Visit / contact</h4>
          <ul className="mt-5 space-y-4 text-[13.5px] text-white/65">
            <li className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-accent-300">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="leading-6">
                {settings.addressLine1}
                {settings.addressLine2 ? `, ${settings.addressLine2}` : ""}
                <br />
                {settings.city}, {settings.state} – {settings.pincode}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-accent-300">
                <Phone className="h-4 w-4" />
              </span>
              <span className="leading-6">
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="font-semibold text-white hover:text-accent-300">
                  {settings.phone}
                </a>
                {settings.alternatePhone ? (
                  <>
                    <br />
                    <a href={`tel:${settings.alternatePhone.replace(/\s/g, "")}`} className="hover:text-white">
                      {settings.alternatePhone}
                    </a>
                  </>
                ) : null}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-accent-300">
                <Mail className="h-4 w-4" />
              </span>
              <a href={`mailto:${settings.email}`} className="leading-6 hover:text-white">
                {settings.email}
              </a>
            </li>
            <li className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-accent-300">
                <Clock className="h-4 w-4" />
              </span>
              <span className="leading-6">{settings.officeHours}</span>
            </li>
          </ul>

          <Link href="/apply" className="btn btn-accent mt-6 w-full sm:w-auto">
            Apply online <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ------------------------------- bottom bar ----------------------------- */}
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[12px] text-white/45 sm:flex-row">
          <p>
            © {year} {settings.siteName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/faq" className="transition-colors hover:text-white">
              FAQs
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-white">
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
