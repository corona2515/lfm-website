import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const k12ButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand-primary text-white hover:bg-brand-primaryDark',
        secondary: 'border border-brand-border bg-white text-brand-ink hover:bg-brand-surfaceAlt',
        ghost: 'text-brand-primary hover:bg-brand-primary/10',
        outline: 'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
      },
      size: {
        default: 'h-11 px-5 py-2 text-sm',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface K12ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof k12ButtonVariants> {
  asChild?: boolean
}

const K12Button = React.forwardRef<HTMLButtonElement, K12ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(k12ButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
K12Button.displayName = 'K12Button'

export { K12Button, k12ButtonVariants }
