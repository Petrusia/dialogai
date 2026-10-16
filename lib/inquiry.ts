export const inquiryFields = ["name", "email", "city", "organization", "topic", "message"] as const;

export type InquiryField = (typeof inquiryFields)[number];

export type Inquiry = Record<InquiryField, string>;

export type InquiryErrors = Partial<Record<InquiryField, string>>;

const limits: Record<InquiryField, number> = {
  name: 120,
  email: 200,
  city: 160,
  organization: 200,
  topic: 200,
  message: 4000,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(
  input: unknown,
): { ok: true; value: Inquiry } | { ok: false; errors: InquiryErrors } {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: { name: "Užpildykite formą." } };
  }

  const data = input as Record<string, unknown>;
  const errors: InquiryErrors = {};
  const value = {} as Inquiry;

  for (const field of inquiryFields) {
    const raw = data[field];
    const text = typeof raw === "string" ? raw.trim() : "";

    if (!text) {
      errors[field] = "Šis laukas būtinas.";
      continue;
    }

    if (text.length > limits[field]) {
      errors[field] = "Tekstas per ilgas.";
      continue;
    }

    value[field] = text;
  }

  if (value.email && !emailPattern.test(value.email)) {
    errors.email = "Įrašykite galiojantį el. pašto adresą.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value };
}

export function isHoneypotFilled(input: unknown): boolean {
  if (!input || typeof input !== "object") return false;
  const company = (input as { company?: unknown }).company;
  return typeof company === "string" && company.trim().length > 0;
}
