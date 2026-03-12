import { NextRequest, NextResponse } from 'next/server'
import { createAuditLog } from '@/lib/audit'
import { hashPassword } from '@/lib/auth'
import { requireApiAdminRole } from '@/lib/admin-api'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireApiAdminRole('ADMIN')
  if (session instanceof NextResponse) {
    return session
  }

  const body = await request.json()
  const data: {
    role?: 'ADMIN' | 'OPERATOR'
    isActive?: boolean
    passwordHash?: string
  } = {}

  if (body.role === 'ADMIN' || body.role === 'OPERATOR') {
    data.role = body.role
  }

  if (typeof body.isActive === 'boolean') {
    data.isActive = body.isActive
  }

  if (typeof body.password === 'string' && body.password.trim()) {
    data.passwordHash = await hashPassword(body.password)
  }

  const user = await prisma.adminUser.update({
    where: { id: params.id },
    data,
  })

  await createAuditLog({
    actorId: session.user.id,
    action: 'USER_UPDATED',
    entityType: 'admin_user',
    entityId: user.id,
    description: 'Admin user updated',
    metadata: { role: user.role, isActive: user.isActive },
  })

  return NextResponse.json(user)
}
