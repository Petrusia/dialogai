import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";
import { Coffee, Heart } from "@/components/marks";
import { SupportLink } from "@/components/SupportLink";
import { support } from "@/lib/content";
import { externalLinks } from "@/lib/links";
import { kicker, sectionY } from "@/lib/ui";

const links = [
  { href: externalLinks.buyMeACoffee, title: "Buy Me a Coffee", note: "Vienkartinė parama", icon: Coffee },
  { href: externalLinks.patreon, title: "Patreon", note: "Nuolatinė parama", icon: Heart },
];

export function SupportSection() {
  return (
    <section id="parama" className={sectionY}>
      <div className="container-site grid items-center gap-8 rounded-xl border border-border-sand/60 bg-white p-8 shadow-card lg2:grid-cols-[1fr_1.2fr]">
        <div>
          <p className={kicker}>{support.kicker}</p>
          <h2 className="mt-4 flex items-start gap-3 text-h2">
            <Mark icon={iconFor[support.title]} size={36} className="mt-0.5" />
            <span className="min-w-0">{support.title}</span>
          </h2>
          {support.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-slate-soft">
              {paragraph}
            </p>
          ))}
          <p className="mt-4 text-slate-soft">
            <b className="text-ink">Paskirtis:</b> „{support.purpose}“.
          </p>
        </div>
        <div className="grid gap-4 sm2:grid-cols-2">
          {links.map((link) => (
            <SupportLink key={link.href} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}
