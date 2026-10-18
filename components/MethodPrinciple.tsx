import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";

type MethodPrincipleProps = {
  number: string;
  title: string;
  text: string;
};

export function MethodPrinciple({ number, title, text }: MethodPrincipleProps) {
  return (
    <article className="border-t border-line pt-6">
      <p className="text-[1.75rem] leading-none font-semibold tracking-normal text-forest tabular-nums">{number}</p>
      <h3 className="mt-3 flex max-w-[22ch] items-start gap-3 text-h3">
        {iconFor[title] ? <Mark icon={iconFor[title]} size={40} className="mt-0.5" /> : null}
        <span className="min-w-0">{title}</span>
      </h3>
      <p className="mt-3 text-muted">{text}</p>
    </article>
  );
}
