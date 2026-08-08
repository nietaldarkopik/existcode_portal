<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'slugs' => $this->getTranslations('slug'),
            'summary' => $this->summary,
            'description' => $this->description,
            'category' => $this->category,
            'icon_key' => $this->icon_key,
            'accent' => $this->accent,
            'features' => $this->features ?? [],
            'is_featured' => $this->is_featured,
            // whenLoaded() short-circuits to null when the relation is loaded
            // but empty (no seo_meta row yet), which would skip the fallback
            // below — use relationLoaded()+when() instead so the fallback
            // always runs once the relation was eager-loaded.
            'seo' => $this->when($this->relationLoaded('seoMeta'), fn () => [
                'title' => $this->seoMeta?->title ?: $this->name,
                'description' => $this->seoMeta?->description ?: $this->summary,
                'keywords' => $this->seoMeta?->keywords,
                'og_image' => $this->seoMeta?->og_image,
            ]),
        ];
    }
}
