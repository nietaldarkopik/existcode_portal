import { useQuery } from "@tanstack/react-query";
import { getBlogCategories, getBlogPostBySlug, getBlogPosts } from "@existcode/api-client";
import { apiClient } from "../../../app/apiClient";

export function useBlogCategories() {
  return useQuery({
    queryKey: ["blog-categories"],
    queryFn: () => getBlogCategories(apiClient)
  });
}

export function useBlogPosts(params?: { category?: string; page?: number }) {
  return useQuery({
    queryKey: ["blog-posts", params],
    queryFn: () =>
      getBlogPosts(apiClient, {
        ...(params?.category ? { category: params.category } : {}),
        ...(params?.page ? { page: params.page } : {}),
        per_page: 9
      })
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getBlogPostBySlug(apiClient, slug as string),
    enabled: Boolean(slug)
  });
}
