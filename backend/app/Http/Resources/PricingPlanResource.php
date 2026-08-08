<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PricingPlanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'slugs' => $this->getTranslations('slug'),
            'tagline' => $this->tagline,
            'price_amount' => $this->price_amount,
            'price_currency' => $this->price_currency,
            'billing_period' => $this->billing_period,
            'features' => $this->features ?? [],
            'is_popular' => $this->is_popular,
            'is_custom' => $this->is_custom,
            'service' => $this->whenLoaded('service', fn () => $this->service ? [
                'id' => $this->service->id,
                'name' => $this->service->name,
                'slug' => $this->service->slug,
                'slugs' => $this->service->getTranslations('slug'),
            ] : null),
            // See ServiceResource for why this uses when()+relationLoaded()
            // instead of whenLoaded() (which would skip the fallback below).
            'seo' => $this->when($this->relationLoaded('seoMeta'), fn () => [
                'title' => $this->seoMeta?->title ?: $this->name,
                'description' => $this->seoMeta?->description ?: ($this->tagline ?: $this->name),
                'keywords' => $this->seoMeta?->keywords,
                'og_image' => $this->seoMeta?->og_image,
            ]),
        ];
    }
}
