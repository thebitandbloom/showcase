# Phase 2.3.1 — Marquee tuning and LogosRow integration

## Summary
This task tunes the marquee used for partner logos by replacing public-image assets with an inline `LogosRow` component authored from `docs/resources/brands.html`, extract inline SVGs and place them in `public/logos/`organize logos providing their names, then implement SVGs as inline SVGs, improving sizing for them, and making the alternate marquee component so it can measure the rendered track and compute an exact `--marquee-shift` for a seamless loop.

## Goals
- Replace the previous image-based marquee with `LogosRow` (server component) so logos are authored inline as SVGs.
- Ensure consistent sizing across logos via CSS.
- Remove the visible seam/jump by computing the exact translate distance at runtime and applying it to `--marquee-shift`.
- Document the changes, QA steps, and provide commit message examples.

## Changes implemented
- `components/sections/logos-row.tsx`: new server component exporting the logos row markup (inline SVGs wrapped in `.marquee-item`).
- `components/sections/marquee-scroller.css`: added sizing rules for `.logoImage` and a `.marquee-items` layout to support the duplicated track. get the `marquee-shift` right value, used to be the half of the parent element gap.
- `components/sections/marquee-scroller-alternative.tsx`: Duplicate the marquee row and duplicate logosRow component for seamless scrolling

## Tasks (actionable)
- [x] Create `LogosRow` component and author logos from `public/logos/*.svg`.
- [x] Wire `MarqueeScrollerAlternative` to use `LogosRow` when no external logos array provided.
- [x] Add CSS sizing for inline SVGs (`.logoImage`) to minimize layout shifts.
- [x] Update `marquee-scroller.css` keyframes to reference `var(--marquee-shift)` with `calc()` operation.
- [x] Smoke-check in browser (visual QA across viewports).
- [x] Final QA & commit.

## Implementation notes
- Set the right value for `--marquee-shift` guarantees the CSS transform moves exactly one copy of the duplicated content.

## Acceptance criteria
- Logos render at consistent visual size across viewport widths.
- Marquee loops seamlessly without a visible jump at the seam on initial load and after window resizes or font/SVG loads.
- Screen readers read each logo twice.

## QA / Smoke test steps
1. Start the dev server and open the homepage or the footer demo page containing the marquee.
2. Verify the marquee shows two rendered copies of the logo row (one is visually streamed, the other provides continuity) and that only the first set is exposed to AT (duplicated nodes have `aria-hidden`).
3. Observe at multiple viewport widths (mobile → desktop) to ensure no seam/jump appears.
4. Resize the window and confirm the marquee recalculates `--marquee-shift` (no visible jump on resize).
5. Toggle `prefers-reduced-motion` in dev tools to confirm animation pauses.

## Commit message suggestions
- "feat(marquee): add LogosRow and client-side measurement for seamless loop"
- "chore(marquee): size inline SVGs and compute --marquee-shift at runtime"
- "fix(marquee): prevent seam jump by measuring track width and updating animation"

## Notes / future work
- Consider reducing SVG file complexity or using optimized SVG sprites to reduce bundle size.
- If logos are later moved to a CMS, keep the measurement logic; it will still be required for dynamic content.
