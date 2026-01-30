'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const content = [
	{
		kicker: "Spring / Summer 2026",
		headline: "Ethereal Minimalism",
		description: "Experience the essence of void and form. Where structural integrity meets delicate aesthetics in a symphony of monochrome silence.",
		image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
	},
	{
		kicker: "Autumn / Winter 2026",
		headline: "Obsidian Dreams",
		description: "Darkness is not the absence of light, but the canvas of creation. Embrace the shadows with textures that whisper elegance.",
		image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
	}
];

export default function HeroShowcase() {
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLElement | null>(null);
	const textRef = useRef<HTMLDivElement | null>(null);
	const imageRef = useRef<HTMLDivElement | null>(null);

	// Respect user's reduced motion preference
 	const prefersReducedMotion = typeof window !== 'undefined' &&
 		window.matchMedia &&
 		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* // Auto-cycle timer
	useGSAP(() => {
		const timer = setInterval(() => {
			const tl = gsap.timeline({
				onComplete: () => {
					setActiveIndex((prev) => (prev + 1) % content.length);
				}
			});

			tl.to([textRef.current, imageRef.current], {
				opacity: 0,
				y: 20,
				duration: 0.8,
				ease: "power2.inOut"
			});
		}, 8000);
		return () => clearInterval(timer);
	}, { scope: containerRef });

	// Animate In when index changes
	useGSAP(() => {
		gsap.fromTo([textRef.current, imageRef.current],
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.out" }
		);
	}, { scope: containerRef, dependencies: [activeIndex] }); */

	// Auto-cycle timer (disabled for users who prefer reduced motion)
	useGSAP(() => {
		if (prefersReducedMotion) return

		const tl = gsap.timeline({
			repeat: -1,
			defaults: { ease: "power2.inOut" }
		});

		tl.to([textRef.current, imageRef.current], {
			opacity: 0,
			transform: 'translateY(20px)',
			duration: 0.8,
			delay: 5,
		})
			.call(() => {
				setActiveIndex((prev) => (prev + 1) % content.length);
			})
			.to([textRef.current, imageRef.current], {
				opacity: 1,
				transform: 'translateY(0px)',
				duration: 1,
				delay: 0.1,
				ease: "power2.out"
			});

		return () => {
			tl.kill();
		};
	}, { scope: containerRef });


	const current = content[activeIndex];

	return (
		<section ref={containerRef} className="relative h-svh w-svw overflow-hidden bg-background text-foreground grid grid-cols-1 md:grid-cols-2">
			{/* Left Column: Text */}
			<div className="flex items-center justify-center md:justify-start p-12 md:p-24 relative z-10">
				<div ref={textRef} className="max-w-xl space-y-6 wrap-anywhere">
					<span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
						{current.kicker}
					</span>
					<h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter leading-tight wrap-anywhere">
						{current.headline}
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md">
						{current.description}
					</p>
					<button className="mt-8 px-8 py-4 border border-foreground/20 hover:bg-foreground hover:text-background transition-colors duration-300 uppercase tracking-widest text-sm font-medium cursor-pointer">
						Discover Collection
					</button>
				</div>
			</div>

			{/* Right Column: Image */}
			<div className="relative h-full w-full overflow-hidden">
				<div
					ref={imageRef}
					className="absolute inset-0 w-full h-full"
					style={{
						clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
						willChange: 'transform, opacity'
					}}
				>
					<Image
						src={current.image}
						alt={current.headline}
						fill={true}
						className="object-cover"
						priority
						sizes="(min-width: 768px) 50vw, 100vw"
					/>
					<div className="absolute inset-0 bg-background/20" aria-hidden />
				</div>
			</div>
		</section>
	);
}
