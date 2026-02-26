'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'
import { NAV_LINKS, SITE_CONFIG, CTA_LABELS } from '@/lib/constants'
import { Button } from '@/components/ui'

export function Header() {
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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
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
              href={SITE_CONFIG.appUrl}
              onClick={() => trackEvent('create_account_click', { source: 'header_desktop_create_account' })}
            >
              {CTA_LABELS.secondary}
            </Button>
            <Button
              size="small"
              href="/contact?intent=trial"
              onClick={() => trackEvent('demo_request', { source: 'header_desktop_lead_form' })}
            >
              {CTA_LABELS.primary}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
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
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-18 bg-slate-950/98 backdrop-blur-lg transition-all duration-300',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="container-default py-8">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-4 text-body-lg text-slate-200 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <Button
              variant="ghost"
              href={SITE_CONFIG.appUrl}
              className="w-full justify-center"
              onClick={() => trackEvent('create_account_click', { source: 'header_mobile_create_account' })}
            >
              {CTA_LABELS.secondary}
            </Button>
            <Button
              href="/contact?intent=trial"
              className="w-full justify-center"
              onClick={() => trackEvent('demo_request', { source: 'header_mobile_lead_form' })}
            >
              {CTA_LABELS.primary}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
