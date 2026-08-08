import type { AxiosInstance } from "axios";
import type { ApiResponse, SeoSetting, SeoSettingPayload } from "@existcode/types";

export function getSeoSetting(client: AxiosInstance) {
  return client.get<ApiResponse<SeoSetting>>("/settings/seo").then((res) => res.data);
}

export function getAdminSeoSetting(client: AxiosInstance) {
  return client.get<ApiResponse<SeoSetting>>("/admin/settings/seo").then((res) => res.data);
}

export function updateAdminSeoSetting(client: AxiosInstance, payload: SeoSettingPayload) {
  return client.put<ApiResponse<SeoSetting>>("/admin/settings/seo", payload).then((res) => res.data);
}
