import type { ContentStatus, Service } from "./service";
import type { AdminSeoBlock, AdminSeoPayload, SeoBlock } from "./seo";
import type { Translated, TranslatedList } from "./translated";

export type BillingPeriod = "one_time" | "monthly" | "yearly";

export interface PricingPlan {
  id: number;
  service_id?: number | null;
  name: string;
  slug: string;
  slugs?: Record<string, string>;
  tagline: string | null;
  // Laravel serializes decimal-cast columns as strings to preserve precision.
  price_amount: string | null;
  price_currency: string;
  billing_period: BillingPeriod;
  features: string[];
  is_popular: boolean;
  is_custom: boolean;
  service: Pick<Service, "id" | "name" | "slug" | "slugs"> | null;
  // Only present on detail (show) responses, not list responses.
  seo?: SeoBlock;
  // Only present on admin-scoped responses.
  sort_order?: number;
  status?: ContentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface PricingPlanPayload {
  service_id?: number | null | undefined;
  name: string;
  slug: string;
  tagline?: string | undefined;
  price_amount?: number | null | undefined;
  price_currency?: string | undefined;
  billing_period: BillingPeriod;
  features?: string[] | undefined;
  is_popular?: boolean | undefined;
  is_custom?: boolean | undefined;
  sort_order?: number | undefined;
  status?: ContentStatus | undefined;
}

// Admin-scoped responses return every translatable field as a full
// {id, en} map instead of a single locale-resolved string.
export interface AdminPricingPlan {
  id: number;
  service_id: number | null;
  name: Translated;
  slug: Translated;
  tagline: Translated;
  price_amount: string | null;
  price_currency: string;
  billing_period: BillingPeriod;
  features: TranslatedList;
  is_popular: boolean;
  is_custom: boolean;
  service: { id: number; name: Translated; slug: Translated } | null;
  sort_order: number;
  status: ContentStatus;
  seo?: AdminSeoBlock | null;
  created_at: string;
  updated_at: string;
}

export interface AdminPricingPlanPayload {
  service_id?: number | null | undefined;
  name: Translated;
  slug: Translated;
  tagline?: Translated | undefined;
  price_amount?: number | null | undefined;
  price_currency?: string | undefined;
  billing_period: BillingPeriod;
  features?: TranslatedList | undefined;
  is_popular?: boolean | undefined;
  is_custom?: boolean | undefined;
  sort_order?: number | undefined;
  status?: ContentStatus | undefined;
  seo?: AdminSeoPayload | undefined;
}
