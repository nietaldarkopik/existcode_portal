import { Route, Routes } from "react-router-dom";
import { Providers } from "./app/Providers";
import { RequireAuth } from "./app/RequireAuth";
import { AdminLayout } from "./layout/AdminLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ServicesListPage } from "./features/services/ServicesListPage";
import { ServiceFormPage } from "./features/services/ServiceFormPage";
import { PricingListPage } from "./features/pricing/PricingListPage";
import { PricingFormPage } from "./features/pricing/PricingFormPage";
import { BlogListPage } from "./features/blog/BlogListPage";
import { BlogFormPage } from "./features/blog/BlogFormPage";
import { BlogCategoriesPage } from "./features/blog/BlogCategoriesPage";
import { NewsListPage } from "./features/news/NewsListPage";
import { NewsFormPage } from "./features/news/NewsFormPage";
import { OrdersListPage } from "./features/orders/OrdersListPage";
import { OrderDetailPage } from "./features/orders/OrderDetailPage";
import { ContactMessagesListPage } from "./features/contact/ContactMessagesListPage";
import { ThemeSettingsPage } from "./features/theme/ThemeSettingsPage";
import { SeoSettingsPage } from "./features/seo/SeoSettingsPage";

export function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<DashboardPage />} />

            <Route path="/jasa" element={<ServicesListPage />} />
            <Route path="/jasa/baru" element={<ServiceFormPage />} />
            <Route path="/jasa/:id" element={<ServiceFormPage />} />

            <Route path="/harga" element={<PricingListPage />} />
            <Route path="/harga/baru" element={<PricingFormPage />} />
            <Route path="/harga/:id" element={<PricingFormPage />} />

            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/kategori" element={<BlogCategoriesPage />} />
            <Route path="/blog/baru" element={<BlogFormPage />} />
            <Route path="/blog/:id" element={<BlogFormPage />} />

            <Route path="/news" element={<NewsListPage />} />
            <Route path="/news/baru" element={<NewsFormPage />} />
            <Route path="/news/:id" element={<NewsFormPage />} />

            <Route path="/orders" element={<OrdersListPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />

            <Route path="/contact-messages" element={<ContactMessagesListPage />} />

            <Route path="/theme" element={<ThemeSettingsPage />} />
            <Route path="/seo" element={<SeoSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Providers>
  );
}
