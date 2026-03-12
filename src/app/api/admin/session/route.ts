import { NextRequest, NextResponse } from 'next/server'
import { createAuditLog } from '@/lib/audit'
import { clearAdminSession, createAdminSession, getCurrentAdminUser, verifyPassword } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

async function destroySession() {
  const session = await getCurrentAdminUser()

  if (session) {
    await createAuditLog({
      actorId: session.user.id,
      action: 'LOGOUT',
      entityType: 'admin_user',
      entityId: session.user.id,
      description: 'Admin user signed out',
    })
    await clearAdminSession(session.sessionId)
  } else {
    await clearAdminSession()
  }
}

export async function POST(request: NextRequest) {
  let email = ''
  let password = ''

  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = await request.json()
    email = String(body.email || '').trim().toLowerCase()
    password = String(body.password || '')
  } else {
    const formData = await request.formData()
    if (formData.get('_method') === 'DELETE') {
      await destroySession()
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    email = String(formData.get('email') || '').trim().toLowerCase()
    password = String(formData.get('password') || '')
  }

  const user = await prisma.adminUser.findUnique({ where: { email } })
  if (!user || !user.isActive) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const isValid = await verifyPassword(password, user.passwordHash)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  await createAdminSession(user.id, user.role)
  await prisma.adminUser.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  })
  await createAuditLog({
    actorId: user.id,
    action: 'LOGIN',
    entityType: 'admin_user',
    entityId: user.id,
    description: 'Admin user signed in',
  })

  return NextResponse.json({ success: true })
}

export async function DELETE() {
  await destroySession()
  return NextResponse.json({ success: true })
}
