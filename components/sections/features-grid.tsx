'use client';

import { useRef } from 'react';
import { Zap, Layers, Cpu, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
    {
        title: "Precision Engineering",
        description: "Every pixel is optimized for performance and clarity. We believe in code that is as beautiful as the interface it powers.",
        icon: Zap
    },
    {
        title: "Ethereal Design",
        description: "Minimalism redefined. Our design philosophy focuses on the space between elements, creating a sense of calm and luxury.",
        icon: Layers
    },
    {
        title: "Seamless Experience",
        description: "Interactions that feel like magic. We leverage motion to guide users through stories, not just interfaces.",
        icon: Cpu
    },
    {
        title: "Global Reach",
        description: "Ready for the world stage. Scalable, localized, and accessible solutions designed for a diverse global audience.",
        icon: Globe
    }
];

export default function FeaturesGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        // Filter out null refs
        const validCards = cardsRef.current.filter((card) => card !== null);

        // Animate header
        gsap.to(".features-header", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".features-header",
                start: "top 90%", // Start earlier for better feel
                toggleActions: "play none none none"
            }
        });

        // Staggered cards animation
        gsap.to(validCards, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%", // Reliable on all screen sizes
                toggleActions: "play none none none"
            }
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="py-24 md:py-40 bg-black border-t border-white/5"
            id="features"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="features-header mb-20 md:mb-32 max-w-2xl opacity-0 translate-y-8">
                    <span className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                        Capabilities
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
                        Elevating the standard of digital excellence.
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            ref={(el) => { cardsRef.current[idx] = el; }}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - rect.left) / rect.width) * 100;
                                const y = ((e.clientY - rect.top) / rect.height) * 100;
                                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                            }}
                            className="group relative p-8 bg-zinc-950 border border-white/5 hover:border-white/20 transition-all duration-500 rounded-lg overflow-hidden opacity-0 translate-y-12"
                        >
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-radial-[circle_at_var(--mouse-x,50%)_var(--mouse-y,50%)] from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="mb-6 inline-flex p-3 rounded-full bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors duration-500">
                                    <feature.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Subtle Bottom Accent */}
                            <div className="absolute bottom-0 left-0 h-px w-0 bg-white group-hover:w-full transition-all duration-700" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
