import type { ReactNode } from "react";
import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";
import { kicker } from "@/lib/ui";

type InfoCardProps = {
  kicker: string;
  title: string;
  tone?: "default" | "dark";
  children: ReactNode;
  className?: string;
};

export function InfoCard({ kicker: eyebrow, title, tone = "default", children, className = "" }: InfoCardProps) {
  const dark = tone === "dark";

  return (
    <article className={`rounded-card-lg p-6 shadow-card ${dark ? "bg-ink text-white" : "border border-border-sand/55 bg-cream"} ${className}`}>
      <p className={`${kicker} ${dark ? "text-mint" : ""}`}>{eyebrow}</p>
      <h2 className={`mt-4 flex items-start gap-3 text-[1.65rem] leading-[1.15] ${dark ? "text-white" : ""}`}>
        {iconFor[title] ? <Mark icon={iconFor[title]} size={32} className={`mt-0.5 ${dark ? "text-mint" : "text-forest"}`} /> : null}
        <span className="min-w-0">{title}</span>
      </h2>
      {children}
    </article>
  );
}
