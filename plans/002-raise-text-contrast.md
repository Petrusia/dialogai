# 002 — Raise text contrast to WCAG AA

- **Status**: TODO
- **Commit**: 045c291
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Rule**: Beyond the scan
- **Estimated scope**: 1 file, three color tokens

## Problem

Body copy, error text, and the Facebook control miss WCAG 2.2 AA contrast (4.5:1 for normal text). Ratios were measured against the colors in `app/globals.css`.

| Pair | Ratio | Where it shows up |
| --- | --- | --- |
| `--color-muted` `#64748b` on cream `#fbf7ef` | 4.45:1 | `text-muted` paragraphs, including `components/HighlightCard.tsx:16`, `components/FaqItem.tsx:11`, and `components/SiteFooter.tsx:19` |
| `--color-muted` `#64748b` on white `#ffffff` | 4.76:1 | Same token on white cards. This pair already clears 4.5:1. The cream pair is the failure. |
| `--color-clay` `#b9704a` on white `#ffffff` | 3.83:1 | `components/InquiryDialog.tsx:268`, `text-sm font-bold text-clay` |
| `--color-clay` `#b9704a` on cream `#fbf7ef` | 3.59:1 | The same error color when a field sits on cream |
| white on `--color-facebook` `#1877f2` | 4.23:1 | `components/SiteFooter.tsx:34`, `text-xs font-black text-white` |

`text-sm` is 14px, so the bold error stays normal text. The Facebook label is 12px. White at 75% and 80% on `--color-ink`, `--color-forest`, and `--color-ink-deep` already clears 5.3:1; leave those utilities alone.

## Target

In `app/globals.css` `@theme`, replace only these three declarations:

```css
/* app/globals.css — target tokens */
--color-muted: #5b6b83;
--color-clay: #9a5634;
--color-facebook: #0f63d8;
--color-facebook-hover: #0b57c2;
```

Measured ratios after the change:

- `#5b6b83` on cream `5.07:1`, on white `5.42:1`
- `#9a5634` on cream `5.23:1`, on white `5.59:1`
- white on `#0f63d8` `5.53:1`
- white on `#0b57c2` `6.65:1`

`--color-facebook-hover` is currently `#0f63d8` (`app/globals.css:24`). Moving the resting color to that value requires a darker hover, otherwise the hover state disappears. Also update the shadow so it follows the new blue:

```css
--shadow-facebook: 0 10px 24px rgba(15, 99, 216, 0.22);
```

Leave the arbitrary hover shadow in `components/SiteFooter.tsx:34` (`rgba(24, 119, 242, 0.28)`) unchanged. It is decorative and not the contrast failure.

## Repo conventions to follow

- Colors live as `--color-*` tokens in `app/globals.css` `@theme`. Components already consume them as `text-muted`, `text-clay`, and `bg-facebook`.
- Do not introduce a one-off hex in a component.

## Steps

1. In `app/globals.css`, set `--color-muted` to `#5b6b83`.
2. Set `--color-clay` to `#9a5634`.
3. Set `--color-facebook` to `#0f63d8` and `--color-facebook-hover` to `#0b57c2`.
4. Set `--shadow-facebook` to `0 10px 24px rgba(15, 99, 216, 0.22)`.
5. Re-read the diff and remove unrelated churn.

## Boundaries

- Do NOT change layout, type scale, or copy.
- Do NOT restyle `text-white/75` or `text-white/80`. Those pairings already pass.
- Do NOT add a dependency.
- STOP if `app/globals.css` has drifted from commit `045c291`.

## Verification

- **Mechanical**:
  - Recompute contrast for the four pairs above. Each normal-text pair is at least 4.5:1.
  - `npm run lint` passes.
  - `npx react-doctor@latest --scope changed` does not drop the score.
- **Behavior check**: Open `/`, `/straipsniai`, and the inquiry dialog. Muted paragraphs are slightly darker and still look like secondary text. Submit the form empty after a client validation path, or force a field error, and confirm the clay message is readable on white. The footer Facebook pill is darker blue, and its hover state is darker than the resting state.
- **Done when**: the three tokens match the target hex values and the measured ratios clear 4.5:1.
