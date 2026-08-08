import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { NewsPost } from "@existcode/types";
import { Badge } from "@existcode/ui";
import { formatDate } from "../format";
import { fadeInUp } from "../../server-browser/motionPresets";
import { useLocale } from "../../../i18n";

const typeVariant: Record<NewsPost["news_type"], "neutral" | "success" | "info" | "warning"> = {
  announcement: "neutral",
  milestone: "success",
  press: "info",
  product_update: "warning"
};

export function NewsRow({ post }: { post: NewsPost }) {
  const { t, path, locale } = useLocale();

  return (
    <motion.div variants={fadeInUp} className="border-b border-neutral-800/60">
      <Link
        to={path("newsDetail", { slug: post.slug })}
        className="grid grid-cols-[110px_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-neutral-800/30 sm:grid-cols-[130px_1fr_auto]"
      >
        <span className="text-xs text-neutral-500">{formatDate(post.published_at, locale)}</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-neutral-50">{post.title}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">{post.excerpt}</p>
        </div>
        <Badge variant={typeVariant[post.news_type]} className="rounded-none">
          {t.news.types[post.news_type]}
        </Badge>
      </Link>
    </motion.div>
  );
}
