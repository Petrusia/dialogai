type MethodPrincipleProps = {
  number: string;
  title: string;
  text: string;
};

export function MethodPrinciple({ number, title, text }: MethodPrincipleProps) {
  return (
    <article className="rounded-card-lg border border-border-sand/55 bg-cream p-6 shadow-card transition duration-450 ease-soft hover:-translate-y-0.5 hover:shadow-soft">
      <b className="inline-flex rounded-full bg-ink px-4 py-2 text-white">{number}</b>
      <h3 className="mt-8 text-h3">{title}</h3>
      <p className="mt-4 text-muted">{text}</p>
    </article>
  );
}
