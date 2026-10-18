import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";
import { numeral } from "@/lib/ui";

type ProcessStepProps = {
  number: string;
  title: string;
  text: string;
  variant: "default" | "dark";
};

export function ProcessStep({ number, title, text, variant }: ProcessStepProps) {
  const marked = variant === "dark";

  return (
    <li className={`grid grid-cols-[2.75rem_1fr] items-start gap-x-3 gap-y-1 border-t py-5 sm2:grid-cols-[4.25rem_minmax(0,0.9fr)_minmax(0,1.15fr)] sm2:gap-x-8 ${marked ? "border-forest" : "border-line"}`}>
      <span className={`pt-0.5 text-[clamp(1.65rem,2.2vw,2.15rem)] leading-none ${numeral} ${marked ? "text-forest" : "text-ink"}`}>{number}</span>
      <h3 className="flex items-start gap-2.5 text-[1.2rem] sm2:text-[1.35rem]">
        {iconFor[title] ? <Mark icon={iconFor[title]} size={36} className="mt-0.5" /> : null}
        <span className="min-w-0">{title}</span>
      </h3>
      <p className="col-start-2 text-muted sm2:col-start-3">{text}</p>
    </li>
  );
}
