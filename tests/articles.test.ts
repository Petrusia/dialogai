import assert from "node:assert/strict";
import test from "node:test";
import { normalizeArticles } from "../lib/article-source.ts";

test("priima straipsnių masyvą ir suskaido body į pastraipas", () => {
  const articles = normalizeArticles([
    {
      slug: "pirmas-tekstas",
      title: "Pirmas",
      excerpt: "Trumpai",
      body: "Pirma pastraipa.\n\nAntra pastraipa.",
      publishedAt: "2026-01-02",
    },
    {
      slug: "Blogas slug",
      title: "Netinka",
      body: "Tekstas",
    },
  ]);

  assert.ok(articles);
  assert.equal(articles?.length, 1);
  assert.deepEqual(articles?.[0].paragraphs, ["Pirma pastraipa.", "Antra pastraipa."]);
});

test("priima { articles } ir surūšiuoja nuo naujausio", () => {
  const articles = normalizeArticles({
    articles: [
      { slug: "senas", title: "Senas", body: "A", publishedAt: "2026-01-01" },
      { slug: "naujas", title: "Naujas", body: "B", publishedAt: "2026-05-01" },
    ],
  });

  assert.deepEqual(
    articles?.map((article) => article.slug),
    ["naujas", "senas"],
  );
});

test("netinkamą formą grąžina kaip null", () => {
  assert.equal(normalizeArticles({ posts: [] }), null);
});
