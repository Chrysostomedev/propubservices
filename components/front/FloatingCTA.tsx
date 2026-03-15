'use client'

/**
 * FloatingCTA.tsx
 * ─────────────────────────────────────────────────────────────────
 * Bouton d'action flottant (bas-droite) pour Pro-Pub Service.
 *
 * Comportement :
 *  - Apparaît après 2s ou dès que l'utilisateur a scrollé > 200px
 *  - Se rétracte quand l'utilisateur scroll vers le bas (UX propre)
 *  - Réapparaît dès qu'il remonte
 *  - Au clic : mini-drawer avec liens WhatsApp + devis + téléphone
 *  - Spring animation (Framer Motion) pour la fluidité
 *
 * Accessibilité :
 *  - aria-expanded sur le bouton principal
 *  - Focus trap simplifié dans le drawer
 * ─────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence }     from 'framer-motion'
import {
  MessageCircle, Phone, FileText,
  X, ChevronRight,
}                                      from 'lucide-react'

/* ── Actions dans le drawer ─────────────────────────────────────── */
const ACTIONS = [
  {
    id:      'whatsapp',
    label:   'WhatsApp direct',
    sublabel: '+225 07 87 63 64 02',
    href:    'https://wa.me/2250787636402',
    icon:    MessageCircle,
    color:   '#25D366',
    bg:      'rgba(37,211,102,0.10)',
    border:  'rgba(37,211,102,0.22)',
    external: true,
  },
  {
    id:      'devis',
    label:   'Demander un devis',
    sublabel: 'Réponse sous 48h',
    href:    '/devis',
    icon:    FileText,
    color:   'var(--gold)',
    bg:      'var(--gold-bg)',
    border:  'var(--gold-border)',
    external: false,
  },
  {
    id:      'phone',
    label:   'Appeler maintenant',
    sublabel: '+225 07 87 63 64 02',
    href:    'tel:+2250787636402',
    icon:    Phone,
    color:   'var(--blue)',
    bg:      'var(--blue-bg)',
    border:  'var(--blue-border)',
    external: false,
  },
]

/* ── FloatingCTA ─────────────────────────────────────────────────── */
export function FloatingCTA() {
  const [visible, setVisible]  = useState(false)    // après délai ou scroll
  const [expanded, setExpanded] = useState(false)   // drawer ouvert
  const [hidden, setHidden]    = useState(false)    // caché au scroll down

  const lastScrollY = useRef(0)
  const drawerRef   = useRef<HTMLDivElement>(null)

  /* ── Affichage initial après 2 secondes ─────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  /* ── Scroll : affiche/masque selon la direction ─────────────── */
  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY

      /* Dès 200px de scroll, on est visible (sans attendre les 2s) */
      if (currentY > 200) setVisible(true)

      /* Scroll vers le bas → masquer ; vers le haut → afficher */
      if (currentY > lastScrollY.current + 8) {
        setHidden(true)
        setExpanded(false)    // ferme aussi le drawer
      } else if (currentY < lastScrollY.current - 8) {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  /* ── Fermeture du drawer sur touche Escape ──────────────────── */
  useEffect(() => {
    if (!expanded) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [expanded])

  /* Pas de rendu avant l'hydratation */
  if (!visible) return null

  return (
    <>
      {/* ── Overlay cliquable derrière le drawer ─────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 88,
              background: 'rgba(0,0,0,0.35)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Container principal (positionné en bas-droite) ─────── */}
      <motion.div
        animate={{ y: hidden ? 100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          position: 'fixed',
          bottom:   28,
          right:    24,
          zIndex:   90,
          display:  'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap:      10,
        }}
      >
        {/* ── Drawer d'actions ──────────────────────────────────── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              ref={drawerRef}
              key="drawer"
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background:   'var(--bg-surface)',
                border:       '1px solid var(--border-md)',
                borderRadius: 'var(--r-xl)',
                padding:      '16px',
                width:        260,
                boxShadow:    'var(--shadow-lg)',
                display:      'flex',
                flexDirection: 'column',
                gap:          8,
              }}
            >
              {/* Titre du drawer */}
              <p style={{
                fontFamily:    'var(--font-display)',
                fontSize:      12,
                fontWeight:    700,
                color:         'var(--cream-30)',
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom:  4,
                paddingLeft:   4,
              }}>
                Nous contacter
              </p>

              {/* Liens d'action */}
              {ACTIONS.map(action => {
                const Icon = action.icon
                return (
                  <a
                    key={action.id}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noreferrer' : undefined}
                    onClick={() => setExpanded(false)}
                    style={{
                      display:      'flex',
                      alignItems:   'center',
                      gap:          12,
                      padding:      '11px 14px',
                      borderRadius: 'var(--r-md)',
                      background:   action.bg,
                      border:       `1px solid ${action.border}`,
                      textDecoration: 'none',
                      transition:   'opacity var(--t-fast)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {/* Icône */}
                    <div style={{
                      width:        36,
                      height:       36,
                      borderRadius: 'var(--r-sm)',
                      background:   'rgba(0,0,0,0.2)',
                      display:      'flex',
                      alignItems:   'center',
                      justifyContent: 'center',
                      flexShrink:   0,
                    }}>
                      <Icon size={17} color={action.color}/>
                    </div>

                    {/* Labels */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   13,
                        fontWeight: 600,
                        color:      action.color,
                        lineHeight: 1.2,
                      }}>
                        {action.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize:   11,
                        color:      'var(--cream-30)',
                        marginTop:  2,
                      }}>
                        {action.sublabel}
                      </div>
                    </div>

                    <ChevronRight size={14} color="var(--cream-30)"/>
                  </a>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bouton principal WhatsApp / fermer ────────────────── */}
        <motion.button
          onClick={() => setExpanded(o => !o)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Fermer le menu contact' : 'Ouvrir le menu contact'}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width:        58,
            height:       58,
            borderRadius: '50%',
            background:   expanded ? 'var(--bg-elevated)' : '#25D366',
            border:       expanded ? '1px solid var(--border-md)' : 'none',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            cursor:       'pointer',
            boxShadow:    expanded
              ? 'var(--shadow-md)'
              : '0 8px 28px rgba(37,211,102,0.4)',
            transition:   'background var(--t-fast), border var(--t-fast), box-shadow var(--t-fast)',
            color:        expanded ? 'var(--cream)' : '#fff',
          }}
        >
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {expanded
              ? <X size={22}/>
              : <MessageCircle size={24} fill="rgba(255,255,255,0.2)"/>
            }
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  )
}