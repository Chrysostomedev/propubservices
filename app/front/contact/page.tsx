'use client'

/**
 * app/front/contact/page.tsx
 * Route : /contact
 *
 * Page de contact avec carte Google Maps et formulaire.
 * Logique Firebase désactivée temporairement — formulaire statique.
 */

import { useState }    from 'react'
import { motion }      from 'framer-motion'
import { Input, Textarea } from '../../../components/ui/Input'
import { Button }      from '../../../components/ui/Button'
import {
  MapPin, Phone, MessageCircle,
  Clock, CheckCircle2, Send,
}                      from 'lucide-react'

/* ── Infos de contact ───────────────────────────────────────────── */
const CONTACT_INFOS = [
  {
    icon:  MapPin,
    title: 'Notre atelier',
    lines: ['Yopougon, 16e Arrondissement', "Abidjan, Côte d'Ivoire"],
    color: 'var(--gold)',
  },
  {
    icon:  Phone,
    title: 'Téléphone',
    lines: ['+225 07 87 63 64 02'],
    href:  'tel:+2250787636402',
    color: 'var(--blue)',
  },
  {
    icon:  MessageCircle,
    title: 'WhatsApp',
    lines: ['+225 07 87 63 64 02', 'Réponse rapide garantie'],
    href:  'https://wa.me/2250787636402',
    color: '#25D366',
  },
  {
    icon:  Clock,
    title: 'Horaires',
    lines: ['Lundi – Samedi : 8h – 18h', 'Dimanche : sur rendez-vous'],
    color: 'var(--cream-55)',
  },
]

/* ── Formulaire de message ──────────────────────────────────────── */
function ContactForm() {
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [values, setValues]   = useState({ name: '', phone: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }))
  }

  /* Soumission statique — Firebase désactivé temporairement */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.name || !values.phone || !values.message) return
    setLoading(true)
    /* TODO: brancher Firebase addDoc(collection(db, 'messages'), { ...values }) */
    await new Promise(r => setTimeout(r, 800)) // simulation délai réseau
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          padding:      '48px 24px',
          textAlign:    'center',
          background:   'var(--bg-elevated)',
          borderRadius: 'var(--r-lg)',
          border:       '1px solid var(--gold-border)',
        }}
      >
        <CheckCircle2 size={40} color="var(--gold)" style={{ margin: '0 auto 16px', display: 'block' }} />
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--cream)', marginBottom: 8 }}>
          Message reçu !
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-55)' }}>
          Nous vous répondrons dans les 24h.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Input
        name="name"
        value={values.name}
        onChange={handleChange}
        label="Votre nom"
        placeholder="Jean Kouadio"
        required
      />
      <Input
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        label="Téléphone / WhatsApp"
        placeholder="+225 07 XX XX XX XX"
        required
      />
      <Textarea
        name="message"
        value={values.message}
        onChange={handleChange}
        label="Votre message"
        placeholder="Décrivez votre projet ou posez votre question…"
        style={{ minHeight: 120 }}
        required
      />
      <Button type="submit" loading={loading} iconRight={<Send size={15} />} fullWidth>
        Envoyer le message
      </Button>
    </form>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section style={{
        background:   'var(--bg-surface)',
        padding:      '56px 24px 72px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-30)', marginBottom: 16 }}>
            Accueil / Contact
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(32px, 5vw, 56px)',
              fontWeight:    900,
              color:         'var(--cream)',
              letterSpacing: -1.5,
              lineHeight:    1.06,
              marginBottom:  12,
            }}
          >
            Parlons de votre{' '}
            <span style={{ color: 'var(--gold)' }}>projet</span>
          </motion.h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--cream-55)', lineHeight: 1.7 }}>
            Notre équipe à Yopougon est disponible du lundi au samedi.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <section style={{ background: 'var(--bg-base)', padding: '56px 24px 80px' }}>
        <div style={{
          maxWidth:            1280,
          margin:              '0 auto',
          display:             'grid',
          gridTemplateColumns: '1fr 400px',
          gap:                 48,
          alignItems:          'flex-start',
        }}>

          {/* ── Gauche : carte + infos ─────────────────────────── */}
          <div>
            {/* Google Maps embed */}
            <div style={{
              borderRadius: 'var(--r-lg)',
              overflow:     'hidden',
              border:       '1px solid var(--border)',
              marginBottom: 32,
              height:       320,
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15882.28!2d-4.1!3d5.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zWW9wb3Vnb24!5e0!3m2!1sfr!2sci!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', filter: 'grayscale(60%) invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pro-Pub Service — Yopougon Abidjan"
              />
            </div>

            {/* Grille infos contact */}
            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap:                 16,
            }}>
              {CONTACT_INFOS.map(info => {
                const Icon = info.icon
                return (
                  <a
                    key={info.title}
                    href={info.href}
                    target={info.href?.startsWith('http') ? '_blank' : undefined}
                    rel={info.href?.startsWith('http') ? 'noreferrer' : undefined}
                    style={{
                      display:       'flex',
                      flexDirection: 'column',
                      gap:           8,
                      background:    'var(--bg-surface)',
                      border:        '1px solid var(--border)',
                      borderRadius:  'var(--r-md)',
                      padding:       '18px',
                      textDecoration: 'none',
                      transition:    'border-color var(--t-fast)',
                    }}
                    onMouseEnter={e => info.href && (e.currentTarget.style.borderColor = 'var(--border-md)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <Icon size={18} color={info.color} />
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--cream-30)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                        {info.title}
                      </p>
                      {info.lines.map(l => (
                        <p key={l} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', lineHeight: 1.5 }}>
                          {l}
                        </p>
                      ))}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* ── Droite : formulaire ───────────────────────────── */}
          <div style={{
            background:   'var(--bg-surface)',
            border:       '1px solid var(--border)',
            borderRadius: 'var(--r-xl)',
            padding:      '32px 28px',
          }}>
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontSize:      20,
              fontWeight:    800,
              color:         'var(--cream)',
              letterSpacing: -0.3,
              marginBottom:  4,
            }}>
              Envoyer un message
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-30)', marginBottom: 24 }}>
              Réponse sous 24h ouvrés.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section:last-of-type > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
