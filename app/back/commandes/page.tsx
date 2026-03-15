'use client'

/**
 * app/back/commandes/page.tsx
 * Route : /back/commandes
 *
 * Gestion des commandes recues.
 * Donnees statiques (Firebase desactive temporairement).
 */

import { useState }                from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Phone, MessageCircle, MapPin,
  Calendar, ChevronRight,
}                                  from 'lucide-react'
import { Button }                  from '../../../components/ui/Button'

/* ── Types locaux ────────────────────────────────────────────────── */
type OrderStatus = 'pending' | 'confirmed' | 'in_progress' | 'done' | 'cancelled'

interface Order {
  id:          string
  clientName:  string
  clientPhone: string
  service:     string
  address:     string
  status:      OrderStatus
  createdAt:   string
  surface?:    string
  deadline?:   string
  message?:    string
}

/* ── Donnees statiques de demonstration ─────────────────────────── */
const STATIC_ORDERS: Order[] = [
  {
    id:          '1',
    clientName:  'Kouame Adjoua',
    clientPhone: '+225 07 12 34 56 78',
    service:     'Facades decoratives 3D',
    address:     'Yopougon Selmer',
    status:      'pending',
    createdAt:   '2026-03-10T09:00:00Z',
    surface:     '12 m2',
    deadline:    'normal',
    message:     'Couleurs bleu et blanc, logo a integrer.',
  },
  {
    id:          '2',
    clientName:  'Traore Mamadou',
    clientPhone: '+225 05 98 76 54 32',
    service:     'Enseignes 3D',
    address:     'Cocody Riviera 2',
    status:      'confirmed',
    createdAt:   '2026-03-08T14:30:00Z',
    surface:     '4 m lineaires',
    deadline:    'urgent',
  },
  {
    id:          '3',
    clientName:  'Bamba Fatoumata',
    clientPhone: '+225 01 23 45 67 89',
    service:     'Decoration neon',
    address:     'Marcory Zone 4',
    status:      'in_progress',
    createdAt:   '2026-03-05T11:00:00Z',
    message:     'Neon rose pour salon de beaute.',
  },
  {
    id:          '4',
    clientName:  'Diallo Ibrahim',
    clientPhone: '+225 07 55 44 33 22',
    service:     'Lettres lumineuses LED',
    address:     'Abobo Baoule',
    status:      'done',
    createdAt:   '2026-02-28T08:00:00Z',
  },
]

/* ── Filtres de statut ───────────────────────────────────────────── */
const STATUS_FILTERS: { value: 'all' | OrderStatus; label: string }[] = [
  { value: 'all',         label: 'Toutes'     },
  { value: 'pending',     label: 'En attente' },
  { value: 'confirmed',   label: 'Confirmees' },
  { value: 'in_progress', label: 'En cours'   },
  { value: 'done',        label: 'Terminees'  },
  { value: 'cancelled',   label: 'Annulees'   },
]

/* ── Transitions de statut autorisees ───────────────────────────── */
const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending:     ['confirmed', 'cancelled'],
  confirmed:   ['in_progress', 'cancelled'],
  in_progress: ['done', 'cancelled'],
  done:        [],
  cancelled:   ['pending'],
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending:     'En attente',
  confirmed:   'Confirmee',
  in_progress: 'En cours',
  done:        'Terminee',
  cancelled:   'Annulee',
}

const STATUS_NEXT_ACTION: Record<OrderStatus, string> = {
  pending:     'Marquer confirme',
  confirmed:   'Demarrer la fabrication',
  in_progress: 'Marquer termine',
  done:        '--',
  cancelled:   'Remettre en attente',
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending:     'var(--gold)',
  confirmed:   'var(--blue)',
  in_progress: '#a78bfa',
  done:        'var(--green)',
  cancelled:   'var(--red)',
}

