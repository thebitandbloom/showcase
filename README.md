# Showcase Page - High-End White Label Foundation

This project is a "White Label Boutique Boilerplate" built with a focus on premium aesthetics, smooth animations, and a strict monochrome design system.

## Phase 1 Implementation Summary

### 1. Environment & Design System
- **Theme**: Configured a strict **#000 (Black)** background and **#FFF (White)** text theme in `globals.css` using **Tailwind CSS v4**.
- **Glassmorphism**: Added a custom `.glass` utility class for high-end backdrop blur effects.
- **Typography**: Optimized for Inter (via Google Fonts) with clean, editorial-style spacing.
- **Configuration**: Updated `next.config.ts` to support high-quality remote images from Unsplash.

### 2. Navigation (`components/layout/main-nav.tsx`)
- **Structure**: A fixed, glassmorphic header acting as a persistent navigation layer.
- **Components**: Utilized **Shadcn UI** Navigation Menu for desktop and Sheet for mobile.
- **Responsiveness**: Fully responsive design with a dedicated mobile drawer menu.

### 3. Hero Section (`components/sections/hero-showcase.tsx`)
- **Layout**: Full-screen (`100svh`) split-layout.
    - **Left**: Typography-focused editorial content.
    - **Right**: Image showcase with a signature **Diagonal Cut** (`clip-path`).
- **Animation**: Integrated **GSAP** (GreenSock Animation Platform) for boutique-style transitions.
    - Features a simplified carousel affecting both text and images.
    - Auto-cycles content every 5 seconds with smooth fade/slide effects.

## Technologies Used
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI (Radix Primitives)
- **Animations**: GSAP 3 + @gsap/react
- **Icons**: Lucide React

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open**: [http://localhost:3000](http://localhost:3000)
