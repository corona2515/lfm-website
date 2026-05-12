// TODO(nick): legal review required before publishing this Terms page
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'LeanFM Technologies Terms of Service, including the Savings Guarantee.',
}

export default function TermsPage() {
  return (
    <section className="border-b border-sky-100 bg-[linear-gradient(135deg,#f8fcff_0%,#eef8ff_58%,#f4fbef_100%)]">
      <article className="container-default py-20 md:py-28">
        <div className="mx-auto max-w-3xl rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_24px_80px_rgba(30,64,175,0.12)] md:p-12">
          <h1 className="heading-1 mb-6 text-slate-950">Terms</h1>

          <p className="body-large mb-10 text-slate-700">
            These Terms govern engagements with LeanFM Technologies. The Savings Guarantee below applies to every paid engagement unless explicitly modified in a signed agreement.
          </p>

          <div className="space-y-8 text-body-lg leading-relaxed text-slate-700">
            <section>
              <h2 className="heading-2 mb-4 text-slate-950">LeanFM Savings Guarantee</h2>
              <p>LeanFM stands behind our analysis with a Savings Guarantee, subject to the conditions below.</p>
            </section>

            <section>
              <h3 className="heading-4 mb-3 text-slate-950">What we guarantee</h3>
              <p>If LeanFM&apos;s analysis of your building system data does not identify HVAC issues with combined estimated first-year operational impact equal to or greater than three times (3x) the fees paid for the engagement, we will refund those fees in full.</p>
              <p className="mt-3 text-body-md text-slate-600">&ldquo;Estimated first-year operational impact&rdquo; means the projected energy and operational savings over the first twelve months following implementation of the recommended corrective actions, expressed as a single-year value. The guarantee is measured against this first-year figure even though savings from corrected issues typically continue in subsequent years.</p>
            </section>

            <section>
              <h3 className="heading-4 mb-3 text-slate-950">Your responsibilities</h3>
              <p>To remain eligible for the guarantee, you must:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Provide complete and reasonably accurate BAS trend data covering the agreed scope and time period.</li>
                <li>Implement the corrective actions recommended in your LeanFM findings report within twelve (12) months of delivery.</li>
                <li>Cooperate with reasonable LeanFM follow-up requests for verification.</li>
              </ul>
            </section>

            <section>
              <h3 className="heading-4 mb-3 text-slate-950">What voids the guarantee</h3>
              <ul className="list-disc space-y-2 pl-6">
                <li>Failure to implement the recommended corrective actions within the timeframe above.</li>
                <li>Material misrepresentation of building data, occupancy, or operating conditions.</li>
                <li>Equipment failures, force majeure events, or other factors materially outside normal building operation during the verification period.</li>
              </ul>
            </section>

            <section>
              <h3 className="heading-4 mb-3 text-slate-950">How to claim</h3>
              <p>Submit a written request to <a href="mailto:legal@leanfmtech.com" className="font-semibold text-sky-700 underline-offset-4 hover:text-emerald-700 hover:underline">legal@leanfmtech.com</a> within sixty (60) days of the end of the verification period. Include the engagement reference and a description of corrective actions implemented and not implemented.</p>
            </section>

            <section>
              <h3 className="heading-4 mb-3 text-slate-950">Limitation of liability</h3>
              <p>This guarantee is limited to the refund of fees paid to LeanFM for the engagement to which it applies. LeanFM is not liable for indirect, consequential, or incidental damages.</p>
            </section>

            <hr className="border-sky-100" />

            <p className="text-body-sm text-slate-500">
              {/* TODO(nick): full Terms of Service text — add when ready. The Savings Guarantee above is the priority addition for the strategy alignment work. */}
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}
