import Image from "next/image";
import { HeroStats } from "@/components/HeroStats";
import { RequestDialogButton } from "@/components/RequestDialogButton";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="pt-[7.5rem] sm2:pt-hero-top">
      <div className="container-site grid gap-8 pb-16 sm2:gap-10 sm2:pb-24 lg2:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg2:items-center lg2:gap-16">
        <div className="contents lg2:block">
          <div className="order-1 max-w-prose-hero">
            <h1 className="text-[clamp(2.5rem,7vw,4.6rem)] leading-[1.02]">
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
          <HeroStats className="order-3 lg2:mt-10" />
        </div>
        <figure className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
          <Image
            src="/assets/hero.webp"
            alt="Žmonės sėdi ratu pievoje prie upės ir kalbasi."
            fill
            preload
            sizes="(min-width: 1025px) 46vw, 100vw"
            className="object-cover object-[center_42%]"
          />
        </figure>
      </div>
    </section>
  );
}
