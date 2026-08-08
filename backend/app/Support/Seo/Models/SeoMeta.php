<?php

namespace App\Support\Seo\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Translatable\HasTranslations;

class SeoMeta extends Model
{
    use HasTranslations;

    protected $table = 'seo_meta';

    public array $translatable = ['title', 'description'];

    protected $fillable = ['title', 'description', 'keywords', 'og_image', 'canonical_url', 'no_index'];

    protected function casts(): array
    {
        return [
            'no_index' => 'boolean',
        ];
    }

    public function seoable(): MorphTo
    {
        return $this->morphTo();
    }
}
