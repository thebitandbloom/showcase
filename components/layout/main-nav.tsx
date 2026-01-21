'use client';

import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"

export function MainNav() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 glass">
			<div className="container mx-auto px-6 h-20 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="text-2xl font-bold tracking-tighter uppercase text-white">
					Vøid
				</Link>

				{/* Desktop Nav */}
				<div className="hidden md:flex items-center gap-8">
					<NavigationMenu>
						<NavigationMenuList>
							{["Collections", "About", "Journal", "Contact"].map((item) => (
								<NavigationMenuItem key={item}>
									<NavigationMenuLink href="#" className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[active]:bg-white/20 data-[state=open]:bg-white/10`}>
										{item}
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				{/* Actions / Mobile Toggle */}
				<div className="flex items-center gap-4">
					<Button variant="ghost" className="hidden md:inline-flex uppercase tracking-widest text-xs text-white hover:bg-white/10 hover:text-white">
						Login
					</Button>
					<Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
						<Search className="h-5 w-5" />
					</Button>

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10 hover:text-white">
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="bg-black border-l-white/10 text-white w-full max-w-xs p-6">
							<SheetHeader>
								<SheetTitle className="text-white text-left uppercase tracking-widest">Menu</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-6 mt-12">
								{["Collections", "About", "Journal", "Contact", "Login"].map((item) => (
									<Link key={item} href="#" className="text-2xl text-white font-light hover:text-white/70 transition-colors uppercase tracking-tight">
										{item}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}
