# Phase 3.1: Hero & Footer Optimization

## Objective
Polish the hero showcase and add an accessible, lightweight footer so the project feels complete and performs well on Core Web Vitals (LCP, FID) while remaining accessible.

## Goals
- Reduce LCP and visual jank in the hero area.
- Respect user motion preferences and avoid unnecessary animations.
- Ensure hero image is responsive and served in modern formats where possible.
- Add a minimal, accessible footer with keyboard focus styles and semantic markup.

## Implementation Tasks
- Hero
  - Add `sizes` to `next/image` usage and keep `priority` for LCP image.
  - Add `will-change: transform, opacity` to animated elements to hint browsers.
  - Respect `prefers-reduced-motion` and disable auto-cycling/animations when set.
  - Ensure animated properties use `transform`/`opacity` only (avoid layout thrash).
  - Provide a non-animated fallback state for reduced-motion users.

- Footer
  - Create `components/layout/footer.tsx` with semantic `<footer>` and nav links.
  - Ensure clear focus styles, sufficient contrast, and accessible links (sr-only where needed).
  - Keep markup lightweight to avoid extra JS; server-render the footer.

## Acceptance Criteria
- Hero LCP image has `sizes` and remains `priority` for LCP measurement.
- Turning on `prefers-reduced-motion` disables hero auto-cycling and animations.
- Footer renders on every page, is keyboard navigable, and shows visible focus states.
- No layout-shifting animations in hero; animations (when allowed) use `transform`/`opacity`.

## Next Steps
- Implement the code changes (hero tweaks + footer component).  Run Lighthouse to confirm improvements.
- Optionally: generate AVIF/WebP optimized variants via build/CDN config and add `next.config.js` image domains.
