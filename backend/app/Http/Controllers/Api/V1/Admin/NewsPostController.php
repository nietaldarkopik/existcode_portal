<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\News\NewsPostRequest;
use App\Http\Resources\Admin\AdminNewsPostResource;
use App\Support\News\Models\NewsPost;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;

class NewsPostController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return AdminNewsPostResource::collection(NewsPost::latest('created_at')->paginate(20));
    }

    public function store(NewsPostRequest $request): AdminNewsPostResource
    {
        $data = $request->validated();
        $seo = Arr::pull($data, 'seo');

        $post = NewsPost::create($data);
        $this->syncSeoMeta($post, $seo);

        return new AdminNewsPostResource($post->fresh('seoMeta'));
    }

    public function show(NewsPost $news_post): AdminNewsPostResource
    {
        return new AdminNewsPostResource($news_post->load('seoMeta'));
    }

    public function update(NewsPostRequest $request, NewsPost $news_post): AdminNewsPostResource
    {
        $data = $request->validated();
        $seo = Arr::pull($data, 'seo');

        $news_post->update($data);
        $this->syncSeoMeta($news_post, $seo);

        return new AdminNewsPostResource($news_post->fresh('seoMeta'));
    }

    public function destroy(NewsPost $news_post): Response
    {
        $news_post->delete();

        return response()->noContent();
    }
}
