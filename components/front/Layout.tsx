/**
 * (public)/layout.tsx
 * ─────────────────────────────────────────────────────────────────
 * Layout partagé par toutes les pages publiques (front-office).
 *
 * Injecte :
 *  - <Navbar>     → header fixe commun
 *  - {children}   → contenu de la page
 *  - <Footer>     → pied de page commun
 *  - <FloatingCTA>→ bouton WhatsApp flottant (client component)
 *  - <InputGlobalStyles> → styles ::placeholder et autofill
 *
 * Ce layout ne s'applique PAS aux routes /admin (groupe séparé).
 * ─────────────────────────────────────────────────────────────────
 */

import { Navbar }            from '../../components/front/Navbar'
import { Footer }            from '../../components/front/Footer'
import { FloatingCTA }       from '../../components/front/FloatingCTA'
import { InputGlobalStyles } from '../../components/ui/Input'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Styles globaux pour les placeholders de formulaire */}
      <InputGlobalStyles/>

      {/* Navigation principale (fixe, scroll-aware) */}
      <Navbar/>

      {/* Contenu de la page — paddingTop pour compenser la navbar fixe (68px) */}
      <main style={{ paddingTop: 68 }}>
        {children}
      </main>

      {/* Pied de page */}
      <Footer/>

      {/* Bouton flottant WhatsApp / contact (client component) */}
      <FloatingCTA/>
    </>
  )
}