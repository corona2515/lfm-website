export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { LeadDetailClient } from '@/components/admin/LeadDetailClient'
import { Card } from '@/components/ui'
import { getAdminUsers, getLeadDetail } from '@/lib/admin-data'
import { formatLeadStatus, formatLeadType, SYNC_STATUS_LABELS } from '@/lib/lead-types'

function getLatestProviderSync(
  syncEvents: Array<{
    provider: string
    status: keyof typeof SYNC_STATUS_LABELS
    payload: unknown
    createdAt: Date
    errorMessage: string | null
  }>,
  provider: 'onpoint' | 'close'
) {
  return syncEvents.find((event) => event.provider === provider)
}

function formatPayload(payload: unknown) {
  if (!payload) {
    return null
  }

  try {
    return JSON.stringify(payload, null, 2)
  } catch {
    return String(payload)
  }
}

export default async function AdminLeadDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [lead, users] = await Promise.all([
    getLeadDetail(params.id),
    getAdminUsers(),
  ])

  if (!lead) {
    notFound()
  }

  const latestOnPointSync = getLatestProviderSync(lead.syncEvents, 'onpoint')
  const latestCloseSync = getLatestProviderSync(lead.syncEvents, 'close')

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">Lead Detail</p>
        <h1 className="heading-3 mt-2 text-white">{lead.company}</h1>
        <p className="mt-2 text-body-sm text-slate-400">
          {lead.name} | {lead.email} | {formatLeadType(lead.leadType)} | {formatLeadStatus(lead.status)}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <h2 className="heading-4 text-white">Contact</h2>
          <div className="mt-4 space-y-3 text-body-sm text-slate-300">
            <p><span className="text-slate-500">Name:</span> {lead.name}</p>
            <p><span className="text-slate-500">Email:</span> {lead.email}</p>
            <p><span className="text-slate-500">Company:</span> {lead.company}</p>
            <p><span className="text-slate-500">Role:</span> {lead.role || 'N/A'}</p>
            <p><span className="text-slate-500">Phone:</span> {lead.phone || 'N/A'}</p>
            <p><span className="text-slate-500">Submitted:</span> {new Date(lead.submittedAt).toLocaleString()}</p>
          </div>
        </Card>

        <Card>
          <h2 className="heading-4 text-white">Building Context</h2>
          <div className="mt-4 space-y-3 text-body-sm text-slate-300">
            <p><span className="text-slate-500">Building type:</span> {lead.buildingType || 'N/A'}</p>
            <p><span className="text-slate-500">Portfolio size:</span> {lead.portfolioSize || 'N/A'}</p>
            <p><span className="text-slate-500">Dataset:</span> {lead.sampleIntakeAsset?.datasetFileName || 'N/A'}</p>
            <p><span className="text-slate-500">BAS platform:</span> {lead.sampleIntakeAsset?.basPlatform || 'N/A'}</p>
            <p><span className="text-slate-500">Primary concern:</span> {lead.sampleIntakeAsset?.primaryConcern || 'N/A'}</p>
          </div>
        </Card>

        <Card>
          <h2 className="heading-4 text-white">Integrations</h2>
          <div className="mt-4 space-y-4 text-body-sm text-slate-300">
            <div>
              <p className="text-slate-500">OnPoint</p>
              <p className="mt-1 text-white">{latestOnPointSync ? SYNC_STATUS_LABELS[latestOnPointSync.status] : 'Not attempted'}</p>
              {latestOnPointSync?.errorMessage ? (
                <p className="mt-1 text-body-xs text-red-300">{latestOnPointSync.errorMessage}</p>
              ) : null}
              {formatPayload(latestOnPointSync?.payload) ? (
                <pre className="mt-2 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-body-xs text-slate-400">
                  {formatPayload(latestOnPointSync?.payload)}
                </pre>
              ) : null}
            </div>
            <div>
              <p className="text-slate-500">Close</p>
              <p className="mt-1 text-white">{latestCloseSync ? SYNC_STATUS_LABELS[latestCloseSync.status] : 'Not attempted'}</p>
              {latestCloseSync?.errorMessage ? (
                <p className="mt-1 text-body-xs text-red-300">{latestCloseSync.errorMessage}</p>
              ) : null}
              {lead.closeLeadId || lead.closeContactId ? (
                <p className="mt-1 text-body-xs text-slate-400">
                  Lead ID: {lead.closeLeadId || 'N/A'} | Contact ID: {lead.closeContactId || 'N/A'}
                </p>
              ) : null}
            </div>
          </div>
        </Card>
      </div>

      <LeadDetailClient lead={lead} users={users} />

      <Card>
        <h2 className="heading-4 text-white">Sync History</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-body-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="px-3 py-2">Provider</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Created</th>
                <th className="px-3 py-2">Error</th>
              </tr>
            </thead>
            <tbody>
              {lead.syncEvents.map((event) => (
                <tr key={event.id} className="border-t border-slate-800">
                  <td className="px-3 py-3 text-slate-300">{event.provider}</td>
                  <td className="px-3 py-3 text-slate-300">{SYNC_STATUS_LABELS[event.status]}</td>
                  <td className="px-3 py-3 text-slate-300">{new Date(event.createdAt).toLocaleString()}</td>
                  <td className="px-3 py-3 text-slate-300">{event.errorMessage || '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
