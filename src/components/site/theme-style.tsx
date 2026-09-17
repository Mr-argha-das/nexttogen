import type { SiteSettings } from "@/lib/types";

/**
 * Injects theme colors from the database settings. Changing the brand color in the
 * admin panel instantly re-themes the whole site (buttons, badges, gradients).
 */
export function ThemeStyle({ settings }: { settings: SiteSettings }) {
  const css = `:root{--brand:${settings.brandPrimary};--brand-accent:${settings.brandAccent};}`;
  return <style id="ntg-theme" dangerouslySetInnerHTML={{ __html: css }} />;
}

export function Analytics({ settings }: { settings: SiteSettings }) {
  const id = settings.googleAnalyticsId?.trim();
  if (!id) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`,
        }}
      />
    </>
  );
}
