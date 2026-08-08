<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'slugs' => $this->getTranslations('slug'),
            'excerpt' => $this->excerpt,
            'body' => $this->body,
            'cover_image_url' => $this->cover_image_url,
            'accent' => $this->accent,
            'author_name' => $this->author_name,
            'reading_minutes' => $this->reading_minutes,
            'published_at' => $this->published_at?->toIso8601String(),
            'category' => $this->whenLoaded('category', fn () => $this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
                'slugs' => $this->category->getTranslations('slug'),
            ] : null),
            // See ServiceResource for why this uses when()+relationLoaded()
            // instead of whenLoaded() (which would skip the fallback below).
            'seo' => $this->when($this->relationLoaded('seoMeta'), fn () => [
                'title' => $this->seoMeta?->title ?: $this->title,
                'description' => $this->seoMeta?->description ?: $this->excerpt,
                'keywords' => $this->seoMeta?->keywords,
                'og_image' => $this->seoMeta?->og_image ?: $this->cover_image_url,
            ]),
        ];
    }
}
