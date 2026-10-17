import type { ReactNode } from "react";
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
      <h2 className={`mt-4 text-[2.3rem] ${dark ? "text-white" : ""}`}>{title}</h2>
      {children}
    </article>
  );
}
