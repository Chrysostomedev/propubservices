import type { Metadata } from 'next'
import Link              from 'next/link'
import { ProcessSection } from '../../../components/front/ProcessSection'
import { CTABand }        from '../../../components/front/CTABand'

export const metadata: Metadata = {
  title: 'Notre processus',
  description: 'De la consultation à l\'installation — découvrez les 4 étapes du processus Pro-Pub Service pour transformer votre commerce à Abidjan.',
}

export default function ProcessusPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--bg-surface)',
        padding: '80px 24px 64px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
            color: 'var(--gold)', letterSpacing: 2.5, textTransform: 'uppercase',
            marginBottom: 16,
          }}>
            Comment ça marche
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 900, color: 'var(--cream)',
            letterSpacing: -1.5, lineHeight: 1.06,
            marginBottom: 20,
          }}>
            De l'idée à{' '}
            <span style={{ color: 'var(--gold)' }}>l'installation</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75,
            color: 'var(--cream-55)', marginBottom: 36, maxWidth: 560, margin: '0 auto 36px',
          }}>
            Un processus clair en 4 étapes, de la consultation gratuite jusqu'à la pose finale avec garantie 12 mois.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/front/devis" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--gold)', color: '#fff',
              padding: '12px 28px', borderRadius: 'var(--r-md)',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700,
              textDecoration: 'none',
            }}>
              Démarrer mon projet →
            </Link>
            <a href="https://wa.me/2250787636402" target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.25)',
              color: '#25D366', padding: '12px 24px', borderRadius: 'var(--r-md)',
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
              textDecoration: 'none',
            }}>
              WhatsApp direct
            </a>
          </div>
        </div>
      </section>

      {/* ── Les 4 étapes ─────────────────────────────────────────── */}
      <ProcessSection />

      {/* ── FAQ rapide ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-surface)', padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 12 }}>
            Questions fréquentes
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.8, marginBottom: 40 }}>
            Ce que vous voulez savoir
          </h2>

          {[
            { q: 'Combien de temps prend une installation ?',         r: 'Selon la complexité, entre 3 et 10 jours ouvrés après validation de la maquette. Une enseigne simple peut être posée en 1 journée.' },
            { q: 'Le devis est-il vraiment gratuit ?',                r: 'Oui, totalement. Consultation, visite technique et maquette 3D sont incluses sans engagement de votre part.' },
            { q: 'Intervenez-vous en dehors de Yopougon ?',           r: 'Nous couvrons tout Abidjan et ses communes. Des déplacements en dehors d\'Abidjan sont possibles selon le projet.' },
            { q: 'Quelle garantie sur les travaux ?',                 r: 'Garantie 12 mois sur la main d\'œuvre. Les matériaux (LED, Alucobond) bénéficient de la garantie fabricant.' },
            { q: 'Peut-on modifier la maquette avant fabrication ?',  r: 'Oui, les révisions sont illimitées jusqu\'à votre validation finale. Aucune fabrication ne démarre sans votre accord écrit.' },
          ].map(({ q, r }) => (
            <div key={q} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>{q}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-55)', lineHeight: 1.7 }}>{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────── */}
      <CTABand />
    </>
  )
}
