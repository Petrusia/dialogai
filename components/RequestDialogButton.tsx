"use client";

import { useInquiryDialog } from "@/components/InquiryDialog";
import { Mark } from "@/components/Mark";
import { ArrowRight } from "@/components/marks";
import { btnDark } from "@/lib/ui";

type RequestDialogButtonProps = {
  variant: "nav" | "dark";
  children: string;
  className?: string;
};

export function RequestDialogButton({ variant, children, className = "" }: RequestDialogButtonProps) {
  const openInquiry = useInquiryDialog();
  const variantClass = variant === "nav" ? "max-lg2:hidden" : "";

  return (
    <button type="button" className={`${btnDark} ${variantClass} ${className}`} onClick={(event) => openInquiry(event.currentTarget)}>
      {children}
      {variant === "dark" ? <Mark icon={ArrowRight} size={28} className="text-current" /> : null}
    </button>
  );
}
