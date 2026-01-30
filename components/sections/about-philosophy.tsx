"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { he } from "date-fns/locale";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.to(".about-header", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-header",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Parallax effect on image
      gsap.to(imageRef.current, {
        y: -50,
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power1.out",
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
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          //delay: 0.1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 100%",
            //toggleActions: "play none none none",
            //scrub: true,
          },
        });
      }

      // Advanced reveal for h2 with spans
      gsap.set(textRef.current!.querySelector("h2.reveal-line"), { opacity: 0 });
      gsap.set(textRef.current!.querySelectorAll("h2.reveal-line span"), { visibility: "visible" });

      const words = textRef.current!.querySelectorAll("h2.reveal-line span");
      const lineStyle = window.getComputedStyle(words[0]);
      const lineHeight = parseFloat(lineStyle.lineHeight);

      if (words) {
        words.forEach((word, index) => {
          gsap.fromTo(word, {
            y: index * lineHeight + 60,
            opacity: 0,
          }, {
            y: index * lineHeight,
            opacity: 1,
            duration: 1,
            stagger: index * 0.1,
            ease: "power1.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 90%",
              //toggleActions: "play none none none",
              //scrub: true,
            },
          });
        });

        
        const h2RevealLineContentHeight = lineHeight * words.length;
        const h2Reveal = textRef.current?.querySelector("h2.reveal-line");

        gsap.to(h2Reveal!, {
          height: h2RevealLineContentHeight,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            //toggleActions: "play none none none",
            //scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-40 flex flex-col bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col">
        {/* Section Header */}
        <div className="about-header w-full mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 opacity-0 translate-y-8">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
              About Us
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
              Digital Craftsmanship.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground leading-relaxed text-sm md:text-right">
            We don't just build software; we sculpt digital
            experiences that resonate with elegance and purpose.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden relative">
            <div ref={imageRef} className="absolute inset-0 scale-200 opacity-0 -translate-y-8 md:-translate-y-16 transition-transform duration-700 will-change-transform">
              <Image
                src="/about-philosophy.png" // We'll move the generated image here or reference it correctly
                alt="Boutique Interior"
                fill
                className="object-cover grayscale brightness-75 transition-all duration-700 hover:grayscale-0 hover:brightness-100"
                priority
              />
              <div className="absolute inset-0 bg-background/20" />
            </div>
          </div>

          {/* Right Side: Philosophy */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 z-10">
            <div ref={textRef} className="max-w-xl space-y-12">
              <div className="space-y-4">
                <span className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-semibold block reveal-line">
                  Established 2024
                </span>
                <h2 className="relative flex invisible text-4xl md:text-6xl font-sans italic text-foreground leading-16 reveal-line">
                  <span className="absolute inline-flex">Crafting</span> 
                  <span className="absolute inline-flex">Digital</span> 
                  <span className="absolute inline-flex">Artifacts</span> 
                  <span className="absolute inline-flex">for</span> 
                  <span className="absolute inline-flex">the</span> 
                  <span className="absolute inline-flex">Modern</span> 
                  <span className="absolute inline-flex">Connossieur.</span>
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
        </div>
      </div>
    </section>
  );
}
