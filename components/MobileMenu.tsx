import { headerNav } from "@/lib/content";
import { NavLink } from "@/components/NavLink";

type MobileMenuProps = {
  open: boolean;
  activeId: string;
  onNavigate: () => void;
};

export function MobileMenu({ open, activeId, onNavigate }: MobileMenuProps) {
  return (
    <nav
      id="main-nav"
      aria-label="Pagrindinė navigacija"
      className={
        open
          ? "absolute inset-x-0 top-[calc(100%+0.6rem)] grid rounded-card bg-white p-3 shadow-card lg2:static lg2:flex lg2:items-center lg2:gap-7 lg2:bg-transparent lg2:p-0 lg2:shadow-none"
          : "hidden lg2:flex lg2:items-center lg2:gap-7"
      }
    >
      {headerNav.map((item) => (
        <NavLink
          key={item.id}
          href={item.href}
          active={activeId === item.id}
          onClick={onNavigate}
          className="px-4 py-3 lg2:px-0 lg2:py-0"
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
