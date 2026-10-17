export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
  publishedAt: string;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const localArticles: Article[] = [
  {
    slug: "kas-yra-viesasis-dialogas",
    title: "Kas yra Viešasis dialogas",
    excerpt:
      "Tai struktūruotas pokalbis, kuriame tikslas nėra laimėti ginčą, o suprasti patirtis ir tai, kas iš tiesų vyksta.",
    publishedAt: "2026-03-12",
    paragraphs: [
      "Viešasis dialogas nėra debatai, ginčas ar tribūninė diskusija. Tai struktūruotas, nešališkai fasilituojamas pokalbis bendro intereso tema.",
      "Kalbame iš patirties, ne iš etikečių. Keliame atvirus klausimus: ne „už ar prieš?“, o „kas iš tiesų vyksta ir ko kam reikia?“.",
      "Metodą sukūrė Nansen Center for Peace and Dialogue Norvegijoje. Jis taikomas tiek įtampos aplinkose, tiek bibliotekose, mokyklose, savivaldybėse ir organizacijose.",
    ],
  },
  {
    slug: "kaip-prasideda-dialogas",
    title: "Kaip prasideda dialogas jūsų erdvėje",
    excerpt:
      "Užtenka parašyti, kur norėtumėte susitikti ir kokia tema šiuo metu rūpi. Toliau temą ir eigą formuluojame drauge.",
    publishedAt: "2026-04-02",
    paragraphs: [
      "Pirmas žingsnis yra žinutė: kokioje erdvėje ar bendruomenėje norite pradėti dialogą ir kas jums šiuo metu svarbu.",
      "Drauge išgryniname bendro intereso klausimą. Tada parenkama tyli ir saugi erdvė, kurioje dalyviai gali susėsti U forma arba ratu.",
      "Susitikimas įprastai trunka 90–120 minučių. Dirba 2–3 metodo apmokyti fasilitatoriai, grupėje būna nuo 12 iki 60 žmonių.",
    ],
  },
];

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function paragraphsFrom(item: Record<string, unknown>, excerpt: string): string[] {
  if (Array.isArray(item.paragraphs)) {
    return item.paragraphs.map(text).filter(Boolean);
  }

  const body = text(item.body) || text(item.content);
  if (body) {
    return body
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  return excerpt ? [excerpt] : [];
}

function normalizeArticle(input: unknown): Article | null {
  if (!input || typeof input !== "object") return null;

  const item = input as Record<string, unknown>;
  const slug = text(item.slug);
  const title = text(item.title);
  const excerpt = text(item.excerpt) || text(item.summary);
  const paragraphs = paragraphsFrom(item, excerpt);
  const publishedAt = text(item.publishedAt) || text(item.date);

  if (!slugPattern.test(slug) || !title || paragraphs.length === 0) return null;

  return {
    slug,
    title,
    excerpt: excerpt || paragraphs[0],
    paragraphs,
    publishedAt,
  };
}

export function normalizeArticles(input: unknown): Article[] | null {
  const list = Array.isArray(input)
    ? input
    : input && typeof input === "object" && Array.isArray((input as { articles?: unknown }).articles)
      ? (input as { articles: unknown[] }).articles
      : null;

  if (!list) return null;

  return list
    .map(normalizeArticle)
    .filter((article): article is Article => article !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
