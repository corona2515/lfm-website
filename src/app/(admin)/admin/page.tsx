export const dynamic = 'force-dynamic'

import { AdminStatCard } from '@/components/admin/AdminStatCard'
import { Card } from '@/components/ui'
import { getDashboardData } from '@/lib/admin-data'
import { formatLeadStatus } from '@/lib/lead-types'

export default async function AdminDashboardPage() {
  const dashboard = await getDashboardData()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">Overview</p>
        <h1 className="heading-3 mt-2 text-white">Operations dashboard</h1>
        <p className="mt-2 text-body-sm text-slate-400">
          Monitor new leads, sample-intake handoffs to OnPoint, and Close sync health without leaving the site.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard label="New Today" value={String(dashboard.stats.newToday)} />
        <AdminStatCard label="Unassigned" value={String(dashboard.stats.unassigned)} />
        <AdminStatCard label="Overdue Follow-Ups" value={String(dashboard.stats.overdueFollowUps)} />
        <AdminStatCard label="Uploads Awaiting Review" value={String(dashboard.stats.sampleUploadsAwaitingReview)} />
        <AdminStatCard label="Close Sync Failures" value={String(dashboard.stats.closeSyncFailures)} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <h2 className="heading-4 text-white">Submission volume</h2>
          <div className="mt-6 grid gap-3">
            {dashboard.byDay.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-body-sm text-slate-400">
                  <span>{item.label}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-cyan-500"
                    style={{ width: `${Math.min(100, Math.max(10, item.count * 18))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="heading-4 text-white">Response SLA</h2>
          <p className="mt-2 text-body-sm text-slate-400">
            Average first response time for recently contacted leads.
          </p>
          <p className="mt-6 text-4xl font-semibold text-white">
            {dashboard.stats.averageFirstResponseHours == null
              ? 'N/A'
              : `${dashboard.stats.averageFirstResponseHours.toFixed(1)}h`}
          </p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <h2 className="heading-4 text-white">Intent breakdown</h2>
          <div className="mt-4 space-y-3">
            {dashboard.intentBreakdown.map(([intent, count]) => (
              <div key={intent} className="flex items-center justify-between text-body-sm">
                <span className="text-slate-300">{intent}</span>
                <span className="text-white">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="heading-4 text-white">Source breakdown</h2>
          <div className="mt-4 space-y-3">
            {dashboard.sourceBreakdown.map(([source, count]) => (
              <div key={source} className="flex items-center justify-between text-body-sm">
                <span className="text-slate-300">{source}</span>
                <span className="text-white">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="heading-4 text-white">Recent submissions</h2>
          <div className="mt-4 space-y-3">
            {dashboard.recentLeads.map((lead) => (
              <div key={lead.id} className="rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-body-sm text-white">{lead.company}</p>
                    <p className="mt-1 text-body-xs text-slate-400">{lead.name} · {lead.email}</p>
                  </div>
                  <span className="badge-cyan">{formatLeadStatus(lead.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
