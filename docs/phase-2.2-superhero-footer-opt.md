# Phase 2.2: Superhero Footer Boilerplate

## Objective
Provide a polished, reusable "Superhero Footer" boilerplate that showcases a full-featured brand footer — extensive link groups, a featured content area, newsletter sign-up, social icons, and utility/legal links. It should be production-ready, accessible, responsive, and designed for reuse across templates.

## Design Principles
- Semantic, server-rendered HTML first (performance and SEO).
- Minimal client JS: progressively enhance only where needed (newsletter AJAX, language selector).
- Mobile-first layout that expands into a multi-column grid on larger viewports.
- High-contrast, visible focus states for keyboard users and screen-reader announcements for dynamic feedback.

## Component Sections
- Brand area: logo, one-line description, optional CTA.
- Link groups: 3–6 columns (Products, Services, Resources, Case Studies, Company, Support).
- Featured / promo area: optional large link tiles or badges for flagship content.
- Newsletter: accessible email input with inline validation, `aria-live` status, and a small client-side enhancer.
- Social & contact: accessible icon links and contact shortcuts.
- Utilities: sitemap, language selector (progressive), status, privacy/terms, copyright.

## Accessibility Requirements
- Use landmarks and headings: `<footer>`, `<nav aria-labelledby>`, and `<h2>`/`h3` for groups.
- Markup lists with `<ul>/<li>` and logical heading order for screen readers.
- Keyboard-focusable links and inputs with visible outlines; avoid relying on color alone.
- Newsletter success/error messages exposed via `aria-live="polite"` or `role="status"`.

## Performance & Best Practices
- Render the footer server-side to avoid client bundle cost.
- Lazy-load non-critical images; use `next/image` with `sizes` for responsive loading.
- Keep CSS small by reusing design tokens/utilities; use CSS Grid for desktop layout.
- Respect `prefers-reduced-motion` if any subtle animations are used.

## Implementation Steps
1. Create `components/layout/footer.tsx` as a server component with props for `brand`, `groups`, `featured`, and `options`.
2. Build markup: `<footer>` → container → brand / grid of navs / featured / newsletter / utilities.
3. Style mobile-first; desktop uses CSS Grid to produce 3–6 columns. Provide helper classes for compact vs expanded variants.
4. Implement a small client component `components/layout/newsletter-client.tsx` that handles AJAX submit and publishes status messages to an `aria-live` region.
5. Add examples and story/demo page showing variants (minimal, full, with featured tiles).
6. Add tests and checks: keyboard navigation verification, Lighthouse smoke test, and a11y scan (axe).

## Props (suggested)
- `brand: { name: string; logo?: string; description?: string; url?: string }`
- `groups: Array<{ title: string; links: Array<{ label: string; href: string; external?: boolean }> }>`
- `featured?: Array<{ title: string; href: string; image?: string; badge?: string }>`
- `options?: { showNewsletter?: boolean; compact?: boolean }`

## Acceptance Criteria
- Server-rendered footer with correct layout at small and large viewports.
- All interactive elements keyboard-accessible with visible focus.
- Newsletter announces validation and submission results to screen readers.
- Minimal client JS (only newsletter and progressive enhancements), no heavy bundles.

## Deliverables
- This spec (documented in `docs/phase-2.2-superhero-footer-opt.md`).
- `components/layout/footer.tsx` (server component) and `components/layout/newsletter-client.tsx` (client enhancer).
- Demo usage in the app and a small test checklist for keyboard/a11y checks.

---

Which implementation path do you want next?

- Scaffold the `footer.tsx` (server) + `newsletter-client.tsx` and wire into `app/layout.tsx`, or
- Create example data sets and a demo page showing several footer variants.

Reply with which path and I will implement it.
