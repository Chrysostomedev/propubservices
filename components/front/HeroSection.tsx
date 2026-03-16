'use client'

/**
 * HeroSection.tsx
 * ─────────────────────────────────────────────────────────────────
 * Section Hero de la landing page Pro-Pub Service.
 *
 * Composition :
 *  1. Fond charbon profond avec grille géométrique légère
 *  2. Formes flottantes décoratives (carrés/losanges en bordure or)
 *  3. Badge localisation animé
 *  4. Headline grand format avec mot clé en or
 *  5. Sous-titre descriptif
 *  6. Deux CTA : "Devis gratuit" + "WhatsApp direct"
 *  7. Preuve sociale : étoiles + badges garantie
 *  8. Bande de statistiques en bas (parallax au scroll)
 *
 * Motion :
 *  - Entrée staggerée de tous les éléments (Framer Motion)
 *  - Parallax léger sur le contenu au scroll (useScroll + useTransform)
 *  - Formes flottantes en boucle (animate loop)
 * ─────────────────────────────────────────────────────────────────
 */

import Link               from 'next/link'
import { useRef }         from 'react'
import {
  motion,
  useScroll,
  useTransform,
}                         from 'framer-motion'
import {
  ArrowRight,
  MessageCircle,
  Star,
  CheckCircle2,
  Clock,
}                         from 'lucide-react'

/* ── Statistiques affichées dans la bande du bas ────────────────── */
const STATS = [
  { value: '200+',  label: 'Réalisations' },
  { value: '8 ans', label: "D'expérience" },
  { value: '100%',  label: 'Satisfaction' },
  { value: '48h',   label: 'Délai devis'  },
]

