"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, GraduationCap, ChevronRight, MessageCircle, Star } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";

type Props = {
  siteName: string;
  siteShortName: string;
  phone: string;
  tagline: string;
  whatsapp?: string;
  rating?: string;
};

export function SiteHeader({ siteName, siteShortName, phone, tagline, whatsapp, rating }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      {/* ------------------------------ top strip ------------------------------ */}
      <div className="hidden bg-[var(--grad-brand-deep)] text-white lg:block">
        <div className="container-x flex h-10 items-center justify-between text-[12px]">
          <p className="flex items-center gap-2.5 text-white/70">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 font-semibold text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Admissions open
            </span>
            <span className="text-white/60">{tagline}</span>
          </p>
          <div className="flex items-center gap-5 text-white/70">
            {rating ? (
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {rating}/5 student rating
              </span>
            ) : null}
            <Link href="/faq" className="transition-colors hover:text-white">
              FAQs
            </Link>
            <Link href="/support" className="transition-colors hover:text-white">
              Support us
            </Link>
            {whatsapp ? (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            ) : null}
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 font-semibold text-white">
              <Phone className="h-3.5 w-3.5" /> {phone}
            </a>
          </div>
        </div>
      </div>

      {/* ------------------------------- main bar ------------------------------ */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-line bg-white/85 shadow-[0_10px_40px_-28px_rgb(10_16_32/0.5)] backdrop-blur-xl"
            : "border-transparent bg-white/70 backdrop-blur-md",
        )}
      >
        <div className={cn("container-x flex items-center justify-between gap-4 transition-all", scrolled ? "h-16" : "h-18")}>
          <Link href="/" className="group flex items-center gap-3" aria-label={siteName}>
            <span className="relative flex h-11 w-11 items-center justify-center rounded-[0.9rem] bg-[var(--grad-brand)] text-white shadow-[var(--shadow-brand)] transition-transform duration-300 group-hover:-rotate-6">
              <GraduationCap className="h-5.5 w-5.5" strokeWidth={2.2} />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-accent-500 ring-2 ring-white" />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-[1.08rem] font-extrabold tracking-tight text-ink">
                {siteShortName}
              </span>
              <span className="block text-[9.5px] font-bold uppercase tracking-[0.22em] text-brand-600">
                Institute
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-xl px-3.5 py-2 text-[13.5px] font-semibold transition-colors",
                  isActive(link.href)
                    ? "text-brand-800"
                    : "text-slate-600 hover:bg-brand-50 hover:text-brand-700",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[var(--grad-accent)] transition-transform duration-300",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/apply" className="btn btn-primary btn-sm group hidden sm:inline-flex">
              Apply now
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong text-ink lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ----------------------------- mobile menu ----------------------------- */}
      {open && (
        <div className="animate-fade absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-line bg-white pb-6 lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3.5 text-[14.5px] font-semibold transition-colors",
                  isActive(link.href) ? "bg-brand-50 text-brand-800" : "text-slate-700 hover:bg-canvas",
                )}
              >
                {link.label}
                <ChevronRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}

            <div className="mt-3 grid gap-2">
              <Link href="/apply" className="btn btn-primary btn-lg w-full">
                Apply now
              </Link>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn btn-outline w-full">
                <Phone className="h-4 w-4" /> {phone}
              </a>
            </div>

            <p className="mt-4 text-center text-[12px] text-slate-500">
              {tagline} · {siteName}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
