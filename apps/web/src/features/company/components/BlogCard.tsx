import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { BlogPost } from "@existcode/types";
import { accentTone } from "../accentTones";
import { formatDate } from "../format";
import { fadeInUp } from "../../server-browser/motionPresets";
import { useLocale } from "../../../i18n";

export function BlogCard({ post }: { post: BlogPost }) {
  const { t, path, locale } = useLocale();

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        to={path("blogDetail", { slug: post.slug })}
        className="flex h-full flex-col overflow-hidden bg-neutral-900 shadow-lg shadow-black/0 hover:shadow-black/40"
      >
        {post.cover_image_url ? (
          <img src={post.cover_image_url} alt="" className="h-32 w-full object-cover" />
        ) : (
          <div className={`h-32 ${accentTone(post.accent)}`} />
        )}
        <div className="flex flex-1 flex-col gap-2 p-5">
          {post.category ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
              {post.category.name}
            </span>
          ) : null}
          <h3 className="font-heading text-base font-semibold leading-snug text-neutral-50">{post.title}</h3>
          <p className="line-clamp-2 text-sm text-neutral-400">{post.excerpt}</p>
          <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-neutral-500">
            <span>{formatDate(post.published_at, locale)}</span>
            {post.reading_minutes ? (
              <>
                <span>·</span>
                <span>
                  {post.reading_minutes} {t.blog.minRead}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
