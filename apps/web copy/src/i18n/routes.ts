import { matchPath } from "react-router-dom";
import { buildPath, LOCALES, type Locale } from "@existcode/i18n";

export type RouteKey =
  | "home"
  | "services"
  | "serviceDetail"
  | "pricing"
  | "blog"
  | "blogDetail"
  | "news"
  | "newsDetail"
  | "contact"
  | "about"
  | "order"
  | "orderLookup"
  | "payment";

type RouteTemplate = Record<Locale, string>;

// Paths are fully localized per-locale (not just a /:locale prefix) — e.g.
// /id/jasa vs /en/services — so every entry needs an explicit template per
// locale rather than one shared pattern with a dynamic :locale segment.
export const routeTemplates: Record<RouteKey, RouteTemplate> = {
  home: { id: "/id", en: "/en" },
  services: { id: "/id/jasa", en: "/en/services" },
  serviceDetail: { id: "/id/jasa/:slug", en: "/en/services/:slug" },
  pricing: { id: "/id/harga", en: "/en/pricing" },
  blog: { id: "/id/blog", en: "/en/blog" },
  blogDetail: { id: "/id/blog/:slug", en: "/en/blog/:slug" },
  news: { id: "/id/news", en: "/en/news" },
  newsDetail: { id: "/id/news/:slug", en: "/en/news/:slug" },
  contact: { id: "/id/kontak", en: "/en/contact" },
  about: { id: "/id/tentang", en: "/en/about" },
  order: { id: "/id/order", en: "/en/order" },
  orderLookup: { id: "/id/order/lacak", en: "/en/order/track" },
  payment: { id: "/id/order/:orderNumber/pembayaran", en: "/en/order/:orderNumber/payment" }
};

export function path(key: RouteKey, locale: Locale, params?: Record<string, string>): string {
  return buildPath(routeTemplates[key], locale, params);
}

// Detail routes carry a locale-specific slug we can't translate without the
// entity's data, so switching language from one falls back to its list page.
const detailFallback: Partial<Record<RouteKey, RouteKey>> = {
  serviceDetail: "services",
  blogDetail: "blog",
  newsDetail: "news",
  payment: "order"
};

// Best-effort language switch for the *current* URL: figure out which route
// key we're on, then rebuild that same page (or its list-page fallback for
// detail routes) in the target locale. Detail pages themselves render a more
// precise link once they know the entity's translated slug.
export function switchLocalePath(pathname: string, currentLocale: Locale, targetLocale: Locale): string {
  for (const key of Object.keys(routeTemplates) as RouteKey[]) {
    const match = matchPath(routeTemplates[key][currentLocale], pathname);

    if (match) {
      const fallbackKey = detailFallback[key];

      if (fallbackKey) {
        return path(fallbackKey, targetLocale);
      }

      return path(key, targetLocale, match.params as Record<string, string>);
    }
  }

  return path("home", targetLocale);
}

// Detail pages know their entity's translated slug map (the API's `slugs`
// field) once loaded, so they can build exact per-locale links instead of
// the generic list-page fallback above — pass the result to
// CompanyPageShell's `localeLinks` prop.
export function localeLinksFromSlugs(
  key: RouteKey,
  slugs: Record<string, string> | undefined
): Partial<Record<Locale, string>> | undefined {
  if (!slugs) return undefined;

  const links: Partial<Record<Locale, string>> = {};
  for (const locale of LOCALES) {
    const slug = slugs[locale];
    if (slug) links[locale] = path(key, locale, { slug });
  }
  return links;
}
