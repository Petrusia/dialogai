import { MethodPrinciple } from "@/components/MethodPrinciple";
import { NansenBlock } from "@/components/NansenBlock";
import { method } from "@/lib/content";
import { kicker, sectionY } from "@/lib/ui";

export function MethodSection() {
  return (
    <section id="apie" className={`${sectionY} bg-white`}>
      <div className="container-site">
        <div className="mx-auto mb-16 max-w-prose-hero text-center">
          <p className={kicker}>{method.kicker}</p>
          <h2 className="mt-4 text-h2">{method.title}</h2>
          {method.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lead leading-7 text-slate-soft">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="grid gap-5 sm2:grid-cols-2 lg2:grid-cols-3">
          {method.principles.map((principle) => (
            <MethodPrinciple key={principle.number} {...principle} />
          ))}
        </div>
        <NansenBlock />
      </div>
    </section>
  );
}
