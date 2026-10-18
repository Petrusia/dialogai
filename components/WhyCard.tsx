import Image from "next/image";
import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";

type WhyCardProps = {
  src: string;
  kicker: string;
  title: string;
  text: string;
  variant: "dark" | "default" | "soft";
};

const surfaces = {
  dark: "bg-gradient-to-br from-ink to-forest text-white",
  default: "bg-white",
  soft: "bg-gradient-to-br from-mint via-cream to-sand",
};

export function WhyCard({ src, kicker, title, text, variant }: WhyCardProps) {
  const dark = variant === "dark";

  return (
    <article className={`grid min-w-0 grid-cols-[5.25rem_minmax(0,1fr)] items-center gap-3 rounded-xl border border-border-sand/65 p-4 sm2:grid-cols-[7.25rem_minmax(0,1fr)] sm2:gap-5 sm2:p-5 ${surfaces[variant]}`}>
      <div className="relative h-[5.4rem] overflow-hidden rounded-lg">
        <Image src={src} alt="" fill sizes="124px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className={`mb-1 text-[0.72rem] font-black tracking-[0.18em] uppercase ${dark ? "text-mint" : "text-forest"}`}>{kicker}</p>
        <h3 className={`flex items-start gap-2 text-[1.25rem] sm2:text-[1.35rem] ${dark ? "text-white" : "text-ink"}`}>
          {iconFor[title] ? <Mark icon={iconFor[title]} size={32} className={`mt-0.5 ${dark ? "text-mint" : "text-forest"}`} /> : null}
          <span className="min-w-0">{title}</span>
        </h3>
        <span className={`mt-2 block leading-6 ${dark ? "text-white/75" : "text-muted"}`}>{text}</span>
      </div>
    </article>
  );
}
