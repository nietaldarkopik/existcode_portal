<?php

namespace App\Support\Page\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentBlock extends Model
{
    protected $fillable = ['page_id', 'type', 'order', 'payload', 'is_active'];

    protected function casts(): array
    {
        return [
            'payload' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }
}
