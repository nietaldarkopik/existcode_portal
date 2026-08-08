import { useQuery } from "@tanstack/react-query";
import { getServiceBySlug, getServices } from "@existcode/api-client";
import { apiClient } from "../../../app/apiClient";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(apiClient, { per_page: 20 })
  });
}

export function useService(slug: string | undefined) {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: () => getServiceBySlug(apiClient, slug as string),
    enabled: Boolean(slug)
  });
}
