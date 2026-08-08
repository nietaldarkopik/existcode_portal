import type { AxiosInstance } from "axios";
import type { AdminLoginPayload, AdminUser, ApiResponse } from "@existcode/types";

export function adminLogin(client: AxiosInstance, payload: AdminLoginPayload) {
  return client.post<ApiResponse<AdminUser>>("/admin/login", payload).then((res) => res.data);
}

export function adminLogout(client: AxiosInstance) {
  return client.post<void>("/admin/logout").then((res) => res.data);
}

export function getAdminMe(client: AxiosInstance) {
  return client.get<AdminUser>("/admin/me").then((res) => res.data);
}
