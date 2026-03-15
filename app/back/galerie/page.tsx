'use client'

import { useState }                from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, X, Save, Image as ImageIcon, Eye, EyeOff } from 'lucide-react'

/* ── Types ───────────────────────────────────────────────────────── */
interface GalerieItem {
  id:        string
  title:     string
  category:  string
  imageUrl:  string
  published: boolean
}

/* ── Données statiques mock ──────────────────────────────────────── */
const INITIAL_ITEMS: GalerieItem[] = [
  { id: '1', title: 'Enseigne 3D Pharmacie Centrale',   category: 'Enseigne 3D',   imageUrl: 'https://placehold.co/400x300/2B2FD9/fff?text=Enseigne+3D',   published: true  },
  { id: '2', title: 'Façade Alucobond Boutique Mode',   category: 'Façade',        imageUrl: 'https://placehold.co/400x300/3B40E8/fff?text=Façade',         published: true  },
  { id: '3', title: 'Lettres LED Restaurant Le Palais', category: 'LED',           imageUrl: 'https://placehold.co/400x300/1a1d8a/fff?text=LED',            published: true  },
  { id: '4', title: 'Néon déco Bar Lounge',             category: 'Néon',          imageUrl: 'https://placehold.co/400x300/E8B84B/fff?text=Néon',           published: false },
  { id: '5', title: 'Logo mural Agence Immobilière',    category: 'Logo mural',    imageUrl: 'https://placehold.co/400x300/2B2FD9/fff?text=Logo',           published: true  },
  { id: '6', title: 'Stickers vitrine Salon Beauté',    category: 'Vitrerie',      imageUrl: 'https://placehold.co/400x300/3B40E8/fff?text=Vitrine',        published: false },
]

const CATEGORIES = ['Enseigne 3D', 'Façade', 'LED', 'Néon', 'Logo mural', 'Vitrerie', 'Imprimerie']

/* ── Modal ajout ─────────────────────────────────────────────────── */
function AddModal({ onSave, onClose }: { onSave: (item: Omit<GalerieItem, 'id'>) => void; onClose: () => void }) {
  const [form, setForm] = useState({ title: '', category: 'Enseigne 3D', imageUrl: '', published: true })
  const set = (k: keyof typeof form, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', padding: '10px 12px',
    background: 'var(--bg-elevated)', border: '1px solid var(--border-md)',
    borderRadius: 'var(--r-md)', color: 'var(--cream)',
    fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 480, background: 'var(--bg-surface)', border: '1px solid var(--border-md)', borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
      >
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--cream)' }}>Ajouter une réalisation</h2>
          <button onClick={onClose} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--cream-55)' }}>
            <X size={13} />
          </button>
        </div>

        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Titre *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Enseigne 3D Pharmacie..." style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border-md)')} />
          </div>
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>Catégorie</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: 'var(--cream-55)', display: 'block', marginBottom: 5 }}>URL image</label>
            <input value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} placeholder="https://..." style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border-md)')} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div onClick={() => set('published', !form.published)} style={{ width: 40, height: 22, borderRadius: 11, background: form.published ? 'var(--gold)' : 'var(--bg-elevated)', border: '1px solid var(--border-md)', position: 'relative', transition: 'background var(--t-fast)', cursor: 'pointer' }}>
              <motion.div animate={{ x: form.published ? 20 : 2 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }} style={{ position: 'absolute', top: 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)' }}>{form.published ? 'Publié' : 'Brouillon'}</span>
          </label>
        </div>

        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', color: 'var(--cream-55)', fontFamily: 'var(--font-body)', fontSize: 13, cursor: 'pointer' }}>Annuler</button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { if (form.title) onSave(form) }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'var(--gold)', border: 'none', borderRadius: 'var(--r-md)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            <Save size={13} /> Enregistrer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Page Galerie ─────────────────────────────────────────────────── */
export default function GaleriePage() {
  const [items,    setItems]    = useState<GalerieItem[]>(INITIAL_ITEMS)
  const [showAdd,  setShowAdd]  = useState(false)
  const [filter,   setFilter]   = useState<string>('Tous')

  const handleAdd = (data: Omit<GalerieItem, 'id'>) => {
    setItems(s => [{ ...data, id: Date.now().toString() }, ...s])
    setShowAdd(false)
  }

  const togglePublish = (id: string) => setItems(s => s.map(x => x.id === id ? { ...x, published: !x.published } : x))
  const handleDelete  = (id: string) => setItems(s => s.filter(x => x.id !== id))

  const allCategories = ['Tous', ...CATEGORIES]
  const filtered = filter === 'Tous' ? items : items.filter(x => x.category === filter)

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <ImageIcon size={20} color="var(--gold)" />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.4 }}>Galerie</h1>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-55)' }}>
            {items.length} réalisations · {items.filter(x => x.published).length} publiées
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowAdd(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', background: 'var(--gold)', border: 'none', borderRadius: 'var(--r-md)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          <Plus size={15} /> Ajouter
        </motion.button>
      </div>

      {/* Filtres catégorie */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '5px 14px', borderRadius: 'var(--r-full)',
              background: filter === cat ? 'var(--gold)' : 'var(--bg-elevated)',
              border: `1px solid ${filter === cat ? 'var(--gold)' : 'var(--border-md)'}`,
              color: filter === cat ? '#fff' : 'var(--cream-55)',
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', transition: 'all var(--t-fast)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)', overflow: 'hidden',
              opacity: item.published ? 1 : 0.6,
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--bg-elevated)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl || `https://placehold.co/400x300/16161D/555?text=${encodeURIComponent(item.title)}`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{
                position: 'absolute', top: 8, right: 8,
                padding: '2px 8px', borderRadius: 'var(--r-full)',
                background: item.published ? 'rgba(34,197,94,0.85)' : 'rgba(0,0,0,0.6)',
                color: '#fff', fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
              }}>
                {item.published ? 'Publié' : 'Brouillon'}
              </span>
            </div>

            {/* Infos */}
            <div style={{ padding: '12px 14px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase' }}>{item.category}</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--cream)', marginTop: 3, marginBottom: 12, lineHeight: 1.3 }}>{item.title}</p>

              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => togglePublish(item.id)}
                  title={item.published ? 'Dépublier' : 'Publier'}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '7px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', cursor: 'pointer', color: item.published ? 'var(--green)' : 'var(--cream-30)', fontFamily: 'var(--font-body)', fontSize: 11 }}
                >
                  {item.published ? <><EyeOff size={12} /> Masquer</> : <><Eye size={12} /> Publier</>}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ width: 32, height: 32, background: 'var(--red-bg)', border: '1px solid var(--red-border)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--red)' }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAdd && <AddModal onSave={handleAdd} onClose={() => setShowAdd(false)} />}
      </AnimatePresence>
    </div>
  )
}
