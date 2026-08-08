<?php

namespace App\Support\Settings;

use App\Support\Settings\Models\Setting;

class SeoSettings
{
    private const GROUP = 'seo';

    private const KEY = 'site';

    private const PAGE_KEYS = ['home', 'about', 'contact', 'services', 'pricing', 'blog', 'news'];

    public static function defaults(): array
    {
        $emptyPage = ['title' => ['id' => '', 'en' => ''], 'description' => ['id' => '', 'en' => '']];

        return [
            'siteName' => 'Existcode',
            'titleTemplate' => '%s — Existcode',
            'defaultDescription' => 'PT Existcode Digital Kreasi — mitra pengembangan software, aplikasi, dan infrastruktur cloud Anda.',
            'defaultKeywords' => 'software house, jasa pembuatan aplikasi, existcode',
            'defaultOgImage' => null,
            'twitterHandle' => null,
            'pages' => array_fill_keys(self::PAGE_KEYS, $emptyPage),
        ];
    }

    public static function current(): array
    {
        $setting = Setting::query()->where('group', self::GROUP)->where('key', self::KEY)->first();
        $stored = $setting?->value ?? [];
        $defaults = self::defaults();

        return [
            ...$defaults,
            ...$stored,
            'pages' => [
                ...$defaults['pages'],
                ...($stored['pages'] ?? []),
            ],
        ];
    }

    public static function update(array $data): array
    {
        $value = array_replace_recursive(self::current(), $data);

        Setting::updateOrCreate(
            ['group' => self::GROUP, 'key' => self::KEY],
            ['value' => $value, 'type' => 'json']
        );

        return $value;
    }
}
