import type { ReactNode } from "react";
import { createLocaleContext, type Locale } from "@existcode/i18n";
import type { WebDictionary } from "./dictionary";
import { id } from "./dictionaries/id";
import { en } from "./dictionaries/en";
import { path, type RouteKey } from "./routes";

const dictionaries: Record<Locale, WebDictionary> = { id, en };

const { LocaleProvider: BaseLocaleProvider, useLocale: useLocaleContext } = createLocaleContext<WebDictionary>();

export function LocaleFrame({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <BaseLocaleProvider locale={locale} dictionary={dictionaries[locale]}>
      {children}
    </BaseLocaleProvider>
  );
}

export function useLocale() {
  const { locale, t } = useLocaleContext();

  return {
    locale,
    t,
    path: (key: RouteKey, params?: Record<string, string>) => path(key, locale, params)
  };
}
