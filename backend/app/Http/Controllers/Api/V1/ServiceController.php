<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Support\Services\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ServiceController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $services = Service::query()
            ->where('status', 'published')
            ->orderBy('sort_order')
            ->paginate($request->integer('per_page', 12));

        return ServiceResource::collection($services);
    }

    public function show(Request $request, string $slug): ServiceResource
    {
        $service = Service::query()
            ->whereSlug($slug, app()->getLocale())
            ->where('status', 'published')
            ->with('seoMeta')
            ->firstOrFail();

        return new ServiceResource($service);
    }
}
