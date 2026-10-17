import Image from "next/image";
import { nansen } from "@/lib/content";
import { externalLinks } from "@/lib/links";
import { btnMint, kicker } from "@/lib/ui";

export function NansenBlock() {
  return (
    <div className="mt-16 grid gap-10 rounded-2xl bg-gradient-to-br from-ink via-forest to-ink-deep p-8 text-white shadow-soft sm2:p-14 lg2:grid-cols-[0.95fr_1.05fr]">
      <div>
        <div className="relative mb-6 size-[104px] overflow-hidden rounded-full border-[6px] border-mint/80 bg-white/10 shadow-[0_22px_48px_rgba(0,0,0,0.18)] sm2:size-[118px] lg2:size-[132px]">
          <Image src={nansen.image} alt={nansen.alt} fill sizes="132px" className="object-cover transition-transform duration-450 ease-soft hover:scale-105" />
        </div>
        <p className={`${kicker} text-mint`}>{nansen.originKicker}</p>
        <h3 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold text-white">{nansen.title}</h3>
        <p className="mt-4 text-white/80">{nansen.origin}</p>
        <a href={externalLinks.nansen} target="_blank" rel="noopener noreferrer" className={`${btnMint} mt-8`}>
          {nansen.link}
        </a>
      </div>
      <div>
        <p className={`${kicker} text-mint`}>{nansen.experienceKicker}</p>
        <h3 className="mt-4 font-display text-[clamp(1.9rem,3vw,3rem)] font-extrabold text-white">{nansen.headline}</h3>
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
      </div>
    </div>
  );
}
