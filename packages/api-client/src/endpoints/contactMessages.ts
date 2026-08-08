import type { AxiosInstance } from "axios";
import type { ApiResponse, ContactMessage, CreateContactMessagePayload } from "@existcode/types";

export function createContactMessage(client: AxiosInstance, payload: CreateContactMessagePayload) {
  return client.post<ApiResponse<ContactMessage>>("/contact-messages", payload).then((res) => res.data);
}
