const articleDate = new Intl.DateTimeFormat("lt-LT", { dateStyle: "long" });

export function formatArticleDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return articleDate.format(date);
}
