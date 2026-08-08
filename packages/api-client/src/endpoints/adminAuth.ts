import type { AxiosInstance } from "axios";
import type { AdminLoginPayload, AdminLoginResponse, AdminUser } from "@existcode/types";

export function adminLogin(client: AxiosInstance, payload: AdminLoginPayload) {
  return client.post<AdminLoginResponse>("/admin/login", payload).then((res) => res.data);
}

export function adminLogout(client: AxiosInstance) {
  return client.post<void>("/admin/logout").then((res) => res.data);
}

export function getAdminMe(client: AxiosInstance) {
  return client.get<AdminUser>("/admin/me").then((res) => res.data);
}
