import type { AxiosInstance } from "axios";
import type { ApiCollection, ApiResponse, BlogCategory, BlogPost } from "@existcode/types";

export function getBlogCategories(client: AxiosInstance) {
  return client.get<ApiCollection<BlogCategory>>("/blog-categories").then((res) => res.data);
}

export function getBlogPosts(client: AxiosInstance, params?: { category?: string; page?: number; per_page?: number }) {
  return client.get<ApiCollection<BlogPost>>("/blog-posts", { params }).then((res) => res.data);
}

export function getBlogPostBySlug(client: AxiosInstance, slug: string) {
  return client.get<ApiResponse<BlogPost>>(`/blog-posts/${encodeURIComponent(slug)}`).then((res) => res.data);
}
