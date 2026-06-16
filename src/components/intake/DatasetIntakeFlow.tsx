'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { PhotoPlaceholder } from '@/components/visual/LeanFmVisuals'
import { trackEvent } from '@/lib/analytics'

type Step = 1 | 2 | 3 | 4

type SubmissionState = 'idle' | 'submitting' | 'error'
type SaveState = 'idle' | 'saving' | 'saved' | 'saved_local' | 'save_failed'
type DatasetUploadState = 'idle' | 'uploading' | 'uploaded' | 'error'

interface UploadSessionResponse {
  submissionId: string
  storageProvider: string
  storageBucket: string | null
  storageKey: string
  storageRegion: string | null
  storageEndpoint: string | null
  uploadTarget: {
    method: 'PUT'
    url: string
    headers: Record<string, string>
  }
}

interface SavedDataset {
  submissionId: string
  fileName: string
  fileSizeBytes: number
  mimeType: string
  storageProvider: string
  storageBucket: string | null
  storageKey: string
  storageRegion: string | null
  storageEndpoint: string | null
}

interface DraftApiResponse {
  draftToken: string
  draft: {
    status: 'ACTIVE' | 'ABANDONED' | 'COMPLETED'
    progressStep: number
    submissionId: string
    leadId: string | null
    lastSavedAt: string
    completedAt: string | null
    fields: {
      name: string
      email: string
      company: string
      role: string
      phone: string
      buildingName: string
      addressLine1: string
      city: string
      state: string
      postalCode: string
      buildingType: string
      portfolioSize: string
      basPlatform: string
      primaryConcern: string
      notes: string
    }
    dataset: SavedDataset | null
  }
  error?: string
  created?: boolean
}

interface DatasetIntakeApiResponse {
  error?: string
  code?: string
  onboarding?: {
    status?: string
    submissionId?: string
    customerId?: string
    accountStatus?: string
    activationStatus?: string
    reviewStatus?: string
  }
}

interface DatasetIntakeFormData {
  name: string
  email: string
  company: string
  role: string
  phone: string
  buildingName: string
  addressLine1: string
  city: string
  state: string
  postalCode: string
  buildingType: string
  portfolioSize: string
  basPlatform: string
  primaryConcern: string
  notes: string
  dataset: SavedDataset | null
}

interface LocalDraftSnapshot {
  draftToken: string
  step: Step
  savedAt: string
  formData: DatasetIntakeFormData
}

interface CompletionAction {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  eventName?: string
  eventParams?: Record<string, string | number | boolean>
}

interface CompletionContent {
  title: string
  description: string
  actions: CompletionAction[]
}

interface OfferCardContent {
  eyebrow: string
  title: string
  description: string
  priceLabel: string
  priceValue: string
  bullets: string[]
  footnote?: string
}

