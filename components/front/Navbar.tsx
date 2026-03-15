'use client'

import { useState, useEffect }     from 'react'
import Link                        from 'next/link'
import Image                       from 'next/image'
import { usePathname }             from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle }  from 'lucide-react'
import { ThemeToggle }             from '../ui/ThemeToggle'

const NAV_LINKS = [
  { label: 'Accueil',   href: '/'                  },
  { label: 'Services',  href: '/front/services'     },
  { label: 'Portfolio', href: '/front/galerie'      },
  { label: 'Processus', href: '/front/processus'    },
  { label: 'Contact',   href: '/front/contact'      },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  if (href.includes('#')) return pathname === href.split('#')[0]
  return pathname === href || pathname.startsWith(href + '/')
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header style={{
        position:       'fixed',
        top:            0, left: 0, right: 0,
        zIndex:         100,
        height:         68,
        background:     'var(--bg-surface)',
        borderBottom:   '1px solid var(--border-md)',
        backdropFilter: 'blur(20px) saturate(1.3)',
      }}>
        <div style={{
          maxWidth:       1280,
          margin:         '0 auto',
          padding:        '0 24px',
          height:         '100%',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            16,
        }}>

          {/* ── Logo ──────────────────────────────────────────── */}
          {/* Placez votre fichier logo dans /public/logo.png     */}
          <Link href="/" aria-label="Pro-Pub Service — Accueil" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
            <Image
              src="/images/logo.jpg"
              alt="Pro-Pub Service"
              height={44}
              width={0}
              priority
              style={{ height: 44, width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </Link>

          {/* ── Liens desktop (centre) ────────────────────────── */}
          <nav
            aria-label="Navigation principale"
            className="nav-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            {NAV_LINKS.map(link => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position:   'relative',
                    fontFamily: 'var(--font-body)',
                    fontSize:   14,
                    fontWeight: active ? 600 : 500,
                    color:      active ? 'var(--gold)' : 'var(--cream-80)',
                    padding:    '6px 14px',
                    borderRadius: 'var(--r-sm)',
                    whiteSpace: 'nowrap',
                    transition: 'color var(--t-fast)',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--cream)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--cream-80)' }}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute', bottom: 0, left: 14, right: 14,
                        height: 2, borderRadius: 2,
                        background: 'var(--gold)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── Droite : WhatsApp + ThemeToggle ──────────────── */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <motion.a
              href="https://wa.me/2250787636402"
              target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              aria-label="WhatsApp"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(37,211,102,0.10)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366',
                padding: '7px 14px', borderRadius: 'var(--r-sm)',
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              }}
            >
              <MessageCircle size={14} />
              WhatsApp
            </motion.a>
            <ThemeToggle />
          </div>

          {/* ── Mobile : ThemeToggle + burger ────────────────── */}
          <div className="nav-mobile" style={{ display: 'none', alignItems: 'center', gap: 8 }}>
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Fermer' : 'Menu'}
              aria-expanded={mobileOpen}
              style={{
                width: 38, height: 38,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-md)',
                borderRadius: 'var(--r-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--cream)',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Menu mobile ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99,
              background: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-md)',
              padding: '12px 20px 20px',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
              {NAV_LINKS.map((link, i) => {
                const active = isActive(pathname, link.href)
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px 14px', borderRadius: 'var(--r-md)',
                        background: active ? 'var(--gold-bg)' : 'var(--bg-elevated)',
                        color: active ? 'var(--gold)' : 'var(--cream-80)',
                        fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: active ? 600 : 500,
                        borderLeft: `3px solid ${active ? 'var(--gold)' : 'transparent'}`,
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
            <a
              href="https://wa.me/2250787636402"
              target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366', padding: '12px', borderRadius: 'var(--r-md)',
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
              }}
            >
              <MessageCircle size={16} /> WhatsApp direct
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  )
}