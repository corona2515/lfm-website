import { NextRequest, NextResponse } from 'next/server'
import {
  SAMPLE_INTAKE_DRAFT_HEADER,
  createOrUpdateSampleIntakeDraft,
  findSampleIntakeDraftByToken,
  serializeSampleIntakeDraft,
  type SampleIntakeDraftInput,
} from '@/lib/sample-intake-drafts'

export const runtime = 'nodejs'

interface DraftRequestBody {
  draftToken?: unknown
  progressStep?: unknown
  name?: unknown
  email?: unknown
  company?: unknown
  role?: unknown
  phone?: unknown
  buildingName?: unknown
  addressLine1?: unknown
  city?: unknown
  state?: unknown
  postalCode?: unknown
  buildingType?: unknown
  portfolioSize?: unknown
  basPlatform?: unknown
  primaryConcern?: unknown
  notes?: unknown
  clearDataset?: unknown
  dataset?: {
    fileName?: unknown
    fileSizeBytes?: unknown
    mimeType?: unknown
    storageProvider?: unknown
    storageBucket?: unknown
    storageKey?: unknown
    storageRegion?: unknown
    storageEndpoint?: unknown
    localFilePath?: unknown
  } | null
}

function normalizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeNumber(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

function normalizeDraftInput(body: DraftRequestBody | null): {
  draftToken: string
  draft: SampleIntakeDraftInput
} {
  return {
    draftToken: normalizeString(body?.draftToken),
    draft: {
      progressStep: Number(body?.progressStep || 1),
      name: normalizeString(body?.name),
      email: normalizeString(body?.email),
      company: normalizeString(body?.company),
      role: normalizeString(body?.role),
      phone: normalizeString(body?.phone),
      buildingName: normalizeString(body?.buildingName),
      addressLine1: normalizeString(body?.addressLine1),
      city: normalizeString(body?.city),
      state: normalizeString(body?.state),
      postalCode: normalizeString(body?.postalCode),
      buildingType: normalizeString(body?.buildingType),
      portfolioSize: normalizeString(body?.portfolioSize),
      basPlatform: normalizeString(body?.basPlatform),
      primaryConcern: normalizeString(body?.primaryConcern),
      notes: normalizeString(body?.notes),
      clearDataset: Boolean(body?.clearDataset),
      dataset: body?.dataset ? {
        fileName: normalizeString(body.dataset.fileName),
        fileSizeBytes: normalizeNumber(body.dataset.fileSizeBytes),
        mimeType: normalizeString(body.dataset.mimeType),
        storageProvider: normalizeString(body.dataset.storageProvider),
        storageBucket: normalizeString(body.dataset.storageBucket),
        storageKey: normalizeString(body.dataset.storageKey),
        storageRegion: normalizeString(body.dataset.storageRegion),
        storageEndpoint: normalizeString(body.dataset.storageEndpoint),
        localFilePath: normalizeString(body.dataset.localFilePath),
      } : null,
    },
  }
}

function getDraftTokenFromRequest(request: NextRequest) {
  return request.headers.get(SAMPLE_INTAKE_DRAFT_HEADER)?.trim() || request.nextUrl.searchParams.get('draftToken')?.trim() || ''
}

export async function GET(request: NextRequest) {
  const draftToken = getDraftTokenFromRequest(request)
  if (!draftToken) {
    return NextResponse.json({ error: 'Draft token is required.' }, { status: 400 })
  }

  const draft = await findSampleIntakeDraftByToken(draftToken)
  if (!draft) {
    return NextResponse.json({ error: 'Draft not found.' }, { status: 404 })
  }

  return NextResponse.json({
    draftToken,
    draft: serializeSampleIntakeDraft(draft),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as DraftRequestBody | null
    const input = normalizeDraftInput(body)
    const result = await createOrUpdateSampleIntakeDraft(input)

    return NextResponse.json({
      draftToken: result.draftToken,
      draft: serializeSampleIntakeDraft(result.draft),
      created: result.created,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to save sample intake draft.' },
      { status: 400 }
    )
  }
}
