<?php

namespace App\Http\Requests\Admin\Settings;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateThemeSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'mode' => ['sometimes', Rule::in(['dark-slate', 'light-alpine', 'sapphire-navy', 'steel-gray'])],
            'accent' => ['sometimes', Rule::in(['teal', 'blue', 'emerald', 'amber', 'violet', 'crimson', 'cyan'])],
            'layout' => ['sometimes', Rule::in(['showcase', 'sidebar', 'bento', 'compact'])],
            'locked' => ['sometimes', 'boolean'],
        ];
    }
}
