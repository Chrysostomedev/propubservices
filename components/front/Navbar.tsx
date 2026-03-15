'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle, ChevronRight } from 'lucide-react'

/* ── Nav links ──────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Services',   href: '/#services' },
  { label: 'Portfolio',  href: '/portfolio' },
  { label: 'Processus',  href: '/#processus' },
  { label: 'Contact',    href: '/contact' },
]

/* ── Logo ───────────────────────────────────────────────────────── */
function Logo() {
  return (
    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      {/* Icône */}
      <div style={{
        width: 40, height: 40,
        background: 'var(--bg-elevated)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: 'var(--r-sm)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 1, flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 9, color: 'var(--cream)', letterSpacing: 2,
        }}>PRO</span>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 9, color: 'var(--gold)', letterSpacing: 2,
        }}>PUB</span>
      </div>
      {/* Texte */}
      <div>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 14, color: 'var(--cream)', letterSpacing: 0.2,
          lineHeight: 1.2,
        }}>Pro-Pub Service</div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 10,
          color: 'var(--gold)', letterSpacing: 2.5,
          textTransform: 'uppercase', opacity: 0.8,
        }}>Yopougon · Abidjan</div>
      </div>
    </Link>
  )
}

/* ── Navbar ─────────────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 52)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer le menu mobile à chaque changement de route
  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'var(--bg-overlay)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background var(--t-slow), border-color var(--t-slow), backdrop-filter var(--t-slow)',
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 24px', height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Logo />

          {/* ── Desktop nav ─────────────────────────────────────── */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            aria-label="Navigation principale"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href.replace('/#', '/'))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
                    color: isActive ? 'var(--cream)' : 'var(--cream-55)',
                    padding: '6px 12px', borderRadius: 'var(--r-sm)',
                    transition: 'color var(--t-fast), background var(--t-fast)',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--cream)'
                    e.currentTarget.style.background = 'var(--cream-12)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = isActive ? 'var(--cream)' : 'var(--cream-55)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute', bottom: 2, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4, height: 4,
                      background: 'var(--gold)', borderRadius: '50%',
                    }}/>
                  )}
                </Link>
              )
            })}

            {/* CTA */}
            <Link href="/devis" style={{ marginLeft: 8 }}>
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'var(--gold)', color: '#0C0C0F',
                  padding: '9px 20px', borderRadius: 'var(--r-md)',
                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
                  letterSpacing: 0.3,
                }}
              >
                Devis gratuit
                <ChevronRight size={14} strokeWidth={2.5}/>
              </motion.span>
            </Link>

            {/* WA icon */}
            <motion.a
              href="https://wa.me/2250787636402"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 38, height: 38, borderRadius: 'var(--r-sm)',
                background: 'rgba(37, 211, 102, 0.12)',
                border: '1px solid rgba(37, 211, 102, 0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} color="#25D366"/>
            </motion.a>
          </nav>

          {/* ── Burger mobile ───────────────────────────────────── */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            style={{
              display: 'none', /* masqué par défaut ; visible via CSS media query */
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-md)',
              borderRadius: 'var(--r-sm)',
              width: 38, height: 38,
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--cream)', flexShrink: 0,
            }}
            className="navbar-burger"
          >
            {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border)',
              padding: '20px 24px 28px',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link href={link.href}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '13px 16px', borderRadius: 'var(--r-md)',
                      background: 'var(--bg-elevated)', color: 'var(--cream)',
                      fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500,
                    }}
                  >
                    {link.label}
                    <ChevronRight size={15} color="var(--cream-30)"/>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/devis" style={{ flex: 1 }}>
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  background: 'var(--gold)', color: '#0C0C0F',
                  padding: '13px', borderRadius: 'var(--r-md)',
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
                }}>
                  Devis gratuit <ChevronRight size={14}/>
                </span>
              </Link>
              <a href="https://wa.me/2250787636402" target="_blank" rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)',
                  color: '#25D366', padding: '13px 16px', borderRadius: 'var(--r-md)',
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                }}
              >
                <MessageCircle size={16}/> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav[aria-label="Navigation principale"] { display: none !important; }
          .navbar-burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}