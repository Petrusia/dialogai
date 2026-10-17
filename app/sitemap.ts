import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();

  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/straipsniai`, changeFrequency: "weekly", priority: 0.7 },
    ...articles.map((article) => ({
      url: `${site.url}/straipsniai/${article.slug}`,
      lastModified: article.publishedAt ? new Date(article.publishedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
