import type { Lead, SampleIntakeAsset } from '@prisma/client'
import { resolveStoredSampleIntakeObject } from '@/lib/sample-intake-storage'

type OnPointResponseBody = Record<string, unknown> | string | null

const DEFAULT_ONPOINT_TIMEOUT_MS = 15000

export interface ProvisionableSampleLead extends Lead {
  sampleIntakeAsset?: SampleIntakeAsset | null
}

export interface OnPointProvisioningResult {
  submissionId: string
  customerId: string
  userId: string
  buildingId: string
  uploadId: string
  accountStatus: string
  activationStatus: string
  reviewStatus: string
  accessEmailStatus: string
  responseBody: OnPointResponseBody
}

export class OnPointProvisioningError extends Error {
  statusCode: number
  code: string | null
  userMessage: string
  retryable: boolean
  responseBody: OnPointResponseBody

  constructor(input: {
    message: string
    statusCode: number
    code?: string | null
    userMessage: string
    retryable: boolean
    responseBody?: OnPointResponseBody
  }) {
    super(input.message)
    this.name = 'OnPointProvisioningError'
    this.statusCode = input.statusCode
    this.code = input.code || null
    this.userMessage = input.userMessage
    this.retryable = input.retryable
    this.responseBody = input.responseBody ?? null
  }
}

function resolveOnPointIntakeUrl() {
  return process.env.ONPOINT_SAMPLE_INTAKE_URL?.trim() || null
}

function getOnPointTimeoutMs() {
  const rawValue = Number(process.env.ONPOINT_SAMPLE_INTAKE_TIMEOUT_MS || DEFAULT_ONPOINT_TIMEOUT_MS)
  return Number.isFinite(rawValue) && rawValue > 0 ? rawValue : DEFAULT_ONPOINT_TIMEOUT_MS
}

function getOnPointHeaders() {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  const apiKey = process.env.ONPOINT_API_KEY?.trim()
  if (!apiKey) {
    return headers
  }

  const headerName = process.env.ONPOINT_API_KEY_HEADER?.trim() || 'Authorization'
  if (headerName.toLowerCase() === 'authorization') {
    headers.Authorization = `Bearer ${apiKey}`
    return headers
  }

  headers[headerName] = apiKey
  return headers
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function setOptionalField(payload: Record<string, unknown>, key: string, value: string | null | undefined) {
  if (value && value.trim()) {
    payload[key] = value.trim()
  }
}

function getFallbackBuildingName(lead: Lead) {
  const baseName = lead.company.trim() || 'Sample Building'

  if (!lead.buildingType) {
    return `${baseName} - Sample Building`
  }

  return `${baseName} - ${lead.buildingType} Sample`
}

async function parseResponseBody(response: Response): Promise<OnPointResponseBody> {
  const responseText = await response.text()
  if (!responseText) {
    return null
  }

  try {
    return JSON.parse(responseText) as Record<string, unknown>
  } catch {
    return responseText
  }
}

function getValueByPath(payload: Record<string, unknown>, path: string) {
  return path.split('.').reduce<unknown>((currentValue, key) => {
    if (!isRecord(currentValue)) {
      return null
    }

    return currentValue[key]
  }, payload)
}

function getFirstString(payload: OnPointResponseBody, candidates: string[]) {
  if (!isRecord(payload)) {
    return null
  }

  for (const candidate of candidates) {
    const value = getValueByPath(payload, candidate)
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value)
    }
  }

  return null
}

function getRequiredString(payload: OnPointResponseBody, candidates: string[], fieldName: string) {
  const value = getFirstString(payload, candidates)
  if (!value) {
    throw new OnPointProvisioningError({
      message: `OnPoint intake response is missing ${fieldName}.`,
      statusCode: 502,
      code: 'INVALID_ONPOINT_RESPONSE',
      userMessage: 'We could not finish starting your Sample Analysis right now. Please try again or contact LeanFM.',
      retryable: true,
      responseBody: payload,
    })
  }

  return value
}

