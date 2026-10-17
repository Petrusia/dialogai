import Image from "next/image";

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
    <article className={`group grid items-center gap-5 rounded-xl border border-border-sand/65 p-[1.35rem] shadow-card transition duration-450 ease-soft hover:-translate-y-0.5 hover:shadow-soft sm2:min-h-[158px] sm2:grid-cols-[92px_1fr] ${surfaces[variant]}`}>
      <div className={`relative size-[84px] overflow-hidden rounded-full border-[5px] bg-mint sm2:size-[92px] ${dark ? "border-mint/90 shadow-dark" : "border-white/90 shadow-hover"}`}>
        <Image src={src} alt="" fill sizes="92px" className="object-cover transition-transform duration-650 ease-soft group-hover:scale-105" />
      </div>
      <div>
        <p className={`mb-1 text-[0.72rem] font-black tracking-[0.18em] uppercase ${dark ? "text-mint" : "text-forest"}`}>{kicker}</p>
        <h3 className={`text-[1.35rem] ${dark ? "text-white" : "text-ink"}`}>{title}</h3>
        <span className={`mt-2 block leading-6 ${dark ? "text-white/75" : "text-muted"}`}>{text}</span>
      </div>
    </article>
  );
}
