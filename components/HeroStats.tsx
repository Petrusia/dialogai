import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";
import { hero } from "@/lib/content";
import { numeral } from "@/lib/ui";

type HeroStatsProps = {
  className?: string;
};

export function HeroStats({ className = "" }: HeroStatsProps) {
  return (
    <dl className={`grid grid-cols-3 gap-x-3 border-t border-line pt-4 ${className}`}>
      {hero.stats.map((stat) => (
        <div key={stat.label} className="min-w-0">
          <dt className="flex items-center gap-1.5 text-[0.65rem] leading-none font-bold tracking-[0.12em] text-forest uppercase">
            {iconFor[stat.label] ? <Mark icon={iconFor[stat.label]} size={18} /> : null}
            <span className="min-w-0">{stat.label}</span>
          </dt>
          <dd className={`mt-1.5 text-[1.15rem] leading-none text-ink sm2:text-[1.35rem] ${numeral}`}>
            {stat.value}
            <span className="mt-1 block text-[0.72rem] leading-tight font-medium tracking-normal text-muted normal-case">{stat.note}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
