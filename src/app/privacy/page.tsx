import { Metadata } from 'next'
import { Badge } from '@/components/ui'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'LeanFM Privacy Policy - How we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" />

        <div className="container-narrow relative pt-20 pb-16 md:pt-28 md:pb-24">
          <Badge className="mb-6">Legal</Badge>
          <h1 className="heading-1 text-white mb-6">Privacy Policy</h1>
          <p className="text-body-sm text-slate-500">Last updated: January 2026</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-narrow prose prose-invert prose-slate max-w-none">
          <div className="space-y-8 text-slate-300">
            <div>
              <h2 className="heading-3 text-white mb-4">Overview</h2>
              <p className="body-default">
                LeanFM Technologies (&quot;LeanFM,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy
                and is committed to protecting your personal information. This Privacy Policy explains
                how we collect, use, and safeguard your information when you use our OnPoint platform
                and related services.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-4">Information We Collect</h2>
              <h3 className="font-semibold text-white mt-6 mb-2">Account Information</h3>
              <p className="body-default">
                When you create an account, we collect your name, email address, company name,
                and job title.
              </p>

              <h3 className="font-semibold text-white mt-6 mb-2">Building Data</h3>
              <p className="body-default">
                When you upload BAS trend data for analysis, we store this data to provide our
                fault detection and diagnosis services. This data may include equipment names,
                sensor readings, timestamps, and other operational data from your building automation
                systems.
              </p>

              <h3 className="font-semibold text-white mt-6 mb-2">Usage Information</h3>
              <p className="body-default">
                We collect information about how you interact with our platform, including pages
                visited, features used, and actions taken.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 body-default">
                <li>To provide and improve our fault detection and diagnosis services</li>
                <li>To communicate with you about your account and our services</li>
                <li>To respond to your inquiries and support requests</li>
                <li>To ensure the security and integrity of our platform</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-4">How We Do NOT Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 body-default">
                <li>We do not sell your personal information or building data</li>
                <li>We do not share your building data with third parties for their own purposes</li>
                <li>We do not use your building data to train AI models that will be used for other customers</li>
                <li>We do not access your data except to provide our services or as required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-4">Data Security</h2>
              <p className="body-default">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 body-default mt-4">
                <li>All data is encrypted in transit using TLS 1.3</li>
                <li>Stored data is encrypted at rest using AES-256</li>
                <li>Access to customer data is restricted and logged</li>
                <li>Regular security assessments and updates</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-4">Data Retention</h2>
              <p className="body-default">
                We retain your data for as long as your account is active or as needed to provide
                our services. Specific retention periods:
              </p>
              <ul className="list-disc list-inside space-y-2 body-default mt-4">
                <li>Free tier: Building data retained for 30 days after analysis</li>
                <li>Unlock purchases: Building data retained for 30 days</li>
                <li>Subscribers: Continuous retention while subscription is active</li>
                <li>Account information: Retained until account deletion</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-4">Your Rights</h2>
              <p className="body-default">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 body-default mt-4">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your account and associated data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="body-default mt-4">
                To exercise these rights, contact us at {SITE_CONFIG.contactEmail}.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-4">Cookies</h2>
              <p className="body-default">
                We use essential cookies required for our platform to function. We may also use
                analytics cookies to understand how our platform is used. You can control cookie
                preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-4">Changes to This Policy</h2>
              <p className="body-default">
                We may update this Privacy Policy from time to time. We will notify you of
                significant changes by email or through our platform.
              </p>
            </div>

            <div>
              <h2 className="heading-3 text-white mb-4">Contact Us</h2>
              <p className="body-default">
                If you have questions about this Privacy Policy or our data practices, contact us at:
              </p>
              <p className="body-default mt-4">
                Email: {SITE_CONFIG.contactEmail}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
