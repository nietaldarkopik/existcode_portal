import type { AxiosInstance } from "axios";
import type { ApiCollection, ApiResponse, PricingPlan } from "@existcode/types";

export function getPricingPlans(client: AxiosInstance, params?: { per_page?: number }) {
  return client.get<ApiCollection<PricingPlan>>("/pricing-plans", { params }).then((res) => res.data);
}

export function getPricingPlanBySlug(client: AxiosInstance, slug: string) {
  return client.get<ApiResponse<PricingPlan>>(`/pricing-plans/${encodeURIComponent(slug)}`).then((res) => res.data);
}
