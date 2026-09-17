/** Brand icons (the lucide core set does not ship brand logos) — simple inline SVGs. */
type Props = { className?: string };

export function FacebookIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2c-.23-1.3-1.02-2.1-2.3-2.3C17.3 4.6 14.9 4.5 12 4.5s-5.3.1-7.3.4c-1.28.2-2.07 1-2.3 2.3C2.2 8.5 2.1 10 2.1 12s.1 3.5.3 4.8c.23 1.3 1.02 2.1 2.3 2.3 2 .3 4.4.4 7.3.4s5.3-.1 7.3-.4c1.28-.2 2.07-1 2.3-2.3.2-1.3.3-2.8.3-4.8s-.1-3.5-.3-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.02-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
    </svg>
  );
}

export function XIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.53 3h3.2l-6.99 7.99L22 21h-6.36l-4.35-5.86L6.3 21H3.1l7.28-8.32L3 3h6.5l4.06 5.5L17.53 3Zm-1.13 16.1h1.77L7.63 4.8H5.73l10.67 14.3Z" />
    </svg>
  );
}

export function TelegramIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.7 4.3 2.9 11.5c-1 .38-.99 1.76.02 2.12l4.28 1.51 1.65 5.17c.28.88 1.38 1.13 2 .43l2.35-2.63 4.4 3.22c.75.55 1.82.14 2.02-.77l3.06-14.3c.2-.95-.72-1.74-1.6-1.4l-.38.14ZM8.9 14.2l8.6-5.3-6.9 6.5-.25 3.2-1.45-4.4Z" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  telegram: TelegramIcon,
} as const;
