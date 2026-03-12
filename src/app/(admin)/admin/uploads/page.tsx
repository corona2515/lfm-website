export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Card } from '@/components/ui'
import { getUploadsQueue } from '@/lib/admin-data'
import { SYNC_STATUS_LABELS } from '@/lib/lead-types'

function getLatestProviderSync(
  syncEvents: Array<{ provider: string; status: keyof typeof SYNC_STATUS_LABELS }>,
  provider: 'onpoint' | 'close'
) {
  return syncEvents.find((event) => event.provider === provider)
}

export default async function AdminUploadsPage() {
  const uploads = await getUploadsQueue()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">Uploads</p>
        <h1 className="heading-3 mt-2 text-white">Sample intake review queue</h1>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left text-body-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Dataset</th>
              <th className="px-3 py-2">BAS Platform</th>
              <th className="px-3 py-2">OnPoint</th>
              <th className="px-3 py-2">Close</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Assignee</th>
              <th className="px-3 py-2">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((lead) => {
              const latestOnPointSync = getLatestProviderSync(lead.syncEvents, 'onpoint')
              const latestCloseSync = getLatestProviderSync(lead.syncEvents, 'close')

              return (
                <tr key={lead.id} className="border-t border-slate-800">
                  <td className="px-3 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="text-white hover:text-cyan-200">
                      {lead.company}
                    </Link>
                    <p className="mt-1 text-body-xs text-slate-500">{lead.name}</p>
                  </td>
                  <td className="px-3 py-3 text-slate-300">{lead.sampleIntakeAsset?.datasetFileName || 'N/A'}</td>
                  <td className="px-3 py-3 text-slate-300">{lead.sampleIntakeAsset?.basPlatform || 'N/A'}</td>
                  <td className="px-3 py-3 text-slate-300">
                    {latestOnPointSync ? SYNC_STATUS_LABELS[latestOnPointSync.status] : 'Not attempted'}
                  </td>
                  <td className="px-3 py-3 text-slate-300">
                    {latestCloseSync ? SYNC_STATUS_LABELS[latestCloseSync.status] : 'Not attempted'}
                  </td>
                  <td className="px-3 py-3 text-slate-300">{lead.status}</td>
                  <td className="px-3 py-3 text-slate-300">{lead.currentAssignee?.displayName || 'Unassigned'}</td>
                  <td className="px-3 py-3 text-slate-300">{new Date(lead.submittedAt).toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
