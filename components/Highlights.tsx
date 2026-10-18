import { HighlightCard } from "@/components/HighlightCard";
import { highlights } from "@/lib/content";

export function Highlights() {
  return (
    <section className="bg-white py-16">
      <div className="container-site grid gap-10 md2:grid-cols-3 md2:gap-12">
        {highlights.map((item) => (
          <HighlightCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
