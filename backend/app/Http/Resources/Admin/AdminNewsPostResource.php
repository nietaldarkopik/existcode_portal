<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminNewsPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->getTranslations('title'),
            'slug' => $this->getTranslations('slug'),
            'excerpt' => $this->getTranslations('excerpt'),
            'body' => $this->getTranslations('body'),
            'cover_image_url' => $this->cover_image_url,
            'accent' => $this->accent,
            'news_type' => $this->news_type,
            'status' => $this->status,
            'published_at' => $this->published_at?->toIso8601String(),
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
