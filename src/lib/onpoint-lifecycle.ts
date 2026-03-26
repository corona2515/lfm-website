export interface OnPointLifecycleSnapshot {
  submissionId: string | null
  reviewStatus: string | null
  activationStatus: string | null
  accessEmailStatus: string | null
  accountStatus: string | null
  customerId: string | null
  userId: string | null
  buildingId: string | null
  uploadId: string | null
  rejectionReason: string | null
  eventType: string | null
  updatedAt: string | null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parsePayload(payload: unknown) {
  if (typeof payload === 'string') {
    try {
      return JSON.parse(payload) as Record<string, unknown>
    } catch {
      return null
    }
  }

  return isRecord(payload) ? payload : null
}

function getString(payload: Record<string, unknown> | null, key: string) {
  if (!payload) {
    return null
  }

  const value = payload[key]
  if (typeof value === 'string' && value.trim()) {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return null
}

export function getOnPointLifecycleSnapshot(payload: unknown): OnPointLifecycleSnapshot | null {
  const parsedPayload = parsePayload(payload)
  if (!parsedPayload) {
    return null
  }

  return {
    submissionId: getString(parsedPayload, 'submissionId'),
    reviewStatus: getString(parsedPayload, 'reviewStatus'),
    activationStatus: getString(parsedPayload, 'activationStatus'),
    accessEmailStatus: getString(parsedPayload, 'accessEmailStatus'),
    accountStatus: getString(parsedPayload, 'accountStatus'),
    customerId: getString(parsedPayload, 'customerId'),
    userId: getString(parsedPayload, 'userId'),
    buildingId: getString(parsedPayload, 'buildingId'),
    uploadId: getString(parsedPayload, 'uploadId'),
    rejectionReason: getString(parsedPayload, 'rejectionReason'),
    eventType: getString(parsedPayload, 'eventType'),
    updatedAt: getString(parsedPayload, 'updatedAt') || getString(parsedPayload, 'timestamp'),
  }
}

export function formatLifecycleValue(value: string | null | undefined) {
  if (!value) {
    return 'N/A'
  }

  return value
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
