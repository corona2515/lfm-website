import type { AuditAction, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

interface AuditInput {
  actorId?: string | null
  leadId?: string | null
  action: AuditAction
  entityType: string
  entityId: string
  description: string
  metadata?: Record<string, unknown>
}

export async function createAuditLog(input: AuditInput) {
  await prisma.auditLog.create({
    data: {
      actorId: input.actorId || null,
      leadId: input.leadId || null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      description: input.description,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
    },
  })
}
