<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Support\Settings\SeoSettings;
use Illuminate\Http\JsonResponse;

class SeoSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(['data' => SeoSettings::current()]);
    }
}
