import type { AdminSeoBlock, AdminSeoPayload, SeoBlock } from "./seo";
import type { Translated, TranslatedList } from "./translated";

export type ServiceAccent = "sky" | "violet" | "amber" | "emerald" | "rose" | "neutral";
export type ContentStatus = "draft" | "published";

export interface Service {
  id: number;
  name: string;
  slug: string;
  // All-locale slug map, so the UI can deep-link to this entity when the
  // visitor switches language.
  slugs?: Record<string, string>;
  summary: string;
  description: string;
  category: string;
  icon_key: string | null;
  accent: ServiceAccent;
  features: string[];
  is_featured: boolean;
  // Only present on detail (show) responses, not list responses.
  seo?: SeoBlock;
  // Only present on admin-scoped responses.
  sort_order?: number;
  status?: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface ServicePayload {
  name: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  icon_key?: string | undefined;
  accent: ServiceAccent;
  features?: string[] | undefined;
  is_featured?: boolean | undefined;
  sort_order?: number | undefined;
  status?: ContentStatus | undefined;
}

// Admin-scoped responses return every translatable field as a full
// {id, en} map instead of a single locale-resolved string, so the admin UI
// can edit both languages.
export interface AdminService {
  id: number;
  name: Translated;
  slug: Translated;
  summary: Translated;
  description: Translated;
  category: Translated;
  icon_key: string | null;
  accent: ServiceAccent;
  features: TranslatedList;
  is_featured: boolean;
  sort_order: number;
  status: ContentStatus;
  seo?: AdminSeoBlock | null;
  created_at: string;
  updated_at: string;
}

export interface AdminServicePayload {
  name: Translated;
  slug: Translated;
  summary: Translated;
  description: Translated;
  category: Translated;
  icon_key?: string | undefined;
  accent: ServiceAccent;
  features?: TranslatedList | undefined;
  is_featured?: boolean | undefined;
  sort_order?: number | undefined;
  status?: ContentStatus | undefined;
  seo?: AdminSeoPayload | undefined;
}
