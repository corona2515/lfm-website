import { cn } from '@/lib/utils'

type BadgeVariant = 'cyan' | 'slate'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'cyan', className }: BadgeProps) {
  return (
    <span
      className={cn(
        variant === 'cyan' ? 'badge-cyan' : 'badge-slate',
        className
      )}
    >
      {children}
    </span>
  )
}
