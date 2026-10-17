import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatArticleDate } from "@/lib/format";

type ArticleTeaserProps = {
  article: Article;
  featured?: boolean;
  heading: "h2" | "h3";
};

export function ArticleTeaser({ article, featured = false, heading }: ArticleTeaserProps) {
  const Title = heading;

  return (
    <article className="border-t border-line py-8 first:border-t-0">
      <time dateTime={article.publishedAt} className="text-kicker font-black tracking-[0.16em] text-forest uppercase">
        {formatArticleDate(article.publishedAt)}
      </time>
      <div>
        <Title className={`mt-3 font-display leading-[1.15] font-extrabold ${featured ? "text-[clamp(1.8rem,3vw,2.6rem)]" : "text-[clamp(1.45rem,2vw,2rem)]"}`}>
          <Link href={`/straipsniai/${article.slug}`} className="text-ink transition-colors duration-450 ease-soft hover:text-forest">
            {article.title}
          </Link>
        </Title>
        <p className="mt-3 max-w-2xl text-muted">{article.excerpt}</p>
        <Link href={`/straipsniai/${article.slug}`} className="mt-4 inline-flex font-black text-forest">
          Skaityti <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
