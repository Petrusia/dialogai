type ProcessStepProps = {
  number: string;
  title: string;
  text: string;
  variant: "default" | "dark";
};

export function ProcessStep({ number, title, text, variant }: ProcessStepProps) {
  const marked = variant === "dark";

  return (
    <li className={`grid grid-cols-[4.75rem_1fr] items-start gap-x-4 gap-y-2 border-t py-8 sm2:grid-cols-[8.5rem_minmax(0,0.9fr)_minmax(0,1.15fr)] sm2:gap-x-10 ${marked ? "border-forest" : "border-line"}`}>
      <span className={`font-display text-[clamp(3.1rem,4.6vw,4.75rem)] leading-[0.8] font-extrabold tracking-[-0.05em] ${marked ? "text-forest" : "text-ink"}`}>{number}</span>
      <h3 className="pt-1 text-[1.3rem] sm2:pt-3 sm2:text-[1.55rem]">{title}</h3>
      <p className="col-start-2 text-muted sm2:col-start-3">{text}</p>
    </li>
  );
}
