import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { AdminRole } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const ADMIN_SESSION_COOKIE = 'leanfm_admin_session'

type SessionTokenPayload = {
  sid: string
  uid: string
  role: AdminRole
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (secret) {
    return new TextEncoder().encode(secret)
  }

  if (process.env.NODE_ENV !== 'production') {
    return new TextEncoder().encode('leanfm-admin-dev-secret')
  }

  throw new Error('ADMIN_SESSION_SECRET is required in production')
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash)
}

export async function signAdminSessionToken(payload: SessionTokenPayload, expiresAt: Date) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.uid)
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(getSessionSecret())
}

export async function verifyAdminSessionToken(token: string) {
  const { payload } = await jwtVerify(token, getSessionSecret())

  if (
    typeof payload.sid !== 'string' ||
    typeof payload.uid !== 'string' ||
    (payload.role !== 'ADMIN' && payload.role !== 'OPERATOR')
  ) {
    throw new Error('Invalid admin session token')
  }

  return {
    sid: payload.sid,
    uid: payload.uid,
    role: payload.role,
  } satisfies SessionTokenPayload
}

export async function createAdminSession(adminUserId: string, role: AdminRole) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
  const session = await prisma.session.create({
    data: {
      id: randomUUID(),
      adminUserId,
      expiresAt,
    },
  })

  const token = await signAdminSessionToken({ sid: session.id, uid: adminUserId, role }, expiresAt)

  cookies().set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  })

  return session
}

export async function clearAdminSession(sessionId?: string) {
  if (sessionId) {
    await prisma.session.updateMany({
      where: {
        id: sessionId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    })
  }

  cookies().set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  })
}

export async function getCurrentAdminUser() {
  if (!process.env.DATABASE_URL) {
    return null
  }

  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value

  if (!token) {
    return null
  }

  try {
    const payload = await verifyAdminSessionToken(token)
    const session = await prisma.session.findFirst({
      where: {
        id: payload.sid,
        adminUserId: payload.uid,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: {
        adminUser: true,
      },
    })

    if (!session?.adminUser.isActive) {
      return null
    }

    await prisma.session.update({
      where: { id: session.id },
      data: { lastSeenAt: new Date() },
    })

    return {
      sessionId: session.id,
      user: session.adminUser,
    }
  } catch {
    return null
  }
}

export async function requireAdminUser() {
  const session = await getCurrentAdminUser()

  if (!session) {
    redirect('/admin/login')
  }

  return session
}

export async function requireAdminRole(role: AdminRole) {
  const session = await requireAdminUser()

  if (session.user.role !== role) {
    redirect('/admin')
  }

  return session
}

export function isClosedLeadStatus(status: string) {
  return status === 'CLOSED_WON' || status === 'CLOSED_LOST' || status === 'DISQUALIFIED'
}
