<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\UpdateThemeSettingRequest;
use App\Support\Settings\ThemeSettings;
use Illuminate\Http\JsonResponse;

class ThemeSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => ThemeSettings::current()]);
    }

    public function update(UpdateThemeSettingRequest $request): JsonResponse
    {
        return response()->json(['data' => ThemeSettings::update($request->validated())]);
    }
}
