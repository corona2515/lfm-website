'use client'

import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
  contactEmail: string
}

const WHITE_LOGO = { filter: 'brightness(0) invert(1)' } as const
const HAIRLINE = 'rgba(244,242,237,0.10)'

const PLATFORM_LINKS = [
  { href: '/platform.html', label: 'Overview' },
  { href: '/air.html', label: 'AIR' },
  { href: '/maple.html', label: 'Maple' },
  { href: '/fdd.html', label: 'Fault detection' },
  { href: '/reporting.html', label: 'Executive reporting' },
  { href: '/portfolio.html', label: 'Portfolio' },
]

const EXPLORE_LINKS = [
  { href: '/industries.html', label: 'Industries' },
  { href: '/results.html', label: 'Results' },
  { href: '/sample-report.html', label: 'Sample report' },
  { href: '/methodology.html', label: 'AIR methodology' },
  { href: '/insights.html', label: 'Insights' },
]

const COMPANY_LINKS = [
  { href: '/about.html', label: 'About' },
  { href: '/contact.html', label: 'Contact' },
  { href: '/security.html', label: 'Security' },
  { href: '/investors.html', label: 'Investors' },
]

export function Footer(_props: FooterProps) {
  const columns = [
    { title: 'Platform', links: PLATFORM_LINKS },
    { title: 'Explore', links: EXPLORE_LINKS },
    { title: 'Company', links: COMPANY_LINKS },
  ]

  return (
    <footer className="border-t bg-[#0a0b0e]" style={{ borderColor: HAIRLINE }}>
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center" aria-label="LeanFM Technologies">
              <Image
                src="/assets/img/leanfm-logo.png"
                alt="LeanFM Technologies"
                width={480}
                height={113}
                className="w-auto opacity-95"
                style={{ height: '28px', ...WHITE_LOGO }}
              />
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-[#99a1ad]">
              Building performance intelligence. Born at Carnegie Mellon.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="thermal-mono mb-4 text-[11px] uppercase tracking-[0.16em] text-[#868d99]">
                {column.title}
              </p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[#99a1ad] transition-colors hover:text-[#f5f3ee]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-start gap-4 border-t py-6 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: HAIRLINE }}
        >
          <span className="text-[12.5px] text-[#868d99]">© 2026 LeanFM Technologies</span>
          <span className="thermal-mono text-[11px] uppercase tracking-[0.14em] text-[#868d99]">
            Born at Carnegie Mellon University
          </span>
          <nav className="flex items-center gap-6">
            <Link href="/privacy.html" className="text-[12.5px] text-[#868d99] transition-colors hover:text-[#f5f3ee]">
              Privacy
            </Link>
            <Link href="/terms.html" className="text-[12.5px] text-[#868d99] transition-colors hover:text-[#f5f3ee]">
              Terms
            </Link>
            <a
              href="https://www.linkedin.com/company/leanfm-technologies"
              rel="noopener"
              className="text-[12.5px] text-[#868d99] transition-colors hover:text-[#f5f3ee]"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
