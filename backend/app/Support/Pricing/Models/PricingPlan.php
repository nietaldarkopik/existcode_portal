<?php

namespace App\Support\Pricing\Models;

use App\Support\Ordering\Models\OrderItem;
use App\Support\Seo\Models\SeoMeta;
use App\Support\Services\Models\Service;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Spatie\Translatable\HasTranslations;

class PricingPlan extends Model
{
    use HasTranslations;

    public array $translatable = ['name', 'slug', 'tagline', 'features'];

    protected $fillable = [
        'service_id', 'name', 'slug', 'tagline', 'price_amount', 'price_currency',
        'billing_period', 'features', 'is_popular', 'is_custom', 'sort_order', 'status',
    ];

    protected function casts(): array
    {
        return [
            'is_popular' => 'boolean',
            'is_custom' => 'boolean',
            'price_amount' => 'decimal:2',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
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
