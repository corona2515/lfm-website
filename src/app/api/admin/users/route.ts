import { NextRequest, NextResponse } from 'next/server'
import { createAuditLog } from '@/lib/audit'
import { hashPassword } from '@/lib/auth'
import { requireApiAdminRole } from '@/lib/admin-api'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await requireApiAdminRole('ADMIN')
  if (session instanceof NextResponse) {
    return session
  }

  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const session = await requireApiAdminRole('ADMIN')
  if (session instanceof NextResponse) {
    return session
  }

  const body = await request.json()
  const email = String(body.email || '').trim().toLowerCase()
  const displayName = String(body.displayName || '').trim()
  const password = String(body.password || '')
  const role = body.role === 'ADMIN' ? 'ADMIN' : 'OPERATOR'

  if (!email || !displayName || !password) {
    return NextResponse.json({ error: 'Display name, email, and password are required' }, { status: 400 })
  }

  const user = await prisma.adminUser.create({
    data: {
      email,
      displayName,
      passwordHash: await hashPassword(password),
      role,
    },
  })

  await createAuditLog({
    actorId: session.user.id,
    action: 'USER_CREATED',
    entityType: 'admin_user',
    entityId: user.id,
    description: 'Admin user created',
    metadata: { role: user.role, email: user.email },
  })

  return NextResponse.json(user, { status: 201 })
}
