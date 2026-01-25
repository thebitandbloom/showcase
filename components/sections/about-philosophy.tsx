"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal animation
      const lines = textRef.current?.querySelectorAll(".reveal-line");
      if (lines) {
        gsap.from(lines, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col md:flex-row bg-black overflow-hidden"
    >
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden relative">
        <div ref={imageRef} className="absolute inset-0 scale-110">
          <Image
            src="/about-philosophy.png" // We'll move the generated image here or reference it correctly
            alt="Boutique Interior"
            fill
            className="object-cover grayscale brightness-75 transition-all duration-700 hover:grayscale-0 hover:brightness-100"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Right Side: Philosophy */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 z-10">
        <div ref={textRef} className="max-w-xl space-y-12">
          <div className="space-y-4">
            <span className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-semibold block reveal-line">
              Established 2024
            </span>
            <h2 className="text-4xl md:text-6xl font-playfair italic text-white leading-tight reveal-line">
              Crafting Digital Artifacts <br /> for the Modern Connossieur.
            </h2>
          </div>

          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed reveal-line">
            We believe that software should be treated with the same reverence as
            a bespoke timepiece or a rare vintage. In a world of mass-produced
            templates, we choose the path of the artisan.
          </p>

          <div className="pt-8 border-t border-zinc-800 reveal-line">
            <p className="font-playfair text-2xl text-zinc-300 italic">
              "The void is where we begin. Excellence is where we arrive."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
