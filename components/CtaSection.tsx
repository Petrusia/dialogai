import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";
import { RequestDialogButton } from "@/components/RequestDialogButton";
import { cta, hero } from "@/lib/content";
import { kicker } from "@/lib/ui";

export function CtaSection() {
  return (
    <section id="uzklausa" className="bg-dark-mesh py-16 text-white sm2:py-section">
      <div className="container-site grid items-start gap-12 lg2:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className={`${kicker} text-mint`}>{cta.kicker}</p>
          <Mark icon={iconFor[cta.title]} size={40} className="mt-4 text-mint" />
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3vw,2.85rem)] leading-[1.12] font-extrabold text-white">{cta.title}</h2>
          {cta.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lead text-white/80">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="rounded-xl bg-white p-6 text-ink shadow-soft">
          <h3 className="flex items-start gap-3">
            <Mark icon={iconFor[cta.boxTitle]} size={36} className="mt-0.5" />
            <span className="min-w-0">{cta.boxTitle}</span>
          </h3>
          <p className="mt-4 text-muted">{cta.boxText}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <Mark icon={iconFor[stat.label]} size={28} />
                <dt className="mt-2 font-display text-[1.35rem] leading-none font-extrabold text-ink">{stat.value}</dt>
                <dd className="mt-2 text-xs leading-snug font-semibold text-muted">{stat.note}</dd>
              </div>
            ))}
          </dl>
          <RequestDialogButton variant="dark" className="mt-6 w-full">
            {cta.button}
          </RequestDialogButton>
        </div>
      </div>
    </section>
  );
}
