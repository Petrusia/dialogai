export const site = {
  name: "Domus Solis",
  wordmark: "dialogai.lt",
  title: "Viešasis dialogas | Domus Solis",
  description:
    "Viešieji dialogai bendruomenėms, organizacijoms ir viešosioms erdvėms – atvirai, giliai, be pykčio.",
  url: "https://dialogai.lt",
  email: "info@domussolis.org",
} as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.wordmark,
  url: `${site.url}/`,
  email: site.email,
  sameAs: ["https://www.facebook.com/domussolis.org"],
  description: site.description,
  offers: {
    "@type": "Offer",
    name: "Viešojo dialogo sesija",
    description:
      "Struktūruotas, nešališkai fasilituojamas pokalbis bendro intereso tema. Trukmė 90–120 min., 12–60 dalyvių.",
  },
};

export function jsonForHtml(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
}
