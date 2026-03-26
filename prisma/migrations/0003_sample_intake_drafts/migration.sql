-- CreateEnum
CREATE TYPE "SampleIntakeDraftStatus" AS ENUM ('ACTIVE', 'ABANDONED', 'COMPLETED');

-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'SAMPLE_INTAKE_DRAFT_CREATED';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'SAMPLE_INTAKE_DRAFT_ABANDONED';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'SAMPLE_INTAKE_DRAFT_CLOSE_SYNCED';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'SAMPLE_INTAKE_DRAFT_COMPLETED';

-- CreateTable
CREATE TABLE "SampleIntakeDraft" (
    "id" TEXT NOT NULL,
    "status" "SampleIntakeDraftStatus" NOT NULL DEFAULT 'ACTIVE',
    "progressStep" INTEGER NOT NULL DEFAULT 1,
    "submissionId" TEXT NOT NULL,
    "draftTokenHash" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "company" TEXT,
    "role" TEXT,
    "phone" TEXT,
    "buildingName" TEXT,
    "addressLine1" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "buildingType" TEXT,
    "portfolioSize" TEXT,
    "basPlatform" TEXT,
    "primaryConcern" TEXT,
    "notes" TEXT,
    "datasetFileName" TEXT,
    "datasetFileSizeBytes" INTEGER,
    "datasetMimeType" TEXT,
    "storageProvider" TEXT,
    "storageBucket" TEXT,
    "storageKey" TEXT,
    "storageRegion" TEXT,
    "storageEndpoint" TEXT,
    "localFilePath" TEXT,
    "closeLeadId" TEXT,
    "closeContactId" TEXT,
    "closeSyncStatus" "LeadSyncStatus",
    "closeSyncError" TEXT,
    "closeSyncedAt" TIMESTAMP(3),
    "leadId" TEXT,
    "lastSavedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "abandonedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SampleIntakeDraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SampleIntakeDraft_submissionId_key" ON "SampleIntakeDraft"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "SampleIntakeDraft_draftTokenHash_key" ON "SampleIntakeDraft"("draftTokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "SampleIntakeDraft_leadId_key" ON "SampleIntakeDraft"("leadId");

-- CreateIndex
CREATE INDEX "SampleIntakeDraft_status_lastSavedAt_idx" ON "SampleIntakeDraft"("status", "lastSavedAt");

-- CreateIndex
CREATE INDEX "SampleIntakeDraft_email_idx" ON "SampleIntakeDraft"("email");

-- CreateIndex
CREATE INDEX "SampleIntakeDraft_closeSyncStatus_idx" ON "SampleIntakeDraft"("closeSyncStatus");

-- CreateIndex
CREATE INDEX "SampleIntakeDraft_completedAt_idx" ON "SampleIntakeDraft"("completedAt");

-- AddForeignKey
ALTER TABLE "SampleIntakeDraft" ADD CONSTRAINT "SampleIntakeDraft_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
