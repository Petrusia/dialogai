import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { formatArticleDate } from "@/lib/format";
import { kicker } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Straipsniai",
  description: "Tekstai apie Viešąjį dialogą, jo eigą ir erdves, kuriose jis vyksta.",
  alternates: { canonical: "/straipsniai" },
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="container-site pt-36 pb-20">
      <p className={kicker}>Straipsniai</p>
      <h1 className="mt-4 text-h2">Tekstai apie dialogą</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-soft">
        Čia skelbiami tekstai apie metodą. Vėliau tą patį sąrašą galima imti iš kito šaltinio per API.
      </p>
      {articles.length === 0 ? (
        <p className="mt-12 text-muted">Straipsnių kol kas nėra.</p>
      ) : (
        <div className="mt-12 grid gap-5">
          {articles.map((article) => (
            <article key={article.slug} className="rounded-card-lg border border-border-sand/55 bg-white p-6 shadow-card">
              {article.publishedAt ? (
                <time dateTime={article.publishedAt} className="text-kicker font-black tracking-[0.16em] text-forest uppercase">
                  {formatArticleDate(article.publishedAt)}
                </time>
              ) : null}
              <h2 className="mt-3 font-display text-[2rem] leading-tight font-extrabold">
                <Link href={`/straipsniai/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="mt-3 text-muted">{article.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
