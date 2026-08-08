<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;

abstract class Controller
{
    /**
     * Persist an optional nested `seo` payload (title/description/keywords/
     * og_image) onto a model's seoMeta() morphOne relation. No-op when the
     * request didn't include a `seo` block at all.
     */
    protected function syncSeoMeta(Model $model, ?array $seo): void
    {
        if ($seo === null) {
            return;
        }

        $model->seoMeta()->updateOrCreate([], [
            'title' => $seo['title'] ?? null,
            'description' => $seo['description'] ?? null,
            'keywords' => $seo['keywords'] ?? null,
            'og_image' => $seo['og_image'] ?? null,
        ]);
    }
}
