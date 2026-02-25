'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface MediaPlaceholderProps {
  id: string
  description: string
  aspect?: '16:9' | '4:3' | '3:4' | '1:1' | '21:9'
  className?: string
  priority?: boolean
}

const ASPECT_RATIOS = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
  '1:1': 'aspect-square',
  '21:9': 'aspect-[21/9]',
}

export function MediaPlaceholder({
  id,
  description,
  aspect = '16:9',
  className,
  priority = false,
}: MediaPlaceholderProps) {
  const [imageExists, setImageExists] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imagePath = `/media/${id}.png`

  useEffect(() => {
    // Check if real image exists
    const img = new Image()
    img.onload = () => {
      setImageExists(true)
      setIsLoading(false)
    }
    img.onerror = () => {
      setImageExists(false)
      setIsLoading(false)
    }
    img.src = imagePath
  }, [imagePath])

  if (isLoading) {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-xl bg-slate-800/50 border border-slate-700/50',
          ASPECT_RATIOS[aspect],
          className
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (imageExists) {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-xl',
          ASPECT_RATIOS[aspect],
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagePath}
          alt={description}
          className="w-full h-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    )
  }

  // Render styled placeholder
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-slate-800/80 border border-slate-700/50',
        ASPECT_RATIOS[aspect],
        className
      )}
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-transparent to-cyan-900/20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {/* ID Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-slate-700/50 border border-slate-600/50 rounded-full">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-body-xs font-mono text-slate-400">{id}</span>
        </div>

        {/* Icon */}
        <div className="w-12 h-12 mb-4 rounded-lg bg-slate-700/50 border border-slate-600/50 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Description */}
        <p className="text-body-sm text-slate-400 max-w-xs leading-relaxed">
          {description}
        </p>

        {/* Aspect ratio indicator */}
        <span className="mt-3 text-body-xs font-mono text-slate-600">
          {aspect}
        </span>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-slate-600/30 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-slate-600/30 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-slate-600/30 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-slate-600/30 rounded-br-xl" />
    </div>
  )
}

// Export a simple wrapper for common use
export function Screenshot({
  id,
  description,
  aspect = '16:9',
  className,
}: MediaPlaceholderProps) {
  return (
    <MediaPlaceholder
      id={id}
      description={description}
      aspect={aspect}
      className={cn('shadow-card', className)}
    />
  )
}
