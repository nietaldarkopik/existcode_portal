import type { AxiosInstance } from "axios";
import type { ApiCollection, ApiResponse, NewsPost } from "@existcode/types";

export function getNewsPosts(client: AxiosInstance, params?: { page?: number; per_page?: number }) {
  return client.get<ApiCollection<NewsPost>>("/news-posts", { params }).then((res) => res.data);
}

export function getNewsPostBySlug(client: AxiosInstance, slug: string) {
  return client.get<ApiResponse<NewsPost>>(`/news-posts/${encodeURIComponent(slug)}`).then((res) => res.data);
}
