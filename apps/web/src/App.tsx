import type { ComponentType } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DEFAULT_LOCALE, LOCALES } from "@existcode/i18n";
import { Providers } from "./app/Providers";
import { ServerInfoPage } from "./features/server-browser/ServerInfoPage";
import { ServerBrowserPage } from "./features/server-browser/ServerBrowserPage";
import { HomePage as GameHomePage } from "./features/server-browser/HomePage";
import { HomePage } from "./features/company/pages/HomePage";
import { ServicesPage } from "./features/company/pages/ServicesPage";
import { ServiceDetailPage } from "./features/company/pages/ServiceDetailPage";
import { PricingPage } from "./features/company/pages/PricingPage";
import { BlogListPage } from "./features/company/pages/BlogListPage";
import { BlogDetailPage } from "./features/company/pages/BlogDetailPage";
import { NewsListPage } from "./features/company/pages/NewsListPage";
import { NewsDetailPage } from "./features/company/pages/NewsDetailPage";
import { ContactPage } from "./features/company/pages/ContactPage";
import { AboutPage } from "./features/company/pages/AboutPage";
import { OrderPage } from "./features/company/pages/OrderPage";
import { OrderLookupPage } from "./features/company/pages/OrderLookupPage";
import { PaymentPage } from "./features/company/pages/PaymentPage";
import { LocaleFrame, routeTemplates, type RouteKey } from "./i18n";

const pages: Record<RouteKey, ComponentType> = {
  home: HomePage,
  services: ServicesPage,
  serviceDetail: ServiceDetailPage,
  pricing: PricingPage,
  blog: BlogListPage,
  blogDetail: BlogDetailPage,
  news: NewsListPage,
  newsDetail: NewsDetailPage,
  contact: ContactPage,
  about: AboutPage,
  order: OrderPage,
  orderLookup: OrderLookupPage,
  payment: PaymentPage
};

export function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Navigate to={routeTemplates.home[DEFAULT_LOCALE]} replace />} />

        {LOCALES.flatMap((locale) =>
          (Object.keys(pages) as RouteKey[]).map((key) => {
            const Page = pages[key];
            return (
              <Route
                key={`${locale}-${key}`}
                path={routeTemplates[key][locale]}
                element={
                  <LocaleFrame locale={locale}>
                    <Page />
                  </LocaleFrame>
                }
              />
            );
          })
        )}

        {/* Original Battlefield-menu UI clone — unrelated to the company site, kept as-is. */}
        <Route path="/menu" element={<GameHomePage />} />
        <Route path="/server-browser" element={<ServerBrowserPage />} />
        <Route path="/server-browser/:serverId" element={<ServerInfoPage />} />
      </Routes>
    </Providers>
  );
}
