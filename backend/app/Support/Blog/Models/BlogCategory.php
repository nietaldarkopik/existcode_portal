<?php

namespace App\Support\Blog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Translatable\HasTranslations;

class BlogCategory extends Model
{
    use HasTranslations;

    public array $translatable = ['name', 'slug'];

    protected $fillable = ['name', 'slug'];

    public function posts(): HasMany
    {
        return $this->hasMany(BlogPost::class);
    }

    public function scopeWhereSlug($query, string $slug, string $locale)
    {
        return $query->where("slug->{$locale}", $slug);
    }
}
