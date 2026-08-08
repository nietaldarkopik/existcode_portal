import { useLocation } from "react-router-dom";
import { useLocale } from "../../i18n";
import { useSiteSeo } from "./useSiteSeo";

export interface SeoProps {
  title: string;
  description: string;
  keywords?: string | null | undefined;
  image?: string | null | undefined;
  type?: "website" | "article";
}

// Renders <title>/<meta> tags anywhere in the tree — React 19 hoists them
// into <head> automatically, no portal/library needed. This only helps real
// browsers and Google's JS-rendering crawler; Facebook/WhatsApp/X/Instagram
// don't execute JS at all, so their previews are served by the separate
// bot-aware production server (see apps/web/server/index.mjs) instead.
export function Seo({ title, description, keywords, image, type = "website" }: SeoProps) {
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const { data: siteSeo } = useSiteSeo();

  const fullTitle = siteSeo ? siteSeo.titleTemplate.replace("%s", title) : title;
  const resolvedKeywords = keywords ?? siteSeo?.defaultKeywords ?? null;
  const resolvedImage = image ?? siteSeo?.defaultOgImage ?? null;
  const url = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : pathname;
  const ogLocale = locale === "id" ? "id_ID" : "en_US";

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {resolvedKeywords ? <meta name="keywords" content={resolvedKeywords} /> : null}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteSeo?.siteName ?? "Existcode"} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {resolvedImage ? <meta property="og:image" content={resolvedImage} /> : null}

      <meta name="twitter:card" content={resolvedImage ? "summary_large_image" : "summary"} />
      {siteSeo?.twitterHandle ? <meta name="twitter:site" content={siteSeo.twitterHandle} /> : null}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {resolvedImage ? <meta name="twitter:image" content={resolvedImage} /> : null}
    </>
  );
}
