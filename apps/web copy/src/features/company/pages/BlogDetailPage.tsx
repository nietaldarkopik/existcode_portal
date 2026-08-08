import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Skeleton } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { useBlogPost } from "../hooks/useBlog";
import { accentTone } from "../accentTones";
import { formatDate } from "../format";
import { useLocale } from "../../../i18n";
import { localeLinksFromSlugs } from "../../../i18n/routes";

export function BlogDetailPage() {
  const { t, path, locale } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useBlogPost(slug);
  const post = data?.data;
  const localeLinks = localeLinksFromSlugs("blogDetail", post?.slugs);

  if (isLoading) {
    return (
      <CompanyPageShell>
        <Skeleton className="h-8 w-72 rounded-none" />
        <Skeleton className="mt-4 h-48 w-full rounded-none" />
      </CompanyPageShell>
    );
  }

  if (isError || !post) {
    return (
      <CompanyPageShell>
        <p className="text-sm text-danger-400">{t.blog.notFound}</p>
        <Link to={path("blog")} className="mt-2 inline-block text-sm text-neutral-300 underline">
          {t.blog.backToList}
        </Link>
      </CompanyPageShell>
    );
  }

  return (
    <CompanyPageShell localeLinks={localeLinks}>
      <Breadcrumb trail={[t.nav.blog.toUpperCase()]} className="mb-3" />
      <div className={`h-56 ${accentTone(post.accent)}`} />

      <div className="mx-auto mt-8 max-w-2xl">
        {post.category ? (
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {post.category.name}
          </span>
        ) : null}
        <h1 className="mt-2 font-heading text-3xl font-semibold text-neutral-50 lg:text-4xl">{post.title}</h1>
        <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
          <span>
            {t.blog.by} {post.author_name}
          </span>
          <span>·</span>
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

        <div className="mt-8 flex flex-col gap-4 text-sm leading-relaxed text-neutral-300">
          {post.body.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </CompanyPageShell>
  );
}
