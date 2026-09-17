import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { href?: string; label: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-canvas">
      <div className="mesh pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative py-10 sm:py-14">
        {crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-[12.5px] text-slate-500">
            <Link href="/" className="hover:text-brand-700">
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand-700">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-700">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-2 font-heading text-[1.75rem] font-extrabold leading-tight sm:text-[2.2rem] lg:text-[2.5rem]">
            {title}
          </h1>
          {description ? <p className="mt-4 text-[15px] leading-7 text-slate-600">{description}</p> : null}
        </div>
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  );
}
