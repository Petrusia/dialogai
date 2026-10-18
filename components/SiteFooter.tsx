import Link from "next/link";
import { Mark } from "@/components/Mark";
import { EnvelopeSimple, FacebookLogo } from "@/components/marks";
import { footer, footerNav } from "@/lib/content";
import { externalLinks } from "@/lib/links";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream pt-12 pb-8">
      <div className="container-site grid gap-10 sm2:grid-cols-[1.1fr_0.9fr_1fr]">
        <div>
          <Link href="/#top" className="font-display text-[1.55rem] leading-none font-extrabold tracking-[-0.035em] text-ink lowercase sm2:text-[1.8rem]" aria-label={site.wordmark}>
            {site.wordmark}
          </Link>
          <p className="mt-4 max-w-[360px] text-[0.95rem] text-muted">{site.description}</p>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-black tracking-[0.2em] text-forest uppercase">Navigacija</h2>
          {footerNav.map((item) => (
            <a key={item.href} href={item.href} className="mt-3 block font-extrabold text-muted transition-colors duration-450 ease-soft hover:text-forest">
              {item.label}
            </a>
          ))}
        </div>
        <div className="sm2:text-right">
          <h2 className="mb-4 text-xs font-black tracking-[0.2em] text-forest uppercase">Kontaktai</h2>
          <a href={`mailto:${site.email}`} className="mt-2 inline-flex items-center gap-2 font-black text-forest">
            <Mark icon={EnvelopeSimple} size={18} />
            {site.email}
          </a>
          <div className="mt-5 flex flex-wrap gap-3 sm2:justify-end">
            <a
              href={externalLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-facebook px-4 py-2.5 text-xs font-black text-white shadow-facebook transition duration-450 ease-soft hover:-translate-y-0.5 hover:bg-facebook-hover hover:shadow-[0_14px_30px_rgba(24,119,242,0.28)]"
            >
              <Mark icon={FacebookLogo} size={18} className="text-white" />
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="container-site mt-8 border-t border-line pt-6 text-[0.9rem] text-muted">
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}