/* ── Badge statut ────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span style={{
      display:      'inline-flex',
      alignItems:   'center',
      padding:      '3px 10px',
      borderRadius: 'var(--r-full)',
      background:   `${STATUS_COLORS[status]}18`,
      border:       `1px solid ${STATUS_COLORS[status]}40`,
      fontFamily:   'var(--font-body)',
      fontSize:     11,
      fontWeight:   700,
      color:        STATUS_COLORS[status],
      letterSpacing: 0.5,
    }}>
      {STATUS_LABELS[status]}
    </span>
  )
}

/* ── Order Drawer ────────────────────────────────────────────────── */
function OrderDrawer({
  order,
  onClose,
  onStatusChange,
}: {
  order:          Order
  onClose:        () => void
  onStatusChange: (id: string, status: OrderStatus) => void
}) {
  const nextStatuses = STATUS_TRANSITIONS[order.status]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.5)' }}
    >
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        onClick={e => e.stopPropagation()}
        style={{
          position:      'fixed',
          top:           0,
          right:         0,
          bottom:        0,
          width:         'min(100vw, 480px)',
          background:    'var(--bg-surface)',
          borderLeft:    '1px solid var(--border)',
          overflowY:     'auto',
          display:       'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{
          padding:        '20px 24px',
          borderBottom:   '1px solid var(--border)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          flexShrink:     0,
          position:       'sticky',
          top:            0,
          background:     'var(--bg-surface)',
          zIndex:         1,
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--cream)', letterSpacing: -0.3, marginBottom: 4 }}>
              {order.clientName}
            </h2>
            <StatusBadge status={order.status} />
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32,
              background:   'var(--bg-elevated)',
              border:       '1px solid var(--border)',
              borderRadius: 'var(--r-sm)',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              cursor:       'pointer',
              color:        'var(--cream-55)',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Corps */}
        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Service */}
          <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--r-md)', padding: '16px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
              Service demande
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--cream)' }}>
              {order.service}
            </p>
            {order.surface && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', marginTop: 6 }}>
                Surface : {order.surface}
              </p>
            )}
            {order.deadline && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', marginTop: 4 }}>
                Delai : {order.deadline}
              </p>
            )}
          </div>

          {/* Coordonnees */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--cream-30)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
              Client
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {([
                { icon: Phone,         text: order.clientPhone, href: `tel:${order.clientPhone}` },
                { icon: MessageCircle, text: 'WhatsApp',        href: `https://wa.me/${order.clientPhone.replace(/\D/g, '')}` },
                { icon: MapPin,        text: order.address,     href: undefined },
                { icon: Calendar,      text: new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), href: undefined },
              ] as { icon: React.ElementType; text: string; href: string | undefined }[]).map(({ icon: Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={14} color="var(--cream-30)" style={{ flexShrink: 0 }} />
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--blue)', textDecoration: 'none' }}>
                      {text}
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)' }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          {order.message && (
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--r-md)', padding: '14px', borderLeft: '3px solid var(--gold-border)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                Message
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)', lineHeight: 1.65, fontStyle: 'italic' }}>
                "{order.message}"
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        {nextStatuses.length > 0 && (
          <div style={{ padding: '16px 24px 24px', borderTop: '1px solid var(--border)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--cream-30)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
              Changer le statut
            </p>
            {nextStatuses.map(status => (
              <Button
                key={status}
                variant={status === 'cancelled' ? 'danger' : status === 'done' ? 'success' : 'outline'}
                onClick={() => onStatusChange(order.id, status)}
                fullWidth
                iconRight={<ChevronRight size={14} />}
              >
                {STATUS_NEXT_ACTION[order.status]}
              </Button>
            ))}
          </div>
        )}
      </motion.aside>
    </motion.div>
  )
}

/* ── Page Commandes ──────────────────────────────────────────────── */
export default function CommandesPage() {
  const [orders, setOrders]               = useState<Order[]>(STATIC_ORDERS)
  const [activeFilter, setActiveFilter]   = useState<'all' | OrderStatus>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = activeFilter === 'all'
    ? orders
    : orders.filter(o => o.status === activeFilter)

  /* Changement de statut local — TODO: brancher Firestore updateDoc */
  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    setSelectedOrder(prev => prev?.id === id ? { ...prev, status } : prev)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--cream)', letterSpacing: -0.5, marginBottom: 4 }}>
          Commandes
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-55)' }}>
          {orders.length} commande{orders.length !== 1 ? 's' : ''} au total
        </p>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {STATUS_FILTERS.map(f => {
          const count    = f.value === 'all' ? orders.length : orders.filter(o => o.status === f.value).length
          const isActive = activeFilter === f.value
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                padding:      '7px 14px',
                borderRadius: 'var(--r-full)',
                background:   isActive ? 'var(--gold-bg)' : 'var(--bg-surface)',
                border:       `1px solid ${isActive ? 'var(--gold-border)' : 'var(--border)'}`,
                color:        isActive ? 'var(--gold)' : 'var(--cream-55)',
                fontFamily:   'var(--font-body)',
                fontSize:     13,
                fontWeight:   isActive ? 700 : 500,
                cursor:       'pointer',
                transition:   'all var(--t-fast)',
                display:      'flex',
                alignItems:   'center',
                gap:          6,
              }}
            >
              {f.label}
              {count > 0 && (
                <span style={{
                  background:   isActive ? 'var(--gold)' : 'var(--bg-elevated)',
                  color:        isActive ? '#0C0C0F' : 'var(--cream-55)',
                  borderRadius: 'var(--r-full)',
                  padding:      '1px 6px',
                  fontSize:     10,
                  fontWeight:   700,
                }}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Client', 'Service', 'Telephone', 'Statut', 'Date'].map(col => (
                <th key={col} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--cream-30)', letterSpacing: 1, textTransform: 'uppercase' }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-30)' }}>
                  Aucune commande dans cette categorie
                </td>
              </tr>
            ) : filtered.map((order, i) => (
              <tr
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                  cursor:       'pointer',
                  transition:   'background var(--t-fast)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream)', fontWeight: 600 }}>
                  {order.clientName}
                </td>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)' }}>
                  {order.service}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <a href={`tel:${order.clientPhone}`} style={{ color: 'var(--blue)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
                    {order.clientPhone}
                  </a>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <StatusBadge status={order.status} />
                </td>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream-55)' }}>
                  {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDrawer
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
