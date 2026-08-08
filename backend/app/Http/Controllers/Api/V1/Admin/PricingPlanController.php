<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Pricing\PricingPlanRequest;
use App\Http\Resources\Admin\AdminPricingPlanResource;
use App\Support\Pricing\Models\PricingPlan;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;

class PricingPlanController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $plans = PricingPlan::with('service')->orderBy('sort_order')->paginate(20);

        return AdminPricingPlanResource::collection($plans);
    }

    public function store(PricingPlanRequest $request): AdminPricingPlanResource
    {
        $data = $request->validated();
        $seo = Arr::pull($data, 'seo');

        $plan = PricingPlan::create($data);
        $this->syncSeoMeta($plan, $seo);

        return new AdminPricingPlanResource($plan->fresh(['service', 'seoMeta']));
    }

    public function show(PricingPlan $pricing_plan): AdminPricingPlanResource
    {
        return new AdminPricingPlanResource($pricing_plan->load(['service', 'seoMeta']));
    }

    public function update(PricingPlanRequest $request, PricingPlan $pricing_plan): AdminPricingPlanResource
    {
        $data = $request->validated();
        $seo = Arr::pull($data, 'seo');

        $pricing_plan->update($data);
        $this->syncSeoMeta($pricing_plan, $seo);

        return new AdminPricingPlanResource($pricing_plan->fresh(['service', 'seoMeta']));
    }

    public function destroy(PricingPlan $pricing_plan): Response
    {
        $pricing_plan->delete();

        return response()->noContent();
    }
}
