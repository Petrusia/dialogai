import assert from "node:assert/strict";
import test from "node:test";
import { formatArticleDate } from "../lib/format.ts";
import { jsonForHtml } from "../lib/site.ts";

test("straipsnio datą rašo lietuviškai ir palieka neatpažįstamą tekstą", () => {
  const expected = new Intl.DateTimeFormat("lt-LT", { dateStyle: "long" }).format(new Date("2026-03-12"));
  assert.equal(formatArticleDate("2026-03-12"), expected);
  assert.equal(formatArticleDate("ne data"), "ne data");
});

test("JSON HTML skripte pakeičia <, > ir &", () => {
  const html = jsonForHtml({ text: `</script><img alt="&">` });
  assert.equal(html.includes("</script>"), false);
  assert.equal(html.includes("<"), false);
  assert.equal(html.includes(">"), false);
  assert.equal(html.includes("&"), false);
  assert.match(html, /\\u003c/);
  assert.match(html, /\\u003e/);
  assert.match(html, /\\u0026/);
});
