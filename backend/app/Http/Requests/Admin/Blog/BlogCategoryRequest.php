<?php

namespace App\Http\Requests\Admin\Blog;

use App\Rules\UniqueTranslatedSlug;
use Illuminate\Foundation\Http\FormRequest;

class BlogCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->isMethod('put') || $this->isMethod('patch');
        $categoryId = $this->route('blog_category')?->id;
        $required = $isUpdate ? 'sometimes' : 'required';

        return [
            'name' => [$required, 'array'],
            'name.id' => [$required, 'string', 'max:255'],
            'name.en' => [$required, 'string', 'max:255'],
            'slug' => [$required, 'array'],
            'slug.id' => [$required, 'string', 'max:255', new UniqueTranslatedSlug('blog_categories', 'id', $categoryId)],
            'slug.en' => [$required, 'string', 'max:255', new UniqueTranslatedSlug('blog_categories', 'en', $categoryId)],
        ];
    }
}
