import type { ContentStatus, ServiceAccent } from "./service";
import type { AdminSeoBlock, AdminSeoPayload, SeoBlock } from "./seo";
import type { Translated } from "./translated";

export type NewsType = "announcement" | "milestone" | "press" | "product_update";

export interface NewsPost {
  id: number;
  title: string;
  slug: string;
  slugs?: Record<string, string>;
  excerpt: string;
  body: string;
  cover_image_url: string | null;
  accent: ServiceAccent | null;
  news_type: NewsType;
  published_at: string | null;
  // Only present on detail (show) responses, not list responses.
  seo?: SeoBlock;
  // Only present on admin-scoped responses.
  status?: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface NewsPostPayload {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | undefined;
  accent?: ServiceAccent | undefined;
  news_type?: NewsType | undefined;
  status?: ContentStatus | undefined;
  published_at?: string | undefined;
}

// Admin-scoped responses return every translatable field as a full
// {id, en} map instead of a single locale-resolved string.
export interface AdminNewsPost {
  id: number;
  title: Translated;
  slug: Translated;
  excerpt: Translated;
  body: Translated;
  cover_image_url: string | null;
  accent: ServiceAccent | null;
  news_type: NewsType;
  status: ContentStatus;
  published_at: string | null;
  seo?: AdminSeoBlock | null;
  created_at: string;
  updated_at: string;
}

export interface AdminNewsPostPayload {
  title: Translated;
  slug: Translated;
  excerpt: Translated;
  body: Translated;
  cover_image_url?: string | undefined;
  accent?: ServiceAccent | undefined;
  news_type?: NewsType | undefined;
  status?: ContentStatus | undefined;
  published_at?: string | undefined;
  seo?: AdminSeoPayload | undefined;
}
