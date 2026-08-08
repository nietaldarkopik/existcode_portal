import { createApiClient } from "@existcode/api-client";
import { isLocale } from "@existcode/i18n";

export const apiClient = createApiClient({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1"
});

// The URL's first path segment is always the locale (/id/... or /en/...), so
// every request can pick it up here instead of every call site needing to
// pass it through explicitly.
apiClient.interceptors.request.use((config) => {
  const segment = window.location.pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : "id";

  config.params = { ...config.params, locale };

  return config;
});
