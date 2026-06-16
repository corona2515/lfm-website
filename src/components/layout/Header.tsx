'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

const WHITE_LOGO = { filter: 'brightness(0) invert(1)' } as const

const PLATFORM_LINKS = [
  { href: '/platform.html', label: 'Platform', sub: 'The platform, end to end' },
  { href: '/air.html', label: 'AIR', sub: 'The performance score' },
  { href: '/maple.html', label: 'Maple', sub: 'The virtual engineer' },
  { href: '/fdd.html', label: 'Fault detection', sub: 'Prescriptiv engine' },
  { href: '/reporting.html', label: 'Executive reporting', sub: 'Dollars, not data dumps' },
  { href: '/portfolio.html', label: 'Portfolio', sub: 'Every building, ranked' },
] as const

const COMPANY_LINKS = [
  { href: '/industries.html', label: 'Industries', sub: 'Where LeanFM works' },
  { href: '/results.html', label: 'Results', sub: 'Found money, on the record' },
  { href: '/about.html', label: 'About', sub: 'Born at Carnegie Mellon' },
  { href: '/contact.html', label: 'Contact', sub: 'Talk to LeanFM' },
] as const

const HAIRLINE = 'rgba(244,242,237,0.10)'

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<null | 'platform' | 'company'>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  // Close menus on route change
  useEffect(() => {
    setOpenMenu(null)
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close dropdowns on outside click / Escape
  useEffect(() => {
    if (!openMenu) {
      return
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenMenu(null)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenu(null)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openMenu])

  const renderDropdown = (
    key: 'platform' | 'company',
    label: string,
    links: ReadonlyArray<{ href: string; label: string; sub: string }>
  ) => {
    const isOpen = openMenu === key
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpenMenu(key)}
        onMouseLeave={() => setOpenMenu((current) => (current === key ? null : current))}
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setOpenMenu((current) => (current === key ? null : key))}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14.5px] transition-colors',
            isOpen ? 'text-[#f5f3ee]' : 'text-[#99a1ad] hover:text-[#f5f3ee]'
          )}
        >
          {label}
          <svg
            aria-hidden="true"
            className={cn('h-3.5 w-3.5 transition-transform duration-200', isOpen && 'rotate-180')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div className={cn('absolute left-0 top-full z-50 pt-3', isOpen ? 'block' : 'hidden')}>
          <div
            className="relative min-w-[16rem] overflow-hidden rounded-2xl border border-[#f4f2ed]/[0.16] bg-[#12151c]/95 p-2 shadow-[0_26px_64px_-22px_rgba(0,0,0,0.75)] backdrop-blur-xl"
          >
            <span
              className="absolute inset-x-0 top-0 h-px opacity-60"
              style={{ background: 'linear-gradient(90deg,#6366f1,#22d3ee,#2dd4a7,#f5b020,#f2622e)' }}
            />
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenMenu(null)}
                className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
              >
                <span className="text-[14px] font-medium text-[#f5f3ee]">{link.label}</span>
                <span className="text-[12px] text-[#868d99]">{link.sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[76px] transition-all duration-300',
        isScrolled || isMobileMenuOpen
          ? 'border-b bg-[#0a0b0e]/80 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-[#0a0b0e]/30 backdrop-blur-md'
      )}
      style={isScrolled || isMobileMenuOpen ? { borderBottomColor: HAIRLINE } : undefined}
    >
      <nav className="mx-auto flex h-full w-full max-w-[1240px] items-center gap-11 px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="LeanFM Technologies">
          <Image
            src="/assets/img/leanfm-logo.png"
            alt="LeanFM Technologies"
            width={480}
            height={113}
            priority
            className="w-auto opacity-95"
            style={{ height: '28px', ...WHITE_LOGO }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {renderDropdown('platform', 'Platform', PLATFORM_LINKS)}
          <Link
            href="/results.html"
            className="rounded-lg px-3 py-2 text-[14.5px] text-[#99a1ad] transition-colors hover:text-[#f5f3ee]"
          >
            Results
          </Link>
          {renderDropdown('company', 'Company', COMPANY_LINKS)}
        </div>

        {/* Desktop CTAs */}
        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <Link
            href="/sample-report.html"
            className="thermal-btn-secondary !px-5 !py-2.5 !text-[14px]"
            onClick={() => trackEvent('cta_sample_report_click', { location: 'header_desktop_secondary' })}
          >
            See a sample report
          </Link>
          <Link
            href="/start"
            className="thermal-btn-primary !px-5 !py-2.5 !text-[14px]"
            onClick={() => trackEvent('cta_sample_analysis_click', { location: 'header_desktop_primary' })}
          >
            Request a sample analysis
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={cn(
            'ml-auto flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 lg:hidden',
            isMobileMenuOpen
              ? 'border-[#f4f2ed]/20 bg-white/5 text-[#f5f3ee]'
              : 'border-transparent text-[#f5f3ee] hover:bg-white/5'
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <button
        type="button"
        aria-label="Close menu"
        aria-hidden={!isMobileMenuOpen}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        className={cn(
          'fixed inset-0 top-[76px] bg-[#0a0b0e]/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        id="mobile-navigation"
        className={cn(
          'fixed inset-x-4 top-[5.25rem] origin-top transition-all duration-300 lg:hidden',
          isMobileMenuOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-3 scale-95 opacity-0'
        )}
      >
        <div
          className="mx-auto max-h-[calc(100dvh-7rem)] max-w-md overflow-y-auto rounded-[1.75rem] border bg-[#14171e] shadow-[0_28px_90px_rgba(0,0,0,0.6)]"
          style={{ borderColor: HAIRLINE }}
        >
          <div className="border-b px-5 py-4" style={{ borderColor: HAIRLINE }}>
            <p className="thermal-mono text-[11px] uppercase tracking-[0.18em] text-[#868d99]">Navigation</p>
            <p className="mt-2 max-w-xs text-[14px] text-[#99a1ad]">
              Building performance intelligence. Born at Carnegie Mellon.
            </p>
          </div>
          <div className="px-4 py-4">
            <p className="thermal-mono px-1 pb-2 text-[11px] uppercase tracking-[0.14em] text-[#868d99]">Platform</p>
            <div className="grid gap-1">
              {PLATFORM_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-[16px] font-medium text-[#f5f3ee] transition-colors hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="thermal-mono px-1 pb-2 pt-5 text-[11px] uppercase tracking-[0.14em] text-[#868d99]">Company</p>
            <div className="grid gap-1">
              <Link
                href="/results.html"
                className="rounded-xl px-3 py-3 text-[16px] font-medium text-[#f5f3ee] transition-colors hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Results
              </Link>
              {COMPANY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-[16px] font-medium text-[#f5f3ee] transition-colors hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t pt-5" style={{ borderColor: HAIRLINE }}>
              <Link
                href="/sample-report.html"
                className="thermal-btn-secondary w-full"
                onClick={() => {
                  trackEvent('cta_sample_report_click', { location: 'header_mobile_secondary' })
                  setIsMobileMenuOpen(false)
                }}
              >
                See a sample report
              </Link>
              <Link
                href="/start"
                className="thermal-btn-primary w-full"
                onClick={() => {
                  trackEvent('cta_sample_analysis_click', { location: 'header_mobile_primary' })
                  setIsMobileMenuOpen(false)
                }}
              >
                Request a sample analysis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
