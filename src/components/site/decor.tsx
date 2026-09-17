import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Decorative, server-safe building blocks used across the public site.
 * Everything is pure CSS/SVG, so the site stays fast and asset-free.
 * ------------------------------------------------------------------ */

/** Deterministic 32-bit hash so a given slug always gets the same artwork. */
function hash(input: string) {
  let value = 0;
  for (let index = 0; index < input.length; index += 1) {
    value = (value << 5) - value + input.charCodeAt(index);
    value |= 0;
  }
  return Math.abs(value);
}

/** Four cohesive tones pulled from the live brand colours. */
const TONES = [
  "linear-gradient(135deg, var(--brand-400) 0%, var(--brand-600) 48%, var(--brand-900) 100%)",
  "linear-gradient(140deg, var(--brand-700) 0%, var(--brand-900) 60%, var(--brand-950) 100%)",
  "linear-gradient(135deg, var(--ink) 0%, var(--brand-800) 70%, var(--brand-900) 100%)",
  "linear-gradient(150deg, var(--brand-800) 0%, var(--brand-950) 45%, color-mix(in srgb, var(--brand-accent) 42%, var(--brand-900)) 130%)",
];

const PATTERNS = ["circuit", "bars", "waves", "mesh", "prism", "grid"] as const;

function ArtPattern({ kind }: { kind: (typeof PATTERNS)[number] }) {
  const common = "absolute inset-0 h-full w-full";
  switch (kind) {
    case "circuit":
      return (
        <svg className={common} viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
          <g stroke="rgba(255,255,255,.24)" strokeWidth="1.1" fill="none">
            <path d="M0 132h58l26-30h54l24 26h64l22-24h72" />
            <path d="M0 96h44l22 22h58l28-28h58l26 26h84" />
            <path d="M18 180V40l30-22h70" />
          </g>
          <g fill="rgba(255,255,255,.55)">
            <circle cx="58" cy="132" r="3.2" />
            <circle cx="162" cy="98" r="3.2" />
            <circle cx="248" cy="128" r="3.2" />
            <circle cx="118" cy="158" r="2.6" />
          </g>
        </svg>
      );
    case "bars":
      return (
        <svg className={common} viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
          <g fill="rgba(255,255,255,.16)">
            <rect x="26" y="104" width="26" height="76" rx="7" />
            <rect x="66" y="78" width="26" height="102" rx="7" />
            <rect x="106" y="116" width="26" height="64" rx="7" />
            <rect x="146" y="52" width="26" height="128" rx="7" />
            <rect x="186" y="88" width="26" height="92" rx="7" />
            <rect x="226" y="34" width="26" height="146" rx="7" />
            <rect x="266" y="68" width="26" height="112" rx="7" />
          </g>
          <path
            d="M26 116 92 84l48 24 44-52 46 26 44-42"
            fill="none"
            stroke="rgba(255,255,255,.5)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 7"
          />
        </svg>
      );
    case "waves":
      return (
        <svg className={common} viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
          <g fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.6">
            <path d="M-10 128c40-34 74 26 116-4s72-42 118-10 66 26 106-6" />
            <path d="M-10 156c40-34 74 26 116-4s72-42 118-10 66 26 106-6" />
            <path d="M-10 100c40-34 74 26 116-4s72-42 118-10 66 26 106-6" />
          </g>
          <g fill="rgba(255,255,255,.4)">
            <circle cx="82" cy="118" r="3" />
            <circle cx="204" cy="106" r="3" />
            <circle cx="286" cy="132" r="3" />
          </g>
        </svg>
      );
    case "mesh":
      return (
        <svg className={common} viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
          <g stroke="rgba(255,255,255,.2)" fill="none">
            <path d="M0 40h80l40 40 40-40h80l40 40 40-40" />
            <path d="M0 120h60l50-40 50 40h60l50-40 50 40" />
            <path d="M120 0v80M240 0v80M60 100v80M200 100v80" />
          </g>
        </svg>
      );
    case "prism":
      return (
        <svg className={common} viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
          <g fill="rgba(255,255,255,.14)">
            <path d="M40 170 100 40l60 130z" />
            <path d="M120 170 186 24l66 146z" />
            <path d="M208 170 258 60l46 110z" />
          </g>
          <g stroke="rgba(255,255,255,.42)" strokeWidth="1.3" fill="none">
            <path d="M40 170 100 40l60 130z" />
            <path d="M208 170 258 60l46 110z" />
          </g>
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="art-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,.35)" />
            </pattern>
          </defs>
          <rect width="320" height="180" fill="url(#art-dots)" />
          <g stroke="rgba(255,255,255,.16)" fill="none" strokeWidth="1.2">
            <circle cx="270" cy="34" r="46" />
            <circle cx="270" cy="34" r="72" />
          </g>
        </svg>
      );
  }
}

