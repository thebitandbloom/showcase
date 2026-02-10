"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "Discovery",
    tagline: "Defining the void and the vision.",
    description: "Every masterpiece begins with silence. We immerse ourselves in your world to understand the core essence of what needs to be born.",
  },
  {
    title: "Curation",
    tagline: "Selecting materials and digital textures.",
    description: "We hand-select the finest technologies and design frameworks, ensuring every pixel and line of code resonates with quality.",
  },
  {
    title: "Execution",
    tagline: "Precision engineering and design.",
    description: "The artisan's work begins. We build with obsessive attention to detail, transforming raw concepts into refined digital structures.",
  },
  {
    title: "Unveiling",
    tagline: "The final artifact delivery.",
    description: "The moment of revelation. We deliver not just a product, but a timeless digital artifact ready to make its mark on the world.",
  },
];

export default function BoutiqueProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.to(".process-header", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });

      // Growing line animation
      gsap.set(lineRef.current, { height: 0, width: 2 });
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Step animations
      stepRefs.current.forEach((step, index) => {
        if (!step) return;

        const content = step.querySelector(".step-content");
        const dot = step.querySelector(".step-dot");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
          },
        });

        tl.from(dot, {
          scale: 0,
          duration: 0.6,
          ease: "back.out(2)",
        }).from(
          content,
          {
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  });

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-40 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col">
        {/* Section Header */}
        <div className="process-header w-full mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 opacity-0 translate-y-8">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              Process
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
              Crafting Digital Masterpieces.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground leading-relaxed text-sm md:text-right">
            We don't just build software; we sculpt digital
            experiences that resonate with elegance and purpose.
          </p>
        </div>

        {/* Header */}
        <div className="text-center mb-32 space-y-4">
          <h2 className="text-4xl md:text-7xl font-sans italic">
            The Boutique Process
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-sm">
            A Journey of Excellence
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Central Line (Background) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-zinc-800" />

          {/* Animated Growing Line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-foreground z-10 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          />

          {/* Steps */}
          <div className="space-y-32 md:space-y-64">
            {STEPS.map((step, index) => (
              <div
                key={index}
                ref={(el) => { stepRefs.current[index] = el; }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center justify-between",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Content */}
                <div className={cn(
                  "w-full md:w-[45%] step-content",
                  index % 2 === 0 ? "text-right" : "text-left"
                )}>
                  <span className="text-zinc-500 font-mono text-sm mb-4 block">
                    Phase 0{index + 1}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-playfair mb-4">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                    <span className="text-foreground font-medium italic mr-2">
                      {step.tagline}
                    </span>
                    {step.description}
                  </p>
                </div>

                {/* Dot on the line */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center p-4">
                  <div className="step-dot w-3 h-3 bg-foreground rounded-full z-20 shadow-[0_0_10px_foreground]" />
                </div>

                {/* Spacer for the other side on desktop */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
