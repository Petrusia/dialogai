import { Mark } from "@/components/Mark";
import { CaretDown } from "@/components/marks";

type FaqItemProps = {
  question: string;
  answer: string;
  open?: boolean;
};

export function FaqItem({ question, answer, open = false }: FaqItemProps) {
  return (
    <details open={open} className="group mt-4 bg-cream p-4 first:mt-5">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-black text-ink [&::-webkit-details-marker]:hidden">
        {question}
        <Mark icon={CaretDown} size={18} className="mt-1 text-forest transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-muted">{answer}</p>
    </details>
  );
}
