import { NextRequest, NextResponse } from 'next/server'
import { createAuditLog } from '@/lib/audit'
import { requireApiAdminUser } from '@/lib/admin-api'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireApiAdminUser()
  if (session instanceof NextResponse) {
    return session
  }

  const body = await request.json()
  const noteBody = String(body.body || '').trim()

  if (!noteBody) {
    return NextResponse.json({ error: 'Note body is required' }, { status: 400 })
  }

  const note = await prisma.leadNote.create({
    data: {
      leadId: params.id,
      authorId: session.user.id,
      body: noteBody,
    },
  })

  await createAuditLog({
    actorId: session.user.id,
    leadId: params.id,
    action: 'LEAD_NOTE_CREATED',
    entityType: 'lead_note',
    entityId: note.id,
    description: 'Lead note added',
  })

  return NextResponse.json(note, { status: 201 })
}
