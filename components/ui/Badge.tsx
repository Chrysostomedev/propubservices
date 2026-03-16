/* ── Types ──────────────────────────────────────────────────────── */
export type BadgeVariant = 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type BadgeSize    = 'sm' | 'md'

export interface BadgeProps {
  label:    string
  variant?: BadgeVariant
  size?:    BadgeSize
  dot?:     boolean
  icon?:    React.ReactNode
}

/* ── Config couleurs ─────────────────────────────────────────────── */
const VARIANT_MAP: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  gold:    { bg: 'var(--gold-bg)',    color: 'var(--gold)',    border: 'var(--gold-border)' },
  success: { bg: 'var(--green-bg)',   color: 'var(--green)',   border: 'var(--green-border)' },
  warning: { bg: 'var(--orange-bg)',  color: 'var(--orange)',  border: 'var(--orange-border)' },
  danger:  { bg: 'var(--red-bg)',     color: 'var(--red)',     border: 'var(--red-border)' },
  info:    { bg: 'var(--blue-bg)',    color: 'var(--blue)',    border: 'var(--blue-border)' },
  neutral: { bg: 'var(--cream-12)',   color: 'var(--cream-55)', border: 'var(--border)' },
}

const SIZE_MAP: Record<BadgeSize, { fontSize: number; padding: string; gap: number; dotSize: number }> = {
  sm: { fontSize: 10, padding: '2px 8px',  gap: 4, dotSize: 4 },
  md: { fontSize: 11, padding: '3px 10px', gap: 5, dotSize: 5 },
}

/* ── Badge ───────────────────────────────────────────────────────── */
export function Badge({ label, variant = 'neutral', size = 'md', dot = false, icon }: BadgeProps) {
  const { bg, color, border } = VARIANT_MAP[variant]
  const { fontSize, padding, gap, dotSize } = SIZE_MAP[size]

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap,
      background: bg,
      color,
      border: `1px solid ${border}`,
      borderRadius: 'var(--r-full)',
      padding,
      fontSize,
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      letterSpacing: 0.6,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      lineHeight: 1,
    }}>
      {dot && (
        <span style={{
          width: dotSize, height: dotSize,
          background: color,
          borderRadius: '50%',
          display: 'inline-block',
          flexShrink: 0,
          animation: variant === 'warning' || variant === 'danger' ? 'pulse 2s ease infinite' : undefined,
        }}/>
      )}
      {icon}
      {label}
    </span>
  )
}

/* ── OrderStatusBadge — helper prêt à l'emploi ───────────────────── */
type OrderStatus = 'pending' | 'confirmed' | 'in_progress' | 'done' | 'cancelled'

const ORDER_STATUS: Record<OrderStatus, { label: string; variant: BadgeVariant }> = {
  pending:     { label: 'En attente',  variant: 'warning' },
  confirmed:   { label: 'Confirmé',   variant: 'gold' },
  in_progress: { label: 'En cours',   variant: 'info' },
  done:        { label: 'Terminé',    variant: 'success' },
  cancelled:   { label: 'Annulé',     variant: 'danger' },
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { label, variant } = ORDER_STATUS[status]
  return <Badge label={label} variant={variant} dot size="md"/>
}