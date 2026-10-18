import type { Icon } from "@phosphor-icons/react";

type MarkProps = {
  icon: Icon;
  size?: number;
  className?: string;
};

export function Mark({ icon: Glyph, size = 28, className = "text-forest" }: MarkProps) {
  return <Glyph aria-hidden="true" weight="light" size={size} className={`shrink-0 ${className}`} />;
}
