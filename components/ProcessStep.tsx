type ProcessStepProps = {
  number: string;
  title: string;
  text: string;
  variant: "default" | "dark";
};

export function ProcessStep({ number, title, text, variant }: ProcessStepProps) {
  const marked = variant === "dark";

  return (
    <li className={`grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-2 border-t py-7 sm2:grid-cols-[5.5rem_minmax(0,0.85fr)_minmax(0,1.15fr)] sm2:items-start sm2:gap-x-8 ${marked ? "border-forest" : "border-line"}`}>
      <span className={`font-display text-[2rem] leading-none font-extrabold tracking-[-0.04em] sm2:text-[2.6rem] ${marked ? "text-forest" : "text-ink"}`}>{number}</span>
      <h3 className="self-center text-[1.25rem] sm2:self-start">{title}</h3>
      <p className="col-start-2 text-muted sm2:col-start-3">{text}</p>
    </li>
  );
}
