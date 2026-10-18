type HighlightCardProps = {
  title: string;
  text: string;
};

export function HighlightCard({ title, text }: HighlightCardProps) {
  return (
    <article className="border-t border-line pt-6">
      <h2 className="text-h3">{title}</h2>
      <p className="mt-3 text-muted">{text}</p>
    </article>
  );
}
