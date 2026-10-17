import Image from "next/image";

type HighlightCardProps = {
  src: string;
  title: string;
  text: string;
};

export function HighlightCard({ src, title, text }: HighlightCardProps) {
  return (
    <article className="overflow-hidden rounded-card-lg border border-line bg-cream">
      <div className="relative aspect-[16/10]">
        <Image src={src} alt="" fill sizes="(min-width: 1025px) 30vw, (min-width: 701px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="p-6">
        <h2 className="text-h3">{title}</h2>
        <p className="mt-3 text-muted">{text}</p>
      </div>
    </article>
  );
}
