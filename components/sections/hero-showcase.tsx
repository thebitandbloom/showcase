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
	const containerRef = useRef(null);
	const textRef = useRef(null);
	const imageRef = useRef(null);

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

	// Auto-cycle timer
	useGSAP(() => {
		const tl = gsap.timeline({
			repeat: -1,
			defaults: { ease: "power2.inOut" }
		});

		tl.to([textRef.current, imageRef.current], {
			opacity: 0,
			y: 20,
			duration: 0.8,
			delay: 5, // 🟢 TUNING: Adjust this to change how long the slide stays visible
		})
			.call(() => {
				// Update content while invisible
				setActiveIndex((prev) => (prev + 1) % content.length);
			})
			.to([textRef.current, imageRef.current], {
				opacity: 1,
				y: 0,
				duration: 1,
				delay: 0.1, // Wait for React render
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
			<div className="flex items-center justify-center p-12 md:p-24 relative z-10">
				<div ref={textRef} className="max-w-xl space-y-6">
					<span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
						{current.kicker}
					</span>
					<h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
						{current.headline}
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md">
						{current.description}
					</p>
					<button className="mt-8 px-8 py-4 border border-white/20 hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm font-medium cursor-pointer">
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
						clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)"
					}}
				>
					<Image
						src={current.image}
						alt={current.headline}
						fill={true}
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/20" />
				</div>
			</div>
		</section>
	);
}
