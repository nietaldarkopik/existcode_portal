import { createApiClient } from "@existcode/api-client";
import { getAuthToken } from "./authToken";

export const apiClient = createApiClient({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1"
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
