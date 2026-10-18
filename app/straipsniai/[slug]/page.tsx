import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Mark";
import { NotFoundView } from "@/components/NotFoundView";
import { ArrowLeft, CalendarBlank } from "@/components/marks";
import { getArticle, getArticles } from "@/lib/articles";
import { formatArticleDate } from "@/lib/format";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Straipsnis nerastas", robots: { index: false, follow: false } };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/straipsniai/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return <NotFoundView />;

  return (
    <main className="container-site max-w-3xl pt-36 pb-20">
      <Link href="/straipsniai" className="inline-flex items-center gap-2 text-sm font-black text-forest">
        <Mark icon={ArrowLeft} size={22} />
        Visi straipsniai
      </Link>
      {article.publishedAt ? (
        <div className="mt-6 flex items-center gap-2">
          <Mark icon={CalendarBlank} size={26} />
          <time dateTime={article.publishedAt} className="text-kicker font-black tracking-[0.16em] text-forest uppercase">
            {formatArticleDate(article.publishedAt)}
          </time>
        </div>
      ) : null}
      <h1 className="mt-4 text-h2">{article.title}</h1>
      <div className="mt-8 grid gap-5 text-lg leading-8 text-slate-soft">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
