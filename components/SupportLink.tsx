import type { Icon } from "@phosphor-icons/react";
import { Mark } from "@/components/Mark";

type SupportLinkProps = {
  href: string;
  title: string;
  note: string;
  icon: Icon;
};

export function SupportLink({ href, title, note, icon }: SupportLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-28 items-center gap-4 bg-cream p-[1.35rem] shadow-xs transition duration-450 ease-soft hover:-translate-y-0.5 hover:bg-mint hover:shadow-card"
    >
      <Mark icon={icon} size={32} />
      <span>
        <span className="block text-lead font-black text-ink">{title}</span>
        <small className="mt-1 block text-[0.82rem] font-extrabold text-muted">{note}</small>
      </span>
    </a>
  );
}
