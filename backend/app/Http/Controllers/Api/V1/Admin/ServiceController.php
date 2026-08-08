<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Services\ServiceRequest;
use App\Http\Resources\Admin\AdminServiceResource;
use App\Support\Services\Models\Service;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;

class ServiceController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return AdminServiceResource::collection(Service::orderBy('sort_order')->paginate(20));
    }

    public function store(ServiceRequest $request): AdminServiceResource
    {
        $data = $request->validated();
        $seo = Arr::pull($data, 'seo');

        $service = Service::create($data);
        $this->syncSeoMeta($service, $seo);

        return new AdminServiceResource($service->fresh('seoMeta'));
    }

    public function show(Service $service): AdminServiceResource
    {
        return new AdminServiceResource($service->load('seoMeta'));
    }

    public function update(ServiceRequest $request, Service $service): AdminServiceResource
    {
        $data = $request->validated();
        $seo = Arr::pull($data, 'seo');

        $service->update($data);
        $this->syncSeoMeta($service, $seo);

        return new AdminServiceResource($service->fresh('seoMeta'));
    }

    public function destroy(Service $service): Response
    {
        $service->delete();

        return response()->noContent();
    }
}
