import Image from "next/image";

type HighlightCardProps = {
  src: string;
  title: string;
  text: string;
};

export function HighlightCard({ src, title, text }: HighlightCardProps) {
  return (
    <article className="group rounded-card-lg border border-border-sand/55 bg-cream p-6 shadow-card">
      <div className="relative size-16 overflow-hidden rounded-full border-4 border-mint/95 bg-mint shadow-hover sm2:size-[72px] sm2:border-[5px]" aria-hidden="true">
        <Image src={src} alt="" fill sizes="72px" className="object-cover transition-transform duration-650 ease-soft group-hover:scale-110" />
      </div>
      <h2 className="mt-5 text-h3">{title}</h2>
      <p className="mt-4 text-muted">{text}</p>
    </article>
  );
}
