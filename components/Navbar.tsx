"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/Logo";

const links = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Certificates", href: "/certificates" },
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
          ? "bg-[#06081a]/80 backdrop-blur-xl border-b border-white/10 shadow-soft"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Logo className="group-hover:opacity-90" markClassName="transition-transform duration-300 group-hover:scale-105" />

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-600 hover:text-white link-underline transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/admin/login" className="btn-outline">
            Admin
          </Link>
          <Link href="/apply" className="btn-primary">
            Apply Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-800 hover:border-gold-400/50 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#06081a]/95 backdrop-blur-xl">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 px-3 rounded-xl text-ink-700 hover:bg-white/5 hover:text-white font-medium transition"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="btn-outline w-full sm:w-auto sm:flex-1 justify-center"
              >
                Admin
              </Link>
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className="btn-primary w-full sm:w-auto sm:flex-1 justify-center"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
