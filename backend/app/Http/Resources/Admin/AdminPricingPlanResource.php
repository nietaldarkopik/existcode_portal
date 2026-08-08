<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminPricingPlanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'service_id' => $this->service_id,
            'name' => $this->getTranslations('name'),
            'slug' => $this->getTranslations('slug'),
            'tagline' => $this->getTranslations('tagline'),
            'features' => $this->getTranslations('features'),
            'price_amount' => $this->price_amount,
            'price_currency' => $this->price_currency,
            'billing_period' => $this->billing_period,
            'is_popular' => $this->is_popular,
            'is_custom' => $this->is_custom,
            'sort_order' => $this->sort_order,
            'status' => $this->status,
            'service' => $this->whenLoaded('service', fn () => $this->service ? [
                'id' => $this->service->id,
                'name' => $this->service->getTranslations('name'),
                'slug' => $this->service->getTranslations('slug'),
            ] : null),
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
