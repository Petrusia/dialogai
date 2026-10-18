import { iconFor } from "@/components/iconFor";
import { Mark } from "@/components/Mark";
import { ProcessStep } from "@/components/ProcessStep";
import { process } from "@/lib/content";
import { kicker, sectionY } from "@/lib/ui";

export function ProcessSection() {
  return (
    <section id="kaip" className={`${sectionY} bg-white`}>
      <div className="container-site">
        <div className="mb-12 max-w-prose-hero">
          <p className={kicker}>{process.kicker}</p>
          <h2 className="mt-4 flex items-start gap-4 text-h2">
            <Mark icon={iconFor[process.title]} size={36} className="mt-0.5" />
            <span className="min-w-0">{process.title}</span>
          </h2>
        </div>
        <ol className="border-b border-line">
          {process.steps.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </ol>
      </div>
    </section>
  );
}
