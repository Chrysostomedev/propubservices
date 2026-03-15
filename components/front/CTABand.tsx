'use client'

/**
 * CTABand.tsx
 * ─────────────────────────────────────────────────────────────────
 * Bande de conversion finale, placée juste avant le Footer.
 *
 * Design :
 *  - Fond sombre avec texture grille or subtile
 *  - Ligne or décorative en haut
 *  - Message fort centré (typographie display)
 *  - 2 CTA : "Devis gratuit" (or) + "WhatsApp" (vert)
 *  - Badge garantie + badge délai
 *
 * Objectif :
 *  Capturer les visiteurs qui ont scrollé jusqu'en bas sans
 *  avoir encore cliqué sur un CTA précédent.
 * ─────────────────────────────────────────────────────────────────
 */

import Link           from 'next/link'
import { motion }     from 'framer-motion'
import { ArrowRight, MessageCircle, Shield, Clock } from 'lucide-react'

/* ── CTABand ─────────────────────────────────────────────────────── */
export function CTABand() {
  return (
    <section style={{
      background: 'var(--bg-surface)',
      padding:    '80px 24px',
      position:   'relative',
      overflow:   'hidden',
    }}>
      {/* ── Grille décorative en arrière-plan ─────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(var(--gold-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--gold-border) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.35,
        }}
      />

      {/* ── Halo or centré ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(232,184,75,0.07) 0%, transparent 65%)',
        }}
      />

      {/* ── Ligne or en haut ─────────────────────────────────────── */}
      <div style={{
        position:   'absolute', top: 0, left: 0, right: 0,
        height:     2,
        background: 'linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent)',
        opacity:    0.5,
      }}/>

      {/* ── Contenu centré ───────────────────────────────────────── */}
      <div style={{
        position:   'relative', zIndex: 1,
        maxWidth:   760,
        margin:     '0 auto',
        textAlign:  'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      11,
            fontWeight:    700,
            color:         'var(--gold)',
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            marginBottom:  16,
          }}>
            Prêt à transformer votre commerce ?
          </p>

          {/* Headline */}
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(32px, 5vw, 56px)',
            fontWeight:    900,
            color:         'var(--cream)',
            letterSpacing: -1.5,
            lineHeight:    1.06,
            marginBottom:  20,
          }}>
            Votre façade mérite{' '}
            <span style={{ color: 'var(--gold)' }}>le meilleur</span>
          </h2>

          {/* Sous-texte */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   16,
            lineHeight: 1.7,
            color:      'var(--cream-55)',
            marginBottom: 36,
            maxWidth:   520,
            margin:     '0 auto 36px',
          }}>
            Contactez-nous aujourd'hui. Devis personnalisé gratuit sous 48h,
            maquette 3D incluse, sans engagement.
          </p>

          {/* CTAs */}
          <div style={{
            display:        'flex',
            gap:            12,
            justifyContent: 'center',
            flexWrap:       'wrap',
            marginBottom:   32,
          }}>
            <Link href="/front/devis">
              <motion.span
                whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-gold-strong)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  gap:          8,
                  background:   'var(--gold)',
                  color:        '#0C0C0F',
                  padding:      '14px 30px',
                  borderRadius: 'var(--r-md)',
                  fontFamily:   'var(--font-body)',
                  fontSize:     15,
                  fontWeight:   800,
                  cursor:       'pointer',
                }}
              >
                Demander un devis gratuit
                <ArrowRight size={17} strokeWidth={2.5}/>
              </motion.span>
            </Link>

            <motion.a
              href="https://wa.me/2250787636402"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:      'inline-flex',
                alignItems:   'center',
                gap:          8,
                background:   'rgba(37,211,102,0.10)',
                border:       '1px solid rgba(37,211,102,0.25)',
                color:        '#25D366',
                padding:      '14px 24px',
                borderRadius: 'var(--r-md)',
                fontFamily:   'var(--font-body)',
                fontSize:     15,
                fontWeight:   700,
                cursor:       'pointer',
              }}
            >
              <MessageCircle size={17}/>
              WhatsApp
            </motion.a>
          </div>

          {/* Badges garantie */}
          <div style={{
            display:        'flex',
            gap:            24,
            justifyContent: 'center',
            flexWrap:       'wrap',
          }}>
            {[
              { icon: Shield, text: 'Garantie 12 mois' },
              { icon: Clock,  text: 'Devis sous 48h' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{
                display:    'flex',
                alignItems: 'center',
                gap:        6,
                fontFamily: 'var(--font-body)',
                fontSize:   13,
                color:      'var(--cream-30)',
              }}>
                <Icon size={14} color="var(--gold)"/>
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}