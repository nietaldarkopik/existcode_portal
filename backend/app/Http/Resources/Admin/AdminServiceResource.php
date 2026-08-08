<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->getTranslations('name'),
            'slug' => $this->getTranslations('slug'),
            'summary' => $this->getTranslations('summary'),
            'description' => $this->getTranslations('description'),
            'category' => $this->getTranslations('category'),
            'features' => $this->getTranslations('features'),
            'icon_key' => $this->icon_key,
            'accent' => $this->accent,
            'is_featured' => $this->is_featured,
            'sort_order' => $this->sort_order,
            'status' => $this->status,
            'seo' => $this->whenLoaded('seoMeta', fn () => $this->seoMeta ? [
                'title' => $this->seoMeta->getTranslations('title'),
                'description' => $this->seoMeta->getTranslations('description'),
                'keywords' => $this->seoMeta->keywords,
                'og_image' => $this->seoMeta->og_image,
            ] : null),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
