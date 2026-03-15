'use client'

/**
 * DevisForm.tsx
 * Formulaire de demande de devis en 3 étapes progressives.
 * Logique Firebase désactivée temporairement — soumission simulée.
 */

import { useState, useEffect }     from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2, Send } from 'lucide-react'
import { Input, Textarea, Select } from '../ui/Input'
import { Button }                  from '../ui/Button'
// ✅ Après
import { ServiceCard }   from './ServiceCard'
import { SERVICES_DATA } from './services-data'
/* ── Types du formulaire ─────────────────────────────────────────── */
interface FormValues {
  service:     string
  surface:     string
  address:     string
  deadline:    string
  message:     string
  clientName:  string
  clientPhone: string
  clientEmail: string
}

const DEFAULT_VALUES: FormValues = {
  service:     '',
  surface:     '',
  address:     '',
  deadline:    'normal',
  message:     '',
  clientName:  '',
  clientPhone: '',
  clientEmail: '',
}

/* ── Options délai ───────────────────────────────────────────────── */
const DEADLINE_OPTIONS = [
  { value: 'urgent',  label: "Urgent — moins d'une semaine" },
  { value: 'normal',  label: 'Normal — 2 à 3 semaines'      },
  { value: 'planned', label: 'Planifié — 1 mois et plus'    },
]

/* ── Champs requis par étape ─────────────────────────────────────── */
const STEP_REQUIRED: (keyof FormValues)[][] = [
  ['service'],
  ['address'],
  ['clientName', 'clientPhone'],
]

/* ── Barre de progression ────────────────────────────────────────── */
function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex:       1,
              height:     3,
              borderRadius: 2,
              background: i < current
                ? 'var(--gold)'
                : i === current
                  ? 'var(--gold-dim)'
                  : 'var(--border-md)',
              transition: 'background var(--t-med)',
            }}
          />
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-30)' }}>
        Étape {current + 1} sur {total}
      </p>
    </div>
  )
}

