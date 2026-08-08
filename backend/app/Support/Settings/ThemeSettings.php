<?php

namespace App\Support\Settings;

use App\Support\Settings\Models\Setting;

class ThemeSettings
{
    private const GROUP = 'theme';

    private const KEY = 'site';

    public static function defaults(): array
    {
        return [
            'mode' => 'dark-slate',
            'accent' => 'teal',
            'layout' => 'showcase',
            'locked' => false,
        ];
    }

    public static function current(): array
    {
        $setting = Setting::query()->where('group', self::GROUP)->where('key', self::KEY)->first();

        return array_merge(self::defaults(), $setting?->value ?? []);
    }

    public static function update(array $data): array
    {
        $value = array_merge(self::current(), $data);

        Setting::updateOrCreate(
            ['group' => self::GROUP, 'key' => self::KEY],
            ['value' => $value, 'type' => 'json']
        );

        return $value;
    }
}
