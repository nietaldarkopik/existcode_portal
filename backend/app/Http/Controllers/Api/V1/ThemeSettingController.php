<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Support\Settings\ThemeSettings;
use Illuminate\Http\JsonResponse;

class ThemeSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => ThemeSettings::current()]);
    }
}
