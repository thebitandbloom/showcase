"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--border-radius": "var(--radius)",
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--success)",
          "--success-text": "var(--success-text)",
          "--success-border": "var(--success-border)",
          "--error-bg": "var(--error)",
          "--error-text": "var(--error-text)",
          "--error-border": "var(--error-border)",
          "--warning-bg": "var(--warning)",
          "--warning-text": "var(--warning-text)",
          "--warning-border": "var(--warning-border)",
          "--info-bg": "var(--info)",
          "--info-text": "var(--info-text)",
          "--info-border": "var(--info-border)",
          "--loading-bg": "var(--loading)",
          "--loading-border": "var(--loading-border)",
          "--loading-text": "var(--loading-text)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
