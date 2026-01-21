# Phase 1: High-End White Label Foundation

## Context
Act as a Senior Frontend Architect. We are building a "White Label Boutique Boilerplate".

**Important**: Use generic, high-end "Lorem Ipsum" placeholder text. The goal is to showcase UI/UX capabilities, not to build the agency site itself.

## Technical Stack
- Next.js 15+ (App Router)
- Tailwind CSS v4 (Use CSS @theme variables)
- Shadcn/UI (Latest)
- GSAP 3+ (for animations)
- Lucide React (Icons)
- Font: Inter (Primary)

## Step 1: Layout & Environment
1. The project is already initialized with Next.js and Tailwind v4. 
2. Ensure `src/app/globals.css` is configured with a strict #000 (Black) background and #FFF (White) text using Tailwind v4 syntax.
3. Setup a responsive Navigation Menu (Shadcn) with glassmorphism effect (backdrop-blur).

## Step 2: The "Split-Diagonal" Hero Section
Create a Hero component (`components/sections/hero-showcase.tsx`):
- **Dimensions**: 100svh (small viewport height) and 100svw (small viewport width) to prevent unwanted scrolling on mobile.
- **Layout**: Two-column grid (Desktop). 
    - **Left Column**: Typography focused. Big bold headers.
    - **Right Column**: Image focused. Use high-quality Unsplash placeholders.
- **The Diagonal Cut (Visual Signature)**: 
    - Apply a `clip-path` or a CSS shape to the Right Column (image). 
    - Tech Spec: A diagonal cut on the left side of the image container. From `x: 0, y: 100%` (bottom-left) to `x: 15%, y: 0%` (top-left). This creates a subtle invasion of the text area into the image space.
- **GSAP Animation**: 
    - Implement a 2-slide carousel. 
    - Every 5 seconds, fade out/slide text and image, replacing them with a second set of "Lorem Ipsum" data. 
    - Animation must be smooth and "boutique-like".

## Step 3: Global Styles
- Implement Glassmorphism utility classes.
- Ensure all Shadcn components installed (Button, Nav) follow the Black/White high-contrast theme.