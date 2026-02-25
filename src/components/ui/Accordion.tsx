'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-slate-800">
      <button
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="heading-4 text-white group-hover:text-cyan-400 transition-colors pr-4">
          {question}
        </span>
        <span
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center transition-all',
            isOpen && 'bg-cyan-500/20'
          )}
        >
          <svg
            className={cn(
              'w-5 h-5 text-slate-400 transition-transform duration-300',
              isOpen && 'rotate-180 text-cyan-400'
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
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        )}
      >
        <p className="body-large pr-14">{answer}</p>
      </div>
    </div>
  )
}

interface AccordionProps {
  items: readonly { question: string; answer: string }[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={cn('divide-y divide-slate-800', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}
