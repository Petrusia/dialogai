"use client";

import { createContext, useCallback, useContext, useEffect, useEffectEvent, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode, type RefObject } from "react";
import { audiences, type Audience, type InquiryErrors, type InquiryField } from "@/lib/inquiry";
import { site } from "@/lib/site";
import { btnDark } from "@/lib/ui";

const audienceLabels: Record<Audience, string> = {
  person: "Asmuo",
  school: "Mokykla",
  community: "Bendruomenė",
  organization: "Organizacija",
};

type OpenInquiry = (trigger: HTMLElement) => void;

const InquiryDialogContext = createContext<OpenInquiry | null>(null);

export function useInquiryDialog() {
  const open = useContext(InquiryDialogContext);
  if (!open) throw new Error("Užklausos langas turi būti InquiryDialogProvider viduje.");
  return open;
}

export function InquiryDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openDialog = useCallback((trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <InquiryDialogContext.Provider value={openDialog}>
      {children}
      {open ? <InquiryModal triggerRef={triggerRef} onClose={closeDialog} /> : null}
    </InquiryDialogContext.Provider>
  );
}

function InquiryModal({ onClose, triggerRef }: { onClose: () => void; triggerRef: RefObject<HTMLElement | null> }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const onCloseEvent = useEffectEvent(onClose);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onCloseEvent();
      const trigger = triggerRef.current;
      queueMicrotask(() => trigger?.focus());
    };

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!inside) dialog.close();
    };

    dialog.addEventListener("close", handleClose);
    if (!("closedBy" in HTMLDialogElement.prototype)) dialog.addEventListener("click", handleBackdropClick);
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>("#uzklausa-name")?.focus();

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, [triggerRef]);

  function requestClose() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      closedby="any"
      className="m-auto max-h-[calc(100%-2rem)] w-[min(100%-1.5rem,36rem)] overflow-y-auto rounded-xl border-0 bg-white p-0 text-ink shadow-soft backdrop:bg-ink-deep/70"
    >
      <div className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold">
            Paprašyti dialogo
          </h2>
          <button type="button" className="rounded-card px-3 py-2 text-sm font-black text-forest" onClick={requestClose}>
            Uždaryti
          </button>
        </div>
        <InquiryForm />
      </div>
    </dialog>
  );
}

function InquiryForm() {
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState<Audience | "">("");
  const clientReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const showOrganization = audience === "school" || audience === "community" || audience === "organization";
  const sendingRef = useRef(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    sendingRef.current = true;
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

      if (!response.ok) {
        const data = (await response.json()) as { errors?: InquiryErrors; message?: string };
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        setMessage(data.errors ? "" : (data.message ?? "Užklausos išsiųsti nepavyko."));
        return;
      }

      const data = (await response.json()) as { ok?: boolean; message?: string };
      if (!data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Užklausos išsiųsti nepavyko.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Užklausos išsiųsti nepavyko. Patikrinkite ryšį ir pabandykite dar kartą.");
    } finally {
      sendingRef.current = false;
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
    <form noValidate={clientReady} onSubmit={onSubmit} className="relative grid gap-4">
      <Field name="name" label="Vardas" error={errors.name} autoComplete="name" autoFocus onClear={setErrors} />
      <Field name="email" label="El. paštas" error={errors.email} type="email" autoComplete="email" onClear={setErrors} />
      <div>
        <label htmlFor="uzklausa-audience" className="mb-1.5 block text-sm font-black text-ink">
          Kas kreipiasi
        </label>
        <select
          id="uzklausa-audience"
          name="audience"
          required
          value={audience}
          aria-invalid={Boolean(errors.audience)}
          className={fieldClass}
          onChange={(event) => {
            setAudience(event.target.value as Audience | "");
            clearError(setErrors, "audience");
          }}
        >
          <option value="">Pasirinkite</option>
          {audiences.map((value) => (
            <option key={value} value={value}>
              {audienceLabels[value]}
            </option>
          ))}
        </select>
        {errors.audience ? <FieldError>{errors.audience}</FieldError> : null}
      </div>
      {showOrganization ? (
        <Field
          name="organization"
          label="Organizacija, mokykla ar bendruomenė"
          optional
          required={false}
          error={errors.organization}
          onClear={setErrors}
        />
      ) : null}
      <Field name="message" label="Žinutė" error={errors.message} multiline onClear={setErrors} />
      <div className="pointer-events-none absolute size-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="uzklausa-website">Svetainė</label>
        <input id="uzklausa-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {message ? <FieldError>{message}</FieldError> : null}
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

const fieldClass = "w-full rounded-card border border-border-sand/80 bg-cream px-4 py-3 text-ink outline-none focus:border-forest";

function Field({
  name,
  label,
  error,
  type = "text",
  autoComplete,
  autoFocus = false,
  optional = false,
  required = true,
  multiline = false,
  onClear,
}: {
  name: InquiryField;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  optional?: boolean;
  required?: boolean;
  multiline?: boolean;
  onClear: (update: (current: InquiryErrors) => InquiryErrors) => void;
}) {
  const id = `uzklausa-${name}`;
  const clear = () => clearError(onClear, name);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-black text-ink">
        {label} {optional ? <span className="font-bold text-muted">nebūtina</span> : null}
      </label>
      {multiline ? (
        <textarea id={id} name={name} rows={5} required={required} autoFocus={autoFocus} aria-invalid={Boolean(error)} className={fieldClass} onChange={clear} />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          required={required}
          aria-invalid={Boolean(error)}
          className={fieldClass}
          onChange={clear}
        />
      )}
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ children }: { children: string }) {
  return (
    <p className="mt-1 text-sm font-bold text-clay" role="alert">
      {children}
    </p>
  );
}

function clearError(setErrors: (update: (current: InquiryErrors) => InquiryErrors) => void, field: InquiryField) {
  setErrors((current) => {
    if (!current[field]) return current;
    const next = { ...current };
    delete next[field];
    return next;
  });
}
