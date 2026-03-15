'use client'

/**
 * MediaCard.tsx
 * ─────────────────────────────────────────────────────────────────
 * Carte média pour le portfolio public et la médiathèque admin.
 *
 * Supporte :
 *  - image   → <img> avec objectFit cover
 *  - video   → <video> muet en autoplay loop (preview)
 *  - flyer   → <img> avec indicateur PDF/Flyer
 *
 * Comportement hover :
 *  - Overlay sombre progressif
 *  - Titre + badge type visibles
 *  - Bouton "Voir en grand" (déclenche onExpand)
 *
 * Variants :
 *  - 'grid'    → ratio carré (portfolio)
 *  - 'wide'    → ratio 16/9 (bandeau hero, highlights)
 *  - 'portrait'→ ratio 3/4  (flyers verticaux)
 * ─────────────────────────────────────────────────────────────────
 */

import { useState }              from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Expand, Film, FileText, Image as ImageIcon } from 'lucide-react'
import type { Media, MediaType } from './PortfolioGrid'

/* ── Types ──────────────────────────────────────────────────────── */
type CardVariant = 'grid' | 'wide' | 'portrait'

interface MediaCardProps {
  media:      Media
  variant?:   CardVariant
  onExpand?:  (media: Media) => void   // ouvre le lightbox
  showTitle?: boolean
  animated?:  boolean                  // animation d'entrée (viewport)
  delay?:     number                   // délai stagger
}

/* ── Ratios d'aspect selon le variant ───────────────────────────── */
const RATIOS: Record<CardVariant, string> = {
  grid:    '1 / 1',
  wide:    '16 / 9',
  portrait: '3 / 4',
}

/* ── Icône et label selon le type de média ──────────────────────── */
const TYPE_META: Record<MediaType, { icon: typeof ImageIcon; label: string }> = {
  image: { icon: ImageIcon, label: 'Photo' },
  video: { icon: Film,      label: 'Vidéo' },
  flyer: { icon: FileText,  label: 'Flyer' },
}

/* ── MediaCard ───────────────────────────────────────────────────── */
export function MediaCard({
  media,
  variant   = 'grid',
  onExpand,
  showTitle = false,
  animated  = true,
  delay     = 0,
}: MediaCardProps) {
  const [hovered, setHovered] = useState(false)

  const { icon: TypeIcon, label: typeLabel } = TYPE_META[media.type]

  /* Wrapper conditionnel : animé ou non selon la prop */
  const Wrapper = animated ? motion.div : 'div'
  const wrapperProps = animated
    ? {
        initial:    { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport:   { once: true, margin: '-30px' },
        transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
      }
    : {}

  return (
    <Wrapper {...wrapperProps as any}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:     'relative',
          aspectRatio:  RATIOS[variant],
          borderRadius: 'var(--r-lg)',
          overflow:     'hidden',
          background:   'var(--bg-elevated)',
          border:       `1px solid ${hovered ? 'var(--gold-border)' : 'var(--border)'}`,
          cursor:       onExpand ? 'pointer' : 'default',
          transition:   'border-color var(--t-fast)',
        }}
        onClick={() => onExpand?.(media)}
      >
        {/* ── Média ─────────────────────────────────────────────── */}
        {media.type === 'video' ? (
          <video
            src={media.url}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <img
            src={media.url}
            alt={media.title ?? typeLabel}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}

        {/* ── Overlay hover ─────────────────────────────────────── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{
                position:   'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
                display:    'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding:    12,
              }}
            >
              {/* Badge type en haut à gauche */}
              <div>
                <span style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          5,
                  background:   'rgba(0,0,0,0.55)',
                  border:       '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 'var(--r-full)',
                  padding:      '4px 10px',
                  fontFamily:   'var(--font-body)',
                  fontSize:     10,
                  fontWeight:   700,
                  color:        'rgba(255,255,255,0.8)',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                  <TypeIcon size={10}/>
                  {typeLabel}
                </span>
              </div>

              {/* Zone bas : titre + bouton expand */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
                {/* Titre du média */}
                {media.title && (
                  <p style={{
                    fontFamily:  'var(--font-body)',
                    fontSize:    13,
                    fontWeight:  600,
                    color:       'rgba(255,255,255,0.92)',
                    lineHeight:  1.3,
                    margin:      0,
                    flex:        1,
                    overflow:    'hidden',
                    display:     '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {media.title}
                  </p>
                )}

                {/* Bouton agrandir */}
                {onExpand && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={e => { e.stopPropagation(); onExpand(media) }}
                    style={{
                      width:        32,
                      height:       32,
                      borderRadius: 'var(--r-sm)',
                      background:   'rgba(232,184,75,0.85)',
                      border:       'none',
                      display:      'flex',
                      alignItems:   'center',
                      justifyContent: 'center',
                      cursor:       'pointer',
                      flexShrink:   0,
                      color:        '#0C0C0F',
                    }}
                    aria-label="Voir en grand"
                  >
                    <Expand size={15}/>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Badge "Vidéo" statique pour les vidéos (sans hover) ── */}
        {media.type === 'video' && !hovered && (
          <div style={{
            position:     'absolute', bottom: 8, right: 8,
            background:   'rgba(0,0,0,0.6)',
            border:       '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--r-sm)',
            padding:      '3px 8px',
            display:      'flex', alignItems: 'center', gap: 4,
          }}>
            <Film size={11} color="rgba(255,255,255,0.7)"/>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
              Vidéo
            </span>
          </div>
        )}
      </div>

      {/* ── Titre sous la card (mode showTitle) ─────────────────── */}
      {showTitle && media.title && (
        <p style={{
          fontFamily:  'var(--font-body)',
          fontSize:    13,
          color:       'var(--cream-55)',
          marginTop:   8,
          overflow:    'hidden',
          textOverflow: 'ellipsis',
          whiteSpace:  'nowrap',
        }}>
          {media.title}
        </p>
      )}
    </Wrapper>
  )
}