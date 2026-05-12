'use client'

import { useEffect, useState } from 'react'
import { Badge, Card } from '@/components/ui'
import { PhotoPlaceholder } from '@/components/visual/LeanFmVisuals'
import { trackEvent } from '@/lib/analytics'
import { SITE_CONFIG } from '@/lib/constants'

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type ContactIntent = 'sample-analysis' | 'demo' | 'investor' | 'general'

interface FormData {
  name: string
  email: string
  company: string
  role: string
  phone: string
  buildingType: string
  portfolioSize: string
  message: string
  intent: ContactIntent
}

const BUILDING_TYPES = [
  'K-12 district',
  'University / campus',
  'Museum / cultural institution',
  'Commercial real estate',
  'Healthcare',
  'Hotel / hospitality',
  'Other',
]

const INTENT_OPTIONS: Array<{ value: ContactIntent; label: string }> = [
  { value: 'sample-analysis', label: 'Request a Sample Analysis' },
  { value: 'demo', label: 'Talk to LeanFM' },
  { value: 'investor', label: 'Investor Inquiry' },
]

const WHAT_HAPPENS_NEXT = [
  'We review your inquiry',
  'We confirm whether your building data is a fit',
  'We schedule a short walkthrough or data review',
  'If useful, we start with a Sample Analysis',
]

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    buildingType: '',
    portfolioSize: '',
    message: '',
    intent: 'sample-analysis',
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const intentParam = params.get('intent')

    if (!intentParam) {
      return
    }

    const normalizedIntent = intentParam === 'trial' ? 'demo' : intentParam
    if (normalizedIntent === 'sample-analysis' || normalizedIntent === 'demo' || normalizedIntent === 'investor' || normalizedIntent === 'general') {
      setFormData((prev) => (
        prev.intent === normalizedIntent
          ? prev
          : { ...prev, intent: normalizedIntent }
      ))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      trackEvent('contact_submit', { intent: formData.intent })
      if (formData.intent === 'sample-analysis') {
        trackEvent('cta_sample_analysis_click', { location: 'contact_form_submit' })
      }
      if (formData.intent === 'demo') {
        trackEvent('cta_demo_click', { location: 'contact_form_submit' })
      }

      setFormState('success')
    } catch {
      setFormState('error')
      setErrorMessage('Something went wrong. Please try again or email us directly.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const getSubmitLabel = () => {
    switch (formData.intent) {
      case 'sample-analysis':
        return 'Request Sample Analysis'
      case 'demo':
        return 'Talk to LeanFM'
      case 'investor':
        return 'Send Investor Inquiry'
      default:
        return 'Send Message'
    }
  }

  if (formState === 'success') {
    return (
      <>
        <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
          <div className="absolute inset-0 bg-grid opacity-35" />
          <div className="container-default relative">
            <Card className="mx-auto max-w-lg border-sky-100 bg-white py-12 text-center shadow-[0_24px_80px_rgba(30,64,175,0.14)]">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="heading-2 mb-4 text-slate-950">Message received</h1>
              <p className="body-large mb-2 text-slate-700">
                {formData.intent === 'demo'
                  ? 'Thanks for reaching out. We\'ll contact you to schedule your demo.'
                  : formData.intent === 'sample-analysis'
                    ? 'Thanks for reaching out. We’ll contact you about the best next step for a Sample Analysis.'
                  : 'Thanks for reaching out. We\'ll get back to you within one business day.'}
              </p>
              <p className="text-body-sm text-slate-500">
                Check your email at {formData.email} for confirmation.
              </p>
            </Card>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_48%,#f4fbef_100%)]">
        <div className="absolute inset-0 bg-grid opacity-35" />
        <div className="absolute right-0 top-0 h-[400px] w-[500px] rounded-full bg-sky-200/55 blur-3xl" />

        <div className="container-default relative pt-20 pb-8 md:pt-28 md:pb-12">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <Badge className="mb-6">Contact</Badge>
              <h1 className="heading-1 mb-6 text-slate-950">
                Request a Sample Analysis or contact LeanFM
              </h1>
              <p className="body-large text-slate-700">
                Share a few details and our team will follow up about your building data, demo request, or investor inquiry.
              </p>
            </div>
            <PhotoPlaceholder
              label="Facilities leader reviewing building operations data"
              alt="Facilities leader reviewing building operations data"
              src="/media/leanfm-images/bas-control-room.jpg"
              aspect="video"
              overlay={false}
              className="border-white shadow-[0_24px_90px_rgba(30,64,175,0.18)]"
            />
          </div>
        </div>
      </section>

      <section className="section light-form bg-white pt-8">
        <div className="container-default">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-sky-100 bg-white shadow-[0_14px_45px_rgba(30,64,175,0.08)]">
                <h2 className="mb-4 font-semibold text-slate-950">Get in touch</h2>
                <p className="mb-6 text-body-sm text-slate-600">
                  Fill out the form and we&apos;ll respond within one business day.
                </p>
                <div className="mb-6 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                  <p className="mb-3 text-body-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                    What happens next
                  </p>
                  <ul className="space-y-2">
                    {WHAT_HAPPENS_NEXT.map((item) => (
                      <li key={item} className="text-body-xs leading-relaxed text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-body-xs uppercase tracking-wider text-slate-500">Email</span>
                    <a
                      href={`mailto:${SITE_CONFIG.contactEmail}`}
                      className="mt-1 block text-body-md text-sky-700 transition-colors hover:text-sky-900"
                    >
                      {SITE_CONFIG.contactEmail}
                    </a>
                  </div>
                </div>

                <hr className="my-6 border-sky-100" />

                <p className="text-body-xs text-slate-500">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy" className="text-sky-700 hover:underline">Privacy Policy</a>.
                </p>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="label">What can we help with?</label>
                  <div className="grid gap-3 md:grid-cols-3">
                    {INTENT_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                          formData.intent === option.value
                            ? 'border-emerald-300 bg-emerald-50 shadow-[0_14px_40px_rgba(144,204,124,0.14)]'
                            : 'border-sky-100 bg-white hover:border-sky-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="intent"
                          value={option.value}
                          checked={formData.intent === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          formData.intent === option.value
                            ? 'border-emerald-500'
                            : 'border-sky-300'
                        }`}>
                          {formData.intent === option.value && (
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                          )}
                        </div>
                        <span className="text-body-sm text-slate-900">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label">Full name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Work email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="label">Organization *</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="input"
                      placeholder="Acme Properties"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="label">Job title</label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="input"
                      placeholder="Facilities Director"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="label">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  {formData.intent === 'sample-analysis' || formData.intent === 'demo' ? (
                    <div>
                      <label htmlFor="buildingType" className="label">Building type</label>
                      <select
                        id="buildingType"
                        name="buildingType"
                        value={formData.buildingType}
                        onChange={handleChange}
                        className="select"
                      >
                        <option value="">Select type...</option>
                        {BUILDING_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="portfolioSize" className="label">Portfolio size</label>
                      <input
                        type="text"
                        id="portfolioSize"
                        name="portfolioSize"
                        value={formData.portfolioSize}
                        onChange={handleChange}
                        className="input"
                        placeholder="e.g., 5 buildings, 2M sq ft"
                      />
                    </div>
                  )}
                </div>

                {(formData.intent === 'sample-analysis' || formData.intent === 'demo') && (
                  <div>
                    <label htmlFor="portfolioSize" className="label">Portfolio size</label>
                    <input
                      type="text"
                      id="portfolioSize"
                      name="portfolioSize"
                      value={formData.portfolioSize}
                      onChange={handleChange}
                      className="input"
                      placeholder="e.g., 5 buildings, 2M sq ft"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="label">
                    {formData.intent === 'investor' ? 'Tell us about your firm' : 'Message (optional)'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="input resize-none"
                    placeholder={
                      formData.intent === 'investor'
                        ? 'Brief description of your investment focus...'
                        : formData.intent === 'sample-analysis'
                          ? 'What are you trying to understand from your building data?'
                          : formData.intent === 'demo'
                            ? 'Anything you want us to cover in your walkthrough?'
                          : 'How can we help?'
                    }
                  />
                </div>

                {formState === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-body-sm text-red-400">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    getSubmitLabel()
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
