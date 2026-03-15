'use client'

/**
 * app/front/galerie/page.tsx
 * Route : /galerie
 *
 * Page galerie des réalisations Pro-Pub Service.
 * Données statiques (Firebase désactivé temporairement).
 */

import { motion }        from 'framer-motion'
import { PortfolioGrid } from '../../../components/front/PortfolioGrid'
import { CTABand }       from '../../../components/front/CTABand'
import type { Media }    from '../../../components/front/PortfolioGrid'

/* ── Données statiques de démonstration ─────────────────────────── */
const STATIC_MEDIAS: Media[] = [
  { id: '1', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Façade+3D',    title: 'Façade 3D Pharmacie',    published: true },
  { id: '2', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Enseigne+LED', title: 'Enseigne LED Boutique',  published: true },
  { id: '3', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Néon+Déco',    title: 'Néon déco Salon',        published: true },
  { id: '4', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Logo+Mural',   title: 'Logo mural Restaurant',  published: true },
  { id: '5', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Alucobond',    title: 'Revêtement Alucobond',   published: true },
  { id: '6', type: 'image', url: 'https://placehold.co/600x600/1a1a1f/e8b84b?text=Lettres+3D',   title: 'Lettres 3D Supermarché', published: true },
]

/* ── Page ───────────────────────────────────────────────────────── */
export default function GaleriePage() {
  return (
    <>
      {/* ── Header ────────────────────────────────────────────── */}
      <section style={{
        background:   'var(--bg-surface)',
        padding:      '64px 24px 80px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   12,
            color:      'var(--cream-30)',
            marginBottom: 16,
          }}>
            Accueil / Portfolio
          </p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      11,
              fontWeight:    700,
              color:         'var(--gold)',
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              marginBottom:  12,
            }}>
              Nos réalisations
            </p>
            <h1 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(36px, 6vw, 64px)',
              fontWeight:    900,
              color:         'var(--cream)',
              letterSpacing: -2,
              lineHeight:    1.04,
              marginBottom:  16,
              maxWidth:      580,
            }}>
              Ce que nous avons{' '}
              <span style={{ color: 'var(--gold)' }}>créé</span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   16,
              color:      'var(--cream-55)',
              lineHeight: 1.7,
              maxWidth:   480,
            }}>
              Façades, enseignes, néons, flyers — découvrez nos réalisations
              à Abidjan et environs.
            </p>
          </motion.div>

          {/* Compteur de médias */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop:  24,
              display:    'inline-flex',
              alignItems: 'center',
              gap:        8,
              background: 'var(--bg-elevated)',
              border:     '1px solid var(--border)',
              borderRadius: 'var(--r-full)',
              padding:    '6px 16px',
              fontFamily: 'var(--font-body)',
              fontSize:   13,
              color:      'var(--cream-55)',
            }}
          >
            <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{STATIC_MEDIAS.length}</span>
            réalisation{STATIC_MEDIAS.length !== 1 ? 's' : ''} publiée{STATIC_MEDIAS.length !== 1 ? 's' : ''}
          </motion.div>
        </div>
      </section>

      {/* ── Grille ────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-base)', padding: '56px 24px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <PortfolioGrid medias={STATIC_MEDIAS} loading={false} />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTABand />
    </>
  )
}
