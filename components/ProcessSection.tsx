import { ProcessStep } from "@/components/ProcessStep";
import { process } from "@/lib/content";
import { kicker, sectionY } from "@/lib/ui";

export function ProcessSection() {
  return (
    <section id="kaip" className={`${sectionY} bg-white`}>
      <div className="container-site">
        <div className="mx-auto mb-16 max-w-prose-hero text-center">
          <p className={kicker}>{process.kicker}</p>
          <h2 className="mt-4 text-h2">{process.title}</h2>
        </div>
        <div className="grid gap-4">
          {process.steps.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
