'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

type LoaderContextType = {
  isLoading: boolean
  progress: number
}

const LoaderContext = createContext<LoaderContextType>({
  isLoading: true,
  progress: 0,
})

export const useLoader = () => useContext(LoaderContext)

export function LayoutLoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let mounted = true
    let currentProgress = 0

    const updateProgress = (newProgress: number) => {
      if (mounted) {
        currentProgress = Math.min(newProgress, 99)
        setProgress(currentProgress)
      }
    }

    const finishLoading = () => {
      if (mounted) {
        setProgress(100)
        setTimeout(() => {
          if (mounted) setIsLoading(false)
        }, 300) // brief delay for smooth fade
      }
    }

    // 1. Wait for Google Fonts to load
    updateProgress(10)
    document.fonts.ready
      .then(() => {
        updateProgress(50)
      })
      .catch(() => {
        // Fonts failed, continue anyway
        updateProgress(50)
      })

    // 2. Wait for hero images (assume img[data-hero] class exists)
    const heroImages = document.querySelectorAll('img[data-hero]')
    if (heroImages.length === 0) {
      updateProgress(75)
      finishLoading()
      return
    }

    let heroLoadedCount = 0
    const onHeroLoad = () => {
      heroLoadedCount++
      const heroProgress = 50 + (heroLoadedCount / heroImages.length) * 25
      updateProgress(heroProgress)

      if (heroLoadedCount === heroImages.length) {
        updateProgress(75)
        finishLoading()
      }
    }

    const onHeroError = () => {
      heroLoadedCount++
      if (heroLoadedCount === heroImages.length) {
        updateProgress(75)
        finishLoading()
      }
    }

    heroImages.forEach((img) => {
      if ((img as HTMLImageElement).complete) {
        // Image already cached/loaded
        onHeroLoad()
      } else {
        img.addEventListener('load', onHeroLoad)
        img.addEventListener('error', onHeroError)
      }
    })

    return () => {
      mounted = false
      heroImages.forEach((img) => {
        img.removeEventListener('load', onHeroLoad)
        img.removeEventListener('error', onHeroError)
      })
    }
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="w-64 space-y-4">
          <Progress value={progress} className="w-full" />
          <p className="text-white text-center text-sm">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    )
  }

  return (
    <LoaderContext.Provider value={{ isLoading, progress }}>
      {children}
    </LoaderContext.Provider>
  )
}
