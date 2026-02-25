'use client'

import { Button } from '@/components/ui'
import { trackEvent } from '@/lib/analytics'

type ButtonProps = React.ComponentProps<typeof Button>
type EventParams = Record<string, string | number | boolean>

interface TrackedButtonProps extends ButtonProps {
  eventName: string
  eventParams?: EventParams
}

export function TrackedButton({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    trackEvent(eventName, eventParams)
    onClick?.(event as React.MouseEvent<HTMLButtonElement>)
  }

  return <Button {...props} onClick={handleClick} />
}
