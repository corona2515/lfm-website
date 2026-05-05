'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useForm, type FieldErrors } from 'react-hook-form'
import { z } from 'zod'
import { trackEvent } from '@/lib/analytics'
import { K12Button } from '@/components/ui/k12-button'
import { ShadcnInput } from '@/components/ui/input'
import { ShadcnLabel } from '@/components/ui/label'
import { ShadcnSelect } from '@/components/ui/select'
import { SectionReveal, K12Container } from './SectionReveal'

const roleOptions = [
  'Facilities Director',
  'Director of Operations',
  'Superintendent',
  'Business Manager',
  'Energy Manager',
  'Other',
] as const

const basOptions = [
  'Trane',
  'Johnson Controls',
  'Siemens',
  'Schneider',
  'Honeywell',
  'Automated Logic',
  'Mixed/Multiple',
  'Other',
  'Not sure',
] as const

const included = [
  'Full BAS trend analysis on one building (any size up to 500K sqft)',
  'Impact-ranked fault report with validated issues ranked by estimated dollar impact',
  'Technician action playbook written in plain English',
  'Quick walkthrough call with the LeanFM team',
  'Board-ready executive summary deck',
  'Carbon impact report (lbs CO₂ avoided)',
  "Free 90-day re-scan to verify whether your team's fixes held",
  'Utility rebate eligibility map when applicable',
] as const

const formSchema = z.object({
  email: z.string().trim().email('Enter a valid work email.'),
  district: z.string().trim().min(2, 'District name is required.'),
  role: z.enum(roleOptions, { message: 'Select your role.' }),
  sqft: z.string().trim().min(1, 'Total district sqft is required.').regex(/^[\d,]+$/, 'Enter total square footage as a number.'),
  schoolCount: z.string().trim().optional(),
  bas: z.enum(basOptions, { message: 'Select the BAS in use.' }),
})

type DiagnosticFormValues = z.infer<typeof formSchema>

function formatInteger(value: string) {
  const digits = value.replace(/[^\d]/g, '')
  if (!digits) {
    return ''
  }

  return new Intl.NumberFormat('en-US').format(Number(digits))
}

function firstError(errors: FieldErrors<DiagnosticFormValues>) {
  const [field, error] = Object.entries(errors)[0] ?? []
  if (!field || !error?.message) {
    return null
  }

  return { field, error: String(error.message) }
}

