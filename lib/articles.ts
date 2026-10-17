import { cacheLife, cacheTag } from "next/cache";
import { type Article, localArticles, normalizeArticles } from "@/lib/article-source";

export type { Article };

export async function getArticles(): Promise<Article[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const sourceUrl = process.env.ARTICLES_API_URL;
  if (!sourceUrl) return newestFirst(localArticles);

  try {
    const response = await fetch(sourceUrl);
    if (!response.ok) return newestFirst(localArticles);

    const articles = normalizeArticles(await response.json());
    if (!articles) return newestFirst(localArticles);
    return articles;
  } catch {
    return newestFirst(localArticles);
  }
}

function newestFirst(articles: Article[]) {
  return [...articles].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
}
