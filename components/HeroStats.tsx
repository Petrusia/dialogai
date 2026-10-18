import type { Icon } from "@phosphor-icons/react";
import { Mark } from "@/components/Mark";
import { Clock, UserCircle, UsersThree } from "@/components/marks";
import { hero } from "@/lib/content";

const statIcons: Record<string, Icon> = {
  trukmė: Clock,
  grupė: UsersThree,
  komanda: UserCircle,
};

type HeroStatsProps = {
  className?: string;
};

export function HeroStats({ className = "" }: HeroStatsProps) {
  return (
    <dl className={`grid grid-cols-3 gap-3 border-t border-line pt-6 ${className}`}>
      {hero.stats.map((stat) => (
        <div key={stat.label} className="min-w-0">
          {statIcons[stat.label] ? <Mark icon={statIcons[stat.label]} size={22} /> : null}
          <dt className="mt-3 text-[0.68rem] font-black tracking-[0.16em] text-forest uppercase">{stat.label}</dt>
          <dd className="mt-2 font-display text-[clamp(1.65rem,3vw,2.6rem)] leading-none font-extrabold tracking-[-0.04em] text-ink">
            {stat.value}
            <span className="mt-2 block text-xs leading-snug font-semibold tracking-normal text-muted normal-case">{stat.note}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
