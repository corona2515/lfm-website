'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionRevealProps {
  id?: string
  className?: string
  children: React.ReactNode
}

export function SectionReveal({ id, className, children }: SectionRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={cn('scroll-mt-24 py-20 md:py-28', className)}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}

export function K12Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
