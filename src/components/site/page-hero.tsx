import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

type Crumb = { href?: string; label: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b",
        dark ? "border-white/10 bg-[var(--grad-brand-deep)] text-white" : "border-line bg-canvas",
      )}
    >
      {/* decoration */}
      {dark ? (
        <>
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
          <span
            className="orb"
            style={{
              width: "26rem",
              height: "26rem",
              top: "-10rem",
              right: "-6rem",
              background: "color-mix(in srgb, var(--brand-accent) 45%, transparent)",
              opacity: 0.4,
            }}
          />
        </>
      ) : (
        <>
          <div className="mesh pointer-events-none absolute inset-0 opacity-50" />
          <div className="grid-lines-dark pointer-events-none absolute inset-0 opacity-[0.35]" />
          <span
            className="orb"
            style={{
              width: "24rem",
              height: "24rem",
              top: "-12rem",
              right: "-6rem",
              background: "color-mix(in srgb, var(--brand-accent) 30%, transparent)",
              opacity: 0.35,
            }}
          />
        </>
      )}

      <div className="container-x relative py-12 sm:py-16 lg:py-20">
        {crumbs.length ? (
          <nav
            aria-label="Breadcrumb"
            className={cn(
              "mb-6 inline-flex flex-wrap items-center gap-1 rounded-full border px-3.5 py-1.5 text-[12px] font-medium backdrop-blur",
              dark ? "border-white/15 bg-white/10 text-white/70" : "border-line bg-white/80 text-slate-500",
            )}
          >
            <Link href="/" className={cn("flex items-center gap-1.5 transition-colors", dark ? "hover:text-white" : "hover:text-brand-700")}>
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className={cn("h-3.5 w-3.5", dark ? "text-white/30" : "text-slate-300")} />
                {crumb.href ? (
                  <Link href={crumb.href} className={cn("transition-colors", dark ? "hover:text-white" : "hover:text-brand-700")}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={cn("font-semibold", dark ? "text-white" : "text-ink")}>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="max-w-3xl">
          {eyebrow ? (
            <p className={cn("eyebrow", dark && "!text-accent-300")}>{eyebrow}</p>
          ) : null}
          <h1 className={cn("display-1 mt-3", dark && "text-white")} style={{ fontSize: "clamp(2rem, 4.2vw, 3.1rem)" }}>
            {title}
          </h1>
          {description ? (
            <p className={cn("lede mt-5 max-w-2xl", dark && "text-white/70")}>{description}</p>
          ) : null}
        </div>

        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
