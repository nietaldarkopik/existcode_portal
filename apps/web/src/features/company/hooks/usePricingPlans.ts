import { useQuery } from "@tanstack/react-query";
import { getPricingPlanBySlug, getPricingPlans } from "@existcode/api-client";
import { apiClient } from "../../../app/apiClient";

export function usePricingPlans() {
  return useQuery({
    queryKey: ["pricing-plans"],
    queryFn: () => getPricingPlans(apiClient, { per_page: 20 })
  });
}

export function usePricingPlan(slug: string | undefined) {
  return useQuery({
    queryKey: ["pricing-plan", slug],
    queryFn: () => getPricingPlanBySlug(apiClient, slug as string),
    enabled: Boolean(slug)
  });
}
