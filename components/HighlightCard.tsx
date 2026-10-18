import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";

type HighlightCardProps = {
  title: string;
  text: string;
};

export function HighlightCard({ title, text }: HighlightCardProps) {
  const icon = iconFor[title];

  return (
    <article className="border-t border-line pt-6">
      {icon ? <Mark icon={icon} size={52} /> : null}
      <h2 className="mt-4 text-h3">{title}</h2>
      <p className="mt-3 text-muted">{text}</p>
    </article>
  );
}