function formatOnPointError(body: OnPointResponseBody) {
  if (!body) {
    return 'No response body'
  }

  if (typeof body === 'string') {
    return body
  }

  const message = getFirstString(body, ['error', 'message', 'detail', 'error.message'])
  if (message) {
    return message
  }

  return JSON.stringify(body)
}

function getOnPointErrorCode(body: OnPointResponseBody) {
  return getFirstString(body, ['code', 'errorCode', 'error.code'])
}

function toOnPointProvisioningError(error: unknown) {
  if (error instanceof OnPointProvisioningError) {
    return error
  }

  return new OnPointProvisioningError({
    message: error instanceof Error ? error.message : 'Unknown OnPoint intake error.',
    statusCode: 502,
    code: 'ONPOINT_REQUEST_FAILED',
    userMessage: 'We could not start your Sample Analysis right now. Please try again or contact LeanFM.',
    retryable: true,
  })
}

async function sendOnPointIntakeRequest(payload: Record<string, unknown>) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), getOnPointTimeoutMs())

  try {
    return await fetch(resolveOnPointIntakeUrl() as string, {
      method: 'POST',
      headers: getOnPointHeaders(),
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new OnPointProvisioningError({
        message: 'OnPoint intake request timed out.',
        statusCode: 504,
        code: 'ONPOINT_TIMEOUT',
        userMessage: 'We could not start your Sample Analysis right now. Please try again or contact LeanFM.',
        retryable: true,
      })
    }

    throw new OnPointProvisioningError({
      message: error instanceof Error ? error.message : 'OnPoint intake request failed.',
      statusCode: 502,
      code: 'ONPOINT_REQUEST_FAILED',
      userMessage: 'We could not start your Sample Analysis right now. Please try again or contact LeanFM.',
      retryable: true,
    })
  } finally {
    clearTimeout(timeout)
  }
}

function buildOnPointPayload(input: { lead: ProvisionableSampleLead }) {
  const sampleIntakeAsset = input.lead.sampleIntakeAsset
  if (!sampleIntakeAsset) {
    throw new OnPointProvisioningError({
      message: 'Sample intake asset is not attached to the lead.',
      statusCode: 500,
      code: 'MISSING_SAMPLE_ASSET',
      userMessage: 'We could not start your Sample Analysis right now. Please try again or contact LeanFM.',
      retryable: true,
    })
  }

  const storedObject = resolveStoredSampleIntakeObject(sampleIntakeAsset)
  const payload: Record<string, unknown> = {
    submissionId: sampleIntakeAsset.submissionId,
    source: input.lead.source,
    intent: input.lead.intent,
    intentLevel: 'high',
    approvalRequired: true,
    activationRequired: true,
    name: input.lead.name,
    email: input.lead.email,
    company: input.lead.company,
    phone: input.lead.phone || '',
    buildingName: input.lead.buildingName?.trim() || getFallbackBuildingName(input.lead),
    addressLine1: input.lead.addressLine1 || '',
    city: input.lead.city || '',
    state: input.lead.state || '',
    postalCode: input.lead.postalCode || '',
    buildingType: input.lead.buildingType || '',
    portfolioSize: input.lead.portfolioSize || '',
    dataset: {
      fileName: sampleIntakeAsset.datasetFileName,
      fileSizeBytes: sampleIntakeAsset.datasetFileSizeBytes,
      mimeType: sampleIntakeAsset.datasetMimeType,
      storageProvider: storedObject.storageProvider,
      storageBucket: storedObject.storageBucket,
      storageKey: storedObject.storageKey,
      storageRegion: storedObject.storageRegion,
      storageEndpoint: storedObject.storageEndpoint,
      localFilePath: storedObject.localFilePath,
    },
  }

  setOptionalField(payload, 'role', input.lead.role)
  setOptionalField(payload, 'basPlatform', sampleIntakeAsset.basPlatform)
  setOptionalField(payload, 'primaryConcern', sampleIntakeAsset.primaryConcern)
  setOptionalField(payload, 'notes', input.lead.message)

  return payload
}

