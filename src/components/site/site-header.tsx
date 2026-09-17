"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, GraduationCap, ChevronRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";

type Props = {
  siteName: string;
  siteShortName: string;
  phone: string;
  tagline: string;
};

export function SiteHeader({ siteName, siteShortName, phone, tagline }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      {/* Top strip */}
      <div className="hidden bg-ink text-white lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2 text-slate-300">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Admissions open for new batches · {tagline}
          </p>
          <div className="flex items-center gap-5 text-slate-300">
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5" /> {phone}
            </a>
            <Link href="/faq" className="hover:text-white">
              FAQs
            </Link>
            <Link href="/careers" className="hover:text-white">
              Careers
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-transparent bg-white/85 backdrop-blur-md transition-shadow",
          scrolled && "border-slate-200 shadow-[0_8px_30px_-24px_rgb(15_23_42/0.6)]",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-18">
          <Link href="/" className="flex items-center gap-2.5" aria-label={siteName}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md">
              <GraduationCap className="h-5.5 w-5.5" strokeWidth={2.2} />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-[1.05rem] font-extrabold tracking-tight text-ink">
                {siteShortName}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-600">
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
                  "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700",
                  isActive(link.href) && "bg-brand-50 font-semibold text-brand-700",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/apply" className="btn btn-primary btn-sm hidden sm:inline-flex lg:hidden xl:inline-flex">
              Apply Now <ChevronRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menu band karein" : "Menu kholein"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fade border-b border-slate-200 bg-white lg:hidden">
          <nav className="container-x flex flex-col py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700",
                  isActive(link.href) && "bg-brand-50 text-brand-700",
                )}
              >
                {link.label}
                <ChevronRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}
            <div className="mt-2 flex gap-2 pb-2">
              <Link href="/apply" className="btn btn-primary flex-1">
                Apply Now
              </Link>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn btn-outline">
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
