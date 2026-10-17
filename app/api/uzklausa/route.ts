import { inquiryPayload, isHoneypotFilled, upstreamFieldErrors, validateInquiry } from "@/lib/inquiry";

const maxBodyLength = 20_000;
const defaultInquiryApiUrl = "https://domussolis.org/api/v1/inquiries";

const messages = {
  tooLarge: "Užklausa per didelė.",
  badFormat: "Užklausos formatas netinka.",
  notConnected: "Siuntimas dar neprijungtas. Parašykite tiesiogiai info@domussolis.org.",
  failed: "Užklausos šiuo metu išsiųsti nepavyko. Pabandykite dar kartą arba rašykite info@domussolis.org.",
  limited: "Per daug užklausų. Pabandykite šiek tiek vėliau arba rašykite info@domussolis.org.",
  invalid: "Patikrinkite laukus ir pabandykite dar kartą.",
} as const;

export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > maxBodyLength) return Response.json({ ok: false, message: messages.tooLarge }, { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return Response.json({ ok: false, message: messages.badFormat }, { status: 400 });
  }

  if (isHoneypotFilled(body)) return Response.json({ ok: true });

  const result = validateInquiry(body);
  if (!result.ok) return Response.json({ ok: false, errors: result.errors }, { status: 422 });

  const token = process.env.INQUIRY_API_TOKEN?.trim();
  if (!token) return Response.json({ ok: false, message: messages.notConnected }, { status: 503 });

  const inquiryApiUrl = process.env.INQUIRY_API_URL?.trim() || defaultInquiryApiUrl;

  let forwarded: Response;
  try {
    forwarded = await fetch(inquiryApiUrl, {
      method: "POST",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inquiryPayload(result.value)),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return Response.json({ ok: false, message: messages.failed }, { status: 502 });
  }

  if (forwarded.status === 201) return Response.json({ ok: true });

  if (forwarded.status === 422) {
    const payload = await forwarded.json().catch(() => null);
    const errors = upstreamFieldErrors(payload);
    if (Object.keys(errors).length > 0) return Response.json({ ok: false, errors }, { status: 422 });
    return Response.json({ ok: false, message: messages.invalid }, { status: 422 });
  }

  if (forwarded.status === 429) return Response.json({ ok: false, message: messages.limited }, { status: 429 });

  return Response.json({ ok: false, message: messages.failed }, { status: 502 });
}
