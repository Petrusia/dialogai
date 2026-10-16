type NavLinkProps = {
  href: string;
  active?: boolean;
  children: string;
  onClick?: () => void;
  className?: string;
};

export function NavLink({ href, active = false, children, onClick, className = "" }: NavLinkProps) {
  return (
    <a
      href={href}
      aria-current={active ? "true" : undefined}
      onClick={onClick}
      className={`relative text-[0.9rem] font-extrabold text-ink/80 transition-colors duration-450 ease-soft hover:text-forest after:absolute after:-bottom-[3px] after:left-0 after:hidden after:h-0.5 after:w-full after:origin-left after:bg-forest after:transition-transform after:duration-350 after:ease-soft lg2:after:block ${active ? "text-forest lg2:after:scale-x-100" : "lg2:after:scale-x-0"} ${className}`}
    >
      {children}
    </a>
  );
}
