import type { Metadata } from "next";
import Link from "next/link";
import { NotFoundView } from "@/components/NotFoundView";
import { getArticle, getArticles } from "@/lib/articles";

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
      <Link href="/straipsniai" className="text-sm font-black text-forest">
        ← Visi straipsniai
      </Link>
      {article.publishedAt ? (
        <time dateTime={article.publishedAt} className="mt-6 block text-kicker font-black tracking-[0.16em] text-forest uppercase">
          {formatDate(article.publishedAt)}
        </time>
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

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("lt-LT", { dateStyle: "long" }).format(date);
}
