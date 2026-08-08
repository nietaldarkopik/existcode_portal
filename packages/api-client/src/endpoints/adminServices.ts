import type { AxiosInstance } from "axios";
import type { AdminService, AdminServicePayload, ApiCollection, ApiResponse } from "@existcode/types";

export function getAdminServices(client: AxiosInstance, params?: { page?: number }) {
  return client.get<ApiCollection<AdminService>>("/admin/services", { params }).then((res) => res.data);
}

export function getAdminService(client: AxiosInstance, id: number) {
  return client.get<ApiResponse<AdminService>>(`/admin/services/${id}`).then((res) => res.data);
}

export function createAdminService(client: AxiosInstance, payload: AdminServicePayload) {
  return client.post<ApiResponse<AdminService>>("/admin/services", payload).then((res) => res.data);
}

export function updateAdminService(client: AxiosInstance, id: number, payload: Partial<AdminServicePayload>) {
  return client.put<ApiResponse<AdminService>>(`/admin/services/${id}`, payload).then((res) => res.data);
}

export function deleteAdminService(client: AxiosInstance, id: number) {
  return client.delete<void>(`/admin/services/${id}`).then((res) => res.data);
}
