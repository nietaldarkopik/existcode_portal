<?php

namespace App\Support\Blog\Models;

use App\Support\Seo\Models\SeoMeta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Spatie\Translatable\HasTranslations;

class BlogPost extends Model
{
    use HasTranslations;

    public array $translatable = ['title', 'slug', 'excerpt', 'body'];

    protected $fillable = [
        'blog_category_id', 'title', 'slug', 'excerpt', 'body', 'cover_image_url',
        'accent', 'author_name', 'reading_minutes', 'status', 'published_at',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
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
