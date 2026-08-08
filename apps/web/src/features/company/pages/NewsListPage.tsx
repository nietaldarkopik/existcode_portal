import { motion } from "framer-motion";
import { Skeleton } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { NewsRow } from "../components/NewsRow";
import { useNewsPosts } from "../hooks/useNews";
import { staggerContainer } from "../../server-browser/motionPresets";
import { Seo } from "../../seo/Seo";
import { useStaticPageSeo } from "../../seo/useSiteSeo";
import { useLocale } from "../../../i18n";

export function NewsListPage() {
  const { t } = useLocale();
  const { data, isLoading, isError } = useNewsPosts();
  const seo = useStaticPageSeo("news", t.news.title, t.news.subtitle);

  return (
    <CompanyPageShell>
      <Seo title={seo.title} description={seo.description} />
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        {t.news.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm text-neutral-400">{t.news.subtitle}</p>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-none" />
            ))}
          </div>
        ) : isError ? (
          <p className="text-sm text-danger-400">{t.news.loadError}</p>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            {data?.data.map((post) => (
              <NewsRow key={post.id} post={post} />
            ))}
          </motion.div>
        )}
      </div>
    </CompanyPageShell>
  );
}
