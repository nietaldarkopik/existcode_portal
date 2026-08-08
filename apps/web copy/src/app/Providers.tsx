import { useEffect, type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ensureCsrfCookie } from "@existcode/api-client";
import { BrowserRouter } from "react-router-dom";
import { apiClient } from "./apiClient";
import { queryClient } from "./queryClient";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureCsrfCookie(apiClient);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
