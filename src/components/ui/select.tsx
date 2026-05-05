import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ShadcnSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const ShadcnSelect = React.forwardRef<HTMLSelectElement, ShadcnSelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-lg border border-brand-border bg-white px-3 py-2 text-base text-brand-ink ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
)
ShadcnSelect.displayName = 'ShadcnSelect'

export { ShadcnSelect }
