<?php

namespace App\Http\Requests\Admin\Pricing;

use App\Rules\UniqueTranslatedSlug;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PricingPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->isMethod('put') || $this->isMethod('patch');
        $planId = $this->route('pricing_plan')?->id;
        $required = $isUpdate ? 'sometimes' : 'required';

        return [
            'service_id' => ['nullable', 'integer', 'exists:services,id'],
            'name' => [$required, 'array'],
            'name.id' => [$required, 'string', 'max:255'],
            'name.en' => [$required, 'string', 'max:255'],
            'slug' => [$required, 'array'],
            'slug.id' => [$required, 'string', 'max:255', new UniqueTranslatedSlug('pricing_plans', 'id', $planId)],
            'slug.en' => [$required, 'string', 'max:255', new UniqueTranslatedSlug('pricing_plans', 'en', $planId)],
            'tagline' => ['nullable', 'array'],
            'tagline.id' => ['nullable', 'string', 'max:255'],
            'tagline.en' => ['nullable', 'string', 'max:255'],
            'price_amount' => ['nullable', 'numeric', 'min:0'],
            'price_currency' => ['string', 'size:3'],
            'billing_period' => [$required, Rule::in(['one_time', 'monthly', 'yearly'])],
            'features' => ['nullable', 'array'],
            'features.id' => ['nullable', 'array'],
            'features.id.*' => ['string'],
            'features.en' => ['nullable', 'array'],
            'features.en.*' => ['string'],
            'is_popular' => ['boolean'],
            'is_custom' => ['boolean'],
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
