'use client'

import { useEffect, useMemo, useState } from 'react'
import { Badge, Card } from '@/components/ui'
import { trackEvent } from '@/lib/analytics'

type Step = 1 | 2 | 3 | 4

type SubmissionState = 'idle' | 'submitting' | 'error'

export interface SampleIntakeFormData {
  name: string
  email: string
  company: string
  role: string
  phone: string
  buildingType: string
  portfolioSize: string
  basPlatform: string
  primaryConcern: string
  notes: string
  dataset: File | null
}

const BUILDING_TYPES = [
  'Office',
  'Healthcare',
  'Education',
  'Retail',
  'Industrial',
  'Mixed-use',
  'Other',
]

const MAX_FILE_BYTES = 25 * 1024 * 1024
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STEP_TITLES = [
  'Organization Details',
  'Building Context',
  'Dataset Upload',
  'Confirmation',
]

export default function StartPage() {
  const [step, setStep] = useState<Step>(1)
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState<SampleIntakeFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    buildingType: '',
    portfolioSize: '',
    basPlatform: '',
    primaryConcern: '',
    notes: '',
    dataset: null,
  })

  const datasetSummary = useMemo(() => {
    if (!formData.dataset) {
      return 'No file selected'
    }

    const fileSizeMb = (formData.dataset.size / (1024 * 1024)).toFixed(2)
    return `${formData.dataset.name} (${fileSizeMb} MB)`
  }, [formData.dataset])

  useEffect(() => {
    trackEvent('start_step_view', { step_number: step })
  }, [step])

  const setField = (field: keyof SampleIntakeFormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (currentStep: Step): string | null => {
    if (currentStep === 1) {
      if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
        return 'Please complete full name, work email, and organization.'
      }
      if (!EMAIL_REGEX.test(formData.email)) {
        return 'Please enter a valid work email address.'
      }
      return null
    }

    if (currentStep === 2) {
      if (!formData.buildingType || !formData.portfolioSize.trim()) {
        return 'Please select a building type and enter portfolio size.'
      }
      return null
    }

    if (currentStep === 3) {
      if (!formData.dataset) {
        return 'Please upload a CSV dataset file.'
      }

      if (!formData.dataset.name.toLowerCase().endsWith('.csv')) {
        return 'Dataset must be a .csv file.'
      }

      if (formData.dataset.size > MAX_FILE_BYTES) {
        return 'Dataset exceeds 25MB. Please upload a smaller file.'
      }
    }

    return null
  }

  const handleNext = () => {
    const validationError = validateStep(step)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setErrorMessage('')
    trackEvent('start_step_complete', { step_number: step })

    if (step < 4) {
      setStep((step + 1) as Step)
    }
  }

  const handleBack = () => {
    setErrorMessage('')
    if (step > 1) {
      setStep((step - 1) as Step)
    }
  }

  const handleSubmit = async () => {
    const validationError = validateStep(3)
    if (validationError) {
      setErrorMessage(validationError)
      trackEvent('sample_upload_submit_error', { error_type: 'client_validation' })
      return
    }

    if (!formData.dataset) {
      setErrorMessage('Please upload a CSV dataset file.')
      return
    }

    setSubmissionState('submitting')
    setErrorMessage('')
    trackEvent('sample_upload_submit', { file_size_bytes: formData.dataset.size })

    try {
      const payload = new FormData()
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('company', formData.company)
      payload.append('role', formData.role)
      payload.append('phone', formData.phone)
      payload.append('buildingType', formData.buildingType)
      payload.append('portfolioSize', formData.portfolioSize)
      payload.append('basPlatform', formData.basPlatform)
      payload.append('primaryConcern', formData.primaryConcern)
      payload.append('notes', formData.notes)
      payload.append('dataset', formData.dataset, formData.dataset.name)

      const response = await fetch('/api/sample-intake', {
        method: 'POST',
        body: payload,
      })

      if (!response.ok) {
        let errorType = 'server_error'
        let message = 'Upload failed. Please try again.'

        try {
          const body = await response.json()
          if (response.status === 400) {
            errorType = 'server_validation'
          }
          if (typeof body?.error === 'string') {
            message = body.error
          }
        } catch {
          // No-op fallback.
        }

        throw new Error(`${errorType}|${message}`)
      }

      trackEvent('sample_upload_submit_success', {})
      trackEvent('start_step_complete', { step_number: 3 })
      setSubmissionState('idle')
      setStep(4)
    } catch (error) {
      const [errorType = 'network', message = 'Upload failed. Please try again.'] = String(
        error instanceof Error ? error.message : 'network|Upload failed. Please try again.'
      ).split('|')

      setSubmissionState('error')
      setErrorMessage(message)
      trackEvent('sample_upload_submit_error', { error_type: errorType })
    }
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-0 right-0 h-[380px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="container-default relative pt-20 pb-8 md:pt-28 md:pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6">Sample Dataset Intake</Badge>
            <h1 className="heading-1 text-white mb-6">Upload your sample BAS dataset</h1>
            <p className="body-large">
              Complete account setup, submit your CSV, and LeanFM will manually review your data then
              schedule a walkthrough call.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-default max-w-4xl">
          <Card className="mb-8">
            <ol className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STEP_TITLES.map((title, index) => {
                const stepNumber = (index + 1) as Step
                const isActive = step === stepNumber
                const isComplete = step > stepNumber

                return (
                  <li key={title} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center text-body-xs font-semibold ${
                        isComplete
                          ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200'
                          : isActive
                            ? 'bg-slate-700 border-cyan-500/60 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span className={`text-body-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {title}
                    </span>
                  </li>
                )
              })}
            </ol>
          </Card>

          {step < 4 ? (
            <Card>
              <h2 className="heading-3 text-white mb-6">{STEP_TITLES[step - 1]}</h2>

              {step === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label">Full name *</label>
                    <input
                      id="name"
                      name="name"
                      className="input"
                      value={formData.name}
                      onChange={(e) => setField('name', e.target.value)}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Work email *</label>
                    <input
                      id="email"
                      name="email"
                      className="input"
                      value={formData.email}
                      onChange={(e) => setField('email', e.target.value)}
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="label">Organization *</label>
                    <input
                      id="company"
                      name="company"
                      className="input"
                      value={formData.company}
                      onChange={(e) => setField('company', e.target.value)}
                      placeholder="Acme Properties"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="label">Job title</label>
                    <input
                      id="role"
                      name="role"
                      className="input"
                      value={formData.role}
                      onChange={(e) => setField('role', e.target.value)}
                      placeholder="Facilities Director"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="label">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      className="input"
                      value={formData.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="buildingType" className="label">Building type *</label>
                    <select
                      id="buildingType"
                      className="select"
                      value={formData.buildingType}
                      onChange={(e) => setField('buildingType', e.target.value)}
                    >
                      <option value="">Select type...</option>
                      {BUILDING_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="portfolioSize" className="label">Portfolio size *</label>
                    <input
                      id="portfolioSize"
                      className="input"
                      value={formData.portfolioSize}
                      onChange={(e) => setField('portfolioSize', e.target.value)}
                      placeholder="e.g., 5 buildings, 2M sq ft"
                    />
                  </div>
                  <div>
                    <label htmlFor="basPlatform" className="label">BAS platform</label>
                    <input
                      id="basPlatform"
                      className="input"
                      value={formData.basPlatform}
                      onChange={(e) => setField('basPlatform', e.target.value)}
                      placeholder="Niagara, Metasys, WebCTRL, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="primaryConcern" className="label">Primary concern</label>
                    <input
                      id="primaryConcern"
                      className="input"
                      value={formData.primaryConcern}
                      onChange={(e) => setField('primaryConcern', e.target.value)}
                      placeholder="Energy spend, comfort complaints, equipment reliability"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="dataset" className="label">CSV dataset *</label>
                    <input
                      id="dataset"
                      type="file"
                      accept=".csv,text/csv"
                      className="input file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-4 file:py-2 file:text-slate-100 hover:file:bg-cyan-500/30"
                      onChange={(e) => setField('dataset', e.target.files?.[0] ?? null)}
                    />
                    <p className="text-body-xs text-slate-500 mt-2">{datasetSummary}</p>
                    <p className="text-body-xs text-slate-500 mt-1">CSV only, maximum 25MB.</p>
                  </div>
                  <div>
                    <label htmlFor="notes" className="label">Notes</label>
                    <textarea
                      id="notes"
                      rows={4}
                      className="input resize-none"
                      value={formData.notes}
                      onChange={(e) => setField('notes', e.target.value)}
                      placeholder="Anything we should know before manual review?"
                    />
                  </div>
                </div>
              )}

              {errorMessage ? (
                <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-body-sm text-red-400">
                  {errorMessage}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleBack}
                  disabled={step === 1 || submissionState === 'submitting'}
                >
                  Back
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleNext}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={submissionState === 'submitting'}
                  >
                    {submissionState === 'submitting' ? 'Submitting...' : 'Submit Dataset'}
                  </button>
                )}
              </div>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="heading-2 text-white mb-4">Dataset received</h2>
              <p className="body-large max-w-2xl mx-auto mb-8">
                Thanks - we&apos;re reviewing your sample dataset. We&apos;ll contact you to schedule a
                results walkthrough.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/contact?intent=demo"
                  className="btn-primary"
                  onClick={() => trackEvent('cta_demo_click', { location: 'start_confirmation_primary' })}
                >
                  Book a Demo
                </a>
                <a href="/" className="btn-secondary">Back to Home</a>
              </div>
            </Card>
          )}
        </div>
      </section>
    </>
  )
}
