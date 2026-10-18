import Image from "next/image";
import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";

type SpaceCardProps = {
  src: string;
  title: string;
  text: string;
};

export function SpaceCard({ src, title, text }: SpaceCardProps) {
  const icon = iconFor[title];

  return (
    <article className="grid grid-cols-[4.5rem_1fr] items-start gap-3 border border-line bg-white p-4 sm2:flex sm2:h-full sm2:flex-col sm2:items-stretch sm2:gap-0 sm2:p-0">
      <div className="relative aspect-square sm2:aspect-auto sm2:h-28">
        <Image src={src} alt="" fill sizes="(min-width: 1025px) 28vw, (min-width: 701px) 40vw, 72px" className="object-cover" />
      </div>
      <div className="min-w-0 sm2:flex sm2:flex-1 sm2:flex-col sm2:p-5">
        <h3 className="flex items-center gap-2 font-display text-[1.2rem] leading-tight font-extrabold tracking-[-0.03em] sm2:text-[1.35rem]">
          {icon ? <Mark icon={icon} size={26} /> : null}
          <span className="min-w-0">{title}</span>
        </h3>
        <p className="mt-1.5 text-[0.92rem] leading-6 text-slate-soft">{text}</p>
      </div>
    </article>
  );
}
