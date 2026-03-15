/**
 * ServiceCard.tsx  —  Carte d'un service Pro-Pub
 * ─────────────────────────────────────────────────────────────────
 * 'use client' — contient du state (hover) et framer-motion.
 *
 * SERVICES_DATA et ServiceCardData sont maintenant dans services-data.ts
 * (fichier sans 'use client') pour pouvoir être importés depuis page.tsx
 * qui est un Server Component.
 *
 * Props :
 *  - service  → objet ServiceCardData complet
 *  - variant  → 'default' | 'featured' (fond légèrement différent)
 *  - compact  → version réduite pour les listes
 *  - delay    → délai stagger d'animation (en secondes)
 * ─────────────────────────────────────────────────────────────────
 */

'use client'

import { useState }              from 'react'
import Link                      from 'next/link'
import { motion }                from 'framer-motion'
import { ArrowRight }            from 'lucide-react'
import { Badge }                 from '../ui/Badge'
import type { ServiceCardData }  from './services-data'  // type seul, pas de données

/* ── Props ──────────────────────────────────────────────────────── */
interface ServiceCardProps {
  service:  ServiceCardData
  variant?: 'default' | 'featured'  // 'featured' → fond bg-elevated
  compact?: boolean                  // true → paddings réduits, pas de description
  delay?:   number                   // délai stagger en secondes (défaut : 0)
}

/* ── Composant ──────────────────────────────────────────────────── */
export function ServiceCard({
  service,
  variant = 'default',
  compact = false,
  delay   = 0,
}: ServiceCardProps) {

  // État local pour le hover — pilote les styles dynamiques inline
  const [hovered, setHovered] = useState(false)

  // URL de la page devis pré-remplie avec le slug du service
  const devisUrl = `/devis?service=${encodeURIComponent(service.slug)}`

  return (
    /* Wrapper motion.div — animation d'entrée au scroll avec stagger */
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* ── Carte principale ──────────────────────────────────────── */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background:    variant === 'featured' ? 'var(--bg-elevated)' : 'var(--bg-surface)',
          border:        `1px solid ${hovered ? 'var(--gold-border)' : 'var(--border)'}`,
          borderRadius:  'var(--r-lg)',
          padding:       compact ? '20px' : '28px',
          position:      'relative',
          overflow:      'hidden',
          transform:     hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow:     hovered ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
          transition:    'all var(--t-med) var(--ease)',
          height:        '100%',
          display:       'flex',
          flexDirection: 'column',
        }}
      >

        {/* ── Reflet or en coin supérieur-droit au hover ────────────── */}
        <div style={{
          position:      'absolute',
          top:           0,
          right:         0,
          width:         120,
          height:        120,
          background:    hovered
            ? 'radial-gradient(circle at top right, var(--gold-glow), transparent 65%)'
            : 'transparent',
          transition:    'background var(--t-slow)',
          pointerEvents: 'none',
          borderRadius:  'var(--r-lg)',
        }}/>

        {/* ── Badge tag optionnel (Phare / Populaire / Tendance) ────── */}
        {service.tag && (
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <Badge
              label={service.tag}
              variant={
                service.tag === 'Phare'     ? 'gold'    :
                service.tag === 'Tendance'  ? 'warning' :
                service.tag === 'Populaire' ? 'info'    : 'neutral'
              }
              size="sm"
            />
          </div>
        )}

        {/* ── Icône dans un carré arrondi ───────────────────────────── */}
        {service.icon && (
          <div style={{
            width:          compact ? 40 : 48,
            height:         compact ? 40 : 48,
            borderRadius:   'var(--r-md)',
            background:     hovered ? 'var(--gold-bg)'  : 'var(--bg-hover)',
            border:         `1px solid ${hovered ? 'var(--gold-border)' : 'var(--border)'}`,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            marginBottom:   compact ? 14 : 20,
            flexShrink:     0,
            transition:     'all var(--t-med)',
            color:          hovered ? 'var(--gold)' : 'var(--cream-55)',
          }}>
            {service.icon}
          </div>
        )}

        {/* ── Titre ─────────────────────────────────────────────────── */}
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      compact ? 15 : 17,
          fontWeight:    700,
          color:         hovered ? 'var(--cream)' : 'var(--cream-80)',
          letterSpacing: -0.2,
          lineHeight:    1.25,
          marginBottom:  compact ? 8 : 10,
          transition:    'color var(--t-fast)',
        }}>
          {service.title}
        </h3>

        {/* ── Description (masquée en mode compact) ─────────────────── */}
        {!compact && (
          <p style={{
            fontFamily:   'var(--font-body)',
            fontSize:     14,
            lineHeight:   1.7,
            color:        'var(--cream-55)',
            marginBottom: 16,
            flex:         1,  // pousse le footer vers le bas
          }}>
            {service.description}
          </p>
        )}

        {/* ── Prix optionnel (masqué en mode compact) ───────────────── */}
        {service.price && !compact && (
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      12,
            color:         'var(--gold)',
            fontWeight:    600,
            marginBottom:  16,
            letterSpacing: 0.3,
          }}>
            {service.price}
          </p>
        )}

        {/* ── Footer : lien "Demander un devis" ─────────────────────── */}
        <Link
          href={devisUrl}
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        6,
            fontFamily: 'var(--font-body)',
            fontSize:   13,
            fontWeight: 600,
            color:      hovered ? 'var(--gold)' : 'var(--cream-30)',
            transition: 'color var(--t-fast)',
            marginTop:  'auto',
            paddingTop: 14,
            borderTop:  `1px solid ${hovered ? 'var(--gold-border)' : 'var(--border)'}`,
          }}
        >
          Demander un devis
          {/* Flèche qui glisse vers la droite au hover */}
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex' }}
          >
            <ArrowRight size={14}/>
          </motion.span>
        </Link>

      </div>
    </motion.div>
  )
}