'use client'

/**
 * Modal.tsx
 * ─────────────────────────────────────────────────────────────────
 * Modale réutilisable avec :
 *  - Overlay sombre animé (Framer Motion)
 *  - Fermeture sur clic backdrop ou touche Escape
 *  - Scroll lock sur le body pendant l'ouverture
 *  - 3 tailles : sm / md / lg
 *  - Slot header / children / footer
 *  - Accessible (role=dialog, aria-modal, focus trap simplifié)
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, ReactNode } from 'react'
import { createPortal }                  from 'react-dom'
import { motion, AnimatePresence }       from 'framer-motion'
import { X }                             from 'lucide-react'

/* ── Types ──────────────────────────────────────────────────────── */
type ModalSize = 'sm' | 'md' | 'lg' | 'full'

interface ModalProps {
  open:        boolean
  onClose:     () => void
  title?:      string
  subtitle?:   string
  size?:       ModalSize
  footer?:     ReactNode   // Boutons d'action dans le bas de la modale
  children:    ReactNode
  hideClose?:  boolean     // Masquer le bouton ✕
}

/* ── Largeurs selon la taille ───────────────────────────────────── */
const SIZE_MAX: Record<ModalSize, string> = {
  sm:   '420px',
  md:   '600px',
  lg:   '840px',
  full: '96vw',
}

/* ── Variants Framer Motion ──────────────────────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.22 } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
}

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, scale: 0.96, y: 8,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
}

/* ── Modal ───────────────────────────────────────────────────────── */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  size = 'md',
  footer,
  children,
  hideClose = false,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  /* ── Scroll lock : empêche le body de scroller sous la modale ── */
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  /* ── Fermeture sur touche Escape ────────────────────────────── */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  /* ── Focus sur le panneau à l'ouverture ─────────────────────── */
  useEffect(() => {
    if (open) {
      // Petit délai pour laisser l'animation démarrer
      const t = setTimeout(() => panelRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open])

  /* ── Portal — rendu directement dans <body> ─────────────────── */
  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        /* Overlay */
        <motion.div
          key="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={onClose}  // clic sur l'overlay ferme la modale
          style={{
            position:  'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(8px)',
            display:   'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding:   '20px',
          }}
        >
          {/* Panneau — stopPropagation empêche la fermeture sur clic interne */}
          <motion.div
            ref={panelRef}
            key="modal-panel"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            style={{
              width:        '100%',
              maxWidth:     SIZE_MAX[size],
              maxHeight:    '90vh',
              background:   'var(--bg-surface)',
              border:       '1px solid var(--border-md)',
              borderRadius: 'var(--r-xl)',
              boxShadow:    'var(--shadow-lg)',
              display:      'flex',
              flexDirection: 'column',
              overflow:     'hidden',
              outline:      'none',
            }}
          >
            {/* ── Header ──────────────────────────────────────────── */}
            {(title || !hideClose) && (
              <div style={{
                display:      'flex',
                alignItems:   'flex-start',
                justifyContent: 'space-between',
                padding:      '22px 24px 0',
                flexShrink:   0,
              }}>
                <div>
                  {title && (
                    <h2
                      id="modal-title"
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontSize:      20,
                        fontWeight:    700,
                        color:         'var(--cream)',
                        letterSpacing: -0.4,
                        lineHeight:    1.2,
                        marginBottom:  subtitle ? 4 : 0,
                      }}
                    >
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   13,
                      color:      'var(--cream-55)',
                    }}>
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* Bouton fermer ✕ */}
                {!hideClose && (
                  <button
                    onClick={onClose}
                    aria-label="Fermer"
                    style={{
                      width:        32,
                      height:       32,
                      borderRadius: 'var(--r-sm)',
                      background:   'var(--bg-elevated)',
                      border:       '1px solid var(--border)',
                      color:        'var(--cream-55)',
                      display:      'flex',
                      alignItems:   'center',
                      justifyContent: 'center',
                      cursor:       'pointer',
                      flexShrink:   0,
                      marginLeft:   16,
                      transition:   'color var(--t-fast), background var(--t-fast)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--cream)'
                      e.currentTarget.style.background = 'var(--bg-hover)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--cream-55)'
                      e.currentTarget.style.background = 'var(--bg-elevated)'
                    }}
                  >
                    <X size={15}/>
                  </button>
                )}
              </div>
            )}

            {/* ── Body scrollable ─────────────────────────────────── */}
            <div style={{
              flex:       1,
              overflowY:  'auto',
              padding:    '20px 24px',
              /* Scrollbar discrète dans la modale */
            }}>
              {children}
            </div>

            {/* ── Footer optionnel ────────────────────────────────── */}
            {footer && (
              <div style={{
                padding:    '16px 24px 22px',
                borderTop:  '1px solid var(--border)',
                display:    'flex',
                gap:        10,
                justifyContent: 'flex-end',
                flexShrink: 0,
              }}>
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/* ── Hook utilitaire ─────────────────────────────────────────────── */
/**
 * useModal — gestion simple d'une modale
 * @example
 *   const { isOpen, open, close } = useModal()
 *   <Button onClick={open}>Ouvrir</Button>
 *   <Modal open={isOpen} onClose={close}>…</Modal>
 */
import { useState } from 'react'
export function useModal(initial = false) {
  const [isOpen, setIsOpen] = useState(initial)
  return {
    isOpen,
    open:   () => setIsOpen(true),
    close:  () => setIsOpen(false),
    toggle: () => setIsOpen(o => !o),
  }
}