/* ── Variants Framer Motion pour le stagger d'entrée ────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.10,
      delayChildren:   0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

/* ── HeroSection ─────────────────────────────────────────────────── */
export function HeroSection() {
  /* Ref sur la section pour le parallax */
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end start'],
  })

  /* Le contenu principal remonte légèrement au scroll */
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])

  /* La bande stats s'atténue progressivement */
  const statsOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight:  '100vh',
        position:   'relative',
        overflow:   'hidden',
        display:    'flex',
        alignItems: 'center',
        background: 'var(--bg-base)',
      }}
    >
      {/* ══════════════════════════════════════════════════════════
          FOND : grille géométrique légère
      ══════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          /* Grille double axe en or très transparent */
          backgroundImage: `
            linear-gradient(rgba(232,184,75,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,184,75,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Dégradé radial centré pour donner de la profondeur */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(232,184,75,0.05) 0%, transparent 65%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          FORMES DÉCORATIVES FLOTTANTES
      ══════════════════════════════════════════════════════════ */}
      {[
        /* [top%, left%, width, height, borderRadius, delay, duration] */
        ['8%',  '3%',   140, 140, 'var(--r-lg)', 0,   5.5],
        ['60%', '2%',   80,  80,  '50%',          0.8, 4.2],
        ['15%', '72%',  180, 180, 'var(--r-xl)', 0.4, 6.0],
        ['70%', '78%',  60,  60,  '50%',          1.2, 4.8],
        ['40%', '55%',  100, 100, 'var(--r-md)', 0.6, 5.0],
      ].map(([top, left, w, h, radius, delay, dur], i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={{
            y:       [0, -18, 0],
            rotate:  [0, 6, 0],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: dur as number,
            delay:    delay as number,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
          style={{
            position:     'absolute',
            top:          top as string,
            left:         left as string,
            width:        w as number,
            height:       h as number,
            border:       '1px solid var(--gold-border)',
            borderRadius: radius as string,
            zIndex:       0,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ══════════════════════════════════════════════════════════
          CONTENU PRINCIPAL (parallax léger)
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          y:          contentY,
          position:   'relative',
          zIndex:     1,
          width:      '100%',
          maxWidth:   1280,
          margin:     '0 auto',
          padding:    '120px 24px 80px',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ maxWidth: 780 }}
        >
          {/* ── Badge localisation ─────────────────────────────── */}
          <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
            <span style={{
              display:    'inline-flex',
              alignItems: 'center',
              gap:        8,
              background: 'var(--gold-bg)',
              border:     '1px solid var(--gold-border)',
              borderRadius: 'var(--r-full)',
              padding:    '6px 16px',
            }}>
              {/* Dot pulsant */}
              <span style={{
                width: 7, height: 7,
                background:   'var(--gold)',
                borderRadius: '50%',
                display:      'block',
                animation:    'pulse 2s ease infinite',
              }}/>
              <span style={{
                fontFamily:    'var(--font-body)',
                fontSize:      11,
                fontWeight:    700,
                color:         'var(--gold)',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}>
                Yopougon · 16e Arrondissement · Abidjan
              </span>
            </span>
          </motion.div>

          {/* ── Headline principale ────────────────────────────── */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(44px, 8vw, 88px)',
              fontWeight:    900,
              lineHeight:    1.02,
              letterSpacing: -2.5,
              marginBottom:  24,
              color:         'var(--cream)',
            }}
          >
            {/* Première ligne : texte crème */}
            Donnez de{' '}
            {/* Mot-clé en or avec soulignement décoratif */}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ color: 'var(--gold)' }}>l'impact</span>
              {/* Soulignement animé */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position:       'absolute',
                  bottom:         -4,
                  left:           0,
                  right:          0,
                  height:         3,
                  background:     'var(--gold)',
                  borderRadius:   2,
                  transformOrigin: 'left',
                  opacity:        0.6,
                }}
              />
            </span>
            <br/>
            {/* Deuxième ligne : dégradé crème → or */}
            <span style={{
              background: 'linear-gradient(135deg, var(--cream) 40%, var(--gold-light) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
            }}>
              à votre commerce
            </span>
          </motion.h1>

          {/* ── Sous-titre ─────────────────────────────────────── */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize:   'clamp(16px, 2.2vw, 19px)',
              lineHeight: 1.7,
              color:      'var(--cream-55)',
              marginBottom: 40,
              maxWidth:   560,
            }}
          >
            Enseignes 3D, façades décoratives, lettres LED et néon.
            Pro-Pub Service transforme la visibilité de votre établissement
            à Abidjan — devis gratuit en 48h.
          </motion.p>

          {/* ── Boutons CTA ────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}
          >
            {/* CTA primaire */}
            <Link href="/devis">
              <motion.span
                whileHover={{ scale: 1.04, boxShadow: 'var(--shadow-gold-strong)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display:    'inline-flex',
                  alignItems: 'center',
                  gap:        8,
                  background: 'var(--gold)',
                  color:      '#0C0C0F',
                  padding:    '14px 28px',
                  borderRadius: 'var(--r-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize:   15,
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  cursor:     'pointer',
                }}
              >
                Demander un devis gratuit
                <ArrowRight size={17} strokeWidth={2.5}/>
              </motion.span>
            </Link>

            {/* CTA WhatsApp */}
            <motion.a
              href="https://wa.me/2250787636402"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:    'inline-flex',
                alignItems: 'center',
                gap:        8,
                background: 'transparent',
                border:     '1px solid var(--border-md)',
                color:      'var(--cream-80)',
                padding:    '14px 24px',
                borderRadius: 'var(--r-md)',
                fontFamily: 'var(--font-body)',
                fontSize:   15,
                fontWeight: 600,
                cursor:     'pointer',
                transition: 'border-color var(--t-fast)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-md)')}
            >
              <MessageCircle size={17} color="#25D366"/>
              WhatsApp direct
            </motion.a>
          </motion.div>

          {/* ── Preuve sociale ─────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        20,
              flexWrap:   'wrap',
            }}
          >
            {/* Étoiles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="var(--gold)" color="var(--gold)"/>
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)' }}>
                +200 réalisations
              </span>
            </div>

            <span style={{ width: 1, height: 16, background: 'var(--border-md)' }}/>

            {/* Badge délai */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} color="var(--gold)"/>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)' }}>
                Devis sous 48h
              </span>
            </div>

            <span style={{ width: 1, height: 16, background: 'var(--border-md)' }}/>

            {/* Badge garantie */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={14} color="var(--green)"/>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)' }}>
                Garantie 12 mois
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          BANDE STATISTIQUES (bas de section, s'estompe au scroll)
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          opacity:  statsOpacity,
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1,
          background:   'rgba(0,0,0,0.28)',
          backdropFilter: 'blur(12px)',
          borderTop:    '1px solid var(--border)',
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding:  '16px 24px',
          display:  'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap:      8,
        }}>
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center', padding: '6px 0' }}>
              <div style={{
                fontFamily:    'var(--font-display)',
                fontSize:      26,
                fontWeight:    900,
                color:         'var(--gold)',
                letterSpacing: -1,
                lineHeight:    1,
                marginBottom:  4,
              }}>
                {value}
              </div>
              <div style={{
                fontFamily:    'var(--font-body)',
                fontSize:      11,
                color:         'var(--cream-55)',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}