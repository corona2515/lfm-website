'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const ShadcnDialog = DialogPrimitive.Root
const ShadcnDialogTrigger = DialogPrimitive.Trigger
const ShadcnDialogPortal = DialogPrimitive.Portal
const ShadcnDialogClose = DialogPrimitive.Close

const ShadcnDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 bg-black/45 backdrop-blur-sm', className)}
    {...props}
  />
))
ShadcnDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const ShadcnDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ShadcnDialogPortal>
    <ShadcnDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-brand-border bg-white p-6 text-brand-ink shadow-xl focus-visible:outline-none',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1 text-brand-muted hover:bg-brand-surfaceAlt hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
        <X className="size-5" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </ShadcnDialogPortal>
))
ShadcnDialogContent.displayName = DialogPrimitive.Content.displayName

const ShadcnDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-2 text-left', className)} {...props} />
)
ShadcnDialogHeader.displayName = 'ShadcnDialogHeader'

const ShadcnDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-2xl font-semibold leading-tight tracking-[-0.01em]', className)}
    {...props}
  />
))
ShadcnDialogTitle.displayName = DialogPrimitive.Title.displayName

const ShadcnDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm leading-6 text-brand-muted', className)}
    {...props}
  />
))
ShadcnDialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  ShadcnDialog,
  ShadcnDialogPortal,
  ShadcnDialogOverlay,
  ShadcnDialogTrigger,
  ShadcnDialogClose,
  ShadcnDialogContent,
  ShadcnDialogHeader,
  ShadcnDialogTitle,
  ShadcnDialogDescription,
}
