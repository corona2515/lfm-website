export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Card } from '@/components/ui'
import { getSampleIntakeDraftList } from '@/lib/admin-data'
import { formatSampleIntakeDraftStatus, SYNC_STATUS_LABELS } from '@/lib/lead-types'

const DRAFT_STATUS_OPTIONS = [
  { value: 'ALL', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'ABANDONED', label: 'Abandoned' },
  { value: 'COMPLETED', label: 'Completed' },
]

const CLOSE_SYNC_OPTIONS = [
  { value: '', label: 'Any' },
  { value: 'healthy', label: 'Healthy' },
  { value: 'failed', label: 'Needs Retry' },
  { value: 'missing', label: 'Not Synced' },
]

export default async function AdminStartDraftsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const filters = {
    q: typeof searchParams.q === 'string' ? searchParams.q : '',
    status: typeof searchParams.status === 'string' ? searchParams.status : 'ALL',
    closeSync: typeof searchParams.closeSync === 'string' ? searchParams.closeSync : '',
  }

  const drafts = await getSampleIntakeDraftList(filters)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">Start Drafts</p>
        <h1 className="heading-3 mt-2 text-white">Incomplete sample-intake starts</h1>
        <p className="mt-2 text-body-sm text-slate-400">
          Track active progress, abandoned starts, Close follow-up state, and any completed lead linkage.
        </p>
      </div>

      <Card>
        <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <label className="label">Search</label>
            <input name="q" defaultValue={filters.q} className="input" placeholder="Name, company, email, phone, building" />
          </div>
          <div>
            <label className="label">Draft status</label>
            <select name="status" defaultValue={filters.status} className="select">
              {DRAFT_STATUS_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Close sync</label>
            <select name="closeSync" defaultValue={filters.closeSync} className="select">
              {CLOSE_SYNC_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 xl:col-span-4 flex items-end">
            <button type="submit" className="btn-primary w-full md:w-auto">Apply Filters</button>
          </div>
        </form>
      </Card>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left text-body-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Progress</th>
              <th className="px-3 py-2">Dataset</th>
              <th className="px-3 py-2">Close</th>
              <th className="px-3 py-2">Last Saved</th>
              <th className="px-3 py-2">Lead</th>
            </tr>
          </thead>
          <tbody>
            {drafts.map((draft) => (
              <tr key={draft.id} className="border-t border-slate-800">
                <td className="px-3 py-3">
                  <p className="text-white">{draft.company || 'Unknown organization'}</p>
                  <p className="mt-1 text-body-xs text-slate-400">
                    {[draft.name || 'Unknown contact', draft.email || 'No email'].join(' · ')}
                  </p>
                  {draft.buildingName ? (
                    <p className="mt-1 text-body-xs text-slate-500">{draft.buildingName}</p>
                  ) : null}
                </td>
                <td className="px-3 py-3 text-slate-300">
                  <p>{formatSampleIntakeDraftStatus(draft.status)}</p>
                  <p className="mt-1 text-body-xs text-slate-500">Step {draft.progressStep} of 4</p>
                </td>
                <td className="px-3 py-3 text-slate-300">
                  {draft.datasetFileName ? (
                    <div>
                      <p>{draft.datasetFileName}</p>
                      <p className="mt-1 text-body-xs text-slate-500">{draft.datasetFileSizeBytes || 0} bytes</p>
                    </div>
                  ) : (
                    <span className="text-slate-500">No upload</span>
                  )}
                </td>
                <td className="px-3 py-3 text-slate-300">
                  {draft.closeSyncStatus ? SYNC_STATUS_LABELS[draft.closeSyncStatus] : 'Not synced'}
                  {draft.closeSyncError ? (
                    <p className="mt-1 text-body-xs text-red-300">{draft.closeSyncError}</p>
                  ) : null}
                </td>
                <td className="px-3 py-3 text-slate-300">
                  {new Date(draft.lastSavedAt).toLocaleString()}
                </td>
                <td className="px-3 py-3 text-slate-300">
                  {draft.lead ? (
                    <Link href={`/admin/leads/${draft.lead.id}`} className="text-cyan-300 hover:text-cyan-200">
                      {draft.lead.company}
                    </Link>
                  ) : (
                    <span className="text-slate-500">Not submitted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
