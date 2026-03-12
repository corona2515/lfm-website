import { NextResponse } from 'next/server'
import { getDashboardData } from '@/lib/admin-data'
import { requireApiAdminUser } from '@/lib/admin-api'

export async function GET() {
  const session = await requireApiAdminUser()
  if (session instanceof NextResponse) {
    return session
  }

  const dashboard = await getDashboardData()
  return NextResponse.json(dashboard)
}
