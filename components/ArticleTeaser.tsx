import Link from "next/link";
import { Mark } from "@/components/Mark";
import { ArrowRight, CalendarBlank } from "@/components/marks";
import type { Article } from "@/lib/articles";
import { formatArticleDate } from "@/lib/format";

type ArticleTeaserProps = {
  article: Article;
  heading: "h2" | "h3";
};

export function ArticleTeaser({ article, heading }: ArticleTeaserProps) {
  const Title = heading;

  return (
    <article className="flex h-full flex-col border border-line bg-white p-8 sm2:p-10">
      <div className="flex items-center gap-2">
        <Mark icon={CalendarBlank} size={26} />
        <time dateTime={article.publishedAt} className="text-kicker font-black tracking-[0.16em] text-forest uppercase">
          {formatArticleDate(article.publishedAt)}
        </time>
      </div>
      <Title className="mt-5 font-display text-[clamp(1.45rem,2vw,1.9rem)] leading-[1.15] font-extrabold tracking-[-0.03em]">
        <Link href={`/straipsniai/${article.slug}`} className="text-ink transition-colors duration-450 ease-soft hover:text-forest">
          {article.title}
        </Link>
      </Title>
      <p className="mt-4 text-muted">{article.excerpt}</p>
      <Link href={`/straipsniai/${article.slug}`} className="mt-auto inline-flex items-center gap-2 pt-8 font-black text-forest">
        Skaityti <Mark icon={ArrowRight} size={26} />
      </Link>
    </article>
  );
}
