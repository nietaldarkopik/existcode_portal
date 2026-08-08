import type { AxiosInstance } from "axios";
import type { ApiCollection, ApiResponse, ContactMessage, UpdateContactMessageStatusPayload } from "@existcode/types";

export function getAdminContactMessages(client: AxiosInstance, params?: { page?: number }) {
  return client.get<ApiCollection<ContactMessage>>("/admin/contact-messages", { params }).then((res) => res.data);
}

export function getAdminContactMessage(client: AxiosInstance, id: number) {
  return client.get<ApiResponse<ContactMessage>>(`/admin/contact-messages/${id}`).then((res) => res.data);
}

export function updateAdminContactMessageStatus(
  client: AxiosInstance,
  id: number,
  payload: UpdateContactMessageStatusPayload
) {
  return client.put<ApiResponse<ContactMessage>>(`/admin/contact-messages/${id}`, payload).then((res) => res.data);
}
