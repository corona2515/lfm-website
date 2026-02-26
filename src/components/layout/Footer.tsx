'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FOOTER_LINKS, SITE_CONFIG, CTA_LABELS } from '@/lib/constants'
import { TrackedButton } from '@/components/analytics/TrackedButton'

export function Footer() {
  const pathname = usePathname()
  const hideFooterCta = pathname === '/contact'
  const currentYear = new Date().getFullYear()
  const footerSections = [
    { title: 'Product', links: FOOTER_LINKS.product },
    { title: 'Industries', links: FOOTER_LINKS.industries },
    { title: 'Company', links: FOOTER_LINKS.company },
    { title: 'Legal', links: FOOTER_LINKS.legal },
  ].filter((section) => section.links.length > 0)

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {!hideFooterCta ? (
        <>
          {/* CTA Section */}
          <div className="container-default py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="heading-2 text-white mb-4">
                Ready to see what hidden HVAC faults are costing you?
              </h2>
              <p className="body-large mb-8">
                Start with sample BAS data and get prioritized diagnostics with recommended next actions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <TrackedButton
                  href="/contact?intent=trial"
                  size="large"
                  eventName="layout_cta_click"
                  eventParams={{ location: 'footer_primary_lead_form' }}
                >
                  {CTA_LABELS.primary}
                </TrackedButton>
                <TrackedButton
                  variant="secondary"
                  href={SITE_CONFIG.appUrl}
                  size="large"
                  eventName="layout_cta_click"
                  eventParams={{ location: 'footer_secondary_create_account' }}
                >
                  {CTA_LABELS.secondary}
                </TrackedButton>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* Links Section */}
      <div className="border-t border-slate-800">
        <div className="container-default py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Link href="/" className="inline-flex items-center mb-4">
                <Image
                  src="/brand/lfm-logo-color-rgb-large-transparent.png"
                  alt="LeanFM Technologies"
                  width={1920}
                  height={453}
                  className="h-8 w-auto logo-cta-green"
                />
              </Link>
              <p className="text-body-sm text-slate-400 max-w-xs">
                Fault detection and diagnosis for building systems. Powered by Prescriptiv AI.
              </p>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-body-sm font-semibold text-white mb-4 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body-sm text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-default py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body-xs text-slate-500">
              &copy; {currentYear} LeanFM Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="text-body-xs text-slate-500 hover:text-cyan-400 transition-colors"
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
