'use client'

/**
 * PortfolioTeaser.tsx
 * Aperçu portfolio sur la landing page.
 * Données statiques (Firebase désactivé temporairement).
 */

import { useState }  from 'react'
import { motion }    from 'framer-motion'
import Link          from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MediaCard } from './MediaCard'
import type { Media } from './PortfolioGrid'

/* ── Données statiques de démonstration ─────────────────────────── */
const STATIC_MEDIAS: Media[] = [
  { id: '1', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Façade+3D',    title: 'Façade 3D Pharmacie',    published: true },
  { id: '2', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Enseigne+LED', title: 'Enseigne LED Boutique',  published: true },
  { id: '3', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Néon+Déco',    title: 'Néon déco Salon',        published: true },
  { id: '4', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Logo+Mural',   title: 'Logo mural Restaurant',  published: true },
  { id: '5', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Alucobond',    title: 'Revêtement Alucobond',   published: true },
  { id: '6', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Lettres+3D',   title: 'Lettres 3D Supermarché', published: true },
]

/* ── PortfolioTeaser ─────────────────────────────────────────────── */
export function PortfolioTeaser() {
  const [lightboxMedia, setLightboxMedia] = useState<Media | null>(null)
  const medias = STATIC_MEDIAS

  return (
    <div>
      {/* ── Grille asymétrique : 1 grande + 5 petites ─────────── */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows:    'repeat(2, 240px)',
        gap:                 12,
      }}>
        {medias.map((media, i) => (
          <motion.div
            key={media.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            style={{
              gridRow: i === 0 ? 'span 2' : undefined,
              minHeight: 0,
            }}
          >
            <div style={{ height: '100%' }}>
              <MediaCard
                media={media}
                variant="grid"
                onExpand={setLightboxMedia}
                animated={false}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Lien vers /galerie ────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <Link href="/front/galerie">
          <motion.span
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          8,
              fontFamily:   'var(--font-body)',
              fontSize:     15,
              fontWeight:   600,
              color:        'var(--gold)',
              padding:      '10px 0',
              borderBottom: '1px solid var(--gold-border)',
            }}
          >
            Voir toutes les réalisations
            <ArrowRight size={16} />
          </motion.span>
        </Link>
      </div>

      {/* ── Lightbox inline ──────────────────────────────────── */}
      {lightboxMedia && (
        <div
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         300,
            background:     'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(16px)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            padding:        20,
            cursor:         'zoom-out',
          }}
          onClick={() => setLightboxMedia(null)}
        >
          {lightboxMedia.type === 'video' ? (
            <video
              src={lightboxMedia.url}
              controls
              autoPlay
              style={{ maxWidth: '90vw', maxHeight: '88vh', borderRadius: 'var(--r-lg)' }}
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <img
              src={lightboxMedia.url}
              alt={lightboxMedia.title ?? ''}
              style={{ maxWidth: '90vw', maxHeight: '88vh', borderRadius: 'var(--r-lg)', objectFit: 'contain' }}
              onClick={e => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </div>
  )
}
