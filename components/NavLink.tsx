import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";

type NavLinkProps = {
  href: string;
  active?: boolean;
  children: string;
  onClick?: () => void;
  className?: string;
};

export function NavLink({ href, active = false, children, onClick, className = "" }: NavLinkProps) {
  const icon = iconFor[children];

  return (
    <a
      href={href}
      aria-current={active ? "true" : undefined}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 text-[0.9rem] font-extrabold text-ink/80 transition-colors duration-450 ease-soft hover:text-forest after:absolute after:-bottom-[3px] after:left-0 after:hidden after:h-0.5 after:w-full after:origin-left after:bg-forest after:transition-transform after:duration-350 after:ease-soft lg2:after:block ${active ? "text-forest lg2:after:scale-x-100" : "lg2:after:scale-x-0"} ${className}`}
    >
      {icon ? <Mark icon={icon} size={26} className="text-forest [@media(min-width:1025px)_and_(max-width:1279px)]:hidden" /> : null}
      {children}
    </a>
  );
}
