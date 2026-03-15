'use client'

/**
 * app/front/services/page.tsx
 * Route : /services
 *
 * Page catalogue de tous les services Pro-Pub Service.
 * 'use client' requis pour le composant FAQ accordion (useState).
 */

import { useState }                          from 'react'
import { motion }                            from 'framer-motion'
import { ServiceCard }   from '../../../components/front/ServiceCard'
import { SERVICES_DATA } from '../../../components/front/services-data'
import { CTABand }                           from '../../../components/front/CTABand'
import { CheckCircle2, Clock, Shield, Star, ChevronDown } from 'lucide-react'

/* ── Avantages Pro-Pub ──────────────────────────────────────────── */
const AVANTAGES = [
  {
    icon:  Star,
    title: 'Qualité premium',
    desc:  'Matériaux certifiés, finitions soignées, rendu professionnel garanti sur chaque réalisation.',
  },
  {
    icon:  Clock,
    title: 'Réactivité',
    desc:  'Devis sous 48h, maquette 3D incluse, planning respecté. Votre temps est précieux.',
  },
  {
    icon:  Shield,
    title: 'Garantie 12 mois',
    desc:  'Garantie main d\'œuvre sur toutes nos installations. SAV disponible après la pose.',
  },
]

/* ── FAQ ────────────────────────────────────────────────────────── */
const FAQ = [
  {
    q: 'Quel est le délai pour une enseigne 3D ?',
    a: 'En général 1 à 2 semaines entre validation de la maquette et installation, selon la complexité et les matériaux choisis.',
  },
  {
    q: 'Proposez-vous des facilités de paiement ?',
    a: 'Oui, nous acceptons un acompte de 50% à la commande et le solde à la livraison. Des arrangements peuvent être discutés pour les projets importants.',
  },
  {
    q: 'Intervenez-vous en dehors d\'Abidjan ?',
    a: 'Principalement sur Abidjan et sa périphérie. Pour les projets en région, contactez-nous directement pour évaluer la faisabilité.',
  },
  {
    q: 'La maquette 3D est-elle vraiment gratuite ?',
    a: 'Oui, la maquette 3D est incluse dans notre processus de devis. Aucun frais ne vous sera demandé tant que vous n\'avez pas signé le bon de commande.',
  },
]

/* ── FAQ Accordion item ─────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      border:       '1px solid var(--border)',
      borderRadius: 'var(--r-md)',
      overflow:     'hidden',
      transition:   'border-color var(--t-fast)',
      borderColor:  open ? 'var(--gold-border)' : 'var(--border)',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width:      '100%',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding:    '18px 20px',
          background: open ? 'var(--gold-bg)' : 'var(--bg-surface)',
          border:     'none',
          cursor:     'pointer',
          gap:        16,
          textAlign:  'left',
          transition: 'background var(--t-fast)',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize:   15,
          fontWeight: 600,
          color:      open ? 'var(--gold)' : 'var(--cream)',
          flex:       1,
        }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ flexShrink: 0, color: open ? 'var(--gold)' : 'var(--cream-30)' }}
        >
          <ChevronDown size={18}/>
        </motion.span>
      </button>

      {/* Réponse animée */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   14,
          lineHeight: 1.75,
          color:      'var(--cream-55)',
          padding:    '0 20px 20px',
        }}>
          {a}
        </p>
      </motion.div>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      {/* ── Header de page ────────────────────────────────────── */}
      <section style={{
        background: 'var(--bg-surface)',
        padding:    '64px 24px 80px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <p style={{
            fontFamily:    'var(--font-body)',
            fontSize:      12,
            color:         'var(--cream-30)',
            marginBottom:  16,
            letterSpacing: 0.3,
          }}>
            Accueil / Services
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
              Nos prestations
            </p>
            <h1 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(36px, 6vw, 64px)',
              fontWeight:    900,
              color:         'var(--cream)',
              letterSpacing: -2,
              lineHeight:    1.04,
              marginBottom:  16,
              maxWidth:      640,
            }}>
              Des solutions pour{' '}
              <span style={{ color: 'var(--gold)' }}>chaque commerce</span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize:   16,
              lineHeight: 1.7,
              color:      'var(--cream-55)',
              maxWidth:   520,
            }}>
              De la signalétique à l'habillage complet de façade,
              Pro-Pub Service couvre tous vos besoins en communication visuelle à Abidjan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Grille des services ────────────────────────────────── */}
      <section style={{ background: 'var(--bg-base)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap:                 20,
          }}>
            {SERVICES_DATA.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pourquoi nous choisir ─────────────────────────────── */}
      <section style={{ background: 'var(--bg-surface)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily:    'var(--font-body)',
              fontSize:      11,
              fontWeight:    700,
              color:         'var(--gold)',
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              marginBottom:  12,
            }}
          >
            Nos engagements
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(26px, 4vw, 40px)',
              fontWeight:    900,
              color:         'var(--cream)',
              letterSpacing: -1,
              marginBottom:  48,
            }}
          >
            Pourquoi choisir Pro-Pub Service ?
          </motion.h2>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap:                 24,
          }}>
            {AVANTAGES.map((a, i) => {
              const Icon = a.icon
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{
                    background:   'var(--bg-elevated)',
                    border:       '1px solid var(--border)',
                    borderRadius: 'var(--r-lg)',
                    padding:      '28px 24px',
                  }}
                >
                  <div style={{
                    width:        44,
                    height:       44,
                    borderRadius: 'var(--r-md)',
                    background:   'var(--gold-bg)',
                    border:       '1px solid var(--gold-border)',
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    marginBottom: 18,
                  }}>
                    <Icon size={20} color="var(--gold)"/>
                  </div>
                  <h3 style={{
                    fontFamily:  'var(--font-display)',
                    fontSize:    18,
                    fontWeight:  700,
                    color:       'var(--cream)',
                    marginBottom: 10,
                  }}>
                    {a.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize:   14,
                    lineHeight: 1.7,
                    color:      'var(--cream-55)',
                  }}>
                    {a.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-base)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(24px, 3.5vw, 36px)',
            fontWeight:    900,
            color:         'var(--cream)',
            letterSpacing: -0.8,
            marginBottom:  36,
            textAlign:     'center',
          }}>
            Questions fréquentes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQ.map(item => (
              <FAQItem key={item.q} q={item.q} a={item.a}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────── */}
      <CTABand/>
    </>
  )
}