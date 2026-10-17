# Audit plans

Source commit: `045c291`. React Doctor 0.9.18 score on that commit: 70 (`Needs work`), 8 warnings, 0 errors.

These plans fix confirmed findings. They do not change behavior beyond the finding. Run the remaining plans in order. Plan 004 edits `components/InquiryDialog.tsx` after the submit guard that plan 003 already applied.

The React Doctor score on this branch is 100. That pass also escaped JSON-LD, hoisted the article date formatter, checked `response.ok` before reading the inquiry response, and closed the dialog with `closedby="any"`.

| Plan | Status | Severity | Depends on | Summary |
| --- | --- | --- | --- | --- |
| [001](001-cache-only-successful-articles.md) | TODO | MEDIUM | none | Cache a successful articles response. Keep the local list outside the cache when the upstream fails. |
| [002](002-raise-text-contrast.md) | TODO | MEDIUM | none | Move muted, clay, and Facebook colors to WCAG AA pairs. |
| [003](003-guard-inquiry-resubmit.md) | DONE | MEDIUM | none | Block a second inquiry submit with a ref before the first await. |
| [004](004-associate-inquiry-field-errors.md) | TODO | MEDIUM | 003 | Point each invalid inquiry control at its error with `aria-describedby`. |
| [005](005-choose-one-active-section.md) | TODO | MEDIUM | none | Highlight the first intersecting header section, in nav order. |

## Recorded, not planned

- `components/NansenBlock.tsx:29` ignores `nansen.paragraphs[0]` and hardcodes the same sentence. Edit the content array and the strong tag together, or the page will drift.
- `formatDate` is copied in `app/straipsniai/page.tsx:45`, `app/straipsniai/[slug]/page.tsx:54`, and `components/ArticlesPreview.tsx:45`. React Doctor flags `react-doctor/js-hoist-intl` on each. One module-level `Intl.DateTimeFormat("lt-LT", { dateStyle: "long" })` clears all three. The pages render a handful of dates, so this is hygiene.
- `app/layout.tsx:77` embeds `JSON.stringify(organizationJsonLd)` in a script tag. The value is the static object in `lib/site.ts` and contains no `<`. Escape `<` as `\u003c` before the description is ever edited to include markup.
- `components/NavLink.tsx:13` sets `aria-current="true"`. For these in-page links, `aria-current="location"` is the more specific state.
- `components/InquiryDialog.tsx:79` listens for a click on `<dialog>`. The backdrop is a pseudo-element, and the inner `div` covers the dialog box, so that handler does not receive the backdrop click. Escape and "Uždaryti" already close the dialog.
- `app/straipsniai/[slug]/page.tsx:10` sets `export const instant = false` with no comment. It is the Cache Components opt-out from the Next.js 16 migration guide.

## Rejected scanner warnings

- `react-doctor/prefer-use-effect-event` at `components/InquiryDialog.tsx:68`. `onClose` is a `useCallback` with `[]`, and the modal mounts once per open. The effect does not resubscribe in practice.
- `react-doctor/no-fetch-response-used-without-status-check` at `components/InquiryDialog.tsx:120`. The handler reads JSON first so a 422 body can fill field errors, then checks `response.ok`.
- `react-doctor/no-noninteractive-element-interactions` at `components/InquiryDialog.tsx:75`. The element is a native `<dialog>` with a labelled close button. Keyboard users can close it with Escape and the button.
