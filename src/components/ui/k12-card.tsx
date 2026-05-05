import * as React from 'react'
import { cn } from '@/lib/utils'

const K12Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-xl border border-brand-border bg-white text-brand-ink shadow-sm', className)}
    {...props}
  />
))
K12Card.displayName = 'K12Card'

const K12CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
K12CardContent.displayName = 'K12CardContent'

export { K12Card, K12CardContent }
