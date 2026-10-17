import type { Metadata } from "next";
import { ArticleTeaser } from "@/components/ArticleTeaser";
import { getArticles } from "@/lib/articles";
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
        <div className="mt-12 border-b border-line">
          {articles.map((article, index) => (
            <ArticleTeaser key={article.slug} article={article} heading="h2" featured={index === 0} />
          ))}
        </div>
      )}
    </main>
  );
}
