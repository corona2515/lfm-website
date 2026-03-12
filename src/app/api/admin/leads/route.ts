import { NextRequest, NextResponse } from 'next/server'
import { getLeadList } from '@/lib/admin-data'
import { requireApiAdminUser } from '@/lib/admin-api'

export async function GET(request: NextRequest) {
  const session = await requireApiAdminUser()
  if (session instanceof NextResponse) {
    return session
  }

  const searchParams = request.nextUrl.searchParams
  const leads = await getLeadList({
    q: searchParams.get('q') || '',
    type: searchParams.get('type') || '',
    status: searchParams.get('status') || '',
    assignee: searchParams.get('assignee') || '',
    sync: searchParams.get('sync') || '',
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
  })

  return NextResponse.json(leads)
}
