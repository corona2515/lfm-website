import { NextRequest, NextResponse } from 'next/server'
import { createAuditLog } from '@/lib/audit'
import { parseLeadStatus, parseOptionalDate, requireApiAdminUser } from '@/lib/admin-api'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireApiAdminUser()
  if (session instanceof NextResponse) {
    return session
  }

  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      currentAssignee: true,
      sampleIntakeAsset: true,
      notes: { include: { author: true }, orderBy: { createdAt: 'desc' } },
      syncEvents: { orderBy: { createdAt: 'desc' } },
      assignmentHistory: { include: { assignedTo: true, assignedBy: true }, orderBy: { createdAt: 'desc' } },
    },
  })

  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  return NextResponse.json(lead)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireApiAdminUser()
  if (session instanceof NextResponse) {
    return session
  }

  const body = await request.json()
  const status = body.status ? parseLeadStatus(body.status) : null
  const currentAssigneeId = body.currentAssigneeId === null ? null : typeof body.currentAssigneeId === 'string' ? body.currentAssigneeId : undefined
  const nextFollowUpAt = body.nextFollowUpAt === null ? null : parseOptionalDate(body.nextFollowUpAt)
  const qualificationNotes = body.qualificationNotes === null ? null : typeof body.qualificationNotes === 'string' ? body.qualificationNotes : undefined
  const lastContactedAt = body.lastContactedAt === null ? null : parseOptionalDate(body.lastContactedAt)

  const lead = await prisma.lead.findUnique({ where: { id: params.id } })
  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  const updatedLead = await prisma.lead.update({
    where: { id: params.id },
    data: {
      ...(status ? { status } : {}),
      ...(currentAssigneeId !== undefined ? { currentAssigneeId } : {}),
      ...(nextFollowUpAt !== undefined ? { nextFollowUpAt } : {}),
      ...(qualificationNotes !== undefined ? { qualificationNotes } : {}),
      ...(lastContactedAt !== undefined ? { lastContactedAt } : {}),
    },
  })

  if (status && status !== lead.status) {
    await createAuditLog({
      actorId: session.user.id,
      leadId: lead.id,
      action: 'LEAD_STATUS_UPDATED',
      entityType: 'lead',
      entityId: lead.id,
      description: `Lead status changed from ${lead.status} to ${status}`,
    })
  }

  if (currentAssigneeId !== undefined && currentAssigneeId !== lead.currentAssigneeId && currentAssigneeId) {
    await prisma.leadAssignment.create({
      data: {
        leadId: lead.id,
        assignedToId: currentAssigneeId,
        assignedById: session.user.id,
      },
    })
    await createAuditLog({
      actorId: session.user.id,
      leadId: lead.id,
      action: 'LEAD_ASSIGNED',
      entityType: 'lead',
      entityId: lead.id,
      description: 'Lead reassigned',
      metadata: { assignedToId: currentAssigneeId },
    })
  }

  return NextResponse.json(updatedLead)
}
