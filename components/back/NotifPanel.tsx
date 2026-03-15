'use client'

import { useState }                from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, CheckCheck, FileText, ShoppingBag, AlertCircle, Info, ArrowLeft } from 'lucide-react'

export interface Notif {
  id:     string
  type:   'devis' | 'commande' | 'alerte' | 'info'
  title:  string
  body:   string
  detail: string
  time:   string
  read:   boolean
}

const MOCK_NOTIFS: Notif[] = [
  { id: '1', type: 'devis',    title: 'Nouveau devis reçu',       body: 'Enseigne 3D — Pharmacie Centrale',   detail: 'Un client a soumis une demande de devis pour une enseigne 3D lumineuse. Budget estimé : 450 000 FCFA. Contact : [phone_number]. À traiter sous 48h.',                                   time: 'Il y a 5 min',   read: false },
  { id: '2', type: 'commande', title: 'Commande confirmée',       body: 'Façade Alucobond — Boutique Mode',   detail: 'La commande #CMD-2024-089 a été confirmée et le paiement validé. Montant : 1 200 000 FCFA. Délai de livraison convenu : 3 semaines. Client : [name].',                                 time: 'Il y a 1h',      read: false },
  { id: '3', type: 'alerte',   title: 'Devis sans réponse (72h)', body: 'Lettres LED — Restaurant Le Palais', detail: 'Le devis #DEV-2024-112 envoyé il y a 72h n\'a pas reçu de réponse. Pensez à relancer le client par WhatsApp ou téléphone pour ne pas perdre cette opportunité.',                      time: 'Il y a 3h',      read: false },
  { id: '4', type: 'info',     title: 'Nouveau message contact',  body: 'Demande d\'information générale',    detail: 'Un visiteur a envoyé un message via le formulaire de contact. Objet : "Tarifs pour habillage de façade complète". Répondre dans les meilleurs délais pour maximiser la conversion.',  time: 'Hier 14:32',     read: true  },
  { id: '5', type: 'devis',    title: 'Devis accepté',            body: 'Néon déco — Bar Lounge Prestige',   detail: 'Le client a accepté le devis #DEV-2024-108 pour une installation néon décorative. Montant : 320 000 FCFA. Prochaine étape : planifier la visite technique sur site.',                 time: 'Hier 09:15',     read: true  },
  { id: '6', type: 'commande', title: 'Livraison effectuée',      body: 'Stickers vitrine — Salon Beauté',   detail: 'La commande #CMD-2024-081 a été livrée et installée avec succès. Le client a signé le bon de réception. Pensez à demander un avis Google pour renforcer votre réputation.',          time: 'Il y a 2 jours', read: true  },
]

const TYPE_ICON: Record<Notif['type'], React.ReactNode> = {
  devis:    <FileText size={14} />,
  commande: <ShoppingBag size={14} />,
  alerte:   <AlertCircle size={14} />,
  info:     <Info size={14} />,
}
const TYPE_COLOR: Record<Notif['type'], string> = {
  devis:    'var(--gold)',
  commande: 'var(--green)',
  alerte:   'var(--warning)',
  info:     'var(--blue)',
}

export function NotifPanel({ onClose }: { onClose: () => void }) {
  const [notifs,   setNotifs]   = useState<Notif[]>(MOCK_NOTIFS)
  const [selected, setSelected] = useState<Notif | null>(null)

  const unread = notifs.filter(n => !n.read).length

  const markRead    = (id: string) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))
  const markAllRead = ()           => setNotifs(ns => ns.map(n => ({ ...n, read: true })))

  const handleSelect = (n: Notif) => { markRead(n.id); setSelected(n) }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="notif-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)' }}
      />

      {/* Panel liste */}
      <motion.aside
        key="notif-list"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
          width: 'min(360px, 100vw)',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-md)',
          display: 'flex', flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={15} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--cream)' }}>Notifications</span>
            {unread > 0 && (
              <span style={{ padding: '1px 7px', borderRadius: 'var(--r-full)', background: 'var(--gold)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700 }}>
                {unread}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {unread > 0 && (
              <button onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 9px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', cursor: 'pointer', color: 'var(--cream-55)', fontFamily: 'var(--font-body)', fontSize: 11 }}>
                <CheckCheck size={11} /> Tout lire
              </button>
            )}
            <button onClick={onClose} style={{ width: 28, height: 28, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--cream-55)' }}>
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Liste */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {notifs.map((n, i) => (
            <motion.button
              key={n.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => handleSelect(n)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '13px 18px',
                borderBottom: '1px solid var(--border)',
                background: selected?.id === n.id ? 'var(--gold-bg)' : n.read ? 'transparent' : 'var(--bg-elevated)',
                cursor: 'pointer', display: 'flex', gap: 11, alignItems: 'flex-start',
                borderLeft: `3px solid ${selected?.id === n.id ? 'var(--gold)' : n.read ? 'transparent' : TYPE_COLOR[n.type]}`,
              }}
            >
              <span style={{ color: TYPE_COLOR[n.type], flexShrink: 0, marginTop: 2 }}>{TYPE_ICON[n.type]}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: n.read ? 500 : 700, color: 'var(--cream)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {n.title}
                  </span>
                  {!n.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: TYPE_COLOR[n.type], flexShrink: 0, marginTop: 4 }} />}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 3 }}>
                  {n.body}
                </p>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--cream-30)' }}>{n.time}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.aside>

      {/* Panel détail — se superpose par-dessus la liste */}
      <AnimatePresence>
        {selected && (
          <motion.aside
            key="notif-detail"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 202,
              width: 'min(360px, 100vw)',
              background: 'var(--bg-base)',
              borderLeft: '1px solid var(--border-md)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.35)',
            }}
          >
            {/* Header détail */}
            <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <button
                onClick={() => setSelected(null)}
                style={{ width: 28, height: 28, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--cream-55)', flexShrink: 0 }}
              >
                <ArrowLeft size={13} />
              </button>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--cream)', flex: 1 }}>Détail</span>
              <button onClick={onClose} style={{ width: 28, height: 28, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--cream-55)' }}>
                <X size={13} />
              </button>
            </div>

            {/* Corps détail */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 'var(--r-full)', background: 'var(--bg-elevated)', border: `1px solid ${TYPE_COLOR[selected.type]}`, color: TYPE_COLOR[selected.type], fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, marginBottom: 16 }}>
                {TYPE_ICON[selected.type]} {selected.type.charAt(0).toUpperCase() + selected.type.slice(1)}
              </span>

              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.3, marginBottom: 6 }}>
                {selected.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-30)', marginBottom: 20 }}>
                {selected.time}
              </p>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: '14px 16px', marginBottom: 20 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--cream-30)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Résumé</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream)', lineHeight: 1.5 }}>{selected.body}</p>
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-80)', lineHeight: 1.8 }}>
                {selected.detail}
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
