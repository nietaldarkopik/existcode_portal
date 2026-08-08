import type { AxiosInstance } from "axios";
import type { ApiCollection, ApiResponse, Service } from "@existcode/types";

export function getServices(client: AxiosInstance, params?: { per_page?: number }) {
  return client.get<ApiCollection<Service>>("/services", { params }).then((res) => res.data);
}

export function getServiceBySlug(client: AxiosInstance, slug: string) {
  return client.get<ApiResponse<Service>>(`/services/${encodeURIComponent(slug)}`).then((res) => res.data);
}
