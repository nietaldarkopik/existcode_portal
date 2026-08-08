<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PricingPlanResource;
use App\Support\Pricing\Models\PricingPlan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PricingPlanController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $plans = PricingPlan::query()
            ->where('status', 'published')
            ->with('service')
            ->orderBy('sort_order')
            ->paginate($request->integer('per_page', 12));

        return PricingPlanResource::collection($plans);
    }

    public function show(Request $request, string $slug): PricingPlanResource
    {
        $plan = PricingPlan::query()
            ->whereSlug($slug, app()->getLocale())
            ->where('status', 'published')
            ->with(['service', 'seoMeta'])
            ->firstOrFail();

        return new PricingPlanResource($plan);
    }
}