export async function provisionSampleIntakeInOnPoint(input: {
  lead: ProvisionableSampleLead
}): Promise<OnPointProvisioningResult> {
  const intakeUrl = resolveOnPointIntakeUrl()
  if (!intakeUrl) {
    throw new OnPointProvisioningError({
      message: 'ONPOINT_SAMPLE_INTAKE_URL is not configured.',
      statusCode: 500,
      code: 'ONPOINT_NOT_CONFIGURED',
      userMessage: 'We could not start your Sample Analysis right now. Please try again or contact LeanFM.',
      retryable: true,
    })
  }

  const response = await sendOnPointIntakeRequest(buildOnPointPayload(input))
  const responseBody = await parseResponseBody(response)

  if (!response.ok) {
    const errorCode = getOnPointErrorCode(responseBody)
    const errorMessage = formatOnPointError(responseBody)

    if (response.status === 409 && errorCode === 'PENDING_SUBMISSION_EXISTS') {
      throw new OnPointProvisioningError({
        message: `OnPoint intake duplicate: ${errorMessage}`,
        statusCode: 409,
        code: errorCode,
        userMessage: 'A pending Sample Analysis already exists for this email and organization. Please check your email or contact LeanFM for help.',
        retryable: false,
        responseBody,
      })
    }

    if (response.status === 400 || response.status === 422) {
      throw new OnPointProvisioningError({
        message: `OnPoint intake validation failed: ${errorMessage}`,
        statusCode: 400,
        code: errorCode || 'ONPOINT_VALIDATION_FAILED',
        userMessage: errorMessage || 'We could not validate your Sample Analysis request. Please review your details and try again.',
        retryable: false,
        responseBody,
      })
    }

    throw new OnPointProvisioningError({
      message: `OnPoint intake failed with ${response.status}: ${errorMessage}`,
      statusCode: response.status >= 500 ? 502 : response.status,
      code: errorCode || 'ONPOINT_INTAKE_FAILED',
      userMessage: 'We could not start your Sample Analysis right now. Please try again or contact LeanFM.',
      retryable: true,
      responseBody,
    })
  }

  return {
    submissionId: getRequiredString(responseBody, ['submissionId'], 'submissionId'),
    customerId: getRequiredString(responseBody, ['customerId', 'customer.id'], 'customerId'),
    userId: getRequiredString(responseBody, ['userId', 'user.id', 'accountUserId'], 'userId'),
    buildingId: getRequiredString(responseBody, ['buildingId', 'building.id'], 'buildingId'),
    uploadId: getRequiredString(responseBody, ['uploadId', 'datasetId', 'upload.id'], 'uploadId'),
    accountStatus: getRequiredString(responseBody, ['accountStatus', 'user.status'], 'accountStatus'),
    activationStatus: getRequiredString(responseBody, ['activationStatus', 'user.activationStatus'], 'activationStatus'),
    reviewStatus: getRequiredString(responseBody, ['reviewStatus', 'dataset.reviewStatus', 'status'], 'reviewStatus'),
    accessEmailStatus: getRequiredString(responseBody, ['accessEmailStatus', 'emailStatus'], 'accessEmailStatus'),
    responseBody,
  }
}

export function stringifyOnPointResponseBody(body: OnPointResponseBody) {
  if (body == null) {
    return null
  }

  return typeof body === 'string' ? body : JSON.stringify(body)
}

export function serializeOnPointError(error: unknown) {
  const onPointError = toOnPointProvisioningError(error)

  return {
    statusCode: onPointError.statusCode,
    code: onPointError.code,
    userMessage: onPointError.userMessage,
    retryable: onPointError.retryable,
    responseBody: onPointError.responseBody,
    detail: onPointError.message,
  }
}
