/**
 * app/(public)/page.tsx  —  Landing page Pro-Pub Service
 * ─────────────────────────────────────────────────────────────────
 * Route : /
 *
 * Composition de la page :
 *  1. HeroSection     → plein écran, headline, CTA, stats
 *  2. ServicesSection → grille des 8 services avec ServiceCard
 *  3. ProcessSection  → 4 étapes du processus (consultation → pose)
 *  4. PortfolioTeaser → aperçu portfolio (3 médias publiés)
 *  5. CTABand         → bande de conversion finale avant le footer
 *
 * Tous les composants sont importés depuis /components.
 * Les données de services sont statiques (SERVICES_DATA).
 * Les médias du teaser viennent de Firebase (hook useMedia, published=true).
 * ─────────────────────────────────────────────────────────────────
 */

import { HeroSection }             from '../components/front/HeroSection'
// ✅ Après
import { ServiceCard }   from '../components/front/ServiceCard'
import { SERVICES_DATA } from '../components/front/services-data'
import { ProcessSection }          from '../components/front/ProcessSection'
import { PortfolioTeaser }         from '../components/front/PortfolioTeaser'
import { CTABand }                 from '../components/front/CTABand'

/* ══════════════════════════════════════════════════════════════════
   SECTION WRAPPER RÉUTILISABLE
   Évite de répéter les mêmes styles de section sur chaque bloc
══════════════════════════════════════════════════════════════════ */
function Section({
  id,
  bg = 'var(--bg-base)',
  children,
  style,
}: {
  id?: string
  bg?: string
  children: React.ReactNode
  style?:   React.CSSProperties
}) {
  return (
    <section
      id={id}
      style={{ background: bg, padding: '96px 0', ...style }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {children}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION HEADER — titre + sous-titre de section
══════════════════════════════════════════════════════════════════ */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: {
  eyebrow:  string
  title:    React.ReactNode
  subtitle?: string
  align?:  'left' | 'center'
}) {
  return (
    <div style={{
      marginBottom: 56,
      textAlign:    align,
      maxWidth:     align === 'center' ? 640 : 580,
      margin:       align === 'center' ? '0 auto 56px' : '0 0 56px',
    }}>
      {/* Eyebrow — petit label au-dessus */}
      <p style={{
        fontFamily:    'var(--font-body)',
        fontSize:      11,
        fontWeight:    700,
        color:         'var(--gold)',
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        marginBottom:  12,
      }}>
        {eyebrow}
      </p>

      {/* Titre principal */}
      <h2 style={{
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(28px, 4.5vw, 48px)',
        fontWeight:    900,
        color:         'var(--cream)',
        letterSpacing: -1.2,
        lineHeight:    1.08,
        marginBottom:  subtitle ? 16 : 0,
      }}>
        {title}
      </h2>

      {/* Sous-titre optionnel */}
      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   16,
          lineHeight: 1.7,
          color:      'var(--cream-55)',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <HeroSection/>

      {/* ── 2. SERVICES ─────────────────────────────────────────── */}
      <Section id="services" bg="var(--bg-surface)">
        <SectionHeader
          eyebrow="Nos expertises"
          title={
            <>
              Tout pour que votre commerce{' '}
              <span style={{ color: 'var(--gold)' }}>se démarque</span>
            </>
          }
          subtitle="De la conception à la pose, notre équipe couvre l'intégralité de votre projet signalétique et façadisme."
        />

        {/* Grille responsive de ServiceCards */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap:                 20,
        }}>
          {SERVICES_DATA.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              delay={i * 0.07}   // stagger progressif
            />
          ))}
        </div>
      </Section>

      {/* ── 3. PROCESSUS ────────────────────────────────────────── */}
      <ProcessSection/>

      {/* ── 4. PORTFOLIO TEASER ─────────────────────────────────── */}
      <Section id="portfolio" bg="var(--bg-surface)">
        <SectionHeader
          eyebrow="Nos réalisations"
          title="Ce que nous avons créé"
          subtitle="Quelques exemples de façades, enseignes et décorations réalisées à Abidjan."
          align="center"
        />
        {/* Client component — charge les médias publiés depuis Firebase */}
        <PortfolioTeaser/>
      </Section>

      {/* ── 5. BANDE CTA FINALE ─────────────────────────────────── */}
      <CTABand/>
    </>
  )
}