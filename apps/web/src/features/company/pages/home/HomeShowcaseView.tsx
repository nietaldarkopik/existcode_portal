import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogPost, PricingPlan, Service } from "@existcode/types";
import { ServiceCard } from "../../components/ServiceCard";
import { PricingCard } from "../../components/PricingCard";
import { BlogCard } from "../../components/BlogCard";
import { HeroParticles } from "../../../theme/HeroParticles";
import { staggerContainer } from "../../../server-browser/motionPresets";
import { useLocale } from "../../../../i18n";

export function HomeShowcaseView({
  featuredServices,
  popularPlan,
  latestPosts
}: {
  featuredServices: Service[];
  popularPlan: PricingPlan | undefined;
  latestPosts: BlogPost[];
}) {
  const { t, path } = useLocale();

  return (
    <>
      <HeroParticles />

      <section className="flex flex-col gap-6 py-8 lg:py-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-warning-400"
        >
          {t.home.badge}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="max-w-2xl font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-6xl"
        >
          {t.home.heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl text-sm text-neutral-400 lg:text-base"
        >
          {t.home.heroSubtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-3"
        >
          <Link
            to={path("pricing")}
            className="flex h-11 items-center gap-2 bg-neutral-100 px-6 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:bg-white"
          >
            {t.home.ctaPricing} <ArrowRight className="size-4" />
          </Link>
          <Link
            to={path("services")}
            className="flex h-11 items-center border border-neutral-700 px-6 text-xs font-semibold uppercase tracking-wide text-neutral-300 hover:border-neutral-500 hover:text-neutral-50"
          >
            {t.home.ctaServices}
          </Link>
        </motion.div>
      </section>

      {featuredServices.length > 0 ? (
        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {t.home.featuredServices}
            </p>
            <Link
              to={path("services")}
              className="text-xs font-medium uppercase tracking-wide text-neutral-400 hover:text-neutral-100"
            >
              {t.home.seeAll}
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </section>
      ) : null}

      {popularPlan ? (
        <section className="mt-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            {t.home.popularPlan}
          </p>
          <div className="max-w-sm">
            <PricingCard plan={popularPlan} />
          </div>
        </section>
      ) : null}

      {latestPosts.length > 0 ? (
        <section className="mt-14">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {t.home.latestArticles}
            </p>
            <Link
              to={path("blog")}
              className="text-xs font-medium uppercase tracking-wide text-neutral-400 hover:text-neutral-100"
            >
              {t.home.seeAll}
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
        </section>
      ) : null}
    </>
  );
}
