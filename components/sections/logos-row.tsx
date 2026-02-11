'use client'
import React, { useEffect, useState } from "react"

type Logo = {
  name: string
  svg: string
}

const logos: Logo[] = [
  { name: "Adobe", svg: "/logos/adobe.svg" },
  { name: "Atlassian", svg: "/logos/atlassian.svg" },
  { name: "Boeing", svg: "/logos/boeing.svg" },
  { name: "ClickUp", svg: "/logos/clickup.svg" },
  { name: "Coinbase", svg: "/logos/coinbase.svg" },
  { name: "Duolingo", svg: "/logos/duolingo.svg" },
  { name: "Google", svg: "/logos/google.svg" },
  { name: "Gusto", svg: "/logos/gusto.svg" },
  { name: "Microsoft", svg: "/logos/microsoft.svg" },
  { name: "Next.js", svg: "/logos/nextjs.svg" },
  { name: "PayPal", svg: "/logos/paypal.svg" },
  { name: "Plaid", svg: "/logos/plaid.svg" },
  { name: "Sofi", svg: "/logos/sofi.svg" },
  { name: "Stripe", svg: "/logos/stripe.svg" },
  { name: "Vercel", svg: "/logos/vercel.svg" },
  { name: "Zillow", svg: "/logos/zillow.svg" },
]

export default function LogosRow() {
  const [svgs, setSvgs] = useState<Record<string, string>>({})

  useEffect(() => {
    let mounted = true
    Promise.all(
      logos.map(async (l) => {
        try {
          const res = await fetch(l.svg)
          const text = await res.text()
          return { name: l.name, text }
        } catch {
          return { name: l.name, text: "" }
        }
      })
    ).then((results) => {
      if (!mounted) return
      const map: Record<string, string> = {}
      results.forEach((r) => { map[r.name] = r.text })
      setSvgs(map)
    })
    return () => { mounted = false }
  }, [])

  return (
    <>
      {logos.map((logo, idx) => {
        const svg = svgs[logo.name] || ""
        return (
          <div
            key={idx}
            className="marquee-item logoImage"
            aria-label={`${logo.name} logo`}
            // set color on parent to control the SVG via currentColor
            style={{ color: "white" }}
            // inline the SVG when loaded so it inherits currentColor
            dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
          >
            {!svg ? null : null}
          </div>
        )
      })}
    </>
  )
}
