import type { ContentStatus, ServiceAccent } from "./service";
import type { AdminSeoBlock, AdminSeoPayload, SeoBlock } from "./seo";
import type { Translated } from "./translated";

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  slugs?: Record<string, string>;
}

export interface BlogPost {
  id: number;
  blog_category_id?: number | null;
  title: string;
  slug: string;
  slugs?: Record<string, string>;
  excerpt: string;
  body: string;
  cover_image_url: string | null;
  accent: ServiceAccent | null;
  author_name: string;
  reading_minutes: number | null;
  published_at: string | null;
  category: Pick<BlogCategory, "id" | "name" | "slug" | "slugs"> | null;
  // Only present on detail (show) responses, not list responses.
  seo?: SeoBlock;
  // Only present on admin-scoped responses.
  status?: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface BlogCategoryPayload {
  name: string;
  slug: string;
}

export interface BlogPostPayload {
  blog_category_id?: number | null | undefined;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | undefined;
  accent?: ServiceAccent | undefined;
  author_name?: string | undefined;
  reading_minutes?: number | undefined;
  status?: ContentStatus | undefined;
  published_at?: string | undefined;
}

// Admin-scoped responses return every translatable field as a full
// {id, en} map instead of a single locale-resolved string.
export interface AdminBlogCategory {
  id: number;
  name: Translated;
  slug: Translated;
}

export interface AdminBlogCategoryPayload {
  name: Translated;
  slug: Translated;
}

export interface AdminBlogPost {
  id: number;
  blog_category_id: number | null;
  title: Translated;
  slug: Translated;
  excerpt: Translated;
  body: Translated;
  cover_image_url: string | null;
  accent: ServiceAccent | null;
  author_name: string;
  reading_minutes: number | null;
  status: ContentStatus;
  published_at: string | null;
  category: { id: number; name: Translated; slug: Translated } | null;
  seo?: AdminSeoBlock | null;
  created_at: string;
  updated_at: string;
}

export interface AdminBlogPostPayload {
  blog_category_id?: number | null | undefined;
  title: Translated;
  slug: Translated;
  excerpt: Translated;
  body: Translated;
  cover_image_url?: string | undefined;
  accent?: ServiceAccent | undefined;
  author_name?: string | undefined;
  reading_minutes?: number | undefined;
  status?: ContentStatus | undefined;
  published_at?: string | undefined;
  seo?: AdminSeoPayload | undefined;
}
