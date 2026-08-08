import { createApiClient } from "@existcode/api-client";

export const apiClient = createApiClient({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1"
});
