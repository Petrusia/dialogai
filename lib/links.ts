import { site } from "@/lib/site";

const subject = "Prašymas inicijuoti Viešą dialogą";

const body = [
  "Sveiki,",
  "",
  "Norėtume pasiteirauti dėl galimybės inicijuoti Viešą dialogą mūsų erdvėje / bendruomenėje.",
  "",
  "Prašome susisiekti dėl tolimesnių žingsnių.",
  "",
  "Miestas / vieta: ",
  "Organizacija / bendruomenė: ",
  "Tema, kuri mums rūpi: ",
  "Trumpas situacijos aprašymas: ",
  "",
  "Pagarbiai,",
].join("\r\n");

export const REQUEST_DIALOG_MAILTO = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const externalLinks = {
  nansen: "https://peace.no/en/",
  buyMeACoffee: "https://buymeacoffee.com/domussolis",
  patreon: "https://www.patreon.com/c/DomusSolis",
  facebook: "https://www.facebook.com/domussolis.org",
} as const;
