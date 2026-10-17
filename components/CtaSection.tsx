import { RequestDialogButton } from "@/components/RequestDialogButton";
import { cta, hero } from "@/lib/content";
import { kicker } from "@/lib/ui";

export function CtaSection() {
  return (
    <section id="uzklausa" className="bg-dark-mesh py-16 text-white sm2:py-section">
      <div className="container-site grid items-start gap-12 lg2:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className={`${kicker} text-mint`}>{cta.kicker}</p>
          <h2 className="mt-4 font-display text-[clamp(3rem,5vw,5rem)] font-extrabold text-white">{cta.title}</h2>
          {cta.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lead text-white/80">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="rounded-xl bg-white p-6 text-ink shadow-soft">
          <h3>{cta.boxTitle}</h3>
          <p className="mt-4 text-muted">{cta.boxText}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="font-display text-[1.35rem] leading-none font-extrabold text-ink">{stat.value}</dt>
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
