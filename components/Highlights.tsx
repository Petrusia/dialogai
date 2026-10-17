import { HighlightCard } from "@/components/HighlightCard";
import { highlights } from "@/lib/content";

export function Highlights() {
  return (
    <section className="bg-white py-16">
      <div className="container-site grid gap-5 md2:grid-cols-3">
        {highlights.map((item) => (
          <HighlightCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
