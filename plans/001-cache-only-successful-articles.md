# 001 — Cache only a successful articles response

- **Status**: TODO
- **Commit**: 045c291
- **Severity**: MEDIUM
- **Category**: Bugs & correctness
- **Rule**: Beyond the scan
- **Estimated scope**: 1 file, about 30 lines

## Problem

`lib/articles.ts:6` caches every successful return of `getArticles`, including the local fallback used when the upstream fails.

```ts
// lib/articles.ts:6 — current
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
```

`"use cache"` stores the function's return value. Next.js preset `hours` keeps that value stale for 5 minutes, revalidates after 1 hour, and expires after 1 day (`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cacheLife.md`). A single non-OK response, invalid JSON, or network error therefore publishes `localArticles` as if it were the remote list. The homepage preview, `/straipsniai`, the article page, and `app/sitemap.ts` all call `getArticles()`.

The same function calls `fetch` with no timeout. `app/api/uzklausa/route.ts` already bounds its upstream with `AbortSignal.timeout(10_000)`. A hung articles host blocks this render until the platform gives up.

The source URL is also read inside the cached function, so it is not a cache-key argument. Passing it in makes a changed `ARTICLES_API_URL` a different entry.

The default in-memory cache handler does not persist an errored stream: `streamToBuffer` throws and `set` swallows that error (`node_modules/next/dist/server/lib/cache-handlers/default.js`). Throwing from the cached function, and catching outside it, avoids storing the fallback. A custom cache handler on the host could still store an errored entry; the verification step below checks that.

## Target

```ts
// lib/articles.ts — target
export async function getArticles(): Promise<Article[]> {
  const sourceUrl = process.env.ARTICLES_API_URL?.trim();
  if (!sourceUrl) return newestFirst(localArticles);

  try {
    return await getRemoteArticles(sourceUrl);
  } catch {
    return newestFirst(localArticles);
  }
}

async function getRemoteArticles(sourceUrl: string): Promise<Article[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Articles source responded ${response.status}`);

  const articles = normalizeArticles(await response.json());
  if (!articles) throw new Error("Articles source returned an unrecognized payload");
  return articles;
}
```

Keep `newestFirst`, `getArticle`, the imports, and `export type { Article }`. An empty or whitespace `ARTICLES_API_URL` still serves local articles and does not enter the cache. A successful remote list stays cached with `cacheLife("hours")` and `cacheTag("articles")`.

## Repo conventions to follow

- Keep the Lithuanian-free identifier style already used in `lib/articles.ts`.
- Imitate the timeout in `app/api/uzklausa/route.ts:47`: `signal: AbortSignal.timeout(10_000)`.
- Leave `lib/article-source.ts` and `tests/articles.test.ts` unchanged. Those tests cover `normalizeArticles`, which this function still calls.

## Steps

1. In `lib/articles.ts`, replace `getArticles` with the target above and add `getRemoteArticles` directly under it.
2. Keep the `"use cache"` directive as the first statement inside `getRemoteArticles`, before `cacheLife` and `cacheTag`.
3. Re-read the diff and remove unrelated churn.

## Boundaries

- Do NOT remove `"use cache"` from the successful path. Cache Components and `partialPrefetching` depend on that cached read.
- Do NOT change `normalizeArticles`, local article copy, or the public `getArticles` / `getArticle` signatures.
- Do NOT add `redirect: "error"`. A legitimate articles host may redirect.
- Do NOT add a dependency.
- STOP if `lib/articles.ts` has drifted from commit `045c291`.

## Verification

- **Mechanical**:
  - `npx react-doctor@latest --scope changed` does not drop the score. This change is outside the scanner's rules.
  - `npx next typegen && npx tsc --noEmit` passes. `LayoutProps` exists only after typegen.
  - `npm test` still passes.
  - `npm run lint` passes.
- **Behavior check**: With `ARTICLES_API_URL` unset, the homepage and `/straipsniai` still show the two local articles. With the variable set to a URL that returns 500, the page shows the local articles, and a second request after the upstream is fixed shows the remote articles within one request (the failure was not cached). With a slow URL, the request fails within about 10 seconds and falls back instead of hanging.
- **Done when**: a failed upstream response is not reused after the upstream recovers, and a successful response is still cached.
