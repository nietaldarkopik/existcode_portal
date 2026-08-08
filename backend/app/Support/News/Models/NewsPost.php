<?php

namespace App\Support\News\Models;

use App\Support\Seo\Models\SeoMeta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Spatie\Translatable\HasTranslations;

class NewsPost extends Model
{
    use HasTranslations;

    public array $translatable = ['title', 'slug', 'excerpt', 'body'];

    protected $fillable = [
        'title', 'slug', 'excerpt', 'body', 'cover_image_url', 'accent',
        'news_type', 'status', 'published_at',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function scopeWhereSlug($query, string $slug, string $locale)
    {
        return $query->where("slug->{$locale}", $slug);
    }

    public function seoMeta(): MorphOne
    {
        return $this->morphOne(SeoMeta::class, 'seoable');
    }
}
