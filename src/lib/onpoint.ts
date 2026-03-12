import { readFile } from 'fs/promises'
import type { Lead, SampleIntakeAsset } from '@prisma/client'

type OnPointResponseBody = Record<string, unknown> | string | null

const DEFAULT_ONPOINT_TIMEOUT_MS = 15000

export interface ProvisionableSampleLead extends Lead {
  sampleIntakeAsset?: SampleIntakeAsset | null
}

export interface OnPointProvisioningResult {
  userId: string
  buildingId: string
  uploadId: string
  accountStatus: string
  activationStatus: string
  reviewStatus: string
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
  const apiKey = process.env.ONPOINT_API_KEY?.trim()
  if (!apiKey) {
    return undefined
  }

  const headerName = process.env.ONPOINT_API_KEY_HEADER?.trim() || 'Authorization'
  if (headerName.toLowerCase() === 'authorization') {
    return { Authorization: `Bearer ${apiKey}` }
  }

  return { [headerName]: apiKey }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function appendOptionalField(formData: FormData, key: string, value: string | null | undefined) {
  if (value && value.trim()) {
    formData.append(key, value)
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
      userMessage: 'We could not finish creating your preview account right now. Please try again or contact LeanFM.',
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
    userMessage: 'We could not create your preview account right now. Please try again or contact LeanFM.',
    retryable: true,
  })
}

async function sendOnPointIntakeRequest(payload: FormData) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), getOnPointTimeoutMs())

  try {
    return await fetch(resolveOnPointIntakeUrl() as string, {
      method: 'POST',
      headers: getOnPointHeaders(),
      body: payload,
      signal: controller.signal,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new OnPointProvisioningError({
        message: 'OnPoint intake request timed out.',
        statusCode: 504,
        code: 'ONPOINT_TIMEOUT',
        userMessage: 'We could not create your preview account right now. Please try again or contact LeanFM.',
        retryable: true,
      })
    }

    throw new OnPointProvisioningError({
      message: error instanceof Error ? error.message : 'OnPoint intake request failed.',
      statusCode: 502,
      code: 'ONPOINT_REQUEST_FAILED',
      userMessage: 'We could not create your preview account right now. Please try again or contact LeanFM.',
      retryable: true,
    })
  } finally {
    clearTimeout(timeout)
  }
}

function buildOnPointPayload(input: { lead: ProvisionableSampleLead; datasetFile: File }) {
  const sampleIntakeAsset = input.lead.sampleIntakeAsset
  if (!sampleIntakeAsset) {
    throw new OnPointProvisioningError({
      message: 'Sample intake asset is not attached to the lead.',
      statusCode: 500,
      code: 'MISSING_SAMPLE_ASSET',
      userMessage: 'We could not create your preview account right now. Please try again or contact LeanFM.',
      retryable: true,
    })
  }

  const payload = new FormData()
  payload.append('submissionId', sampleIntakeAsset.submissionId)
  payload.append('source', input.lead.source)
  payload.append('intent', input.lead.intent)
  payload.append('intentLevel', 'high')
  payload.append('name', input.lead.name)
  payload.append('email', input.lead.email)
  payload.append('company', input.lead.company)
  payload.append('buildingType', input.lead.buildingType || '')
  payload.append('portfolioSize', input.lead.portfolioSize || '')
  payload.append('approvalRequired', 'true')
  payload.append('activationRequired', 'true')
  payload.append('buildingName', getFallbackBuildingName(input.lead))
  appendOptionalField(payload, 'role', input.lead.role)
  appendOptionalField(payload, 'phone', input.lead.phone)
  appendOptionalField(payload, 'basPlatform', sampleIntakeAsset.basPlatform)
  appendOptionalField(payload, 'primaryConcern', sampleIntakeAsset.primaryConcern)
  appendOptionalField(payload, 'notes', input.lead.message)
  payload.append('dataset', input.datasetFile, input.datasetFile.name)

  return payload
}

export async function createDatasetFileFromSampleIntakeAsset(sampleIntakeAsset: SampleIntakeAsset) {
  if (!sampleIntakeAsset.localFilePath) {
    throw new OnPointProvisioningError({
      message: 'No local dataset copy is available for this sample intake.',
      statusCode: 409,
      code: 'MISSING_LOCAL_DATASET_COPY',
      userMessage: 'The original dataset file is no longer available for retry. Please ask the user to resubmit the sample.',
      retryable: false,
    })
  }

  try {
    const fileBuffer = await readFile(sampleIntakeAsset.localFilePath)
    return new File([fileBuffer], sampleIntakeAsset.datasetFileName, {
      type: sampleIntakeAsset.datasetMimeType,
    })
  } catch (error) {
    throw new OnPointProvisioningError({
      message: error instanceof Error ? error.message : 'Unable to read stored dataset file.',
      statusCode: 409,
      code: 'MISSING_LOCAL_DATASET_COPY',
      userMessage: 'The original dataset file is no longer available for retry. Please ask the user to resubmit the sample.',
      retryable: false,
    })
  }
}

export async function provisionSampleIntakeInOnPoint(input: {
  lead: ProvisionableSampleLead
  datasetFile: File
}): Promise<OnPointProvisioningResult> {
  const intakeUrl = resolveOnPointIntakeUrl()
  if (!intakeUrl) {
    throw new OnPointProvisioningError({
      message: 'ONPOINT_SAMPLE_INTAKE_URL is not configured.',
      statusCode: 500,
      code: 'ONPOINT_NOT_CONFIGURED',
      userMessage: 'We could not create your preview account right now. Please try again or contact LeanFM.',
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
        userMessage: 'A pending preview already exists for this email and organization. Please check your email or contact LeanFM for help.',
        retryable: false,
        responseBody,
      })
    }

    if (response.status === 400 || response.status === 422) {
      throw new OnPointProvisioningError({
        message: `OnPoint intake validation failed: ${errorMessage}`,
        statusCode: 400,
        code: errorCode || 'ONPOINT_VALIDATION_FAILED',
        userMessage: errorMessage || 'We could not validate your onboarding request. Please review your details and try again.',
        retryable: false,
        responseBody,
      })
    }

    throw new OnPointProvisioningError({
      message: `OnPoint intake failed with ${response.status}: ${errorMessage}`,
      statusCode: response.status >= 500 ? 502 : response.status,
      code: errorCode || 'ONPOINT_INTAKE_FAILED',
      userMessage: 'We could not create your preview account right now. Please try again or contact LeanFM.',
      retryable: true,
      responseBody,
    })
  }

  return {
    userId: getRequiredString(responseBody, ['userId', 'user.id', 'accountUserId'], 'userId'),
    buildingId: getRequiredString(responseBody, ['buildingId', 'building.id'], 'buildingId'),
    uploadId: getRequiredString(responseBody, ['uploadId', 'datasetId', 'upload.id'], 'uploadId'),
    accountStatus: getRequiredString(responseBody, ['accountStatus', 'user.status'], 'accountStatus'),
    activationStatus: getRequiredString(responseBody, ['activationStatus', 'user.activationStatus'], 'activationStatus'),
    reviewStatus: getRequiredString(responseBody, ['reviewStatus', 'dataset.reviewStatus', 'status'], 'reviewStatus'),
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
