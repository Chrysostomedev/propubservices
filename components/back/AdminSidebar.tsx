'use client'

import Link                        from 'next/link'
import { usePathname }             from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, ShoppingBag, Layers, Image,
  ChevronRight, X,
} from 'lucide-react'

const NAV = [
  { href: '/back/dashbaord', label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/back/commandes', label: 'Commandes',  icon: ShoppingBag     },
  { href: '/back/catalogue', label: 'Catalogue',  icon: Layers          },
  { href: '/back/galerie',   label: 'Galerie',    icon: Image           },
]

function Logo() {
  return (
    <Link href="/back/dashbaord" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', padding: '0 4px' }}>
      <div style={{
        width: 36, height: 36, background: '#2B2FD9',
        borderRadius: 8, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        boxShadow: '0 2px 10px rgba(43,47,217,0.45)',
      }}>
        <span style={{ fontWeight: 900, fontSize: 8, color: '#fff', letterSpacing: 1.5, lineHeight: 1.1 }}>PRO</span>
        <span style={{ fontWeight: 900, fontSize: 8, color: '#fff', letterSpacing: 1.5, lineHeight: 1.1 }}>PUB</span>
        <span style={{ fontWeight: 700, fontSize: 5, color: '#E8B84B', letterSpacing: 1.5, textTransform: 'uppercase', lineHeight: 1.6 }}>SERVICES</span>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--cream)', lineHeight: 1.2 }}>Pro-Pub</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, color: 'var(--cream-30)', letterSpacing: 2, textTransform: 'uppercase' }}>Admin</div>
      </div>
    </Link>
  )
}

function NavItem({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: React.ElementType; onClick?: () => void }) {
  const pathname = usePathname()
  const active   = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display:      'flex',
        alignItems:   'center',
        gap:          10,
        padding:      '10px 12px',
        borderRadius: 'var(--r-md)',
        background:   active ? 'var(--gold-bg)' : 'transparent',
        border:       `1px solid ${active ? 'var(--gold-border)' : 'transparent'}`,
        color:        active ? 'var(--gold)' : 'var(--cream-55)',
        fontFamily:   'var(--font-body)',
        fontSize:     14,
        fontWeight:   active ? 600 : 500,
        transition:   'all var(--t-fast)',
        textDecoration: 'none',
        position:     'relative',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--cream)' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cream-55)' } }}
    >
      <Icon size={16} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{label}</span>
      {active && <ChevronRight size={13} />}
    </Link>
  )
}

/* ── Sidebar desktop ────────────────────────────────────────────── */
export function AdminSidebar() {
  return (
    <aside style={{
      width:          240,
      flexShrink:     0,
      height:         '100vh',
      position:       'sticky',
      top:            0,
      background:     'var(--bg-surface)',
      borderRight:    '1px solid var(--border)',
      display:        'flex',
      flexDirection:  'column',
      padding:        '20px 12px',
      gap:            4,
      overflowY:      'auto',
    }}>
      <div style={{ marginBottom: 28, paddingLeft: 4 }}>
        <Logo />
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, color: 'var(--cream-30)', letterSpacing: 1.5, textTransform: 'uppercase', padding: '0 12px', marginBottom: 6 }}>
          Menu
        </p>
        {NAV.map(item => <NavItem key={item.href} {...item} />)}
      </nav>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 8 }}>
        <Link
          href="/front/services"
          target="_blank"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 12px', borderRadius: 'var(--r-md)',
            color: 'var(--cream-30)', fontFamily: 'var(--font-body)', fontSize: 12,
            textDecoration: 'none', transition: 'color var(--t-fast)',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream-30)')}
        >
          ↗ Voir le site
        </Link>
      </div>
    </aside>
  )
}

/* ── Sidebar mobile (drawer) ────────────────────────────────────── */
export function AdminSidebarDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.6)' }}
        >
          <motion.aside
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'fixed', top: 0, left: 0, bottom: 0, width: 260,
              background: 'var(--bg-surface)', borderRight: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', padding: '20px 12px',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, paddingLeft: 4 }}>
              <Logo />
              <button onClick={onClose} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--cream-55)' }}>
                <X size={14} />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              {NAV.map(item => <NavItem key={item.href} {...item} onClick={onClose} />)}
            </nav>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
