import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ShadcnInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ShadcnInput = React.forwardRef<HTMLInputElement, ShadcnInputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-base text-brand-ink ring-offset-white transition-colors placeholder:text-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
ShadcnInput.displayName = 'ShadcnInput'

export { ShadcnInput }
