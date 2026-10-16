import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { RequestDialogButton } from "@/components/RequestDialogButton";
import { cta } from "@/lib/content";
import { kicker } from "@/lib/ui";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const resultCopy: Record<string, string> = {
  issiusta: "Ačiū. Užklausa gauta.",
  neprijungta: "Siuntimas dar neprijungtas. Parašykite tiesiogiai info@domussolis.org.",
  klaida: "Patikrinkite laukus ir pabandykite dar kartą.",
  nepavyko: "Užklausos šiuo metu išsiųsti nepavyko. Pabandykite dar kartą.",
};

export function CtaSection({ searchParams }: { searchParams: SearchParams }) {
  return (
    <section id="uzklausa" className="bg-dark-mesh py-16 text-white sm2:py-section">
      <div className="container-site grid items-start gap-12 lg2:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className={`${kicker} text-mint`}>{cta.kicker}</p>
          <h2 className="mt-4 font-display text-[clamp(3rem,5vw,5rem)] font-extrabold text-white">{cta.title}</h2>
          {cta.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lead text-white/80">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="rounded-xl bg-white p-6 text-ink shadow-soft">
          <h3>{cta.boxTitle}</h3>
          <p className="mt-4 text-muted">{cta.boxText}</p>
          <RequestDialogButton variant="dark" className="mt-4 w-full">
            {cta.button}
          </RequestDialogButton>
          <div className="mt-6 border-t border-line pt-6">
            <Suspense fallback={null}>
              <InquiryNotice searchParams={searchParams} />
            </Suspense>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

async function InquiryNotice({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const raw = params.uzklausa;
  const result = Array.isArray(raw) ? raw[0] : raw;
  const text = result ? resultCopy[result] : undefined;
  if (!text) return null;

  const success = result === "issiusta";
  return (
    <p role="status" className={`mb-4 rounded-card px-4 py-3 text-sm font-bold ${success ? "bg-mint text-ink" : "bg-sand text-clay"}`}>
      {text}
    </p>
  );
}
