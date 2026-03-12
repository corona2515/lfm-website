export const dynamic = 'force-dynamic'

import { Card } from '@/components/ui'
import { getAdminSettingsSnapshot } from '@/lib/admin-data'

export default async function AdminSettingsPage() {
  const settings = await getAdminSettingsSnapshot()
  const items = [
    { label: 'Database configured', value: settings.databaseConfigured ? 'Yes' : 'No' },
    { label: 'Close API configured', value: settings.closeConfigured ? 'Yes' : 'No' },
    { label: 'OnPoint intake configured', value: settings.onPointProvisioningConfigured ? 'Yes' : 'No' },
    { label: 'Lead webhook configured', value: settings.leadWebhookConfigured ? 'Yes' : 'No' },
    { label: 'Sample webhook configured', value: settings.sampleWebhookConfigured ? 'Yes' : 'No' },
    { label: 'Admin session secret configured', value: settings.adminSessionSecretConfigured ? 'Yes' : 'No' },
    {
      label: 'Last successful Close sync',
      value: settings.lastSuccessfulCloseSyncAt
        ? new Date(settings.lastSuccessfulCloseSyncAt).toLocaleString()
        : 'No successful sync yet',
    },
    {
      label: 'Last successful OnPoint intake',
      value: settings.lastSuccessfulOnPointSyncAt
        ? new Date(settings.lastSuccessfulOnPointSyncAt).toLocaleString()
        : 'No successful sync yet',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body-xs uppercase tracking-[0.2em] text-cyan-300">Settings</p>
        <h1 className="heading-3 mt-2 text-white">Operational configuration</h1>
      </div>
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
              <p className="mt-2 text-body-md text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
