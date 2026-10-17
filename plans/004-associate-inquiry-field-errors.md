# 004 — Associate inquiry field errors with their controls

- **Status**: TODO
- **Commit**: 045c291
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Rule**: Beyond the scan
- **Estimated scope**: 1 file, `Field`, the audience select, and `FieldError`

## Problem

`components/InquiryDialog.tsx` marks invalid controls with `aria-invalid` and renders the message in a sibling `<p role="alert">`. The message is not referenced by the control. A screen-reader user who returns to the field hears that it is invalid and does not hear the reason. The audience `<select>` at line 163 has the same gap.

```tsx
// components/InquiryDialog.tsx:246 — current textarea branch
<textarea id={id} name={name} rows={5} required={required} autoFocus={autoFocus} aria-invalid={Boolean(error)} className={fieldClass} onChange={clear} />

// components/InquiryDialog.tsx:266 — current error
function FieldError({ children }: { children: string }) {
  return (
    <p className="mt-1 text-sm font-bold text-clay" role="alert">
      {children}
    </p>
  );
}
```

The select block at lines 159–183 repeats the pattern: `aria-invalid={Boolean(errors.audience)}` and `{errors.audience ? <FieldError>{errors.audience}</FieldError> : null}` with no `aria-describedby`.

The form-level `message` at line 199 is not a field error. Leave it as `role="alert"` without tying it to a control.

## Target

`FieldError` accepts an id:

```tsx
function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-1 text-sm font-bold text-clay" role="alert">
      {children}
    </p>
  );
}
```

Inside `Field`, derive the error id next to `const id = \`uzklausa-${name}\`;`:

```tsx
const errorId = `${id}-error`;
```

On both the `<textarea>` and the `<input>`, add:

```tsx
aria-describedby={error ? errorId : undefined}
```

Keep the existing `aria-invalid={Boolean(error)}`. Render the message as:

```tsx
{error ? <FieldError id={errorId}>{error}</FieldError> : null}
```

On the audience `<select>`, add:

```tsx
aria-describedby={errors.audience ? "uzklausa-audience-error" : undefined}
```

And render:

```tsx
{errors.audience ? <FieldError id="uzklausa-audience-error">{errors.audience}</FieldError> : null}
```

The select id is already `uzklausa-audience`, so the error id matches the `Field` pattern `${id}-error`.

## Repo conventions to follow

- Ids in this dialog already use the `uzklausa-` prefix (`components/InquiryDialog.tsx:238`).
- Keep `role="alert"` so the message is announced when it appears. `aria-describedby` adds the reason when the user focuses the control again.

## Steps

1. Add the `id` prop to `FieldError` and set it on the `<p>`.
2. Point `Field`'s input and textarea at `` `${id}-error` `` through `aria-describedby`, and pass that id to `FieldError`.
3. Do the same for the audience select with `uzklausa-audience-error`.
4. Re-read the diff and remove unrelated churn. If plan 003 is already applied, keep the `sendingRef` submit guard.

## Boundaries

- Do NOT change validation copy, `required`, or the honeypot field.
- Do NOT add `aria-describedby` to the form-level message under the fields.
- Do NOT add a dependency.
- STOP if `components/InquiryDialog.tsx` has drifted from commit `045c291` in a way other than plan 003.

## Verification

- **Mechanical**:
  - `npx next typegen && npx tsc --noEmit` passes.
  - `npm run lint` and `npm test` pass.
  - `npx react-doctor@latest --scope changed` does not drop the score.
- **Behavior check**: Open the dialog, clear the name, and submit. The name field has `aria-invalid="true"` and `aria-describedby="uzklausa-name-error"`. The element with that id contains "Šis laukas būtinas." The same shape holds for email, audience, and message. After typing in a field, that field's error disappears and `aria-describedby` is removed. The success panel is unchanged.
- **Done when**: every invalid visible control points at its error text.
