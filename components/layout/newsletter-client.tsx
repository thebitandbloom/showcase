"use client"

import React, { useState } from 'react'

export default function NewsletterClient() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email.')
      return
    }

    setStatus('loading')
    try {
      // Simulate network
      await new Promise((r) => setTimeout(r, 900))
      setStatus('success')
      setMessage('Thanks — you are subscribed!')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={submit} className="w-full">
      <label htmlFor="newsletter-email" className="text-sm font-medium text-zinc-300 block mb-2">Join our newsletter</label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="flex-1 w-1/3 bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          aria-describedby="newsletter-status"
        />
        <button type="submit" className="bg-foreground text-background px-4 py-2 text-sm font-semibold">Subscribe</button>
      </div>

      <p id="newsletter-status" role="status" aria-live="polite" className={`mt-2 text-sm ${status==='error' ? 'text-destructive' : 'text-zinc-400'}`}>
        {message}
      </p>
    </form>
  )
}
