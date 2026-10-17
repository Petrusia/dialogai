# 003 — Guard inquiry submit against re-entry

- **Status**: TODO
- **Commit**: 045c291
- **Severity**: MEDIUM
- **Category**: Bugs & correctness
- **Rule**: react-doctor/no-async-event-handler-without-reentry-guard
- **Estimated scope**: 1 file, the submit handler

## Problem

`components/InquiryDialog.tsx:110` sends the inquiry in an async submit handler. React state flips to `"sending"` before the `await`, and the button uses `disabled={status === "sending"}` at line 200. That disable happens on the next render. A second submit that arrives before that render still sees `status === "idle"` and starts a second `POST /api/uzklausa`. The upstream creates a real inquiry on 201, so two requests become two inquiries.

React Doctor 0.9.18 reports this at `components/InquiryDialog.tsx:120`. The canonical recipe is a ref set before the first `await`, because `setState` is not a synchronous lock. The practical window is short: a normal double-click usually lands after the commit. The ref closes the window the disabled button does not cover.

```tsx
// components/InquiryDialog.tsx:110 — current
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
  } catch {
    setStatus("error");
    setMessage("Užklausos išsiųsti nepavyko. Patikrinkite ryšį ir pabandykite dar kartą.");
  }
}
```

The canonical recipe from `https://www.react.doctor/prompts/rules/react-doctor/no-async-event-handler-without-reentry-guard.md`:

```tsx
function SaveButton() {
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);
  const handleSave = async () => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setIsSaving(true);
    try {
      await save();
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  };
  return (
    <button disabled={isSaving} onClick={handleSave}>
      {isSaving ? "Saving…" : "Save"}
    </button>
  );
}
```

This form's status is `"idle" | "sending" | "success" | "error"`, not a boolean. Reset the ref in `finally`. Leave the status transitions where they are. A `finally` that sets status back to `"idle"` would erase success and error.

## Target

Inside `InquiryForm`, next to the other hooks:

```tsx
const sendingRef = useRef(false);
```

`useRef` is already imported on line 3.

Replace `onSubmit` with:

```tsx
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
  } catch {
    setStatus("error");
    setMessage("Užklausos išsiųsti nepavyko. Patikrinkite ryšį ir pabandykite dar kartą.");
  } finally {
    sendingRef.current = false;
  }
}
```

Keep `disabled={status === "sending"}` and the button label. Reading `response.json()` before `response.ok` stays. The 422 body carries field errors, and the handler already branches on `data.errors` and `response.ok`. That is the existing API contract. Do not "fix" `react-doctor/no-fetch-response-used-without-status-check` by skipping the error body.

## Repo conventions to follow

- The form already owns `status` in `InquiryForm`. Add the ref beside `useState` and `useSyncExternalStore` in that function.
- Copy the Lithuanian strings exactly.

## Steps

1. Add `const sendingRef = useRef(false);` in `InquiryForm` with the other hooks.
2. Replace `onSubmit` with the target. Set the ref before `setStatus("sending")` and clear it only in `finally`.
3. Re-read the diff and remove unrelated churn.

## Boundaries

- Do NOT change the request payload, validation, or status copy.
- Do NOT reset `status` inside `finally`.
- Do NOT add a dependency.
- Do NOT edit `app/api/uzklausa/route.ts` in this plan.
- STOP if `components/InquiryDialog.tsx` has drifted from commit `045c291`.

## Verification

- **Mechanical**:
  - `npx react-doctor@latest --scope changed` no longer reports `react-doctor/no-async-event-handler-without-reentry-guard` for this handler, and the score does not drop.
  - `npx next typegen && npx tsc --noEmit` passes.
  - `npm test` and `npm run lint` pass.
- **Behavior check**: Open "Paprašyti dialogo", fill a valid form, and press the submit button twice quickly. One request leaves the browser. The button reads "Siunčiama…" while it is in flight and is disabled. A 422 response still shows field errors and allows another submit. A success response still replaces the form with "Užklausa išsiųsta".
- **Done when**: the ref blocks a second call for the whole `await`, and the diagnostic is gone.
