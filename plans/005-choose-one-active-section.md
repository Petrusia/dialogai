# 005 — Choose one active section from the observer

- **Status**: TODO
- **Commit**: 045c291
- **Severity**: MEDIUM
- **Category**: Bugs & correctness
- **Rule**: Beyond the scan
- **Estimated scope**: 1 file, the observer callback

## Problem

`hooks/useActiveSection.ts:17` writes state for every intersecting entry. The callback receives only the entries that changed, and their order is not document order. When two homepage sections sit in the observer band, the last write wins, so the header can highlight a lower section while the upper one is still the one in view.

```ts
// hooks/useActiveSection.ts:15 — current
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveId(entry.target.id);
    });
  },
  { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" },
);
```

`sectionIds` in `lib/content.ts` is the header order: `apie`, `kodel`, `kaip`, `erdves`, `duk`, `parama`. The header highlight should follow that order.

## Target

Keep a map of the sections currently intersecting, then pick the first id in the `ids` argument that is in the map. If none are visible, keep the previous id so the highlight does not disappear in the gap between sections.

```ts
// hooks/useActiveSection.ts — target effect
useEffect(() => {
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => section !== null);

  if (sections.length === 0) return;

  const visible = new Map<string, true>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.set(entry.target.id, true);
        else visible.delete(entry.target.id);
      }

      const next = ids.find((id) => visible.has(id));
      if (next) setActiveId(next);
    },
    { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
}, [ids]);
```

Leave the hook signature and the initial `useState("")` as they are.

## Repo conventions to follow

- This is the only hook in `hooks/`. Keep it as a client hook with `"use client"` and no new dependency.
- `components/SiteHeader.tsx:12` calls `useActiveSection(sectionIds)` and passes `activeId` into `MobileMenu`. `components/NavLink.tsx` already turns that into `aria-current`. Do not change those files.

## Steps

1. Replace the effect body in `hooks/useActiveSection.ts` with the target. Keep the threshold and root margin.
2. Re-read the diff and remove unrelated churn.

## Boundaries

- Do NOT change `sectionIds`, nav labels, or `aria-current`.
- Do NOT add scroll listeners or a library.
- STOP if `hooks/useActiveSection.ts` has drifted from commit `045c291`.

## Verification

- **Mechanical**:
  - `npx next typegen && npx tsc --noEmit` passes.
  - `npm run lint` and `npm test` pass.
  - `npx react-doctor@latest --scope changed` does not drop the score.
- **Behavior check**: On `/`, scroll from "Apie" through "Parama". The header underline moves to the section currently in the upper band and does not flicker back to a lower section while the upper one is still inside the band. Scroll quickly across two sections. One item is current. On `/straipsniai`, where those section ids are absent, the hook returns `""` and no nav item is current.
- **Done when**: the active id is the first intersecting id in `ids` order.
