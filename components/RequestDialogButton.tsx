"use client";

import { useInquiryDialog } from "@/components/InquiryDialog";
import { btnDark } from "@/lib/ui";

type RequestDialogButtonProps = {
  variant: "nav" | "dark";
  children: string;
  className?: string;
};

export function RequestDialogButton({ variant, children, className = "" }: RequestDialogButtonProps) {
  const openInquiry = useInquiryDialog();
  const variantClass = variant === "nav" ? "hidden lg2:inline-flex" : "";

  return (
    <button type="button" className={`${btnDark} ${variantClass} ${className}`} onClick={(event) => openInquiry(event.currentTarget)}>
      {children}
    </button>
  );
}
