import type { AxiosInstance } from "axios";
import type { ApiResponse, CreateOrderPayload, Order } from "@existcode/types";

export function createOrder(client: AxiosInstance, payload: CreateOrderPayload) {
  return client.post<ApiResponse<Order>>("/orders", payload).then((res) => res.data);
}

export function getOrderByNumber(client: AxiosInstance, orderNumber: string) {
  return client.get<ApiResponse<Order>>(`/orders/${encodeURIComponent(orderNumber)}`).then((res) => res.data);
}
