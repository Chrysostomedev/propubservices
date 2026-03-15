/**
 * Skeleton.tsx
 * ─────────────────────────────────────────────────────────────────
 * Composants de placeholder de chargement (loading states).
 * Utilisés en attendant que les données Firebase arrivent.
 *
 * Exports :
 *   - Skeleton         → bloc générique, taille et forme configurables
 *   - SkeletonCard     → placeholder d'une ServiceCard / MediaCard
 *   - SkeletonText     → ligne(s) de texte animées
 *   - SkeletonAvatar   → cercle pour photo/avatar
 *   - SkeletonStatCard → placeholder d'une carte KPI admin
 * ─────────────────────────────────────────────────────────────────
 */

/* ══════════════════════════════════════════════════════════════════
   SKELETON DE BASE
══════════════════════════════════════════════════════════════════ */

interface SkeletonProps {
  width?:        string | number
  height?:       string | number
  borderRadius?: string | number
  style?:        React.CSSProperties
}

export function Skeleton({
  width  = '100%',
  height = 16,
  borderRadius = 'var(--r-sm)',
  style,
}: SkeletonProps) {
  return (
    <span
      aria-hidden="true"  // invisible pour les lecteurs d'écran
      style={{
        display:         'block',
        width,
        height,
        borderRadius,
        /* Animation shimmer définie dans globals.css */
        background:      'linear-gradient(90deg, var(--bg-elevated) 25%, var(--bg-hover) 50%, var(--bg-elevated) 75%)',
        backgroundSize:  '200% 100%',
        animation:       'shimmer 1.6s ease infinite',
        ...style,
      }}
    />
  )
}

/* ══════════════════════════════════════════════════════════════════
   SKELETON CARD — placeholder d'une ServiceCard ou MediaCard
══════════════════════════════════════════════════════════════════ */

export function SkeletonCard() {
  return (
    <div
      aria-busy="true"
      aria-label="Chargement…"
      style={{
        background:   'var(--bg-surface)',
        border:       '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding:      28,
        display:      'flex',
        flexDirection: 'column',
        gap:          14,
      }}
    >
      {/* Icône / thumbnail */}
      <Skeleton width={48} height={48} borderRadius="var(--r-md)"/>

      {/* Titre */}
      <Skeleton width="70%" height={18}/>

      {/* Description — 3 lignes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <Skeleton width="100%" height={13}/>
        <Skeleton width="90%"  height={13}/>
        <Skeleton width="60%"  height={13}/>
      </div>

      {/* Tag */}
      <Skeleton width={72} height={22} borderRadius="var(--r-full)"/>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SKELETON TEXT — bloc de texte multilignes
══════════════════════════════════════════════════════════════════ */

interface SkeletonTextProps {
  lines?: number   // nombre de lignes (défaut : 3)
  lastLineWidth?: string // largeur de la dernière ligne (défaut : "60%")
}

export function SkeletonText({ lines = 3, lastLineWidth = '60%' }: SkeletonTextProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? lastLineWidth : '100%'}
          height={14}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SKELETON AVATAR — cercle pour photo ou initiales
══════════════════════════════════════════════════════════════════ */

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton width={size} height={size} borderRadius="50%"/>
}

/* ══════════════════════════════════════════════════════════════════
   SKELETON STAT CARD — placeholder pour les KPIs du dashboard admin
══════════════════════════════════════════════════════════════════ */

export function SkeletonStatCard() {
  return (
    <div
      aria-busy="true"
      style={{
        background:   'var(--bg-surface)',
        border:       '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding:      '22px 24px',
        display:      'flex',
        flexDirection: 'column',
        gap:          16,
      }}
    >
      {/* Label */}
      <Skeleton width="55%" height={11}/>
      {/* Valeur principale */}
      <Skeleton width="40%" height={36}/>
      {/* Tendance */}
      <Skeleton width="70%" height={12}/>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SKELETON MEDIA — placeholder pour la grille médias admin
══════════════════════════════════════════════════════════════════ */

export function SkeletonMedia() {
  return (
    <Skeleton
      height="100%"
      borderRadius="var(--r-md)"
      style={{ aspectRatio: '1', minHeight: 160 }}
    />
  )
}

/* ══════════════════════════════════════════════════════════════════
   SKELETON TABLE ROW — placeholder pour DataTable
══════════════════════════════════════════════════════════════════ */

export function SkeletonTableRow({ cols = 5 }: { cols?: number }) {
  return (
    <tr style={{ borderBottom: '1px solid var(--border)' }}>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} style={{ padding: '14px 20px' }}>
          <Skeleton
            width={i === 0 ? '80%' : i === cols - 1 ? '50%' : '65%'}
            height={13}
          />
        </td>
      ))}
    </tr>
  )
}