export interface DatasetIntakeVariant {
  hero: {
    badge: string
    title: string
    description: string
    photoLabel?: string
    photoAlt?: string
  }
  analyticsPrefix: string
  stepEventPrefix?: string
  localDraftStorageKey: string
  submitEndpoint: string
  completeStateOnSuccess: string
  duplicateResponse?: {
    statusCode: number
    code: string
    completionState: string
  }
  submitButtonLabel: string
  submittingButtonLabel: string
  completionStates: Record<string, CompletionContent>
  offerCard?: OfferCardContent
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STEP_TITLES = ['Contact Details', 'Building Context', 'Upload File', 'Review and Submit']
const DRAFT_TOKEN_HEADER = 'x-leanfm-sample-intake-draft-token'
const AUTOSAVE_DEBOUNCE_MS = 700

const DEFAULT_FORM_DATA: DatasetIntakeFormData = {
  name: '',
  email: '',
  company: '',
  role: '',
  phone: '',
  buildingName: '',
  addressLine1: '',
  city: '',
  state: '',
  postalCode: '',
  buildingType: '',
  portfolioSize: '',
  basPlatform: '',
  primaryConcern: '',
  notes: '',
  dataset: null,
}

function normalizeStep(step: number): Step {
  if (step <= 1) return 1
  if (step >= 4) return 4
  return step as Step
}

function isStepOneEligible(formData: DatasetIntakeFormData) {
  return Boolean(
    formData.name.trim() &&
    formData.email.trim() &&
    EMAIL_REGEX.test(formData.email) &&
    formData.company.trim()
  )
}

function buildDraftSnapshot(formData: DatasetIntakeFormData, step: Step, draftToken: string): LocalDraftSnapshot {
  return {
    draftToken,
    step,
    savedAt: new Date().toISOString(),
    formData,
  }
}

function formDataFromDraftResponse(draft: DraftApiResponse['draft']): DatasetIntakeFormData {
  return {
    ...draft.fields,
    dataset: draft.dataset,
  }
}

function formatDatasetSummary(dataset: SavedDataset | null) {
  if (!dataset) {
    return 'No file uploaded'
  }

  const fileSizeMb = (dataset.fileSizeBytes / (1024 * 1024)).toFixed(2)
  return `${dataset.fileName} (${fileSizeMb} MB)`
}

function saveStateLabel(saveState: SaveState) {
  switch (saveState) {
    case 'saving':
      return 'Saving...'
    case 'saved':
      return 'Progress saved'
    case 'saved_local':
      return 'Progress saved in this browser'
    case 'save_failed':
      return "We'll keep trying to save your progress"
    default:
      return ''
  }
}

export function DatasetIntakeFlow({ variant }: { variant: DatasetIntakeVariant }) {
  const [step, setStep] = useState<Step>(1)
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [completionState, setCompletionState] = useState(variant.completeStateOnSuccess)
  const [isComplete, setIsComplete] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [formData, setFormData] = useState<DatasetIntakeFormData>(DEFAULT_FORM_DATA)
  const [draftToken, setDraftToken] = useState('')
  const [datasetUploadState, setDatasetUploadState] = useState<DatasetUploadState>('idle')
  const [lastSavedAt, setLastSavedAt] = useState('')

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const draftTokenRef = useRef('')
  const isHydratedRef = useRef(false)
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const datasetSummary = useMemo(() => formatDatasetSummary(formData.dataset), [formData.dataset])
  const stepEventPrefix = variant.stepEventPrefix || variant.analyticsPrefix
  const completionContent = variant.completionStates[completionState] || variant.completionStates[variant.completeStateOnSuccess]

  const persistLocalSnapshot = (nextFormData: DatasetIntakeFormData, nextStep: Step, nextDraftToken: string) => {
    try {
      const snapshot = buildDraftSnapshot(nextFormData, nextStep, nextDraftToken)
      window.localStorage.setItem(variant.localDraftStorageKey, JSON.stringify(snapshot))
      setLastSavedAt(snapshot.savedAt)
      return true
    } catch {
      return false
    }
  }

  const parseLocalDraftSnapshot = () => {
    if (typeof window === 'undefined') {
      return null
    }

    try {
      const rawValue = window.localStorage.getItem(variant.localDraftStorageKey)
      if (!rawValue) {
        return null
      }

      const parsed = JSON.parse(rawValue) as LocalDraftSnapshot
      if (!parsed || typeof parsed !== 'object') {
        return null
      }

      return {
        draftToken: typeof parsed.draftToken === 'string' ? parsed.draftToken : '',
        step: normalizeStep(Number(parsed.step || 1)),
        savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : '',
        formData: {
          ...DEFAULT_FORM_DATA,
          ...(parsed.formData || {}),
        },
      } satisfies LocalDraftSnapshot
    } catch {
      return null
    }
  }

  const clearPersistedDraft = () => {
    draftTokenRef.current = ''
    setDraftToken('')
    setLastSavedAt('')
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(variant.localDraftStorageKey)
    }
  }

  const setDraftTokenAndPersist = (nextDraftToken: string, nextFormData = formData, nextStep = step) => {
    draftTokenRef.current = nextDraftToken
    setDraftToken(nextDraftToken)
    persistLocalSnapshot(nextFormData, nextStep, nextDraftToken)
  }

  const updateFormData = (updater: (current: DatasetIntakeFormData) => DatasetIntakeFormData) => {
    setFormData((current) => {
      const next = updater(current)
      const persisted = persistLocalSnapshot(next, step, draftTokenRef.current)
      if (isHydratedRef.current && submissionState !== 'submitting') {
        setSaveState(persisted ? 'saved_local' : 'save_failed')
      }
      return next
    })
  }

  const updateStep = (nextStep: Step) => {
    setStep(nextStep)
    if (isHydratedRef.current) {
      const persisted = persistLocalSnapshot(formData, nextStep, draftTokenRef.current)
      setSaveState(persisted ? 'saved_local' : 'save_failed')
    }
  }

