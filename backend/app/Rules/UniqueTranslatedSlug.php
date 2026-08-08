<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

// Slugs are stored as {"id": "...", "en": "..."} JSON columns now, so the
// normal Rule::unique() (which assumes a plain scalar column) can't check
// them — this checks uniqueness within one locale's slug value only.
class UniqueTranslatedSlug implements ValidationRule
{
    public function __construct(
        private readonly string $table,
        private readonly string $locale,
        private readonly ?int $ignoreId = null
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $query = DB::table($this->table)->where("slug->{$this->locale}", $value);

        if ($this->ignoreId) {
            $query->where('id', '!=', $this->ignoreId);
        }

        if ($query->exists()) {
            $fail("Slug ({$this->locale}) sudah digunakan.");
        }
    }
}
