import { randomUUID } from 'crypto'
import { access, mkdir, rm, stat, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import { dirname, join } from 'path'
import { DeleteObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export type SampleIntakeStorageProvider = 's3' | 'local'

export interface SampleIntakeUploadSession {
  submissionId: string
  storageProvider: SampleIntakeStorageProvider
  storageBucket: string | null
  storageKey: string
  storageRegion: string | null
  storageEndpoint: string | null
  uploadMethod: 'PUT'
  uploadUrl: string
  uploadHeaders: Record<string, string>
}

export interface SampleIntakeStoredObject {
  storageProvider: SampleIntakeStorageProvider
  storageBucket: string | null
  storageKey: string
  storageRegion: string | null
  storageEndpoint: string | null
  localFilePath: string | null
}

const DEFAULT_SIGNED_URL_TTL_SECONDS = 60 * 15
const LOCAL_UPLOAD_ROOT = join(tmpdir(), 'leanfm-sample-intake')

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
}

function getSampleUploadBucket() {
  return process.env.SAMPLE_UPLOAD_STORAGE_BUCKET?.trim() || null
}

function getSampleUploadRegion() {
  return process.env.SAMPLE_UPLOAD_STORAGE_REGION?.trim() || process.env.AWS_REGION?.trim() || 'us-east-1'
}

function getSampleUploadEndpoint() {
  return process.env.SAMPLE_UPLOAD_STORAGE_ENDPOINT?.trim() || null
}

function getSampleUploadAccessKeyId() {
  return process.env.SAMPLE_UPLOAD_STORAGE_ACCESS_KEY_ID?.trim() || process.env.AWS_ACCESS_KEY_ID?.trim() || null
}

function getSampleUploadSecretAccessKey() {
  return process.env.SAMPLE_UPLOAD_STORAGE_SECRET_ACCESS_KEY?.trim() || process.env.AWS_SECRET_ACCESS_KEY?.trim() || null
}

function shouldForcePathStyle() {
  const value = process.env.SAMPLE_UPLOAD_STORAGE_FORCE_PATH_STYLE?.trim()
  return value === 'true' || value === '1'
}

function resolveStorageProvider(): SampleIntakeStorageProvider {
  const bucket = getSampleUploadBucket()
  const accessKeyId = getSampleUploadAccessKeyId()
  const secretAccessKey = getSampleUploadSecretAccessKey()

  if (bucket && accessKeyId && secretAccessKey) {
    return 's3'
  }

  return 'local'
}

function createObjectKey(submissionId: string, fileName: string) {
  return `sample-intake/${submissionId}/${sanitizeFileName(fileName)}`
}

function getLocalUploadPath(storageKey: string) {
  const safeKey = storageKey.replace(/\.\./g, '_')
  return join(LOCAL_UPLOAD_ROOT, safeKey)
}

function getS3Client() {
  const bucket = getSampleUploadBucket()
  const accessKeyId = getSampleUploadAccessKeyId()
  const secretAccessKey = getSampleUploadSecretAccessKey()

  if (!bucket || !accessKeyId || !secretAccessKey) {
    throw new Error('Sample upload storage is not configured for S3 uploads.')
  }

  return new S3Client({
    region: getSampleUploadRegion(),
    endpoint: getSampleUploadEndpoint() || undefined,
    forcePathStyle: shouldForcePathStyle(),
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}

export async function createSampleIntakeUploadSession(input: {
  fileName: string
  contentType: string
  submissionId?: string
}): Promise<SampleIntakeUploadSession> {
  const submissionId = input.submissionId || randomUUID()
  const storageKey = createObjectKey(submissionId, input.fileName)
  const uploadHeaders = {
    'Content-Type': input.contentType || 'text/csv',
  }

  if (resolveStorageProvider() === 's3') {
    const client = getS3Client()
    const storageBucket = getSampleUploadBucket() as string
    const command = new PutObjectCommand({
      Bucket: storageBucket,
      Key: storageKey,
      ContentType: uploadHeaders['Content-Type'],
    })

    const uploadUrl = await getSignedUrl(client, command, {
      expiresIn: DEFAULT_SIGNED_URL_TTL_SECONDS,
    })

    return {
      submissionId,
      storageProvider: 's3',
      storageBucket,
      storageKey,
      storageRegion: getSampleUploadRegion(),
      storageEndpoint: getSampleUploadEndpoint(),
      uploadMethod: 'PUT',
      uploadUrl,
      uploadHeaders,
    }
  }

  return {
    submissionId,
    storageProvider: 'local',
    storageBucket: null,
    storageKey,
    storageRegion: null,
    storageEndpoint: null,
    uploadMethod: 'PUT',
    uploadUrl: `/api/sample-intake/upload/${submissionId}?storageKey=${encodeURIComponent(storageKey)}`,
    uploadHeaders,
  }
}

export async function persistLocalSampleIntakeUpload(storageKey: string, payload: ArrayBuffer) {
  const localFilePath = getLocalUploadPath(storageKey)
  await mkdir(dirname(localFilePath), { recursive: true })
  await writeFile(localFilePath, Buffer.from(payload))

  return localFilePath
}

export async function assertSampleIntakeObjectExists(input: SampleIntakeStoredObject) {
  if (input.storageProvider === 's3') {
    if (!input.storageBucket) {
      throw new Error('Missing storage bucket for sample upload.')
    }

    const client = getS3Client()
    await client.send(
      new HeadObjectCommand({
        Bucket: input.storageBucket,
        Key: input.storageKey,
      })
    )
    return
  }

  const localFilePath = input.localFilePath || getLocalUploadPath(input.storageKey)
  await access(localFilePath)
}

export async function getLocalSampleIntakeObjectSize(storageKey: string) {
  const fileStats = await stat(getLocalUploadPath(storageKey))
  return fileStats.size
}

export async function deleteSampleIntakeStoredObject(input: SampleIntakeStoredObject) {
  if (input.storageProvider === 's3') {
    if (!input.storageBucket) {
      return
    }

    const client = getS3Client()
    await client.send(
      new DeleteObjectCommand({
        Bucket: input.storageBucket,
        Key: input.storageKey,
      })
    )
    return
  }

  const localFilePath = input.localFilePath || getLocalUploadPath(input.storageKey)
  await rm(localFilePath, { force: true })
}

export function resolveStoredSampleIntakeObject(input: {
  storageProvider?: string | null
  storageBucket?: string | null
  storageKey?: string | null
  storageRegion?: string | null
  storageEndpoint?: string | null
  localFilePath?: string | null
}): SampleIntakeStoredObject {
  const provider = input.storageProvider === 's3' ? 's3' : 'local'
  const storageKey = input.storageKey?.trim()

  if (!storageKey) {
    throw new Error('Sample intake storage key is missing.')
  }

  return {
    storageProvider: provider,
    storageBucket: provider === 's3' ? input.storageBucket || getSampleUploadBucket() : null,
    storageKey,
    storageRegion: provider === 's3' ? input.storageRegion || getSampleUploadRegion() : null,
    storageEndpoint: provider === 's3' ? input.storageEndpoint || getSampleUploadEndpoint() : null,
    localFilePath: provider === 'local' ? input.localFilePath || getLocalUploadPath(storageKey) : null,
  }
}
