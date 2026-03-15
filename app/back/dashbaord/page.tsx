'use client'

/**
 * app/back/dashbaord/page.tsx
 * Route : /back/dashbaord
 *
 * Tableau de bord analytique Pro-Pub Service.
 * Données statiques (Firebase désactivé temporairement).
 */

import { motion } from 'framer-motion'
import {
  Eye, FileText, ShoppingBag, TrendingUp, Users,
} from 'lucide-react'

/* ── Données statiques de démonstration ─────────────────────────── */
const STATIC_STATS = {
  visitors7d:     142,
  visitors30d:    580,
  totalDevis:     34,
  totalOrders:    21,
  conversion:     62,
  topPages: [
    { page: '/',          count: 210 },
    { page: '/services',  count: 98  },
    { page: '/galerie',   count: 76  },
    { page: '/devis',     count: 64  },
    { page: '/contact',   count: 42  },
  ],
  devisByService: [
    { service: 'Façades décoratives 3D',  count: 12 },
    { service: 'Enseignes 3D',            count: 9  },
    { service: 'Lettres lumineuses LED',  count: 6  },
    { service: 'Décoration néon',         count: 4  },
    { service: 'Imprimerie & Vitrerie',   count: 3  },
  ],
  ordersByDay: [
    { date: 'lun.', count: 2 },
    { date: 'mar.', count: 4 },
    { date: 'mer.', count: 1 },
    { date: 'jeu.', count: 5 },
    { date: 'ven.', count: 3 },
    { date: 'sam.', count: 4 },
    { date: 'dim.', count: 2 },
  ],
}

/* ── StatCard ────────────────────────────────────────────────────── */
function StatCard({
  label,
  value,
  icon,
  sub,
  accent = false,
}: {
  label:   string
  value:   string | number
  icon:    React.ReactNode
  sub?:    string
  accent?: boolean
}) {
  return (
    <div style={{
      background:   accent ? 'var(--gold-bg)' : 'var(--bg-surface)',
      border:       `1px solid ${accent ? 'var(--gold-border)' : 'var(--border)'}`,
      borderRadius: 'var(--r-lg)',
      padding:      '20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-30)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          {label}
        </span>
        <span style={{ color: accent ? 'var(--gold)' : 'var(--cream-30)' }}>{icon}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: accent ? 'var(--gold)' : 'var(--cream)', letterSpacing: -0.5 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--cream-30)', marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  )
}

/* ── BarChart CSS ────────────────────────────────────────────────── */
function BarChart({
  data,
  label,
  color = 'var(--gold)',
}: {
  data:   { label: string; value: number }[]
  label:  string
  color?: string
}) {
  const max = Math.max(...data.map(d => d.value), 1)

  return (
    <div style={{
      background:   'var(--bg-surface)',
      border:       '1px solid var(--border)',
      borderRadius: 'var(--r-lg)',
      padding:      '20px 24px',
    }}>
      <p style={{
        fontFamily:    'var(--font-body)',
        fontSize:      11,
        fontWeight:    700,
        color:         'var(--cream-30)',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom:  20,
      }}>
        {label}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.map(({ label: l, value }, i) => (
          <div key={l}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                {l}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--cream)', flexShrink: 0 }}>
                {value}
              </span>
            </div>
            <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(value / max) * 100}%` }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: '100%', background: color, borderRadius: 3 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Page Dashboard ──────────────────────────────────────────────── */
export default function DashboardPage() {
  const stats = STATIC_STATS

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      28,
          fontWeight:    800,
          color:         'var(--cream)',
          letterSpacing: -0.5,
          marginBottom:  4,
        }}>
          Analytics
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--cream-55)' }}>
          Performances et activité de votre site
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap:                 16,
        marginBottom:        32,
      }}>
        <StatCard label="Visiteurs 7j"      value={stats.visitors7d.toLocaleString()}  icon={<Eye size={18} />}          sub="sessions uniques" />
        <StatCard label="Visiteurs 30j"     value={stats.visitors30d.toLocaleString()} icon={<Users size={18} />} />
        <StatCard label="Devis reçus"       value={stats.totalDevis}                   icon={<FileText size={18} />}     accent />
        <StatCard label="Commandes"         value={stats.totalOrders}                  icon={<ShoppingBag size={18} />} />
        <StatCard label="Taux conversion"   value={`${stats.conversion}%`}             icon={<TrendingUp size={18} />}   sub="devis → commande" accent={stats.conversion > 20} />
      </div>

      {/* Graphiques */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap:                 20,
        marginBottom:        24,
      }}>
        <BarChart
          label="Devis par service"
          data={stats.devisByService.map(d => ({
            label: d.service.length > 25 ? d.service.slice(0, 24) + '…' : d.service,
            value: d.count,
          }))}
          color="var(--gold)"
        />
        <BarChart
          label="Commandes — 7 derniers jours"
          data={stats.ordersByDay.map(d => ({ label: d.date, value: d.count }))}
          color="var(--green)"
        />
      </div>

      {/* Pages les plus visitées */}
      {stats.topPages.length > 0 && (
        <div style={{
          background:   'var(--bg-surface)',
          border:       '1px solid var(--border)',
          borderRadius: 'var(--r-lg)',
          overflow:     'hidden',
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{
              fontFamily:    'var(--font-body)',
              fontSize:      11,
              fontWeight:    700,
              color:         'var(--cream-30)',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
              Pages les plus visitées (30j)
            </p>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {stats.topPages.map(({ page, count }, i) => (
                <tr key={page} style={{ borderBottom: i < stats.topPages.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '12px 20px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream)' }}>
                    {page}
                  </td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>
                    {count} vues
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
