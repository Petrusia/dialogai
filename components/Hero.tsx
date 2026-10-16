import Image from "next/image";
import { HeroStats } from "@/components/HeroStats";
import { RequestDialogButton } from "@/components/RequestDialogButton";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate flex items-center overflow-hidden pt-[7.5rem] sm2:pt-hero-top lg2:min-h-svh">
      <Image
        src="/assets/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center lg2:object-right"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,247,239,0.98)_0%,rgba(251,247,239,0.93)_56%,rgba(251,247,239,0.78)_100%)] sm2:bg-[linear-gradient(180deg,rgba(251,247,239,0.98)_0%,rgba(251,247,239,0.92)_52%,rgba(251,247,239,0.72)_100%)] lg2:bg-[linear-gradient(90deg,rgba(251,247,239,0.97)_0%,rgba(251,247,239,0.91)_38%,rgba(251,247,239,0.62)_68%,rgba(251,247,239,0.36)_100%),linear-gradient(180deg,rgba(7,63,56,0.04),rgba(7,63,56,0.2))]"
      />
      <div className="container-site relative z-[1] pt-8 pb-16 sm2:pb-24">
        <div className="max-w-prose-hero animate-rise motion-reduce:animate-none">
          <h1 className="max-w-prose-hero text-[clamp(2.35rem,11vw,3.55rem)] leading-[1.04] sm2:text-display">
            {hero.title} <span className="block text-forest">{hero.accent}</span>
          </h1>
          <p className="mt-7 max-w-[42rem] text-xl leading-8 text-slate-soft lg2:max-w-[680px]">{hero.lead}</p>
          <div className="mt-9">
            <RequestDialogButton variant="dark" className="min-w-[260px]">
              {hero.cta}
            </RequestDialogButton>
          </div>
          <HeroStats />
        </div>
      </div>
    </section>
  );
}
