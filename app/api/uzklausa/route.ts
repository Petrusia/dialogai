import { isHoneypotFilled, validateInquiry } from "@/lib/inquiry";

const maxBodyLength = 20_000;

const messages = {
  tooLarge: "Užklausa per didelė.",
  badFormat: "Užklausos formatas netinka.",
  notConnected: "Siuntimas dar neprijungtas. Parašykite tiesiogiai info@domussolis.org.",
  failed: "Užklausos šiuo metu išsiųsti nepavyko. Pabandykite dar kartą.",
} as const;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const formPost =
    contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  let body: unknown;
  if (formPost) {
    const form = await request.formData();
    body = Object.fromEntries(form);
  } else {
    const text = await request.text();
    if (text.length > maxBodyLength) return respond(formPost, { ok: false, message: messages.tooLarge }, 413);
    try {
      body = JSON.parse(text);
    } catch {
      return respond(formPost, { ok: false, message: messages.badFormat }, 400);
    }
  }

  if (isHoneypotFilled(body)) return respond(formPost, { ok: true }, 200);

  const result = validateInquiry(body);
  if (!result.ok) return respond(formPost, { ok: false, errors: result.errors }, 400);

  const destination = process.env.INQUIRY_API_URL;
  if (!destination) return respond(formPost, { ok: false, message: messages.notConnected }, 503);

  try {
    const forwarded = await fetch(destination, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ ...result.value, sentAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!forwarded.ok) return respond(formPost, { ok: false, message: messages.failed }, 502);
  } catch {
    return respond(formPost, { ok: false, message: messages.failed }, 502);
  }

  return respond(formPost, { ok: true }, 200);
}

function respond(formPost: boolean, body: { ok: boolean; message?: string; errors?: unknown }, status: number) {
  if (!formPost) return Response.json(body, { status });

  const result = body.ok ? "issiusta" : status === 503 ? "neprijungta" : status === 400 ? "klaida" : "nepavyko";
  return new Response(null, {
    status: 303,
    headers: { location: `/?uzklausa=${result}#uzklausa` },
  });
}
