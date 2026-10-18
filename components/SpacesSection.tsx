import { SpaceCard } from "@/components/SpaceCard";
import { spaces } from "@/lib/content";
import { kicker, sectionY } from "@/lib/ui";

export function SpacesSection() {
  return (
    <section id="erdves" className={sectionY}>
      <div className="container-site">
        <div className="mb-16 lg2:flex lg2:items-end lg2:justify-between lg2:gap-8">
          <div>
            <p className={kicker}>{spaces.kicker}</p>
            <h2 className="mt-4 text-h2">{spaces.title}</h2>
          </div>
          <p className="mt-4 max-w-[560px] text-lead text-slate-soft lg2:mt-0">{spaces.intro}</p>
        </div>
        <div className="border-b border-line">
          {spaces.items.map((space) => (
            <SpaceCard key={space.title} src={space.src} title={space.title} text={space.text} />
          ))}
        </div>
        <p className="mt-8 max-w-prose-hero text-[0.95rem] text-muted">{spaces.note}</p>
      </div>
    </section>
  );
}
