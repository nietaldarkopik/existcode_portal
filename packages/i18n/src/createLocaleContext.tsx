import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./locale";

export interface LocaleContextValue<Dictionary> {
  locale: Locale;
  t: Dictionary;
}

// Factory so each app can bind its own Dictionary shape without this package
// needing to know what that shape is.
export function createLocaleContext<Dictionary>() {
  const Context = createContext<LocaleContextValue<Dictionary> | null>(null);

  function LocaleProvider({
    locale,
    dictionary,
    children
  }: {
    locale: Locale;
    dictionary: Dictionary;
    children: ReactNode;
  }) {
    return <Context.Provider value={{ locale, t: dictionary }}>{children}</Context.Provider>;
  }

  function useLocale(): LocaleContextValue<Dictionary> {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error("useLocale must be used within its matching LocaleProvider");
    }
    return ctx;
  }

  return { LocaleProvider, useLocale };
}
