/**
 * app/(public)/devis/page.tsx
 * ─────────────────────────────────────────────────────────────────
 * Route : /devis
 *
 * Page de demande de devis.
 *
 * Layout :
 *  - 2 colonnes sur desktop :
 *    Gauche  → DevisForm (formulaire progressif 3 étapes)
 *    Droite  → Sidebar informative (garanties, contact, témoignage)
 *  - 1 colonne sur mobile (sidebar passe en bas)
 *
 * Note : DevisForm est un 'use client' component.
 *        Cette page peut rester Server Component.
 * ─────────────────────────────────────────────────────────────────
 */

import type { Metadata } from 'next'
import { Suspense }      from 'react'
import { DevisForm }     from '../../../components/front/DevisForm'
import { Skeleton }      from '../../../components/ui/Skeleton'
import {
  Shield, Clock, Star, Phone,
  MessageCircle, CheckCircle2,
}                        from 'lucide-react'

export const metadata: Metadata = {
  title: 'Demande de devis',
  description:
    'Demandez un devis gratuit pour vos enseignes, façades ou décorations LED. Réponse sous 48h avec maquette 3D incluse.',
}

/* ── Sidebar informative ─────────────────────────────────────────── */
function DevisSidebar() {
  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Bloc garanties ────────────────────────────────────── */}
      <div style={{
        background:   'var(--bg-surface)',
        border:       '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding:      '24px',
      }}>
        <h3 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      16,
          fontWeight:    700,
          color:         'var(--cream)',
          marginBottom:  18,
          letterSpacing: -0.2,
        }}>
          Nos engagements
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { icon: CheckCircle2, color: 'var(--green)',  text: 'Devis gratuit, sans engagement' },
            { icon: Clock,        color: 'var(--gold)',   text: 'Réponse sous 48h ouvrés' },
            { icon: Star,         color: 'var(--gold)',   text: 'Maquette 3D incluse' },
            { icon: Shield,       color: 'var(--blue)',   text: 'Garantie 12 mois pose' },
          ].map(({ icon: Icon, color, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon size={16} color={color} style={{ flexShrink: 0 }}/>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize:   13,
                color:      'var(--cream-55)',
                lineHeight: 1.4,
              }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bloc contact direct ───────────────────────────────── */}
      <div style={{
        background:   'var(--gold-bg)',
        border:       '1px solid var(--gold-border)',
        borderRadius: 'var(--r-lg)',
        padding:      '24px',
      }}>
        <h3 style={{
          fontFamily:  'var(--font-display)',
          fontSize:    15,
          fontWeight:  700,
          color:       'var(--gold)',
          marginBottom: 14,
        }}>
          Besoin d'un devis urgent ?
        </h3>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   13,
          color:      'var(--cream-55)',
          marginBottom: 16,
          lineHeight: 1.6,
        }}>
          Pour une réponse immédiate, contactez-nous directement.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href="https://wa.me/2250787636402"
            target="_blank"
            rel="noreferrer"
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          8,
              background:   'rgba(37,211,102,0.12)',
              border:       '1px solid rgba(37,211,102,0.25)',
              color:        '#25D366',
              padding:      '11px 16px',
              borderRadius: 'var(--r-md)',
              fontFamily:   'var(--font-body)',
              fontSize:     13,
              fontWeight:   700,
              textDecoration: 'none',
            }}
          >
            <MessageCircle size={15}/>
            WhatsApp — +225 07 87 63 64 02
          </a>

          <a
            href="tel:+2250787636402"
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          8,
              background:   'var(--bg-elevated)',
              border:       '1px solid var(--border)',
              color:        'var(--cream-55)',
              padding:      '11px 16px',
              borderRadius: 'var(--r-md)',
              fontFamily:   'var(--font-body)',
              fontSize:     13,
              fontWeight:   600,
              textDecoration: 'none',
            }}
          >
            <Phone size={15} color="var(--cream-30)"/>
            Appeler maintenant
          </a>
        </div>
      </div>

      {/* ── Témoignage client ─────────────────────────────────── */}
      <div style={{
        background:   'var(--bg-surface)',
        border:       '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding:      '24px',
      }}>
        {/* Étoiles */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} fill="var(--gold)" color="var(--gold)"/>
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   13,
          color:      'var(--cream-55)',
          lineHeight: 1.7,
          fontStyle:  'italic',
          marginBottom: 14,
        }}>
          "Pro-Pub a transformé la façade de notre pharmacie en moins de 2 semaines.
          Le résultat est vraiment impressionnant, on a eu beaucoup de compliments."
        </p>

        <div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   12,
            fontWeight: 700,
            color:      'var(--cream)',
          }}>
            Dr. Kouamé A.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   11,
            color:      'var(--cream-30)',
          }}>
            Pharmacie La Perle · Yopougon
          </p>
        </div>
      </div>

    </aside>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function DevisPage() {
  return (
    <>
      {/* ── Header ────────────────────────────────────────────── */}
      <section style={{
        background:   'var(--bg-surface)',
        padding:      '56px 24px 64px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   12,
            color:      'var(--cream-30)',
            marginBottom: 16,
          }}>
            Accueil / Devis
          </p>
          <h1 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(32px, 5vw, 56px)',
            fontWeight:    900,
            color:         'var(--cream)',
            letterSpacing: -1.5,
            lineHeight:    1.06,
            marginBottom:  12,
          }}>
            Votre devis{' '}
            <span style={{ color: 'var(--gold)' }}>gratuit</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize:   16,
            color:      'var(--cream-55)',
            lineHeight: 1.7,
            maxWidth:   480,
          }}>
            Remplissez le formulaire en 3 étapes. Maquette 3D et réponse
            garanties sous 48h, sans engagement.
          </p>
        </div>
      </section>

      {/* ── Layout 2 colonnes ─────────────────────────────────── */}
      <section style={{ background: 'var(--bg-base)', padding: '56px 24px 80px' }}>
        <div style={{
          maxWidth:            1280,
          margin:              '0 auto',
          display:             'grid',
          /* Sur desktop : formulaire large + sidebar fixe */
          gridTemplateColumns: '1fr 340px',
          gap:                 32,
          alignItems:          'flex-start',
        }}>
          {/* Formulaire — Suspense car useSearchParams() est asynchrone */}
          <Suspense fallback={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Skeleton height={56} borderRadius="var(--r-md)"/>
              <Skeleton height={320} borderRadius="var(--r-lg)"/>
            </div>
          }>
            <DevisForm/>
          </Suspense>

          {/* Sidebar */}
          <DevisSidebar/>
        </div>
      </section>

      <style>{`
        /* Sur mobile : 1 colonne */
        @media (max-width: 900px) {
          section:last-of-type > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}