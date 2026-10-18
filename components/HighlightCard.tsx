import type { Icon } from "@phosphor-icons/react";
import { Mark } from "@/components/Mark";
import { ChatsCircle, Scales, ShieldCheck } from "@/components/marks";

const promiseIcons: Record<string, Icon> = {
  "Ne debatai": ChatsCircle,
  "Nešališka struktūra": Scales,
  "Saugiai drąsu": ShieldCheck,
};

type HighlightCardProps = {
  title: string;
  text: string;
};

export function HighlightCard({ title, text }: HighlightCardProps) {
  const icon = promiseIcons[title];

  return (
    <article className="border-t border-line pt-6">
      {icon ? <Mark icon={icon} size={32} /> : null}
      <h2 className="mt-4 text-h3">{title}</h2>
      <p className="mt-3 text-muted">{text}</p>
    </article>
  );
}
