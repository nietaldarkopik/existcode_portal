import type { AxiosInstance } from "axios";
import type {
  AdminBlogCategory,
  AdminBlogCategoryPayload,
  AdminBlogPost,
  AdminBlogPostPayload,
  ApiCollection,
  ApiResponse
} from "@existcode/types";

export function getAdminBlogCategories(client: AxiosInstance, params?: { page?: number }) {
  return client.get<ApiCollection<AdminBlogCategory>>("/admin/blog-categories", { params }).then((res) => res.data);
}

export function createAdminBlogCategory(client: AxiosInstance, payload: AdminBlogCategoryPayload) {
  return client.post<ApiResponse<AdminBlogCategory>>("/admin/blog-categories", payload).then((res) => res.data);
}

export function updateAdminBlogCategory(
  client: AxiosInstance,
  id: number,
  payload: Partial<AdminBlogCategoryPayload>
) {
  return client.put<ApiResponse<AdminBlogCategory>>(`/admin/blog-categories/${id}`, payload).then((res) => res.data);
}

export function deleteAdminBlogCategory(client: AxiosInstance, id: number) {
  return client.delete<void>(`/admin/blog-categories/${id}`).then((res) => res.data);
}

export function getAdminBlogPosts(client: AxiosInstance, params?: { page?: number }) {
  return client.get<ApiCollection<AdminBlogPost>>("/admin/blog-posts", { params }).then((res) => res.data);
}

export function getAdminBlogPost(client: AxiosInstance, id: number) {
  return client.get<ApiResponse<AdminBlogPost>>(`/admin/blog-posts/${id}`).then((res) => res.data);
}

export function createAdminBlogPost(client: AxiosInstance, payload: AdminBlogPostPayload) {
  return client.post<ApiResponse<AdminBlogPost>>("/admin/blog-posts", payload).then((res) => res.data);
}

export function updateAdminBlogPost(client: AxiosInstance, id: number, payload: Partial<AdminBlogPostPayload>) {
  return client.put<ApiResponse<AdminBlogPost>>(`/admin/blog-posts/${id}`, payload).then((res) => res.data);
}

export function deleteAdminBlogPost(client: AxiosInstance, id: number) {
  return client.delete<void>(`/admin/blog-posts/${id}`).then((res) => res.data);
}
