'use client'

import { useState }                from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save, Layers } from 'lucide-react'

/* ── Types ───────────────────────────────────────────────────────── */
interface Service {
  id:          string
  slug:        string
  title:       string
  description: string
  price:       string
  category:    string
  active:      boolean
}

/* ── Données statiques ───────────────────────────────────────────── */
const INITIAL_SERVICES: Service[] = [
  { id: '1', slug: 'enseignes-3d',         title: 'Enseignes 3D',              description: 'Lettres et logos en relief, finition chromée ou laquée.',          price: 'Sur devis', category: 'Enseigne', active: true  },
  { id: '2', slug: 'facades-decoratives',  title: 'Façades décoratives',        description: 'Habillage complet de façade avec Alucobond ou composite.',          price: 'Sur devis', category: 'Façade',   active: true  },
  { id: '3', slug: 'lettres-led',          title: 'Lettres lumineuses LED',     description: 'Lettres rétroéclairées, basse consommation, haute durabilité.',     price: 'Sur devis', category: 'LED',      active: true  },
  { id: '4', slug: 'neon-deco',            title: 'Décoration néon',            description: 'Néon flex personnalisé pour intérieur et extérieur.',               price: 'Sur devis', category: 'Néon',     active: true  },
  { id: '5', slug: 'logos-muraux',         title: 'Logos muraux',               description: 'Impression et pose de logos grand format sur mur ou vitrine.',      price: 'Sur devis', category: 'Impression', active: true },
  { id: '6', slug: 'alucobond',            title: 'Revêtement Alucobond',       description: 'Panneaux composites aluminium pour façades modernes.',              price: 'Sur devis', category: 'Façade',   active: false },
  { id: '7', slug: 'imprimerie',           title: 'Imprimerie',                 description: 'Flyers, banderoles, bâches, cartes de visite.',                     price: 'Sur devis', category: 'Impression', active: true },
  { id: '8', slug: 'vitrerie',             title: 'Vitrerie & Stickers',        description: 'Covering vitrine, film dépoli, stickers personnalisés.',            price: 'Sur devis', category: 'Vitrine',  active: true  },
]

const CATEGORIES = ['Enseigne', 'Façade', 'LED', 'Néon', 'Impression', 'Vitrine', 'Autre']

const EMPTY: Omit<Service, 'id'> = { slug: '', title: '', description: '', price: 'Sur devis', category: 'Enseigne', active: true }

