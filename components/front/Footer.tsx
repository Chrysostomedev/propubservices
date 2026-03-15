'use client'

import Link from 'next/link'
import { MapPin, Phone, MessageCircle, Instagram, Facebook, ArrowUpRight } from 'lucide-react'

/* ── Data ───────────────────────────────────────────────────────── */
const SERVICE_LINKS = [
  'Enseignes 3D',
  'Façades décoratives',
  'Lettres lumineuses LED',
  'Déco néon',
  'Logos muraux',
  'Revêtement Alucobond',
  'Imprimerie',
  'Vitrerie',
]

const NAV_LINKS = [
  { label: 'Accueil',   href: '/' },
  { label: 'Services',  href: '/front/services' },
  { label: 'Galerie', href: '/front/galerie' },
  { label: 'Devis',     href: '/front/devis' },
  { label: 'Contact',   href: '/front/contact' },
]

/* ── Séparateur bleu ────────────────────────────────────────────── */
function GoldLine() {
  return (
    <div style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent, rgba(59,64,232,0.5) 30%, rgba(59,64,232,0.5) 70%, transparent)',
      margin: '0 0 48px',
    }}/>
  )
}

/* ── Footer ─────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer style={{ background: '#09090D', paddingTop: 64 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <GoldLine />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 48,
          marginBottom: 56,
        }}>
          {/* ── Colonne brand ─────────────────────────────────────── */}
          <div style={{ gridColumn: 'span 1' }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44,
                background: '#2B2FD9',
                borderRadius: 'var(--r-md)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 0, flexShrink: 0,
                boxShadow: '0 2px 12px rgba(43,47,217,0.35)',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 10, color: '#FFFFFF', letterSpacing: 1.5, lineHeight: 1.1 }}>PRO</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 10, color: '#FFFFFF', letterSpacing: 1.5, lineHeight: 1.1 }}>PUB</span>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 6, color: '#E8B84B', letterSpacing: 1.5, textTransform: 'uppercase', lineHeight: 1.4 }}>SERVICES</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--cream)', lineHeight: 1.2 }}>Pro-Pub Service</div>
                <div style={{ fontSize: 10, color: 'var(--cream-30)', letterSpacing: 2, textTransform: 'uppercase' }}>Yopougon · Abidjan</div>
              </div>
            </Link>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.75,
              color: 'var(--cream-55)', marginBottom: 22, maxWidth: 240,
            }}>
              Spécialiste de la signalétique et du façadisme commercial à Abidjan depuis 2016.
            </p>

            {/* Réseaux sociaux */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { icon: Facebook,    href: '#', label: 'Facebook' },
                { icon: Instagram,   href: '#', label: 'Instagram' },
                { icon: MessageCircle, href: 'https://wa.me/2250787636402', label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36,
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-sm)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--cream-55)',
                    transition: 'border-color var(--t-fast), color var(--t-fast), background var(--t-fast)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--gold-border)'
                    e.currentTarget.style.color = 'var(--gold)'
                    e.currentTarget.style.background = 'var(--gold-bg)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--cream-55)'
                    e.currentTarget.style.background = 'var(--bg-elevated)'
                  }}
                >
                  <Icon size={15}/>
                </a>
              ))}
            </div>
          </div>

          {/* ── Colonne services ──────────────────────────────────── */}
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 18,
            }}>Services</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {SERVICE_LINKS.map(s => (
                <li key={s}>
                  <Link
                    href="/services"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', transition: 'color var(--t-fast)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream-55)')}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Colonne navigation ───────────────────────────────── */}
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 18,
            }}>Navigation</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {NAV_LINKS.map(n => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', transition: 'color var(--t-fast)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream-55)')}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Colonne contact ───────────────────────────────────── */}
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: 18,
            }}>Contact</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <MapPin size={14} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }}/>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', lineHeight: 1.65 }}>
                  Yopougon, 16e Arrondissement<br/>Abidjan, Côte d'Ivoire
                </span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Phone size={14} color="var(--gold)" style={{ flexShrink: 0 }}/>
                <a
                  href="tel:+2250787636402"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', transition: 'color var(--t-fast)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream-55)')}
                >
                  +225 07 87 63 64 02
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/2250787636402"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366',
                padding: '10px 18px', borderRadius: 'var(--r-md)',
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                transition: 'background var(--t-fast)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.18)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.12)')}
            >
              <MessageCircle size={15}/>
              Écrire sur WhatsApp
              <ArrowUpRight size={13}/>
            </a>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '20px 0',
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 8,
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-30)' }}>
            © {new Date().getFullYear()} Pro-Pub Service — Tous droits réservés
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-30)' }}>
            Yopougon · Abidjan · Côte d'Ivoire
          </span>
        </div>
      </div>
    </footer>
  )
}