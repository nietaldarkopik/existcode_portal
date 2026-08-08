import { useQuery } from "@tanstack/react-query";
import { getSeoSetting } from "@existcode/api-client";
import type { SeoPageKey } from "@existcode/types";
import { apiClient } from "../../app/apiClient";
import { useLocale } from "../../i18n";

export function useSiteSeo() {
  return useQuery({
    queryKey: ["seo-setting"],
    queryFn: () => getSeoSetting(apiClient).then((res) => res.data),
    staleTime: 5 * 60 * 1000
  });
}

// Resolves a static/list page's admin-configured title+description for the
// current locale, falling back to the page's own translated heading copy
// when the admin hasn't filled that page in yet (or the setting is still
// loading). <Seo> takes care of applying the site-wide title template.
export function useStaticPageSeo(pageKey: SeoPageKey, fallbackTitle: string, fallbackDescription: string) {
  const { locale } = useLocale();
  const { data } = useSiteSeo();
  const page = data?.pages[pageKey];

  return {
    title: page?.title[locale] || fallbackTitle,
    description: page?.description[locale] || fallbackDescription
  };
}
