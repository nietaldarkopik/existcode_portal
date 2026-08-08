import { useQuery } from "@tanstack/react-query";
import { getNewsPostBySlug, getNewsPosts } from "@existcode/api-client";
import { apiClient } from "../../../app/apiClient";

export function useNewsPosts(params?: { page?: number }) {
  return useQuery({
    queryKey: ["news-posts", params],
    queryFn: () => getNewsPosts(apiClient, { ...params, per_page: 10 })
  });
}

export function useNewsPost(slug: string | undefined) {
  return useQuery({
    queryKey: ["news-post", slug],
    queryFn: () => getNewsPostBySlug(apiClient, slug as string),
    enabled: Boolean(slug)
  });
}
