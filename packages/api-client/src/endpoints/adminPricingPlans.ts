import type { AxiosInstance } from "axios";
import type { AdminPricingPlan, AdminPricingPlanPayload, ApiCollection, ApiResponse } from "@existcode/types";

export function getAdminPricingPlans(client: AxiosInstance, params?: { page?: number }) {
  return client.get<ApiCollection<AdminPricingPlan>>("/admin/pricing-plans", { params }).then((res) => res.data);
}

export function getAdminPricingPlan(client: AxiosInstance, id: number) {
  return client.get<ApiResponse<AdminPricingPlan>>(`/admin/pricing-plans/${id}`).then((res) => res.data);
}

export function createAdminPricingPlan(client: AxiosInstance, payload: AdminPricingPlanPayload) {
  return client.post<ApiResponse<AdminPricingPlan>>("/admin/pricing-plans", payload).then((res) => res.data);
}

export function updateAdminPricingPlan(
  client: AxiosInstance,
  id: number,
  payload: Partial<AdminPricingPlanPayload>
) {
  return client.put<ApiResponse<AdminPricingPlan>>(`/admin/pricing-plans/${id}`, payload).then((res) => res.data);
}

export function deleteAdminPricingPlan(client: AxiosInstance, id: number) {
  return client.delete<void>(`/admin/pricing-plans/${id}`).then((res) => res.data);
}
