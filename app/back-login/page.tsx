'use client'

import { useState }                from 'react'
import { useRouter }               from 'next/navigation'
import { motion }                  from 'framer-motion'
import { Eye, EyeOff, LogIn, Lock, Mail } from 'lucide-react'

/* Particules — valeurs fixes pour éviter le hydration mismatch (pas de Math.random au module level) */
const PARTICLES = [
  { id:  0, x: 13.8,  y:  5.6,  size: 3.9, dur: 5.2, delay: 0.0, color: '#E8B84B' },
  { id:  1, x: 89.3,  y: 98.0,  size: 4.0, dur: 7.1, delay: 1.2, color: '#3B40E8' },
  { id:  2, x:  8.3,  y: 17.4,  size: 4.1, dur: 6.3, delay: 0.5, color: '#3B40E8' },
  { id:  3, x: 89.5,  y: 36.2,  size: 4.1, dur: 4.8, delay: 2.1, color: '#E8B84B' },
  { id:  4, x:  7.8,  y: 93.7,  size: 5.0, dur: 8.0, delay: 0.3, color: '#3B40E8' },
  { id:  5, x: 44.8,  y: 22.7,  size: 2.1, dur: 5.5, delay: 3.0, color: '#3B40E8' },
  { id:  6, x: 96.2,  y: 16.4,  size: 5.9, dur: 6.8, delay: 1.8, color: '#E8B84B' },
  { id:  7, x: 75.6,  y: 81.1,  size: 2.7, dur: 4.4, delay: 0.9, color: '#3B40E8' },
  { id:  8, x: 33.1,  y: 26.8,  size: 3.5, dur: 7.5, delay: 2.4, color: '#3B40E8' },
  { id:  9, x: 57.7,  y: 91.4,  size: 5.0, dur: 5.9, delay: 1.5, color: '#E8B84B' },
  { id: 10, x: 21.2,  y: 90.6,  size: 4.4, dur: 6.1, delay: 0.7, color: '#3B40E8' },
  { id: 11, x: 55.6,  y: 95.9,  size: 3.1, dur: 4.9, delay: 3.5, color: '#E8B84B' },
  { id: 12, x: 55.2,  y: 49.4,  size: 3.0, dur: 7.2, delay: 1.1, color: '#3B40E8' },
  { id: 13, x: 63.0,  y: 56.8,  size: 4.6, dur: 5.7, delay: 2.8, color: '#3B40E8' },
  { id: 14, x: 29.5,  y: 19.7,  size: 2.9, dur: 6.4, delay: 0.4, color: '#E8B84B' },
  { id: 15, x: 42.9,  y: 93.8,  size: 5.7, dur: 8.2, delay: 1.9, color: '#3B40E8' },
  { id: 16, x: 29.1,  y: 41.3,  size: 4.0, dur: 5.3, delay: 0.6, color: '#3B40E8' },
  { id: 17, x: 62.9,  y: 56.8,  size: 3.5, dur: 7.0, delay: 2.2, color: '#3B40E8' },
]

export default function BackLoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    /* TODO: brancher Firebase Auth signInWithEmailAndPassword */
    await new Promise(r => setTimeout(r, 900))
    if (email === 'admin@propub.ci' && password === 'admin123') {
      router.push('/back/dashbaord')
    } else {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight:      '100vh',
      background:     'var(--bg-base)',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      position:       'relative',
      overflow:       'hidden',
      padding:        '24px',
    }}>

      {/* ── Fond géométrique animé ─────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Grille */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59,64,232,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,64,232,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />

        {/* Glow bleu centre */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '30%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(43,47,217,0.22) 0%, transparent 70%)',
          }}
        />

        {/* Glow accent coin */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '10%', right: '10%',
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,184,75,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Particules */}
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              borderRadius: '50%',
              background: p.color,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* ── Card login ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width:        '100%',
          maxWidth:     420,
          background:   'var(--bg-surface)',
          border:       '1px solid var(--border-md)',
          borderRadius: 'var(--r-xl)',
          padding:      'clamp(28px, 6vw, 48px)',
          boxShadow:    '0 24px 64px rgba(0,0,0,0.5)',
          position:     'relative',
          zIndex:       1,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <div style={{
            width: 44, height: 44, background: '#2B2FD9',
            borderRadius: 10, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(43,47,217,0.5)',
          }}>
            <span style={{ fontWeight: 900, fontSize: 9, color: '#fff', letterSpacing: 1.5, lineHeight: 1.1 }}>PRO</span>
            <span style={{ fontWeight: 900, fontSize: 9, color: '#fff', letterSpacing: 1.5, lineHeight: 1.1 }}>PUB</span>
            <span style={{ fontWeight: 700, fontSize: 5.5, color: '#E8B84B', letterSpacing: 1.5, textTransform: 'uppercase', lineHeight: 1.6 }}>SERVICES</span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--cream)' }}>Pro-Pub Service</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--cream-30)', letterSpacing: 1.5, textTransform: 'uppercase' }}>Back-office</div>
          </div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.4, marginBottom: 6 }}>
          Connexion
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', marginBottom: 28 }}>
          Accès réservé aux administrateurs
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Email */}
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={14} color="var(--cream-30)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@propub.ci"
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '11px 12px 11px 36px',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border-md)',
                  borderRadius: 'var(--r-md)', color: 'var(--cream)',
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  outline: 'none', transition: 'border-color var(--t-fast)',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border-md)')}
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 6 }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} color="var(--cream-30)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '11px 40px 11px 36px',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border-md)',
                  borderRadius: 'var(--r-md)', color: 'var(--cream)',
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  outline: 'none', transition: 'border-color var(--t-fast)',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border-md)')}
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cream-30)',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)',
                background: 'var(--red-bg)', border: '1px solid var(--red-border)',
                borderRadius: 'var(--r-sm)', padding: '8px 12px',
              }}
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: loading ? 'var(--gold-dim)' : 'var(--gold)',
              color: '#fff', border: 'none', borderRadius: 'var(--r-md)',
              padding: '13px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background var(--t-fast)',
              marginTop: 4,
            }}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
              />
            ) : (
              <><LogIn size={15} /> Se connecter</>
            )}
          </motion.button>
        </form>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--cream-30)', textAlign: 'center', marginTop: 20 }}>
          Demo : admin@propub.ci / admin123
        </p>
      </motion.div>
    </div>
  )
}
