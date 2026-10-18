import Link from "next/link";
import { ArticleTeaser } from "@/components/ArticleTeaser";
import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";
import { ArrowRight } from "@/components/marks";
import { getArticles } from "@/lib/articles";
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
            <h2 className="mt-4 flex items-start gap-4 text-h2">
              <Mark icon={iconFor["Tekstai apie dialogą"]} size={36} className="mt-0.5" />
              <span className="min-w-0">Tekstai apie dialogą</span>
            </h2>
          </div>
          <p className="mt-4 max-w-[560px] text-lead text-slate-soft lg2:mt-0">
            Trumpi tekstai apie metodą ir tai, kaip dialogas prasideda jūsų erdvėje.
          </p>
        </div>
        <div className="grid gap-5 md2:grid-cols-2 md2:gap-8">
          {articles.slice(0, 2).map((article) => (
            <ArticleTeaser key={article.slug} article={article} heading="h3" />
          ))}
        </div>
        <Link href="/straipsniai" className="mt-8 inline-flex items-center gap-2 font-black text-ink underline decoration-mint decoration-4 underline-offset-4">
          Visi straipsniai
          <Mark icon={ArrowRight} size={26} />
        </Link>
      </div>
    </section>
  );
}
