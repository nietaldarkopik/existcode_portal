// Production server for apps/web. Facebook/WhatsApp/X/Instagram's link-preview
// scrapers don't execute JavaScript, so a plain static-file server (or the
// SPA's own client-side <Seo> component) can never give them a real preview —
// the HTML they fetch has to already contain the right <meta> tags. This
// server does exactly that for known bot User-Agents (server-to-server data
// fetch from the Laravel API, then meta tags spliced into dist/index.html),
// while every other visitor gets the same static SPA shell as before.
import express from "express";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { matchPath } from "react-router-dom";
import { LOCALES, type Locale } from "@existcode/i18n";
import type { ApiResponse, SeoBlock, SeoPageKey, SeoSetting } from "@existcode/types";
import { routeTemplates, type RouteKey } from "../src/i18n/routes";

// Loose shape covering the fields actually read below across
// Service/BlogPost/NewsPost — they don't share a common type, and the
// server only ever touches this handful of fields.
interface DetailEntity {
  name?: string;
  title?: string;
  summary?: string;
  excerpt?: string;
  cover_image_url?: string | null;
  seo?: SeoBlock;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "../dist");
const PORT = Number(process.env.PORT ?? 4173);
const API_URL = process.env.API_URL ?? "http://localhost:8000/api/v1";
const SITE_URL = process.env.SITE_URL ?? `http://localhost:${PORT}`;

const BOT_UA_PATTERN =
  /facebookexternalhit|Facebot|WhatsApp|Twitterbot|LinkedInBot|Slackbot|TelegramBot|Discordbot|Googlebot|Google-InspectionTool|bingbot|Applebot|Pinterest|redditbot/i;

const STATIC_PAGE_KEYS: Partial<Record<RouteKey, SeoPageKey>> = {
  home: "home",
  about: "about",
  contact: "contact",
  services: "services",
  pricing: "pricing",
  blog: "blog",
  news: "news"
};

const DETAIL_ENDPOINTS: Partial<Record<RouteKey, string>> = {
  serviceDetail: "services",
  blogDetail: "blog-posts",
  newsDetail: "news-posts"
};

interface ResolvedSeo {
  title: string;
  description: string;
  keywords: string | null;
  image: string | null;
  type: "website" | "article";
}

const indexHtml = readFileSync(path.join(DIST_DIR, "index.html"), "utf-8");

const cache = new Map<string, { html: string; expires: number }>();
const CACHE_TTL_MS = 60_000;

function matchRoute(pathname: string): { key: RouteKey; locale: Locale; params: Record<string, string> } | null {
  for (const key of Object.keys(routeTemplates) as RouteKey[]) {
    for (const locale of LOCALES) {
      const match = matchPath(routeTemplates[key][locale], pathname);
      if (match) {
        return { key, locale, params: (match.params ?? {}) as Record<string, string> };
      }
    }
  }
  return null;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function resolveSeo(key: RouteKey, locale: Locale, params: Record<string, string>): Promise<ResolvedSeo | null> {
  const settingRes = await fetchJson<ApiResponse<SeoSetting>>(`${API_URL}/settings/seo`);
  const siteSeo = settingRes?.data;
  const titleTemplate: string = siteSeo?.titleTemplate ?? "%s — Existcode";
  const defaultKeywords: string | null = siteSeo?.defaultKeywords ?? null;
  const defaultImage: string | null = siteSeo?.defaultOgImage ?? null;
  const applyTemplate = (title: string) => titleTemplate.replace("%s", title);

  const detailEndpoint = DETAIL_ENDPOINTS[key];
  if (detailEndpoint && params.slug) {
    const entityRes = await fetchJson<ApiResponse<DetailEntity>>(
      `${API_URL}/${detailEndpoint}/${encodeURIComponent(params.slug)}?locale=${locale}`
    );
    const entity = entityRes?.data;
    if (!entity) return null;

    const title = entity.seo?.title ?? entity.name ?? entity.title ?? siteSeo?.siteName ?? "Existcode";
    const description = entity.seo?.description ?? entity.summary ?? entity.excerpt ?? siteSeo?.defaultDescription ?? "";

    return {
      title: applyTemplate(title),
      description,
      keywords: entity.seo?.keywords ?? defaultKeywords,
      image: entity.seo?.og_image ?? entity.cover_image_url ?? defaultImage,
      type: key === "serviceDetail" ? "website" : "article"
    };
  }

  const pageKey = STATIC_PAGE_KEYS[key];
  const page = pageKey ? siteSeo?.pages?.[pageKey] : undefined;
  const pageTitle: string | undefined = page?.title?.[locale] || undefined;
  const description: string = page?.description?.[locale] || siteSeo?.defaultDescription || "";

  return {
    // Only run the title through the "%s — Existcode" template when there's
    // an actual page-specific title to slot in — otherwise it doubles up
    // into "Existcode — Existcode" for pages the admin hasn't filled in yet.
    title: pageTitle ? applyTemplate(pageTitle) : siteSeo?.siteName || "Existcode",
    description,
    keywords: defaultKeywords,
    image: defaultImage,
    type: "website"
  };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderHead(seo: ResolvedSeo, url: string, locale: Locale): string {
  const ogLocale = locale === "id" ? "id_ID" : "en_US";

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    seo.keywords ? `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />` : "",
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:locale" content="${ogLocale}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    seo.image ? `<meta property="og:image" content="${escapeHtml(seo.image)}" />` : "",
    `<meta name="twitter:card" content="${seo.image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    seo.image ? `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />` : ""
  ]
    .filter(Boolean)
    .join("\n    ");
}

function injectHead(html: string, headExtra: string): string {
  return html.replace(/<title>.*?<\/title>/, headExtra);
}

const app = express();

app.use("/assets", express.static(path.join(DIST_DIR, "assets"), { immutable: true, maxAge: "1y" }));
app.use(express.static(DIST_DIR, { index: false }));

app.get(/.*/, async (req, res) => {
  const isBot = BOT_UA_PATTERN.test(req.headers["user-agent"] ?? "");

  if (!isBot) {
    res.type("html").send(indexHtml);
    return;
  }

  const cacheKey = req.originalUrl;
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    res.type("html").send(cached.html);
    return;
  }

  const matched = matchRoute(req.path);
  const url = `${SITE_URL}${req.originalUrl}`;

  let html = indexHtml;
  if (matched) {
    const seo = await resolveSeo(matched.key, matched.locale, matched.params);
    if (seo) {
      html = injectHead(indexHtml, renderHead(seo, url, matched.locale));
    }
  }

  cache.set(cacheKey, { html, expires: Date.now() + CACHE_TTL_MS });
  res.type("html").send(html);
});

app.listen(PORT, () => {
  console.log(`existcode.id web server listening on :${PORT} (API_URL=${API_URL})`);
});
