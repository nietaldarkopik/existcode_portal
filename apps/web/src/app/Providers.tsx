import { type ReactNode } from "react";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getThemeSetting } from "@existcode/api-client";
import { ThemeProvider } from "@existcode/ui";
import { BrowserRouter } from "react-router-dom";
import { apiClient } from "./apiClient";
import { queryClient } from "./queryClient";

function SiteThemeProvider({ children }: { children: ReactNode }) {
  // Undefined while loading — ThemeProvider falls back to its own defaults
  // until the admin-configured setting resolves.
  const { data } = useQuery({
    queryKey: ["theme-setting"],
    queryFn: () => getThemeSetting(apiClient).then((res) => res.data),
    staleTime: 5 * 60 * 1000
  });

  return <ThemeProvider serverSetting={data}>{children}</ThemeProvider>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteThemeProvider>{children}</SiteThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
