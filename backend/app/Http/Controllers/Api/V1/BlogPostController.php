<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Support\Blog\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BlogPostController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $locale = app()->getLocale();

        $posts = BlogPost::query()
            ->where('status', 'published')
            ->with('category')
            ->when($request->filled('category'), fn ($query) => $query->whereHas(
                'category',
                fn ($q) => $q->where("slug->{$locale}", $request->string('category'))
            ))
            ->orderByDesc('published_at')
            ->paginate($request->integer('per_page', 9));

        return BlogPostResource::collection($posts);
    }

    public function show(Request $request, string $slug): BlogPostResource
    {
        $post = BlogPost::query()
            ->whereSlug($slug, app()->getLocale())
            ->where('status', 'published')
            ->with(['category', 'seoMeta'])
            ->firstOrFail();

        return new BlogPostResource($post);
    }
}
