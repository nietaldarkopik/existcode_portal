import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, getOrderByNumber } from "@existcode/api-client";
import { apiClient } from "../../../app/apiClient";

export function useCreateOrder() {
  return useMutation({
    mutationFn: (payload: Parameters<typeof createOrder>[1]) => createOrder(apiClient, payload)
  });
}

export function useOrder(orderNumber: string | undefined) {
  return useQuery({
    queryKey: ["order", orderNumber],
    queryFn: () => getOrderByNumber(apiClient, orderNumber as string),
    enabled: Boolean(orderNumber)
  });
}
