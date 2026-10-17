type FaqItemProps = {
  question: string;
  answer: string;
  open?: boolean;
};

export function FaqItem({ question, answer, open = false }: FaqItemProps) {
  return (
    <details open={open} className="mt-4 rounded-card bg-cream p-4 first:mt-5">
      <summary className="cursor-pointer font-black text-ink">{question}</summary>
      <p className="mt-3 text-muted">{answer}</p>
    </details>
  );
}
