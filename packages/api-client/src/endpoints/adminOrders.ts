import type { AxiosInstance } from "axios";
import type { ApiCollection, ApiResponse, Order, UpdateOrderStatusPayload } from "@existcode/types";

export function getAdminOrders(client: AxiosInstance, params?: { page?: number }) {
  return client.get<ApiCollection<Order>>("/admin/orders", { params }).then((res) => res.data);
}

export function getAdminOrder(client: AxiosInstance, id: number) {
  return client.get<ApiResponse<Order>>(`/admin/orders/${id}`).then((res) => res.data);
}

export function updateAdminOrderStatus(client: AxiosInstance, id: number, payload: UpdateOrderStatusPayload) {
  return client.put<ApiResponse<Order>>(`/admin/orders/${id}`, payload).then((res) => res.data);
}