/* ── Modal Form ──────────────────────────────────────────────────── */
function ServiceModal({
  service,
  onSave,
  onClose,
}: {
  service: Service | null
  onSave:  (data: Omit<Service, 'id'>) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<Omit<Service, 'id'>>(
    service ? { slug: service.slug, title: service.title, description: service.description, price: service.price, category: service.category, active: service.active }
            : { ...EMPTY }
  )

  const set = (k: keyof typeof form, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '10px 12px',
    background: 'var(--bg-elevated)', border: '1px solid var(--border-md)',
    borderRadius: 'var(--r-md)', color: 'var(--cream)',
    fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 520,
          background: 'var(--bg-surface)', border: '1px solid var(--border-md)',
          borderRadius: 'var(--r-xl)', overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header modal */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--cream)' }}>
            {service ? 'Modifier le service' : 'Nouveau service'}
          </h2>
          <button onClick={onClose} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--cream-55)' }}>
            <X size={14} />
          </button>
        </div>

        {/* Corps */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Titre *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Enseignes 3D" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border-md)')} />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Slug *</label>
              <input value={form.slug} onChange={e => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="enseignes-3d" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border-md)')} />
            </div>
          </div>

          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Description *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Description du service..." style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border-md)')} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Catégorie</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Prix affiché</label>
              <input value={form.price} onChange={e => set('price', e.target.value)} placeholder="Sur devis" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border-md)')} />
            </div>
          </div>

          {/* Toggle actif */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div
              onClick={() => set('active', !form.active)}
              style={{
                width: 40, height: 22, borderRadius: 11,
                background: form.active ? 'var(--gold)' : 'var(--bg-elevated)',
                border: '1px solid var(--border-md)',
                position: 'relative', transition: 'background var(--t-fast)', cursor: 'pointer',
              }}
            >
              <motion.div
                animate={{ x: form.active ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                style={{ position: 'absolute', top: 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              />
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)' }}>
              {form.active ? 'Visible sur le site' : 'Masqué'}
            </span>
          </label>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', color: 'var(--cream-55)', fontFamily: 'var(--font-body)', fontSize: 13, cursor: 'pointer' }}>
            Annuler
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => { if (form.title && form.slug) onSave(form) }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px', background: 'var(--gold)', border: 'none', borderRadius: 'var(--r-md)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
          >
            <Save size={13} /> Enregistrer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Page Catalogue ──────────────────────────────────────────────── */
export default function CataloguePage() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES)
  const [modal,    setModal]    = useState<'new' | Service | null>(null)
  const [delId,    setDelId]    = useState<string | null>(null)

  const handleSave = (data: Omit<Service, 'id'>) => {
    if (modal === 'new') {
      setServices(s => [...s, { ...data, id: Date.now().toString() }])
    } else if (modal && typeof modal === 'object') {
      setServices(s => s.map(x => x.id === modal.id ? { ...x, ...data } : x))
    }
    setModal(null)
  }

  const handleDelete = (id: string) => {
    setServices(s => s.filter(x => x.id !== id))
    setDelId(null)
  }

  const toggleActive = (id: string) => {
    setServices(s => s.map(x => x.id === id ? { ...x, active: !x.active } : x))
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Layers size={20} color="var(--gold)" />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.4 }}>Catalogue</h1>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-55)' }}>
            {services.length} services · {services.filter(s => s.active).length} actifs
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setModal('new')}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', background: 'var(--gold)', border: 'none', borderRadius: 'var(--r-md)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          <Plus size={15} /> Nouveau service
        </motion.button>
      </div>

      {/* Grille de cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            style={{
              background: 'var(--bg-surface)', border: `1px solid ${s.active ? 'var(--border)' : 'var(--border)'}`,
              borderRadius: 'var(--r-lg)', padding: '18px',
              opacity: s.active ? 1 : 0.55,
              transition: 'opacity var(--t-fast)',
            }}
          >
            {/* Top */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase' }}>
                  {s.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--cream)', marginTop: 2 }}>
                  {s.title}
                </h3>
              </div>
              <span style={{
                padding: '2px 8px', borderRadius: 'var(--r-full)',
                background: s.active ? 'var(--green-bg)' : 'var(--bg-elevated)',
                border: `1px solid ${s.active ? 'var(--green-border)' : 'var(--border)'}`,
                color: s.active ? 'var(--green)' : 'var(--cream-30)',
                fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
              }}>
                {s.active ? 'Actif' : 'Masqué'}
              </span>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-55)', lineHeight: 1.6, marginBottom: 14 }}>
              {s.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-30)' }}>
                {s.price}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => toggleActive(s.id)}
                  title={s.active ? 'Masquer' : 'Activer'}
                  style={{ width: 30, height: 30, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: s.active ? 'var(--green)' : 'var(--cream-30)', fontSize: 12 }}
                >
                  {s.active ? '●' : '○'}
                </button>
                <button
                  onClick={() => setModal(s)}
                  style={{ width: 30, height: 30, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--cream-55)' }}
                >
                  <Pencil size={12} />
                </button>
                <button
                  onClick={() => setDelId(s.id)}
                  style={{ width: 30, height: 30, background: 'var(--red-bg)', border: '1px solid var(--red-border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--red)' }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal form */}
      <AnimatePresence>
        {modal !== null && (
          <ServiceModal
            service={modal === 'new' ? null : modal}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>

      {/* Confirm delete */}
      <AnimatePresence>
        {delId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDelId(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          >
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--red-border)', borderRadius: 'var(--r-xl)', padding: '28px', maxWidth: 360, width: '100%', textAlign: 'center' }}
            >
              <Trash2 size={28} color="var(--red)" style={{ marginBottom: 12 }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>Supprimer ce service ?</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', marginBottom: 20 }}>Cette action est irréversible.</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setDelId(null)} style={{ flex: 1, padding: '10px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', color: 'var(--cream-55)', fontFamily: 'var(--font-body)', fontSize: 13, cursor: 'pointer' }}>Annuler</button>
                <button onClick={() => handleDelete(delId)} style={{ flex: 1, padding: '10px', background: 'var(--red)', border: 'none', borderRadius: 'var(--r-md)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Supprimer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
