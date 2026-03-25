'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Badge, Card } from '@/components/ui'
import { trackEvent } from '@/lib/analytics'

type Step = 1 | 2 | 3 | 4

type SubmissionState = 'idle' | 'submitting' | 'error'
type CompletionState = 'account_pending_review' | 'pending_submission_exists'
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

interface SampleIntakeApiResponse {
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

interface SampleIntakeFormData {
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
  formData: SampleIntakeFormData
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STEP_TITLES = ['Account Details', 'Building Context', 'Dataset Upload', 'Review']
const LOCAL_DRAFT_STORAGE_KEY = 'leanfm-sample-intake-draft'
const DRAFT_TOKEN_HEADER = 'x-leanfm-sample-intake-draft-token'
const AUTOSAVE_DEBOUNCE_MS = 700

const DEFAULT_FORM_DATA: SampleIntakeFormData = {
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

function isStepOneEligible(formData: SampleIntakeFormData) {
  return Boolean(
    formData.name.trim() &&
    formData.email.trim() &&
    EMAIL_REGEX.test(formData.email) &&
    formData.company.trim() &&
    formData.phone.trim()
  )
}

function buildDraftSnapshot(formData: SampleIntakeFormData, step: Step, draftToken: string): LocalDraftSnapshot {
  return {
    draftToken,
    step,
    savedAt: new Date().toISOString(),
    formData,
  }
}

function formDataFromDraftResponse(draft: DraftApiResponse['draft']): SampleIntakeFormData {
  return {
    ...draft.fields,
    dataset: draft.dataset,
  }
}

function parseLocalDraftSnapshot() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const rawValue = window.localStorage.getItem(LOCAL_DRAFT_STORAGE_KEY)
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
      return 'Saving'
    case 'saved':
      return 'Saved'
    case 'saved_local':
      return 'Saved locally'
    case 'save_failed':
      return 'Save failed'
    default:
      return 'Not saved yet'
  }
}

export default function StartPage() {
  const [step, setStep] = useState<Step>(1)
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [completionState, setCompletionState] = useState<CompletionState>('account_pending_review')
  const [isComplete, setIsComplete] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [formData, setFormData] = useState<SampleIntakeFormData>(DEFAULT_FORM_DATA)
  const [draftToken, setDraftToken] = useState('')
  const [datasetUploadState, setDatasetUploadState] = useState<DatasetUploadState>('idle')
  const [lastSavedAt, setLastSavedAt] = useState('')

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const draftTokenRef = useRef('')
  const lastLocalSavedAtRef = useRef('')
  const isHydratedRef = useRef(false)
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const datasetSummary = useMemo(() => formatDatasetSummary(formData.dataset), [formData.dataset])

  const persistLocalSnapshot = (nextFormData: SampleIntakeFormData, nextStep: Step, nextDraftToken: string) => {
    try {
      const snapshot = buildDraftSnapshot(nextFormData, nextStep, nextDraftToken)
      window.localStorage.setItem(LOCAL_DRAFT_STORAGE_KEY, JSON.stringify(snapshot))
      lastLocalSavedAtRef.current = snapshot.savedAt
      setLastSavedAt(snapshot.savedAt)
      return true
    } catch {
      return false
    }
  }

  const clearPersistedDraft = () => {
    draftTokenRef.current = ''
    setDraftToken('')
    setLastSavedAt('')
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(LOCAL_DRAFT_STORAGE_KEY)
    }
  }

  const setDraftTokenAndPersist = (nextDraftToken: string, nextFormData = formData, nextStep = step) => {
    draftTokenRef.current = nextDraftToken
    setDraftToken(nextDraftToken)
    persistLocalSnapshot(nextFormData, nextStep, nextDraftToken)
  }

