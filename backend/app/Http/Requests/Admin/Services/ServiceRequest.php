<?php

namespace App\Http\Requests\Admin\Services;

use App\Rules\UniqueTranslatedSlug;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->isMethod('put') || $this->isMethod('patch');
        $serviceId = $this->route('service')?->id;
        $required = $isUpdate ? 'sometimes' : 'required';

        return [
            'name' => [$required, 'array'],
            'name.id' => [$required, 'string', 'max:255'],
            'name.en' => [$required, 'string', 'max:255'],
            'slug' => [$required, 'array'],
            'slug.id' => [$required, 'string', 'max:255', new UniqueTranslatedSlug('services', 'id', $serviceId)],
            'slug.en' => [$required, 'string', 'max:255', new UniqueTranslatedSlug('services', 'en', $serviceId)],
            'summary' => [$required, 'array'],
            'summary.id' => [$required, 'string', 'max:160'],
            'summary.en' => [$required, 'string', 'max:160'],
            'description' => [$required, 'array'],
            'description.id' => [$required, 'string'],
            'description.en' => [$required, 'string'],
            'category' => [$required, 'array'],
            'category.id' => [$required, 'string', 'max:255'],
            'category.en' => [$required, 'string', 'max:255'],
            'icon_key' => ['nullable', 'string', 'max:100'],
            'accent' => [$required, Rule::in(['sky', 'violet', 'amber', 'emerald', 'rose', 'neutral'])],
            'features' => ['nullable', 'array'],
            'features.id' => ['nullable', 'array'],
            'features.id.*' => ['string'],
            'features.en' => ['nullable', 'array'],
            'features.en.*' => ['string'],
            'is_featured' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
            'status' => [Rule::in(['draft', 'published'])],

            'seo' => ['sometimes', 'array'],
            'seo.title' => ['sometimes', 'array'],
            'seo.title.id' => ['nullable', 'string', 'max:255'],
            'seo.title.en' => ['nullable', 'string', 'max:255'],
            'seo.description' => ['sometimes', 'array'],
            'seo.description.id' => ['nullable', 'string', 'max:500'],
            'seo.description.en' => ['nullable', 'string', 'max:500'],
            'seo.keywords' => ['nullable', 'string', 'max:255'],
            'seo.og_image' => ['nullable', 'string', 'max:2048'],
        ];
    }
}
