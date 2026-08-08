<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsPostResource;
use App\Support\News\Models\NewsPost;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NewsPostController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $posts = NewsPost::query()
            ->where('status', 'published')
            ->orderByDesc('published_at')
            ->paginate($request->integer('per_page', 10));

        return NewsPostResource::collection($posts);
    }

    public function show(Request $request, string $slug): NewsPostResource
    {
        $post = NewsPost::query()
            ->whereSlug($slug, app()->getLocale())
            ->where('status', 'published')
            ->with('seoMeta')
            ->firstOrFail();

        return new NewsPostResource($post);
    }
}
