"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { RequestDialogButton } from "@/components/RequestDialogButton";
import { sectionIds } from "@/lib/content";
import { site } from "@/lib/site";
import { useActiveSection } from "@/hooks/useActiveSection";

export function SiteHeader() {
  const activeId = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className="group/header fixed inset-x-0 top-0 z-50 px-4 py-4 transition-[padding] duration-300 ease-soft data-[scrolled=true]:py-[0.3rem]"
    >
      <div className="relative mx-auto flex min-h-[72px] w-full max-w-site items-center justify-between gap-5 rounded-card border border-white/70 bg-white/70 px-5 py-3 shadow-card backdrop-blur-[18px] group-data-[scrolled=true]/header:min-h-14 group-data-[scrolled=true]/header:shadow-header">
        <Link
          href="/#top"
          className="font-display text-[1.38rem] leading-none font-extrabold tracking-[-0.035em] text-ink lowercase transition duration-450 ease-soft hover:-translate-y-px hover:text-forest sm2:text-[1.65rem]"
          aria-label={site.wordmark}
        >
          {site.wordmark}
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="flex size-11 flex-col items-center justify-center bg-ink focus-visible:outline-mint lg2:hidden"
          aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="block h-0.5 w-5 bg-white" />
          <span className="mt-[5px] block h-0.5 w-5 bg-white" />
          <span className="mt-[5px] block h-0.5 w-5 bg-white" />
        </button>

        <MobileMenu open={open} activeId={activeId} onNavigate={closeMenu} />
        <RequestDialogButton variant="nav">Paprašyti dialogo</RequestDialogButton>
      </div>
    </header>
  );
}
