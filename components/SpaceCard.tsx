import Image from "next/image";
import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";

type SpaceCardProps = {
  src: string;
  title: string;
  text: string;
};

export function SpaceCard({ src, title, text }: SpaceCardProps) {
  return (
    <article className="grid gap-6 border-t border-line py-10 lg2:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.85fr)] lg2:items-center lg2:gap-x-16 lg2:py-12">
      <div>
        <h3 className="flex items-start gap-4 font-display text-[clamp(2.15rem,4vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
          {iconFor[title] ? <Mark icon={iconFor[title]} size={48} className="mt-1" /> : null}
          <span className="min-w-0">{title}</span>
        </h3>
        <p className="mt-4 max-w-md text-lg leading-8 text-slate-soft">{text}</p>
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt="" fill sizes="(min-width: 1025px) 38vw, 100vw" className="object-cover" />
      </div>
    </article>
  );
}
