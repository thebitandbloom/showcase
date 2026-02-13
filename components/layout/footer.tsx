import React from 'react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import NewsletterClient from '@/components/layout/newsletter-client';
import exampleData from '@/lib/footer-data';

type Link = { label: string; href: string; external?: boolean }
type Group = { title: string; links: Link[] }

type Brand = { name: string; logo?: string | null; description?: string; url?: string }

export default function Footer({
  brand = exampleData.brand,
  groups = exampleData.groups,
  featured = exampleData.featured,
  options = exampleData.options,
}: {
  brand?: Brand
  groups?: Group[]
  featured?: Array<{ title: string; href: string; image?: string }>
  options?: { showNewsletter?: boolean; compact?: boolean }
}) {
  return (
    <footer className="w-full bg-background border-t border-foreground/5 text-zinc-300" aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-start gap-4">
              {brand.logo && (
                <div className="w-12 h-12 relative shrink-0">
                  <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-contain" />
                </div>
              )}
              <div>
                <a href={brand.url ?? '#'} style={{ fontFamily: 'var(--font-zalando-sans)' }} className="font-extrabold uppercase text-foreground text-lg hover:underline">
                  {brand.name}
                </a>
                {brand.description && <p className="mt-2 text-base text-zinc-400">{brand.description}</p>}
              </div>
            </div>

            {options?.showNewsletter && (
              <div className="mt-6">
                <NewsletterClient />
              </div>
            )}
          </div>

          {/* Link Groups */}
          <div className="md:col-span-5 grid grid-cols-2 gap-6">
            {groups.slice(0, 4).map((g) => (
              <nav key={g.title} aria-labelledby={`footer-${g.title}`}>
                <h3 id={`footer-${g.title}`} className="text-sm font-semibold text-zinc-300 mb-3">
                  {g.title}
                </h3>
                <ul className="space-y-2">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-zinc-400 hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-white/20 rounded-sm"
                        {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Utilities / Social */}
          <div className="md:col-span-3">
            {featured && featured.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-zinc-300 mb-3">Featured</h4>
                <ul className="space-y-3">
                  {featured.map((f) => (
                    <li key={f.title}>
                      <a href={f.href} className="text-sm text-zinc-400 hover:text-foreground">
                        {f.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto">
              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Follow</h4>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="text-zinc-400 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-white/20 rounded-sm px-2 py-1">Twitter</a>
                <a href="#" className="text-zinc-400 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-white/20 rounded-sm px-2 py-1">Instagram</a>
                <a href="#" className="text-zinc-400 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-white/20 rounded-sm px-2 py-1">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-zinc-500">© {new Date().getFullYear()} {brand.name}. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-zinc-400 hover:text-foreground">Sitemap</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-foreground">Privacy</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
