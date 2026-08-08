<?php

namespace App\Http\Requests\Admin\News;

use App\Rules\UniqueTranslatedSlug;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NewsPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->isMethod('put') || $this->isMethod('patch');
        $postId = $this->route('news_post')?->id;
        $required = $isUpdate ? 'sometimes' : 'required';

        return [
            'title' => [$required, 'array'],
            'title.id' => [$required, 'string', 'max:255'],
            'title.en' => [$required, 'string', 'max:255'],
            'slug' => [$required, 'array'],
            'slug.id' => [$required, 'string', 'max:255', new UniqueTranslatedSlug('news_posts', 'id', $postId)],
            'slug.en' => [$required, 'string', 'max:255', new UniqueTranslatedSlug('news_posts', 'en', $postId)],
            'excerpt' => [$required, 'array'],
            'excerpt.id' => [$required, 'string', 'max:500'],
            'excerpt.en' => [$required, 'string', 'max:500'],
            'body' => [$required, 'array'],
            'body.id' => [$required, 'string'],
            'body.en' => [$required, 'string'],
            'cover_image_url' => ['nullable', 'string', 'max:2048'],
            'accent' => ['nullable', Rule::in(['sky', 'violet', 'amber', 'emerald', 'rose', 'neutral'])],
            'news_type' => [Rule::in(['announcement', 'milestone', 'press', 'product_update'])],
            'status' => [Rule::in(['draft', 'published'])],
            'published_at' => ['nullable', 'date'],

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
