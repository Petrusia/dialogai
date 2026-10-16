import { hero } from "@/lib/content";

export function HeroStats() {
  return (
    <div className="mt-9 grid gap-4 sm2:max-w-[720px] sm2:grid-cols-3">
      {hero.stats.map((stat) => (
        <article
          key={stat.label}
          className="relative overflow-hidden rounded-[1.45rem] border border-white/75 bg-gradient-to-br from-white/85 to-white/60 px-[1.2rem] py-[1.15rem] shadow-[0_14px_34px_rgba(7,63,56,0.09)] backdrop-blur-[14px] transition duration-450 ease-soft before:absolute before:-top-10 before:-right-10 before:size-[7.2rem] before:rounded-full before:bg-[radial-gradient(circle,rgba(221,241,232,0.95),rgba(221,241,232,0)_68%)] after:absolute after:bottom-0 after:left-[1.2rem] after:h-1 after:w-[42%] after:rounded-t-full after:bg-gradient-to-r after:from-forest after:to-forest/20 hover:-translate-y-0.5 sm2:min-h-32"
        >
          <small className="relative z-[1] mb-2.5 inline-flex text-[0.68rem] font-black tracking-[0.18em] text-forest uppercase">{stat.label}</small>
          <strong className="relative z-[1] block font-display text-[clamp(2rem,3vw,2.75rem)] leading-none font-extrabold tracking-[-0.04em] text-ink">{stat.value}</strong>
          <span className="relative z-[1] mt-2 block text-[0.82rem] leading-tight font-black tracking-[0.08em] text-slate-soft uppercase">{stat.note}</span>
        </article>
      ))}
    </div>
  );
}
