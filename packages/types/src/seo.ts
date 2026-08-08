import type { Translated } from "./translated";

// Locale-resolved SEO block returned on public entity detail responses —
// falls back to the entity's own name/summary/cover image server-side when
// no seo_meta override exists (see backend's ServiceResource et al.).
export interface SeoBlock {
  title: string;
  description: string;
  keywords: string | null;
  og_image: string | null;
}

// Admin-scoped responses return the raw {id, en} override (which may be
// entirely empty if no seo_meta row has been created yet).
export interface AdminSeoBlock {
  title: Translated;
  description: Translated;
  keywords: string | null;
  og_image: string | null;
}

export interface AdminSeoPayload {
  title?: Partial<Translated> | undefined;
  description?: Partial<Translated> | undefined;
  keywords?: string | undefined;
  og_image?: string | undefined;
}
