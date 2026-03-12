import { Card } from '@/components/ui'

export function AdminStatCard({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <Card className="border-slate-800/80 bg-slate-900/80">
      <p className="text-body-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      {hint ? <p className="mt-2 text-body-sm text-slate-400">{hint}</p> : null}
    </Card>
  )
}
