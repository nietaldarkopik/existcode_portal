<?php
/**
 * Server-side meta-tag injection for link-preview bots (WhatsApp, Facebook,
 * X/Twitter, etc.) that don't execute JavaScript, running under plain Apache
 * + PHP (no Node process needed). .htaccess routes only known bot
 * User-Agents here; everyone else gets the static SPA shell straight from
 * index.html and the client-side <Seo> component takes over once JS runs.
 *
 * This mirrors apps/web/server/index.ts (the Node/Express equivalent used
 * when this app is deployed as a Node app instead of static files) — keep
 * the route table and head-injection logic in sync with that file.
 */

declare(strict_types=1);

const API_URL = 'https://blanchedalmond-leopard-568785.hostingersite.com/api/v1';
const SITE_URL = 'https://mediumorchid-eland-302597.hostingersite.com';
const CACHE_DIR = __DIR__ . '/.seo-cache';
const CACHE_TTL = 60; // seconds, mirrors server/index.ts's in-memory cache

const DETAIL_ENDPOINTS = [
    'serviceDetail' => 'services',
    'blogDetail' => 'blog-posts',
    'newsDetail' => 'news-posts',
];

// [regex, locale, routeKey, hasSlug] — detail patterns must come before
// their list-page counterpart since both share the same prefix.
const ROUTES = [
    ['#^/id/?$#', 'id', 'home', false],
    ['#^/en/?$#', 'en', 'home', false],
    ['#^/id/jasa/([^/]+)/?$#', 'id', 'serviceDetail', true],
    ['#^/en/services/([^/]+)/?$#', 'en', 'serviceDetail', true],
    ['#^/id/jasa/?$#', 'id', 'services', false],
    ['#^/en/services/?$#', 'en', 'services', false],
    ['#^/id/harga/?$#', 'id', 'pricing', false],
    ['#^/en/pricing/?$#', 'en', 'pricing', false],
    ['#^/id/blog/([^/]+)/?$#', 'id', 'blogDetail', true],
    ['#^/en/blog/([^/]+)/?$#', 'en', 'blogDetail', true],
    ['#^/id/blog/?$#', 'id', 'blog', false],
    ['#^/en/blog/?$#', 'en', 'blog', false],
    ['#^/id/news/([^/]+)/?$#', 'id', 'newsDetail', true],
    ['#^/en/news/([^/]+)/?$#', 'en', 'newsDetail', true],
    ['#^/id/news/?$#', 'id', 'news', false],
    ['#^/en/news/?$#', 'en', 'news', false],
    ['#^/id/kontak/?$#', 'id', 'contact', false],
    ['#^/en/contact/?$#', 'en', 'contact', false],
    ['#^/id/tentang/?$#', 'id', 'about', false],
    ['#^/en/about/?$#', 'en', 'about', false],
];

function fetch_json(string $url): ?array
{
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => "Accept: application/json\r\n",
            'timeout' => 4,
            'ignore_errors' => true,
        ],
    ]);

    $body = @file_get_contents($url, false, $context);
    if ($body === false) {
        return null;
    }

    $status = 200;
    foreach ($http_response_header ?? [] as $header) {
        if (preg_match('#^HTTP/\S+\s+(\d+)#', $header, $m)) {
            $status = (int) $m[1];
        }
    }
    if ($status >= 400) {
        return null;
    }

    $data = json_decode($body, true);
    return is_array($data) ? $data : null;
}

function match_route(string $path): ?array
{
    foreach (ROUTES as [$pattern, $locale, $key, $hasSlug]) {
        if (preg_match($pattern, $path, $m)) {
            return ['locale' => $locale, 'key' => $key, 'slug' => $hasSlug ? ($m[1] ?? null) : null];
        }
    }
    return null;
}

