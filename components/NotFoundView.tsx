import Link from "next/link";
import { Mark } from "@/components/Mark";
import { ArrowRight, Question } from "@/components/marks";
import { btnDark } from "@/lib/ui";

export function NotFoundView() {
  return (
    <main className="container-site pt-40 pb-24">
      <Mark icon={Question} size={56} />
      <p className="mt-4 text-kicker font-black tracking-[0.2em] text-forest uppercase">404</p>
      <h1 className="mt-4 text-[clamp(2.4rem,5vw,4rem)]">Tokio puslapio nėra</h1>
      <p className="mt-4 max-w-xl text-lg text-slate-soft">Adresas neegzistuoja arba straipsnis jau perkeltas.</p>
      <Link href="/" className={`${btnDark} mt-8`}>
        Grįžti į pradžią
        <Mark icon={ArrowRight} size={22} className="text-current" />
      </Link>
    </main>
  );
}
