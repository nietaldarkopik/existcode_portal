<?php

namespace App\Http\Requests\Admin\Settings;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSeoSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'siteName' => ['sometimes', 'string', 'max:255'],
            'titleTemplate' => ['sometimes', 'string', 'max:255'],
            'defaultDescription' => ['sometimes', 'string', 'max:500'],
            'defaultKeywords' => ['sometimes', 'nullable', 'string', 'max:255'],
            'defaultOgImage' => ['sometimes', 'nullable', 'string', 'max:2048'],
            'twitterHandle' => ['sometimes', 'nullable', 'string', 'max:100'],
            'pages' => ['sometimes', 'array'],
            'pages.*.title.id' => ['nullable', 'string', 'max:255'],
            'pages.*.title.en' => ['nullable', 'string', 'max:255'],
            'pages.*.description.id' => ['nullable', 'string', 'max:500'],
            'pages.*.description.en' => ['nullable', 'string', 'max:500'],
        ];
    }
}
