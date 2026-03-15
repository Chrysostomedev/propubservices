'use client'

/**
 * ProcessSection.tsx
 * ─────────────────────────────────────────────────────────────────
 * Section "Comment ça marche" — 4 étapes du processus Pro-Pub :
 *   1. Consultation   → échange gratuit, diagnostic
 *   2. Conception     → maquette 3D sous 48h
 *   3. Fabrication    → atelier Yopougon, matériaux premium
 *   4. Installation   → pose par techniciens, garantie 12 mois
 *
 * Design :
 *  - Numéros d'étape en très grand (décoratifs, transparents)
 *  - Ligne connectrice or entre chaque étape (desktop)
 *  - Entrée staggerée au scroll (Framer Motion viewport)
 *  - Fond alterné (bg-base) pour contraster avec les sections voisines
 * ─────────────────────────────────────────────────────────────────
 */

import { motion }                        from 'framer-motion'
import { MessageCircle, Layers, Wrench, CheckCircle2 } from 'lucide-react'

/* ── Data des étapes ─────────────────────────────────────────────── */
const STEPS = [
  {
    number: '01',
    icon:   MessageCircle,
    title:  'Consultation',
    desc:   'Échangez avec notre équipe via WhatsApp ou formulaire en ligne. Diagnostic visuel gratuit, conseil sur les meilleures options pour votre commerce.',
    detail: 'Gratuit · Sans engagement',
  },
  {
    number: '02',
    icon:   Layers,
    title:  'Conception',
    desc:   'Notre studio vous livre une maquette 3D photo-réaliste sous 48h. Vous validez les couleurs, typographies et matériaux avant fabrication.',
    detail: 'Rendu 3D inclus · Révisions illimitées',
  },
  {
    number: '03',
    icon:   Wrench,
    title:  'Fabrication',
    desc:   'Production dans notre atelier de Yopougon avec des matériaux premium certifiés. Contrôle qualité avant chaque sortie d\'atelier.',
    detail: 'Atelier local · Matériaux certifiés',
  },
  {
    number: '04',
    icon:   CheckCircle2,
    title:  'Installation',
    desc:   'Pose soignée par nos techniciens expérimentés. Nettoyage du chantier inclus. Garantie 12 mois sur la main d\'œuvre.',
    detail: 'Garantie 12 mois · SAV réactif',
  },
]

/* ── Variants d'animation ────────────────────────────────────────── */
const itemVariant = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ── ProcessSection ──────────────────────────────────────────────── */
export function ProcessSection() {
  return (
    <section
      id="processus"
      style={{
        background: 'var(--bg-base)',
        padding:    '96px 0',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* ── En-tête de section ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 72 }}
        >
          {/* Eyebrow */}
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      11,
            fontWeight:    700,
            color:         'var(--gold)',
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            marginBottom:  12,
          }}>
            Comment ça marche
          </p>

          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(28px, 4.5vw, 48px)',
            fontWeight:    900,
            color:         'var(--cream)',
            letterSpacing: -1.2,
            lineHeight:    1.08,
            maxWidth:      520,
          }}>
            De l'idée à{' '}
            <span style={{ color: 'var(--gold)' }}>l'installation</span>
          </h2>
        </motion.div>

        {/* ── Grille des 4 étapes ──────────────────────────────────── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap:                 32,
          position:            'relative',
        }}>

          {STEPS.map((step, i) => {
            const Icon = step.icon
            const isLast = i === STEPS.length - 1

            return (
              <motion.div
                key={step.number}
                variants={itemVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.12 }}
                style={{ position: 'relative' }}
              >
                {/* ── Connecteur horizontal (desktop, sauf dernier) ── */}
                {/* Simulé via pseudo-border-right sur le wrapper        */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    style={{
                      display:    'none',   // masqué mobile, affiché desktop via media
                      position:   'absolute',
                      top:        38,       // aligné avec le centre de l'icône
                      right:      -16,
                      width:      32,
                      height:     1,
                      background: 'linear-gradient(90deg, var(--gold-border), transparent)',
                    }}
                    className="process-connector"
                  />
                )}

                {/* ── Numéro décoratif ─────────────────────────────── */}
                <div style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      80,
                  fontWeight:    900,
                  color:         'rgba(232,184,75,0.06)',  // très transparent
                  lineHeight:    1,
                  letterSpacing: -4,
                  marginBottom:  -20,        // overlap avec l'icône en dessous
                  userSelect:    'none',
                }}>
                  {step.number}
                </div>

                {/* ── Icône ───────────────────────────────────────── */}
                <div style={{
                  width:        52,
                  height:       52,
                  borderRadius: 'var(--r-md)',
                  background:   'var(--bg-elevated)',
                  border:       '1px solid var(--border-md)',
                  display:      'flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  position:     'relative',  // au-dessus du numéro
                  zIndex:       1,
                }}>
                  <Icon size={22} color="var(--gold)"/>
                </div>

                {/* ── Barre or verticale ──────────────────────────── */}
                <div style={{
                  width:        3,
                  height:       32,
                  background:   'linear-gradient(to bottom, var(--gold), transparent)',
                  borderRadius: 2,
                  marginBottom: 16,
                }}/>

                {/* ── Titre ───────────────────────────────────────── */}
                <h3 style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      22,
                  fontWeight:    800,
                  color:         'var(--cream)',
                  letterSpacing: -0.5,
                  marginBottom:  10,
                }}>
                  {step.title}
                </h3>

                {/* ── Description ─────────────────────────────────── */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   14,
                  lineHeight: 1.75,
                  color:      'var(--cream-55)',
                  marginBottom: 14,
                }}>
                  {step.desc}
                </p>

                {/* ── Detail/garantie ──────────────────────────────── */}
                <p style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      11,
                  fontWeight:    700,
                  color:         'var(--gold)',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                  {step.detail}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Style pour connecteur desktop ───────────────────────── */}
      <style>{`
        @media (min-width: 768px) {
          .process-connector { display: block !important; }
        }
      `}</style>
    </section>
  )
}