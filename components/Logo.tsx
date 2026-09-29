import Link from "next/link";
import clsx from "clsx";

/**
 * NEXT GEN brand logo.
 *
 * The interlocking N (navy) + G (violet) monogram is rendered as inline SVG so it
 * scales crisply and uses the site's exact brand colors. The wordmark uses the
 * site display font (Space Grotesk) for a consistent, sharp lockup.
 *
 * NOTE: This is a faithful vector reconstruction of the uploaded NEXT GEN logo.
 * To drop in the exact original artwork, replace the SVG paths in `LogoMark`
 * below (or point an <img> at your file) — every usage across the site flows
 * through this single component.
 */

export function LogoMark({
  className,
  style
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 300 210"
      className={className}
      style={style}
      fill="none"
      role="img"
      aria-label="NEXT GEN monogram"
    >
      <defs>
        <linearGradient id="ngNavy" x1="30" y1="20" x2="150" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f2f74" />
          <stop offset="1" stopColor="#1a1a4d" />
        </linearGradient>
        <linearGradient id="ngViolet" x1="150" y1="20" x2="290" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8175e6" />
          <stop offset="1" stopColor="#5e51c6" />
        </linearGradient>
      </defs>
      {/* N — navy */}
      <g stroke="url(#ngNavy)" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 32 V178" />
        <path d="M44 40 L140 170" />
        <path d="M140 32 V178" />
      </g>
      {/* G — violet */}
      <g stroke="url(#ngViolet)" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round">
        <path d="M264 74 A66 66 0 1 0 264 146" />
        <path d="M266 110 H210" />
      </g>
    </svg>
  );
}

type LogoProps = {
  variant?: "horizontal" | "stacked" | "mark";
  href?: string | null;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
};

function Wordmark({ className, stacked }: { className?: string; stacked?: boolean }) {
  return (
    <span
      className={clsx(
        "font-display font-bold leading-none tracking-[0.14em] select-none",
        className
      )}
    >
      <span className="text-ink-900">NEXT</span>
      <span className={stacked ? "text-gold-300" : "text-gold-300"}> GEN</span>
    </span>
  );
}

export default function Logo({
  variant = "horizontal",
  href = "/",
  className,
  markClassName,
  wordmarkClassName
}: LogoProps) {
  const inner =
    variant === "mark" ? (
      <LogoMark className={clsx("h-10 w-auto", markClassName)} />
    ) : variant === "stacked" ? (
      <span className="flex flex-col items-center gap-3">
        <LogoMark className={clsx("h-16 w-auto", markClassName)} />
        <Wordmark stacked className={clsx("text-xl", wordmarkClassName)} />
      </span>
    ) : (
      <span className="flex items-center gap-2.5">
        <LogoMark className={clsx("h-9 w-auto shrink-0", markClassName)} />
        <Wordmark className={clsx("text-[19px] pt-0.5", wordmarkClassName)} />
      </span>
    );

  if (href === null) {
    return <span className={clsx("inline-flex", className)}>{inner}</span>;
  }
  return (
    <Link
      href={href}
      aria-label="NEXT GEN — home"
      className={clsx("inline-flex items-center group", className)}
    >
      {inner}
    </Link>
  );
}
