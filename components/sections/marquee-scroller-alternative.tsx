"use client"

import React, { use, useEffect, useRef } from 'react'
import './marquee-scroller.css'
import LogosRow from './logos-row'

export default function MarqueeScrollerAlternative() {
  const duration = 36
  const rows = 2
  const sets = Array.from({ length: rows }).map((_, i) => ({
    id: i,
    direction: i % 2 === 0 ? 'left' : 'right',
  }))

  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const containers = Array.from(containerRef.current.querySelectorAll('.marquee-container')) as HTMLElement[]

    containers.forEach((container) => {
      const itemsOnTrack = container.querySelector('.marquee-items') as HTMLElement | null
      if (!itemsOnTrack) return
      const items = itemsOnTrack.querySelectorAll('.marquee-item') as NodeListOf<HTMLElement>
      // const half = Math.round(itemsOnTrack.scrollWidth / 2)
      // itemsOnTrack.style.setProperty('--marquee-shift', `${half}px`)
      items.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement
        duplicatedItem.setAttribute('aria-hidden', 'true')
        itemsOnTrack.appendChild(duplicatedItem)
      })
    })
  }, [])

  return (
    <section ref={containerRef} className="marquee-wrapper" aria-label="Partners and integrations">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {sets.map((set) => (
            <div
              key={set.id}
              className="marquee-container"
              data-direction={set.direction}
              style={{ ['--marquee-duration' as any]: `${duration}s` }}
            >
              <div className="marquee-track" aria-hidden>
                <div className="marquee-items">
                  <LogosRow />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
