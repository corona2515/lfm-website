import { DatasetIntakeFlow, type DatasetIntakeVariant } from '@/components/intake/DatasetIntakeFlow'

const startVariant = {
  hero: {
    badge: 'Sample Dataset Intake',
    title: 'Create your preview account and upload sample BAS data',
    description: 'Complete account setup, upload your CSV, and LeanFM will prepare your OnPoint workspace for manual review, FDD setup, and activation.',
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
  submitButtonLabel: 'Create Account & Submit Dataset',
  submittingButtonLabel: 'Creating Account & Submitting Dataset...',
  completionStates: {
    account_pending_review: {
      title: 'Preview account created',
      description: 'Your OnPoint preview account is pending staff approval and activation. We staged your building and dataset for manual review, and we’ll send credentials after the FDD setup is complete.',
      actions: [
        {
          href: '/contact?intent=demo',
          label: 'Book a Demo',
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
      title: 'Preview already pending',
      description: 'A pending OnPoint preview already exists for this email and building. Please check your email for the original invite or contact LeanFM if you need help accessing it.',
      actions: [
        {
          href: '/contact?intent=demo',
          label: 'Book a Demo',
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