  const updateFormData = (updater: (current: SampleIntakeFormData) => SampleIntakeFormData) => {
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

  const saveDraftToServer = async (nextFormData: SampleIntakeFormData, nextStep: Step) => {
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

  useEffect(() => {
    trackEvent('start_step_view', { step_number: step })
  }, [step])

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
      lastLocalSavedAtRef.current = localSnapshot.savedAt
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
            window.localStorage.removeItem(LOCAL_DRAFT_STORAGE_KEY)
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
          window.localStorage.removeItem(LOCAL_DRAFT_STORAGE_KEY)
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
          lastLocalSavedAtRef.current = body.draft.lastSavedAt
          persistLocalSnapshot(nextFormData, nextStep, body.draftToken)
          setSaveState('saved')
        }
      } catch {
        setSaveState((current) => (current === 'idle' ? 'saved_local' : current))
      }
    })()
  }, [])

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
      if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.phone.trim()) {
        return 'Please complete full name, work email, organization, and phone.'
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
    trackEvent('start_step_complete', { step_number: step })

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
        throw new Error('The dataset uploaded, but we could not save it to your draft yet. Please wait a moment and try again.')
      }

      setDatasetUploadState('uploaded')
      trackEvent('sample_upload_dataset_selected', { file_size_bytes: file.size })
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
      trackEvent('sample_upload_submit_error', { error_type: 'client_validation' })
      return
    }

    const saved = await saveDraftToServer(formData, 4)
    if (!saved || !draftTokenRef.current) {
      setErrorMessage('We saved your progress locally, but could not sync the latest draft yet. Please retry in a moment.')
      trackEvent('sample_upload_submit_error', { error_type: 'draft_sync_required' })
      return
    }

    setSubmissionState('submitting')
    setErrorMessage('')
    trackEvent('sample_upload_submit', { file_size_bytes: formData.dataset?.fileSizeBytes || 0 })

    try {
      const response = await fetch('/api/sample-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draftToken: draftTokenRef.current,
        }),
      })

      const responseBody = (await response.json().catch(() => null)) as SampleIntakeApiResponse | null

      if (!response.ok) {
        if (response.status === 409 && responseBody?.code === 'PENDING_SUBMISSION_EXISTS') {
          clearPersistedDraft()
          setCompletionState('pending_submission_exists')
          setSubmissionState('idle')
          setIsComplete(true)
          trackEvent('sample_upload_submit_duplicate', {})
          return
        }

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
      setCompletionState('account_pending_review')
      trackEvent('sample_upload_submit_success', {})
      trackEvent('start_step_complete', { step_number: 4 })
      setSubmissionState('idle')
      setIsComplete(true)
      setSaveState('idle')
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
            <h1 className="heading-1 text-white mb-6">Create your preview account and upload sample BAS data</h1>
            <p className="body-large">
              Complete account setup, upload your CSV, and LeanFM will prepare your OnPoint workspace
              for manual review, FDD setup, and activation.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-default max-w-5xl">
          <Card className="mb-8">
            <div className="mb-6 flex flex-col gap-3 border-b border-slate-800/80 pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-body-sm text-white">Progress is saved automatically.</p>
                <p className="mt-1 text-body-xs text-slate-400">
                  Status: {saveStateLabel(saveState)}{lastSavedAt ? ` · ${new Date(lastSavedAt).toLocaleTimeString()}` : ''}
                </p>
              </div>
              {draftToken ? (
                <p className="text-body-xs text-slate-500">Draft linked for same-browser resume and follow-up protection.</p>
              ) : (
                <p className="text-body-xs text-slate-500">Server draft starts after required contact info is entered.</p>
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
                      className={`w-8 h-8 rounded-full border flex items-center justify-center text-body-xs font-semibold ${
                        isCompleteStep
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

          {!isComplete ? (
            <Card>
              <h2 className="heading-3 text-white mb-6">{STEP_TITLES[step - 1]}</h2>

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
                    <label htmlFor="phone" className="label">Phone *</label>
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
                    <label htmlFor="portfolioSize" className="label">Portfolio size *</label>
                    <input id="portfolioSize" className="input" value={formData.portfolioSize} onChange={(e) => updateFormData((current) => ({ ...current, portfolioSize: e.target.value }))} placeholder="e.g., 5 buildings, 2M sq ft" />
                  </div>
                  <div>
                    <label htmlFor="basPlatform" className="label">BAS platform</label>
                    <input id="basPlatform" className="input" value={formData.basPlatform} onChange={(e) => updateFormData((current) => ({ ...current, basPlatform: e.target.value }))} placeholder="Niagara, Metasys, WebCTRL, etc." />
                  </div>
                  <div>
                    <label htmlFor="primaryConcern" className="label">Primary concern</label>
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
                        <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-5">
                          <p className="text-body-sm font-semibold text-white">{formData.dataset.fileName}</p>
                          <p className="mt-2 text-body-xs text-slate-400">{datasetSummary}</p>
                          <p className="mt-1 text-body-xs text-slate-500">
                            {datasetUploadState === 'uploading' ? 'Uploading dataset...' : 'Dataset uploaded and saved to your draft.'}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-3">
                            <button type="button" className="btn-secondary" onClick={() => fileInputRef.current?.click()}>Replace File</button>
                            <button type="button" className="btn-secondary" onClick={() => void handleRemoveDataset()}>Remove File</button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <button type="button" className="btn-secondary" onClick={() => fileInputRef.current?.click()} disabled={datasetUploadState === 'uploading'}>
                            {datasetUploadState === 'uploading' ? 'Uploading CSV...' : 'Choose CSV File'}
                          </button>
                          <p className="text-body-xs text-slate-500">{datasetSummary}</p>
                          <p className="text-body-xs text-slate-500">CSV only. 2-5 minute intervals are recommended. Upload as much history as you have available.</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="notes" className="label">Notes</label>
                      <textarea id="notes" rows={4} className="input resize-none" value={formData.notes} onChange={(e) => updateFormData((current) => ({ ...current, notes: e.target.value }))} placeholder="Anything we should know before manual review?" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-5">
                    <p className="text-body-sm font-semibold text-white">CSV formatting help</p>
                    <p className="mt-3 text-body-sm text-slate-400">
                      Use the sample template to match the expected time-series BAS structure: one timestamp column first,
                      then one column per trended point. We recommend 2-5 minute intervals, but we do not require a hard size
                      limit on the file you upload.
                    </p>
                    <a href="/templates/sample-bas-template.csv" download className="btn-secondary mt-5 inline-flex">Download Sample CSV</a>
                    <p className="mt-4 text-body-xs text-slate-500">
                      More data usually helps us assess fit faster, even if we only use part of it for the initial FDD review.
                    </p>
                  </div>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <p className="text-body-sm font-semibold text-white">Account</p>
                    <div className="mt-4 space-y-2 text-body-sm text-slate-300">
                      <p>{formData.name}</p>
                      <p>{formData.email}</p>
                      <p>{formData.company}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.role || 'No job title provided'}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                    <p className="text-body-sm font-semibold text-white">Building</p>
                    <div className="mt-4 space-y-2 text-body-sm text-slate-300">
                      <p>{formData.buildingName}</p>
                      <p>{formData.addressLine1}</p>
                      <p>{formData.city}, {formData.state} {formData.postalCode}</p>
                      <p>{formData.buildingType}</p>
                      <p>{formData.portfolioSize}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 lg:col-span-2">
                    <p className="text-body-sm font-semibold text-white">Dataset</p>
                    <div className="mt-4 space-y-2 text-body-sm text-slate-300">
                      <p>{datasetSummary}</p>
                      <p>{formData.basPlatform || 'BAS platform not provided'}</p>
                      <p>{formData.primaryConcern || 'Primary concern not provided'}</p>
                      <p>{formData.notes || 'No notes provided'}</p>
                    </div>
                  </div>
                </div>
              ) : null}

              {errorMessage ? (
                <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-body-sm text-red-400">
                  {errorMessage}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
                <button type="button" className="btn-secondary" onClick={() => void handleBack()} disabled={step === 1 || submissionState === 'submitting'}>
                  Back
                </button>

                {step < 4 ? (
                  <button type="button" className="btn-primary" onClick={() => void handleNext()} disabled={datasetUploadState === 'uploading'}>
                    Continue
                  </button>
                ) : (
                  <button type="button" className="btn-primary" onClick={() => void handleSubmit()} disabled={submissionState === 'submitting'}>
                    {submissionState === 'submitting' ? 'Creating Account & Submitting Draft...' : 'Create Account & Submit Dataset'}
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
              <h2 className="heading-2 text-white mb-4">
                {completionState === 'account_pending_review' ? 'Preview account created' : 'Preview already pending'}
              </h2>
              <p className="body-large max-w-2xl mx-auto mb-8">
                {completionState === 'account_pending_review'
                  ? 'Your OnPoint preview account is pending staff approval and activation. We staged your building and dataset for manual review, and we’ll send credentials after the FDD setup is complete.'
                  : 'A pending OnPoint preview already exists for this email and building. Please check your email for the original invite or contact LeanFM if you need help accessing it.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/contact?intent=demo" className="btn-primary" onClick={() => trackEvent('cta_demo_click', { location: 'start_confirmation_primary' })}>
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
