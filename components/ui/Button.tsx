import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

/* ── Types ──────────────────────────────────────────────────────── */
export type ButtonVariant = 'gold' | 'ghost' | 'outline' | 'danger' | 'success'
export type ButtonSize    = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant
  size?:     ButtonSize
  loading?:  boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
  children:  ReactNode
}

/* ── Styles statiques ────────────────────────────────────────────── */
const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  gold: {
    background: 'var(--gold)',
    color: '#0C0C0F',
    border: 'none',
  },
  ghost: {
    background: 'var(--cream-12)',
    color: 'var(--cream-80)',
    border: '1px solid var(--border-md)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--gold)',
    border: '1px solid var(--gold-border)',
  },
  danger: {
    background: 'var(--red-bg)',
    color: 'var(--red)',
    border: '1px solid var(--red-border)',
  },
  success: {
    background: 'var(--green-bg)',
    color: 'var(--green)',
    border: '1px solid var(--green-border)',
  },
}

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: 12, gap: 5,  borderRadius: 'var(--r-sm)' },
  md: { padding: '9px 20px', fontSize: 14, gap: 7,  borderRadius: 'var(--r-md)' },
  lg: { padding: '13px 28px', fontSize: 15, gap: 8, borderRadius: 'var(--r-md)' },
}

/* ── Spinner ─────────────────────────────────────────────────────── */
function Spinner({ size = 14 }: { size?: number }) {
  return (
    <span style={{
      width: size, height: size,
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      display: 'inline-block',
      animation: 'spin 0.65s linear infinite',
      flexShrink: 0,
    }}/>
  )
}

/* ── Button ──────────────────────────────────────────────────────── */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'gold',
      size    = 'md',
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      disabled,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        {...props}
        style={{
          /* Base */
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          letterSpacing: 0.2,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          transition: 'opacity var(--t-fast), transform var(--t-fast), background var(--t-fast)',
          opacity: isDisabled ? 0.45 : 1,
          width: fullWidth ? '100%' : undefined,
          userSelect: 'none',
          whiteSpace: 'nowrap',
          /* Variant */
          ...VARIANT_STYLES[variant],
          /* Size */
          ...SIZE_STYLES[size],
          /* Override */
          ...style,
        }}
        onMouseEnter={e => {
          if (!isDisabled) (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'
          onMouseEnter?.(e)
        }}
        onMouseLeave={e => {
          if (!isDisabled) (e.currentTarget as HTMLButtonElement).style.opacity = '1'
          onMouseLeave?.(e)
        }}
        onMouseDown={e => {
          if (!isDisabled) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'
        }}
        onMouseUp={e => {
          if (!isDisabled) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
        }}
      >
        {loading ? <Spinner size={size === 'sm' ? 12 : 14}/> : iconLeft}
        <span>{children}</span>
        {!loading && iconRight}
      </button>
    )
  },
)

Button.displayName = 'Button'