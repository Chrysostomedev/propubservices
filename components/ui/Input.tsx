'use client'

/**
 * Input.tsx
 * ─────────────────────────────────────────────────────────────────
 * Composants de formulaire réutilisables pour Pro-Pub Service.
 * Tous les champs partagent le même design system : fond sombre,
 * bordure subtile, focus gold, états error/success, label optionnel.
 *
 * Exports :
 *   - Input     → champ texte / email / tel / number / password
 *   - Textarea  → zone de texte multiligne
 *   - Select    → liste déroulante stylisée
 * ─────────────────────────────────────────────────────────────────
 */

import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  forwardRef,
  ReactNode,
  useState,
} from 'react'

/* ══════════════════════════════════════════════════════════════════
   TYPES PARTAGÉS
══════════════════════════════════════════════════════════════════ */

/** État visuel du champ */
type FieldState = 'default' | 'error' | 'success'

/** Props communes à tous les champs */
interface FieldBaseProps {
  label?:    string       // Label au-dessus du champ
  hint?:     string       // Texte d'aide sous le champ (gris)
  error?:    string       // Message d'erreur (rouge) — prend le dessus sur hint
  success?:  string       // Message de succès (vert)
  iconLeft?:  ReactNode   // Icône à gauche (ex: Phone de lucide-react)
  iconRight?: ReactNode   // Icône à droite (ex: Eye pour password)
  required?: boolean
}

/* ══════════════════════════════════════════════════════════════════
   STYLES UTILITAIRES
══════════════════════════════════════════════════════════════════ */

/**
 * Retourne la couleur de bordure selon l'état du champ
 * et le focus courant.
 */
function getBorderColor(state: FieldState, focused: boolean): string {
  if (state === 'error')   return focused ? 'var(--red)'   : 'var(--red-border)'
  if (state === 'success') return focused ? 'var(--green)' : 'var(--green-border)'
  return focused ? 'var(--gold-border)' : 'var(--border-md)'
}

/** Styles de base partagés pour input, textarea et select */
const FIELD_BASE: React.CSSProperties = {
  width:           '100%',
  background:      'var(--bg-elevated)',
  color:           'var(--cream)',
  fontFamily:      'var(--font-body)',
  fontSize:        14,
  outline:         'none',
  transition:      'border-color var(--t-fast)',
  borderRadius:    'var(--r-md)',
  border:          '1px solid var(--border-md)', // sera overridé dynamiquement
}

/* ══════════════════════════════════════════════════════════════════
   LABEL + HINT/ERROR — composant interne partagé
══════════════════════════════════════════════════════════════════ */

function FieldLabel({
  label, required, htmlFor,
}: { label: string; required?: boolean; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display:     'block',
        fontFamily:  'var(--font-body)',
        fontSize:    13,
        fontWeight:  500,
        color:       'var(--cream-80)',
        marginBottom: 6,
        letterSpacing: 0.1,
      }}
    >
      {label}
      {/* Astérisque rouge pour les champs obligatoires */}
      {required && (
        <span style={{ color: 'var(--red)', marginLeft: 4, fontSize: 12 }}>*</span>
      )}
    </label>
  )
}

function FieldMessage({
  error, success, hint,
}: { error?: string; success?: string; hint?: string }) {
  /* Priorité : error > success > hint */
  if (error) return (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--red)', marginTop: 5 }}>
      {error}
    </p>
  )
  if (success) return (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--green)', marginTop: 5 }}>
      {success}
    </p>
  )
  if (hint) return (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-30)', marginTop: 5 }}>
      {hint}
    </p>
  )
  return null
}

