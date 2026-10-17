export const audiences = ["person", "school", "community", "organization"] as const;

export type Audience = (typeof audiences)[number];

export const inquiryFields = ["name", "email", "audience", "organization", "message"] as const;
export type InquiryField = (typeof inquiryFields)[number];

export type Inquiry = {
  name: string;
  email: string;
  audience: Audience;
  organization: string;
  message: string;
};

export type InquiryErrors = Partial<Record<InquiryField, string>>;

const limits = {
  name: 120,
  email: 254,
  organization: 200,
  message: 5000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function textOf(data: Record<string, unknown>, key: string) {
  const raw = data[key];
  return typeof raw === "string" ? raw.trim() : "";
}

function isAudience(value: string): value is Audience {
  return (audiences as readonly string[]).includes(value);
}

export function validateInquiry(input: unknown): { ok: true; value: Inquiry } | { ok: false; errors: InquiryErrors } {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: { name: "Užpildykite formą." } };
  }

  const data = input as Record<string, unknown>;
  const errors: InquiryErrors = {};
  const name = textOf(data, "name");
  const email = textOf(data, "email");
  const audience = textOf(data, "audience");
  const organization = textOf(data, "organization");
  const message = textOf(data, "message");

  if (!name) errors.name = "Šis laukas būtinas.";
  else if (name.length > limits.name) errors.name = "Tekstas per ilgas.";

  if (!email) errors.email = "Šis laukas būtinas.";
  else if (email.length > limits.email || !emailPattern.test(email)) errors.email = "Įrašykite galiojantį el. pašto adresą.";

  if (!audience) errors.audience = "Pasirinkite, kas kreipiasi.";
  else if (!isAudience(audience)) errors.audience = "Pasirinkite, kas kreipiasi.";

  const asksAsPerson = audience === "person";
  if (!asksAsPerson && organization.length > limits.organization) errors.organization = "Tekstas per ilgas.";

  if (!message) errors.message = "Šis laukas būtinas.";
  else if (message.length > limits.message) errors.message = "Tekstas per ilgas.";

  if (Object.keys(errors).length > 0 || !isAudience(audience)) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      email,
      audience,
      organization: asksAsPerson ? "" : organization,
      message,
    },
  };
}

export function inquiryPayload(value: Inquiry): Record<string, string> {
  const payload: Record<string, string> = {
    name: value.name,
    email: value.email,
    audience: value.audience,
    message: value.message,
    website: "",
    source: "dialogai.lt",
  };

  if (value.audience !== "person" && value.organization) payload.organization = value.organization;
  return payload;
}

export function isHoneypotFilled(input: unknown): boolean {
  if (!input || typeof input !== "object") return false;
  const website = (input as { website?: unknown }).website;
  return typeof website === "string" && website.trim().length > 0;
}

export function upstreamFieldErrors(body: unknown): InquiryErrors {
  if (!body || typeof body !== "object" || !("errors" in body)) return {};
  const errors = (body as { errors?: unknown }).errors;
  if (!errors || typeof errors !== "object") return {};

  const mapped: InquiryErrors = {};
  for (const [key, value] of Object.entries(errors)) {
    if (!(inquiryFields as readonly string[]).includes(key)) continue;
    const text = Array.isArray(value) ? value.find((item) => typeof item === "string") : value;
    if (typeof text === "string" && text.trim()) mapped[key as InquiryField] = text;
  }
  return mapped;
}
