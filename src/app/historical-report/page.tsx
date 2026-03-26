import type { Metadata } from 'next'
import { DatasetIntakeFlow, type DatasetIntakeVariant } from '@/components/intake/DatasetIntakeFlow'

export const metadata: Metadata = {
  title: 'Historical BAS Report',
  description: 'Upload up to 90 days of BAS trend data for a one-time historical report from LeanFM.',
  robots: {
    index: false,
    follow: false,
  },
}

const historicalReportVariant = {
  hero: {
    badge: 'Historical Report Intake',
    title: 'Upload BAS history for a one-time historical findings report',
    description: 'Share your building details and upload up to 90 days of BAS trend data. LeanFM will review the file and prepare a single historical report for a flat fee.',
  },
  offerCard: {
    eyebrow: 'Flat-Fee Engagement',
    title: 'Single report, no ongoing platform commitment',
    description: 'This unlisted intake is for teams that want one historical review of BAS data without moving into a full preview-account onboarding flow.',
    priceLabel: 'Flat Fee',
    priceValue: '$2,000',
    bullets: [
      'Up to 90 days of historical BAS data',
      'One uploaded building dataset',
      'Single report with prioritized findings',
      'Manual LeanFM follow-up after review',
    ],
    footnote: 'Upload the cleanest historical export you have available. We will confirm scope manually after intake if any clarification is needed.',
  },
  analyticsPrefix: 'historical_report',
  stepEventPrefix: 'historical_report',
  localDraftStorageKey: 'leanfm-historical-report-draft',
  submitEndpoint: '/api/historical-report',
  completeStateOnSuccess: 'historical_report_requested',
  submitButtonLabel: 'Request Historical Report',
  submittingButtonLabel: 'Submitting Historical Report Request...',
  completionStates: {
    historical_report_requested: {
      title: 'Historical report request received',
      description: 'We received your BAS upload and building details. LeanFM will review the dataset, confirm scope for up to 90 days of history, and follow up with next steps for the one-time report.',
      actions: [
        {
          href: '/contact?intent=general',
          label: 'Contact LeanFM',
          variant: 'primary',
        },
        {
          href: '/',
          label: 'Back to Home',
          variant: 'secondary',
        },
      ],
    },
  },
} satisfies DatasetIntakeVariant

export default function HistoricalReportPage() {
  return <DatasetIntakeFlow variant={historicalReportVariant} />
}