/* ══════════════════════════════════════════════════════════════════
   INPUT
══════════════════════════════════════════════════════════════════ */

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    FieldBaseProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label, hint, error, success, iconLeft, iconRight,
      required, id, style, ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false)

    // Détermine l'état visuel courant
    const state: FieldState = error ? 'error' : success ? 'success' : 'default'

    // padding-left augmenté si icône gauche présente
    const paddingLeft  = iconLeft  ? 40 : 14
    const paddingRight = iconRight ? 40 : 14

    return (
      <div style={{ width: '100%' }}>
        {/* Label */}
        {label && <FieldLabel label={label} required={required} htmlFor={id}/>}

        {/* Wrapper relatif pour positionner les icônes */}
        <div style={{ position: 'relative' }}>
          {/* Icône gauche */}
          {iconLeft && (
            <span style={{
              position: 'absolute', left: 12, top: '50%',
              transform: 'translateY(-50%)',
              color: focused ? 'var(--gold)' : 'var(--cream-30)',
              display: 'flex', alignItems: 'center',
              pointerEvents: 'none',
              transition: 'color var(--t-fast)',
            }}>
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            required={required}
            {...props}
            onFocus={e => { setFocused(true);  props.onFocus?.(e) }}
            onBlur={e  => { setFocused(false); props.onBlur?.(e)  }}
            style={{
              ...FIELD_BASE,
              padding:       `12px ${paddingRight}px 12px ${paddingLeft}px`,
              borderColor:   getBorderColor(state, focused),
              caretColor:    'var(--gold)',
              /* Placeholder plus discret */
              ...style,
            }}
          />

          {/* Icône droite */}
          {iconRight && (
            <span style={{
              position: 'absolute', right: 12, top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--cream-30)',
              display: 'flex', alignItems: 'center',
            }}>
              {iconRight}
            </span>
          )}
        </div>

        {/* Messages hint / error / success */}
        <FieldMessage error={error} success={success} hint={hint}/>
      </div>
    )
  },
)
Input.displayName = 'Input'

/* ══════════════════════════════════════════════════════════════════
   TEXTAREA
══════════════════════════════════════════════════════════════════ */

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    FieldBaseProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, success, required, id, style, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const state: FieldState = error ? 'error' : success ? 'success' : 'default'

    return (
      <div style={{ width: '100%' }}>
        {label && <FieldLabel label={label} required={required} htmlFor={id}/>}

        <textarea
          ref={ref}
          id={id}
          required={required}
          {...props}
          onFocus={e => { setFocused(true);  props.onFocus?.(e) }}
          onBlur={e  => { setFocused(false); props.onBlur?.(e)  }}
          style={{
            ...FIELD_BASE,
            padding:       '12px 14px',
            borderColor:   getBorderColor(state, focused),
            resize:        'vertical',
            minHeight:     100,
            lineHeight:    1.65,
            caretColor:    'var(--gold)',
            ...style,
          }}
        />

        <FieldMessage error={error} success={success} hint={hint}/>
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

/* ══════════════════════════════════════════════════════════════════
   SELECT
══════════════════════════════════════════════════════════════════ */

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    FieldBaseProps {
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label, hint, error, success, required,
      options, placeholder, id, style, ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false)
    const state: FieldState = error ? 'error' : success ? 'success' : 'default'

    return (
      <div style={{ width: '100%' }}>
        {label && <FieldLabel label={label} required={required} htmlFor={id}/>}

        {/* Position relative pour la flèche custom */}
        <div style={{ position: 'relative' }}>
          <select
            ref={ref}
            id={id}
            required={required}
            {...props}
            onFocus={e => { setFocused(true);  props.onFocus?.(e) }}
            onBlur={e  => { setFocused(false); props.onBlur?.(e)  }}
            style={{
              ...FIELD_BASE,
              padding:             '12px 40px 12px 14px',
              borderColor:         getBorderColor(state, focused),
              appearance:          'none', // masque la flèche native
              WebkitAppearance:    'none',
              cursor:              'pointer',
              ...style,
            }}
          >
            {/* Option placeholder désactivée */}
            {placeholder && (
              <option value="" disabled hidden style={{ background: 'var(--bg-elevated)' }}>
                {placeholder}
              </option>
            )}
            {options.map(opt => (
              <option
                key={opt.value}
                value={opt.value}
                style={{ background: 'var(--bg-elevated)', color: 'var(--cream)' }}
              >
                {opt.label}
              </option>
            ))}
          </select>

          {/* Flèche custom (SVG inline) */}
          <span style={{
            position: 'absolute', right: 12, top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: focused ? 'var(--gold)' : 'var(--cream-30)',
            transition: 'color var(--t-fast)',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>

        <FieldMessage error={error} success={success} hint={hint}/>
      </div>
    )
  },
)
Select.displayName = 'Select'

/* ══════════════════════════════════════════════════════════════════
   STYLES GLOBAUX POUR PLACEHOLDER (injectés via <style>)
   — on ne peut pas cibler ::placeholder via style inline
══════════════════════════════════════════════════════════════════ */
export function InputGlobalStyles() {
  return (
    <style>{`
      input::placeholder,
      textarea::placeholder {
        color: var(--cream-30);
        font-family: var(--font-body);
      }
      input:-webkit-autofill,
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 100px var(--bg-elevated) inset !important;
        -webkit-text-fill-color: var(--cream) !important;
        caret-color: var(--gold) !important;
      }
    `}</style>
  )
}