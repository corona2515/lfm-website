'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  question: string
  answer: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  variant?: 'dark' | 'light'
}

function AccordionItem({ question, answer, isOpen, onToggle, variant = 'dark' }: AccordionItemProps) {
  const isLight = variant === 'light'
  return (
    <div className={cn('border-b', isLight ? 'border-sky-100' : 'border-slate-800')}>
      <button
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={cn('heading-4 transition-colors pr-4', isLight ? 'text-slate-950 group-hover:text-sky-700' : 'text-white group-hover:text-cyan-400')}>
          {question}
        </span>
        <span
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center transition-all',
            isLight ? 'bg-sky-50' : 'bg-slate-800',
            isOpen && (isLight ? 'bg-emerald-50' : 'bg-cyan-500/20')
          )}
        >
          <svg
            className={cn(
              'w-5 h-5 transition-transform duration-300',
              isLight ? 'text-sky-700' : 'text-slate-400',
              isOpen && (isLight ? 'rotate-180 text-emerald-700' : 'rotate-180 text-cyan-400')
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-[48rem] pb-6' : 'max-h-0'
        )}
      >
        <div className={cn('body-large pr-14', isLight && 'text-slate-700')}>{answer}</div>
      </div>
    </div>
  )
}

interface AccordionProps {
  items: readonly { question: string; answer: React.ReactNode }[]
  className?: string
  variant?: 'dark' | 'light'
}

export function Accordion({ items, className, variant = 'dark' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={cn('divide-y', variant === 'light' ? 'divide-sky-100' : 'divide-slate-800', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          variant={variant}
        />
      ))}
    </div>
  )
}
