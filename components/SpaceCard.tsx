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
    <article className="grid h-full grid-cols-[1fr_2fr] border border-line bg-white">
      <div className="relative min-h-28">
        <Image src={src} alt="" fill sizes="(min-width: 1025px) 12vw, 33vw" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-col justify-center p-4 sm2:p-5">
        <h3 className="flex items-center gap-2 font-display text-[1.15rem] leading-tight font-extrabold tracking-[-0.03em] sm2:text-[1.3rem]">
          {icon ? <Mark icon={icon} size={24} /> : null}
          <span className="min-w-0">{title}</span>
        </h3>
        <p className="mt-1.5 text-[0.92rem] leading-6 text-slate-soft">{text}</p>
      </div>
    </article>
  );
}
