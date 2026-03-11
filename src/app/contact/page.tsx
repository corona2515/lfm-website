'use client'

import { useEffect, useState } from 'react'
import { Badge, Card } from '@/components/ui'
import { trackEvent } from '@/lib/analytics'
import { SITE_CONFIG } from '@/lib/constants'

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type ContactIntent = 'demo' | 'investor' | 'general'

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
  'Office',
  'Healthcare',
  'Education',
  'Retail',
  'Industrial',
  'Mixed-use',
  'Other',
]

const INTENT_OPTIONS: Array<{ value: ContactIntent; label: string }> = [
  { value: 'demo', label: 'Book a demo' },
  { value: 'investor', label: 'Investor inquiry' },
  { value: 'general', label: 'General question' },
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
    intent: 'demo',
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const intentParam = params.get('intent')

    if (!intentParam) {
      return
    }

    const normalizedIntent = intentParam === 'trial' ? 'demo' : intentParam
    if (normalizedIntent === 'demo' || normalizedIntent === 'investor' || normalizedIntent === 'general') {
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
      case 'demo':
        return 'Book Demo'
      case 'investor':
        return 'Request Deck'
      default:
        return 'Send Message'
    }
  }

  if (formState === 'success') {
    return (
      <>
        <section className="relative overflow-hidden min-h-[80vh] flex items-center">
          <div className="absolute inset-0 bg-grid" />
          <div className="container-default relative">
            <Card className="max-w-lg mx-auto text-center py-12">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="heading-2 text-white mb-4">Message received</h1>
              <p className="body-large mb-2">
                {formData.intent === 'demo'
                  ? 'Thanks for reaching out. We\'ll contact you to schedule your demo.'
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container-default relative pt-20 pb-8 md:pt-28 md:pb-12">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="mb-6">Contact</Badge>
            <h1 className="heading-1 text-white mb-6">
              Book a 20-minute walkthrough
            </h1>
            <p className="body-large">
              Share a few details and our team will schedule a demo focused on your facilities portfolio.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-default">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h2 className="font-semibold text-white mb-4">Get in touch</h2>
                <p className="text-body-sm text-slate-400 mb-6">
                  Fill out the form and we&apos;ll respond within one business day.
                </p>

                <div className="space-y-4">
                  <div>
                    <span className="text-body-xs text-slate-500 uppercase tracking-wider">Email</span>
                    <a
                      href={`mailto:${SITE_CONFIG.contactEmail}`}
                      className="block text-body-md text-cyan-400 hover:text-cyan-300 transition-colors mt-1"
                    >
                      {SITE_CONFIG.contactEmail}
                    </a>
                  </div>
                </div>

                <hr className="border-slate-700 my-6" />

                <p className="text-body-xs text-slate-500">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
                </p>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="label">What can we help with?</label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {INTENT_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                          formData.intent === option.value
                            ? 'bg-cyan-500/10 border-cyan-500/50'
                            : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
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
                            ? 'border-cyan-500'
                            : 'border-slate-600'
                        }`}>
                          {formData.intent === option.value && (
                            <div className="w-2 h-2 rounded-full bg-cyan-500" />
                          )}
                        </div>
                        <span className="text-body-sm text-slate-300">{option.label}</span>
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
                  {formData.intent === 'demo' ? (
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

                {formData.intent === 'demo' && (
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
