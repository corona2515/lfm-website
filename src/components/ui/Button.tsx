import Link from 'next/link'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'default' | 'small' | 'large'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
}

const sizeStyles: Record<ButtonSize, string> = {
  default: '',
  small: 'btn-small',
  large: 'btn-large',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', href, external, children, onClick, ...props }, ref) => {
    const styles = cn(
      'btn',
      variantStyles[variant],
      sizeStyles[size],
      className
    )

    if (href) {
      const linkClick = onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined

      if (external) {
        return (
          <a
            href={href}
            className={styles}
            target="_blank"
            rel="noopener noreferrer"
            onClick={linkClick}
          >
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className={styles} onClick={linkClick}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={styles} onClick={onClick} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
