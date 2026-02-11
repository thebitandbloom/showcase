import './marquee-scroller.css'
import LogosRow from './logos-row'

export default function MarqueeScrollerAlternative() {
  const duration = 30
  const rows = 2
  const sets = Array.from({ length: rows }).map((_, i) => ({
    id: i,
    direction: i % 2 === 0 ? 'left' : 'right',
  }))

  return (
    <section className="marquee-wrapper" aria-label="Partners and integrations">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {sets.map((set) => (
            <div
              key={set.id}
              className="marquee-container"
              data-direction={set.direction}
              style={{ ['--marquee-duration' as any]: `${duration + (set.id * 6)}s` }}
            >
              <div className="marquee-track">
                <div className="marquee-items">
                  <LogosRow />
                  {/* Duplicate the logos for seamless scrolling */}
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
