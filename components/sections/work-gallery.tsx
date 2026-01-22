'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, X } from 'lucide-react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
	{
		id: 1,
		title: "Noir Architecture",
		category: "Spatial Design",
		description: "A comprehensive study in shadow and light. We transformed a heritage industrial space into a sanctuary of silence, using raw concrete and absolute black accents to frame the void.",
		year: "2025",
		image: "https://images.unsplash.com/photo-1522517779552-6cf4c1f31ee3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: 2,
		title: "Void Objects",
		category: "Product Design",
		description: "A physical manifestation of digital minimalism. This limited series of desktop objects explores the relationship between functional geometry and aesthetic purity.",
		year: "2024",
		image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		id: 3,
		title: "Analog Future",
		category: "Brand Identity",
		description: "Reimagining tech heritage for the modern era. We developed a visual language that honors the tactility of physical media while serving a purely digital product ecosystem.",
		year: "2024",
		image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
	},
	{
		id: 4,
		title: "Silk & Stone",
		category: "Digital Campaign",
		description: "Juxtaposing organic fluidity with rigid structures. This campaign generated a 40% increase in brand engagement through a series of interactive, WebGL-powered visual narratives.",
		year: "2025",
		image: "https://images.unsplash.com/photo-1711581774603-a0475422191c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
];

export default function WorkGallery() {
	const containerRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

	useGSAP(() => {
		// Filter out null refs
		const validItems = itemsRef.current.filter((item) => item !== null);

		// Header Animation
		gsap.to(".gallery-header", {
			y: 0,
			opacity: 1,
			duration: 1,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".gallery-header",
				start: "top 90%",
				toggleActions: "play none none none"
			}
		});

		// Grid Items Animation
		gsap.to(validItems, {
			y: 0,
			opacity: 1,
			duration: 1.2,
			ease: "power4.out",
			stagger: 0.2,
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top 75%",
				toggleActions: "play none none none"
			}
		});
	}, { scope: containerRef });

	return (
		<section ref={containerRef} className="py-24 md:py-40 bg-black text-white" id="work">
			<div className="max-w-7xl mx-auto px-6">

				{/* Section Header */}
				<div className="gallery-header mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 opacity-0 translate-y-8">
					<div className="max-w-2xl">
						<span className="text-sm font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
							Selected Works
						</span>
						<h2 className="text-4xl md:text-6xl font-bold tracking-tight">
							Curated digital artifacts.
						</h2>
					</div>
					<p className="max-w-md text-muted-foreground leading-relaxed text-sm md:text-right">
						A retrospective of our defining moments in design, strategy, and technical execution.
					</p>
				</div>

				{/* Gallery Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
					{projects.map((project, idx) => (
						<Dialog key={project.id}>
							<DialogTrigger asChild>
								<div
									ref={(el) => { itemsRef.current[idx] = el; }}
									className="group cursor-pointer relative block w-full aspect-[4/3] overflow-hidden bg-zinc-900 opacity-0 translate-y-12"
								>
									<div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

									{/* Image */}
									<Image
										src={project.image}
										alt={project.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>

									{/* Hover Overlay Info */}
									<div className="absolute inset-0 z-20 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<span className="text-xs font-medium tracking-widest uppercase text-white/70 block mb-2">{project.category}</span>
											<h3 className="text-2xl font-bold text-white flex items-center justify-between">
												{project.title}
												<ArrowUpRight className="w-5 h-5 text-white/70" />
											</h3>
										</div>
									</div>
								</div>
							</DialogTrigger>

							<DialogContent className="max-w-5xl bg-zinc-950 border-zinc-800 p-0 overflow-hidden !rounded-none">
								<div className="grid grid-cols-1 md:grid-cols-2 h-[80vh] md:h-[600px]">
									{/* Modal Image */}
									<div className="relative h-64 md:h-full w-full bg-zinc-900">
										<Image
											src={project.image}
											alt={project.title}
											fill
											className="object-cover"
										/>
									</div>

									{/* Modal Details */}
									<div className="p-8 md:p-12 flex flex-col justify-center bg-zinc-950">
										<DialogHeader>
											<div className="flex items-center justify-between mb-2">
												<span className="text-xs font-medium tracking-[0.2em] uppercase text-zinc-500">{project.category}</span>
												<span className="text-xs font-mono text-zinc-500">{project.year}</span>
											</div>
											<DialogTitle className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
												{project.title}
											</DialogTitle>
											<DialogDescription className="text-lg text-zinc-400 leading-relaxed font-light">
												{project.description}
											</DialogDescription>
										</DialogHeader>

										<div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-4">
											<div className="flex gap-4">
												<div className="flex-1">
													<span className="block text-xs uppercase tracking-wider text-zinc-600 mb-1">Role</span>
													<span className="text-sm text-white">Design & Development</span>
												</div>
												<div className="flex-1">
													<span className="block text-xs uppercase tracking-wider text-zinc-600 mb-1">Client</span>
													<span className="text-sm text-white">Confidential</span>
												</div>
											</div>
											<button className="mt-4 w-full py-4 bg-white text-black font-medium tracking-widest text-xs uppercase hover:bg-zinc-200 transition-colors">
												View Live Project
											</button>
										</div>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					))}
				</div>

			</div>
		</section>
	);
}
