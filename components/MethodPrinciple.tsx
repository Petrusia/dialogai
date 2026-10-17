type MethodPrincipleProps = {
  number: string;
  title: string;
  text: string;
};

export function MethodPrinciple({ number, title, text }: MethodPrincipleProps) {
  return (
    <article className="border-t border-line pt-6">
      <p className="font-display text-[2.75rem] leading-none font-extrabold tracking-[-0.04em] text-forest">{number}</p>
      <h3 className="mt-5 max-w-[16ch] text-h3">{title}</h3>
      <p className="mt-3 text-muted">{text}</p>
    </article>
  );
}
