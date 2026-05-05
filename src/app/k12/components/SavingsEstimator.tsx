'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { K12Button } from '@/components/ui/k12-button'
import { ShadcnInput } from '@/components/ui/input'
import { ShadcnLabel } from '@/components/ui/label'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function SavingsEstimator() {
  const [schools, setSchools] = useState(12)
  const [sqft, setSqft] = useState(80000)
  const [wastePct, setWastePct] = useState(25)
  const reduceMotion = useReducedMotion()

  const estimatedSavings = useMemo(
    () => Math.round(schools * sqft * (0.85 * (wastePct / 25))),
    [schools, sqft, wastePct]
  )

  const trackChange = (next: { schools?: number; sqft?: number; wastePct?: number }) => {
    const nextSchools = next.schools ?? schools
    const nextSqft = next.sqft ?? sqft
    const nextWastePct = next.wastePct ?? wastePct
    const nextSavings = Math.round(nextSchools * nextSqft * (0.85 * (nextWastePct / 25)))

    trackEvent('k12_estimator_changed', {
      schools: nextSchools,
      sqft: nextSqft,
      waste_pct: nextWastePct,
      estimated_savings: nextSavings,
    })
  }

  return (
    <div className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6">
        <div className="rounded-xl bg-brand-primary px-5 py-6 text-white">
          <p className="text-sm font-medium text-white/75">Estimated annual avoidable HVAC waste:</p>
          <motion.p
            key={estimatedSavings}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            className="mt-2 font-mono text-4xl font-bold tabular-nums tracking-[-0.01em] md:text-5xl"
          >
            {formatCurrency(estimatedSavings)}
          </motion.p>
        </div>

        <div className="grid gap-5">
          <div className="grid gap-2">
            <ShadcnLabel htmlFor="schools">Number of schools</ShadcnLabel>
            <ShadcnInput
              id="schools"
              type="number"
              min={1}
              max={100}
              value={schools}
              onChange={(event) => {
                const next = clamp(Number(event.target.value) || 1, 1, 100)
                setSchools(next)
                trackChange({ schools: next })
              }}
            />
          </div>
          <div className="grid gap-2">
            <ShadcnLabel htmlFor="sqft">Average sqft per school</ShadcnLabel>
            <ShadcnInput
              id="sqft"
              type="number"
              min={10000}
              max={300000}
              step={1000}
              value={sqft}
              onChange={(event) => {
                const next = clamp(Number(event.target.value) || 10000, 10000, 300000)
                setSqft(next)
                trackChange({ sqft: next })
              }}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center justify-between gap-4">
              <ShadcnLabel htmlFor="waste">Estimated waste %</ShadcnLabel>
              <span className="font-mono text-sm font-semibold tabular-nums text-brand-primary">{wastePct}%</span>
            </div>
            <input
              id="waste"
              type="range"
              min={15}
              max={30}
              value={wastePct}
              onChange={(event) => {
                const next = Number(event.target.value)
                setWastePct(next)
                trackChange({ wastePct: next })
              }}
              className="h-2 w-full cursor-pointer accent-brand-accent"
            />
          </div>
        </div>

        <p className="text-sm leading-6 text-brand-muted">
          Based on the midpoint of a $0.50-$1.20 per square foot annual range observed in prior K-12 audits, with an adjustable waste range capped at 30%. Actual results vary by building condition, controls quality, data quality, and execution.
        </p>

        <K12Button asChild size="lg">
          <a
            href="#diagnostic-form"
            onClick={() => trackEvent('k12_estimator_cta_click', { cta_position: 'estimator' })}
          >
            Find this savings in your buildings →
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </a>
        </K12Button>
      </div>
    </div>
  )
}
