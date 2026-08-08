import type { AxiosInstance } from "axios";
import type { AdminNewsPost, AdminNewsPostPayload, ApiCollection, ApiResponse } from "@existcode/types";

export function getAdminNewsPosts(client: AxiosInstance, params?: { page?: number }) {
  return client.get<ApiCollection<AdminNewsPost>>("/admin/news-posts", { params }).then((res) => res.data);
}

export function getAdminNewsPost(client: AxiosInstance, id: number) {
  return client.get<ApiResponse<AdminNewsPost>>(`/admin/news-posts/${id}`).then((res) => res.data);
}

export function createAdminNewsPost(client: AxiosInstance, payload: AdminNewsPostPayload) {
  return client.post<ApiResponse<AdminNewsPost>>("/admin/news-posts", payload).then((res) => res.data);
}

export function updateAdminNewsPost(client: AxiosInstance, id: number, payload: Partial<AdminNewsPostPayload>) {
  return client.put<ApiResponse<AdminNewsPost>>(`/admin/news-posts/${id}`, payload).then((res) => res.data);
}

export function deleteAdminNewsPost(client: AxiosInstance, id: number) {
  return client.delete<void>(`/admin/news-posts/${id}`).then((res) => res.data);
}
