import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Skeleton, cn } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { BlogCard } from "../components/BlogCard";
import { useBlogCategories, useBlogPosts } from "../hooks/useBlog";
import { staggerContainer } from "../../server-browser/motionPresets";
import { Seo } from "../../seo/Seo";
import { useStaticPageSeo } from "../../seo/useSiteSeo";
import { useLocale } from "../../../i18n";

export function BlogListPage() {
  const { t } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? undefined;
  const seo = useStaticPageSeo("blog", t.blog.title, t.blog.subtitle);

  const { data: categoriesRes } = useBlogCategories();
  const { data: postsRes, isLoading, isError } = useBlogPosts(activeCategory ? { category: activeCategory } : {});

  function selectCategory(slug: string | undefined) {
    setSearchParams(slug ? { category: slug } : {});
  }

  return (
    <CompanyPageShell>
      <Seo title={seo.title} description={seo.description} />
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        {t.blog.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm text-neutral-400">{t.blog.subtitle}</p>

      <div className="mt-8 grid grid-cols-1 gap-10 xl:grid-cols-[1fr_240px]">
        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-none" />
              ))}
            </div>
          ) : isError ? (
            <p className="text-sm text-danger-400">{t.blog.loadError}</p>
          ) : postsRes?.data.length === 0 ? (
            <p className="text-sm text-neutral-500">{t.blog.noArticles}</p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {postsRes?.data.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </div>

        <div className="h-fit bg-neutral-900/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-200">{t.blog.categories}</p>
          <div className="mt-3 flex flex-col gap-1">
            <button
              type="button"
              onClick={() => selectCategory(undefined)}
              className={cn(
                "py-2 text-left text-sm transition-colors",
                !activeCategory ? "text-neutral-50" : "text-neutral-400 hover:text-neutral-200"
              )}
            >
              {t.blog.allArticles}
            </button>
            {categoriesRes?.data.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.slug)}
                className={cn(
                  "py-2 text-left text-sm transition-colors",
                  activeCategory === category.slug ? "text-neutral-50" : "text-neutral-400 hover:text-neutral-200"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CompanyPageShell>
  );
}
