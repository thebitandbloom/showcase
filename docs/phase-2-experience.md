# Phase 2: Interactive Experience & Data Display

## Context
Continuing the "White Label Boutique Boilerplate". Focus on interactivity, glassmorphism components, and smooth Shadcn/UI integration.

## Technical Goals
- Use Shadcn/UI for all interactive elements.
- Keep the Black/White/Zinc color palette.
- Maintain GSAP for entrance animations of each section (ScrollTrigger).

## Step 1: Feature Grid (The "Services" section)
- Create a `features-grid.tsx` component.
- Use 3 or 4 columns on desktop.
- Each card should have:
    - A Lucide Icon.
    - A subtle border that glows when hovered (Tailwind v4 border-accent color).
    - GSAP ScrollTrigger: Cards should fade in and slide up as the user scrolls down.

## Step 2: Interactive Gallery
- Create a `work-gallery.tsx`.
- Implement a 2x2 or Masonry grid.
- When an image is clicked, it must open in a Shadcn `Dialog` (Modal) with a high-resolution view and a brief "Project Description" (Lorem Ipsum).

## Step 3: Global Motion
- Ensure all transitions between light/dark mode (if implemented) are smooth.
- Refine the 'Editorial' Typography: Use the Playfair Display (Serif) font for all Section Headers.