/**
 * Generated cover art for a course or blog card — no image assets required,
 * and it re-themes automatically when the brand colours change.
 */
export function CourseArt({
  seed,
  icon: Icon,
  className,
  compact = false,
}: {
  seed: string;
  icon?: LucideIcon;
  className?: string;
  compact?: boolean;
}) {
  const value = hash(seed);
  const tone = TONES[value % TONES.length];
  const pattern = PATTERNS[Math.floor(value / 7) % PATTERNS.length];

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} style={{ backgroundImage: tone }}>
      <ArtPattern kind={pattern} />
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-14 -left-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      {Icon ? (
        <Icon
          className={cn(
            "absolute text-white/25",
            compact ? "-bottom-2 right-2 h-20 w-20" : "-bottom-3 right-3 h-28 w-28",
          )}
          strokeWidth={1.2}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}

/** Soft aurora blobs for dark bands and hero backgrounds. */
export function Orbs({ tone = "brand", className }: { tone?: "brand" | "accent" | "mixed"; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <span
        className="orb animate-aurora"
        style={{
          width: "34rem",
          height: "34rem",
          top: "-14rem",
          left: "-8rem",
          background:
            tone === "accent"
              ? "color-mix(in srgb, var(--brand-accent) 55%, transparent)"
              : "color-mix(in srgb, var(--brand) 60%, transparent)",
          opacity: 0.5,
        }}
      />
      <span
        className="orb animate-aurora"
        style={{
          width: "28rem",
          height: "28rem",
          bottom: "-12rem",
          right: "-6rem",
          background:
            tone === "brand"
              ? "color-mix(in srgb, var(--brand-accent) 50%, transparent)"
              : "color-mix(in srgb, var(--brand-accent) 55%, transparent)",
          opacity: 0.42,
          animationDelay: "-6s",
        }}
      />
      {tone === "mixed" ? (
        <span
          className="orb"
          style={{
            width: "22rem",
            height: "22rem",
            top: "38%",
            left: "52%",
            background: "color-mix(in srgb, var(--brand-400) 45%, transparent)",
            opacity: 0.35,
          }}
        />
      ) : null}
    </div>
  );
}

/** Infinite logo / phrase strip. Children are rendered twice for a seamless loop. */
export function Marquee({
  children,
  speed = "normal",
  className,
}: {
  children: React.ReactNode;
  speed?: "normal" | "fast";
  className?: string;
}) {
  return (
    <div className={cn("pause-on-hover mask-fade-x relative overflow-hidden", className)}>
      <div className={cn("flex w-max", speed === "fast" ? "animate-marquee-fast" : "animate-marquee")}>
        <div className="flex shrink-0 items-center gap-x-10 pr-10">{children}</div>
        <div className="flex shrink-0 items-center gap-x-10 pr-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Overlapping avatar cluster used as a social-proof element. */
export function AvatarCluster({
  people,
  tone = "light",
}: {
  people: { name: string; initials: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex items-center">
      {people.map((person, index) => (
        <span
          key={person.name}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border-2 text-[11px] font-bold shadow-sm",
            tone === "dark" ? "border-white/30 bg-white/15 text-white backdrop-blur" : "border-white bg-brand-100 text-brand-800",
          )}
          style={{ marginLeft: index === 0 ? 0 : "-0.65rem", zIndex: people.length - index }}
          title={person.name}
        >
          {person.initials}
        </span>
      ))}
    </div>
  );
}

/** Thin gradient rule used between hero and content. */
export function GradientRule({ className }: { className?: string }) {
  return (
    <span
      className={cn("block h-px w-full", className)}
      style={{ background: "linear-gradient(90deg, transparent, var(--line-strong) 18%, var(--line-strong) 82%, transparent)" }}
    />
  );
}
