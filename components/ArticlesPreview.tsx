import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { formatArticleDate } from "@/lib/format";
import { kicker, sectionY } from "@/lib/ui";

export async function ArticlesPreview() {
  const articles = await getArticles();
  if (articles.length === 0) return null;

  return (
    <section id="straipsniai" className={`${sectionY} bg-white`}>
      <div className="container-site">
        <div className="mb-16 lg2:flex lg2:items-end lg2:justify-between lg2:gap-8">
          <div>
            <p className={kicker}>Straipsniai</p>
            <h2 className="mt-4 text-h2">Tekstai apie dialogą</h2>
          </div>
          <p className="mt-4 max-w-[560px] text-lead text-slate-soft lg2:mt-0">
            Trumpi tekstai apie metodą ir tai, kaip dialogas prasideda jūsų erdvėje.
          </p>
        </div>
        <div className="grid gap-5 sm2:grid-cols-2">
          {articles.slice(0, 2).map((article) => (
            <article key={article.slug} className="rounded-card-lg border border-border-sand/55 bg-cream p-6 shadow-card">
              {article.publishedAt ? (
                <time dateTime={article.publishedAt} className="text-kicker font-black tracking-[0.16em] text-forest uppercase">
                  {formatArticleDate(article.publishedAt)}
                </time>
              ) : null}
              <h3 className="mt-4 font-display text-[2rem] leading-[1.1] font-extrabold">{article.title}</h3>
              <p className="mt-4 text-muted">{article.excerpt}</p>
              <Link href={`/straipsniai/${article.slug}`} className="mt-6 inline-flex font-black text-forest">
                Skaityti →
              </Link>
            </article>
          ))}
        </div>
        <Link href="/straipsniai" className="mt-8 inline-flex font-black text-ink underline decoration-mint decoration-4 underline-offset-4">
          Visi straipsniai
        </Link>
      </div>
    </section>
  );
}