export function OfferAndForm() {
  const router = useRouter()
  const startedRef = useRef(false)
  const [submitError, setSubmitError] = useState('')
  const form = useForm<DiagnosticFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      district: '',
      role: undefined,
      sqft: '',
      schoolCount: '',
      bas: undefined,
    },
  })

  const markStarted = () => {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('k12_form_started', {})
    }
  }

  const onSubmit = async (values: DiagnosticFormValues) => {
    setSubmitError('')
    const payload = {
      email: values.email,
      district: values.district,
      role: values.role,
      sqft: Number(values.sqft.replace(/[^\d]/g, '')),
      school_count: values.schoolCount ? Number(values.schoolCount.replace(/[^\d]/g, '')) : null,
      bas: values.bas,
    }

    try {
      const response = await fetch('/api/k12-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string; field?: string } | null
        trackEvent('k12_form_error', {
          field: body?.field || 'form',
          error: body?.error || 'Submission failed',
        })
        throw new Error(body?.error || 'Submission failed')
      }

      trackEvent('k12_form_submit', {
        role: values.role,
        sqft: payload.sqft,
        bas: values.bas,
        school_count: payload.school_count || 0,
      })
      router.push('/k12/thank-you')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  const onInvalid = (errors: FieldErrors<DiagnosticFormValues>) => {
    const error = firstError(errors)
    if (error) {
      trackEvent('k12_form_error', error)
    }
  }

  return (
    <SectionReveal id="diagnostic-form" className="bg-brand-primary text-white">
      <span id="book-call" className="block scroll-mt-24" aria-hidden="true" />
      <K12Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1fr)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              The K-12 Pilot
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.01em] md:text-5xl">
              The $50K Identified Waste Pilot.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/80">
              One building. Thirty days. Total investment $4,995. If the pilot does not identify at least $50,000 in annual avoidable HVAC waste in the audited building, we waive the pilot fee.
            </p>
            <ul className="mt-8 grid gap-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-white/90">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg font-semibold">
              Total deliverable value: $30,000. Your investment: $4,995, or $0 if the qualified pilot misses the identified-waste threshold.
            </p>
            <p className="mt-4 text-white/75">
              Eligibility, building scope, and pilot terms are confirmed during qualification. We accept five K-12 pilots per quarter. Q3 2026 is open.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-brand-ink shadow-xl">
            <h3 className="text-2xl font-semibold tracking-[-0.01em]">
              Start with a free building diagnostic.
            </h3>
            <p className="mt-3 leading-7 text-brand-muted">
              Share a few building details and we&apos;ll help you identify whether a K-12 BAS diagnostic is a fit. No commitment and no sales pressure.
            </p>
            <form
              className="mt-6 grid gap-5"
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              noValidate
            >
              <div className="grid gap-2">
                <ShadcnLabel htmlFor="email">Work email *</ShadcnLabel>
                <ShadcnInput
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!form.formState.errors.email}
                  {...form.register('email')}
                  onFocus={markStarted}
                />
                {form.formState.errors.email ? (
                  <p className="text-sm font-medium text-red-700">{form.formState.errors.email.message}</p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <ShadcnLabel htmlFor="district">District name *</ShadcnLabel>
                <ShadcnInput
                  id="district"
                  autoComplete="organization"
                  aria-invalid={!!form.formState.errors.district}
                  {...form.register('district')}
                  onFocus={markStarted}
                />
                {form.formState.errors.district ? (
                  <p className="text-sm font-medium text-red-700">{form.formState.errors.district.message}</p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <ShadcnLabel htmlFor="role">Your role *</ShadcnLabel>
                <ShadcnSelect
                  id="role"
                  aria-invalid={!!form.formState.errors.role}
                  {...form.register('role')}
                  onFocus={markStarted}
                  defaultValue=""
                >
                  <option value="" disabled>Select role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </ShadcnSelect>
                {form.formState.errors.role ? (
                  <p className="text-sm font-medium text-red-700">{form.formState.errors.role.message}</p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <ShadcnLabel htmlFor="sqft">Total district sqft *</ShadcnLabel>
                <ShadcnInput
                  id="sqft"
                  inputMode="numeric"
                  aria-invalid={!!form.formState.errors.sqft}
                  {...form.register('sqft', {
                    onChange: (event) => {
                      event.target.value = formatInteger(event.target.value)
                    },
                  })}
                  onFocus={markStarted}
                />
                {form.formState.errors.sqft ? (
                  <p className="text-sm font-medium text-red-700">{form.formState.errors.sqft.message}</p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <ShadcnLabel htmlFor="schoolCount">Number of school buildings</ShadcnLabel>
                <ShadcnInput
                  id="schoolCount"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  {...form.register('schoolCount')}
                  onFocus={markStarted}
                />
              </div>

              <div className="grid gap-2">
                <ShadcnLabel htmlFor="bas">BAS in use</ShadcnLabel>
                <ShadcnSelect
                  id="bas"
                  aria-invalid={!!form.formState.errors.bas}
                  {...form.register('bas')}
                  onFocus={markStarted}
                  defaultValue=""
                >
                  <option value="" disabled>Select BAS</option>
                  {basOptions.map((bas) => (
                    <option key={bas} value={bas}>{bas}</option>
                  ))}
                </ShadcnSelect>
                {form.formState.errors.bas ? (
                  <p className="text-sm font-medium text-red-700">{form.formState.errors.bas.message}</p>
                ) : null}
              </div>

              {submitError ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800" role="alert">
                  {submitError}
                </p>
              ) : null}

              <K12Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Get my free diagnostic →'}
              </K12Button>
              <p className="text-sm leading-6 text-brand-muted">
                By submitting, you agree to our Privacy Policy. We use your submission to follow up about the diagnostic. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </K12Container>
    </SectionReveal>
  )
}