/* ── DevisForm ───────────────────────────────────────────────────── */
export function DevisForm() {
  const [step, setStep]           = useState(0)
  const [loading, setLoading]     = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues]       = useState<FormValues>(DEFAULT_VALUES)
  const [errors, setErrors]       = useState<Partial<Record<keyof FormValues, string>>>({})

  const router       = useRouter()
  const searchParams = useSearchParams()

  /* Pré-remplir le service depuis l'URL (?service=slug) */
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      const found = SERVICES_DATA.find(s => s.slug === serviceParam)
      if (found) setValues(v => ({ ...v, service: found.title }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
    if (errors[name as keyof FormValues]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  /* Validation simple par étape */
  const validateStep = (): boolean => {
    const required = STEP_REQUIRED[step]
    const newErrors: Partial<Record<keyof FormValues, string>> = {}
    required.forEach(field => {
      if (!values[field]?.trim()) {
        newErrors[field] = 'Ce champ est requis'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goNext = () => { if (validateStep()) setStep(s => s + 1) }
  const goPrev = () => setStep(s => s - 1)

  /* Soumission statique — Firebase désactivé temporairement */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) return
    setLoading(true)
    /* TODO: brancher Firebase addDoc(collection(db, 'devis'), { ...values }) */
    await new Promise(r => setTimeout(r, 900)) // simulation délai réseau
    setLoading(false)
    setSubmitted(true)
  }

  /* ── État succès ─────────────────────────────────────────────── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        style={{
          textAlign:    'center',
          padding:      '60px 24px',
          background:   'var(--bg-surface)',
          border:       '1px solid var(--gold-border)',
          borderRadius: 'var(--r-xl)',
        }}
      >
        <div style={{
          width: 72, height: 72,
          background: 'var(--gold-bg)',
          border: '1px solid var(--gold-border)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <CheckCircle2 size={36} color="var(--gold)" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.5, marginBottom: 12 }}>
          Demande envoyée !
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--cream-55)', lineHeight: 1.7, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
          Notre équipe vous contacte dans les <strong style={{ color: 'var(--cream)' }}>48h</strong>.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://wa.me/2250787636402" target="_blank" rel="noreferrer">
            <Button variant="success">Écrire sur WhatsApp maintenant</Button>
          </a>
          <Button variant="ghost" onClick={() => router.push('/')}>
            Retour à l'accueil
          </Button>
        </div>
      </motion.div>
    )
  }

  /* ── Formulaire multi-étapes ─────────────────────────────────── */
  return (
    <div style={{
      background:   'var(--bg-surface)',
      border:       '1px solid var(--border)',
      borderRadius: 'var(--r-xl)',
      padding:      'clamp(24px, 5vw, 48px)',
      maxWidth:     680,
      margin:       '0 auto',
    }}>
      <StepProgress current={step} total={3} />

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">

          {/* ── Étape 0 : Choix du service ─────────────────────── */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.4, marginBottom: 8 }}>
                Quel service vous intéresse ?
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-55)', marginBottom: 24 }}>
                Sélectionnez le type de prestation souhaitée.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, marginBottom: 24 }}>
                {SERVICES_DATA.map(svc => {
                  const isSelected = values.service === svc.title
                  return (
                    <button
                      key={svc.slug}
                      type="button"
                      onClick={() => setValues(v => ({ ...v, service: svc.title }))}
                      style={{
                        padding:      '14px 16px',
                        borderRadius: 'var(--r-md)',
                        border:       `1px solid ${isSelected ? 'var(--gold-border)' : 'var(--border)'}`,
                        background:   isSelected ? 'var(--gold-bg)' : 'var(--bg-elevated)',
                        color:        isSelected ? 'var(--gold)' : 'var(--cream-55)',
                        fontFamily:   'var(--font-body)',
                        fontSize:     13,
                        fontWeight:   isSelected ? 700 : 500,
                        textAlign:    'left',
                        cursor:       'pointer',
                        transition:   'all var(--t-fast)',
                        display:      'flex',
                        alignItems:   'center',
                        gap:          8,
                      }}
                    >
                      <span style={{
                        width: 16, height: 16, borderRadius: '50%',
                        border:     `2px solid ${isSelected ? 'var(--gold)' : 'var(--border-md)'}`,
                        background: isSelected ? 'var(--gold)' : 'transparent',
                        flexShrink: 0,
                        transition: 'all var(--t-fast)',
                      }} />
                      {svc.title}
                    </button>
                  )
                })}
              </div>

              {errors.service && (
                <p style={{ color: 'var(--red)', fontSize: 12, fontFamily: 'var(--font-body)', marginBottom: 16 }}>
                  {errors.service}
                </p>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="button" onClick={goNext} iconRight={<ArrowRight size={16} />}>
                  Continuer
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Étape 1 : Détails du projet ────────────────────── */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.4, marginBottom: 8 }}>
                Décrivez votre projet
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-55)', marginBottom: 28 }}>
                Service choisi : <strong style={{ color: 'var(--gold)' }}>{values.service}</strong>
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Input
                  name="surface"
                  value={values.surface}
                  onChange={handleChange}
                  label="Surface estimée"
                  placeholder="Ex: 8 m², 3 m linéaires…"
                  hint="Approximatif — nos techniciens mesureront sur place"
                />
                <Input
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  label="Adresse du commerce"
                  placeholder="Quartier, commune, rue…"
                  required
                  error={errors.address}
                />
                <Select
                  name="deadline"
                  value={values.deadline}
                  onChange={handleChange}
                  label="Délai souhaité"
                  options={DEADLINE_OPTIONS}
                />
                <Textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  label="Message libre (optionnel)"
                  placeholder="Couleurs souhaitées, contraintes, inspirations…"
                  style={{ minHeight: 100 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                <Button type="button" variant="ghost" onClick={goPrev} iconLeft={<ArrowLeft size={16} />}>
                  Retour
                </Button>
                <Button type="button" onClick={goNext} iconRight={<ArrowRight size={16} />}>
                  Continuer
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Étape 2 : Coordonnées ──────────────────────────── */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.4, marginBottom: 8 }}>
                Vos coordonnées
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-55)', marginBottom: 28 }}>
                Pour que notre équipe puisse vous recontacter sous 48h.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Input
                  name="clientName"
                  value={values.clientName}
                  onChange={handleChange}
                  label="Nom & Prénom"
                  placeholder="Jean Kouadio"
                  required
                  error={errors.clientName}
                />
                <Input
                  name="clientPhone"
                  type="tel"
                  value={values.clientPhone}
                  onChange={handleChange}
                  label="Téléphone / WhatsApp"
                  placeholder="+225 07 XX XX XX XX"
                  required
                  hint="Nous vous contacterons de préférence sur WhatsApp"
                  error={errors.clientPhone}
                />
                <Input
                  name="clientEmail"
                  type="email"
                  value={values.clientEmail}
                  onChange={handleChange}
                  label="Email (optionnel)"
                  placeholder="votre@email.com"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                <Button type="button" variant="ghost" onClick={goPrev} iconLeft={<ArrowLeft size={16} />}>
                  Retour
                </Button>
                <Button type="submit" loading={loading} iconRight={<Send size={16} />}>
                  {loading ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </form>
    </div>
  )
}
