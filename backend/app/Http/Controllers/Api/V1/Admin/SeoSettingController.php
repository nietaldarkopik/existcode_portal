<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\UpdateSeoSettingRequest;
use App\Support\Settings\SeoSettings;
use Illuminate\Http\JsonResponse;

class SeoSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => SeoSettings::current()]);
    }

    public function update(UpdateSeoSettingRequest $request): JsonResponse
    {
        return response()->json(['data' => SeoSettings::update($request->validated())]);
    }
}
