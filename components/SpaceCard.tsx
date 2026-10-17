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
    <article className={`flex h-full flex-col overflow-hidden rounded-card-lg border ${dark ? "border-ink bg-ink" : "border-line bg-white"}`}>
      <div className="relative aspect-[3/2]">
        <Image src={src} alt="" fill sizes="(min-width: 1025px) 30vw, (min-width: 701px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className={dark ? "text-white" : "text-ink"}>{title}</h3>
        <p className={`mt-2 ${dark ? "text-white/80" : "text-muted"}`}>{text}</p>
      </div>
    </article>
  );
}
