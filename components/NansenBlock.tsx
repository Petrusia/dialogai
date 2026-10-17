import Image from "next/image";
import { nansen } from "@/lib/content";
import { externalLinks } from "@/lib/links";
import { btnMint, kicker } from "@/lib/ui";

export function NansenBlock() {
  return (
    <div className="mt-16 grid overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-forest to-ink-deep text-white shadow-soft lg2:grid-cols-2">
      <div className="relative min-h-72 lg2:min-h-full">
        <Image src={nansen.image} alt={nansen.alt} fill sizes="(min-width: 1025px) 40vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col justify-center p-8 sm2:p-12">
        <p className={`${kicker} text-mint`}>{nansen.originKicker}</p>
        <h3 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-extrabold text-white">{nansen.title}</h3>
        <p className="mt-4 text-white/80">{nansen.origin}</p>
        <p className={`${kicker} mt-8 text-mint`}>{nansen.experienceKicker}</p>
        <h3 className="mt-4 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-extrabold text-white">{nansen.headline}</h3>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6">
          <strong className="block text-[2.5rem] leading-none font-black text-mint">{nansen.stat}</strong>
          <span className="mt-2 block font-extrabold text-white/75">{nansen.statLabel}</span>
        </div>
        {nansen.paragraphs.map((paragraph, index) => (
          <p key={paragraph} className="mt-4 text-white/80">
            {index === 0 ? (
              <>
                Viešojo dialogo metodą sukūrė <strong className="text-white">Nansen Center for Peace and Dialogue</strong> Norvegijoje.
              </>
            ) : (
              paragraph
            )}
          </p>
        ))}
        <a href={externalLinks.nansen} target="_blank" rel="noopener noreferrer" className={`${btnMint} mt-8 self-start`}>
          {nansen.link}
        </a>
      </div>
    </div>
  );
}
