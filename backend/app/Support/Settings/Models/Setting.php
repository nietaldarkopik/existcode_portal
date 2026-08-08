<?php

namespace App\Support\Settings\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['group', 'key', 'value', 'type'];

    protected function casts(): array
    {
        return [
            'value' => 'array',
        ];
    }
}
