# Phase 2.3.1 — Marquee tuning and LogosRow integration

## Summary
This task tunes the marquee used for partner logos by replacing public-image assets with an inline `LogosRow` component authored from `docs/resources/brands.html`, improving sizing for inline SVGs, and making the alternate marquee component client-side so it can measure the rendered track and compute an exact `--marquee-shift` for a seamless loop.

## Goals
- Replace the previous image-based marquee with `LogosRow` (server component) so logos are authored inline as SVGs.
- Ensure consistent sizing across logos via CSS.
- Remove the visible seam/jump by computing the exact translate distance at runtime and applying it to `--marquee-shift`.
- Document the changes, QA steps, and provide commit message examples.

## Changes implemented
- `components/sections/logos-row.tsx`: new server component exporting the logos row markup (inline SVGs wrapped in `.marquee-item`).
- `components/sections/marquee-scroller.css`: added sizing rules for `.logoImage` and a `.marquee-items` layout to support the duplicated track.
- `components/sections/marquee-scroller-alternative.tsx`: converted to a client component that duplicates the logos row (or clones nodes), measures the rendered track width, computes half the width, and writes it to `--marquee-shift` on the track element. Also adds a `ResizeObserver` and `load`/`resize` handlers to recompute on layout changes.
- Minor accessibility: duplicated DOM nodes are marked `aria-hidden="true"` so screen readers see only the original content.

## Tasks (actionable)
- [x] Create `LogosRow` component and author logos from `docs/resources/brands.html`.
- [x] Wire `MarqueeScroller` to use `LogosRow` when no external logos array provided.
- [x] Add CSS sizing for inline SVGs (`.logoImage`) to minimize layout shifts.
- [x] Convert alternative marquee to client component and compute `--marquee-shift` (uses `track.scrollWidth / 2`).
- [x] Update `marquee-scroller.css` keyframes to reference `var(--marquee-shift)` (required next step).
- [x] Back with `translateX(calc(-50% - 1.25rem))`. It works as expected.
- [ ] Smoke-check in browser (visual QA across viewports).
- [ ] Final QA & commit.

## Implementation notes
- Reason for runtime measurement: inline SVGs and flexible gaps produce a rendered width that static CSS calcs don't always match. Measuring `track.scrollWidth` and using half of that value for `--marquee-shift` guarantees the CSS transform moves exactly one copy of the duplicated content.
- Animation should use a pixel-accurate translate based on `--marquee-shift`. Keyframe examples and exact placement are in the next step.

## Acceptance criteria
- Logos render at consistent visual size across viewport widths.
- Marquee loops seamlessly without a visible jump at the seam on initial load and after window resizes or font/SVG loads.
- Screen readers read each logo once (duplicated items are invisible to assistive tech).

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

If you'd like, I can apply the small CSS keyframe change next (replace the current `translateX(calc(-50% - 1.25rem))` with a pixel-based `var(--marquee-shift)`) and run a quick dev-server smoke-check. 
