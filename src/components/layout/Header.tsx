'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'
import { NAV_LINKS, CTA_LABELS } from '@/lib/constants'
import { Button } from '@/components/ui'

interface HeaderProps {
  appUrl: string
}

export function Header({ appUrl }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMobileMenuOpen
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/70'
          : 'bg-slate-950/85 backdrop-blur-lg border-b border-slate-800/30'
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
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-body-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/40"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="small"
              href={appUrl}
              onClick={() => trackEvent('cta_upload_sample_click', { location: 'header_desktop_secondary' })}
            >
              {CTA_LABELS.secondary}
            </Button>
            <Button
              size="small"
              href="/contact?intent=demo"
              onClick={() => trackEvent('cta_demo_click', { location: 'header_desktop_primary' })}
            >
              {CTA_LABELS.primary}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={cn(
              'lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200',
              isMobileMenuOpen
                ? 'border-slate-700/80 bg-slate-800/80 text-white shadow-lg shadow-slate-950/30'
                : 'border-transparent text-slate-300 hover:border-slate-800/80 hover:bg-slate-800/50 hover:text-white'
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
          'lg:hidden fixed inset-0 top-18 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300',
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
        <div className="mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-slate-700/80 bg-[linear-gradient(180deg,rgba(20,34,50,0.98)_0%,rgba(7,13,20,0.98)_100%)] shadow-[0_28px_90px_rgba(2,6,23,0.55)] ring-1 ring-white/5">
          <div className="border-b border-slate-800/80 px-5 py-4">
            <p className="text-body-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
              Navigation
            </p>
            <p className="mt-2 max-w-xs text-body-sm text-slate-400">
              Learn more about LeanFM or jump straight into a demo.
            </p>
          </div>
          <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto px-3 py-3">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-transparent px-4 py-4 text-body-lg font-medium text-slate-100 transition-all hover:border-slate-700/80 hover:bg-slate-800/75 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-slate-800/80 px-2 pt-4">
              <div className="flex flex-col gap-3">
                <Button
                  variant="ghost"
                  href={appUrl}
                  className="w-full justify-center rounded-2xl border border-slate-700/80 bg-slate-900/60"
                  onClick={() => trackEvent('cta_upload_sample_click', { location: 'header_mobile_secondary' })}
                >
                  {CTA_LABELS.secondary}
                </Button>
                <Button
                  href="/contact?intent=demo"
                  className="w-full justify-center rounded-2xl"
                  onClick={() => trackEvent('cta_demo_click', { location: 'header_mobile_primary' })}
                >
                  {CTA_LABELS.primary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
