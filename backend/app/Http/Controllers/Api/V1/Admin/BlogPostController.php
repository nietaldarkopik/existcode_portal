<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Blog\BlogPostRequest;
use App\Http\Resources\Admin\AdminBlogPostResource;
use App\Support\Blog\Models\BlogPost;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;

class BlogPostController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $posts = BlogPost::with('category')->latest('created_at')->paginate(20);

        return AdminBlogPostResource::collection($posts);
    }

    public function store(BlogPostRequest $request): AdminBlogPostResource
    {
        $data = $request->validated();
        $seo = Arr::pull($data, 'seo');

        $post = BlogPost::create($data);
        $this->syncSeoMeta($post, $seo);

        return new AdminBlogPostResource($post->fresh(['category', 'seoMeta']));
    }

    public function show(BlogPost $blog_post): AdminBlogPostResource
    {
        return new AdminBlogPostResource($blog_post->load(['category', 'seoMeta']));
    }

    public function update(BlogPostRequest $request, BlogPost $blog_post): AdminBlogPostResource
    {
        $data = $request->validated();
        $seo = Arr::pull($data, 'seo');

        $blog_post->update($data);
        $this->syncSeoMeta($blog_post, $seo);

        return new AdminBlogPostResource($blog_post->fresh(['category', 'seoMeta']));
    }

    public function destroy(BlogPost $blog_post): Response
    {
        $blog_post->delete();

        return response()->noContent();
    }
}
