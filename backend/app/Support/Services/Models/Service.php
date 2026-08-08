<?php

namespace App\Support\Services\Models;

use App\Support\Pricing\Models\PricingPlan;
use App\Support\Seo\Models\SeoMeta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Spatie\Translatable\HasTranslations;

class Service extends Model
{
    use HasTranslations;

    public array $translatable = ['name', 'slug', 'summary', 'description', 'category', 'features'];

    protected $fillable = [
        'name', 'slug', 'summary', 'description', 'category', 'icon_key',
        'accent', 'features', 'is_featured', 'sort_order', 'status',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
        ];
    }

    public function pricingPlans(): HasMany
    {
        return $this->hasMany(PricingPlan::class);
    }

    public function seoMeta(): MorphOne
    {
        return $this->morphOne(SeoMeta::class, 'seoable');
    }

    public function scopeWhereSlug($query, string $slug, string $locale)
    {
        return $query->where("slug->{$locale}", $slug);
    }
}
