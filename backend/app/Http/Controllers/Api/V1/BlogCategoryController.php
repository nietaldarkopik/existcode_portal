<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogCategoryResource;
use App\Support\Blog\Models\BlogCategory;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BlogCategoryController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $categories = BlogCategory::query()->orderBy('name')->paginate(50);

        return BlogCategoryResource::collection($categories);
    }
}
