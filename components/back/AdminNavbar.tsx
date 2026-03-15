'use client'

import { useState }   from 'react'
import { useRouter }  from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, LogOut, User, Bell } from 'lucide-react'
import { ThemeToggle }        from '../ui/ThemeToggle'
import { AdminSidebarDrawer } from './AdminSidebar'
import { NotifPanel }         from './NotifPanel'
import { ProfilePanel }       from './ProfilePanel'

/* Admin statique — TODO: brancher auth store */
const ADMIN = { name: 'Admin Pro-Pub', role: 'Administrateur' }

export function AdminNavbar() {
  const [drawerOpen,  setDrawerOpen]  = useState(false)
  const [notifOpen,   setNotifOpen]   = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push('/back-login')
  }

  return (
    <>
      <header style={{
        height:         60,
        background:     'var(--bg-surface)',
        borderBottom:   '1px solid var(--border)',
        display:        'flex',
        alignItems:     'center',
        padding:        '0 20px',
        gap:            12,
        position:       'sticky',
        top:            0,
        zIndex:         50,
        flexShrink:     0,
      }}>
        {/* Burger mobile */}
        <button
          className="admin-burger"
          onClick={() => setDrawerOpen(true)}
          aria-label="Menu"
          style={{
            display: 'none', width: 36, height: 36,
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            borderRadius: 6, alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--cream)', flexShrink: 0,
          }}
        >
          <Menu size={16} />
        </button>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Notif */}
        <motion.button
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          onClick={() => setNotifOpen(true)}
          aria-label="Notifications"
          style={{
            position: 'relative', width: 36, height: 36,
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--cream-55)',
          }}
        >
          <Bell size={15} />
          <span style={{
            position: 'absolute', top: 7, right: 7,
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--gold)', border: '1.5px solid var(--bg-surface)',
          }} />
        </motion.button>

        <ThemeToggle />

        {/* Admin info */}
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setProfileOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', borderRadius: 8,
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--gold-bg)', border: '1px solid var(--gold-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={13} color="var(--gold)" />
          </div>
          <div className="admin-name-block" style={{ lineHeight: 1.2 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--cream)', whiteSpace: 'nowrap' }}>
              {ADMIN.name}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--cream-30)' }}>
              {ADMIN.role}
            </div>
          </div>
        </motion.button>

        {/* Déconnexion */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          aria-label="Se déconnecter"
          title="Se déconnecter"
          style={{
            width: 36, height: 36,
            background: 'var(--red-bg)', border: '1px solid var(--red-border)',
            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--red)', flexShrink: 0,
          }}
        >
          <LogOut size={15} />
        </motion.button>
      </header>

      <AdminSidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <AnimatePresence mode="wait">
        {notifOpen   && <NotifPanel   key="notif-panel"   onClose={() => setNotifOpen(false)}   />}
        {profileOpen && <ProfilePanel key="profile-panel" onClose={() => setProfileOpen(false)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .admin-burger     { display: flex !important; }
          .admin-name-block { display: none !important; }
        }
      `}</style>
    </>
  )
}
