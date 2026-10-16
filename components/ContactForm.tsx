"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import type { InquiryErrors, InquiryField } from "@/lib/inquiry";
import { site } from "@/lib/site";
import { btnDark } from "@/lib/ui";

const fields: Array<{ name: InquiryField; label: string; multiline?: boolean }> = [
  { name: "name", label: "Vardas" },
  { name: "email", label: "El. paštas" },
  { name: "city", label: "Miestas / vieta" },
  { name: "organization", label: "Organizacija / bendruomenė" },
  { name: "topic", label: "Tema, kuri mums rūpi" },
  { name: "message", label: "Trumpas situacijos aprašymas", multiline: true },
];

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const clientReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/uzklausa", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok?: boolean; errors?: InquiryErrors; message?: string };

      if (data.errors) {
        setErrors(data.errors);
        setStatus("error");
        return;
      }

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Užklausos išsiųsti nepavyko.");
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Užklausos išsiųsti nepavyko. Patikrinkite ryšį ir pabandykite dar kartą.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl bg-mint p-6">
        <h3>Užklausa išsiųsta</h3>
        <p className="mt-3 text-muted">Ačiū. Susisieksime dėl tolimesnių žingsnių.</p>
      </div>
    );
  }

  return (
    <form method="post" action="/api/uzklausa" noValidate={clientReady} onSubmit={onSubmit} className="relative grid gap-4">
      {fields.map((field) => {
        const id = `uzklausa-${field.name}`;
        const error = errors[field.name];
        const shared = "w-full rounded-card border border-border-sand/80 bg-cream px-4 py-3 text-ink outline-none focus:border-forest";
        const clearError = () => {
          if (!errors[field.name]) return;
          setErrors((current) => {
            const next = { ...current };
            delete next[field.name];
            return next;
          });
        };

        return (
          <div key={field.name}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-black text-ink">
              {field.label}
            </label>
            {field.multiline ? (
              <textarea id={id} name={field.name} rows={5} required aria-invalid={Boolean(error)} className={shared} onChange={clearError} />
            ) : (
              <input
                id={id}
                name={field.name}
                type={field.name === "email" ? "email" : "text"}
                autoComplete={field.name === "email" ? "email" : field.name === "name" ? "name" : "off"}
                required
                aria-invalid={Boolean(error)}
                className={shared}
                onChange={clearError}
              />
            )}
            {error ? (
              <p className="mt-1 text-sm font-bold text-clay" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="uzklausa-company">Svetainė</label>
        <input id="uzklausa-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {message ? (
        <p className="text-sm font-bold text-clay" role="alert">
          {message}
        </p>
      ) : null}

      <button type="submit" className={`${btnDark} w-full`} disabled={status === "sending"}>
        {status === "sending" ? "Siunčiama…" : "Siųsti užklausą"}
      </button>
      <p className="text-sm text-muted">
        Arba rašykite{" "}
        <a className="font-black text-forest" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
    </form>
  );
}

