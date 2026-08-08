import type { AxiosInstance } from "axios";
import type { ApiResponse, ThemeSetting, ThemeSettingPayload } from "@existcode/types";

export function getThemeSetting(client: AxiosInstance) {
  return client.get<ApiResponse<ThemeSetting>>("/settings/theme").then((res) => res.data);
}

export function getAdminThemeSetting(client: AxiosInstance) {
  return client.get<ApiResponse<ThemeSetting>>("/admin/settings/theme").then((res) => res.data);
}

export function updateAdminThemeSetting(client: AxiosInstance, payload: ThemeSettingPayload) {
  return client.put<ApiResponse<ThemeSetting>>("/admin/settings/theme", payload).then((res) => res.data);
}
