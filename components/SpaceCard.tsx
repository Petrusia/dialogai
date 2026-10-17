import Image from "next/image";

type SpaceCardProps = {
  src: string;
  title: string;
  text: string;
  variant: "default" | "dark";
};

export function SpaceCard({ src, title, text, variant }: SpaceCardProps) {
  const dark = variant === "dark";

  return (
    <article className={`group grid grid-cols-[88px_1fr] items-center gap-4 overflow-hidden rounded-xl border border-border-sand/60 p-5 shadow-card sm2:min-h-[190px] sm2:grid-cols-[118px_1fr] sm2:gap-5 lg2:grid-cols-[132px_1fr] ${dark ? "bg-ink text-white" : "bg-white"}`}>
      <div className={`relative size-[88px] overflow-hidden rounded-full border-[5px] transition-transform duration-450 ease-soft group-hover:scale-[1.015] sm2:size-[118px] lg2:size-[132px] lg2:border-[6px] ${dark ? "border-white/85 shadow-dark" : "border-mint/95 shadow-[0_20px_44px_rgba(7,63,56,0.15)]"}`}>
        <Image src={src} alt="" fill sizes="132px" className="object-cover" />
        <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)]" />
      </div>
      <div>
        <h3 className={dark ? "text-white" : "text-ink"}>{title}</h3>
        <p className={`mt-2 ${dark ? "text-white/80" : "text-muted"}`}>{text}</p>
      </div>
    </article>
  );
}
