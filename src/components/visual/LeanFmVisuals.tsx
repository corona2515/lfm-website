import Link from 'next/link'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileSearch,
  Gauge,
  LineChart,
  Settings2,
  Thermometer,
  Wrench,
} from 'lucide-react'
import { TrackedButton } from '@/components/analytics/TrackedButton'
import { CTA_LABELS } from '@/lib/constants'
import { cn } from '@/lib/utils'

type PhotoPlaceholderProps = {
  label: string
  alt: string
  src?: string
  aspect?: 'video' | 'wide' | 'square' | 'portrait' | 'landscape'
  className?: string
  imageClassName?: string
  sizes?: string
  caption?: string
  overlay?: boolean
}

const aspectClass = {
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[4/3]',
}

export function PhotoPlaceholder({
  label,
  alt,
  src,
  aspect = 'video',
  className,
  imageClassName,
  caption,
  overlay = true,
}: PhotoPlaceholderProps) {
  return (
    <figure
      data-photo-placeholder={label}
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : alt}
      style={
        src
          ? {
              backgroundImage: `url("${src}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : undefined
      }
      className={cn(
        'relative isolate overflow-hidden rounded-2xl border shadow-[0_24px_80px_rgba(2,6,23,0.35)]',
        src ? 'border-sky-100 bg-sky-50' : 'border-slate-700/70 bg-slate-900',
        aspectClass[aspect],
        className
      )}
    >
      {src ? (
        // Use a direct public image element here so approved local marketing assets
        // render reliably in both the dev server and the in-app browser.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn('absolute inset-0 h-full w-full object-cover', imageClassName)}
        />
      ) : (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-45" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(135deg,rgba(44,66,88,0.88)_0%,rgba(14,24,36,0.82)_45%,rgba(144,204,124,0.18)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -left-16 top-12 h-44 w-44 rounded-full bg-cyan-400/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-1/2 w-2/3 bg-[linear-gradient(135deg,transparent,rgba(255,184,0,0.09))]"
          />
        </>
      )}
      {overlay ? <div aria-hidden="true" className="absolute inset-0 bg-slate-950/18" /> : null}
      {!src ? (
        <div className="absolute inset-x-5 bottom-5 z-10">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-slate-950/65 px-3 py-1.5 text-body-xs font-semibold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Photo placeholder
          </div>
          <p className="mt-3 max-w-xl font-display text-xl font-semibold leading-snug text-white">
            {label}
          </p>
          {caption ? <p className="mt-2 text-body-sm leading-relaxed text-slate-300">{caption}</p> : null}
        </div>
      ) : caption ? (
        <figcaption className="absolute inset-x-5 bottom-5 z-10 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-body-sm leading-relaxed text-slate-200 backdrop-blur">
          {caption}
        </figcaption>
      ) : null}
      <div aria-hidden="true" className="absolute left-5 top-5 h-12 w-12 border-l border-t border-cyan-300/35" />
      <div aria-hidden="true" className="absolute right-5 top-5 h-12 w-12 border-r border-t border-cyan-300/20" />
    </figure>
  )
}

type DiagnosticInsightCardProps = {
  compact?: boolean
  className?: string
  issueTitle?: string
  summary?: string
  variant?: 'dark' | 'light'
}

export function DiagnosticInsightCard({
  compact = false,
  className,
  issueTitle = 'AHU-3 heating and cooling conflict',
  summary = 'Cooling and reheat appear active during occupied periods, creating avoidable energy use and comfort instability.',
  variant = 'dark',
}: DiagnosticInsightCardProps) {
  const evidence = ['Runtime', 'Setpoints', 'Schedules', 'Sensors']
  const impacts = ['Energy waste', 'Comfort risk', 'Equipment wear']
  const isLight = variant === 'light'

  return (
    <div
      className={cn(
        'relative isolate w-full min-w-0 overflow-hidden rounded-2xl border p-5 motion-safe:animate-fade-in motion-reduce:animate-none',
        isLight
          ? 'border-sky-100 bg-white/95 shadow-[0_24px_80px_rgba(30,64,175,0.14)]'
          : 'border-slate-700/80 bg-slate-950/90 shadow-[0_30px_100px_rgba(2,6,23,0.48)]',
        className
      )}
    >
      <div aria-hidden="true" className={cn('absolute inset-0 bg-grid', isLight ? 'opacity-20' : 'opacity-45')} />
      <div aria-hidden="true" className={cn('absolute -right-12 top-0 h-40 w-40 rounded-full blur-2xl', isLight ? 'bg-sky-200/45' : 'bg-cyan-400/14')} />
      <div className="relative">
        <div className={cn('mb-5 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-start sm:justify-between', isLight ? 'border-sky-100' : 'border-slate-800')}>
          <div>
            <p className={cn('text-body-xs font-semibold uppercase tracking-[0.18em]', isLight ? 'text-sky-700' : 'text-slate-500')}>
              Prioritized diagnostic finding
            </p>
            <h3 className={cn('mt-2 break-words font-display text-xl font-semibold leading-tight sm:text-2xl', isLight ? 'text-slate-950' : 'text-white')}>
              {issueTitle}
            </h3>
          </div>
          <span className={cn(
            'shrink-0 rounded-full border px-3 py-1 text-body-xs font-semibold uppercase tracking-[0.14em] motion-safe:animate-fade-in-up motion-safe:[animation-delay:200ms] motion-safe:[animation-fill-mode:both] motion-reduce:animate-none',
            isLight ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-amber-400/40 bg-amber-400/15 text-amber-300'
          )}>
            High Priority
          </span>
        </div>

        <p className={cn('text-body-md leading-relaxed', isLight ? 'text-slate-700' : 'text-slate-300')}>{summary}</p>

        <div className={cn('mt-5 grid gap-3', compact ? 'sm:grid-cols-1' : 'sm:grid-cols-3')}>
          {impacts.map((impact) => (
            <div key={impact} className={cn('rounded-xl border px-3 py-3', isLight ? 'border-sky-100 bg-sky-50/70' : 'border-slate-800 bg-slate-900/70')}>
              <p className={cn('text-body-sm font-semibold', isLight ? 'text-slate-900' : 'text-white')}>{impact}</p>
            </div>
          ))}
        </div>

        <div className={cn('mt-5 rounded-xl border p-4', isLight ? 'border-sky-100 bg-white' : 'border-slate-800 bg-slate-900/55')}>
          <p className={cn('mb-3 text-body-xs font-semibold uppercase tracking-[0.16em]', isLight ? 'text-sky-700' : 'text-slate-500')}>
            Evidence reviewed
          </p>
          <div className="flex flex-wrap gap-2">
            {evidence.map((item, index) => (
              <span
                key={item}
                className={cn(
                  'rounded-full border px-3 py-1 text-body-xs motion-safe:animate-fade-in-up motion-safe:[animation-fill-mode:both] motion-reduce:animate-none',
                  isLight ? 'border-sky-100 bg-sky-50 text-slate-700' : 'border-slate-700 bg-slate-950/70 text-slate-300'
                )}
                style={{ animationDelay: `${320 + index * 80}ms` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className={cn('mt-5 rounded-xl border p-4 motion-safe:animate-fade-in-up motion-safe:[animation-delay:600ms] motion-safe:[animation-fill-mode:both] motion-reduce:animate-none', isLight ? 'border-emerald-200 bg-emerald-50' : 'border-cyan-400/25 bg-cyan-500/10')}>
          <p className={cn('mb-2 text-body-xs font-semibold uppercase tracking-[0.16em]', isLight ? 'text-emerald-800' : 'text-cyan-300')}>
            Recommended action
          </p>
          <p className={cn('text-body-sm leading-relaxed', isLight ? 'text-slate-900' : 'text-white')}>
            Review sequence logic and occupied schedule behavior.
          </p>
        </div>
      </div>
    </div>
  )
}

type DataToActionFlowProps = {
  variant?: 'dark' | 'light'
  className?: string
}

export function DataToActionFlow({ variant = 'dark', className }: DataToActionFlowProps) {
  const steps = [
    {
      title: 'Existing BAS Data',
      details: 'Runtime · Setpoints · Schedules · Sensors',
      Icon: Activity,
    },
    {
      title: 'Hidden Patterns',
      details: 'Waste · Drift · Conflicts · Logic Faults',
      Icon: FileSearch,
    },
    {
      title: 'Clear Actions',
      details: 'Prioritize · Assign · Resolve',
      Icon: ClipboardCheck,
    },
  ]

  return (
    <div className={cn('group/flow grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch', className)}>
      {steps.map(({ title, details, Icon }, index) => (
        <div key={title} className="contents">
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl border p-6',
              variant === 'light'
                ? 'border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]'
                : 'border-slate-800 bg-slate-950/65'
            )}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-25" />
            <div className="relative">
              <div className={cn('mb-5 flex h-12 w-12 items-center justify-center rounded-xl border', variant === 'light' ? 'border-sky-100 bg-sky-50' : 'border-cyan-400/30 bg-cyan-500/10')}>
                <Icon className={cn('h-6 w-6', variant === 'light' ? 'text-sky-700' : 'text-cyan-300')} aria-hidden="true" />
              </div>
              <h3 className={cn('font-display text-2xl font-semibold', variant === 'light' ? 'text-slate-950' : 'text-white')}>
                {title}
              </h3>
              <p className={cn('mt-3 text-body-md leading-relaxed', variant === 'light' ? 'text-slate-600' : 'text-slate-300')}>
                {details}
              </p>
            </div>
          </div>
          {index < steps.length - 1 ? (
            <div className="flex items-center justify-center py-1 lg:py-0">
              <div className="flex items-center justify-center gap-2">
                <div
                  aria-hidden="true"
                  className={cn(
                    'relative hidden h-px w-20 overflow-hidden rounded-full lg:block',
                    variant === 'light'
                      ? 'bg-gradient-to-r from-emerald-200 via-sky-200 to-emerald-200'
                      : 'bg-gradient-to-r from-cyan-400/20 via-cyan-300/45 to-cyan-400/20'
                  )}
                >
                  <span
                    className={cn(
                      'absolute -top-1 left-0 h-2 w-2 rounded-full motion-safe:animate-flow-dot motion-reduce:animate-none group-hover/flow:[animation-play-state:paused]',
                      variant === 'light' ? 'bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.45)]' : 'bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.45)]'
                    )}
                  />
                </div>
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-full border', variant === 'light' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-cyan-400/35 bg-cyan-500/10 text-cyan-300')}>
                  <ArrowRight className="hidden h-5 w-5 lg:block" aria-hidden="true" />
                  <ArrowRight className="h-5 w-5 rotate-90 lg:hidden" aria-hidden="true" />
                </div>
                <div
                  aria-hidden="true"
                  className={cn(
                    'relative hidden h-px w-20 overflow-hidden rounded-full lg:block',
                    variant === 'light'
                      ? 'bg-gradient-to-r from-emerald-200 via-sky-200 to-emerald-200'
                      : 'bg-gradient-to-r from-cyan-400/20 via-cyan-300/45 to-cyan-400/20'
                  )}
                >
                  <span
                    className={cn(
                      'absolute -top-1 left-0 h-2 w-2 rounded-full motion-safe:animate-flow-dot motion-safe:[animation-delay:1.6s] motion-reduce:animate-none group-hover/flow:[animation-play-state:paused]',
                      variant === 'light' ? 'bg-sky-500 shadow-[0_0_18px_rgba(14,165,233,0.35)]' : 'bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.45)]'
                    )}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export function BasVsLeanFMComparison({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'
  const columns = [
    {
      title: 'BAS Alarms',
      tone: 'muted',
      items: ['Catch obvious failures', 'Alert on thresholds', 'Can create noisy alert lists', 'Do not rank impact'],
    },
    {
      title: 'LeanFM OnPoint',
      tone: 'active',
      items: [
        'Finds hidden operating patterns',
        'Connects issues to energy, comfort, and maintenance impact',
        'Ranks what matters first',
        'Produces clear corrective guidance',
      ],
    },
  ] as const

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {columns.map((column) => (
        <div
          key={column.title}
          className={cn(
            'relative overflow-hidden rounded-2xl border p-6',
            isLight
              ? column.tone === 'muted'
                ? 'border-sky-100 bg-white shadow-[0_18px_60px_rgba(30,64,175,0.08)]'
                : 'border-emerald-200 bg-[linear-gradient(135deg,#ffffff_0%,#effdf5_100%)] shadow-[0_18px_60px_rgba(16,185,129,0.10)]'
              : column.tone === 'muted'
                ? 'border-slate-800 bg-slate-950/65'
                : 'border-cyan-400/30 bg-[linear-gradient(135deg,rgba(144,204,124,0.14),rgba(14,24,36,0.88))]'
          )}
        >
          <div aria-hidden="true" className={cn('absolute inset-0 bg-grid', isLight ? 'opacity-15' : 'opacity-30')} />
          <div className="relative">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className={cn('font-display text-3xl font-semibold', isLight ? 'text-slate-950' : 'text-white')}>{column.title}</h3>
              {column.tone === 'muted' ? (
                <AlertTriangle className="h-7 w-7 text-slate-500" aria-hidden="true" />
              ) : (
                <BarChart3 className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              )}
            </div>

            <div className={cn('mb-6 rounded-xl border p-4', isLight ? 'border-sky-100 bg-sky-50/60' : 'border-slate-800 bg-slate-950/55')}>
              {column.tone === 'muted' ? <MutedAlarmVisual variant={variant} /> : <LeanFmPriorityVisual variant={variant} />}
            </div>

            <div className="space-y-3">
              {column.items.map((item) => (
                <div key={item} className={cn('flex gap-3 text-body-md', isLight ? 'text-slate-700' : 'text-slate-200')}>
                  <CheckCircle2 className={cn('mt-0.5 h-5 w-5 shrink-0', column.tone === 'muted' ? 'text-slate-500' : 'text-cyan-300')} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function MutedAlarmVisual({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'
  const rows = [
    ['Threshold alarm', 'Active'],
    ['Equipment fault', 'Open'],
    ['Comfort complaint', 'Manual'],
    ['Impact ranking', 'Not shown'],
  ]

  return (
    <div className="space-y-2">
      {rows.map(([label, status], index) => (
        <div key={label} className={cn('grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg px-3 py-2', isLight ? 'border border-sky-100 bg-white shadow-sm' : 'bg-slate-900/70')}>
          <span className={cn('text-body-xs font-medium uppercase tracking-[0.14em]', isLight ? 'text-slate-500' : 'text-slate-500')}>{label}</span>
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em]',
              index === 0
                ? isLight
                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                  : 'border-amber-400/35 bg-amber-400/12 text-amber-200'
                : isLight
                  ? 'border-sky-100 bg-sky-50 text-slate-600'
                  : 'border-slate-700 bg-slate-950/70 text-slate-400'
            )}
          >
            {status}
          </span>
        </div>
      ))}
    </div>
  )
}

function LeanFmPriorityVisual({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'
  return (
    <div className="space-y-2">
      {['Hidden issues found', 'Priority rankings', 'Recommended actions'].map((label, index) => (
        <div key={label} className={cn('flex items-center gap-3 rounded-lg px-3 py-2', isLight ? 'bg-white' : 'bg-slate-900/70')}>
          <span className={cn('flex h-6 w-6 items-center justify-center rounded-full border text-body-xs font-semibold', isLight ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-cyan-400/35 bg-cyan-500/10 text-cyan-200')}>
            {index + 1}
          </span>
          <span className={cn('text-body-sm', isLight ? 'text-slate-800' : 'text-slate-100')}>{label}</span>
        </div>
      ))}
    </div>
  )
}

type IssuePattern = {
  title: string
  looksLike: string
  missed: string
  cost: string
  surfaces: string
  impacts: string[]
  visual: 'conflict' | 'runtime' | 'sensor' | 'logic' | 'comfort' | 'noise'
}

export function IssuePatternCard({ issue, variant = 'dark' }: { issue: IssuePattern; variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'
  return (
    <article className={cn(
      'group relative overflow-hidden rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5',
      isLight
        ? 'border-sky-100 bg-white shadow-[0_18px_60px_rgba(30,64,175,0.08)] hover:border-sky-200'
        : 'border-slate-800 bg-slate-900/65 hover:border-cyan-400/35 hover:bg-slate-900'
    )}>
      <div aria-hidden="true" className={cn('absolute inset-0 bg-grid', isLight ? 'opacity-10' : 'opacity-20')} />
      <div className="relative">
        <MiniPatternVisual type={issue.visual} variant={variant} />
        <h3 className={cn('mt-6 font-display text-2xl font-semibold leading-tight', isLight ? 'text-slate-950' : 'text-white')}>{issue.title}</h3>
        <div className="mt-5 grid gap-3">
          <PatternRow label="What it looks like" value={issue.looksLike} variant={variant} />
          <PatternRow label="Why it gets missed" value={issue.missed} variant={variant} />
          <PatternRow label="What it can cost" value={issue.cost} emphasis variant={variant} />
          <PatternRow label="What LeanFM surfaces" value={issue.surfaces} variant={variant} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {issue.impacts.map((impact) => (
            <span key={impact} className={cn('rounded-full border px-3 py-1 text-body-xs font-medium', isLight ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-cyan-400/25 bg-cyan-500/10 text-cyan-200')}>
              {impact}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

function PatternRow({ label, value, emphasis = false, variant = 'dark' }: { label: string; value: string; emphasis?: boolean; variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'
  return (
    <div className={cn(
      'rounded-xl border p-4',
      isLight
        ? emphasis ? 'border-amber-200 bg-amber-50' : 'border-sky-100 bg-sky-50/60'
        : emphasis ? 'border-amber-400/20 bg-amber-400/10' : 'border-slate-800 bg-slate-950/45'
    )}>
      <p className={cn('mb-2 text-body-xs font-semibold uppercase tracking-[0.16em]', emphasis ? (isLight ? 'text-amber-700' : 'text-amber-300') : (isLight ? 'text-sky-700' : 'text-slate-500'))}>
        {label}
      </p>
      <p className={cn('text-body-sm leading-relaxed', isLight ? 'text-slate-700' : 'text-slate-200')}>{value}</p>
    </div>
  )
}

function MiniPatternVisual({ type, variant = 'dark' }: { type: IssuePattern['visual']; variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'
  const shellClass = isLight
    ? 'rounded-xl border border-sky-100 bg-sky-50/70 p-4'
    : 'rounded-xl border border-slate-800 bg-slate-950/55 p-4'
  const labelClass = isLight
    ? 'mb-3 flex items-center gap-2 text-body-xs uppercase tracking-[0.14em] text-sky-700'
    : 'mb-3 flex items-center gap-2 text-body-xs uppercase tracking-[0.14em] text-slate-500'
  const chartBg = isLight ? 'bg-white' : 'bg-slate-900'
  if (type === 'runtime') {
    return (
      <div className={shellClass}>
        <div className={labelClass}>
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          Schedule vs runtime
        </div>
        <div className="space-y-3">
          <Bar label="Occupied" width="w-7/12" tone="muted" variant={variant} />
          <Bar label="Actual runtime" width="w-11/12" tone="active" variant={variant} />
        </div>
      </div>
    )
  }

  if (type === 'sensor') {
    return (
      <div className={shellClass}>
        <div className={labelClass}>
          <Gauge className="h-4 w-4" aria-hidden="true" />
          Sensor drift
        </div>
        <div className={cn('relative h-24 overflow-hidden rounded-lg', chartBg)}>
          <svg viewBox="0 0 320 96" className="h-full w-full" role="img" aria-label="Sensor reading drifting away from actual condition over time">
            <defs>
              <linearGradient id="sensorDriftFill" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(125,211,252,0.02)" />
                <stop offset="100%" stopColor="rgba(251,191,36,0.28)" />
              </linearGradient>
            </defs>
            {[24, 48, 72].map((y) => (
              <line key={y} x1="18" x2="302" y1={y} y2={y} stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
            ))}
            <path
              d="M26 58 C88 56 132 55 184 53 C228 51 260 50 296 48"
              fill="none"
              stroke="rgba(125,211,252,0.85)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M26 58 C82 57 126 59 172 64 C220 70 258 77 296 84 L296 48 C260 50 228 51 184 53 C132 55 88 56 26 58 Z"
              fill="url(#sensorDriftFill)"
            />
            <path
              d="M26 58 C82 57 126 59 172 64 C220 70 258 77 296 84"
              fill="none"
              stroke="rgba(251,191,36,0.9)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="244" cy="74" r="5" fill="rgba(251,191,36,0.95)" />
            <text x="24" y="19" fill="rgba(203,213,225,0.7)" fontSize="10" fontWeight="600">Actual</text>
            <text x="230" y="92" fill="rgba(251,191,36,0.88)" fontSize="10" fontWeight="600">Reported drift</text>
          </svg>
        </div>
      </div>
    )
  }

  if (type === 'logic') {
    return (
      <div className={shellClass}>
        <div className={labelClass}>
          <Settings2 className="h-4 w-4" aria-hidden="true" />
          Sequence path
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['Start', 'Check', 'Fault', 'Action'].map((item) => (
            <div key={item} className={cn('rounded-lg border px-2 py-3 text-center text-body-xs font-semibold', item === 'Fault' ? (isLight ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-amber-400/35 bg-amber-400/15 text-amber-200') : (isLight ? 'border-sky-100 bg-white text-slate-700' : 'border-slate-800 bg-slate-900 text-slate-300'))}>
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'comfort') {
    return (
      <div className={shellClass}>
        <div className={labelClass}>
          <Thermometer className="h-4 w-4" aria-hidden="true" />
          Stability band
        </div>
        <div className={cn('relative h-20 overflow-hidden rounded-lg', chartBg)}>
          <span className="absolute left-0 right-0 top-6 h-8 bg-cyan-300/10" />
          <span className="absolute left-5 top-12 h-0.5 w-[78%] -rotate-6 bg-amber-300/85" />
        </div>
      </div>
    )
  }

  if (type === 'noise') {
    return (
      <div className={shellClass}>
        <div className={labelClass}>
          <Wrench className="h-4 w-4" aria-hidden="true" />
          Noise to priority
        </div>
        <div className="grid gap-2">
          {['Alert 47', 'Alert 12', 'Top priority'].map((item, index) => (
            <div key={item} className={cn('rounded-lg px-3 py-2 text-body-xs', index === 2 ? (isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-cyan-500/15 text-cyan-200') : (isLight ? 'bg-white text-slate-500' : 'bg-slate-900 text-slate-500'))}>
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={shellClass}>
      <div className={labelClass}>
        <LineChart className="h-4 w-4" aria-hidden="true" />
        Heating/cooling overlap
      </div>
      <div className={cn('relative h-24 overflow-hidden rounded-lg', chartBg)}>
        <svg viewBox="0 0 320 96" className="h-full w-full" role="img" aria-label="Heating and cooling active during the same occupied window">
          <defs>
            <linearGradient id="overlapFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(96,165,250,0.20)" />
              <stop offset="100%" stopColor="rgba(251,191,36,0.18)" />
            </linearGradient>
          </defs>
          {[24, 48, 72].map((y) => (
            <line key={y} x1="18" x2="302" y1={y} y2={y} stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
          ))}
          <rect x="118" y="16" width="104" height="64" rx="10" fill="url(#overlapFill)" stroke="rgba(251,191,36,0.24)" />
          <path
            d="M24 70 C66 68 96 54 126 43 C158 31 194 30 224 42 C252 53 270 66 296 68"
            fill="none"
            stroke="rgba(147,197,253,0.92)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M24 28 C62 30 96 42 126 54 C160 68 194 69 224 56 C252 44 272 31 296 28"
            fill="none"
            stroke="rgba(251,191,36,0.9)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line x1="118" x2="118" y1="16" y2="80" stroke="rgba(251,191,36,0.28)" strokeDasharray="4 5" />
          <line x1="222" x2="222" y1="16" y2="80" stroke="rgba(251,191,36,0.28)" strokeDasharray="4 5" />
          <text x="128" y="15" fill="rgba(251,191,36,0.88)" fontSize="10" fontWeight="700">Overlap window</text>
        </svg>
      </div>
    </div>
  )
}

function Bar({ label, width, tone, variant = 'dark' }: { label: string; width: string; tone: 'muted' | 'active'; variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'
  return (
    <div>
      <div className={cn('mb-1 flex justify-between text-body-xs', isLight ? 'text-slate-500' : 'text-slate-500')}>
        <span>{label}</span>
      </div>
      <div className={cn('h-2 overflow-hidden rounded-full', isLight ? 'bg-sky-100' : 'bg-slate-900')}>
        <span className={cn('block h-full rounded-full', width, tone === 'active' ? 'bg-amber-300' : isLight ? 'bg-emerald-300' : 'bg-cyan-300/60')} />
      </div>
    </div>
  )
}

export function CaseStudyProofBand({ compact = false, variant = 'dark' }: { compact?: boolean; variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'
  const stats = [
    ['$56,386', 'reported first-year savings'],
    ['$101,383', 'reported second-year savings'],
    ['$100K+', 'ongoing annual savings shown in the case study'],
  ]

  return (
    <section className={cn(
      'relative overflow-hidden border-y',
      isLight
        ? 'border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_55%,#f4fbef_100%)]'
        : 'border-slate-800/70 bg-slate-950'
    )}>
      <div aria-hidden="true" className={cn('absolute inset-0 bg-grid', isLight ? 'opacity-20' : 'opacity-45')} />
      <div className="container-wide relative z-10 py-16 md:py-24">
        <div className={cn('grid gap-8 lg:items-center', compact ? 'lg:grid-cols-[0.78fr_1.22fr]' : 'lg:grid-cols-[0.92fr_1.08fr]')}>
          <PhotoPlaceholder
            label="The Andy Warhol Museum exterior or museum/gallery environment photo"
            alt="Museum building representing a sensitive museum environment"
            src="/media/leanfm-images/museum-building-ivy.jpg"
            aspect={compact ? 'landscape' : 'video'}
            imageClassName="object-[50%_38%]"
            sizes="(min-width: 1024px) 44vw, 100vw"
            className={cn(isLight && 'border-white shadow-[0_24px_90px_rgba(30,64,175,0.18)]')}
            overlay={!isLight}
          />
          <div>
            <p className={cn('mb-4 text-body-xs font-semibold uppercase tracking-[0.18em]', isLight ? 'text-emerald-700' : 'text-cyan-300')}>
              Featured Case Study
            </p>
            <h2 className={cn('heading-2 mb-5', isLight ? 'text-slate-950' : 'text-white')}>A newer BAS can still miss costly logic faults.</h2>
            <p className={cn('body-large', isLight && 'text-slate-700')}>
              A local museum had already installed a new BAS. LeanFM found logic faults hiding in the data, and the case study shows documented savings after those faults were corrected.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div key={label} className={cn('rounded-xl border p-5', isLight ? 'border-emerald-200 bg-white/90 shadow-sm' : 'border-cyan-400/25 bg-cyan-500/10')}>
                  <p className={cn('font-display text-3xl font-semibold', isLight ? 'text-slate-950' : 'text-white')}>{value}</p>
                  <p className={cn('mt-2 text-body-sm leading-relaxed', isLight ? 'text-slate-600' : 'text-slate-300')}>{label}</p>
                </div>
              ))}
            </div>
            <p className={cn('mt-5 text-body-sm leading-relaxed', isLight ? 'text-slate-500' : 'text-slate-400')}>
              Actual outcomes depend on building conditions, available data, and corrective actions taken.
            </p>
            <div className="mt-7">
              <TrackedButton
                href="/results"
                variant="secondary"
                eventName="cta_results_click"
                eventParams={{ location: 'case_study_proof_band' }}
                className={cn(isLight && 'border-sky-200 bg-white text-slate-900 shadow-sm hover:border-sky-300 hover:bg-sky-50')}
              >
                View Results
              </TrackedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type VerticalPhotoCardProps = {
  title: string
  pain: string
  href: string
  photoLabel: string
  photoSrc?: string
  photoAlt?: string
  imageClassName?: string
  variant?: 'dark' | 'light'
}

export function VerticalPhotoCard({ title, pain, href, photoLabel, photoSrc, photoAlt, imageClassName, variant = 'dark' }: VerticalPhotoCardProps) {
  const isLight = variant === 'light'
  return (
    <Link
      href={href}
      className={cn(
        'group relative isolate min-h-[21rem] overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
        isLight ? 'border-sky-100 bg-white shadow-[0_18px_60px_rgba(30,64,175,0.10)] hover:border-sky-200' : 'border-slate-800 bg-slate-900 shadow-[0_18px_60px_rgba(2,6,23,0.18)] hover:border-cyan-400/45'
      )}
    >
      <PhotoPlaceholder
        label={photoLabel}
        alt={photoAlt ?? `${title} facility photo`}
        src={photoSrc}
        aspect="portrait"
        className="absolute inset-0 h-full rounded-none border-0 shadow-none"
        imageClassName={imageClassName}
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className={cn('absolute inset-0', isLight ? 'bg-[linear-gradient(180deg,rgba(15,23,42,0.00)_0%,rgba(15,23,42,0.18)_46%,rgba(15,23,42,0.82)_100%)]' : 'bg-[linear-gradient(180deg,rgba(7,13,20,0.08)_0%,rgba(7,13,20,0.82)_58%,rgba(7,13,20,0.96)_100%)]')} />
      <div className="absolute inset-x-0 bottom-0 z-10 p-6">
        <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-body-md leading-relaxed text-slate-200">{pain}</p>
        <div className="mt-5 inline-flex items-center gap-2 text-body-sm font-semibold text-cyan-200 transition-colors duration-200 group-hover:text-emerald-200">
          View solution
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}

type FinalCTASectionProps = {
  headline?: string
  body?: string
  primaryHref: string
  secondaryHref?: string
  secondaryLabel?: string
  primaryLocation: string
  secondaryLocation?: string
  includeVisual?: boolean
  variant?: 'dark' | 'light'
}

export function FinalCTASection({
  headline = 'Ready to see what your BAS data is already showing?',
  body = 'Request a Sample Analysis and LeanFM will help determine whether your existing building data contains hidden issues worth attention.',
  primaryHref,
  secondaryHref = '/what-we-find',
  secondaryLabel = 'See What We Find',
  primaryLocation,
  secondaryLocation = 'final_cta_secondary',
  includeVisual = true,
  variant = 'light',
}: FinalCTASectionProps) {
  const isLight = variant === 'light'
  return (
    <section className={cn('relative overflow-hidden border-t', isLight ? 'border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_55%,#f4fbef_100%)]' : 'border-slate-800/70 bg-slate-950')}>
      <div aria-hidden="true" className={cn('absolute inset-0 bg-grid', isLight ? 'opacity-20' : 'opacity-55')} />
      <div aria-hidden="true" className={cn('absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl', isLight ? 'bg-sky-200/45' : 'bg-cyan-400/10')} />
      <div className="container-default relative z-10 py-16 md:py-24">
        <div className={cn('grid gap-8 lg:items-center', includeVisual ? 'lg:grid-cols-[0.92fr_0.78fr]' : '')}>
          <div className={cn(!includeVisual && 'mx-auto max-w-2xl text-center')}>
            <h2 className={cn('heading-2 mb-5', isLight ? 'text-slate-950' : 'text-white')}>{headline}</h2>
            <p className={cn('body-large mb-8', isLight && 'text-slate-700')}>{body}</p>
            <div className={cn('flex flex-col gap-3 sm:flex-row', !includeVisual && 'justify-center')}>
              <TrackedButton
                href={primaryHref}
                size="large"
                eventName="cta_sample_analysis_click"
                eventParams={{ location: primaryLocation }}
              >
                {CTA_LABELS.primary}
              </TrackedButton>
              <TrackedButton
                href={secondaryHref}
                variant="secondary"
                size="large"
                eventName="cta_what_we_find_click"
                eventParams={{ location: secondaryLocation }}
                className={cn(isLight && 'border-sky-200 bg-white text-slate-900 shadow-sm hover:border-sky-300 hover:bg-sky-50')}
              >
                {secondaryLabel}
              </TrackedButton>
            </div>
          </div>
          {includeVisual ? (
            <DiagnosticInsightCard
              variant={variant}
              compact
              issueTitle="Hidden runtime pattern surfaced"
              summary="Existing BAS trends can point to issues worth reviewing before they become larger operating problems."
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function VisualTimeline({ items, variant = 'dark' }: { items: Array<{ year: string; title: string; description: string }>; variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {items.map((item, index) => (
        <div key={item.year} className={cn('relative rounded-2xl border p-5', isLight ? 'border-sky-100 bg-white shadow-[0_14px_45px_rgba(30,64,175,0.08)]' : 'border-slate-800 bg-slate-950/60')}>
          {index < items.length - 1 ? (
            <span aria-hidden="true" className="absolute -right-3 top-8 hidden h-px w-6 bg-cyan-300/35 md:block" />
          ) : null}
          <p className={cn('font-display text-3xl font-semibold', isLight ? 'text-sky-700' : 'text-cyan-200')}>{item.year}</p>
          <h3 className={cn('mt-4 font-display text-xl font-semibold leading-tight', isLight ? 'text-slate-950' : 'text-white')}>{item.title}</h3>
          <p className={cn('mt-3 text-body-sm leading-relaxed', isLight ? 'text-slate-600' : 'text-slate-400')}>{item.description}</p>
        </div>
      ))}
    </div>
  )
}
