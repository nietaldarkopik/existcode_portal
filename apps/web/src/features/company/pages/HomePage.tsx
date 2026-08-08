import { useTheme } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { useServices } from "../hooks/useServices";
import { usePricingPlans } from "../hooks/usePricingPlans";
import { useBlogPosts } from "../hooks/useBlog";
import { Seo } from "../../seo/Seo";
import { useStaticPageSeo } from "../../seo/useSiteSeo";
import { useLocale } from "../../../i18n";
import { HomeShowcaseView } from "./home/HomeShowcaseView";
import { HomeBentoView } from "./home/HomeBentoView";
import { HomeCompactView } from "./home/HomeCompactView";

export function HomePage() {
  const { t } = useLocale();
  const { layout } = useTheme();
  const { data: servicesRes } = useServices();
  const { data: plansRes } = usePricingPlans();
  const { data: postsRes } = useBlogPosts();
  const seo = useStaticPageSeo("home", t.home.heroTitle, t.home.heroSubtitle);

  const featuredServices = servicesRes?.data.filter((service) => service.is_featured).slice(0, 3) ?? [];
  const popularPlan = plansRes?.data.find((plan) => plan.is_popular);
  const latestPosts = postsRes?.data.slice(0, 3) ?? [];

  const viewProps = { featuredServices, popularPlan, latestPosts };

  return (
    <CompanyPageShell>
      <Seo title={seo.title} description={seo.description} />
      {layout === "bento" ? <HomeBentoView {...viewProps} /> : null}
      {layout === "compact" ? <HomeCompactView {...viewProps} /> : null}
      {layout !== "bento" && layout !== "compact" ? <HomeShowcaseView {...viewProps} /> : null}
    </CompanyPageShell>
  );
}
