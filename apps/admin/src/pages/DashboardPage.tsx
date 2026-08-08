import { useQuery } from "@tanstack/react-query";
import { StatTile } from "@existcode/ui";
import {
  getAdminBlogPosts,
  getAdminContactMessages,
  getAdminNewsPosts,
  getAdminOrders,
  getAdminPricingPlans,
  getAdminServices
} from "@existcode/api-client";
import { apiClient } from "../app/apiClient";

export function DashboardPage() {
  const services = useQuery({ queryKey: ["admin", "services", "count"], queryFn: () => getAdminServices(apiClient) });
  const plans = useQuery({ queryKey: ["admin", "pricing-plans", "count"], queryFn: () => getAdminPricingPlans(apiClient) });
  const posts = useQuery({ queryKey: ["admin", "blog-posts", "count"], queryFn: () => getAdminBlogPosts(apiClient) });
  const news = useQuery({ queryKey: ["admin", "news-posts", "count"], queryFn: () => getAdminNewsPosts(apiClient) });
  const orders = useQuery({ queryKey: ["admin", "orders", "count"], queryFn: () => getAdminOrders(apiClient) });
  const messages = useQuery({
    queryKey: ["admin", "contact-messages", "count"],
    queryFn: () => getAdminContactMessages(apiClient)
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-neutral-50">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-400">Ringkasan konten dan aktivitas website.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatTile label="Jasa" value={String(services.data?.meta.total ?? "-")} />
        <StatTile label="Paket Harga" value={String(plans.data?.meta.total ?? "-")} />
        <StatTile label="Artikel Blog" value={String(posts.data?.meta.total ?? "-")} />
        <StatTile label="Berita" value={String(news.data?.meta.total ?? "-")} />
        <StatTile label="Total Order" value={String(orders.data?.meta.total ?? "-")} />
        <StatTile label="Pesan Kontak" value={String(messages.data?.meta.total ?? "-")} />
      </div>
    </div>
  );
}
