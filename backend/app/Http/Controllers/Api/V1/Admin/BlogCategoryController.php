<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Blog\BlogCategoryRequest;
use App\Http\Resources\Admin\AdminBlogCategoryResource;
use App\Support\Blog\Models\BlogCategory;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class BlogCategoryController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return AdminBlogCategoryResource::collection(BlogCategory::orderBy('id')->paginate(50));
    }

    public function store(BlogCategoryRequest $request): AdminBlogCategoryResource
    {
        $category = BlogCategory::create($request->validated());

        return new AdminBlogCategoryResource($category->fresh());
    }

    public function show(BlogCategory $blog_category): AdminBlogCategoryResource
    {
        return new AdminBlogCategoryResource($blog_category);
    }

    public function update(BlogCategoryRequest $request, BlogCategory $blog_category): AdminBlogCategoryResource
    {
        $blog_category->update($request->validated());

        return new AdminBlogCategoryResource($blog_category->fresh());
    }

    public function destroy(BlogCategory $blog_category): Response
    {
        $blog_category->delete();

        return response()->noContent();
    }
}
