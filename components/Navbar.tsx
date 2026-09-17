"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import clsx from "clsx";

const links = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Support Us", href: "/support" },
  { label: "Contact", href: "/contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-lg border-b border-ink-100 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-800 text-gold-400 shadow-glow-brand group-hover:scale-105 transition">
            <GraduationCap className="h-6 w-6" />
            <span className="absolute inset-0 rounded-xl ring-2 ring-gold-400/40 group-hover:ring-gold-400" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[22px] font-semibold text-brand-900 tracking-display">
              Next<span className="text-gold-500">To</span>Gen
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-ink-500 mt-1">
              Academy
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-700 hover:text-brand-800 link-underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/apply" className="btn-outline">
            Sign In
          </Link>
          <Link href="/apply" className="btn-gold">
            Apply Now
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink-200 bg-white text-brand-800"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-white">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 rounded-lg text-ink-700 hover:bg-brand-50 hover:text-brand-800 font-medium"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3">
              <Link href="/apply" className="btn-outline flex-1">
                Sign In
              </Link>
              <Link href="/apply" className="btn-gold flex-1">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
