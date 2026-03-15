'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence }     from 'framer-motion'
import { X, User, Camera, Save, Check } from 'lucide-react'

export function ProfilePanel({ onClose }: { onClose: () => void }) {
  const [name,   setName]   = useState('Admin Pro-Pub')
  const [role,   setRole]   = useState('Administrateur')
  const [avatar, setAvatar] = useState<string | null>(null)
  const [saved,  setSaved]  = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  /* Charger avatar depuis localStorage au mount */
  useEffect(() => {
    const stored = localStorage.getItem('admin_avatar')
    if (stored) setAvatar(stored)
    const storedName = localStorage.getItem('admin_name')
    if (storedName) setName(storedName)
    const storedRole = localStorage.getItem('admin_role')
    if (storedRole) setRole(storedRole)
  }, [])

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string
      setAvatar(dataUrl)
      localStorage.setItem('admin_avatar', dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    localStorage.setItem('admin_name', name)
    localStorage.setItem('admin_role', role)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '10px 14px',
    background: 'var(--bg-elevated)', border: '1px solid var(--border-md)',
    borderRadius: 'var(--r-md)', color: 'var(--cream)',
    fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
    transition: 'border-color var(--t-fast)',
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="profile-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)' }}
      />

      {/* Panel */}
      <motion.aside
        key="profile-panel"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
          width: 'min(380px, 100vw)',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-md)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <User size={15} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--cream)' }}>Mon profil</span>
          </div>
          <button onClick={onClose} style={{ width: 28, height: 28, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--cream-55)' }}>
            <X size={13} />
          </button>
        </div>

        {/* Corps */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 22px', display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* Avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 84, height: 84, borderRadius: '50%',
                background: 'var(--gold-bg)', border: '2px solid var(--gold-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {avatar
                  /* eslint-disable-next-line @next/next/no-img-element */
                  ? <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <User size={30} color="var(--gold)" />
                }
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                title="Changer la photo"
                style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 26, height: 26, borderRadius: '50%',
                  background: 'var(--gold)', border: '2px solid var(--bg-surface)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff',
                }}
              >
                <Camera size={11} />
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} style={{ display: 'none' }} />
            {avatar && (
              <button
                onClick={() => { setAvatar(null); localStorage.removeItem('admin_avatar') }}
                style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Supprimer la photo
              </button>
            )}
          </div>

          {/* Champs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Nom affiché</label>
              <input value={name} onChange={e => setName(e.target.value)} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border-md)')} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Rôle</label>
              <input value={role} onChange={e => setRole(e.target.value)} style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border-md)')} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Email</label>
              <input value="admin@propub.ci" readOnly style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }} />
            </div>
          </div>

          <div style={{ height: 1, background: 'var(--border)' }} />

          {/* Infos compte */}
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '14px 16px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, color: 'var(--cream-30)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Compte</p>
            {[
              { label: 'Statut',       value: 'Actif' },
              { label: 'Accès',        value: 'Admin complet' },
              { label: 'Dernière co.', value: "Aujourd'hui" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-55)' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--cream)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px', background: saved ? 'var(--green)' : 'var(--gold)',
              border: 'none', borderRadius: 'var(--r-md)',
              color: '#fff', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', transition: 'background var(--t-fast)',
            }}
          >
            {saved ? <><Check size={14} /> Enregistré</> : <><Save size={14} /> Enregistrer</>}
          </motion.button>
        </div>
      </motion.aside>
    </>
  )
}
