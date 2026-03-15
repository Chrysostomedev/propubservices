'use client'

/**
 * ThemeToggle.tsx
 * Bouton soleil / lune — dark ↔ light.
 * Le serveur rend data-theme="dark" sur <html>.
 * Le client lit localStorage au mount et corrige si besoin.
 */

import { useEffect, useState }     from 'react'
import { Sun, Moon }               from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  /* Démarre toujours sur "dark" pour matcher le SSR */
  const [theme,   setTheme]   = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    /* Lecture localStorage uniquement côté client, après hydration */
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (stored && stored !== 'dark') {
      setTheme(stored)
      document.documentElement.setAttribute('data-theme', stored)
    }
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  /* Placeholder identique en taille pour éviter le layout shift */
  if (!mounted) {
    return (
      <div style={{
        width: 38, height: 38,
        borderRadius: 'var(--r-sm)',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-md)',
      }} />
    )
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
      style={{
        width:          38,
        height:         38,
        borderRadius:   'var(--r-sm)',
        background:     'var(--bg-elevated)',
        border:         '1px solid var(--border-md)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         'pointer',
        flexShrink:     0,
        overflow:       'hidden',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="moon"
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{   rotate:  30,  opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ display: 'flex', color: 'var(--cream-55)' }}
          >
            <Moon size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 30,  opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{   rotate: -30,  opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ display: 'flex', color: 'var(--gold)' }}
          >
            <Sun size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
