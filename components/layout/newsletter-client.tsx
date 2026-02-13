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
    <form onSubmit={submit} className="w-full flex flex-col gap-2">
      <label htmlFor="newsletter-email" 
        className="uppercase tracking-widest text-xs font-semibold text-zinc-500">Join our newsletter</label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="YOU@COMPANY.COM"
          className="
            flex-1 w-1/3 
            bg-zinc-900 
            border 
            border-zinc-800 
            px-3 
            py-2 
            text-sm 
            text-foreground 
            focus:ring-1 
            focus:outline-1 
            focus:outline-foreground
            focus:ring-foreground!
            focus-visible:border-ring!
            focus-visible:ring-ring/50!
            focus-visible:ring-[3px]!
            focus-visible:outline-none
            transition-all 
            rounded-none 
            uppercase   
          "
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
