'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'
import { NAV_LINKS, CTA_LABELS, SOLUTIONS_NAV_GROUPS } from '@/lib/constants'
import { Button } from '@/components/ui'

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isExploreOpen, setIsExploreOpen] = useState(false)
  const exploreMenuRef = useRef<HTMLDivElement>(null)
  const isSolutionsActive =
    pathname.startsWith('/solutions') ||
    pathname.startsWith('/industries') ||
    pathname === '/k12' ||
    pathname === '/sample-analysis' ||
    pathname === '/how-it-works' ||
    pathname === '/what-we-find' ||
    pathname === '/results' ||
    pathname === '/building-data-to-action' ||
    pathname === '/start'
  const isInvestorsPage = pathname === '/investors'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
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

  useEffect(() => {
    setIsExploreOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isExploreOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!exploreMenuRef.current?.contains(event.target as Node)) {
        setIsExploreOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExploreOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isExploreOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMobileMenuOpen
          ? 'border-b border-sky-100 bg-white/95 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl'
          : 'border-b border-sky-100/80 bg-white/90 backdrop-blur-lg'
      )}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/lfm-logo-color-rgb-large-transparent.png"
              alt="LeanFM Technologies"
              width={1920}
              height={453}
              priority
              className="h-8 w-auto md:h-9 logo-cta-green"
              style={{ height: '2.25rem', width: 'auto', maxWidth: '11rem' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <div className="relative" ref={exploreMenuRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isExploreOpen}
                onClick={() => setIsExploreOpen((open) => !open)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-body-sm transition-colors hover:bg-sky-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 ${
                  isSolutionsActive ? 'text-slate-950' : 'text-slate-700'
                }`}
              >
                Explore
                <svg
                  aria-hidden="true"
                  className={cn('h-4 w-4 transition-transform duration-200', isExploreOpen && 'rotate-180')}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div className={cn('absolute left-0 top-full z-50 pt-3', isExploreOpen ? 'block' : 'hidden')}>
                <div className="w-[34rem] rounded-2xl border border-sky-100 bg-white p-4 shadow-[0_24px_80px_rgba(30,64,175,0.16)] ring-1 ring-sky-100/70">
                  <div className="grid grid-cols-[0.9fr_1.1fr] gap-4">
                    {SOLUTIONS_NAV_GROUPS.map((group) => (
                      <div key={group.title}>
                        <p className="mb-2 px-3 text-body-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                          {group.title}
                        </p>
                        <div className="grid gap-1">
                          {group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setIsExploreOpen(false)}
                              className={`rounded-xl px-3 py-2.5 text-body-sm transition-colors hover:bg-sky-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 ${
                                pathname === link.href ? 'bg-sky-50 text-slate-950' : 'text-slate-700'
                              }`}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-body-sm text-slate-700 transition-colors hover:bg-sky-50 hover:text-slate-950"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            {!isInvestorsPage ? (
              <Button
                variant="ghost"
                size="small"
                href="/contact?intent=demo&source=header"
                className="text-slate-700 hover:bg-sky-50 hover:text-slate-950"
                onClick={() => trackEvent('cta_demo_click', { location: 'header_desktop_secondary' })}
              >
                {CTA_LABELS.secondary}
              </Button>
            ) : null}
            <Button
              size="small"
              href={isInvestorsPage ? '/contact?intent=investor&source=header_investors' : '/contact?intent=sample-analysis&source=header'}
              onClick={() => trackEvent(isInvestorsPage ? 'cta_investor_click' : 'cta_sample_analysis_click', { location: 'header_desktop_primary' })}
            >
              {isInvestorsPage ? 'Contact LeanFM' : CTA_LABELS.primary}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={cn(
              'lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200',
              isMobileMenuOpen
                ? 'border-sky-200 bg-sky-50 text-slate-950 shadow-lg shadow-sky-100/70'
                : 'border-transparent text-slate-700 hover:border-sky-100 hover:bg-sky-50 hover:text-slate-950'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <button
        type="button"
        aria-label="Close menu"
        aria-hidden={!isMobileMenuOpen}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        className={cn(
          'lg:hidden fixed inset-0 top-18 bg-slate-950/25 backdrop-blur-sm transition-opacity duration-300',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        id="mobile-navigation"
        className={cn(
          'lg:hidden fixed left-4 right-4 top-[5.25rem] origin-top transition-all duration-300',
          isMobileMenuOpen
            ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto'
            : '-translate-y-3 scale-95 opacity-0 pointer-events-none'
        )}
      >
        <div className="mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-sky-100 bg-white shadow-[0_28px_90px_rgba(30,64,175,0.20)] ring-1 ring-sky-100/70">
          <div className="border-b border-sky-100 px-5 py-4">
            <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Navigation
            </p>
            <p className="mt-2 max-w-xs text-body-sm text-slate-600">
              {isInvestorsPage
                ? 'Learn more about LeanFM or contact the team directly.'
                : 'Learn more about LeanFM or request a sample analysis.'}
            </p>
          </div>
          <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto px-3 py-3">
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-3">
                <p className="px-2 pb-2 text-body-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Explore
                </p>
                {SOLUTIONS_NAV_GROUPS.map((group) => (
                  <div key={group.title} className="py-2">
                    <p className="px-2 pb-2 text-body-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {group.title}
                    </p>
                    <div className="grid gap-1">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`rounded-xl border px-3 py-3 text-body-md font-medium transition-all hover:border-sky-200 hover:bg-white hover:text-slate-950 ${
                            pathname === link.href
                              ? 'border-sky-200 bg-white text-slate-950'
                              : 'border-transparent text-slate-700'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-transparent px-4 py-4 text-body-lg font-medium text-slate-700 transition-all hover:border-sky-200 hover:bg-sky-50 hover:text-slate-950"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-sky-100 px-2 pt-4">
              <div className="flex flex-col gap-3">
                {!isInvestorsPage ? (
                  <Button
                    variant="ghost"
                    href="/contact?intent=demo&source=header_mobile"
                    className="w-full justify-center rounded-2xl border border-sky-200 bg-white text-slate-900 hover:bg-sky-50"
                    onClick={() => trackEvent('cta_demo_click', { location: 'header_mobile_secondary' })}
                  >
                    {CTA_LABELS.secondary}
                  </Button>
                ) : null}
                <Button
                  href={isInvestorsPage ? '/contact?intent=investor&source=header_investors_mobile' : '/contact?intent=sample-analysis&source=header_mobile'}
                  className="w-full justify-center rounded-2xl"
                  onClick={() => trackEvent(isInvestorsPage ? 'cta_investor_click' : 'cta_sample_analysis_click', { location: 'header_mobile_primary' })}
                >
                  {isInvestorsPage ? 'Contact LeanFM' : CTA_LABELS.primary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
