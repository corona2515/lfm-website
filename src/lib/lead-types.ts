import type { LeadStatus, LeadSyncStatus, LeadType, SampleIntakeDraftStatus } from '@prisma/client'

export interface ContactLeadInput {
  name: string
  email: string
  company: string
  role?: string
  phone?: string
  buildingType?: string
  portfolioSize?: string
  message?: string
  intent: string
}

export interface DatasetUploadLeadInput {
  intent: string
  source: string
  auditDescription?: string
  name: string
  email: string
  company: string
  role?: string
  phone: string
  buildingName: string
  addressLine1: string
  city: string
  state: string
  postalCode: string
  buildingType: string
  portfolioSize: string
  basPlatform?: string
  primaryConcern?: string
  notes?: string
  datasetFileName: string
  datasetFileSizeBytes: number
  datasetMimeType: string
  storageProvider?: string
  storageBucket?: string
  storageKey?: string
  storageRegion?: string
  storageEndpoint?: string
  localFilePath?: string
  submissionId: string
}

export type SampleLeadInput = Omit<DatasetUploadLeadInput, 'intent' | 'source' | 'auditDescription'>

export const LEAD_STATUSES: Array<{ value: LeadStatus; label: string }> = [
  { value: 'NEW', label: 'New' },
  { value: 'ASSIGNED', label: 'Assigned' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'QUALIFIED', label: 'Qualified' },
  { value: 'DISQUALIFIED', label: 'Disqualified' },
  { value: 'SAMPLE_REVIEW_IN_PROGRESS', label: 'Dataset Review In Progress' },
  { value: 'CLOSED_WON', label: 'Closed Won' },
  { value: 'CLOSED_LOST', label: 'Closed Lost' },
]

export const LEAD_TYPES: Array<{ value: LeadType; label: string }> = [
  { value: 'CONTACT', label: 'Contact' },
  { value: 'SAMPLE_UPLOAD', label: 'Dataset Upload' },
]

export const SYNC_STATUS_LABELS: Record<LeadSyncStatus, string> = {
  SUCCESS: 'Success',
  FAILED: 'Failed',
  PENDING_RETRY: 'Pending Retry',
}

export const SAMPLE_INTAKE_DRAFT_STATUS_LABELS: Record<SampleIntakeDraftStatus, string> = {
  ACTIVE: 'Active',
  ABANDONED: 'Abandoned',
  COMPLETED: 'Completed',
}

export function formatLeadStatus(status: LeadStatus) {
  return LEAD_STATUSES.find((item) => item.value === status)?.label || status
}

export function formatLeadType(type: LeadType) {
  return LEAD_TYPES.find((item) => item.value === type)?.label || type
}

export function formatSampleIntakeDraftStatus(status: SampleIntakeDraftStatus) {
  return SAMPLE_INTAKE_DRAFT_STATUS_LABELS[status] || status
}