  const saveDraftToServer = async (nextFormData: DatasetIntakeFormData, nextStep: Step) => {
    const persistedLocally = persistLocalSnapshot(nextFormData, nextStep, draftTokenRef.current)
    if (!isStepOneEligible(nextFormData)) {
      setSaveState(persistedLocally ? 'saved_local' : 'save_failed')
      return false
    }

    setSaveState('saving')

    try {
      const response = await fetch('/api/sample-intake/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftToken: draftTokenRef.current || undefined,
          progressStep: nextStep,
          name: nextFormData.name,
          email: nextFormData.email,
          company: nextFormData.company,
          role: nextFormData.role,
          phone: nextFormData.phone,
          buildingName: nextFormData.buildingName,
          addressLine1: nextFormData.addressLine1,
          city: nextFormData.city,
          state: nextFormData.state,
          postalCode: nextFormData.postalCode,
          buildingType: nextFormData.buildingType,
          portfolioSize: nextFormData.portfolioSize,
          basPlatform: nextFormData.basPlatform,
          primaryConcern: nextFormData.primaryConcern,
          notes: nextFormData.notes,
          dataset: nextFormData.dataset ? {
            fileName: nextFormData.dataset.fileName,
            fileSizeBytes: nextFormData.dataset.fileSizeBytes,
            mimeType: nextFormData.dataset.mimeType,
            storageProvider: nextFormData.dataset.storageProvider,
            storageBucket: nextFormData.dataset.storageBucket,
            storageKey: nextFormData.dataset.storageKey,
            storageRegion: nextFormData.dataset.storageRegion,
            storageEndpoint: nextFormData.dataset.storageEndpoint,
          } : null,
        }),
      })

      const body = (await response.json().catch(() => null)) as DraftApiResponse | null
      if (!response.ok || !body?.draftToken || !body.draft) {
        throw new Error(body?.error || 'We could not save your progress right now.')
      }

      setDraftTokenAndPersist(body.draftToken, nextFormData, nextStep)
      setLastSavedAt(body.draft.lastSavedAt)
      setSaveState('saved')
      return true
    } catch {
      setSaveState(persistedLocally ? 'saved_local' : 'save_failed')
      return false
    }
  }

  // Restore draft state only once on mount for the active variant key.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    trackEvent(`${stepEventPrefix}_step_view`, { step_number: step })
  }, [step, stepEventPrefix])

  useEffect(() => {
    const localSnapshot = parseLocalDraftSnapshot()
    if (localSnapshot) {
      setFormData({
        ...DEFAULT_FORM_DATA,
        ...localSnapshot.formData,
      })
      setStep(localSnapshot.step)
      setDraftToken(localSnapshot.draftToken)
      draftTokenRef.current = localSnapshot.draftToken
      setLastSavedAt(localSnapshot.savedAt)
      setSaveState('saved_local')
    }

    isHydratedRef.current = true

    if (!localSnapshot?.draftToken) {
      return
    }

    void (async () => {
      try {
        const response = await fetch('/api/sample-intake/draft', {
          headers: {
            [DRAFT_TOKEN_HEADER]: localSnapshot.draftToken,
          },
        })

        if (!response.ok) {
          if (response.status === 404) {
            window.localStorage.removeItem(variant.localDraftStorageKey)
            draftTokenRef.current = ''
            setDraftToken('')
          }
          return
        }

        const body = (await response.json().catch(() => null)) as DraftApiResponse | null
        if (!body?.draft) {
          return
        }

        if (body.draft.status === 'COMPLETED') {
          window.localStorage.removeItem(variant.localDraftStorageKey)
          draftTokenRef.current = ''
          setDraftToken('')
          setSaveState('idle')
          return
        }

        const serverSavedAt = new Date(body.draft.lastSavedAt).getTime()
        const localSavedAt = localSnapshot.savedAt ? new Date(localSnapshot.savedAt).getTime() : 0

        if (!localSavedAt || serverSavedAt >= localSavedAt) {
          const nextFormData = formDataFromDraftResponse(body.draft)
          const nextStep = normalizeStep(body.draft.progressStep)
          setFormData(nextFormData)
          setStep(nextStep)
          setLastSavedAt(body.draft.lastSavedAt)
          persistLocalSnapshot(nextFormData, nextStep, body.draftToken)
          setSaveState('saved')
        }
      } catch {
        setSaveState((current) => (current === 'idle' ? 'saved_local' : current))
      }
    })()
  }, [variant.localDraftStorageKey]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    draftTokenRef.current = draftToken
  }, [draftToken])

  // Autosave is intentionally driven by the form/step snapshot, not function identity.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isHydratedRef.current || isComplete || submissionState === 'submitting') {
      return
    }

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current)
    }

    if (!isStepOneEligible(formData)) {
      return
    }

    autosaveTimerRef.current = setTimeout(() => {
      void saveDraftToServer(formData, step)
    }, AUTOSAVE_DEBOUNCE_MS)

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current)
      }
    }
  }, [formData, step, isComplete, submissionState]) // eslint-disable-line react-hooks/exhaustive-deps

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
      if (
        !formData.buildingName.trim() ||
        !formData.addressLine1.trim() ||
        !formData.city.trim() ||
        !formData.state.trim() ||
        !formData.postalCode.trim() ||
        !formData.buildingType ||
        !formData.portfolioSize.trim()
      ) {
        return 'Please complete building name, full address, building type, and portfolio size.'
      }
      return null
    }

    if (currentStep === 3 && !formData.dataset) {
      return 'Please upload a CSV dataset file.'
    }

    return null
  }

  const validateSubmission = () => {
    return validateStep(1) || validateStep(2) || validateStep(3)
  }

  const handleNext = async () => {
    const validationError = validateStep(step)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setErrorMessage('')
    trackEvent(`${stepEventPrefix}_step_complete`, { step_number: step })

    const nextStep = normalizeStep(step + 1)
    if (step < 4) {
      await saveDraftToServer(formData, step)
      updateStep(nextStep)
    }
  }

  const handleBack = async () => {
    setErrorMessage('')
    if (step > 1) {
      await saveDraftToServer(formData, step)
      updateStep(normalizeStep(step - 1))
    }
  }

  const handleDatasetSelected = async (file: File | null) => {
    if (!file) {
      return
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setErrorMessage('Dataset must be a .csv file.')
      setDatasetUploadState('error')
      return
    }

    const serverSaved = await saveDraftToServer(formData, step)
    if (!serverSaved || !draftTokenRef.current) {
      setDatasetUploadState('error')
      setErrorMessage('We saved your progress locally, but could not prepare the dataset upload. Please try again.')
      return
    }

    setDatasetUploadState('uploading')
    setErrorMessage('')
    setSaveState('saving')

    try {
      const uploadSessionResponse = await fetch('/api/sample-intake/upload-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftToken: draftTokenRef.current,
          fileName: file.name,
          contentType: file.type || 'text/csv',
        }),
      })

      const uploadSessionBody = (await uploadSessionResponse.json().catch(() => null)) as UploadSessionResponse & {
        error?: string
      } | null

      if (!uploadSessionResponse.ok || !uploadSessionBody) {
        throw new Error(uploadSessionBody?.error || 'We could not start your CSV upload.')
      }

      const uploadResponse = await fetch(uploadSessionBody.uploadTarget.url, {
        method: uploadSessionBody.uploadTarget.method,
        headers: uploadSessionBody.uploadTarget.headers,
        body: file,
      })

      if (!uploadResponse.ok) {
        throw new Error('The CSV upload did not complete. Please try again.')
      }

      const nextDataset: SavedDataset = {
        submissionId: uploadSessionBody.submissionId,
        fileName: file.name,
        fileSizeBytes: file.size,
        mimeType: file.type || 'text/csv',
        storageProvider: uploadSessionBody.storageProvider,
        storageBucket: uploadSessionBody.storageBucket,
        storageKey: uploadSessionBody.storageKey,
        storageRegion: uploadSessionBody.storageRegion,
        storageEndpoint: uploadSessionBody.storageEndpoint,
      }

      const nextFormData = {
        ...formData,
        dataset: nextDataset,
      }

      setFormData(nextFormData)
      persistLocalSnapshot(nextFormData, step, draftTokenRef.current)

      const saved = await saveDraftToServer(nextFormData, step)
      if (!saved) {
        throw new Error('The dataset uploaded, but we could not save your progress yet. Please wait a moment and try again.')
      }

      setDatasetUploadState('uploaded')
      trackEvent(`${variant.analyticsPrefix}_dataset_selected`, { file_size_bytes: file.size })
    } catch (error) {
      setDatasetUploadState('error')
      setErrorMessage(error instanceof Error ? error.message : 'The CSV upload failed. Please try again.')
      setSaveState('saved_local')
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveDataset = async () => {
    if (!formData.dataset) {
      return
    }

    setErrorMessage('')

    try {
      if (draftTokenRef.current) {
        const response = await fetch('/api/sample-intake/draft/dataset', {
          method: 'DELETE',
          headers: {
            [DRAFT_TOKEN_HEADER]: draftTokenRef.current,
          },
        })

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as { error?: string } | null
          throw new Error(body?.error || 'Unable to remove the saved dataset.')
        }
      }

      updateFormData((current) => ({
        ...current,
        dataset: null,
      }))
      setDatasetUploadState('idle')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to remove the saved dataset.')
    }
  }

  const handleSubmit = async () => {
    const validationError = validateSubmission()
    if (validationError) {
      setErrorMessage(validationError)
      trackEvent(`${variant.analyticsPrefix}_submit_error`, { error_type: 'client_validation' })
      return
    }

    const saved = await saveDraftToServer(formData, 4)
    if (!saved || !draftTokenRef.current) {
      setErrorMessage('We saved your progress locally, but could not sync the latest changes yet. Please retry in a moment.')
      trackEvent(`${variant.analyticsPrefix}_submit_error`, { error_type: 'draft_sync_required' })
      return
    }

    setSubmissionState('submitting')
    setErrorMessage('')
    trackEvent(`${variant.analyticsPrefix}_submit`, { file_size_bytes: formData.dataset?.fileSizeBytes || 0 })

    try {
      const response = await fetch(variant.submitEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftToken: draftTokenRef.current,
        }),
      })

      const responseBody = (await response.json().catch(() => null)) as DatasetIntakeApiResponse | null

      if (
        variant.duplicateResponse &&
        response.status === variant.duplicateResponse.statusCode &&
        responseBody?.code === variant.duplicateResponse.code
      ) {
        clearPersistedDraft()
        setCompletionState(variant.duplicateResponse.completionState)
        setSubmissionState('idle')
        setIsComplete(true)
        trackEvent(`${variant.analyticsPrefix}_submit_duplicate`, {})
        return
      }

      if (!response.ok) {
        let errorType = 'server_error'
        let message = 'Upload failed. Please try again.'

        if (response.status === 400) {
          errorType = 'server_validation'
        }
        if (typeof responseBody?.error === 'string') {
          message = responseBody.error
        }

        throw new Error(`${errorType}|${message}`)
      }

      clearPersistedDraft()
      setCompletionState(variant.completeStateOnSuccess)
      trackEvent(`${variant.analyticsPrefix}_submit_success`, {})
      trackEvent(`${stepEventPrefix}_step_complete`, { step_number: 4 })
      setSubmissionState('idle')
      setIsComplete(true)
      setSaveState('idle')
    } catch (error) {
      const [errorType = 'network', message = 'Upload failed. Please try again.'] = String(
        error instanceof Error ? error.message : 'network|Upload failed. Please try again.'
      ).split('|')

      setSubmissionState('error')
      setErrorMessage(message)
      trackEvent(`${variant.analyticsPrefix}_submit_error`, { error_type: errorType })
    }
  }

  return (
    <div className="thermal-form">
      <section className="relative overflow-hidden border-b bg-[#0a0b0e]" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full opacity-70 blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(242,98,46,0.45), transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -right-16 top-0 h-[380px] w-[520px] rounded-full opacity-60 blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.30), transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-50"
          style={{ background: 'linear-gradient(90deg,#6366f1,#22d3ee,#2dd4a7,#f5b020,#f2622e)' }}
        />
        <div className="container-default relative pt-24 pb-10 md:pt-28 md:pb-14">
          <div className={variant.hero.photoLabel ? 'grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center' : 'mx-auto max-w-3xl text-center'}>
            <div>
              <span className="thermal-mono mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f5b020]" style={{ borderColor: 'rgba(245,176,32,0.3)' }}>
                {variant.hero.badge}
              </span>
              <h1 className="thermal-serif mb-6 text-[clamp(40px,5vw,72px)] leading-[1.02] tracking-[-0.01em] text-[#f5f3ee]">{variant.hero.title}</h1>
              <p className="text-[clamp(18px,1.5vw,21px)] leading-[1.55] text-[#99a1ad]">{variant.hero.description}</p>
            </div>
            {variant.hero.photoLabel ? (
              <PhotoPlaceholder
                label={variant.hero.photoLabel}
                alt={variant.hero.photoAlt || variant.hero.photoLabel}
                src="/media/leanfm-images/bas-control-room.jpg"
                aspect="video"
                overlay={false}
                className="border-[#1b1f28] shadow-[0_24px_90px_rgba(0,0,0,0.5)]"
                imageClassName="object-[48%_50%]"
              />
            ) : null}
          </div>

          {variant.offerCard ? (
            <div className="mx-auto mt-10 max-w-5xl">
              <div className="rounded-2xl border bg-[#14171e] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-start">
                  <div>
                    <p className="thermal-mono text-[11px] uppercase tracking-[0.2em] text-[#22d3ee]">{variant.offerCard.eyebrow}</p>
                    <h2 className="thermal-serif mt-3 text-[clamp(24px,2.6vw,34px)] leading-[1.15] text-[#f5f3ee]">{variant.offerCard.title}</h2>
                    <p className="mt-4 text-body-md text-[#99a1ad]">{variant.offerCard.description}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {variant.offerCard.bullets.map((bullet) => (
                        <div key={bullet} className="rounded-xl border bg-[#0f1116] px-4 py-3 text-body-sm text-[#f5f3ee]" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
                          {bullet}
                        </div>
                      ))}
                    </div>
                    {variant.offerCard.footnote ? (
                      <p className="mt-5 text-body-xs text-[#868d99]">{variant.offerCard.footnote}</p>
                    ) : null}
                  </div>

                  <div className="rounded-2xl border px-6 py-7" style={{ borderColor: 'rgba(245,176,32,0.25)', background: 'linear-gradient(160deg, rgba(245,176,32,0.10), rgba(242,98,46,0.06))' }}>
                    <p className="thermal-mono text-[11px] uppercase tracking-[0.2em] text-[#f5b020]">{variant.offerCard.priceLabel}</p>
                    <p className="thermal-serif mt-4 text-4xl text-[#f5f3ee]">{variant.offerCard.priceValue}</p>
                    <p className="mt-4 text-body-sm text-[#99a1ad]">Focused review using current BAS exports.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section bg-[#0a0b0e] pt-10">
        <div className="container-default max-w-5xl">
          <div className="mb-8 rounded-2xl border bg-[#14171e] p-6" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
            <div className="mb-6 flex flex-col gap-3 border-b pb-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
              <div>
                <p className="text-body-sm font-medium text-[#f5f3ee]">Your progress will save as you move through the form.</p>
                {saveState !== 'idle' ? (
                  <p className="mt-1 flex items-center gap-2 text-body-xs text-[#99a1ad]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: '#34e0b4', boxShadow: '0 0 8px #34e0b4' }} />
                    {saveStateLabel(saveState)}{lastSavedAt ? ` · ${new Date(lastSavedAt).toLocaleTimeString()}` : ''}
                  </p>
                ) : null}
              </div>
              {draftToken ? (
                <p className="text-body-xs text-[#868d99]">You can return in this browser if you need to finish later.</p>
              ) : (
                <p className="text-body-xs text-[#868d99]">We only ask for what is needed to review your sample dataset.</p>
              )}
            </div>

            <ol className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STEP_TITLES.map((title, index) => {
                const stepNumber = (index + 1) as Step
                const isActive = !isComplete && step === stepNumber
                const isCompleteStep = step > stepNumber || isComplete

                return (
                  <li key={title} className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-body-xs font-semibold transition-colors ${
                        isCompleteStep
                          ? 'border-transparent text-[#0a0b0e]'
                          : isActive
                            ? 'border-transparent text-[#0a0b0e]'
                            : 'bg-[#0f1116] text-[#868d99]'
                      }`}
                      style={
                        isCompleteStep
                          ? { background: '#34e0b4', boxShadow: '0 0 18px -4px rgba(52,224,180,0.6)' }
                          : isActive
                            ? { background: 'linear-gradient(95deg,#f5b020,#f2622e)', boxShadow: '0 0 18px -4px rgba(242,98,46,0.6)' }
                            : { borderColor: 'rgba(244,242,237,0.10)' }
                      }
                    >
                      {isCompleteStep && !isActive ? (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        stepNumber
                      )}
                    </div>
                    <span className={`text-body-sm ${isActive ? 'text-[#f5f3ee]' : 'text-[#868d99]'}`}>
                      {title}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>

          {!isComplete ? (
            <div className="rounded-2xl border bg-[#14171e] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.4)]" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
              <h2 className="thermal-serif mb-6 text-[clamp(24px,2.6vw,34px)] leading-[1.15] text-[#f5f3ee]">{STEP_TITLES[step - 1]}</h2>

              {step === 1 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label">Full name *</label>
                    <input id="name" name="name" className="input" value={formData.name} onChange={(e) => updateFormData((current) => ({ ...current, name: e.target.value }))} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Work email *</label>
                    <input id="email" name="email" type="email" className="input" value={formData.email} onChange={(e) => updateFormData((current) => ({ ...current, email: e.target.value }))} placeholder="jane@company.com" />
                  </div>
                  <div>
                    <label htmlFor="company" className="label">Organization *</label>
                    <input id="company" name="company" className="input" value={formData.company} onChange={(e) => updateFormData((current) => ({ ...current, company: e.target.value }))} placeholder="Acme Properties" />
                  </div>
                  <div>
                    <label htmlFor="role" className="label">Job title</label>
                    <input id="role" name="role" className="input" value={formData.role} onChange={(e) => updateFormData((current) => ({ ...current, role: e.target.value }))} placeholder="Facilities Director" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="label">Phone optional</label>
                    <input id="phone" name="phone" type="tel" className="input" value={formData.phone} onChange={(e) => updateFormData((current) => ({ ...current, phone: e.target.value }))} placeholder="(555) 123-4567" />
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="buildingName" className="label">Building name *</label>
                    <input id="buildingName" className="input" value={formData.buildingName} onChange={(e) => updateFormData((current) => ({ ...current, buildingName: e.target.value }))} placeholder="Riverfront Tower" />
                  </div>
                  <div>
                    <label htmlFor="buildingType" className="label">Building type *</label>
                    <select id="buildingType" className="select" value={formData.buildingType} onChange={(e) => updateFormData((current) => ({ ...current, buildingType: e.target.value }))}>
                      <option value="">Select type...</option>
                      {BUILDING_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="addressLine1" className="label">Street address *</label>
                    <input id="addressLine1" className="input" value={formData.addressLine1} onChange={(e) => updateFormData((current) => ({ ...current, addressLine1: e.target.value }))} placeholder="123 Main Street" />
                  </div>
                  <div>
                    <label htmlFor="city" className="label">City *</label>
                    <input id="city" className="input" value={formData.city} onChange={(e) => updateFormData((current) => ({ ...current, city: e.target.value }))} placeholder="Chicago" />
                  </div>
                  <div>
                    <label htmlFor="state" className="label">State *</label>
                    <input id="state" className="input" value={formData.state} onChange={(e) => updateFormData((current) => ({ ...current, state: e.target.value }))} placeholder="IL" />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="label">Postal code *</label>
                    <input id="postalCode" className="input" value={formData.postalCode} onChange={(e) => updateFormData((current) => ({ ...current, postalCode: e.target.value }))} placeholder="60601" />
                  </div>
                  <div>
                    <label htmlFor="portfolioSize" className="label">Approximate square footage / number of buildings *</label>
                    <input id="portfolioSize" className="input" value={formData.portfolioSize} onChange={(e) => updateFormData((current) => ({ ...current, portfolioSize: e.target.value }))} placeholder="e.g., 5 buildings, 2M sq ft" />
                  </div>
                  <div>
                    <label htmlFor="basPlatform" className="label">BAS vendor if known</label>
                    <input id="basPlatform" className="input" value={formData.basPlatform} onChange={(e) => updateFormData((current) => ({ ...current, basPlatform: e.target.value }))} placeholder="Niagara, Metasys, WebCTRL, etc." />
                  </div>
                  <div>
                    <label htmlFor="primaryConcern" className="label">What you want to understand</label>
                    <input id="primaryConcern" className="input" value={formData.primaryConcern} onChange={(e) => updateFormData((current) => ({ ...current, primaryConcern: e.target.value }))} placeholder="Energy spend, comfort complaints, equipment reliability" />
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
                  <div className="space-y-6">
                    <div>
                      <label className="label">CSV dataset *</label>
                      <input ref={fileInputRef} id="dataset" type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => void handleDatasetSelected(e.target.files?.[0] ?? null)} />

                      {formData.dataset ? (
                        <div className="rounded-xl border bg-[#0f1116] p-5" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
                          <p className="text-body-sm font-semibold text-[#f5f3ee]">{formData.dataset.fileName}</p>
                          <p className="mt-2 text-body-xs text-[#99a1ad]">{datasetSummary}</p>
                          <p className="mt-1 flex items-center gap-2 text-body-xs text-[#34e0b4]">
                            {datasetUploadState === 'uploading' ? (
                              'Uploading dataset...'
                            ) : (
                              <>
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                Dataset uploaded. Your progress is saved.
                              </>
                            )}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-3">
                            <button type="button" className="thermal-btn-secondary" onClick={() => fileInputRef.current?.click()}>Replace File</button>
                            <button type="button" className="thermal-btn-secondary" onClick={() => void handleRemoveDataset()}>Remove File</button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 rounded-xl border border-dashed bg-[#0f1116] p-6" style={{ borderColor: 'rgba(244,242,237,0.16)' }}>
                          <button type="button" className="thermal-btn-primary" onClick={() => fileInputRef.current?.click()} disabled={datasetUploadState === 'uploading'}>
                            {datasetUploadState === 'uploading' ? 'Uploading CSV...' : 'Choose CSV File'}
                          </button>
                          <p className="text-body-xs text-[#99a1ad]">{datasetSummary}</p>
                          <p className="text-body-xs text-[#868d99]">CSV only. 2-5 minute intervals are recommended. Upload as much history as you have available.</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="notes" className="label">Notes</label>
                      <textarea id="notes" rows={4} className="input resize-none" value={formData.notes} onChange={(e) => updateFormData((current) => ({ ...current, notes: e.target.value }))} placeholder="Anything we should know before manual review?" />
                    </div>
                  </div>

                  <div className="rounded-xl border bg-[#0f1116] p-5" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
                    <p className="text-body-sm font-semibold text-[#f5f3ee]">Accepted formats and examples</p>
                    <p className="mt-3 text-body-sm text-[#99a1ad]">
                      Accepted format: CSV. Useful files include BAS trend exports, point histories, temperatures, setpoints,
                      schedules, runtime logs, and equipment-level exports.
                    </p>
                    <a href="/templates/sample-bas-template.csv" download className="thermal-btn-secondary mt-5 inline-flex">Download Sample CSV</a>
                    <p className="mt-4 text-body-xs text-[#868d99]">
                      LeanFM uses uploaded data only to perform the requested review and prepare next steps.
                    </p>
                  </div>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-xl border bg-[#0f1116] p-5" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
                    <p className="thermal-mono text-[11px] uppercase tracking-[0.16em] text-[#22d3ee]">Account</p>
                    <div className="mt-4 space-y-2 text-body-sm text-[#99a1ad]">
                      <p>{formData.name}</p>
                      <p>{formData.email}</p>
                      <p>{formData.company}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.role || 'No job title provided'}</p>
                    </div>
                  </div>
                  <div className="rounded-xl border bg-[#0f1116] p-5" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
                    <p className="thermal-mono text-[11px] uppercase tracking-[0.16em] text-[#22d3ee]">Building</p>
                    <div className="mt-4 space-y-2 text-body-sm text-[#99a1ad]">
                      <p>{formData.buildingName}</p>
                      <p>{formData.addressLine1}</p>
                      <p>{formData.city}, {formData.state} {formData.postalCode}</p>
                      <p>{formData.buildingType}</p>
                      <p>{formData.portfolioSize}</p>
                    </div>
                  </div>
                  <div className="rounded-xl border bg-[#0f1116] p-5 lg:col-span-2" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
                    <p className="thermal-mono text-[11px] uppercase tracking-[0.16em] text-[#22d3ee]">Dataset</p>
                    <div className="mt-4 space-y-2 text-body-sm text-[#99a1ad]">
                      <p>{datasetSummary}</p>
                      <p>{formData.basPlatform || 'BAS platform not provided'}</p>
                      <p>{formData.primaryConcern || 'Primary concern not provided'}</p>
                      <p>{formData.notes || 'No notes provided'}</p>
                    </div>
                  </div>
                </div>
              ) : null}

              {errorMessage ? (
                <div className="mt-6 rounded-xl border p-4 text-body-sm text-[#f2622e]" style={{ borderColor: 'rgba(242,98,46,0.35)', background: 'rgba(242,98,46,0.10)' }}>
                  {errorMessage}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button type="button" className="thermal-btn-secondary" onClick={() => void handleBack()} disabled={step === 1 || submissionState === 'submitting'}>
                  Back
                </button>

                {step < 4 ? (
                  <button type="button" className="thermal-btn-primary" onClick={() => void handleNext()} disabled={datasetUploadState === 'uploading'}>
                    Continue
                  </button>
                ) : (
                  <button type="button" className="thermal-btn-primary" onClick={() => void handleSubmit()} disabled={submissionState === 'submitting'}>
                    {submissionState === 'submitting' ? variant.submittingButtonLabel : variant.submitButtonLabel}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border bg-[#14171e] py-12 text-center shadow-[0_18px_60px_rgba(0,0,0,0.4)]" style={{ borderColor: 'rgba(244,242,237,0.10)' }}>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(52,224,180,0.12)', boxShadow: '0 0 30px -6px rgba(52,224,180,0.5)' }}>
                <svg className="h-8 w-8 text-[#34e0b4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="thermal-serif mb-4 text-[clamp(36px,4.6vw,56px)] leading-[1.04] text-[#f5f3ee]">{completionContent.title}</h2>
              <p className="mx-auto mb-8 max-w-2xl text-[clamp(18px,1.5vw,21px)] leading-[1.55] text-[#99a1ad]">{completionContent.description}</p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                {completionContent.actions.map((action, index) => (
                  <Link
                    key={[action.href, action.label, index].join('-')}
                    href={action.href}
                    className={(action.variant || (index === 0 ? 'primary' : 'secondary')) === 'primary' ? 'thermal-btn-primary' : 'thermal-btn-secondary'}
                    onClick={action.eventName ? () => trackEvent(action.eventName as string, action.eventParams || {}) : undefined}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
