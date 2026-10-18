import { WhyCard } from "@/components/WhyCard";
import { why } from "@/lib/content";
import { kicker, sectionY } from "@/lib/ui";

export function WhySection() {
  return (
    <section id="kodel" className={`${sectionY} bg-white`}>
      <div className="container-site grid items-stretch gap-12 lg2:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center rounded-xl border border-border-sand/60 bg-cream p-8 shadow-soft">
          <p className={kicker}>{why.kicker}</p>
          <h2 className="mt-4 text-[clamp(2.2rem,3.6vw,3.6rem)]">{why.title}</h2>
          <div className="mt-8 grid gap-5 text-lead leading-7 text-slate-soft">
            {why.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {why.cards.map((card) => (
            <WhyCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
