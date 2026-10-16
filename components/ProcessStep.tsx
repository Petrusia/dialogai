type ProcessStepProps = {
  number: string;
  title: string;
  text: string;
  variant: "default" | "dark";
};

export function ProcessStep({ number, title, text, variant }: ProcessStepProps) {
  const dark = variant === "dark";

  return (
    <article className={`grid grid-cols-1 items-center gap-5 rounded-xl border border-border-sand/60 p-5 shadow-card sm2:grid-cols-[120px_1fr] ${dark ? "bg-ink" : "bg-cream"}`}>
      <b className={`grid size-20 place-items-center rounded-[1.4rem] text-2xl font-black ${dark ? "bg-mint text-ink" : "bg-gradient-to-br from-ink to-forest text-mint"}`}>{number}</b>
      <div>
        <h3 className={dark ? "text-white" : "text-ink"}>{title}</h3>
        <p className={`mt-2 ${dark ? "text-white/75" : "text-muted"}`}>{text}</p>
      </div>
    </article>
  );
}
