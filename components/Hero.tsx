import { HeroMorph } from "@/components/HeroMorph";
import { HeroStats } from "@/components/HeroStats";
import { Mark } from "@/components/Mark";
import { RequestDialogButton } from "@/components/RequestDialogButton";
import { ChatsCircle } from "@/components/marks";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero-band pt-[7.5rem] sm2:pt-hero-top">
      <div className="container-site grid gap-8 pb-16 sm2:gap-10 sm2:pb-24 lg2:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg2:items-center lg2:gap-16">
        <div className="contents lg2:block">
          <div className="order-1 max-w-prose-hero">
            <Mark icon={ChatsCircle} size={40} />
            <h1 className="mt-4 text-[clamp(2.05rem,4vw,3.25rem)] leading-[1.08]">
              {hero.title}
              <span className="mt-2 block text-forest">{hero.accent}</span>
            </h1>
            <p className="mt-6 max-w-[38rem] text-lg leading-8 text-slate-soft sm2:text-xl">{hero.lead}</p>
            <div className="mt-8">
              <RequestDialogButton variant="dark" className="w-full sm2:w-auto">
                {hero.cta}
              </RequestDialogButton>
            </div>
          </div>
          <HeroStats className="order-3 lg2:mt-8" />
        </div>
        <HeroMorph />
      </div>
    </section>
  );
}
