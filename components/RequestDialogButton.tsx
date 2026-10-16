import { REQUEST_DIALOG_MAILTO } from "@/lib/links";
import { btnDark } from "@/lib/ui";

type RequestDialogButtonProps = {
  variant: "nav" | "dark";
  children: string;
  className?: string;
};

export function RequestDialogButton({ variant, children, className = "" }: RequestDialogButtonProps) {
  const variantClass = variant === "nav" ? "hidden lg2:inline-flex" : "bg-ink";

  return (
    <a href={REQUEST_DIALOG_MAILTO} className={`${btnDark} ${variantClass} ${className}`}>
      {children}
    </a>
  );
}
