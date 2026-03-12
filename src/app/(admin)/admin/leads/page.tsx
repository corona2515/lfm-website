export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Card } from '@/components/ui'
import { getAdminUsers, getLeadHealthLabel, getLeadList } from '@/lib/admin-data'
import { formatLeadStatus, formatLeadType, LEAD_STATUSES, LEAD_TYPES, SYNC_STATUS_LABELS } from '@/lib/lead-types'

function getLatestProviderSync(
  syncEvents: Array<{ provider: string; status: keyof typeof SYNC_STATUS_LABELS }>,
  provider: 'onpoint' | 'close'
) {
  return syncEvents.find((event) => event.provider === provider)
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const filters = {
    q: typeof searchParams.q === 'string' ? searchParams.q : '',
    type: typeof searchParams.type === 'string' ? searchParams.type : 'ALL',
    status: typeof searchParams.status === 'string' ? searchParams.status : 'ALL',
    assignee: typeof searchParams.assignee === 'string' ? searchParams.assignee : '',
    sync: typeof searchParams.sync === 'string' ? searchParams.sync : '',
    from: typeof searchParams.from === 'string' ? searchParams.from : '',
    to: typeof searchParams.to === 'string' ? searchParams.to : '',
  }
  const [leads, users] = await Promise.all([
    getLeadList(filters),
    getAdminUsers(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">Leads</p>
        <h1 className="heading-3 mt-2 text-white">Submission inbox</h1>
      </div>

      <Card>
        <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <div className="xl:col-span-2">
            <label className="label">Search</label>
            <input name="q" defaultValue={filters.q} className="input" placeholder="Name, company, email, phone" />
          </div>
          <div>
            <label className="label">Type</label>
            <select name="type" defaultValue={filters.type} className="select">
              <option value="ALL">All</option>
              {LEAD_TYPES.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select name="status" defaultValue={filters.status} className="select">
              <option value="ALL">All</option>
              {LEAD_STATUSES.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Assignee</label>
            <select name="assignee" defaultValue={filters.assignee} className="select">
              <option value="">Any</option>
              <option value="unassigned">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.displayName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Sync</label>
            <select name="sync" defaultValue={filters.sync} className="select">
              <option value="">Any</option>
              <option value="healthy">Healthy</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="label">From</label>
            <input type="date" name="from" defaultValue={filters.from} className="input" />
          </div>
          <div>
            <label className="label">To</label>
            <input type="date" name="to" defaultValue={filters.to} className="input" />
          </div>
          <div className="md:col-span-2 xl:col-span-2 flex items-end">
            <button type="submit" className="btn-primary w-full">Apply Filters</button>
          </div>
        </form>
      </Card>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left text-body-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="px-3 py-2">Lead</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Assignee</th>
              <th className="px-3 py-2">Integrations</th>
              <th className="px-3 py-2">Submitted</th>
              <th className="px-3 py-2">Open</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const health = getLeadHealthLabel(lead)
              const latestOnPointSync = getLatestProviderSync(lead.syncEvents, 'onpoint')
              const latestCloseSync = getLatestProviderSync(lead.syncEvents, 'close')
              return (
                <tr key={lead.id} className="border-t border-slate-800">
                  <td className="px-3 py-3">
                    <p className="text-white">{lead.company}</p>
                    <p className="mt-1 text-body-xs text-slate-400">{lead.name} · {lead.email}</p>
                  </td>
                  <td className="px-3 py-3 text-slate-300">{formatLeadType(lead.leadType)}</td>
                  <td className="px-3 py-3 text-slate-300">{formatLeadStatus(lead.status)}</td>
                  <td className="px-3 py-3 text-slate-300">{lead.currentAssignee?.displayName || 'Unassigned'}</td>
                  <td className="px-3 py-3">
                    <div className="space-y-1">
                      <p className="text-slate-200">{health}</p>
                      <p className="text-body-xs text-slate-500">
                        OnPoint: {latestOnPointSync ? SYNC_STATUS_LABELS[latestOnPointSync.status] : 'Not attempted'}
                      </p>
                      <p className="text-body-xs text-slate-500">
                        Close: {latestCloseSync ? SYNC_STATUS_LABELS[latestCloseSync.status] : 'Not attempted'}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-300">
                    {new Date(lead.submittedAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="text-cyan-300 hover:text-cyan-200">
                      View
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
