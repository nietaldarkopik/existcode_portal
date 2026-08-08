import type { Translated } from "./translated";

export type SeoPageKey = "home" | "about" | "contact" | "services" | "pricing" | "blog" | "news";

export interface SeoPageSetting {
  title: Translated;
  description: Translated;
}

export interface SeoSetting {
  siteName: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string | null;
  defaultOgImage: string | null;
  twitterHandle: string | null;
  pages: Record<SeoPageKey, SeoPageSetting>;
}

export interface SeoSettingPayload {
  siteName?: string | undefined;
  titleTemplate?: string | undefined;
  defaultDescription?: string | undefined;
  defaultKeywords?: string | undefined;
  defaultOgImage?: string | undefined;
  twitterHandle?: string | undefined;
  pages?: Partial<Record<SeoPageKey, Partial<SeoPageSetting>>> | undefined;
}