function esc(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function render_head(array $seo, string $url): string
{
    $lines = [
        '<title>' . esc($seo['title']) . '</title>',
        '<meta name="description" content="' . esc($seo['description']) . '" />',
    ];
    if (!empty($seo['keywords'])) {
        $lines[] = '<meta name="keywords" content="' . esc($seo['keywords']) . '" />';
    }
    $lines[] = '<link rel="canonical" href="' . esc($url) . '" />';
    $lines[] = '<meta property="og:type" content="' . esc($seo['type']) . '" />';
    $lines[] = '<meta property="og:site_name" content="Existcode" />';
    $lines[] = '<meta property="og:locale" content="' . esc($seo['ogLocale']) . '" />';
    $lines[] = '<meta property="og:title" content="' . esc($seo['title']) . '" />';
    $lines[] = '<meta property="og:description" content="' . esc($seo['description']) . '" />';
    $lines[] = '<meta property="og:url" content="' . esc($url) . '" />';
    if (!empty($seo['image'])) {
        $lines[] = '<meta property="og:image" content="' . esc($seo['image']) . '" />';
    }
    $lines[] = '<meta name="twitter:card" content="' . (!empty($seo['image']) ? 'summary_large_image' : 'summary') . '" />';
    $lines[] = '<meta name="twitter:title" content="' . esc($seo['title']) . '" />';
    $lines[] = '<meta name="twitter:description" content="' . esc($seo['description']) . '" />';
    if (!empty($seo['image'])) {
        $lines[] = '<meta name="twitter:image" content="' . esc($seo['image']) . '" />';
    }

    return implode("\n    ", $lines);
}

function resolve_seo(string $key, string $locale, ?string $slug): ?array
{
    $settingRes = fetch_json(API_URL . '/settings/seo');
    $siteSeo = $settingRes['data'] ?? null;
    $titleTemplate = $siteSeo['titleTemplate'] ?? '%s — Existcode';
    $defaultKeywords = $siteSeo['defaultKeywords'] ?? null;
    $defaultImage = $siteSeo['defaultOgImage'] ?? (SITE_URL . '/og-default.jpg');
    $applyTemplate = fn (string $title): string => str_replace('%s', $title, $titleTemplate);
    $ogLocale = $locale === 'id' ? 'id_ID' : 'en_US';

    if (isset(DETAIL_ENDPOINTS[$key]) && $slug) {
        $endpoint = DETAIL_ENDPOINTS[$key];
        $entityRes = fetch_json(API_URL . '/' . $endpoint . '/' . rawurlencode($slug) . '?locale=' . $locale);
        $entity = $entityRes['data'] ?? null;
        if (!$entity) {
            return null;
        }

        $title = $entity['seo']['title'] ?? $entity['name'] ?? $entity['title'] ?? $siteSeo['siteName'] ?? 'Existcode';
        $description = $entity['seo']['description'] ?? $entity['summary'] ?? $entity['excerpt'] ?? $siteSeo['defaultDescription'] ?? '';

        return [
            'title' => $applyTemplate($title),
            'description' => $description,
            'keywords' => $entity['seo']['keywords'] ?? $defaultKeywords,
            'image' => $entity['seo']['og_image'] ?? $entity['cover_image_url'] ?? $defaultImage,
            'type' => $key === 'serviceDetail' ? 'website' : 'article',
            'ogLocale' => $ogLocale,
        ];
    }

    $page = $siteSeo['pages'][$key] ?? null;
    $pageTitle = $page['title'][$locale] ?? null;
    $description = $page['description'][$locale] ?? ($siteSeo['defaultDescription'] ?? '');

    return [
        'title' => $pageTitle ? $applyTemplate($pageTitle) : ($siteSeo['siteName'] ?? 'Existcode'),
        'description' => $description,
        'keywords' => $defaultKeywords,
        'image' => $defaultImage,
        'type' => 'website',
        'ogLocale' => $ogLocale,
    ];
}

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
$html = file_get_contents(__DIR__ . '/index.html');

$route = match_route($path);

if ($route !== null) {
    $cacheFile = CACHE_DIR . '/' . md5($path) . '.html';

    if (is_file($cacheFile) && (time() - filemtime($cacheFile)) < CACHE_TTL) {
        $html = file_get_contents($cacheFile);
    } else {
        $seo = resolve_seo($route['key'], $route['locale'], $route['slug']);

        if ($seo !== null) {
            $head = render_head($seo, SITE_URL . $path);
            $injected = preg_replace(
                '#<!-- seo:start -->[\s\S]*?<!-- seo:end -->#',
                "<!-- seo:start -->\n    " . $head . "\n    <!-- seo:end -->",
                $html
            );

            if ($injected !== null) {
                $html = $injected;
                if (!is_dir(CACHE_DIR)) {
                    @mkdir(CACHE_DIR, 0755, true);
                }
                @file_put_contents($cacheFile, $html);
            }
        }
    }
}

header('Content-Type: text/html; charset=UTF-8');
echo $html;
