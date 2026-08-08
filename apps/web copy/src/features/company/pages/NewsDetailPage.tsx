import { Link, useParams } from "react-router-dom";
import { Badge, Breadcrumb, Skeleton } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { useNewsPost } from "../hooks/useNews";
import { accentTone } from "../accentTones";
import { formatDate } from "../format";
import { useLocale } from "../../../i18n";
import { localeLinksFromSlugs } from "../../../i18n/routes";

export function NewsDetailPage() {
  const { t, path, locale } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useNewsPost(slug);
  const post = data?.data;
  const localeLinks = localeLinksFromSlugs("newsDetail", post?.slugs);

  if (isLoading) {
    return (
      <CompanyPageShell>
        <Skeleton className="h-8 w-72 rounded-none" />
        <Skeleton className="mt-4 h-40 w-full rounded-none" />
      </CompanyPageShell>
    );
  }

  if (isError || !post) {
    return (
      <CompanyPageShell>
        <p className="text-sm text-danger-400">{t.news.notFound}</p>
        <Link to={path("news")} className="mt-2 inline-block text-sm text-neutral-300 underline">
          {t.news.backToList}
        </Link>
      </CompanyPageShell>
    );
  }

  return (
    <CompanyPageShell localeLinks={localeLinks}>
      <Breadcrumb trail={[t.nav.news.toUpperCase()]} className="mb-3" />
      <div className={`h-48 ${accentTone(post.accent)}`} />

      <div className="mx-auto mt-8 max-w-2xl">
        <Badge variant="neutral" className="rounded-none">
          {t.news.types[post.news_type]}
        </Badge>
        <h1 className="mt-3 font-heading text-3xl font-semibold text-neutral-50 lg:text-4xl">{post.title}</h1>
        <p className="mt-2 text-xs text-neutral-500">{formatDate(post.published_at, locale)}</p>

        <div className="mt-8 flex flex-col gap-4 text-sm leading-relaxed text-neutral-300">
          {post.body.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </CompanyPageShell>
  );
}
