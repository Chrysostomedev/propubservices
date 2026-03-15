'use client'

/**
 * PortfolioGrid.tsx
 * ─────────────────────────────────────────────────────────────────
 * Grille portfolio pour la page /portfolio.
 *
 * Fonctionnalités :
 *  - Filtres par type de média (Tous / Images / Vidéos / Flyers)
 *  - Layout grille avec colonnes variables (auto-fill)
 *  - Lightbox intégrée (modal plein écran avec navigation)
 *  - Données depuis Firebase (hook useMedia) ou données statiques
 *  - Skeletons pendant le chargement
 *  - AnimatePresence pour les transitions de filtre
 * ─────────────────────────────────────────────────────────────────
 */

import { useState }                from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { MediaCard }               from './MediaCard'
import { SkeletonMedia }           from '../ui/Skeleton'

/* ── Type Media (local, Firebase désactivé temporairement) ──────── */
export type MediaType = 'image' | 'video' | 'flyer'

export interface Media {
  id:         string
  type:       MediaType
  url:        string
  title?:     string
  published?: boolean
}

/* ── Types de filtre ─────────────────────────────────────────────── */
type FilterType = 'all' | MediaType

interface FilterOption {
  value: FilterType
  label: string
}

const FILTERS: FilterOption[] = [
  { value: 'all',   label: 'Toutes les réalisations' },
  { value: 'image', label: 'Photos'  },
  { value: 'video', label: 'Vidéos'  },
  { value: 'flyer', label: 'Flyers'  },
]

/* ── Props ───────────────────────────────────────────────────────── */
interface PortfolioGridProps {
  medias:   Media[]
  loading?: boolean
  maxItems?: number   // nombre max à afficher (défaut : tout)
}

/* ══════════════════════════════════════════════════════════════════
   LIGHTBOX — visualisation plein écran avec navigation
══════════════════════════════════════════════════════════════════ */
interface LightboxProps {
  media:   Media
  medias:  Media[]    // pour la navigation prev/next
  onClose: () => void
}

function Lightbox({ media, medias, onClose }: LightboxProps) {
  const currentIndex = medias.findIndex(m => m.id === media.id)

  /* Navigation entre les médias */
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const activeMedia = medias[activeIndex]

  const goPrev = () => setActiveIndex(i => Math.max(0, i - 1))
  const goNext = () => setActiveIndex(i => Math.min(medias.length - 1, i + 1))

  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position:  'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(16px)',
        display:   'flex', alignItems: 'center', justifyContent: 'center',
        padding:   20,
      }}
      onClick={onClose}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        style={{
          position: 'fixed', top: 20, right: 20,
          width: 40, height: 40, borderRadius: 'var(--r-sm)',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'var(--cream)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 1,
        }}
      >
        <X size={18}/>
      </button>

      {/* Navigation précédent */}
      {activeIndex > 0 && (
        <button
          onClick={e => { e.stopPropagation(); goPrev() }}
          style={{
            position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'var(--cream)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 1,
          }}
        >
          <ChevronLeft size={20}/>
        </button>
      )}

      {/* Média centré — stopPropagation pour ne pas fermer au clic dessus */}
      <motion.div
        key={activeMedia.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth:  '90vw',
          maxHeight: '88vh',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
        }}
      >
        {activeMedia.type === 'video' ? (
          <video
            src={activeMedia.url}
            controls
            autoPlay
            style={{ maxWidth: '90vw', maxHeight: '88vh', display: 'block' }}
          />
        ) : (
          <img
            src={activeMedia.url}
            alt={activeMedia.title ?? ''}
            style={{ maxWidth: '90vw', maxHeight: '88vh', display: 'block', objectFit: 'contain' }}
          />
        )}
      </motion.div>

      {/* Navigation suivant */}
      {activeIndex < medias.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); goNext() }}
          style={{
            position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'var(--cream)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 1,
          }}
        >
          <ChevronRight size={20}/>
        </button>
      )}

      {/* Compteur */}
      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.5)',
      }}>
        {activeIndex + 1} / {medias.length}
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PORTFOLIO GRID
══════════════════════════════════════════════════════════════════ */

export function PortfolioGrid({ medias, loading = false, maxItems }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [lightboxMedia, setLightboxMedia] = useState<Media | null>(null)

  /* Filtrage */
  const filtered = medias
    .filter(m => activeFilter === 'all' || m.type === activeFilter)
    .slice(0, maxItems)

  return (
    <div>
      {/* ── Filtres ─────────────────────────────────────────────── */}
      <div style={{
        display:    'flex',
        gap:        8,
        marginBottom: 32,
        flexWrap:   'wrap',
      }}>
        {FILTERS.map(f => {
          const isActive = activeFilter === f.value
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                padding:      '8px 18px',
                borderRadius: 'var(--r-full)',
                background:   isActive ? 'var(--gold-bg)'  : 'var(--bg-surface)',
                border:       `1px solid ${isActive ? 'var(--gold-border)' : 'var(--border)'}`,
                color:        isActive ? 'var(--gold)'     : 'var(--cream-55)',
                fontFamily:   'var(--font-body)',
                fontSize:     13,
                fontWeight:   isActive ? 700 : 500,
                cursor:       'pointer',
                transition:   'all var(--t-fast)',
              }}
            >
              {f.label}
              {/* Compteur de médias par filtre */}
              <span style={{
                marginLeft: 6,
                fontWeight: 400,
                opacity:    0.6,
                fontSize:   11,
              }}>
                ({f.value === 'all'
                  ? medias.length
                  : medias.filter(m => m.type === f.value).length})
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Grille ──────────────────────────────────────────────── */}
      {loading ? (
        /* Skeletons pendant le chargement Firebase */
        <div style={{
          display:              'grid',
          gridTemplateColumns:  'repeat(auto-fill, minmax(240px, 1fr))',
          gap:                  16,
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonMedia key={i}/>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* État vide */
        <div style={{
          padding:    '80px 24px',
          textAlign:  'center',
          color:      'var(--cream-30)',
          fontFamily: 'var(--font-body)',
          fontSize:   15,
          border:     '1px dashed var(--border)',
          borderRadius: 'var(--r-lg)',
        }}>
          Aucun contenu dans cette catégorie pour l'instant.
        </div>
      ) : (
        <motion.div
          layout
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap:                 16,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((media, i) => (
              <motion.div
                key={media.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <MediaCard
                  media={media}
                  variant="grid"
                  onExpand={setLightboxMedia}
                  animated={false}   // déjà animé par le parent
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxMedia && (
          <Lightbox
            media={lightboxMedia}
            medias={filtered}
            onClose={() => setLightboxMedia(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}