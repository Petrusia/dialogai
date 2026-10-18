import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";
import { WhyCard } from "@/components/WhyCard";
import { why } from "@/lib/content";
import { kicker, sectionY } from "@/lib/ui";

export function WhySection() {
  return (
    <section id="kodel" className={`${sectionY} bg-white`}>
      <div className="container-site grid items-stretch gap-12 lg2:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="flex min-w-0 flex-col justify-center rounded-xl border border-border-sand/60 bg-cream p-8 shadow-soft">
          <p className={kicker}>{why.kicker}</p>
          <h2 className="mt-4 flex min-w-0 flex-col items-start gap-3 text-[clamp(2.2rem,3.6vw,3.6rem)] sm2:flex-row sm2:gap-4">
            <Mark icon={iconFor[why.title]} size={48} className="mt-1" />
            <span className="min-w-0">{why.title}</span>
          </h2>
          <div className="mt-8 grid gap-5 text-lead leading-7 text-slate-soft">
            {why.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="grid min-w-0 gap-4">
          {why.cards.map((card) => (
            <WhyCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
