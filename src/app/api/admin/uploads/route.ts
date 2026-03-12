import { NextResponse } from 'next/server'
import { getUploadsQueue } from '@/lib/admin-data'
import { requireApiAdminUser } from '@/lib/admin-api'

export async function GET() {
  const session = await requireApiAdminUser()
  if (session instanceof NextResponse) {
    return session
  }

  const uploads = await getUploadsQueue()
  return NextResponse.json(uploads)
}
