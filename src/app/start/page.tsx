import { DatasetIntakeFlow, type DatasetIntakeVariant } from '@/components/intake/DatasetIntakeFlow'

const startVariant = {
  hero: {
    badge: 'Sample Analysis',
    title: 'Start your Sample Analysis',
    description:
      'Share a few details about your building and upload available BAS trend data. LeanFM will review the data and follow up with next steps.',
    photoLabel: 'BAS export file or facilities manager uploading building system data',
    photoAlt: 'BAS export file or facilities manager uploading building system data',
  },
  analyticsPrefix: 'sample_upload',
  stepEventPrefix: 'start',
  localDraftStorageKey: 'leanfm-sample-intake-draft',
  submitEndpoint: '/api/sample-intake',
  completeStateOnSuccess: 'account_pending_review',
  duplicateResponse: {
    statusCode: 409,
    code: 'PENDING_SUBMISSION_EXISTS',
    completionState: 'pending_submission_exists',
  },
  submitButtonLabel: 'Submit Dataset for Review',
  submittingButtonLabel: 'Submitting Dataset...',
  offerCard: {
    eyebrow: 'What to expect',
    title: 'A practical first step using the data you already have.',
    description:
      'The upload flow is designed for a focused Sample Analysis, not a long implementation project.',
    priceLabel: 'Trust signals',
    priceValue: 'LeanFM review',
    bullets: [
      'Existing BAS data',
      'No new hardware required to start',
      'Review by LeanFM team',
      'Findings walkthrough',
    ],
    footnote: 'We only ask for what is needed to review your sample dataset.',
  },
  completionStates: {
    account_pending_review: {
      title: 'Sample dataset uploaded',
      description:
        'Your dataset is queued for LeanFM review. The team will review your building context and follow up with next steps.',
      actions: [
        {
          href: '/contact?intent=demo',
          label: 'Talk to LeanFM',
          variant: 'primary',
          eventName: 'cta_demo_click',
          eventParams: { location: 'start_confirmation_primary' },
        },
        {
          href: '/',
          label: 'Back to Home',
          variant: 'secondary',
        },
      ],
    },
    pending_submission_exists: {
      title: 'Sample Analysis already pending',
      description:
        'A pending Sample Analysis already exists for this email and building. Please check your email for the original follow-up or contact LeanFM if you need help.',
      actions: [
        {
          href: '/contact?intent=demo',
          label: 'Talk to LeanFM',
          variant: 'primary',
          eventName: 'cta_demo_click',
          eventParams: { location: 'start_confirmation_primary' },
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

export default function StartPage() {
  return <DatasetIntakeFlow variant={startVariant} />
}
