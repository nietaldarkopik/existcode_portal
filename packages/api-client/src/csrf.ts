import type { AxiosInstance } from "axios";

export function ensureCsrfCookie(client: AxiosInstance): Promise<void> {
  const baseURL = (client.defaults.baseURL ?? "").replace(/\/api\/v1\/?$/, "");
  return client.get("/sanctum/csrf-cookie", { baseURL });
}
